# AccessiVeille — Business digital complet, prêt à lancer

SaaS français de pré-audit et de veille de conformité en accessibilité numérique (RGAA / European Accessibility Act), conçu pour être opéré **en solo, 100 % à distance, sans visage et sans prospection physique**, par un micro-entrepreneur développeur full-stack.

## Contenu du dépôt

| Fichier / dossier | Rôle |
|---|---|
| `business-plan.md` | Scoring des idées, validation marché (TAM/SAM/SOM, concurrents, preuves de demande), business plan, marque, produit, roadmap |
| `site/` | Le site web complet (Next.js 15 + TypeScript + Tailwind) avec mini-scan RGAA fonctionnel, capture de leads Supabase, Stripe prêt à brancher, SEO complet — **build vérifié** |
| `marketing-plan.md` | Plan d'acquisition 90 jours, stratégie SEO + 10 articles, cold emails conformes, tunnels payants, calendrier de contenu, lead magnets |
| `legal/` | Cadre micro-entrepreneur (seuils, TVA, facturation électronique), mentions légales, CGV/CGU, politique de confidentialité, registre RGPD |
| `plan-execution-90j.md` | Plan semaine par semaine, checklist « prêt à lancer », méthode des 10 premiers clients, KPI |

## Lancer le site en local

```bash
cd site
npm install
cp .env.example .env.local   # facultatif en local : le scan marche sans Supabase/Stripe
npm run dev                  # http://localhost:3000
```

Sans variables d'environnement, le site fonctionne en mode dégradé volontaire : le mini-scan analyse et affiche les résultats (sans enregistrer le lead), et les boutons de paiement affichent un message de contact. Rien ne casse.

## Déploiement production (Vercel + domaine OVH) — ~30 minutes

1. **Domaine** : sur OVH, vérifier et commander `accessiveille.fr` (et `.com` si dispo). Si le nom est pris : choisir un fallback et remplacer `accessiveille.fr` dans `site/.env.example` (`NEXT_PUBLIC_SITE_URL`) — tout le reste suit cette variable.
2. **Supabase** : créer un projet (région **eu-west**, RGPD), ouvrir SQL Editor, exécuter `site/supabase/schema.sql`. Récupérer `Project URL` et `service_role key` (Settings → API).
3. **Stripe** : créer 4 produits — Essentiel 39 €/mois, Pro 99 €/mois, Agence 249 €/mois (récurrents) et Pack Déclaration 390 € (paiement unique). Copier les 4 `price_...` IDs et la clé secrète.
4. **Vercel** : importer le repo (root directory = `site/`), renseigner les variables d'environnement de `.env.example`, déployer.
5. **DNS OVH** : zone DNS du domaine → enregistrement `A @ 76.76.21.21` et `CNAME www cname.vercel-dns.com`, puis ajouter le domaine dans Vercel (Settings → Domains). HTTPS automatique.
6. **Vérifications** : soumettre `https://votredomaine/sitemap.xml` dans Google Search Console, tester un scan réel, tester un paiement (mode test Stripe puis un vrai paiement remboursé).

Alternative Netlify : runtime Next.js officiel, mêmes variables, DNS `CNAME → apex-loadbalancer.netlify.com` / enregistrement A `75.2.60.5`.

## Architecture cible (au-delà du MVP)

```
Visiteur → site Next.js (Vercel) → /api/scan (contrôles RGAA statiques)
                                  → Supabase (leads, scans, clients)
                                  → Stripe (abonnements + Customer Portal)
VPS OVH (7 €/mois) : n8n (scans planifiés Playwright+axe-core, alertes, séquences e-mail)
API Claude : explications de correction en français dans les rapports payants
```

## Avant toute mise en ligne — à ne pas sauter

- Remplacer **tous les champs `[...]`** dans les pages légales du site et dans `legal/` (SIREN, adresse, etc.).
- Vérifier la disponibilité du nom sur **OVH + data.inpi.fr** (hypothèse non vérifiée à ce jour).
- Re-vérifier les seuils micro/TVA de l'année en cours (`legal/cadre-micro-entrepreneur.md`).
- Choisir une PDP de facturation électronique **avant le 01/09/2026** (obligation de réception).

## Première action aujourd'hui

Ouvrir OVH et data.inpi.fr, vérifier `accessiveille.fr` : si libre, l'acheter (≈ 8 €) ; sinon choisir le fallback. Tout le plan 90 jours (`plan-execution-90j.md`, semaine 1) démarre là.
