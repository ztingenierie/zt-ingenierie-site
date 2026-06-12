import Link from "next/link";
import ScanForm from "@/components/ScanForm";
import FAQ, { FAQ_ITEMS } from "@/components/FAQ";

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto grid max-w-content items-center gap-10 px-4 py-16 lg:grid-cols-2">
          <div>
            <p className="w-fit rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900">
              Loi applicable depuis le 28 juin 2025 — contrôles DGCCRF en cours
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              Votre site est-il conforme à la loi accessibilité&nbsp;?
            </h1>
            <p className="mt-4 text-lg text-slate2">
              L'European Accessibility Act impose l'accessibilité numérique aux e-commerces et
              services en ligne français. Amendes de <strong>7 500 € cumulables</strong> par
              infraction. AccessiVeille vous dit où vous en êtes en 2 minutes, génère vos documents
              obligatoires et vous alerte avant que la DGCCRF ne le fasse.
            </p>
            <ul className="mt-6 flex flex-col gap-2 text-sm font-medium">
              <li>✓ Pré-audit automatisé selon les critères RGAA testables</li>
              <li>✓ Déclaration d'accessibilité générée, prête à publier</li>
              <li>✓ Veille continue : alerte e-mail à chaque régression</li>
              <li>✓ Sans audit à 5 000 €, sans widget « magique »</li>
            </ul>
          </div>
          <div className="justify-self-center lg:justify-self-end">
            <ScanForm />
          </div>
        </div>
      </section>

      <section aria-labelledby="probleme-title" className="mx-auto max-w-content px-4 py-16">
        <h2 id="probleme-title" className="text-3xl font-bold">
          Ce que dit la loi, sans jargon
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-6">
            <p className="text-3xl font-extrabold text-primary">28 juin 2025</p>
            <p className="mt-2 text-sm text-slate2">
              Entrée en application de l'European Accessibility Act : e-commerce, banque en ligne,
              transport, médias… doivent être accessibles dès 10 salariés ou 2 M€ de CA.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <p className="text-3xl font-extrabold text-primary">7 500 €</p>
            <p className="mt-2 text-sm text-slate2">
              Contravention par infraction constatée, cumulable, prononcée par la DGCCRF — qui
              contrôle aussi sur simple signalement d'un usager ou d'un concurrent.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <p className="text-3xl font-extrabold text-primary">96 %</p>
            <p className="mt-2 text-sm text-slate2">
              Part des pages d'accueil mondiales présentant des erreurs d'accessibilité détectables
              automatiquement (étude WebAIM Million). Votre site en fait très probablement partie.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="comment-title" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-content px-4">
          <h2 id="comment-title" className="text-3xl font-bold">
            Comment ça marche
          </h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-4">
            {[
              ["1. Scannez", "Collez votre URL : score et problèmes principaux en 2 minutes, gratuitement."],
              ["2. Corrigez", "Chaque non-conformité est expliquée en français, avec la correction de code proposée."],
              ["3. Documentez", "Déclaration d'accessibilité et schéma pluriannuel générés, prêts à publier."],
              ["4. Restez conforme", "Scans planifiés et alerte immédiate à la moindre régression. La conformité est un état, pas un événement."],
            ].map(([title, text]) => (
              <li key={title} className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="font-bold">{title}</p>
                <p className="mt-2 text-sm text-slate2">{text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate2">
            <strong className="text-ink">Notre engagement d'honnêteté :</strong> environ 30 % des
            critères RGAA sont testables automatiquement. Nous ne vendons pas de « conformité
            garantie » — personne ne le peut. Nous vendons la visibilité, les documents obligatoires
            et l'alerte au bon moment. Pour l'audit complet de conformité, nous vous orientons vers
            des auditeurs certifiés partenaires.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 py-16 text-center">
        <h2 className="text-3xl font-bold">Agence web ? Transformez l'obligation en offre.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate2">
          Rapports en marque blanche, suivi multi-sites, page de partage par client : facturez la
          mise en conformité à vos clients, on s'occupe de la technique en coulisse.
        </p>
        <Link
          href="/tarifs"
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark"
        >
          Découvrir le plan Agence — 249 €/mois
        </Link>
      </section>

      <FAQ />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
    </>
  );
}
