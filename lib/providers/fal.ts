import { decodeId, encodeId } from "./types";
import type { GenerateRequest, JobStatus, VideoProvider } from "./types";

// Provider de génération réelle via fal.ai (queue API).
// fal héberge les mêmes modèles que ceux orchestrés par Higgsfield :
// Veo, Kling, Seedance, Minimax Hailuo, Wan.
//
// NB : les schémas exacts de fal évoluent. Toute la spécificité fal est
// centralisée ici (endpoints + construction du body), donc un seul fichier à
// ajuster si un schéma change. Voir https://fal.ai/models pour les paramètres.

const FAL_BASE = "https://queue.fal.run";

interface FalConfig {
  /** Endpoint si une image de départ est fournie. */
  image: string;
  /** Endpoint texte→vidéo (fallback sans image). */
  text?: string;
  build: (req: GenerateRequest, imageUrl?: string) => Record<string, unknown>;
}

const startImage = (req: GenerateRequest) =>
  req.images.find((i) => i.role === "start_image")?.url ?? req.images[0]?.url;

const endImage = (req: GenerateRequest) =>
  req.images.find((i) => i.role === "end_image")?.url;

const CONFIG: Record<string, FalConfig> = {
  veo3_1: {
    image: "fal-ai/veo3/image-to-video",
    text: "fal-ai/veo3",
    build: (req, imageUrl) => ({
      prompt: req.prompt,
      aspect_ratio: req.aspectRatio,
      duration: `${req.duration}s`,
      generate_audio: true,
      resolution: req.options.quality === "ultra" ? "1080p" : "720p",
      ...(imageUrl ? { image_url: imageUrl } : {})
    })
  },
  kling3: {
    image: "fal-ai/kling-video/v2/master/image-to-video",
    text: "fal-ai/kling-video/v2/master/text-to-video",
    build: (req, imageUrl) => ({
      prompt: req.prompt,
      duration: String(req.duration),
      aspect_ratio: req.aspectRatio,
      ...(imageUrl ? { image_url: imageUrl } : {}),
      ...(endImage(req) ? { tail_image_url: endImage(req) } : {})
    })
  },
  seedance2: {
    image: "fal-ai/bytedance/seedance/v1/pro/image-to-video",
    text: "fal-ai/bytedance/seedance/v1/pro/text-to-video",
    build: (req, imageUrl) => ({
      prompt: req.prompt,
      aspect_ratio: req.aspectRatio,
      resolution: req.options.resolution ?? "720p",
      duration: String(req.duration),
      ...(imageUrl ? { image_url: imageUrl } : {}),
      ...(endImage(req) ? { end_image_url: endImage(req) } : {})
    })
  },
  minimax_hailuo: {
    image: "fal-ai/minimax/hailuo-02/standard/image-to-video",
    text: "fal-ai/minimax/hailuo-02/standard/text-to-video",
    build: (req, imageUrl) => ({
      prompt: req.prompt,
      duration: String(req.duration),
      resolution: req.options.resolution ?? "768P",
      ...(imageUrl ? { image_url: imageUrl } : {})
    })
  },
  wan: {
    image: "fal-ai/wan-pro/image-to-video",
    build: (req, imageUrl) => ({
      prompt: req.prompt,
      resolution: req.options.resolution ?? "720p",
      ...(imageUrl ? { image_url: imageUrl } : {})
    })
  }
};

interface FalPayload {
  p: "fal";
  s: string; // status_url
  r: string; // response_url
}

function falKey(): string {
  const key = process.env.FAL_KEY;
  if (!key) {
    throw new Error(
      "FAL_KEY manquant. Renseigne-le dans .env.local (voir .env.example)."
    );
  }
  return key;
}

function extractVideoUrl(result: unknown): string | undefined {
  const r = result as Record<string, any>;
  return (
    r?.video?.url ??
    (typeof r?.video === "string" ? r.video : undefined) ??
    r?.videos?.[0]?.url ??
    r?.output?.video?.url ??
    r?.url
  );
}

export const falProvider: VideoProvider = {
  name: "fal",

  async submit(req: GenerateRequest) {
    const cfg = CONFIG[req.modelId];
    if (!cfg) throw new Error(`Modèle inconnu pour fal : ${req.modelId}`);

    const imageUrl = startImage(req);
    const endpoint = imageUrl ? cfg.image : cfg.text ?? cfg.image;
    const body = cfg.build(req, imageUrl);

    const res = await fetch(`${FAL_BASE}/${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Key ${falKey()}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`fal a refusé la requête (${res.status}) : ${text}`);
    }

    const data = (await res.json()) as {
      status_url: string;
      response_url: string;
    };
    const payload: FalPayload = {
      p: "fal",
      s: data.status_url,
      r: data.response_url
    };
    return { id: encodeId(payload) };
  },

  async status(id: string): Promise<JobStatus> {
    const { s, r } = decodeId<FalPayload>(id);
    const auth = { Authorization: `Key ${falKey()}` };

    const statusRes = await fetch(s, { headers: auth, cache: "no-store" });
    if (!statusRes.ok) {
      return { id, state: "failed", progress: 0, error: `Statut indisponible (${statusRes.status})` };
    }
    const status = (await statusRes.json()) as {
      status: "IN_QUEUE" | "IN_PROGRESS" | "COMPLETED";
      queue_position?: number;
    };

    if (status.status === "IN_QUEUE") {
      return { id, state: "queued", progress: 5 };
    }
    if (status.status === "IN_PROGRESS") {
      return { id, state: "processing", progress: 55 };
    }

    // COMPLETED → récupérer le résultat
    const resultRes = await fetch(r, { headers: auth, cache: "no-store" });
    const result = await resultRes.json();
    const videoUrl = extractVideoUrl(result);
    if (!videoUrl) {
      return { id, state: "failed", progress: 100, error: "Aucune vidéo dans la réponse fal." };
    }
    return { id, state: "completed", progress: 100, videoUrl };
  }
};
