import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

const OFFERS: Record<string, string | undefined> = {
  memoire: process.env.STRIPE_PRICE_MEMOIRE,
  audit: process.env.STRIPE_PRICE_AUDIT,
};

export async function POST(req: Request) {
  let offer: string;
  try {
    const body = (await req.json()) as { offer?: string };
    offer = body.offer ?? "";
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const priceId = OFFERS[offer];
  if (!priceId) {
    return NextResponse.json(
      { error: "Offre inconnue ou paiement non configuré (voir .env.example)." },
      { status: 400 },
    );
  }

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${SITE.url}/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE.url}/tarifs`,
      billing_address_collection: "required",
      custom_fields: [
        {
          key: "entreprise",
          label: { type: "custom", custom: "Nom de votre entreprise" },
          type: "text",
        },
      ],
      invoice_creation: { enabled: true },
      metadata: { offer },
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("Stripe checkout error:", e);
    return NextResponse.json(
      { error: "Le paiement est momentanément indisponible. Contactez-nous." },
      { status: 500 },
    );
  }
}
