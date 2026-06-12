import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";

const steps = [
  {
    n: "1",
    title: "Envoyez le DCE",
    text: "Transmettez le dossier de consultation (RC, CCTP, plans) et vos éléments d'entreprise via notre formulaire sécurisé. 10 minutes, une seule fois : nous gardons votre bibliothèque pour les prochaines réponses.",
  },
  {
    n: "2",
    title: "Nous rédigeons sur la grille de notation",
    text: "Notre méthode décortique le règlement de consultation et structure chaque section du mémoire sur les critères exacts de l'acheteur : méthodologie, moyens, planning, sécurité, environnement, références.",
  },
  {
    n: "3",
    title: "Recevez votre mémoire en 48 h",
    text: "Un document de 15 à 30 pages aux couleurs de votre entreprise, en .docx et .pdf, relu et validé par un expert. Une série de retouches incluse. Vous n'avez plus qu'à déposer votre offre.",
  },
];

const reasons = [
  {
    title: "40 à 60 % de la note",
    text: "C'est le poids du mémoire technique dans la plupart des marchés de travaux. Le prix ne suffit plus : la valeur technique départage les candidats.",
  },
  {
    title: "10 à 20 h de gagnées",
    text: "C'est le temps qu'un gérant ou une assistante passe sur un mémoire. Nous le ramenons à 30 minutes de votre côté : nous faisons le reste.",
  },
  {
    title: "100 % second œuvre",
    text: "Électricité, CVC, plomberie, peinture, menuiserie. Nous ne faisons que ça : vos mémoires parlent le langage de votre métier et de vos chantiers.",
  },
];

const faq = [
  {
    q: "Garantissez-vous que je vais gagner le marché ?",
    a: "Non, et méfiez-vous de quiconque le promet : l'attribution dépend aussi de votre prix et de la concurrence. Nous garantissons un mémoire structuré sur la grille de notation, livré en 48 h, avec retouches incluses — c'est-à-dire le maximum de points possibles sur la partie que vous contrôlez.",
  },
  {
    q: "Comment pouvez-vous livrer en 48 h ?",
    a: "Nous combinons des outils d'analyse documentaire de dernière génération avec une relecture experte systématique. La technologie accélère, l'humain valide : aucun document ne part sans contrôle.",
  },
  {
    q: "Mes documents sont-ils confidentiels ?",
    a: "Oui. Vos pièces sont stockées chiffrées en Europe, ne servent jamais à un autre client, et nous nous interdisons contractuellement de travailler pour deux candidats sur le même lot d'une même consultation.",
  },
  {
    q: "Et si je réponds à plusieurs marchés par mois ?",
    a: "Les packs mensuels (3 ou 8 mémoires) incluent en plus la veille personnalisée : nous surveillons le BOAMP et les profils d'acheteurs pour vous, et nous vous signalons les consultations où vous avez une vraie chance.",
  },
  {
    q: "Travaillez-vous avec les marchés privés ?",
    a: "Oui : appels d'offres privés, réponses aux consultations de bailleurs, candidatures de référencement — la méthode est la même.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HÉROS */}
      <section className="bg-night text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <p className="mb-4 inline-block rounded-full border border-chantier/50 bg-chantier/10 px-4 py-1 text-sm font-medium text-chantier">
            Spécialistes du second œuvre — électricité · CVC · plomberie · finitions
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Vous perdez des marchés publics sur le <span className="text-chantier">mémoire technique</span>,
            pas sur le prix.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            Le mémoire technique pèse 40 à 60 % de la note finale. Envoyez-nous votre dossier de
            consultation : recevez sous 48 h un mémoire personnalisé, structuré sur la grille de
            notation de l&apos;acheteur. <strong className="text-white">590 € HT, prix fixe.</strong>
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <div className="sm:w-72">
              <CheckoutButton offer="memoire" amount={590} label="Commander mon mémoire — 590 €" />
            </div>
            <Link
              href="/contact"
              className="rounded-lg border border-white/30 px-6 py-3 text-center font-semibold text-white hover:border-chantier hover:text-chantier"
            >
              Poser une question d&apos;abord
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/60">
            Paiement sécurisé Stripe · Relecture humaine systématique · Retouches incluses
          </p>
        </div>
      </section>

      {/* POURQUOI */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold text-night">
          Le marché se joue sur le papier avant le chantier
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="rounded-2xl border border-night/10 bg-white p-6 shadow-sm">
              <p className="text-2xl font-extrabold text-chantier">{r.title}</p>
              <p className="mt-3 text-ink/80">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESSUS */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-3xl font-extrabold text-night">Comment ça marche</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="relative rounded-2xl bg-paper p-6">
                <span className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-chantier text-lg font-extrabold text-white">
                  {s.n}
                </span>
                <h3 className="mt-4 text-xl font-bold text-night">{s.title}</h3>
                <p className="mt-2 text-ink/80">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/offre" className="font-semibold text-steel underline hover:text-chantier">
              Voir le détail de l&apos;offre et un exemple de structure →
            </Link>
          </div>
        </div>
      </section>

      {/* ANCRAGE VALEUR */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-night">Faites le calcul</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink/80">
          Un marché de second œuvre moyen vaut <strong>50 000 à 300 000 €</strong>. Votre mémoire
          technique décide de 40 à 60 % de la note. Un mémoire Attriba coûte{" "}
          <strong>590 €</strong> — le premier marché gagné le rembourse{" "}
          <strong>plus de 100 fois</strong>. Et si vous hésitez encore, commencez par l&apos;Audit
          Flash : nous analysons un mémoire perdu et vous montrons où sont partis vos points.
        </p>
        <div className="mx-auto mt-8 max-w-sm">
          <CheckoutButton offer="audit" amount={90} label="Audit Flash d'un mémoire perdu — 90 €" />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-center text-3xl font-extrabold text-night">Questions fréquentes</h2>
          <div className="mt-8 space-y-4">
            {faq.map((f) => (
              <details key={f.q} className="group rounded-xl border border-night/10 bg-paper p-5">
                <summary className="cursor-pointer list-none font-semibold text-night">
                  {f.q}
                </summary>
                <p className="mt-3 text-ink/80">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-night">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center text-white">
          <h2 className="text-3xl font-extrabold">
            Votre prochaine consultation se termine bientôt.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            48 h nous suffisent. Commandez maintenant, déposez votre DCE, et présentez enfin un
            mémoire au niveau de vos chantiers.
          </p>
          <div className="mx-auto mt-8 max-w-sm">
            <CheckoutButton offer="memoire" amount={590} label="Commander mon mémoire — 590 €" />
          </div>
          <p className="mt-4 text-sm text-white/60">
            Plusieurs réponses par mois ? <Link href="/tarifs" className="underline hover:text-chantier">Découvrez les packs avec veille incluse.</Link>
          </p>
        </div>
      </section>
    </>
  );
}
