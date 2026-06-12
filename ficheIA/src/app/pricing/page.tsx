import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tarifs — FicheIA",
  description:
    "Plans FicheIA : de gratuit à illimité. Essai gratuit sans CB. 19€/mois pour 200 fiches, 49€/mois pour 1000 fiches, 99€/mois illimité.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-gradient-to-b from-slate-950 to-white py-20 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Tarifs simples et transparents
            </h1>
            <p className="text-slate-400 text-lg">
              Commencez gratuitement. Upgradez uniquement quand vous en avez besoin.
              Résiliez en 1 clic, sans justification.
            </p>
          </div>
        </div>

        <Pricing />

        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
              Comparez avec les alternatives
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Solution</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-700">Coût</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-700">100 fiches</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-700">En français</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-700">SEO optimisé</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-700">Temps</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      solution: "🏆 FicheIA Pro",
                      cost: "€49/mois",
                      fiches: "Inclus",
                      fr: "✅",
                      seo: "✅",
                      time: "2 minutes",
                      highlight: true,
                    },
                    {
                      solution: "Rédacteur freelance",
                      cost: "€500-1 500",
                      fiches: "€5-15/fiche",
                      fr: "✅",
                      seo: "⚠️ Partiel",
                      time: "1-2 semaines",
                      highlight: false,
                    },
                    {
                      solution: "ChatGPT (direct)",
                      cost: "€20/mois",
                      fiches: "Très manuel",
                      fr: "⚠️ Imparfait",
                      seo: "❌ Non structuré",
                      time: "5-8h",
                      highlight: false,
                    },
                    {
                      solution: "Jasper / Copy.ai",
                      cost: "€40-120/mois",
                      fiches: "Possible",
                      fr: "⚠️ Traduit",
                      seo: "⚠️ Partiel",
                      time: "30-60 min",
                      highlight: false,
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={`border-b ${
                        row.highlight
                          ? "bg-brand-50 font-semibold text-brand-900"
                          : "text-slate-700"
                      }`}
                    >
                      <td className="py-3 px-4">{row.solution}</td>
                      <td className="py-3 px-4 text-center">{row.cost}</td>
                      <td className="py-3 px-4 text-center">{row.fiches}</td>
                      <td className="py-3 px-4 text-center">{row.fr}</td>
                      <td className="py-3 px-4 text-center">{row.seo}</td>
                      <td className="py-3 px-4 text-center">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Un doute ? Testez avant de payer.
            </h2>
            <p className="text-slate-600 mb-8">
              10 fiches gratuites, sans CB, sans engagement. Vous voyez la qualité avant de
              sortir votre carte.
            </p>
            <Link href="/dashboard" className="btn-cta inline-flex">
              Essayer gratuitement maintenant
            </Link>
          </div>
        </section>

        <FAQ />
      </main>
      <Footer />
    </>
  );
}
