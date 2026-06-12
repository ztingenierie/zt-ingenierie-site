# Déploiement complet — attriba.fr (Vercel + OVH + Stripe + Supabase)

Durée totale : ~1 h. Prérequis : un compte GitHub (ce dépôt), une carte bancaire.

## 1. Domaine (OVH, ~10 min)

1. ovh.com → Domaines → vérifier la disponibilité de `attriba.fr` (et `attriba.com`) → commander
   (~7-15 €/an). Plan B si pris : `attriba.io`, `lattributaire.fr`.
2. Ne rien configurer côté DNS pour l'instant (on revient après l'étape Vercel).

## 2. Supabase (~10 min)

1. supabase.com → New project (région **eu-west**, mot de passe fort).
2. SQL Editor → coller le contenu de `supabase/schema.sql` → Run.
3. Project Settings → API : copier `Project URL` et la clé `service_role`.

## 3. Stripe (~15 min)

1. dashboard.stripe.com → activer le compte (KYC micro-entrepreneur : SIREN, IBAN).
2. Catalogue produits → créer 2 produits :
   - « Mémoire Express — mémoire technique 48 h » : prix unique **590,00 € HT** ;
   - « Audit Flash — analyse de mémoire » : prix unique **90,00 € HT**.
   Si vous êtes en franchise de TVA : prix « hors taxe » sans TVA + mention 293 B sur les factures
   (Paramètres → Facturation). Sinon : TVA 20 % activée.
3. Copier les deux `price_xxx` (bouton ⋯ sur chaque prix) et la clé secrète `sk_live_…`
   (Développeurs → Clés API).

## 4. Vercel (~10 min)

1. vercel.com → Add New Project → importer ce dépôt GitHub → framework détecté : Next.js → Deploy.
2. Settings → Environment Variables : recopier toutes les variables de `.env.example` avec les
   vraies valeurs (SITE_URL = https://attriba.fr).
3. Settings → Domains → ajouter `attriba.fr` et `www.attriba.fr`. Vercel affiche les
   enregistrements DNS attendus.
4. Côté OVH : Zone DNS du domaine →
   - enregistrement `A` de `attriba.fr` → `76.76.21.21` ;
   - `CNAME` de `www` → `cname.vercel-dns.com.`
   Propagation : quelques minutes à quelques heures. HTTPS automatique.
5. Redéployer (Deployments → Redeploy) pour prendre en compte les variables.

> Alternative Netlify : New site from Git → build `npm run build` (plugin Next.js automatique) →
> mêmes variables d'environnement → DNS identique (apex `75.2.60.5` via ALIAS/ANAME ou serveurs
> DNS Netlify).

## 5. Tracking (~15 min)

1. tagmanager.google.com → créer le conteneur Web « attriba.fr » → copier `GTM-XXXXXXX` dans la
   variable `NEXT_PUBLIC_GTM_ID`.
2. Dans GTM : ajouter une balise Google Analytics 4 + un module de consentement (ex. template
   « Consent Mode banner ») — obligatoire RGPD avant tout cookie marketing.
3. business.facebook.com → Gestionnaire d'événements → créer un pixel → copier l'ID dans
   `NEXT_PUBLIC_META_PIXEL_ID`.
4. Événements déjà émis par le site : `begin_checkout`, `lead`, `purchase` (dataLayer) et
   `InitiateCheckout`, `Lead`, `Purchase` (Meta). Les mapper dans GTM/Meta comme conversions.

## 6. Vérifications finales

- [ ] `https://attriba.fr` s'affiche (héros + tarifs) ;
- [ ] Paiement test : passer la clé en `sk_test_…` + prix test, payer avec `4242 4242 4242 4242`,
      vérifier la redirection `/merci`, puis repasser en live ;
- [ ] Formulaire contact → ligne visible dans Supabase (Table Editor → leads) ;
- [ ] `https://attriba.fr/sitemap.xml` et `/robots.txt` répondent ;
- [ ] Google Search Console : ajouter la propriété + soumettre le sitemap ;
- [ ] Remplacer tous les `[À COMPLÉTER]` (mentions légales, CGV, confidentialité, lib/site.ts).

## Développement local

```bash
npm install
cp .env.example .env.local   # remplir les valeurs (clés test Stripe)
npm run dev                  # http://localhost:3000
```
