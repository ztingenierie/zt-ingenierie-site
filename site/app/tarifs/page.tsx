import type { Metadata } from "next";
import PricingCards from "@/components/PricingCards";

export const metadata: Metadata = {
  title: "Tarifs — veille accessibilité RGAA dès 39 €/mois",
  description:
    "Abonnements de veille d'accessibilité numérique : Essentiel 39 €/mois, Pro 99 €/mois, Agence 249 €/mois. Pack Déclaration d'accessibilité 390 €. Sans engagement.",
  alternates: { canonical: "/tarifs" },
};

const OFFERS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "AccessiVeille",
  description:
    "Pré-audit et veille de conformité en accessibilité numérique (RGAA / European Accessibility Act).",
  brand: { "@type": "Brand", name: "AccessiVeille" },
  offers: [
    { "@type": "Offer", name: "Essentiel", price: "39", priceCurrency: "EUR" },
    { "@type": "Offer", name: "Pro", price: "99", priceCurrency: "EUR" },
    { "@type": "Offer", name: "Agence", price: "249", priceCurrency: "EUR" },
    { "@type": "Offer", name: "Pack Déclaration", price: "390", priceCurrency: "EUR" },
  ],
};

export default function TarifsPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-16">
      <h1 className="text-4xl font-extrabold">Des tarifs simples, sans engagement</h1>
      <p className="mt-4 max-w-2xl text-slate2">
        10 fois moins cher qu'un audit d'agence, pour 80 % du besoin courant : savoir où on en est,
        produire les documents obligatoires, et ne jamais régresser sans le savoir.
      </p>
      <div className="mt-10">
        <PricingCards />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(OFFERS_JSONLD) }}
      />
    </div>
  );
}
