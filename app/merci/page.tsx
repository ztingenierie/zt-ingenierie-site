import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Merci — commande confirmée",
  robots: { index: false, follow: false },
};

export default function MerciPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      {/* Événement de conversion (GTM + Meta) déclenché côté client */}
      <Script id="purchase-event" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ event: 'purchase' });
if (window.fbq) { window.fbq('track', 'Purchase'); }`}
      </Script>
      <p className="text-5xl">✅</p>
      <h1 className="mt-6 text-3xl font-extrabold text-night">Commande confirmée — au travail !</h1>
      <p className="mt-4 text-lg text-ink/80">
        Vous allez recevoir un e-mail avec votre facture et le lien sécurisé pour déposer votre DCE
        et vos éléments d&apos;entreprise. <strong>Le délai de 48 h démarre dès réception complète
        de vos documents.</strong>
      </p>
      <p className="mt-4 text-ink/80">
        Pas d&apos;e-mail sous 15 minutes ? Vérifiez vos indésirables ou écrivez-nous :{" "}
        <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>
      </p>
      <Link href="/" className="mt-8 inline-block font-semibold text-steel underline hover:text-chantier">
        ← Retour à l&apos;accueil
      </Link>
    </div>
  );
}
