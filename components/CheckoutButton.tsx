"use client";

import { useState } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

type Props = {
  offer: "memoire" | "audit";
  label: string;
  amount: number;
  className?: string;
};

export default function CheckoutButton({ offer, label, amount, className = "" }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    window.dataLayer?.push({ event: "begin_checkout", offer, value: amount, currency: "EUR" });
    window.fbq?.("track", "InitiateCheckout", { value: amount, currency: "EUR" });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offer }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Erreur lors de la création du paiement.");
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inattendue.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className={`w-full rounded-lg bg-chantier px-6 py-3 font-semibold text-white shadow hover:bg-chantier/90 disabled:opacity-60 ${className}`}
      >
        {loading ? "Redirection vers le paiement…" : label}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
