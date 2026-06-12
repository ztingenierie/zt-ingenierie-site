import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-night/10 bg-night text-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm sm:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold text-white">attriba</p>
          <p className="mt-2">{SITE.tagline}</p>
          <p className="mt-2">
            <a href={`mailto:${SITE.email}`} className="underline hover:text-chantier">
              {SITE.email}
            </a>
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">Offre</p>
          <ul className="mt-2 space-y-1">
            <li><Link href="/offre" className="hover:text-chantier">Comment ça marche</Link></li>
            <li><Link href="/tarifs" className="hover:text-chantier">Tarifs</Link></li>
            <li><Link href="/contact" className="hover:text-chantier">Contact &amp; rendez-vous</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Légal</p>
          <ul className="mt-2 space-y-1">
            <li><Link href="/mentions-legales" className="hover:text-chantier">Mentions légales</Link></li>
            <li><Link href="/cgv" className="hover:text-chantier">CGV</Link></li>
            <li><Link href="/cgu" className="hover:text-chantier">CGU</Link></li>
            <li><Link href="/confidentialite" className="hover:text-chantier">Confidentialité (RGPD)</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Attriba — Tous droits réservés.
      </div>
    </footer>
  );
}
