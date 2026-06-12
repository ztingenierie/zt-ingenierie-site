import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export const PLANS = {
  free: {
    name: "Gratuit",
    price: 0,
    priceId: null,
    fichesLimit: 10,
    boutiques: 1,
    features: ["10 fiches d'essai", "Export CSV", "Support email"],
  },
  starter: {
    name: "Starter",
    price: 19,
    priceId: process.env.STRIPE_PRICE_STARTER!,
    fichesLimit: 200,
    boutiques: 1,
    features: [
      "200 fiches/mois",
      "Export CSV",
      "Tous les tons",
      "Support email",
    ],
  },
  pro: {
    name: "Pro",
    price: 49,
    priceId: process.env.STRIPE_PRICE_PRO!,
    fichesLimit: 1000,
    boutiques: 3,
    features: [
      "1 000 fiches/mois",
      "Export CSV + Shopify API",
      "3 boutiques",
      "Tons personnalisés",
      "Support chat",
    ],
  },
  scale: {
    name: "Scale",
    price: 99,
    priceId: process.env.STRIPE_PRICE_SCALE!,
    fichesLimit: -1,
    boutiques: 10,
    features: [
      "Fiches illimitées",
      "CSV + Shopify + WooCommerce",
      "10 boutiques",
      "API FicheIA",
      "Support prioritaire",
    ],
  },
  agence: {
    name: "Agence",
    price: 249,
    priceId: process.env.STRIPE_PRICE_AGENCE!,
    fichesLimit: -1,
    boutiques: -1,
    features: [
      "Fiches illimitées",
      "Boutiques illimitées",
      "Marque blanche",
      "API complète",
      "Onboarding dédié",
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;

export async function createCheckoutSession(
  priceId: string,
  customerId: string | null,
  userId: string,
  userEmail: string
): Promise<string> {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer: customerId ?? undefined,
    customer_email: customerId ? undefined : userEmail,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?checkout=cancelled`,
    metadata: { userId },
    subscription_data: {
      metadata: { userId },
      trial_period_days: 0,
    },
    locale: "fr",
    allow_promotion_codes: true,
    billing_address_collection: "required",
    tax_id_collection: { enabled: true },
    automatic_tax: { enabled: true },
  });

  return session.url!;
}

export async function createPortalSession(customerId: string): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    locale: "fr",
  });
  return session.url;
}
