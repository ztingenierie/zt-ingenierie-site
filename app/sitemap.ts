import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/offre", "/tarifs", "/contact", "/cgv", "/cgu", "/mentions-legales", "/confidentialite"];
  return pages.map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: new Date(),
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p === "/tarifs" ? 0.9 : 0.6,
  }));
}
