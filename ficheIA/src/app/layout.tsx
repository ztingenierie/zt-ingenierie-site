import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "FicheIA — Générateur IA de fiches produits e-commerce SEO",
    template: "%s | FicheIA",
  },
  description:
    "Générez 50 fiches produits SEO optimisées en 2 minutes pour votre boutique Shopify ou WooCommerce. IA en français, export CSV, intégration directe. Essayez gratuitement.",
  keywords: [
    "générateur fiche produit",
    "description produit automatique",
    "fiche produit IA",
    "rédaction produit shopify",
    "SEO ecommerce",
    "description produit woocommerce",
    "automatiser fiches produits",
  ],
  authors: [{ name: "FicheIA" }],
  creator: "FicheIA",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://ficheai.fr"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://ficheai.fr",
    siteName: "FicheIA",
    title: "FicheIA — 50 fiches produits SEO en 2 minutes",
    description:
      "Générez des fiches produits e-commerce optimisées SEO en français grâce à l'IA. Shopify, WooCommerce, export CSV.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FicheIA - Générateur de fiches produits IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FicheIA — 50 fiches produits SEO en 2 minutes",
    description: "Générateur IA de fiches produits e-commerce en français",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "FicheIA",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description:
                "Générateur IA de fiches produits e-commerce SEO optimisées en français",
              offers: [
                {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "EUR",
                  name: "Essai gratuit — 10 fiches",
                },
                {
                  "@type": "Offer",
                  price: "19",
                  priceCurrency: "EUR",
                  name: "Starter — 200 fiches/mois",
                  priceSpecification: {
                    "@type": "RecurringChargeSpecification",
                    billingDuration: "P1M",
                  },
                },
              ],
              url: "https://ficheai.fr",
              inLanguage: "fr",
            }),
          }}
        />
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="antialiased bg-white text-slate-900">{children}</body>
    </html>
  );
}
