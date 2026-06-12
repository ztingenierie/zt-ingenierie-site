import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Merci — commande confirmée",
  robots: { index: false },
};

export default function MerciPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-24 text-center">
      <h1 className="text-4xl font-extrabold">Merci, c'est noté ✓</h1>
      <p className="mx-auto mt-4 max-w-xl text-slate2">
        Votre paiement est confirmé. Vous recevez dans quelques minutes un e-mail avec les
        prochaines étapes : ajout de votre site, premier scan complet et accès à vos rapports. Une
        question ? <a className="font-semibold text-primary" href="mailto:contact@accessiveille.fr">contact@accessiveille.fr</a>
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
