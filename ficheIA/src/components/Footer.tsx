import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-black text-white">Fiche</span>
              <span className="text-2xl font-black text-brand-400">IA</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Le générateur IA de fiches produits e-commerce pour les boutiques françaises.
              50 fiches SEO en 2 minutes.
            </p>
            <p className="text-xs text-slate-600">
              Propulsé par Claude · Conforme RGPD · Hébergé en Europe
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Produit</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#features" className="hover:text-white transition-colors">Fonctionnalités</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-white transition-colors">Comment ça marche</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Tarifs</Link></li>
              <li><Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Se connecter</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Ressources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/generer-fiches-produits-seo" className="hover:text-white transition-colors">Guide : Fiches produits SEO</Link></li>
              <li><Link href="/blog/shopify-seo-france" className="hover:text-white transition-colors">SEO Shopify en France</Link></li>
              <li><Link href="/blog/optimiser-catalogue-ecommerce" className="hover:text-white transition-colors">Optimiser son catalogue</Link></li>
              <li><Link href="/blog/ia-ecommerce-france" className="hover:text-white transition-colors">IA et e-commerce FR</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
              <li><Link href="/cgv" className="hover:text-white transition-colors">CGV</Link></li>
              <li><Link href="/cgu" className="hover:text-white transition-colors">CGU</Link></li>
              <li><Link href="/politique-confidentialite" className="hover:text-white transition-colors">Politique RGPD</Link></li>
              <li>
                <a href="mailto:contact@ficheai.fr" className="hover:text-white transition-colors">
                  contact@ficheai.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {currentYear} FicheIA — Micro-entreprise française. TVA non applicable, art. 293 B du CGI.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span>🇫🇷 Made in France</span>
            <span>·</span>
            <span>Données hébergées en Europe</span>
            <span>·</span>
            <span>Stripe Payments Europe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
