import type { Metadata } from "next";
import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";

export const metadata: Metadata = {
  title: "Tarifs — mémoire technique à prix fixe",
  description:
    "Mémoire technique livré en 48 h : 590 € HT prix fixe. Audit Flash 90 €. Packs mensuels avec veille des marchés publics dès 1 490 €/mois.",
  alternates: { canonical: "/tarifs" },
};

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <span aria-hidden className="mt-0.5 font-bold text-win">✓</span>
      <span>{children}</span>
    </li>
  );
}

export default function TarifsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-center text-4xl font-extrabold text-night">
        Des prix fixes, affichés, sans devis
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-ink/80">
        Tous les prix sont en € HT. Délai : 48 h ouvrées après réception complète du DCE et de vos
        éléments. Retouches incluses sur chaque mémoire.
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-4">
        {/* AUDIT FLASH */}
        <div className="flex flex-col rounded-2xl border border-night/10 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-night">Audit Flash</h2>
          <p className="mt-1 text-sm text-ink/60">Pour comprendre pourquoi vous avez perdu</p>
          <p className="mt-4 text-4xl font-extrabold text-night">90 €</p>
          <ul className="mt-6 flex-1 space-y-3 text-sm text-ink/80">
            <Feature>Analyse complète d&apos;un mémoire perdu</Feature>
            <Feature>Grille de notation reconstituée</Feature>
            <Feature>5 corrections prioritaires chiffrées</Feature>
            <Feature>Livré sous 24 h</Feature>
            <Feature>Déduit si vous commandez un mémoire ensuite</Feature>
          </ul>
          <div className="mt-6">
            <CheckoutButton offer="audit" amount={90} label="Commander l'audit — 90 €" />
          </div>
        </div>

        {/* MÉMOIRE EXPRESS */}
        <div className="relative flex flex-col rounded-2xl border-2 border-chantier bg-white p-6 shadow-md">
          <span className="absolute -top-3 left-6 rounded-full bg-chantier px-3 py-0.5 text-xs font-bold text-white">
            LE PLUS CHOISI
          </span>
          <h2 className="text-xl font-bold text-night">Mémoire Express</h2>
          <p className="mt-1 text-sm text-ink/60">Votre réponse complète, livrée en 48 h</p>
          <p className="mt-4 text-4xl font-extrabold text-night">590 €</p>
          <ul className="mt-6 flex-1 space-y-3 text-sm text-ink/80">
            <Feature>Mémoire de 15 à 30 pages personnalisé</Feature>
            <Feature>Structuré sur les critères du règlement de consultation</Feature>
            <Feature>Méthodologie, moyens, planning, sécurité, environnement</Feature>
            <Feature>Aux couleurs de votre entreprise (.docx + .pdf)</Feature>
            <Feature>Relecture par un expert + 1 série de retouches</Feature>
            <Feature>Livré en 48 h ouvrées</Feature>
          </ul>
          <div className="mt-6">
            <CheckoutButton offer="memoire" amount={590} label="Commander mon mémoire — 590 €" />
          </div>
        </div>

        {/* PACK CONQUÊTE */}
        <div className="flex flex-col rounded-2xl border border-night/10 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-night">Pack Conquête</h2>
          <p className="mt-1 text-sm text-ink/60">Pour répondre chaque mois sans y penser</p>
          <p className="mt-4 text-4xl font-extrabold text-night">
            1 490 €<span className="text-base font-medium text-ink/60">/mois</span>
          </p>
          <ul className="mt-6 flex-1 space-y-3 text-sm text-ink/80">
            <Feature>3 mémoires techniques par mois</Feature>
            <Feature>Veille personnalisée BOAMP / profils d&apos;acheteurs</Feature>
            <Feature>Scoring go/no-go de chaque consultation détectée</Feature>
            <Feature>Bibliothèque d&apos;entreprise enrichie en continu</Feature>
            <Feature>Sans engagement, résiliable chaque mois</Feature>
          </ul>
          <Link
            href="/contact"
            className="mt-6 rounded-lg border-2 border-night px-6 py-3 text-center font-semibold text-night hover:border-chantier hover:text-chantier"
          >
            Réserver un appel de 15 min
          </Link>
        </div>

        {/* PACK ATTRIBUTAIRE */}
        <div className="flex flex-col rounded-2xl border border-night/10 bg-night p-6 text-white shadow-sm">
          <h2 className="text-xl font-bold">Pack Attributaire</h2>
          <p className="mt-1 text-sm text-white/60">La commande publique comme moteur de croissance</p>
          <p className="mt-4 text-4xl font-extrabold">
            2 990 €<span className="text-base font-medium text-white/60">/mois</span>
          </p>
          <ul className="mt-6 flex-1 space-y-3 text-sm text-white/85">
            <Feature>8 mémoires techniques par mois</Feature>
            <Feature>Veille + scoring go/no-go</Feature>
            <Feature>Relecture des pièces administratives (DC1, DC2, DUME)</Feature>
            <Feature>Analyse des courriers de notation → amélioration continue</Feature>
            <Feature>Interlocuteur dédié, délais contractuels</Feature>
          </ul>
          <Link
            href="/contact"
            className="mt-6 rounded-lg bg-chantier px-6 py-3 text-center font-semibold text-white hover:bg-chantier/90"
          >
            Réserver un appel de 15 min
          </Link>
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-ink/60">
        Conditions de délai et périmètre détaillés dans les <Link href="/cgv" className="underline">CGV</Link>.
        Packs facturés mensuellement, paiement par carte ou virement. TVA applicable selon notre régime
        en vigueur, indiquée avant paiement.
      </p>
    </div>
  );
}
