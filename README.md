# FicheIA — Business Digital Complet
## Générateur IA de fiches produits e-commerce | 100% digital | Auto-sell | France

---

## RÉCAPITULATIF DU PROJET

**Business :** FicheIA — Micro-SaaS IA de génération de fiches produits e-commerce SEO en masse  
**Marché :** E-commerçants français (Shopify / WooCommerce) — ~180 000 boutiques actives  
**Modèle :** Abonnement mensuel €19/€49/€99/€249 — achat 100% self-service, 0 vente active  
**Acquisition :** Freemium (10 fiches gratuites sans CB) + Meta Ads + Google Ads + SEO  
**Stack :** Next.js 14 / TypeScript / Supabase / Stripe / Claude API  
**Déploiement :** Vercel + domaine OVH

---

## STRUCTURE DU DÉPÔT

```
/
├── README.md                    ← Ce fichier — guide d'assemblage complet
├── business-plan.md             ← Étapes 0-4 : décision, scoring, validation, plan complet
├── marketing-plan.md            ← Étape 8 : plan pub Meta/Google, SEO, affiliation
├── plan-execution-90j.md        ← Étape 10 : plan 90j semaine/semaine + checklist lancement
├── legal/
│   ├── cgv.md                   ← CGV conformes — À COMPLÉTER avec vos infos
│   ├── cgu.md                   ← CGU
│   ├── mentions-legales.md      ← Mentions légales — À COMPLÉTER avec vos infos
│   └── politique-rgpd.md        ← Politique RGPD complète
└── ficheIA/                     ← Application Next.js complète
    ├── .env.example             ← Variables d'environnement requises
    ├── package.json
    ├── next.config.ts
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── public/
    │   ├── logo.svg             ← Logo SVG (personnalisable)
    │   └── robots.txt
    └── src/
        ├── app/
        │   ├── layout.tsx       ← Layout global (SEO, analytics, meta)
        │   ├── page.tsx         ← Landing page conversion
        │   ├── sitemap.ts       ← Sitemap dynamique
        │   ├── globals.css
        │   ├── pricing/page.tsx ← Page tarifs avec tableau comparatif
        │   ├── dashboard/page.tsx ← Interface générateur
        │   └── api/
        │       ├── generate/    ← Route génération IA (Claude)
        │       ├── stripe/
        │       │   ├── checkout/ ← Création session Stripe
        │       │   └── webhook/ ← Webhook Stripe (mise à jour plan)
        │       └── usage/       ← Usage utilisateur + portail Stripe
        ├── components/
        │   ├── Navbar.tsx
        │   ├── Hero.tsx         ← Hero animé avec démo live
        │   ├── Features.tsx
        │   ├── HowItWorks.tsx
        │   ├── Pricing.tsx      ← Pricing cards avec toggle annuel
        │   ├── FAQ.tsx
        │   └── Footer.tsx
        └── lib/
            ├── supabase.ts      ← Clients Supabase (browser, server, service)
            ├── stripe.ts        ← Stripe + définition des plans
            └── claude.ts        ← Génération IA (single + batch)
```

---

## GUIDE D'ASSEMBLAGE ET LANCEMENT (étape par étape)

