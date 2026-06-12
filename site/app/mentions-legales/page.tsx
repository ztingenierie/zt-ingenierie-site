import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <div className="prose-sm mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-extrabold">Mentions légales</h1>

      <h2 className="mt-8 text-xl font-bold">Éditeur du site</h2>
      <p className="mt-2 text-slate2">
        Le site accessiveille.fr est édité par [Prénom NOM] EI, entrepreneur individuel exerçant
        sous le nom commercial AccessiVeille — SIREN [XXX XXX XXX] — Siège : [adresse]. Contact :
        contact@accessiveille.fr. Directeur de la publication : [Prénom NOM]. TVA non applicable,
        art. 293 B du CGI.
      </p>

      <h2 className="mt-8 text-xl font-bold">Hébergement</h2>
      <p className="mt-2 text-slate2">
        Site hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. Données
        applicatives hébergées par Supabase (région Union européenne). Nom de domaine : OVH SAS,
        2 rue Kellermann, 59100 Roubaix.
      </p>

      <h2 className="mt-8 text-xl font-bold">Propriété intellectuelle</h2>
      <p className="mt-2 text-slate2">
        L'ensemble des contenus du site (textes, logo, charte graphique, code, rapports générés)
        est protégé par le droit d'auteur. Toute reproduction non autorisée est interdite.
      </p>

      <h2 className="mt-8 text-xl font-bold">Portée des rapports automatisés</h2>
      <p className="mt-2 text-slate2">
        Les scores et rapports produits par AccessiVeille reposent sur des contrôles automatisés
        couvrant une partie des critères du RGAA. Ils constituent une aide au diagnostic et ne
        valent pas audit de conformité ni certification au sens de la réglementation.
      </p>

      <h2 className="mt-8 text-xl font-bold">Signalement</h2>
      <p className="mt-2 text-slate2">
        Pour signaler un contenu ou un problème : contact@accessiveille.fr.
      </p>
    </div>
  );
}
