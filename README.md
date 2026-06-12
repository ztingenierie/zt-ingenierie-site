# Attriba — le business complet, livré de A à Z

> **Le mémoire technique qui gagne des marchés. Livré en 48 h.**
> Service productisé (propulsé par IA, validé par un humain) de rédaction de mémoires techniques
> pour les TPE/PME du second œuvre BTP qui répondent aux marchés publics.

Ce dépôt contient **tout** : la stratégie, le business plan, le plan marketing, le cadre légal et
le site web prêt à déployer.

## 🚀 Démarrage immédiat

1. **Action n° 1 (aujourd'hui)** : vérifier/acheter `attriba.fr` sur OVH, puis suivre
   [`DEPLOIEMENT.md`](DEPLOIEMENT.md) (~1 h pour un site en ligne qui encaisse).
2. Lire [`docs/08-plan-execution-90-jours.md`](docs/08-plan-execution-90-jours.md) et dérouler la
   semaine 1.

## 📚 Les documents stratégiques (`docs/`)

| Fichier | Contenu |
|---|---|
| [01-ideation-et-scoring.md](docs/01-ideation-et-scoring.md) | 10 idées, scoring sur 9 critères, choix argumenté |
| [02-validation-marche.md](docs/02-validation-marche.md) | TAM/SAM/SOM, concurrents, preuves de demande, pricing (sources citées) |
| [03-business-plan.md](docs/03-business-plan.md) | Personas, grille tarifaire, coûts, projections 12 mois (3 scénarios), risques |
| [04-identite-marque.md](docs/04-identite-marque.md) | Nom, positionnement, palette, logo SVG, tagline |
| [05-offre-et-mvp.md](docs/05-offre-et-mvp.md) | Offre détaillée, parcours client, MVP, roadmap 18 mois |
| [06-marketing-90-jours.md](docs/06-marketing-90-jours.md) | Outbound data-driven, Google Ads, 20 contenus SEO, plan semaine par semaine |
| [07-legal-administratif.md](docs/07-legal-administratif.md) | Micro-entreprise, TVA, facture électronique 2026, encaissement |
| [08-plan-execution-90-jours.md](docs/08-plan-execution-90-jours.md) | Checklist de lancement, KPI, action n° 1 |

## 🖥️ Le site (Next.js 14 + TypeScript + Tailwind)

- **Pages** : landing de conversion `/`, vente `/offre`, tarifs `/tarifs`, contact `/contact`,
  confirmation `/merci`, CGV/CGU/mentions légales/RGPD.
- **Paiement** : Stripe Checkout (`app/api/checkout`) — Mémoire Express 590 €, Audit Flash 90 €.
- **Leads** : formulaire → `app/api/contact` → table `leads` Supabase (`supabase/schema.sql`).
- **Tracking** : Google Tag Manager + pixel Meta (événements `lead`, `begin_checkout`, `purchase`).
- **SEO** : metadata, OpenGraph, `sitemap.xml`, `robots.txt`, JSON-LD `ProfessionalService`.

```bash
npm install && cp .env.example .env.local && npm run dev
```

## ⚠️ Hypothèses à vérifier le jour J

- Disponibilité des domaines `attriba.fr` / `attriba.com` (plans B dans `docs/04`) + recherche INPI ;
- Seuils micro-entreprise / TVA 2026 (urssaf.fr) avant immatriculation ;
- Champs `[À COMPLÉTER]` dans les pages légales et `lib/site.ts` (SIREN, adresse, téléphone).
