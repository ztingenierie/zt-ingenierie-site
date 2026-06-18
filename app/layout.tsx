import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZT Video Studio — Générateur de vidéos IA ultra-réalistes",
  description:
    "Transforme un prompt et tes images en vidéos ultra-réalistes. Veo 3.1, Kling 3.0, Seedance 2.0, Minimax, Wan — orchestrés dans un studio à la Higgsfield.",
  openGraph: {
    title: "ZT Video Studio",
    description:
      "Génération de vidéos IA ultra-réalistes par prompt et images.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
