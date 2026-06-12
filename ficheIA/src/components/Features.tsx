const features = [
  {
    icon: "⚡",
    title: "Génération en masse",
    description:
      "Importez jusqu'à 1 000 produits via CSV et recevez toutes vos fiches en quelques minutes. Plus besoin de faire du copier-coller.",
  },
  {
    icon: "🎯",
    title: "SEO optimisé pour la France",
    description:
      "Titres H1, meta descriptions, descriptions longues — chaque champ respecte les best practices SEO françaises et les algorithmes Google FR.",
  },
  {
    icon: "🎨",
    title: "6 tons de rédaction",
    description:
      "Professionnel, chaleureux, premium, minimaliste, technique ou humoristique. Votre marque garde sa voix, l'IA s'adapte.",
  },
  {
    icon: "🔗",
    title: "Intégration Shopify & WooCommerce",
    description:
      "Publiez directement depuis FicheIA vers votre boutique via API. Ou exportez en CSV compatible Shopify/WooCommerce en 1 clic.",
  },
  {
    icon: "📊",
    title: "Mots-clés intégrés",
    description:
      "Ajoutez vos mots-clés cibles par produit et l'IA les intègre naturellement. Résultat : du contenu qui classe, pas du bourrage de keywords.",
  },
  {
    icon: "🔒",
    title: "Conforme RGPD, données en France",
    description:
      "Vos données ne quittent jamais l'UE. Supabase EU, conformité RGPD stricte, factures TVA françaises automatiques.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-sm font-medium mb-4">
            Tout ce dont vous avez besoin
          </div>
          <h2 className="section-title mb-4">
            Un outil pensé pour les e-commerçants{" "}
            <span className="gradient-text">français</span>
          </h2>
          <p className="section-subtitle">
            Pas une traduction d'outil américain. Conçu pour le SEO français, les boutiques Shopify FR
            et les attentes des acheteurs en France.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="card p-6 hover:border-brand-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-brand-50 to-indigo-50 rounded-2xl border border-brand-100 p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: "2 min", label: "Pour générer 50 fiches produits" },
              { value: "84×", label: "Retour sur investissement vs freelance" },
              { value: "0€", label: "Pour commencer (10 fiches offertes)" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-black gradient-text mb-2">{stat.value}</div>
                <div className="text-slate-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