### PRÉREQUIS
- Node.js ≥ 18
- Compte Supabase (gratuit pour commencer)
- Compte Stripe (gratuit, paiements en mode test d'abord)
- Compte Anthropic (Claude API — ~€0,008/fiche en Haiku)
- Compte Vercel (gratuit pour commencer)
- Domaine OVH (ficheai.fr ou votre nom choisi — ~€12/an)

---

### ÉTAPE 1 — Cloner et installer

```bash
git clone https://github.com/votre-repo/ficheIA.git
cd ficheIA
npm install
```

---

### ÉTAPE 2 — Variables d'environnement

```bash
cp .env.example .env.local
```

Ouvrez `.env.local` et renseignez :

| Variable | Où la trouver |
|----------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Votre projet → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role (secret!) |
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys → Secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe → Developers → API keys → Publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Developers → Webhooks → Signing secret |
| `ANTHROPIC_API_KEY` | console.anthropic.com → API Keys |

---

### ÉTAPE 3 — Base de données Supabase

1. Allez dans Supabase → votre projet → SQL Editor
2. Copiez-collez ce SQL et exécutez :

```sql
-- Profils utilisateurs
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free','starter','pro','scale','agence')),
  fiches_used_this_month INTEGER DEFAULT 0,
  fiches_limit INTEGER DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Historique des générations
CREATE TABLE generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  generated_description TEXT,
  tone TEXT,
  keywords TEXT[],
  tokens_used INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sécurité Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users view own generations" ON generations FOR SELECT USING (auth.uid() = user_id);

-- Trigger : créer le profil automatiquement à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

3. Supabase → Authentication → Email Templates → personnalisez (optionnel)
4. Supabase → Authentication → URL Configuration → Site URL = `https://ficheai.fr`

---

### ÉTAPE 4 — Stripe

1. Créez 4 produits dans le dashboard Stripe :
   - **Starter** : €19/mois (récurrent)
   - **Pro** : €49/mois (récurrent)
   - **Scale** : €99/mois (récurrent)
   - **Agence** : €249/mois (récurrent)

2. Copiez les **Price IDs** (pas les Product IDs) dans votre `.env.local`

3. Configurez le webhook Stripe :
   - Stripe → Developers → Webhooks → Add endpoint
   - URL : `https://ficheai.fr/api/stripe/webhook`
   - Événements à écouter :
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_failed`

4. **En local (développement)** : Utilisez Stripe CLI
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

### ÉTAPE 5 — Test local

```bash
npm run dev
```

Ouvrez http://localhost:3000 et testez :
- [ ] La landing page s'affiche
- [ ] Le bouton "Voir une démo live" fonctionne (animation)
- [ ] Le dashboard s'affiche
- [ ] La génération fonctionne (générer 1 fiche produit manuellement)
- [ ] L'export CSV fonctionne

---

### ÉTAPE 6 — Déploiement Vercel

```bash
# Option 1 : via CLI
npm i -g vercel
vercel --prod

# Option 2 : via interface Vercel
# → vercel.com → New Project → Import GitHub repo
# → Framework: Next.js → Root Directory: ficheIA
```

Dans Vercel → Project Settings → Environment Variables, ajoutez toutes les variables de `.env.local`.

---

### ÉTAPE 7 — Domaine OVH → Vercel

1. OVH → Noms de domaine → ficheai.fr → Zone DNS
2. Ajoutez un enregistrement CNAME :
   - **Type :** CNAME
   - **Sous-domaine :** www
   - **Cible :** cname.vercel-dns.com
3. Pour l'apex (ficheai.fr sans www), ajoutez les A records Vercel :
   - 76.76.21.21
4. Vercel → Project → Domains → ajoutez ficheai.fr
5. SSL/TLS : Vercel gère automatiquement le certificat Let's Encrypt

---

### ÉTAPE 8 — Remplir les documents légaux

**IMPORTANT — À faire avant le premier utilisateur :**

1. Ouvrez `legal/mentions-legales.md` → remplacez tous les `[VOTRE ...]` par vos vraies informations
2. Faites de même pour `legal/cgv.md`, `legal/cgu.md`, `legal/politique-rgpd.md`
3. Créez des pages statiques dans Next.js pour afficher ces contenus

**Pages légales à créer** (pages simples qui rendent le markdown) :
- `/mentions-legales`
- `/cgv`
- `/cgu`
- `/politique-confidentialite`

```bash
# Installer react-markdown pour rendre le contenu
npm install react-markdown
```

---

### ÉTAPE 9 — Analytics et tracking

1. **Google Analytics 4** : analytics.google.com → Créer une propriété → récupérer le Measurement ID (G-XXXXXXXXXX) → ajouter dans Vercel env vars
2. **Meta Pixel** : business.facebook.com → Events Manager → Connecter des sources de données → Pixel → récupérer l'ID → ajouter dans Vercel env vars
3. **Bandeau RGPD** : installer tarteaucitron.js ou Axeptio pour la gestion du consentement

---

### ÉTAPE 10 — Première publicité

Voir `marketing-plan.md` pour le plan complet.

**Budget de test recommandé :** €300-500 sur 2 semaines  
**Règle absolue :** Ne scaler qu'après avoir prouvé CAC < €30 et LTV/CAC > 3

---

## CHECKLIST DE LANCEMENT RAPIDE

### Technique
- [ ] `npm run dev` fonctionne localement
- [ ] Variables d'environnement configurées
- [ ] Tables Supabase créées
- [ ] Stripe configuré (produits + webhook)
- [ ] Déployé sur Vercel
- [ ] Domaine ficheai.fr pointé vers Vercel
- [ ] Test du parcours complet en production (inscription → génération → paiement)

### Légal
- [ ] Mentions légales complétées et publiées
- [ ] CGV complétées et publiées
- [ ] CGU complétées et publiées
- [ ] Politique RGPD complétée et publiée
- [ ] Bandeau cookie RGPD installé

### Marketing
- [ ] Landing page en production
- [ ] 3 créas pub prêtes (voir marketing-plan.md)
- [ ] Comptes Meta Ads et Google Ads créés
- [ ] Listé sur There's An AI For That, Product Hunt (schedule), Futurepedia

---

## IDENTITÉ DE MARQUE (Étape 5)

| Élément | Valeur |
|---------|--------|
| **Nom** | FicheIA |
| **Domaine cible** | ficheai.fr |
| **Tagline** | "50 fiches produits SEO en 2 minutes. Sans effort." |
| **Ton** | Professionnel mais accessible. Direct. Chiffré. Rassurant. |
| **Couleur primaire** | #4f46e5 (Indigo) |
| **Couleur accent** | #10b981 (Emerald) |
| **Couleur fond hero** | #0f172a (Dark Slate) |
| **Typographie** | Inter (Google Fonts) |
| **Logo** | Voir `/public/logo.svg` — personnalisable |

---

## INFORMATIONS LÉGALES (Étape 9)

### Régime micro-entrepreneur

| Information | Détail |
|-------------|--------|
| **Seuil CA annuel (services)** | 77 700 € (2024-2025) |
| **Cotisations sociales** | ~22% du CA (BNC) ou ~12,3% (BIC) selon activité |
| **TVA** | Non applicable sous le seuil de franchise (art. 293 B CGI) — mention obligatoire sur les factures |
| **Déclaration CA** | Mensuelle ou trimestrielle sur urssaf.fr |
| **Facturation** | Obligatoire dès le 1er € — numérotation séquentielle |
| **Facture électronique** | Réforme progressive (obligatoire pour TPE à partir de 2026-2027) |
| **Compte bancaire** | Compte dédié obligatoire si CA > 10 000€/an pendant 2 ans |

### Stripe et encaissement
- **Frais Stripe** : 1,5% + €0,25 par transaction (cartes européennes)
- Stripe génère automatiquement les reçus clients
- Les virements sont automatiques (délai configurable : quotidien, hebdomadaire)
- Déclaration du CA reçu via Stripe dans vos déclarations URSSAF

---

## PREMIÈRE ACTION À FAIRE AUJOURD'HUI

**→ Acheter le domaine ficheai.fr sur ovh.com (€12/an)**

Puis dans les 24 heures suivantes :
1. Créer un projet Supabase (region: Frankfurt EU)
2. Créer un compte Stripe
3. Récupérer une clé API Claude (console.anthropic.com)
4. Lancer `npm install && npm run dev` et générer votre première fiche de test

**Dans la semaine 1 :** Avoir le site en production sur ficheai.fr avec la génération qui fonctionne.

**Dans 30 jours :** Avoir 10 utilisateurs test satisfaits et les premiers payants.

**Dans 90 jours :** Avoir prouvé CAC < LTV et commencer à scaler la pub.

---

## NOTES DE RÉALISME

Ce business plan est basé sur des hypothèses raisonnées, pas des garanties. Les risques principaux sont :
- La qualité IA doit être validée par de vrais utilisateurs avant d'investir en pub
- Le CAC doit être prouvé en test avant de scaler
- Le churn doit rester < 5-8%/mois pour que l'économie soit saine

La réussite dépend de l'exécution, de la qualité du produit, et de votre capacité à itérer rapidement sur les feedbacks.

**Trajectoire réaliste :** €0 MRR → €1K MRR en 3-4 mois → €5K MRR en 6-9 mois → €10K+ MRR en 12 mois (scénario base, avec pub efficace et produit validé).

---

*FicheIA — Business plan et code générés le 2026-06-12*
*Stack : Next.js 14 · TypeScript · Supabase · Stripe · Claude API (Anthropic)*
