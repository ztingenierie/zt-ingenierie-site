"use client";

import { useState } from "react";

const faqs = [
  {
    q: "La qualité des fiches est-elle vraiment bonne ?",
    a: "Oui — FicheIA utilise Claude, l'un des meilleurs LLMs pour la rédaction en français. Les fiches respectent la grammaire, les règles SEO et le ton choisi. Vous pouvez tester avec 10 fiches gratuites avant de payer quoi que ce soit. Si la qualité ne vous convainc pas, vous ne payez rien.",
  },
  {
    q: "Combien de temps faut-il pour générer 100 fiches ?",
    a: "Environ 3-5 minutes pour 100 fiches en génération batch. Chaque fiche inclut titre H1, meta title, meta description, description courte, description longue et 5 points forts. Ce que vous feriez en 20+ heures manuellement.",
  },
  {
    q: "Est-ce que ça fonctionne avec Shopify ?",
    a: "Oui. Plan Starter : export CSV compatible Shopify (import direct via l'interface admin). Plans Pro et Scale : connexion API directe — vous publiez en un clic sans télécharger de fichier.",
  },
  {
    q: "Les fiches sont-elles uniques ou copiées ?",
    a: "Chaque fiche est générée à la volée par l'IA en fonction de votre produit spécifique. Elles ne sont jamais copiées d'autres sources. Elles passent les détecteurs de plagiat classiques et sont 100% originales.",
  },
  {
    q: "Est-ce conforme au RGPD ?",
    a: "Oui. Vos données (catalogue produits, compte) sont hébergées en Europe via Supabase EU. Nous ne revendons aucune donnée. Politique RGPD complète disponible sur le site. Factures TVA françaises automatiques.",
  },
  {
    q: "Que se passe-t-il si je dépasse mon quota mensuel ?",
    a: "La génération s'arrête proprement avec un message d'information. Vous pouvez upgrader immédiatement vers un plan supérieur — l'upgrade est instantané et vous continuez sans interruption.",
  },
  {
    q: "Puis-je annuler à tout moment ?",
    a: "Oui, résiliation en 1 clic depuis votre tableau de bord, sans frais ni préavis. Vous gardez l'accès jusqu'à la fin de la période payée. Aucun engagement, jamais.",
  },
  {
    q: "Puis-je l'utiliser pour plusieurs boutiques ?",
    a: "Plan Starter : 1 boutique. Pro : 3 boutiques. Scale : 10 boutiques. Agence : illimité. Si vous gérez des boutiques pour des clients, le plan Agence inclut aussi la marque blanche.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Questions fréquentes</h2>
          <p className="section-subtitle">
            Tout ce que vous voulez savoir avant de vous lancer.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="card border border-slate-200 overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-brand-500 flex-shrink-0 transition-transform duration-200 ${
                    open === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {open === i && (
                <div className="px-6 pb-6 text-slate-600 leading-relaxed animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">
            Vous avez d&apos;autres questions ?
          </p>
          <a
            href="mailto:contact@ficheai.fr"
            className="btn-secondary text-sm"
          >
            Contactez-nous par email
          </a>
        </div>
      </div>
    </section>
  );
}
