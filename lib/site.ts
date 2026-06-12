export const SITE = {
  name: "Attriba",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://attriba.fr",
  tagline: "Le mémoire technique qui gagne des marchés. Livré en 48 h.",
  description:
    "Attriba rédige le mémoire technique de vos réponses aux marchés publics. Spécialistes du second œuvre BTP. Livré en 48 h, prix fixe 590 € HT, relu par un expert.",
  email: "contact@attriba.fr",
  phone: "[À COMPLÉTER]",
};

export const PRICES = {
  memoire: { label: "Mémoire Express", amount: 590 },
  audit: { label: "Audit Flash", amount: 90 },
  conquete: { label: "Pack Conquête", amount: 1490 },
  attributaire: { label: "Pack Attributaire", amount: 2990 },
} as const;
