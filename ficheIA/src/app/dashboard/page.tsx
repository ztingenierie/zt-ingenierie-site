"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";

type Tone = "professionnel" | "chaleureux" | "premium" | "minimaliste" | "technique" | "humoristique";

interface ParsedProduct {
  name: string;
  category?: string;
  features?: string[];
  keywords?: string[];
  price?: number;
}

interface GeneratedFiche {
  title: string;
  metaTitle: string;
  metaDescription: string;
  shortDescription: string;
  longDescription: string;
  bulletPoints: string[];
}

const TONES: { value: Tone; label: string; emoji: string }[] = [
  { value: "professionnel", label: "Professionnel", emoji: "👔" },
  { value: "chaleureux", label: "Chaleureux", emoji: "🤗" },
  { value: "premium", label: "Premium", emoji: "💎" },
  { value: "minimaliste", label: "Minimaliste", emoji: "◻️" },
  { value: "technique", label: "Technique", emoji: "🔧" },
  { value: "humoristique", label: "Humoristique", emoji: "😄" },
];

function parseCSV(text: string): ParsedProduct[] {
  const lines = text.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].toLowerCase().split(",").map((h) => h.trim().replace(/"/g, ""));
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim().replace(/"/g, ""));
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = values[i] ?? ""; });

    return {
      name: obj["nom"] || obj["name"] || obj["produit"] || obj["title"] || values[0] || "Produit",
      category: obj["categorie"] || obj["category"] || obj["type"],
      keywords: obj["mots-cles"] ? obj["mots-cles"].split(";") : obj["keywords"] ? obj["keywords"].split(";") : undefined,
      features: obj["caracteristiques"] ? obj["caracteristiques"].split(";") : undefined,
      price: obj["prix"] ? parseFloat(obj["prix"]) : undefined,
    };
  });
}

