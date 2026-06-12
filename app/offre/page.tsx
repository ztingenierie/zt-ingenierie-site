import type { Metadata } from "next";
import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";

export const metadata: Metadata = {
  title: "L'offre — un mémoire technique conçu pour la grille de notation",
  description:
    "Ce que contient un mémoire technique Attriba, section par section, et pourquoi il marque des points : méthodologie, moyens, planning, sécurité, environnement, références.",
  alternates: { canonical: "/offre" },
};

const sections = [
  ["Présentation ciblée de l'entreprise", "Pas une plaquette : une présentation orientée vers CE chantier — effectifs mobilisables, encadrement, qualifications (Qualifelec, Qualibat, RGE…), chiffres qui rassurent l'acheteur."],
  ["Méthodologie d'exécution lot par lot", "La section qui pèse le plus lourd : phasage, modes opératoires, interfaces avec les autres corps d'état, gestion des contraintes du site (site occupé, ERP, délais)."],
  ["Moyens humains et matériels affectés", "Organigramme chantier nominatif, CV de l'encadrement, matériel dédié — l'acheteur doit visualiser votre équipe sur son chantier."],
  ["Planning détaillé", "Un planning réaliste calé sur le délai du CCAP, avec jalons et points de contrôle. Les plannings recopiés du CCTP se voient immédiatement."],
  ["Démarche sécurité & qualité", "PPSPS-ready : analyse des risques propres au chantier, pas un copier-coller générique. Procédures d'autocontrôle et traitement des non-conformités."],
  ["Engagement environnemental & déchets", "Tri et traçabilité (PEMD), limitation des nuisances, approvisionnements — les critères RSE pèsent de plus en plus dans les grilles."],
  ["Références comparables", "3 à 5 chantiers similaires présentés avec photos, montants et contacts — choisis pour résonner avec l'objet du marché."],
];

export default function OffrePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-extrabold text-night">
        Un mémoire conçu pour marquer des points, section par section
      </h1>
      <p className="mt-6 text-lg text-ink/80">
        Les acheteurs publics notent votre mémoire avec une grille : méthodologie, moyens, délais,
        sécurité, environnement. La plupart des mémoires perdent des points parce qu&apos;ils
        décrivent l&apos;entreprise au lieu de répondre à la grille. Nous faisons l&apos;inverse :
        nous partons du règlement de consultation et nous construisons chaque section pour le
        critère qu&apos;elle doit servir.
      </p>

      <div className="mt-10 space-y-4">
        {sections.map(([title, text]) => (
          <div key={title} className="rounded-xl border border-night/10 bg-white p-5">
            <h2 className="font-bold text-night">{title}</h2>
            <p className="mt-1 text-ink/80">{text}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-2xl font-extrabold text-night">Ce que nous vous demandons</h2>
      <p className="mt-3 text-ink/80">
        Une seule fois, à la première commande (10 minutes) : Kbis, attestations, qualifications,
        liste de vos moyens, CV de l&apos;encadrement, photos et références de chantiers. Nous
        construisons votre <strong>bibliothèque d&apos;entreprise</strong> : à chaque nouvelle
        consultation, vous n&apos;envoyez plus que le DCE. Le deuxième mémoire est meilleur que le
        premier, le cinquième encore plus — c&apos;est votre capital, il vous appartient.
      </p>

      <h2 className="mt-14 text-2xl font-extrabold text-night">Notre méthode, en toute transparence</h2>
      <p className="mt-3 text-ink/80">
        Nous utilisons des outils d&apos;analyse documentaire de dernière génération pour décortiquer
        le DCE et préparer la rédaction, puis <strong>chaque mémoire est repris, complété et validé
        par un expert</strong> avant livraison. C&apos;est ce qui rend possible le délai de 48 h au
        prix de 590 € — sans sacrifier la personnalisation. Vos documents restent confidentiels,
        hébergés en Europe, et ne servent jamais à un autre client.
      </p>

      <div className="mt-12 rounded-2xl bg-night p-8 text-center text-white">
        <h2 className="text-2xl font-extrabold">Prêt à reprendre des points ?</h2>
        <p className="mx-auto mt-3 max-w-md text-white/80">
          Commandez maintenant — vous recevez immédiatement le lien de dépôt de votre DCE.
        </p>
        <div className="mx-auto mt-6 max-w-sm">
          <CheckoutButton offer="memoire" amount={590} label="Commander mon mémoire — 590 €" />
        </div>
        <p className="mt-4 text-sm text-white/60">
          Ou comparez toutes les formules sur la <Link href="/tarifs" className="underline hover:text-chantier">page tarifs</Link>.
        </p>
      </div>
    </div>
  );
}
