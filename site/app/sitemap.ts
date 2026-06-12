import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://accessiveille.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/audit-gratuit`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/tarifs`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/fonctionnalites`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/mentions-legales`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/cgv`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/confidentialite`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
