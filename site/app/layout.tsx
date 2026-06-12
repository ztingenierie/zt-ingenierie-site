import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://accessiveille.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AccessiVeille — Pré-audit et veille d'accessibilité RGAA / EAA",
    template: "%s | AccessiVeille",
  },
  description:
    "Scannez votre site selon le RGAA en 2 minutes, générez votre déclaration d'accessibilité et soyez alerté de toute régression. Le SaaS français de veille accessibilité pour agences web et PME.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "AccessiVeille",
    title: "AccessiVeille — Votre site accessible. Et qui le reste.",
    description:
      "Pré-audit RGAA automatisé, déclaration d'accessibilité générée, veille continue. Pour agences web et PME françaises.",
  },
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AccessiVeille",
  url: SITE_URL,
  email: "contact@accessiveille.fr",
  description:
    "SaaS français de pré-audit et de veille de conformité en accessibilité numérique (RGAA, European Accessibility Act).",
  areaServed: "FR",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
      </body>
    </html>
  );
}
