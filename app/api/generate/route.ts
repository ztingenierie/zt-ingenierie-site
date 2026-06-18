import { NextResponse } from "next/server";
import { getProvider } from "@/lib/providers";
import { getModel } from "@/lib/models";
import type { GenerateRequest } from "@/lib/providers";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  let body: GenerateRequest;
  try {
    body = (await req.json()) as GenerateRequest;
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const model = getModel(body.modelId);
  if (!model) {
    return NextResponse.json({ error: "Modèle inconnu." }, { status: 400 });
  }

  const hasImage = Array.isArray(body.images) && body.images.length > 0;
  if (!body.prompt?.trim() && !hasImage) {
    return NextResponse.json(
      { error: "Donne au moins un prompt ou une image." },
      { status: 400 }
    );
  }
  if (model.requiresImage && !hasImage) {
    return NextResponse.json(
      { error: `${model.name} nécessite au moins une image de départ.` },
      { status: 400 }
    );
  }

  try {
    const provider = getProvider();
    const { id } = await provider.submit({
      modelId: body.modelId,
      prompt: body.prompt ?? "",
      aspectRatio: body.aspectRatio || model.aspectRatios[0],
      duration: body.duration || model.durations[0],
      images: hasImage ? body.images : [],
      options: body.options ?? {}
    });
    return NextResponse.json({ id, provider: provider.name });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
