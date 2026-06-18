import { NextResponse } from "next/server";
import { getProvider } from "@/lib/providers";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const provider = getProvider();
    const status = await provider.status(params.id);
    return NextResponse.json(status);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue.";
    return NextResponse.json(
      { id: params.id, state: "failed", progress: 0, error: message },
      { status: 200 }
    );
  }
}
