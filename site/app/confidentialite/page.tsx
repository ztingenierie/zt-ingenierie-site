import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-extrabold">Politique de confidentialité</h1>
      <p className="mt-4 text-slate2">
        Responsable de traitement : [Prénom NOM] EI, exerçant sous le nom AccessiVeille —
        [adresse] — contact@accessiveille.fr.
      </p>

      <h2 className="mt-8 text-xl font-bold">Données traitées et finalités</h2>
      <ul className="mt-2 list-disc pl-6 text-slate2">
        <li>
          <strong>Scan découverte :</strong> e-mail professionnel, URL analysée, résultats — pour
          fournir le rapport demandé puis, avec votre accord, des conseils par e-mail. Conservation
          3 ans après le dernier contact.
        </li>
        <li>
          <strong>Compte client :</strong> identité, e-mail, entreprise — exécution du contrat.
          Conservation : durée du contrat + 5 ans.
        </li>
        <li>
          <strong>Facturation :</strong> coordonnées et transactions (données de carte traitées
          exclusivement par Stripe) — obligation légale, conservation 10 ans.
        </li>
        <li>
          <strong>Prospection B2B :</strong> coordonnées professionnelles issues de sources
          publiques — intérêt légitime, opt-out immédiat dans chaque e-mail, conservation 3 ans.
        </li>
      </ul>
      <p className="mt-2 text-slate2">
        Aucune donnée n'est vendue ni cédée. Aucun profilage. Aucun cookie publicitaire — le site ne
        dépose aucun cookie soumis à consentement.
      </p>

      <h2 className="mt-8 text-xl font-bold">Destinataires et sous-traitants</h2>
      <p className="mt-2 text-slate2">
        Supabase (hébergement des données, Union européenne), Vercel (hébergement du site), Stripe
        (paiement), Resend/Brevo (e-mails). Les transferts hors UE sont encadrés par les clauses
        contractuelles types et/ou le Data Privacy Framework.
      </p>

      <h2 className="mt-8 text-xl font-bold">Vos droits</h2>
      <p className="mt-2 text-slate2">
        Accès, rectification, effacement, limitation, opposition, portabilité : écrivez à
        contact@accessiveille.fr (réponse sous 30 jours). Vous pouvez introduire une réclamation
        auprès de la CNIL (cnil.fr).
      </p>

      <h2 className="mt-8 text-xl font-bold">Sécurité</h2>
      <p className="mt-2 text-slate2">
        Données hébergées dans l'Union européenne, chiffrement en transit et au repos, accès
        restreint, sauvegardes quotidiennes.
      </p>

      <p className="mt-8 text-sm text-slate2">Dernière mise à jour : [date].</p>
    </div>
  );
}
