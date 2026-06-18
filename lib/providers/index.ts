import { mockProvider } from "./mock";
import { falProvider } from "./fal";
import { selfhostProvider } from "./selfhost";
import type { VideoProvider } from "./types";

export function getProvider(): VideoProvider {
  const name = (process.env.VIDEO_PROVIDER ?? "mock").toLowerCase();
  switch (name) {
    case "selfhost":
      return selfhostProvider;
    case "fal":
      return falProvider;
    case "mock":
    default:
      return mockProvider;
  }
}

export type { GenerateRequest, JobStatus, VideoProvider } from "./types";
