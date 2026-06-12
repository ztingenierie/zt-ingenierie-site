import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  trade?: string;
  message?: string;
};

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const name = body.name?.trim();
  const company = body.company?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();
  if (!name || !company || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Champs obligatoires manquants ou invalides." }, { status: 400 });
  }

  try {
    const { error } = await getSupabaseAdmin().from("leads").insert({
      name,
      company,
      email,
      phone: body.phone?.trim() || null,
      trade: body.trade?.trim() || null,
      message,
      source: "contact_form",
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Lead insert error:", e);
    return NextResponse.json(
      { error: "Envoi impossible pour le moment. Écrivez-nous directement par e-mail." },
      { status: 500 },
    );
  }
}
