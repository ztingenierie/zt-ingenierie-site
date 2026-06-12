"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Échec de l'envoi. Réessayez ou écrivez-nous par e-mail.");
      }
      window.dataLayer?.push({ event: "lead", lead_source: "contact_form" });
      window.fbq?.("track", "Lead");
      form.reset();
      setStatus("ok");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erreur inattendue.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-xl border border-win/30 bg-win/10 p-6 text-night">
        <p className="font-semibold">Message bien reçu ✔</p>
        <p className="mt-1 text-sm">
          Nous revenons vers vous sous 4 h ouvrées. Si votre consultation a une échéance proche,
          indiquez-le dans votre boîte mail de confirmation et nous prioriserons.
        </p>
      </div>
    );
  }

  const input =
    "w-full rounded-lg border border-night/20 bg-white px-4 py-3 text-ink placeholder:text-ink/40 focus:border-chantier focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Votre nom *" className={input} />
        <input name="company" required placeholder="Entreprise *" className={input} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="email" type="email" required placeholder="E-mail *" className={input} />
        <input name="phone" type="tel" placeholder="Téléphone" className={input} />
      </div>
      <select name="trade" defaultValue="" className={input} aria-label="Corps d'état">
        <option value="" disabled>Votre corps d'état…</option>
        <option>Électricité</option>
        <option>Plomberie / CVC</option>
        <option>Peinture / Finitions</option>
        <option>Menuiserie / Agencement</option>
        <option>Autre</option>
      </select>
      <textarea
        name="message"
        required
        rows={5}
        placeholder="Votre besoin : consultation visée, date limite de remise, questions… *"
        className={input}
      />
      <p className="text-xs text-ink/60">
        Les données de ce formulaire servent uniquement à traiter votre demande —{" "}
        <a href="/confidentialite" className="underline">politique de confidentialité</a>.
      </p>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg bg-chantier px-6 py-3 font-semibold text-white shadow hover:bg-chantier/90 disabled:opacity-60"
      >
        {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
      </button>
      {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}
    </form>
  );
}
