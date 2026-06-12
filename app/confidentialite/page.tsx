import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité (RGPD)",
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <LegalLayout title="Politique de confidentialité" updated="[À COMPLÉTER : date]">
      <h2>1. Responsable de traitement</h2>
      <p>
        <strong>[À COMPLÉTER : Prénom NOM]</strong>, exerçant sous la marque Attriba —
        contact : <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
      <h2>2. Données traitées et finalités</h2>
      <ul>
        <li>
          <strong>Formulaire de contact</strong> (nom, entreprise, e-mail, téléphone, message) —
          finalité : répondre à votre demande. Base légale : mesures précontractuelles
          (art. 6.1.b RGPD). Durée : 3 ans après le dernier contact.
        </li>
        <li>
          <strong>Commande et facturation</strong> (identité, adresse, paiement via Stripe) —
          base légale : exécution du contrat et obligations légales. Durée : 10 ans (pièces
          comptables). Les données bancaires sont traitées exclusivement par Stripe ; nous n&apos;y
          avons jamais accès.
        </li>
        <li>
          <strong>Documents de mission</strong> (DCE, pièces d&apos;entreprise, références) —
          base légale : exécution du contrat. Hébergés chiffrés dans l&apos;UE (Supabase), supprimés
          sur demande ou 24 mois après la fin de la relation. Jamais utilisés pour entraîner des
          modèles d&apos;IA ni partagés avec d&apos;autres clients.
        </li>
        <li>
          <strong>Mesure d&apos;audience et publicité</strong> (cookies Google Tag Manager, pixel
          Meta) — base légale : consentement (bannière de consentement gérée via GTM). Durée : 13
          mois maximum.
        </li>
      </ul>
      <h2>3. Destinataires et sous-traitants</h2>
      <p>
        Vercel (hébergement du site), Supabase (base de données, UE), Stripe (paiement), Google
        (mesure d&apos;audience/publicité), Meta (publicité), prestataires d&apos;IA pour
        l&apos;analyse documentaire avec option de non-conservation des données activée. Des
        transferts hors UE peuvent exister (Vercel, Google, Meta, Stripe) ; ils sont encadrés par
        des clauses contractuelles types.
      </p>
      <h2>4. Vos droits</h2>
      <p>
        Vous disposez des droits d&apos;accès, de rectification, d&apos;effacement, de limitation,
        d&apos;opposition et de portabilité. Exercez-les par e-mail :{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Vous pouvez introduire une réclamation
        auprès de la CNIL (cnil.fr).
      </p>
      <h2>5. Cookies</h2>
      <p>
        Les cookies non essentiels (mesure d&apos;audience, publicité) ne sont déposés
        qu&apos;après votre consentement, que vous pouvez retirer à tout moment via le module de
        gestion des cookies.
      </p>
      <h2>6. Sécurité</h2>
      <p>
        Chiffrement en transit (HTTPS) et au repos, accès restreints, hébergement européen des
        données clients, sauvegardes régulières.
      </p>
    </LegalLayout>
  );
}
