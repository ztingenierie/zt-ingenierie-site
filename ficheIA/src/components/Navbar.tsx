"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black text-brand-600">Fiche</span>
            <span className="text-2xl font-black gradient-text">IA</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">
              Fonctionnalités
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">
              Comment ça marche
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">
              Tarifs
            </Link>
            <Link href="#faq" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">
              FAQ
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">
              Connexion
            </Link>
            <Link href="/dashboard" className="btn-primary text-sm py-2 px-4">
              Essayer gratuitement
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3">
          <Link href="#features" className="block text-sm font-medium text-slate-700 py-2" onClick={() => setMobileOpen(false)}>Fonctionnalités</Link>
          <Link href="#how-it-works" className="block text-sm font-medium text-slate-700 py-2" onClick={() => setMobileOpen(false)}>Comment ça marche</Link>
          <Link href="/pricing" className="block text-sm font-medium text-slate-700 py-2" onClick={() => setMobileOpen(false)}>Tarifs</Link>
          <Link href="#faq" className="block text-sm font-medium text-slate-700 py-2" onClick={() => setMobileOpen(false)}>FAQ</Link>
          <Link href="/dashboard" className="btn-primary w-full text-center text-sm py-3 mt-2" onClick={() => setMobileOpen(false)}>
            Essayer gratuitement
          </Link>
        </div>
      )}
    </nav>
  );
}
