import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, PLANS } from "@/lib/stripe";
import { createSupabaseServerClient, createServiceClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { planKey } = await req.json();

    if (!planKey || !(planKey in PLANS) || planKey === "free") {
      return NextResponse.json({ error: "Plan invalide" }, { status: 400 });
    }

    const plan = PLANS[planKey as keyof typeof PLANS];
    if (!plan.priceId) {
      return NextResponse.json({ error: "Plan non disponible" }, { status: 400 });
    }

    const serviceClient = createServiceClient();
    const { data: profile } = await serviceClient
      .from("profiles")
      .select("stripe_customer_id, email")
      .eq("id", user.id)
      .single();

    const checkoutUrl = await createCheckoutSession(
      plan.priceId,
      profile?.stripe_customer_id ?? null,
      user.id,
      user.email!
    );

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du paiement" },
      { status: 500 }
    );
  }
}
