import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales de vente et d'utilisation",
  alternates: { canonical: "/cgv" },
};

const ARTICLES: { title: string; text: string }[] = [
  {
    title: "1. Objet",
    text: "Les présentes conditions régissent la fourniture du service AccessiVeille à tout client professionnel. La souscription d'un abonnement ou l'achat d'un pack vaut acceptation pleine et entière. Le service est réservé aux professionnels.",
  },
  {
    title: "2. Description du service",
    text: "Selon le plan souscrit : analyses automatisées de pages web au regard de règles dérivées du RGAA, rapports et plans d'action le cas échéant assistés par intelligence artificielle, génération de projets de documents (déclaration d'accessibilité, schéma pluriannuel), surveillance périodique avec alertes.",
  },
  {
    title: "3. Portée du service",
    text: "Le service repose sur des contrôles automatisés qui ne couvrent qu'une partie des critères d'accessibilité applicables (de l'ordre de 25 à 30 % des critères du RGAA). Il constitue une aide au diagnostic et au suivi ; il ne constitue ni un audit de conformité complet, ni une certification, ni un conseil juridique, et ne garantit pas la conformité du client à ses obligations légales. Les documents générés sont des projets que le client vérifie et valide sous sa seule responsabilité. L'éditeur est tenu à une obligation de moyens.",
  },
  {
    title: "4. Prix et facturation",
    text: "Prix en euros, hors taxes — TVA non applicable, art. 293 B du CGI. Abonnements payables mensuellement ou annuellement d'avance par carte bancaire via Stripe ; packs payables à la commande. Révision tarifaire possible avec préavis de 30 jours (résiliation alors sans frais).",
  },
  {
    title: "5. Durée, résiliation, remboursement",
    text: "Abonnements sans engagement, reconduits tacitement. Résiliation à tout moment depuis l'espace client, effective en fin de période, sans prorata. Remboursement intégral sur demande dans les 14 jours suivant la première souscription.",
  },
  {
    title: "6. Obligations du client",
    text: "Le client garantit être autorisé à faire analyser les sites soumis, conserve ses identifiants confidentiels et fait un usage raisonnable et licite du service. Le plan Agence autorise la rediffusion des rapports en marque blanche aux clients finaux de l'agence.",
  },
  {
    title: "7. Disponibilité et support",
    text: "Objectif de disponibilité 99 % hors maintenance. Support par e-mail (contact@accessiveille.fr), réponse sous 2 jours ouvrés.",
  },
  {
    title: "8. Responsabilité",
    text: "La responsabilité de l'éditeur, toutes causes confondues, est limitée au montant payé par le client au cours des 12 derniers mois. L'éditeur ne répond pas des dommages indirects (perte de chiffre d'affaires, sanction administrative, atteinte à l'image).",
  },
  {
    title: "9. Propriété intellectuelle",
    text: "Le service et son code restent la propriété de l'éditeur. Les rapports générés pour le client sont librement utilisables par lui dans le cadre de son activité.",
  },
  {
    title: "10. Données personnelles",
    text: "Voir la politique de confidentialité. Les pages analysées sont des contenus publics ; le client s'engage à ne pas soumettre d'URL exposant des données personnelles non publiques.",
  },
  {
    title: "11. Droit applicable",
    text: "Droit français. Litiges entre professionnels : compétence des tribunaux de [ville du siège], après tentative de résolution amiable de 30 jours.",
  },
];

export default function CgvPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-extrabold">Conditions générales de vente et d'utilisation</h1>
      <p className="mt-2 text-sm text-slate2">Version du [date].</p>
      {ARTICLES.map((a) => (
        <section key={a.title}>
          <h2 className="mt-8 text-xl font-bold">{a.title}</h2>
          <p className="mt-2 text-slate2">{a.text}</p>
        </section>
      ))}
    </div>
  );
}
