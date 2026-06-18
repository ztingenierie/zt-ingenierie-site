import type { MediaRole } from "@/lib/models";

export interface InputImage {
  role: MediaRole;
  /** Data URL (data:image/...;base64,...) ou URL publique. */
  url: string;
}

export interface GenerateRequest {
  modelId: string;
  prompt: string;
  aspectRatio: string;
  duration: number;
  images: InputImage[];
  options: Record<string, string>;
}

export type JobState = "queued" | "processing" | "completed" | "failed";

export interface JobStatus {
  id: string;
  state: JobState;
  /** 0..100 */
  progress: number;
  videoUrl?: string;
  error?: string;
}

export interface VideoProvider {
  readonly name: string;
  submit(req: GenerateRequest): Promise<{ id: string }>;
  status(id: string): Promise<JobStatus>;
}

// --- Codec d'ID sans état : on encode tout le contexte nécessaire au polling
// dans l'identifiant, pour ne dépendre d'aucune mémoire serveur (serverless-safe).

export function encodeId(payload: unknown): string {
  const json = JSON.stringify(payload);
  return Buffer.from(json, "utf8").toString("base64url");
}

export function decodeId<T = Record<string, unknown>>(id: string): T {
  const json = Buffer.from(id, "base64url").toString("utf8");
  return JSON.parse(json) as T;
}
