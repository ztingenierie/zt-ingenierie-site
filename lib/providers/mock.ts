import { decodeId, encodeId } from "./types";
import type { GenerateRequest, JobStatus, VideoProvider } from "./types";

// Provider de démonstration : aucun appel externe, aucun coût.
// L'avancement est calculé de façon déterministe à partir de l'horodatage
// encodé dans l'ID — donc compatible avec un environnement serverless.

const DEMO_CLIPS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
];

const SIMULATED_MS = 9000;

interface MockPayload {
  p: "mock";
  t: number; // start time
  d: number; // simulated duration
  c: number; // clip index
}

export const mockProvider: VideoProvider = {
  name: "mock",

  async submit(_req: GenerateRequest) {
    const payload: MockPayload = {
      p: "mock",
      t: Date.now(),
      d: SIMULATED_MS,
      c: Math.floor(Math.random() * DEMO_CLIPS.length)
    };
    return { id: encodeId(payload) };
  },

  async status(id: string): Promise<JobStatus> {
    const { t, d, c } = decodeId<MockPayload>(id);
    const elapsed = Date.now() - t;
    const ratio = Math.min(1, elapsed / d);
    const progress = Math.round(ratio * 100);

    if (ratio >= 1) {
      return { id, state: "completed", progress: 100, videoUrl: DEMO_CLIPS[c] };
    }
    return {
      id,
      state: progress < 8 ? "queued" : "processing",
      progress
    };
  }
};
