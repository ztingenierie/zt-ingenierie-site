# PLAN D'EXÉCUTION 90 JOURS — FicheIA
## Semaine par semaine · Checklist de lancement · KPIs

---

## VUE D'ENSEMBLE

| Phase | Durée | Objectif principal |
|-------|-------|-------------------|
| **Phase 1 — Build** | Semaines 1-4 | Produit fonctionnel + infra + base légale |
| **Phase 2 — Validation** | Semaines 5-6 | 10 premiers utilisateurs, preuve de valeur |
| **Phase 3 — Lancement** | Semaines 7-8 | Product Hunt, premier budget pub, SEO |
| **Phase 4 — Optimisation** | Semaines 9-12 | CAC < LTV prouvé, premiers payants, scale |

---

## PHASE 1 — BUILD (Semaines 1-4)

### Semaine 1 — Infrastructure et compte

- [ ] Acheter domaine ficheai.fr (OVH, ~€12/an)
- [ ] Créer projet Supabase EU (Frankfurt) → activer Auth email
- [ ] Créer compte Stripe → mode test → configurer produits et prix
- [ ] Déployer le projet Next.js sur Vercel (plan gratuit pour commencer)
- [ ] Configurer le domaine OVH → Vercel (DNS)
- [ ] Créer compte Anthropic → récupérer clé API Claude
- [ ] Mettre à jour le fichier `.env` avec toutes les vraies variables
- [ ] Tester la génération locale : `npm run dev` → générer une fiche de test

