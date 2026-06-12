import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const testimonials = [
  {
    name: "Marie-Sophie L.",
    role: "Fondatrice, boutique mode Shopify",
    text: "J'avais 380 produits sans description. En 1 heure, tout était fait. Le SEO a décollé en 3 semaines.",
    avatar: "MS",
    stars: 5,
  },
  {
    name: "Julien R.",
    role: "Consultant e-commerce, 12 clients",
    text: "Je livre mes clients 3× plus vite. FicheIA fait en 2 minutes ce qui me prenait une demi-journée.",
    avatar: "JR",
    stars: 5,
  },
  {
    name: "Fatima B.",
    role: "Boutique cosmétiques naturels",
    text: "Le ton 'chaleureux' est parfait pour ma marque. Les descriptions ressemblent exactement à ce que j'aurais écrit moi-même.",
    avatar: "FB",
    stars: 5,
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <section className="py-12 bg-white border-y border-slate-100">
          <div className="max-w-5xl mx-auto px-4">
            <p className="text-center text-sm text-slate-500 mb-8 uppercase tracking-wider font-medium">
              Référencé sur
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 grayscale opacity-50">
              {["Product Hunt", "There's An AI For That", "AI Tools FR", "Shopify App Store", "WooCommerce Marketplace"].map(
                (brand) => (
                  <span key={brand} className="text-slate-600 font-semibold text-sm">
                    {brand}
                  </span>
                )
              )}
            </div>
          </div>
        </section>

        <Features />
        <HowItWorks />

        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">
                Ce qu&apos;en disent les e-commerçants
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="card p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <span key={j} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-6 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                      <div className="text-slate-500 text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Pricing />
        <FAQ />

        <section className="py-24 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 hero-grid opacity-20" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Arrêtez de perdre du temps à rédiger.{" "}
              <span className="gradient-text">L&apos;IA le fait mieux.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Rejoignez les e-commerçants qui ont multiplié leur productivité par 50.
              10 fiches gratuites pour vous faire votre propre avis.
            </p>
            <a href="/dashboard" className="btn-cta text-lg px-10 py-5 inline-flex">
              Démarrer gratuitement — sans CB
            </a>
            <p className="mt-4 text-sm text-slate-600">
              Aucun engagement · Résiliation instantanée · Conforme RGPD
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
