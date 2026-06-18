"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MODELS, DEFAULT_MODEL_ID, getModel, type MediaRole } from "@/lib/models";
import { PRESETS, getPreset } from "@/lib/presets";

interface UploadedImage {
  role: MediaRole;
  url: string; // data URL
  name: string;
}

interface Generation {
  id: string;
  modelId: string;
  modelName: string;
  prompt: string;
  aspectRatio: string;
  state: "queued" | "processing" | "completed" | "failed";
  progress: number;
  videoUrl?: string;
  error?: string;
  poster?: string;
  createdAt: number;
}

const ROLE_LABEL: Record<MediaRole, string> = {
  start_image: "Image de départ",
  end_image: "Image de fin",
  reference: "Référence"
};

const STORAGE_KEY = "zt-video-generations";

export default function Studio() {
  const [modelId, setModelId] = useState(DEFAULT_MODEL_ID);
  const model = getModel(modelId)!;

  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState(model.aspectRatios[0]);
  const [duration, setDuration] = useState(model.durations[0]);
  const [options, setOptions] = useState<Record<string, string>>({});
  const [presetIds, setPresetIds] = useState<string[]>([]);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Réinitialise les réglages quand on change de modèle.
  useEffect(() => {
    setAspectRatio(model.aspectRatios[0]);
    setDuration(model.durations[0]);
    setOptions(
      Object.fromEntries(model.options.map((o) => [o.name, o.default]))
    );
    setImages((prev) => prev.slice(0, model.imageRoles.length));
  }, [modelId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Charge la galerie depuis localStorage.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setGenerations(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  // Persiste la galerie.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(generations.slice(0, 24)));
    } catch {
      /* ignore */
    }
  }, [generations]);

  const finalPrompt = useMemo(() => {
    const suffixes = presetIds
      .map((id) => getPreset(id)?.promptSuffix)
      .filter(Boolean);
    return [prompt.trim(), ...suffixes].filter(Boolean).join(", ");
  }, [prompt, presetIds]);

  const togglePreset = (id: string) =>
    setPresetIds((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
    );

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const slots = model.imageRoles.length;
      const arr = Array.from(files).slice(0, slots);
      Promise.all(
        arr.map(
          (file) =>
            new Promise<UploadedImage | null>((resolve) => {
              if (!file.type.startsWith("image/")) return resolve(null);
              const reader = new FileReader();
              reader.onload = () =>
                resolve({
                  role: "start_image",
                  url: reader.result as string,
                  name: file.name
                });
              reader.onerror = () => resolve(null);
              reader.readAsDataURL(file);
            })
        )
      ).then((loaded) => {
        const valid = loaded.filter((x): x is UploadedImage => x !== null);
        setImages((prev) => {
          const merged = [...prev, ...valid].slice(0, slots);
          // (Ré)assigne les rôles dans l'ordre défini par le modèle.
          return merged.map((img, i) => ({ ...img, role: model.imageRoles[i] }));
        });
      });
    },
    [model.imageRoles]
  );

  const removeImage = (idx: number) =>
    setImages((prev) =>
      prev
        .filter((_, i) => i !== idx)
        .map((img, i) => ({ ...img, role: model.imageRoles[i] }))
    );

  const estimatedCost = useMemo(() => {
    const durFactor = duration / (model.durations[0] || 1);
    return Math.round(model.creditCost * durFactor);
  }, [model, duration]);

  async function generate() {
    setError(null);
    if (!finalPrompt && images.length === 0) {
      setError("Donne au moins un prompt ou une image.");
      return;
    }
    if (model.requiresImage && images.length === 0) {
      setError(`${model.name} nécessite une image de départ.`);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelId,
          prompt: finalPrompt,
          aspectRatio,
          duration,
          options,
          images: images.map((i) => ({ role: i.role, url: i.url }))
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Échec de la génération.");

      const gen: Generation = {
        id: data.id,
        modelId,
        modelName: model.name,
        prompt: finalPrompt,
        aspectRatio,
        state: "queued",
        progress: 0,
        poster: images[0]?.url,
        createdAt: Date.now()
      };
      setGenerations((prev) => [gen, ...prev]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue.");
    } finally {
      setSubmitting(false);
    }
  }

  // Polling des générations en cours.
  useEffect(() => {
    const pending = generations.filter(
      (g) => g.state === "queued" || g.state === "processing"
    );
    if (pending.length === 0) return;

    const timer = setInterval(async () => {
      await Promise.all(
        pending.map(async (g) => {
          try {
            const res = await fetch(`/api/status/${g.id}`, { cache: "no-store" });
            const s = await res.json();
            setGenerations((prev) =>
              prev.map((x) =>
                x.id === g.id
                  ? {
                      ...x,
                      state: s.state,
                      progress: s.progress ?? x.progress,
                      videoUrl: s.videoUrl ?? x.videoUrl,
                      error: s.error
                    }
                  : x
              )
            );
          } catch {
            /* retry au prochain tick */
          }
        })
      );
    }, 2500);

    return () => clearInterval(timer);
  }, [generations]);

  const aspectClass = aspectRatioToClass(aspectRatio);

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_minmax(420px,520px)]">
      {/* -------------------- Panneau de configuration -------------------- */}
      <div className="space-y-6">
        {/* Modèles */}
        <div className="card p-5">
          <div className="label">Modèle</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {MODELS.map((m) => {
              const active = m.id === modelId;
              return (
                <button
                  key={m.id}
                  onClick={() => setModelId(m.id)}
                  className={`rounded-xl border p-3.5 text-left transition ${
                    active
                      ? "border-brand bg-brand/15"
                      : "border-white/10 bg-white/5 hover:border-white/25"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{m.name}</span>
                    {m.featured && (
                      <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold uppercase text-accent">
                        Top
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-[11px] text-white/40">
                    {m.provider}
                  </div>
                  <p className="mt-1.5 text-xs leading-snug text-white/55">
                    {m.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Prompt */}
        <div className="card p-5">
          <div className="label">Prompt</div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="Ex : une femme marche dans une rue de Tokyo sous la pluie néon, reflets sur l'asphalte, plan cinématique au ralenti…"
            className="w-full resize-none rounded-xl border border-white/10 bg-ink-900/60 p-3.5 text-sm text-white placeholder:text-white/30 focus:border-brand focus:outline-none"
          />
        </div>

        {/* Images */}
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <div className="label mb-0">
              Images de référence{" "}
              <span className="text-white/30">
                (jusqu'à {model.imageRoles.length})
              </span>
            </div>
            {model.requiresImage && (
              <span className="text-[11px] font-medium text-accent">
                requis pour {model.name}
              </span>
            )}
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFiles(e.dataTransfer.files);
            }}
            onClick={() => fileInputRef.current?.click()}
            className="mt-3 cursor-pointer rounded-xl border border-dashed border-white/15 bg-ink-900/40 p-6 text-center transition hover:border-brand/60"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <div className="text-3xl">🖼️</div>
            <p className="mt-2 text-sm text-white/60">
              Glisse tes images ici ou clique pour parcourir
            </p>
            <p className="mt-1 text-[11px] text-white/30">
              PNG, JPG, WebP — première image = image de départ
            </p>
          </div>

          {images.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              {images.map((img, i) => (
                <div key={i} className="group relative overflow-hidden rounded-xl border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.name}
                    className="aspect-square w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 px-2 py-1 text-[10px] font-medium text-white">
                    {ROLE_LABEL[img.role]}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(i);
                    }}
                    className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mouvements / presets */}
        <div className="card p-5">
          <div className="label">Mouvements & styles</div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => {
              const on = presetIds.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => togglePreset(p.id)}
                  className={`chip ${on ? "chip-on" : "chip-off"}`}
                >
                  <span className="mr-1">{p.emoji}</span>
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Réglages */}
        <div className="card p-5 space-y-5">
          <div className="label mb-0">Réglages</div>

          <div>
            <div className="mb-2 text-xs text-white/50">Format</div>
            <div className="flex flex-wrap gap-2">
              {model.aspectRatios.map((ar) => (
                <button
                  key={ar}
                  onClick={() => setAspectRatio(ar)}
                  className={`chip ${ar === aspectRatio ? "chip-on" : "chip-off"}`}
                >
                  {ar}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 text-xs text-white/50">Durée</div>
            <div className="flex flex-wrap gap-2">
              {model.durations.map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`chip ${d === duration ? "chip-on" : "chip-off"}`}
                >
                  {d}s
                </button>
              ))}
            </div>
          </div>

          {model.options.map((opt) => (
            <div key={opt.name}>
              <div className="mb-2 text-xs text-white/50">{opt.label}</div>
              <div className="flex flex-wrap gap-2">
                {opt.values.map((v) => {
                  const cur = options[opt.name] ?? opt.default;
                  return (
                    <button
                      key={v.value}
                      onClick={() =>
                        setOptions((o) => ({ ...o, [opt.name]: v.value }))
                      }
                      className={`chip ${
                        cur === v.value ? "chip-on" : "chip-off"
                      }`}
                    >
                      {v.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* -------------------- Panneau de prévisualisation / sortie -------------------- */}
      <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
        <div className="card p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="label mb-0">Aperçu</div>
            <span className="text-xs text-white/40">
              ~{estimatedCost} crédits · {model.name}
            </span>
          </div>

          <div
            className={`relative w-full overflow-hidden rounded-xl border border-white/10 bg-ink-900/60 ${aspectClass}`}
          >
            {images[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={images[0].url}
                alt="aperçu"
                className="h-full w-full object-cover opacity-70"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-center text-sm text-white/30">
                {finalPrompt ? (
                  <span className="px-6">{finalPrompt}</span>
                ) : (
                  "Ta scène apparaîtra ici"
                )}
              </div>
            )}
          </div>

          {error && (
            <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            onClick={generate}
            disabled={submitting}
            className="btn-primary mt-4 w-full"
          >
            {submitting ? "Envoi…" : "✨ Générer la vidéo"}
          </button>
        </div>

        {/* Galerie */}
        <div className="card p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="label mb-0">Mes générations</div>
            {generations.length > 0 && (
              <button
                onClick={() => setGenerations([])}
                className="text-xs text-white/40 hover:text-white/70"
              >
                Tout effacer
              </button>
            )}
          </div>

          {generations.length === 0 ? (
            <p className="py-6 text-center text-sm text-white/30">
              Aucune génération pour l'instant.
            </p>
          ) : (
            <div className="space-y-4">
              {generations.map((g) => (
                <GenerationCard key={g.id} gen={g} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GenerationCard({ gen }: { gen: Generation }) {
  const done = gen.state === "completed" && gen.videoUrl;
  const failed = gen.state === "failed";

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-900/40">
      <div className="relative aspect-video w-full bg-ink-950">
        {done ? (
          <video
            src={gen.videoUrl}
            poster={gen.poster}
            controls
            loop
            playsInline
            className="h-full w-full object-contain"
          />
        ) : failed ? (
          <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-red-300">
            {gen.error || "Échec de la génération."}
          </div>
        ) : (
          <div className="absolute inset-0">
            {gen.poster && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={gen.poster}
                alt=""
                className="h-full w-full object-cover opacity-30"
              />
            )}
            <div className="shimmer absolute inset-0 animate-shimmer" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="text-sm font-medium text-white/80">
                {gen.state === "queued" ? "En file d'attente…" : "Génération…"}
              </div>
              <div className="h-1.5 w-2/3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand to-accent transition-all"
                  style={{ width: `${Math.max(5, gen.progress)}%` }}
                />
              </div>
              <div className="text-xs text-white/40">{gen.progress}%</div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 px-3 py-2.5">
        <div className="min-w-0">
          <div className="truncate text-xs text-white/70">
            {gen.prompt || "(sans prompt)"}
          </div>
          <div className="text-[10px] text-white/30">
            {gen.modelName} · {gen.aspectRatio}
          </div>
        </div>
        {done && (
          <a
            href={gen.videoUrl}
            download
            className="btn-ghost shrink-0 px-3 py-1.5 text-xs"
          >
            ⬇︎
          </a>
        )}
      </div>
    </div>
  );
}

function aspectRatioToClass(ar: string): string {
  switch (ar) {
    case "9:16":
      return "aspect-[9/16] max-h-[60vh] mx-auto";
    case "1:1":
      return "aspect-square";
    case "4:3":
      return "aspect-[4/3]";
    case "3:4":
      return "aspect-[3/4] max-h-[60vh] mx-auto";
    case "21:9":
      return "aspect-[21/9]";
    case "16:9":
    default:
      return "aspect-video";
  }
}
