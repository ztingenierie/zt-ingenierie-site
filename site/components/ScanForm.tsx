"use client";

import { useState } from "react";
import type { ScanResult } from "@/lib/scanner";

const SEVERITY_STYLE: Record<string, string> = {
  bloquant: "bg-red-100 text-red-900",
  majeur: "bg-amber-100 text-amber-900",
  mineur: "bg-slate-100 text-slate-800",
};

export default function ScanForm() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, email, consent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Analyse impossible.");
      setResult(data as ScanResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analyse impossible.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xl">
      <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="scan-url" className="block text-sm font-semibold">
              Adresse de la page à analyser
            </label>
            <input
              id="scan-url"
              type="text"
              inputMode="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.monsite.fr"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="scan-email" className="block text-sm font-semibold">
              E-mail professionnel (pour recevoir le rapport)
            </label>
            <input
              id="scan-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="prenom@entreprise.fr"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
          <div className="flex items-start gap-2">
            <input
              id="scan-consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4"
            />
            <label htmlFor="scan-consent" className="text-sm text-slate2">
              J'accepte de recevoir les conseils accessibilité d'AccessiVeille (désinscription en un
              clic, jamais de revente de données).
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
          >
            {loading ? "Analyse en cours…" : "Analyser gratuitement ma page"}
          </button>
          <p className="text-xs text-slate2">
            Analyse automatique d'une page selon 10 contrôles dérivés du RGAA. Aucune carte
            bancaire. Vos données : voir notre politique de confidentialité.
          </p>
        </div>
      </form>

      <div role="status" aria-live="polite">
        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-900">{error}</p>
        )}

        {result && (
          <section aria-label="Résultats de l'analyse" className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-bold">Résultat pour {new URL(result.finalUrl).hostname}</h2>
              <p className="text-3xl font-extrabold text-primary">
                {result.score}
                <span className="text-base font-medium text-slate2">/100</span>
              </p>
            </div>
            <p className="mt-2 text-sm text-slate2">
              {result.checksFailed === 0
                ? "Aucun problème détecté sur les contrôles automatisables. Bon signal — mais seuls ~30 % des critères RGAA sont testables automatiquement."
                : `${result.checksFailed} contrôle(s) en échec sur ${result.checksRun}. Détail ci-dessous, du plus bloquant au plus mineur.`}
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {result.issues.map((issue) => (
                <li key={issue.id} className="rounded-lg border border-slate-200 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded px-2 py-0.5 text-xs font-bold uppercase ${SEVERITY_STYLE[issue.severity]}`}>
                      {issue.severity}
                    </span>
                    <span className="text-xs font-semibold text-slate2">{issue.rgaa}</span>
                    <span className="font-semibold">
                      {issue.label}
                      {issue.count > 1 ? ` (×${issue.count})` : ""}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate2">{issue.explanation}</p>
                  <p className="mt-1 text-sm">
                    <span className="font-semibold text-accent">Correction :</span> {issue.fix}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-lg bg-slate-50 p-4 text-sm">
              <p className="font-semibold">Et les 70 % de critères restants ?</p>
              <p className="mt-1 text-slate2">
                Contrastes, navigation clavier, ordre de lecture… nécessitent un scan approfondi
                multi-pages. C'est exactement ce que fait l'abonnement AccessiVeille, avec alertes en
                cas de régression et déclaration d'accessibilité générée.
              </p>
              <a
                href="/tarifs"
                className="mt-3 inline-block rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-primary-dark"
              >
                Voir les offres
              </a>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
