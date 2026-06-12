import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation (CGU)",
  alternates: { canonical: "/cgu" },
};

export default function CguPage() {
  return (
    <LegalLayout title="Conditions générales d'utilisation" updated="[À COMPLÉTER : date]">
      <h2>1. Acceptation</h2>
      <p>
        L&apos;utilisation du site {SITE.url} vaut acceptation des présentes CGU. Le Site présente
        les services Attriba et permet la commande en ligne et la prise de contact.
      </p>
      <h2>2. Accès au Site</h2>
      <p>
        Le Site est accessible gratuitement. Le Prestataire s&apos;efforce d&apos;assurer une
        disponibilité continue sans y être tenu ; des interruptions pour maintenance sont possibles.
      </p>
      <h2>3. Comportements interdits</h2>
      <ul>
        <li>Toute tentative d&apos;intrusion, d&apos;extraction massive ou de perturbation du Site ;</li>
        <li>L&apos;usage des formulaires à des fins de prospection ou de spam ;</li>
        <li>La reproduction des contenus sans autorisation écrite.</li>
      </ul>
      <h2>4. Liens externes</h2>
      <p>
        Le Site peut contenir des liens vers des sites tiers (plateformes officielles, partenaires).
        Le Prestataire n&apos;est pas responsable de leur contenu.
      </p>
      <h2>5. Données personnelles</h2>
      <p>
        Le traitement des données est décrit dans la <a href="/confidentialite">politique de
        confidentialité</a>.
      </p>
      <h2>6. Droit applicable</h2>
      <p>
        Les CGU sont soumises au droit français. Contact :{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </LegalLayout>
  );
}
