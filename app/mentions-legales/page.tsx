import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout title="Mentions légales" updated="[À COMPLÉTER : date de mise en ligne]">
      <h2>Éditeur du site</h2>
      <p>
        Le site {SITE.url} (« le Site ») est édité par : <strong>[À COMPLÉTER : Prénom NOM]</strong>,
        entrepreneur individuel (micro-entrepreneur), immatriculé sous le numéro SIREN{" "}
        <strong>[À COMPLÉTER]</strong>, dont le siège est situé <strong>[À COMPLÉTER : adresse]</strong>.
        Numéro de TVA intracommunautaire : <strong>[À COMPLÉTER ou « TVA non applicable,
        art. 293 B du CGI »]</strong>.
      </p>
      <p>
        Directeur de la publication : <strong>[À COMPLÉTER : Prénom NOM]</strong> —
        contact : <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
      <h2>Hébergement</h2>
      <p>
        Le Site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina,
        CA 91723, États-Unis (vercel.com). Les données applicatives sont hébergées par{" "}
        <strong>Supabase</strong> sur des serveurs situés dans l&apos;Union européenne.
      </p>
      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus du Site (textes, logo, charte graphique, structure) est protégé
        par le droit de la propriété intellectuelle. Toute reproduction non autorisée est interdite.
      </p>
      <h2>Médiation et litiges</h2>
      <p>
        Les services Attriba s&apos;adressent exclusivement à des professionnels (B2B). Conformément
        à l&apos;article L612-1 du Code de la consommation, la médiation de la consommation ne
        s&apos;applique pas aux relations entre professionnels. Tout litige relève des juridictions
        compétentes précisées dans les CGV.
      </p>
      <h2>Nous contacter</h2>
      <p>
        Par e-mail : <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </LegalLayout>
  );
}
