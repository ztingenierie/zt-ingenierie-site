import { NextRequest, NextResponse } from "next/server";
import { analyzeHtml, fetchPage, validateScanUrl } from "@/lib/scanner";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const maxDuration = 30;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  let body: { url?: string; email?: string; consent?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const rawUrl = (body.url ?? "").trim();
  const email = (body.email ?? "").trim().toLowerCase();

  if (!rawUrl) {
    return NextResponse.json({ error: "Indiquez l'adresse du site à analyser." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Indiquez un e-mail professionnel valide pour recevoir le rapport." }, { status: 400 });
  }

  let url;
  try {
    url = validateScanUrl(rawUrl);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }

  try {
    const { html, finalUrl } = await fetchPage(url);
    const result = analyzeHtml(html, url.toString(), finalUrl);

    const supabase = getSupabase();
    if (supabase) {
      await supabase.from("leads").insert({
        email,
        url: result.finalUrl,
        score: result.score,
        issues: result.issues,
        consent_marketing: body.consent === true,
      });
    }

    return NextResponse.json(result);
  } catch (e) {
    const message =
      e instanceof Error && e.name === "AbortError"
        ? "Le site n'a pas répondu dans le délai imparti (12 s)."
        : e instanceof Error
          ? e.message
          : "Analyse impossible.";
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