**SQL Supabase à exécuter (copier dans l'éditeur SQL) :**
```sql
-- Créer les tables
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

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users view own generations" ON generations FOR SELECT USING (auth.uid() = user_id);

-- Reset mensuel des quotas (à configurer via cron Supabase)
-- Supabase → Database → pg_cron (activer l'extension)
SELECT cron.schedule('reset-monthly-quotas', '0 0 1 * *',
  'UPDATE profiles SET fiches_used_this_month = 0 WHERE plan != ''free'''
);

-- Fonction pour créer le profil automatiquement à l'inscription
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

### Semaine 2 — Produit MVP

- [ ] Intégrer Supabase Auth dans l'app (magic link + email/password)
- [ ] Tester le webhook Stripe en local (stripe CLI : `stripe listen --forward-to localhost:3000/api/stripe/webhook`)
- [ ] Tester le checkout Stripe en mode test (carte 4242 4242 4242 4242)
- [ ] Vérifier que la mise à jour du plan se fait bien en base après paiement
- [ ] Tester la génération batch de 10 produits (importer le CSV exemple)
- [ ] Tester l'export CSV et vérifier qu'il s'importe dans Shopify
- [ ] Ajouter la page d'authentification (Supabase UI ou custom)
- [ ] Configurer les emails transactionnels (Supabase → SMTP ou Resend)

### Semaine 3 — Polissage et conformité

- [ ] Remplir les mentions légales (votre nom/adresse réelle dans `/legal/`)
- [ ] Publier CGV, CGU, politique RGPD sur le site (pages statiques)
- [ ] Créer le sitemap.xml dynamique (Next.js `app/sitemap.ts`)
- [ ] Ajouter le bandeau cookie RGPD (orejime ou tarteaucitron.js)
- [ ] Configurer le Meta Pixel (obtenir l'ID dans Facebook Business Manager)
- [ ] Configurer Google Analytics 4 (obtenir le Measurement ID)
- [ ] Tester le parcours complet : inscription → génération → checkout → dashboard
- [ ] Corriger tous les bugs identifiés

### Semaine 4 — Pré-lancement

- [ ] Déployer en production sur Vercel (passer en mode Stripe live)
- [ ] Configurer les variables d'environnement de production sur Vercel
- [ ] Tester le parcours complet en production (avec une vraie CB)
- [ ] Configurer le webhook Stripe en production (URL production)
- [ ] Créer 5 exemples de fiches générées (pour les créas pub et le site)
- [ ] Écrire le premier article de blog SEO
- [ ] Soumettre le sitemap à Google Search Console
- [ ] Lister FicheIA sur There's An AI For That et Futurepedia
- [ ] Préparer les créas pub Meta (voir marketing-plan.md)

---

## PHASE 2 — VALIDATION (Semaines 5-6)

### Semaine 5 — 10 premiers utilisateurs

- [ ] Partager FicheIA dans 3-5 groupes Facebook "Shopify France" et "E-commerce FR"
- [ ] Poster sur Reddit r/france_ecommerce (si pertinent)
- [ ] Partager sur LinkedIn (post personnel sur le lancement)
- [ ] Inviter 5-10 e-commerçants de votre réseau à tester gratuitement
- [ ] Activer les 10 fiches gratuites pour chaque testeur
- [ ] Recueillir des feedbacks (formulaire Tally ou Typeform)
- [ ] Identifier les 3 points de friction principaux dans l'UX

### Semaine 6 — Itération

- [ ] Corriger les 3 points de friction identifiés
- [ ] Améliorer les prompts IA si la qualité est insuffisante
- [ ] Obtenir au moins 1 témoignage utilisateur exploitable
- [ ] Mesurer le taux d'activation (% qui génèrent ≥1 fiche)
- [ ] Mesurer le taux de satisfaction (NPS ou 1-5 étoiles)
- [ ] Décider : lancer la pub maintenant ou attendre 1 semaine de plus ?

**Go/No-Go pub :**
- ✅ Lancer si : taux activation > 60%, qualité notée ≥ 4/5
- ⏸ Attendre si : qualité jugée insuffisante par > 30% des testeurs

---

## PHASE 3 — LANCEMENT (Semaines 7-8)

### Semaine 7 — Lancement public

- [ ] **Soumettre Product Hunt** (planifier un lundi ou mardi à 12h01 CET)
- [ ] **Lancer Meta Ads** : budget €50 test × 3 créas (€150 total)
- [ ] **Lancer Google Ads** : budget €100 → mots-clés intent fort
- [ ] Publier le 2ème article de blog
- [ ] Lister sur Capterra FR et GetApp
- [ ] Envoyer un email de lancement à vos contacts (réseau perso)
- [ ] Configurer les alertes Supabase (nouveaux inscrits → notification)

### Semaine 8 — Analyse et ajustements

- [ ] Analyser les résultats pub : quel créa performe le mieux ?
- [ ] Calculer le CAC réel (coût total pub / nombre de clients payants)
- [ ] Mesurer le taux trial → payant (objectif > 12%)
- [ ] Désactiver les créas qui ne convertissent pas (CTR < 1% ou CAC > €50)
- [ ] Doubler le budget sur la meilleure créa si CAC < €30
- [ ] Publier le 3ème article de blog
- [ ] Répondre à tous les commentaires Product Hunt

---

## PHASE 4 — OPTIMISATION (Semaines 9-12)

### Semaine 9-10 — Scale prudent

- [ ] Analyser cohortes : quels utilisateurs convertissent le mieux ? (secteur, taille catalogue)
- [ ] Ajuster le ciblage Meta/Google en conséquence
- [ ] Si CAC < €25 : doubler le budget pub
- [ ] Créer 2 nouvelles créas sur la base des performances
- [ ] Configurer le programme d'affiliation (Rewardful ou FirstPromoter)
- [ ] Contacter 5 bloggers e-commerce FR pour partenariat affiliation
- [ ] Publier articles 4 et 5 du blog
- [ ] Développer le connecteur Shopify API (plan Pro)

### Semaine 11-12 — Rétention et expansion

- [ ] Configurer la séquence email d'onboarding (7 emails automatisés)
- [ ] Analyser le churn (pourquoi les gens résilient ?)
- [ ] Implémenter 2-3 améliorations pour réduire le churn
- [ ] Lancer le referral programme (1 mois gratuit par filleul)
- [ ] Publier articles 6, 7, 8 du blog
- [ ] Atteindre > 50 avis positifs sur Product Hunt / Capterra
- [ ] Préparer le bilan mois 3 et décider du budget mois 4

---

## CHECKLIST "PRÊT À LANCER" (avant la première pub payante)

### Technique ✅
- [ ] Site accessible en production (ficheai.fr)
- [ ] SSL actif (HTTPS)
- [ ] Parcours inscription → génération → paiement testé et fonctionnel
- [ ] Webhook Stripe configuré en production
- [ ] Emails transactionnels opérationnels (inscription, paiement, quota dépassé)
- [ ] Meta Pixel installé et vérifié (Facebook Pixel Helper)
- [ ] Google Analytics 4 installé et vérifié

### Légal ✅
- [ ] Mentions légales publiées (votre nom/adresse réelle)
- [ ] CGV publiées avec prix et conditions claires
- [ ] CGU publiées
- [ ] Politique RGPD publiée
- [ ] Bandeau cookie RGPD fonctionnel (opt-in avant tracking)
- [ ] Factures Stripe configurées en français avec TVA

### Produit ✅
- [ ] 10 fiches gratuites accessibles sans CB
- [ ] Qualité des fiches validée par au moins 5 utilisateurs réels
- [ ] Export CSV fonctionnel et compatible Shopify
- [ ] Dashboard de quota visible (X fiches restantes ce mois)
- [ ] Message d'upgrade clair quand quota atteint

### Marketing ✅
- [ ] Landing page optimisée (titre, PVU, CTA, témoignages)
- [ ] Au moins 1 témoignage réel (même si de votre réseau proche)
- [ ] 3 créas pub prêtes (texte + visuel)
- [ ] Budget test disponible (€300-500)
- [ ] Comptes Meta Ads et Google Ads créés et vérifiés

---

## KPIs SEMAINE PAR SEMAINE

| Semaine | Mesure | Cible | Action si raté |
|---------|--------|-------|----------------|
| 5-6 | Nb utilisateurs test | 10 | Contacter réseau direct |
| 5-6 | Taux activation | > 60% | Améliorer l'onboarding |
| 7-8 | CTR Meta Ads | > 2% | Changer les créas |
| 7-8 | Taux inscription/clic | > 4% | Optimiser la landing |
| 7-8 | CAC | < €30 | Ajuster ciblage ou landing |
| 9-10 | Taux trial → payant | > 12% | Améliorer séquence email |
| 9-10 | Churn mensuel | < 8% | Améliorer l'onboarding |
| 11-12 | MRR | > €1 000 | Augmenter budget pub |
| 11-12 | LTV/CAC | > 3 | Réduire CAC ou augmenter LTV |

---

## PREMIÈRE ACTION AUJOURD'HUI

**→ Acheter le domaine ficheai.fr sur OVH.com (€12/an)**

Ensuite dans les 24h :
1. Créer le projet Supabase (supabase.com → New project → Region: Frankfurt)
2. Créer le compte Stripe (stripe.com → activer les paiements FR)
3. Lancer `npm install` dans le dossier `/ficheIA`
4. Copier `.env.example` → `.env.local` et renseigner les clés
5. `npm run dev` → tester la génération locale

**Objectif semaine 1 :** Avoir une version qui tourne en local avec vraies clés API.
