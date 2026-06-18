import { decodeId, encodeId } from "./types";
import type { GenerateRequest, JobStatus, VideoProvider } from "./types";

// Provider auto-hébergé : appelle le moteur Python (engine/) qui fait tourner
// un modèle open-weight (LTX-Video / Wan) sur TON GPU. Aucune API tierce.

function engineUrl(): string {
  return (process.env.ENGINE_URL ?? "http://localhost:8000").replace(/\/$/, "");
}

interface SelfhostPayload {
  p: "selfhost";
  j: string; // job id côté moteur
}

const startImage = (req: GenerateRequest) =>
  req.images.find((i) => i.role === "start_image")?.url ?? req.images[0]?.url;

export const selfhostProvider: VideoProvider = {
  name: "selfhost",

  async submit(req: GenerateRequest) {
    const res = await fetch(`${engineUrl()}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: req.prompt,
        image: startImage(req) ?? null,
        aspect_ratio: req.aspectRatio,
        duration: req.duration
      })
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Le moteur a refusé la requête (${res.status}) : ${text}`);
    }
    const data = (await res.json()) as { id: string };
    const payload: SelfhostPayload = { p: "selfhost", j: data.id };
    return { id: encodeId(payload) };
  },

  async status(id: string): Promise<JobStatus> {
    const { j } = decodeId<SelfhostPayload>(id);
    const res = await fetch(`${engineUrl()}/status/${j}`, { cache: "no-store" });
    if (!res.ok) {
      return { id, state: "failed", progress: 0, error: `Statut indisponible (${res.status})` };
    }
    const s = (await res.json()) as {
      state: JobStatus["state"];
      progress: number;
      video_url?: string | null;
      error?: string | null;
    };
    return {
      id,
      state: s.state,
      progress: s.progress ?? 0,
      videoUrl: s.video_url ? `${engineUrl()}${s.video_url}` : undefined,
      error: s.error ?? undefined
    };
  }
};
