import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions générales de vente (CGV)",
  alternates: { canonical: "/cgv" },
};

export default function CgvPage() {
  return (
    <LegalLayout title="Conditions générales de vente" updated="[À COMPLÉTER : date]">
      <h2>Article 1 — Objet et champ d&apos;application</h2>
      <p>
        Les présentes CGV régissent les prestations de conseil et de rédaction de documents de
        réponse aux consultations publiques et privées (mémoires techniques, audits, veille)
        fournies par <strong>[À COMPLÉTER : Prénom NOM]</strong>, exerçant sous la marque
        « Attriba » (« le Prestataire »), à tout client professionnel (« le Client »). Toute
        commande implique l&apos;acceptation sans réserve des présentes CGV. Les services
        s&apos;adressent exclusivement à des professionnels agissant dans le cadre de leur activité.
      </p>
      <h2>Article 2 — Commandes</h2>
      <p>
        Les offres « Audit Flash » et « Mémoire Express » sont commandées en ligne avec paiement
        intégral à la commande (Stripe). Les packs mensuels font l&apos;objet d&apos;un bon de
        commande ou d&apos;un abonnement avec facturation mensuelle. Les prix sont indiqués en
        euros hors taxes ; la TVA applicable, le cas échéant, est précisée avant paiement.
      </p>
      <h2>Article 3 — Délais de livraison</h2>
      <p>
        Le délai de 48 heures ouvrées court à compter de la <strong>réception complète</strong> des
        éléments nécessaires : dossier de consultation (RC, CCTP, CCAP a minima) et éléments
        d&apos;entreprise demandés lors de l&apos;onboarding. Tout élément manquant suspend le
        délai. Si le Prestataire ne peut tenir le délai (complexité exceptionnelle, force majeure),
        il en informe le Client sans délai et propose une nouvelle échéance ou le remboursement
        intégral si la date limite de remise des offres ne peut être tenue.
      </p>
      <h2>Article 4 — Obligations du Prestataire — obligation de moyens</h2>
      <p>
        Le Prestataire s&apos;engage à produire des livrables professionnels, personnalisés et
        structurés sur les critères de la consultation. <strong>Le Prestataire est tenu à une
        obligation de moyens : il ne garantit en aucun cas l&apos;attribution du marché</strong>,
        celle-ci dépendant de facteurs extérieurs (prix proposé, concurrence, appréciation de
        l&apos;acheteur). Une série de retouches est incluse pour chaque mémoire, demandée dans les
        5 jours ouvrés suivant la livraison.
      </p>
      <h2>Article 5 — Obligations du Client</h2>
      <p>
        Le Client garantit l&apos;exactitude des informations transmises (qualifications, moyens,
        références, attestations) et demeure seul responsable du contenu final déposé auprès de
        l&apos;acheteur, de la signature de sa candidature et du respect de la date limite de
        remise des offres.
      </p>
      <h2>Article 6 — Méthode de production et transparence</h2>
      <p>
        Le Prestataire utilise des outils d&apos;intelligence artificielle pour l&apos;analyse
        documentaire et l&apos;aide à la rédaction. Chaque livrable est relu, complété et validé
        humainement avant livraison. Les documents du Client ne sont jamais utilisés pour entraîner
        des modèles ni réutilisés au profit d&apos;autres clients.
      </p>
      <h2>Article 7 — Confidentialité et exclusivité par consultation</h2>
      <p>
        Le Prestataire traite l&apos;ensemble des documents et informations du Client de manière
        strictement confidentielle. Il s&apos;interdit d&apos;intervenir pour deux candidats
        concurrents sur le même lot d&apos;une même consultation : la première commande validée
        bloque le lot concerné.
      </p>
      <h2>Article 8 — Propriété intellectuelle</h2>
      <p>
        Le mémoire livré devient la propriété du Client après paiement intégral. Les trames,
        méthodes et savoir-faire du Prestataire restent sa propriété exclusive.
      </p>
      <h2>Article 9 — Paiement et retard</h2>
      <p>
        Paiement à la commande pour les prestations unitaires ; à réception de facture pour les
        packs. Tout retard de paiement entraîne de plein droit des pénalités au taux de la BCE
        majoré de 10 points et une indemnité forfaitaire de recouvrement de 40 € (art. L441-10 et
        D441-5 du Code de commerce).
      </p>
      <h2>Article 10 — Responsabilité</h2>
      <p>
        La responsabilité du Prestataire, toutes causes confondues, est plafonnée au montant payé
        par le Client au titre de la prestation concernée. Le Prestataire ne saurait être tenu
        responsable du rejet d&apos;une offre, d&apos;une erreur dans les informations fournies par
        le Client ou d&apos;un dépôt hors délai.
      </p>
      <h2>Article 11 — Résiliation des packs</h2>
      <p>
        Les packs mensuels sont sans engagement de durée et résiliables par e-mail avant la date de
        renouvellement. Les mémoires non consommés dans le mois ne sont pas reportés, sauf accord
        écrit.
      </p>
      <h2>Article 12 — Droit applicable et juridiction</h2>
      <p>
        Les présentes CGV sont soumises au droit français. À défaut de résolution amiable, tout
        litige relève des tribunaux compétents de <strong>[À COMPLÉTER : ville du siège]</strong>.
      </p>
      <p>
        Contact : <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </LegalLayout>
  );
}
