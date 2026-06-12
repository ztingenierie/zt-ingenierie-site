export const FAQ_ITEMS = [
  {
    q: "Mon entreprise est-elle concernée par l'obligation d'accessibilité ?",
    a: "Depuis le 28 juin 2025, l'European Accessibility Act s'applique aux services numériques (e-commerce, banque, transport…) des entreprises de 10 salariés ou plus, ou réalisant plus de 2 M€ de chiffre d'affaires. Les organismes publics et les entreprises de plus de 250 M€ de CA étaient déjà soumis au RGAA. Notre scan gratuit vous donne une première photographie en 2 minutes.",
  },
  {
    q: "Quelles sanctions en cas de non-conformité ?",
    a: "Côté consommation (EAA), la DGCCRF peut prononcer des contraventions de 7 500 € cumulables par infraction constatée, avec astreintes. Côté RGAA (secteur public et grandes entreprises), l'amende peut atteindre 50 000 € par service, renouvelable. L'absence de déclaration d'accessibilité est sanctionnée indépendamment de l'état réel du site.",
  },
  {
    q: "Un scan automatique suffit-il pour être conforme ?",
    a: "Non, et méfiez-vous de quiconque prétend le contraire. Environ 25 à 30 % des 106 critères du RGAA sont testables automatiquement. AccessiVeille vous donne le diagnostic automatisable, les documents obligatoires et la surveillance continue ; pour une conformité totale, un audit manuel complémentaire reste nécessaire — nous vous orientons vers des auditeurs certifiés.",
  },
  {
    q: "En quoi est-ce différent d'un widget d'accessibilité (overlay) ?",
    a: "Les overlays superposent un menu d'options sans corriger le code : ils ne rendent pas un site conforme au RGAA et sont publiquement critiqués par la communauté accessibilité et les associations d'usagers. AccessiVeille fait l'inverse : il identifie les problèmes dans votre code et vous explique comment les corriger réellement.",
  },
  {
    q: "Je suis une agence web : comment ça marche pour mes clients ?",
    a: "Le plan Agence vous permet de surveiller jusqu'à 15 sites clients, de générer des rapports à votre marque (logo, couleurs) et de partager une page de suivi par client. Vous revendez la prestation de mise en conformité avec votre marge ; nous restons invisibles.",
  },
  {
    q: "Qu'est-ce que la déclaration d'accessibilité obligatoire ?",
    a: "C'est un document public, conforme à un modèle officiel, qui décrit l'état de conformité de votre service, les contenus non accessibles et le plan d'action. Le plan Pro et le Pack Déclaration la génèrent pré-remplie à partir de vos résultats de scan ; vous la validez avant publication.",
  },
] as const;

export default function FAQ() {
  return (
    <section aria-labelledby="faq-title" className="mx-auto max-w-content px-4 py-16">
      <h2 id="faq-title" className="text-3xl font-bold">
        Questions fréquentes
      </h2>
      <dl className="mt-8 grid gap-6 md:grid-cols-2">
        {FAQ_ITEMS.map((item) => (
          <div key={item.q} className="rounded-2xl border border-slate-200 p-6">
            <dt className="font-bold">{item.q}</dt>
            <dd className="mt-2 text-sm text-slate2">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
