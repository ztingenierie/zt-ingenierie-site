"use client";

import { useState } from "react";
import Link from "next/link";

const plans = [
  {
    key: "free",
    name: "Gratuit",
    price: 0,
    period: "",
    description: "Pour tester la qualité",
    fiches: "10 fiches",
    boutiques: "1 boutique",
    highlight: false,
    cta: "Essayer gratuitement",
    ctaHref: "/dashboard",
    features: [
      "10 fiches d'essai offertes",
      "Tous les tons disponibles",
      "Export CSV",
      "Support email",
    ],
    notIncluded: ["Intégration Shopify API", "Boutiques multiples"],
  },
  {
    key: "starter",
    name: "Starter",
    price: 19,
    period: "/mois",
    description: "Pour les boutiques jusqu'à 300 produits",
    fiches: "200 fiches/mois",
    boutiques: "1 boutique",
    highlight: false,
    cta: "Démarrer",
    ctaHref: "/dashboard?plan=starter",
    features: [
      "200 fiches produits/mois",
      "Tous les tons de rédaction",
      "Mots-clés SEO personnalisés",
      "Export CSV Shopify/WooCommerce",
      "Support email",
    ],
    notIncluded: ["Intégration Shopify API directe"],
  },
  {
    key: "pro",
    name: "Pro",
    price: 49,
    period: "/mois",
    description: "Pour les boutiques en croissance",
    fiches: "1 000 fiches/mois",
    boutiques: "3 boutiques",
    highlight: true,
    badge: "Le plus populaire",
    cta: "Passer au Pro",
    ctaHref: "/dashboard?plan=pro",
    features: [
      "1 000 fiches produits/mois",
      "Tous les tons + tons personnalisés",
      "Mots-clés SEO par produit",
      "Export CSV + intégration Shopify API",
      "3 boutiques connectées",
      "Support chat prioritaire",
      "Historique des générations",
    ],
    notIncluded: [],
  },
  {
    key: "scale",
    name: "Scale",
    price: 99,
    period: "/mois",
    description: "Pour les gros catalogues et agences",
    fiches: "Illimité",
    boutiques: "10 boutiques",
    highlight: false,
    cta: "Passer au Scale",
    ctaHref: "/dashboard?plan=scale",
    features: [
      "Fiches produits illimitées",
      "CSV + Shopify + WooCommerce",
      "10 boutiques connectées",
      "API FicheIA (intégration custom)",
      "Support prioritaire dédié",
      "Rapports d'utilisation",
    ],
    notIncluded: [],
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-sm font-medium mb-4">
            Tarifs transparents, sans surprise
          </div>
          <h2 className="section-title mb-4">
            Commencez gratuitement,{" "}
            <span className="gradient-text">scalez quand vous êtes prêt</span>
          </h2>
          <p className="section-subtitle mb-8">
            Pas d&apos;engagement. Résiliez en 1 clic. TVA française incluse.
          </p>

          <div className="inline-flex items-center gap-3 bg-slate-100 rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !annual ? "bg-white shadow text-slate-900" : "text-slate-500"
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                annual ? "bg-white shadow text-slate-900" : "text-slate-500"
              }`}
            >
              Annuel
              <span className="badge bg-accent-500/10 text-accent-600 text-xs px-2 py-0.5">
                -20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const displayPrice = annual && plan.price > 0
              ? Math.round(plan.price * 0.8)
              : plan.price;

            return (
              <div
                key={plan.key}
                className={`relative rounded-2xl p-6 flex flex-col ${
                  plan.highlight
                    ? "bg-brand-600 text-white shadow-2xl shadow-brand-600/30 scale-105"
                    : "card border border-slate-200"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent-500 text-white text-xs font-bold rounded-full whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}

                <div className="mb-6">
                  <div className={`text-sm font-bold uppercase tracking-wider mb-1 ${plan.highlight ? "text-brand-200" : "text-slate-500"}`}>
                    {plan.name}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-black ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                      {plan.price === 0 ? "Gratuit" : `€${displayPrice}`}
                    </span>
                    {plan.period && (
                      <span className={`text-sm ${plan.highlight ? "text-brand-200" : "text-slate-500"}`}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                  {annual && plan.price > 0 && (
                    <div className={`text-xs mt-1 ${plan.highlight ? "text-brand-200" : "text-slate-500"}`}>
                      Facturé €{Math.round(displayPrice * 12)}/an
                    </div>
                  )}
                  <p className={`text-sm mt-2 ${plan.highlight ? "text-brand-200" : "text-slate-600"}`}>
                    {plan.description}
                  </p>
                </div>

                <div className={`text-xs font-semibold uppercase tracking-wide mb-3 ${plan.highlight ? "text-brand-200" : "text-slate-500"}`}>
                  {plan.fiches} · {plan.boutiques}
                </div>

                <ul className="space-y-2 flex-1 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className={`flex items-start gap-2 text-sm ${plan.highlight ? "text-white" : "text-slate-700"}`}>
                      <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? "text-accent-300" : "text-accent-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                  {plan.notIncluded.map((f, i) => (
                    <li key={i} className={`flex items-start gap-2 text-sm ${plan.highlight ? "text-brand-300" : "text-slate-400"}`}>
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.ctaHref}
                  className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    plan.highlight
                      ? "bg-white text-brand-600 hover:bg-brand-50"
                      : plan.key === "free"
                      ? "border-2 border-slate-200 text-slate-700 hover:border-brand-300 hover:text-brand-600"
                      : "btn-primary"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            💳 Paiement sécurisé par Stripe · Factures TVA françaises · Résiliation instantanée ·{" "}
            <Link href="/pricing" className="text-brand-600 hover:underline">
              Besoin du plan Agence (€249/mois) ?
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
