import Stripe from "stripe";

export type PlanId = "essentiel" | "pro" | "agence" | "pack-declaration";

export const PLANS: Record<PlanId, { priceEnv: string; mode: "subscription" | "payment"; label: string }> = {
  essentiel: { priceEnv: "STRIPE_PRICE_ESSENTIEL", mode: "subscription", label: "Essentiel — 39 €/mois" },
  pro: { priceEnv: "STRIPE_PRICE_PRO", mode: "subscription", label: "Pro — 99 €/mois" },
  agence: { priceEnv: "STRIPE_PRICE_AGENCE", mode: "subscription", label: "Agence — 249 €/mois" },
  "pack-declaration": { priceEnv: "STRIPE_PRICE_PACK_DECLARATION", mode: "payment", label: "Pack Déclaration — 390 €" },
};

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  return key ? new Stripe(key) : null;
}
