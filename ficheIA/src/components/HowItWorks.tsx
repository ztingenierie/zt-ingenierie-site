const steps = [
  {
    number: "01",
    title: "Importez votre catalogue",
    description:
      "Téléchargez votre fichier CSV avec vos noms de produits, catégories et caractéristiques. Ou connectez directement votre boutique Shopify en 2 clics.",
    visual: "📂",
  },
  {
    number: "02",
    title: "Choisissez votre style",
    description:
      "Sélectionnez le ton (professionnel, premium, chaleureux…), ajoutez vos mots-clés SEO cibles et personnalisez la longueur des descriptions.",
    visual: "🎨",
  },
  {
    number: "03",
    title: "L'IA génère en masse",
    description:
      "Notre IA (Claude) rédige simultanément titre H1, meta description, description courte, description longue et 5 points forts pour chaque produit.",
    visual: "🤖",
  },
  {
    number: "04",
    title: "Exportez et publiez",
    description:
      "Téléchargez votre CSV compatible Shopify/WooCommerce ou publiez directement via l'API. Vos fiches sont en ligne en quelques secondes.",
    visual: "🚀",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-600 text-sm font-medium mb-4">
            Simple comme bonjour
          </div>
          <h2 className="section-title mb-4">
            De zéro à 1 000 fiches en{" "}
            <span className="gradient-text">4 étapes</span>
          </h2>
          <p className="section-subtitle">
            Aucune compétence technique requise. Aucun prompt à écrire.
            L&apos;outil est pensé pour être utilisé par n&apos;importe quel e-commerçant.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-200 via-brand-400 to-transparent transform -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8`}
              >
                <div className="flex-1">
                  <div
                    className={`card p-8 ${
                      i % 2 === 0 ? "md:mr-8" : "md:ml-8"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-5xl">{step.visual}</span>
                      <div>
                        <div className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-1">
                          Étape {step.number}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex w-12 h-12 rounded-full bg-brand-600 text-white font-bold text-lg items-center justify-center z-10 shadow-lg shadow-brand-600/30 flex-shrink-0">
                  {i + 1}
                </div>

                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="/dashboard"
            className="btn-cta inline-flex"
          >
            Commencer maintenant — C&apos;est gratuit
          </a>
          <p className="mt-3 text-sm text-slate-500">
            Aucune CB requise · 10 fiches offertes · Résultat en 60 secondes
          </p>
        </div>
      </div>
    </section>
  );
}
