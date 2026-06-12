import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export type Tone =
  | "professionnel"
  | "chaleureux"
  | "premium"
  | "minimaliste"
  | "technique"
  | "humoristique";

export interface ProductInput {
  name: string;
  category?: string;
  features?: string[];
  keywords?: string[];
  tone: Tone;
  targetAudience?: string;
  price?: number;
  brand?: string;
}

export interface GeneratedFiche {
  title: string;
  metaTitle: string;
  metaDescription: string;
  shortDescription: string;
  longDescription: string;
  bulletPoints: string[];
  tokensUsed: number;
}

const TONE_PROMPTS: Record<Tone, string> = {
  professionnel: "Ton professionnel, clair et factuel. Vocabulaire B2B.",
  chaleureux:
    "Ton chaleureux, bienveillant, proche du client. Vocabulaire accessible.",
  premium:
    "Ton luxe, aspirationnel, sophistiqué. Vocabulaire haut de gamme, riche.",
  minimaliste: "Ton épuré, direct, concis. Pas de superlatifs inutiles.",
  technique: "Ton technique, précis, orienté spécifications. Vocabulaire expert.",
  humoristique:
    "Ton léger, créatif, avec une touche d'humour subtil et de personnalité.",
};

export async function generateFicheProduit(
  product: ProductInput
): Promise<GeneratedFiche> {
  const keywordsList =
    product.keywords?.length
      ? `Mots-clés SEO à intégrer naturellement : ${product.keywords.join(", ")}`
      : "";

  const featuresList =
    product.features?.length
      ? `Caractéristiques du produit : ${product.features.join(", ")}`
      : "";

  const prompt = `Tu es un expert en copywriting e-commerce et SEO français. Génère une fiche produit complète et optimisée SEO pour le marché français.

PRODUIT : ${product.name}
${product.category ? `CATÉGORIE : ${product.category}` : ""}
${product.brand ? `MARQUE : ${product.brand}` : ""}
${product.price ? `PRIX : ${product.price}€` : ""}
${product.targetAudience ? `CIBLE : ${product.targetAudience}` : ""}
${featuresList}
${keywordsList}

TON : ${TONE_PROMPTS[product.tone]}

Génère une réponse JSON avec EXACTEMENT cette structure :
{
  "title": "Titre H1 accrocheur (50-60 caractères, mot-clé principal en premier)",
  "metaTitle": "Balise title SEO (50-60 caractères)",
  "metaDescription": "Meta description (150-160 caractères, CTA inclus)",
  "shortDescription": "Accroche courte (2-3 phrases, bénéfice immédiat, 80-120 mots)",
  "longDescription": "Description longue (300-500 mots, structurée, SEO-friendly, bénéfices + caractéristiques + réassurance)",
  "bulletPoints": ["Point fort 1", "Point fort 2", "Point fort 3", "Point fort 4", "Point fort 5"]
}

RÈGLES :
- Français parfait, zéro faute
- Pas de majuscules inutiles, pas de CRIS
- Intègre les mots-clés de façon naturelle
- Chaque champ doit être optimisé pour son rôle (SEO ou conversion)
- Les bullet points commencent par un verbe d'action ou un avantage chiffré
- Réponds UNIQUEMENT avec le JSON, sans texte avant ou après`;

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1500,
    messages: [{ role: "user", content: prompt }],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude API");
  }

  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Could not parse JSON from Claude response");
  }

  const parsed = JSON.parse(jsonMatch[0]);
  const tokensUsed =
    message.usage.input_tokens + message.usage.output_tokens;

  return {
    title: parsed.title,
    metaTitle: parsed.metaTitle,
    metaDescription: parsed.metaDescription,
    shortDescription: parsed.shortDescription,
    longDescription: parsed.longDescription,
    bulletPoints: parsed.bulletPoints,
    tokensUsed,
  };
}

export async function generateBatch(
  products: ProductInput[],
  onProgress?: (completed: number, total: number) => void
): Promise<GeneratedFiche[]> {
  const results: GeneratedFiche[] = [];
  const CONCURRENCY = 3;

  for (let i = 0; i < products.length; i += CONCURRENCY) {
    const batch = products.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map((p) => generateFicheProduit(p))
    );
    results.push(...batchResults);
    onProgress?.(Math.min(i + CONCURRENCY, products.length), products.length);
  }

  return results;
}