export default function DashboardPage() {
  const [tone, setTone] = useState<Tone>("professionnel");
  const [products, setProducts] = useState<ParsedProduct[]>([]);
  const [csvText, setCsvText] = useState("");
  const [manualProduct, setManualProduct] = useState({ name: "", category: "", keywords: "", features: "" });
  const [results, setResults] = useState<GeneratedFiche[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"manual" | "csv">("manual");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setCsvText(text);
      const parsed = parseCSV(text);
      setProducts(parsed);
    };
    reader.readAsText(file, "UTF-8");
  }, []);

  const generate = async () => {
    setError("");
    setLoading(true);
    setProgress(0);

    let productsToGenerate: ParsedProduct[] = [];
    if (tab === "manual") {
      if (!manualProduct.name.trim()) {
        setError("Veuillez entrer un nom de produit.");
        setLoading(false);
        return;
      }
      productsToGenerate = [{
        name: manualProduct.name,
        category: manualProduct.category || undefined,
        keywords: manualProduct.keywords ? manualProduct.keywords.split(",").map(k => k.trim()) : undefined,
        features: manualProduct.features ? manualProduct.features.split("\n").filter(Boolean) : undefined,
      }];
    } else {
      if (products.length === 0) {
        setError("Importez un fichier CSV d'abord.");
        setLoading(false);
        return;
      }
      productsToGenerate = products.slice(0, 10);
    }

    const interval = setInterval(() => setProgress((p) => Math.min(p + 8, 90)), 400);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: productsToGenerate, tone }),
      });

      const data = await res.json();
      clearInterval(interval);
      setProgress(100);

      if (!res.ok) {
        if (res.status === 401) {
          setError("Connectez-vous pour utiliser le générateur. (Demo : l'authentification Supabase n'est pas configurée)");
        } else {
          setError(data.error ?? "Erreur de génération.");
        }
        return;
      }

      setResults(data.results ?? []);
    } catch {
      clearInterval(interval);
      setError("Erreur réseau. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const exportCSV = () => {
    const headers = ["Nom", "Titre H1", "Meta Title", "Meta Description", "Description courte", "Description longue", "Points forts"];
    const rows = results.map((r, i) => [
      products[i]?.name ?? `Produit ${i + 1}`,
      r.title,
      r.metaTitle,
      r.metaDescription,
      r.shortDescription,
      r.longDescription,
      r.bulletPoints.join(" | "),
    ]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ficheIA-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-xl font-black text-brand-600">Fiche</span>
          <span className="text-xl font-black gradient-text">IA</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 hidden md:block">Plan gratuit · 10 fiches restantes</span>
          <Link href="/pricing" className="btn-primary text-sm py-2 px-4">Passer au Pro</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Générateur de fiches produits</h1>
          <p className="text-slate-600">Importez vos produits et générez des fiches SEO prêtes à publier.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-5">
              <h2 className="font-semibold text-slate-900 mb-4">1. Source des produits</h2>
              <div className="flex rounded-lg border border-slate-200 overflow-hidden mb-4">
                {(["manual", "csv"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${
                      tab === t ? "bg-brand-600 text-white" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {t === "manual" ? "Manuel" : "CSV"}
                  </button>
                ))}
              </div>

              {tab === "manual" ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Nom du produit *</label>
                    <input
                      type="text"
                      value={manualProduct.name}
                      onChange={(e) => setManualProduct((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Ex: Sac à dos imperméable 30L"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Catégorie</label>
                    <input
                      type="text"
                      value={manualProduct.category}
                      onChange={(e) => setManualProduct((p) => ({ ...p, category: e.target.value }))}
                      placeholder="Ex: Sports & Outdoor"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Mots-clés SEO (séparés par des virgules)</label>
                    <input
                      type="text"
                      value={manualProduct.keywords}
                      onChange={(e) => setManualProduct((p) => ({ ...p, keywords: e.target.value }))}
                      placeholder="sac imperméable, randonnée, outdoor"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Caractéristiques (une par ligne)</label>
                    <textarea
                      value={manualProduct.features}
                      onChange={(e) => setManualProduct((p) => ({ ...p, features: e.target.value }))}
                      placeholder={"IPX6 imperméable\n30 litres\nCompartiment laptop 15\""}
                      rows={4}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <input ref={fileRef} type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="w-full border-2 border-dashed border-slate-300 rounded-xl py-8 text-center hover:border-brand-400 transition-colors"
                  >
                    <div className="text-4xl mb-2">📂</div>
                    <p className="text-sm font-medium text-slate-700">Cliquez pour importer un CSV</p>
                    <p className="text-xs text-slate-500 mt-1">Colonnes : nom, categorie, mots-cles, caracteristiques, prix</p>
                  </button>
                  {products.length > 0 && (
                    <div className="mt-3 p-3 bg-accent-50 rounded-lg border border-accent-200">
                      <p className="text-sm text-accent-700 font-medium">
                        ✓ {products.length} produit{products.length > 1 ? "s" : ""} importé{products.length > 1 ? "s" : ""}
                      </p>
                      <p className="text-xs text-accent-600 mt-0.5">
                        {products.slice(0, 3).map(p => p.name).join(", ")}
                        {products.length > 3 && ` +${products.length - 3} autres`}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="card p-5">
              <h2 className="font-semibold text-slate-900 mb-4">2. Ton de rédaction</h2>
              <div className="grid grid-cols-2 gap-2">
                {TONES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTone(t.value)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                      tone === t.value
                        ? "bg-brand-600 text-white"
                        : "border border-slate-200 text-slate-700 hover:border-brand-300"
                    }`}
                  >
                    <span>{t.emoji}</span>
                    <span className="font-medium">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generate}
              disabled={loading}
              className="w-full btn-cta py-4 text-base"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Génération en cours...
                </span>
              ) : (
                "✨ Générer les fiches produits"
              )}
            </button>

            {loading && (
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-brand-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {error}
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            {results.length === 0 ? (
              <div className="card p-12 text-center border-2 border-dashed border-slate-200">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  Vos fiches produits apparaîtront ici
                </h3>
                <p className="text-slate-500 text-sm">
                  Renseignez un produit à gauche et cliquez sur Générer
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-slate-900">
                    {results.length} fiche{results.length > 1 ? "s" : ""} générée{results.length > 1 ? "s" : ""}
                  </h2>
                  <button onClick={exportCSV} className="btn-secondary text-sm py-2 px-4">
                    ⬇ Exporter CSV
                  </button>
                </div>

                {results.map((r, i) => (
                  <div key={i} className="card overflow-hidden">
                    <div className="bg-brand-600 text-white px-5 py-3 flex items-center justify-between">
                      <span className="font-semibold text-sm">
                        {tab === "manual" ? manualProduct.name : (products[i]?.name ?? `Produit ${i + 1}`)}
                      </span>
                      <span className="text-brand-200 text-xs">Fiche #{i + 1}</span>
                    </div>
                    <div className="p-5 space-y-4 text-sm">
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Titre H1</div>
                        <p className="font-semibold text-slate-900">{r.title}</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Meta Title ({r.metaTitle.length} car.)</div>
                          <p className="text-slate-700 bg-slate-50 rounded px-3 py-2">{r.metaTitle}</p>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Meta Description ({r.metaDescription.length} car.)</div>
                          <p className="text-slate-700 bg-slate-50 rounded px-3 py-2">{r.metaDescription}</p>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Accroche</div>
                        <p className="text-slate-700 leading-relaxed">{r.shortDescription}</p>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Points forts</div>
                        <ul className="space-y-1">
                          {r.bulletPoints.map((bp, j) => (
                            <li key={j} className="flex items-start gap-2 text-slate-700">
                              <span className="text-accent-500 mt-0.5">✓</span> {bp}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <details>
                        <summary className="text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700">
                          Description longue (cliquer pour afficher)
                        </summary>
                        <p className="mt-2 text-slate-700 leading-relaxed whitespace-pre-wrap">{r.longDescription}</p>
                      </details>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
