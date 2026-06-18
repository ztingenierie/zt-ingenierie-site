// Catalogue de modèles de génération vidéo.
// Chaque modèle est mappé vers un endpoint fal.ai réel (mêmes modèles que ceux
// orchestrés par Higgsfield). Le mode "mock" ignore `falEndpoint`.

export type MediaRole = "start_image" | "end_image" | "reference";

export interface ModelOption {
  name: string;
  label: string;
  values: { value: string; label: string }[];
  default: string;
}

export interface VideoModel {
  id: string;
  name: string;
  provider: string;
  tagline: string;
  /** Modèle phare à mettre en avant. */
  featured?: boolean;
  /** true => image obligatoire (image-to-video uniquement). */
  requiresImage?: boolean;
  /** Rôles d'images acceptés, dans l'ordre d'upload. */
  imageRoles: MediaRole[];
  aspectRatios: string[];
  durations: number[];
  options: ModelOption[];
  /** Endpoint fal.ai (queue API). */
  falEndpoint: string;
  /** Coût indicatif en crédits, à titre d'estimation UI. */
  creditCost: number;
}

export const MODELS: VideoModel[] = [
  {
    id: "veo3_1",
    name: "Veo 3.1",
    provider: "Google",
    tagline: "Ultra-réaliste, qualité cinéma haut de gamme, audio natif.",
    featured: true,
    imageRoles: ["start_image"],
    aspectRatios: ["16:9", "9:16"],
    durations: [4, 6, 8],
    options: [
      {
        name: "quality",
        label: "Qualité",
        default: "high",
        values: [
          { value: "basic", label: "Basic" },
          { value: "high", label: "High" },
          { value: "ultra", label: "Ultra" }
        ]
      }
    ],
    falEndpoint: "fal-ai/veo3",
    creditCost: 12
  },
  {
    id: "kling3",
    name: "Kling 3.0",
    provider: "Kling",
    tagline: "Multi-plans, mouvement cinématique, sync audio, transfert de mouvement.",
    featured: true,
    imageRoles: ["start_image", "end_image"],
    aspectRatios: ["16:9", "9:16", "1:1"],
    durations: [5, 10],
    options: [
      {
        name: "mode",
        label: "Mode",
        default: "std",
        values: [
          { value: "std", label: "Standard" },
          { value: "pro", label: "Pro" }
        ]
      },
      {
        name: "sound",
        label: "Audio",
        default: "on",
        values: [
          { value: "on", label: "Avec son" },
          { value: "off", label: "Silencieux" }
        ]
      }
    ],
    falEndpoint: "fal-ai/kling-video/v2/master/image-to-video",
    creditCost: 10
  },
  {
    id: "seedance2",
    name: "Seedance 2.0",
    provider: "ByteDance",
    tagline: "Vidéo pilotée par référence, identité consistante, multi-SKU.",
    featured: true,
    imageRoles: ["start_image", "end_image", "reference"],
    aspectRatios: ["16:9", "9:16", "1:1", "4:3", "3:4", "21:9"],
    durations: [4, 8, 12],
    options: [
      {
        name: "resolution",
        label: "Résolution",
        default: "720p",
        values: [
          { value: "480p", label: "480p" },
          { value: "720p", label: "720p" },
          { value: "1080p", label: "1080p" }
        ]
      }
    ],
    falEndpoint: "fal-ai/bytedance/seedance/v1/pro/image-to-video",
    creditCost: 8
  },
  {
    id: "minimax_hailuo",
    name: "Minimax Hailuo",
    provider: "Hailuo",
    tagline: "Physique naturelle, émotion faciale, rendu réaliste.",
    imageRoles: ["start_image", "end_image"],
    aspectRatios: ["16:9", "9:16"],
    durations: [6, 10],
    options: [
      {
        name: "resolution",
        label: "Résolution",
        default: "768P",
        values: [
          { value: "512P", label: "512p" },
          { value: "768P", label: "768p" },
          { value: "1080P", label: "1080p" }
        ]
      }
    ],
    falEndpoint: "fal-ai/minimax/hailuo-02/standard/image-to-video",
    creditCost: 7
  },
  {
    id: "wan",
    name: "Wan 2.6",
    provider: "Wan",
    tagline: "Stylisé, expérimental, créatif (open-weight).",
    requiresImage: true,
    imageRoles: ["start_image"],
    aspectRatios: ["16:9", "9:16", "1:1"],
    durations: [5],
    options: [
      {
        name: "resolution",
        label: "Qualité",
        default: "720p",
        values: [
          { value: "720p", label: "720p" },
          { value: "1080p", label: "1080p" }
        ]
      }
    ],
    falEndpoint: "fal-ai/wan-pro/image-to-video",
    creditCost: 6
  }
];

export const DEFAULT_MODEL_ID = "veo3_1";

export function getModel(id: string): VideoModel | undefined {
  return MODELS.find((m) => m.id === id);
}
