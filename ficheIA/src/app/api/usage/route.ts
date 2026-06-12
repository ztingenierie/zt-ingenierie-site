import { NextResponse } from "next/server";
import { createSupabaseServerClient, createServiceClient } from "@/lib/supabase";
import { createPortalSession } from "@/lib/stripe";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const serviceClient = createServiceClient();
    const { data: profile } = await serviceClient
      .from("profiles")
      .select("plan, fiches_used_this_month, fiches_limit, stripe_customer_id")
      .eq("id", user.id)
      .single();

    return NextResponse.json({
      plan: profile?.plan ?? "free",
      used: profile?.fiches_used_this_month ?? 0,
      limit: profile?.fiches_limit ?? 10,
      hasActiveSubscription: !!profile?.stripe_customer_id,
    });
  } catch (error) {
    console.error("Usage route error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const serviceClient = createServiceClient();
    const { data: profile } = await serviceClient
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (!profile?.stripe_customer_id) {
      return NextResponse.json({ error: "Aucun abonnement actif" }, { status: 400 });
    }

    const url = await createPortalSession(profile.stripe_customer_id);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Portal session error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
