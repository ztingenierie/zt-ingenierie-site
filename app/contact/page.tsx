import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & réservation",
  description:
    "Une consultation en cours, une question, ou envie d'un pack avec veille ? Écrivez-nous : réponse sous 4 h ouvrées.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-extrabold text-night">Parlons de votre prochaine consultation</h1>
      <p className="mt-4 text-lg text-ink/80">
        Une date limite proche, une question sur un DCE, ou un pack mensuel à mettre en place ?
        Décrivez votre situation : <strong>réponse sous 4 h ouvrées</strong>. Pour les packs, nous
        vous proposerons un créneau d&apos;appel de 15 minutes.
      </p>
      <div className="mt-10 rounded-2xl border border-night/10 bg-white p-6 sm:p-8">
        <ContactForm />
      </div>
      <p className="mt-6 text-sm text-ink/60">
        Vous préférez l&apos;e-mail direct ?{" "}
        <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>
      </p>
    </div>
  );
}
