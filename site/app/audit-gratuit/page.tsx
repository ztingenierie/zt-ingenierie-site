import type { Metadata } from "next";
import ScanForm from "@/components/ScanForm";

export const metadata: Metadata = {
  title: "Audit accessibilité gratuit — testez votre site en 2 minutes",
  description:
    "Test d'accessibilité gratuit et immédiat : 10 contrôles dérivés du RGAA sur la page de votre choix, score sur 100 et corrections expliquées en français. Sans carte bancaire.",
  alternates: { canonical: "/audit-gratuit" },
};

export default function AuditGratuitPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-16">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold">Testez l'accessibilité de votre site, gratuitement</h1>
          <p className="mt-4 text-slate2">
            En 2 minutes : un score sur 100, la liste des problèmes détectés sur les contrôles
            automatisables du RGAA, et la correction à appliquer pour chacun. Le rapport vous est
            aussi envoyé par e-mail.
          </p>
          <ul className="mt-6 flex flex-col gap-2 text-sm font-medium">
            <li>✓ 10 contrôles dérivés des critères RGAA 1.1, 2.1, 6.1, 8.3, 8.5, 9.1, 10.4, 11.1, 11.9 et 12.6</li>
            <li>✓ Résultat immédiat, aucune carte bancaire</li>
            <li>✓ Corrections expliquées en français</li>
          </ul>
          <p className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate2">
            Transparence : ce test gratuit porte sur une page et sur les critères automatisables. Il
            donne un signal fiable, pas un verdict de conformité. L'analyse complète multi-pages,
            les contrastes, la navigation clavier et les livrables légaux font partie des
            abonnements.
          </p>
        </div>
        <ScanForm />
      </div>
    </div>
  );
}
