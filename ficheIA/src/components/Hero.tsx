"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const DEMO_OUTPUT = {
  title: "Sac à dos imperméable 30L — Randonnée & Urban",
  metaDescription:
    "Sac à dos imperméable 30L avec compartiment laptop 15 pouces. Bretelles ergonomiques, poids 800g. Idéal randonnée et quotidien. Livraison offerte.",
  shortDescription:
    "Affrontez les aléas météo sans compromettre votre équipement. Ce sac à dos imperméable IPX6 de 30 litres protège votre laptop et vos affaires en toutes conditions, du sentier de randonnée au bureau city.",
  bulletPoints: [
    "Imperméabilité certifiée IPX6 — résiste aux fortes pluies",
    "Compartiment dédié laptop 15 pouces + poche tablette",
    "Bretelles ergonomiques anti-fatigue pour longues randonnées",
    "Léger comme une plume : seulement 800g à vide",
    "30L de capacité — parfait du week-end à l'expédition",
  ],
};

export default function Hero() {
  const [animating, setAnimating] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentBullet, setCurrentBullet] = useState(0);

  const runDemo = () => {
    setAnimating(true);
    setShowOutput(false);
    setTypedText("");
    setCurrentBullet(0);

    setTimeout(() => {
      setShowOutput(true);
      const title = DEMO_OUTPUT.title;
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(title.slice(0, i + 1));
        i++;
        if (i >= title.length) {
          clearInterval(interval);
          setAnimating(false);
          let bulletIdx = 0;
          const bulletInterval = setInterval(() => {
            setCurrentBullet((prev) => prev + 1);
            bulletIdx++;
            if (bulletIdx >= DEMO_OUTPUT.bulletPoints.length) {
              clearInterval(bulletInterval);
            }
          }, 300);
        }
      }, 25);
    }, 1200);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950">
      <div className="absolute inset-0 hero-grid opacity-30" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-300 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
          Outil 100% français · IA Claude · Résultats en 60 secondes
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
          50 fiches produits SEO{" "}
          <span className="gradient-text">en 2 minutes.</span>
          <br />
          <span className="text-slate-300">Zéro copywriter. Zéro effort.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Importez votre catalogue CSV, choisissez votre ton, téléchargez des descriptions SEO
          prêtes à publier sur Shopify ou WooCommerce.
          <strong className="text-slate-200"> L&apos;IA fait tout le reste.</strong>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/dashboard" className="btn-cta text-base sm:text-lg px-8 py-4 w-full sm:w-auto">
            Essayer gratuitement — 10 fiches offertes
          </Link>
          <button
            onClick={runDemo}
            disabled={animating}
            className="btn-secondary text-base px-6 py-4 w-full sm:w-auto border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white"
          >
            {animating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Génération en cours...
              </span>
            ) : (
              "▶ Voir une démo live"
            )}
          </button>
        </div>

        {showOutput && (
          <div className="max-w-2xl mx-auto animate-slide-up">
            <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden text-left shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-slate-400 font-mono">fiche-produit.json</span>
              </div>
              <div className="p-5 space-y-4 font-mono text-sm">
                <div>
                  <span className="text-slate-500">// Titre H1</span>
                  <p className="text-accent-400 font-semibold mt-1">
                    {typedText}
                    {animating && <span className="animate-pulse">|</span>}
                  </p>
                </div>
                {currentBullet > 0 && (
                  <div>
                    <span className="text-slate-500">// Points forts</span>
                    <ul className="mt-2 space-y-1">
                      {DEMO_OUTPUT.bulletPoints.slice(0, currentBullet).map((bp, i) => (
                        <li key={i} className="text-slate-300 flex items-start gap-2">
                          <span className="text-accent-400 mt-0.5">✓</span>
                          {bp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {currentBullet >= DEMO_OUTPUT.bulletPoints.length && (
                  <div className="pt-2 border-t border-slate-700">
                    <span className="text-slate-500">// Meta description SEO</span>
                    <p className="text-slate-400 text-xs mt-1">{DEMO_OUTPUT.metaDescription}</p>
                  </div>
                )}
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">
              ↑ Généré en ~1,2 seconde via Claude IA · En production, jusqu&apos;à 100 produits simultanément
            </p>
          </div>
        )}

        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Sans engagement
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Pas de CB pour l&apos;essai
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Données hébergées en France
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Conforme RGPD
          </div>
        </div>
      </div>
    </section>
  );
}
