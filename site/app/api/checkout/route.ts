import { NextRequest, NextResponse } from "next/server";
import { getStripe, PLANS, PlanId } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { plan?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const plan = body.plan as PlanId;
  if (!plan || !(plan in PLANS)) {
    return NextResponse.json({ error: "Offre inconnue." }, { status: 400 });
  }

  const stripe = getStripe();
  const priceId = process.env[PLANS[plan].priceEnv];
  if (!stripe || !priceId) {
    return NextResponse.json(
      { error: "Le paiement en ligne ouvre très bientôt. Écrivez-nous à contact@accessiveille.fr pour souscrire dès maintenant." },
      { status: 503 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://accessiveille.fr";
  const session = await stripe.checkout.sessions.create({
    mode: PLANS[plan].mode,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${siteUrl}/merci?plan=${plan}`,
    cancel_url: `${siteUrl}/tarifs`,
    locale: "fr",
    allow_promotion_codes: true,
    billing_address_collection: "required",
  });

  return NextResponse.json({ url: session.url });
}
