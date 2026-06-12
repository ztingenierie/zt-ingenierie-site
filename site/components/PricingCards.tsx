"use client";

import { useState } from "react";

const OFFERS = [
  {
    plan: "essentiel",
    name: "Essentiel",
    price: "39 €",
    period: "/mois",
    pitch: "Pour surveiller son propre site",
    features: ["1 site surveillé", "Scan hebdomadaire complet", "Alertes régression par e-mail", "Rapport PDF mensuel"],
    highlighted: false,
  },
  {
    plan: "pro",
    name: "Pro",
    price: "99 €",
    period: "/mois",
    pitch: "Pour produire ses livrables légaux",
    features: [
      "3 sites surveillés",
      "Scans quotidiens",
      "Déclaration d'accessibilité générée",
      "Schéma pluriannuel pré-rempli",
      "Plan d'action priorisé par IA",
    ],
    highlighted: true,
  },
  {
    plan: "agence",
    name: "Agence",
    price: "249 €",
    period: "/mois",
    pitch: "Pour revendre à ses clients",
    features: [
      "15 sites surveillés",
      "Rapports en marque blanche (votre logo)",
      "Pages de partage client",
      "Accès API",
      "Support prioritaire",
    ],
    highlighted: false,
  },
] as const;

export default function PricingCards() {
  const [error, setError] = useState<string | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  async function checkout(plan: string) {
    setError(null);
    setLoadingPlan(plan);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Paiement indisponible.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Paiement indisponible.");
      setLoadingPlan(null);
    }
  }

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3">
        {OFFERS.map((offer) => (
          <div
            key={offer.plan}
            className={`flex flex-col rounded-2xl border p-6 ${
              offer.highlighted ? "border-primary shadow-lg" : "border-slate-200 shadow-sm"
            }`}
          >
            {offer.highlighted && (
              <p className="mb-2 w-fit rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-white">
                Le plus choisi
              </p>
            )}
            <h3 className="text-xl font-bold">{offer.name}</h3>
            <p className="text-sm text-slate2">{offer.pitch}</p>
            <p className="mt-4 text-4xl font-extrabold">
              {offer.price}
              <span className="text-base font-medium text-slate2">{offer.period} HT</span>
            </p>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {offer.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span aria-hidden="true" className="font-bold text-primary">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => checkout(offer.plan)}
              disabled={loadingPlan !== null}
              className={`mt-6 rounded-lg px-4 py-3 font-semibold disabled:opacity-60 ${
                offer.highlighted
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "border border-primary text-primary hover:bg-blue-50"
              }`}
            >
              {loadingPlan === offer.plan ? "Redirection…" : "Souscrire"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">Pack Déclaration — 390 € HT, une fois</h3>
            <p className="text-sm text-slate2">
              Pré-audit complet + déclaration d'accessibilité conforme au modèle officiel + plan
              d'action priorisé. Livré sous 5 jours ouvrés. Idéal pour répondre vite à une demande
              client ou à un contrôle.
            </p>
          </div>
          <button
            onClick={() => checkout("pack-declaration")}
            disabled={loadingPlan !== null}
            className="rounded-lg bg-accent px-5 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-60"
          >
            {loadingPlan === "pack-declaration" ? "Redirection…" : "Commander le pack"}
          </button>
        </div>
      </div>

      <div role="status" aria-live="polite">
        {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-900">{error}</p>}
      </div>

      <p className="mt-6 text-sm text-slate2">
        Sans engagement — résiliation en 2 clics. Essai remboursé 14 jours. TVA non applicable,
        art. 293 B du CGI. <strong>Offre fondateur :</strong> −50 % à vie pour les 10 premiers
        abonnés contre un retour d'expérience écrit.
      </p>
    </div>
  );
}
