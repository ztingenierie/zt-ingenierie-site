import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fonctionnalités — scan RGAA, déclaration d'accessibilité, veille",
  description:
    "Scan automatisé selon les critères RGAA testables, plan d'action expliqué en français, génération de la déclaration d'accessibilité, surveillance continue avec alertes.",
  alternates: { canonical: "/fonctionnalites" },
};

const FEATURES = [
  {
    title: "Pré-audit automatisé mappé RGAA",
    text: "Crawl de votre site et exécution des contrôles automatisables du référentiel français : alternatives d'images, contrastes, intitulés de formulaires, structure des titres, cadres, navigation… Score pondéré et historique de progression.",
  },
  {
    title: "Plan d'action en français, pour des humains",
    text: "Chaque non-conformité est expliquée simplement : pourquoi c'est un problème pour l'utilisateur, où est le code fautif, et quelle correction appliquer. Généré par IA, relu par des règles métier, exploitable par votre développeur ou votre agence.",
  },
  {
    title: "Déclaration d'accessibilité générée",
    text: "Le document public obligatoire, conforme au modèle officiel, pré-rempli à partir de vos résultats : état de conformité, contenus non accessibles, plan d'amélioration. Vous validez, vous publiez. Le schéma pluriannuel est inclus au plan Pro.",
  },
  {
    title: "Veille continue et alertes",
    text: "Une mise à jour de thème, un nouveau formulaire, un plugin… et la conformité régresse sans que personne ne s'en aperçoive. Nos scans planifiés comparent chaque version et vous alertent par e-mail dès qu'un contrôle passe au rouge.",
  },
  {
    title: "Marque blanche pour les agences",
    text: "Rapports PDF à votre logo et vos couleurs, pages de suivi partageables avec vos clients, export par client. Vous vendez la prestation, AccessiVeille reste invisible.",
  },
  {
    title: "Veille réglementaire incluse",
    text: "RGAA 5 attendu fin 2026, doctrines DGCCRF, jurisprudence : nous suivons les évolutions et vous prévenons quand une obligation vous concerne. Vous ne découvrirez pas un changement de règle dans une mise en demeure.",
  },
];

export default function FonctionnalitesPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-16">
      <h1 className="text-4xl font-extrabold">Fonctionnalités</h1>
      <p className="mt-4 max-w-2xl text-slate2">
        Tout ce qu'il faut pour piloter l'accessibilité de vos sites dans la durée — rien de
        cosmétique, pas d'overlay.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {FEATURES.map((f) => (
          <section key={f.title} className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold">{f.title}</h2>
            <p className="mt-2 text-sm text-slate2">{f.text}</p>
          </section>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link
          href="/audit-gratuit"
          className="inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark"
        >
          Commencer par le scan gratuit
        </Link>
      </div>
    </div>
  );
}
