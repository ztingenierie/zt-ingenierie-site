import { NextRequest, NextResponse } from "next/server";
import { generateFicheProduit, generateBatch, type ProductInput } from "@/lib/claude";
import { createSupabaseServerClient, createServiceClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const maxDuration = 60;

const PLAN_LIMITS: Record<string, number> = {
  free: 10,
  starter: 200,
  pro: 1000,
  scale: -1,
  agence: -1,
};

export async function POST(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Non authentifié. Veuillez vous connecter." },
        { status: 401 }
      );
    }

    const serviceClient = createServiceClient();
    const { data: profile } = await serviceClient
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json(
        { error: "Profil introuvable." },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { products, tone = "professionnel" } = body as {
      products: Array<Omit<ProductInput, "tone">>;
      tone: ProductInput["tone"];
    };

    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: "Aucun produit fourni." },
        { status: 400 }
      );
    }

    if (products.length > 100) {
      return NextResponse.json(
        { error: "Maximum 100 produits par requête." },
        { status: 400 }
      );
    }

    const limit = PLAN_LIMITS[profile.plan] ?? 10;
    if (limit !== -1) {
      const remaining = limit - (profile.fiches_used_this_month ?? 0);
      if (remaining < products.length) {
        return NextResponse.json(
          {
            error: `Quota insuffisant. Il vous reste ${remaining} fiches ce mois-ci. Passez au plan supérieur pour continuer.`,
            remaining,
            limit,
          },
          { status: 429 }
        );
      }
    }

    const productsWithTone: ProductInput[] = products.map((p) => ({
      ...p,
      tone,
    }));

    const results = await generateBatch(productsWithTone);

    await serviceClient
      .from("profiles")
      .update({
        fiches_used_this_month:
          (profile.fiches_used_this_month ?? 0) + products.length,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    const generationInserts = results.map((r, i) => ({
      user_id: user.id,
      product_name: products[i].name,
      generated_description: r.longDescription,
      tone,
      keywords: products[i].keywords ?? [],
      tokens_used: r.tokensUsed,
    }));

    await serviceClient.from("generations").insert(generationInserts);

    return NextResponse.json({ results, count: results.length });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération. Réessayez dans quelques secondes." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const demo = searchParams.get("demo");

  if (demo !== "true") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const demoProduct: ProductInput = {
    name: "Sac à dos imperméable 30L",
    category: "Sports & Outdoor",
    features: [
      "Imperméable IPX6",
      "30 litres",
      "Compartiment laptop 15 pouces",
      "Bretelles ergonomiques",
      "Poids 800g",
    ],
    keywords: ["sac à dos imperméable", "sac randonnée", "sac étanche"],
    tone: "professionnel",
    targetAudience: "Randonneurs et sportifs outdoor",
    price: 79,
  };

  const result = await generateFicheProduit(demoProduct);
  return NextResponse.json({ result });
}
