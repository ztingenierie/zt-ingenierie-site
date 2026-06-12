# Phase 2 / Étape 4 — Business plan complet

## 1. Résumé exécutif

**Attriba** rédige et livre en 48 h les mémoires techniques des TPE/PME du second œuvre BTP qui
répondent aux marchés publics, grâce à un pipeline IA propriétaire relu par un humain, à prix fixe
(590 € HT). La commande publique distribue plus de 75 Md€/an aux TPE/PME ; le mémoire technique
pèse 40 à 60 % de la note finale, et les artisans n'ont ni le temps ni la méthode pour le produire.
Les alternatives sont chères et lentes (agences : 800-2 500 €, 1-3 semaines) ou en self-service
(SaaS IA). Attriba occupe la case vide : **livrable fini, rapide, à prix affiché, spécialisé
second œuvre**. Modèle : prestation unitaire → packs mensuels récurrents → SaaS en année 2.
Objectif 12 mois (scénario de base) : **~100 k€ de CA cumulé, ~8 k€/mois en sortie d'année**,
opéré en solo avec ~25 % de charges.

## 2. Proposition de valeur (le pitch 10 secondes)

> **« Envoyez-nous le dossier de consultation. Recevez sous 48 h un mémoire technique aux couleurs
> de votre entreprise, conçu pour marquer des points sur chaque critère de la grille de notation.
> 590 €. Le prochain marché que vous gagnez le rembourse 100 fois. »**

## 3. Segments de clientèle & personas

**Segment principal** : entreprises du second œuvre de 3 à 50 salariés (électricité, CVC,
plomberie, peinture/finitions, menuiserie/agencement), CA 0,5-8 M€, répondant ou voulant répondre
aux marchés publics. **Segment secondaire** (mois 7+) : propreté, espaces verts, sécurité — mêmes
mécaniques de mémoire technique.

### Persona 1 — « Karim, 41 ans, gérant d'une entreprise d'électricité, 12 salariés (Lyon) »

- CA 1,8 M€, 80 % de chantiers privés. A répondu à 4 marchés publics en 2 ans, tout perdu.
- Sait que les marchés des lycées/mairies sont réguliers et bien payés ; soupçonne que son mémoire
  de 6 pages recopié d'un modèle est le problème (il a raison : noté 9/20 en moyenne).
- Décideur unique, lit ses mails à 6 h 30 et après 19 h, déteste les logiciels, adore déléguer.
- Déclencheur d'achat : « vous avez perdu le marché du groupe scolaire X le 12 mars — voici
  pourquoi, et voici ce qu'on aurait écrit. »

### Persona 2 — « Sylvie, 52 ans, assistante de direction d'une PME CVC, 35 salariés (Nantes) »

- C'est elle qui monte les dossiers : DC1, DC2, attestations… et le mémoire, la veille du dépôt.
- 6 à 10 réponses/an, taux de succès 1/8. Le gérant veut doubler le volume sans embaucher.
- Cherche un prestataire fiable plus qu'un prix : la promesse 48 h + interlocuteur unique la
  convainc ; le pack mensuel avec veille lui enlève aussi la corvée de surveillance du BOAMP.

## 4. Modèle économique & grille tarifaire

| Offre | Prix HT | Contenu | Marge brute estimée |
|---|---|---|---|
| **Mémoire Express** | 590 € / mémoire | Analyse DCE + mémoire technique personnalisé livré en 48 h ouvrées + 1 série de retouches | ~85 % (2-3 h opérateur + ~10 € d'API) |
| **Pack Conquête** | 1 490 € / mois | 3 mémoires/mois + veille personnalisée des consultations (codes CPV + zone) + alerte go/no-go scorée | ~80 % |
| **Pack Attributaire** | 2 990 € / mois | 8 mémoires/mois + veille + relecture des pièces administratives + débrief des notes obtenues (analyse des courriers de rejet) | ~75 % |
| **Audit Flash** (produit d'appel) | 90 € / dossier | Analyse IA d'un mémoire perdu + grille de notation reconstituée + 5 corrections prioritaires | ~90 % |
| **SaaS Attriba** (année 2) | 249 € / mois | Self-service : bibliothèque d'entreprise + génération + veille | ~93 % |

Hypothèses clés : panier d'entrée = Audit Flash ou Mémoire Express ; conversion vers pack après
2-3 mémoires unitaires ; chaque mémoire consomme 2-3 h opérateur grâce au pipeline (analyse DCE
automatisée, bibliothèque client réutilisée). Le SaaS n'est lancé qu'une fois 200+ mémoires
produits (données d'entraînement des templates par corps d'état).

## 5. Canaux d'acquisition (choisis pour CETTE niche)

1. **Outbound chirurgical via données ouvertes (canal n° 1, coût ≈ 0 €)** : les attributions DECP/
   BOAMP sont publiques. Script n8n → extraction des marchés second œuvre attribués par
   département → identification des **perdants** (candidats évincés cités ou entreprises locales du
   CPV non attributaires) → e-mail + appel : « vous avez perdu X, voici pourquoi ». Personne ne
   prospecte comme ça sur cette cible. 30 prospects ultra-qualifiés/semaine.
2. **Google Ads intention chaude (canal n° 2)** : « mémoire technique exemple », « rédaction mémoire
   technique », « aide réponse appel d'offres » — CPC estimé 1,5-4 €, budget test 600 €/mois.
   L'Audit Flash à 90 € convertit le clic en client payant immédiat.
3. **SEO programmatique (canal n° 3, fond de cale)** : 1 guide pilier + pages « mémoire technique
   [métier] » × 12 corps d'état + modèles téléchargeables contre e-mail. Les concurrents prouvent
   que ce SEO convertit.
4. **Partenariats (mois 4+)** : experts-comptables du BTP, plateformes de veille régionales,
   fédérations (CAPEB/FFB départementales — ateliers « répondre aux marchés publics »).
5. **Pas de Meta/TikTok Ads au lancement** : cible B2B âgée, intention faible — on garde le pixel
   installé pour le retargeting uniquement.

## 6. Structure de coûts (mensuelle, régime de croisière année 1)

| Poste | Coût/mois | Hypothèse |
|---|---|---|
| API IA (Claude) | 40-150 € | ~10-15 € de tokens par mémoire complet, audits inclus |
| Hébergement (Vercel/Netlify + Supabase) | 0-45 € | Plans gratuits puis Pro |
| n8n (self-host VPS) | 10 € | VPS 2 Go |
| Veille marchés (flux BOAMP/DECP) | 0 € | Données ouvertes |
| Google Ads | 600 € | Phase test, coupé ou scalé selon CAC |
| Outils (Stripe, e-mail pro, cold e-mail) | 60 € | Stripe à l'usage (1,5 % + 0,25 €), Zoho/Google, Lemlist ou équivalent |
| Comptabilité / juridique | 50 € | Lissé (micro-entreprise au début) |
| Assurance RC Pro | 35 € | Obligatoire de fait pour crédibilité B2B |
| **Total hors pub** | **~250-350 €** | |
| **Total avec pub** | **~850-950 €** | |

Cotisations sociales micro-entrepreneur : ~26,1 % du CA (BNC, prestation de services) — voir
`07-legal-administratif.md`.

## 7. Projections financières 12 mois — 3 scénarios

Hypothèses communes : démarrage commercial au mois 1 (le site et le pipeline existent — livrés
ici) ; prix moyens ci-dessus ; 100 e-mails outbound/semaine + 600 €/mois d'Ads à partir du mois 2.

### Scénario prudent (taux de réponse outbound 1 %, conversion Ads faible)

| Mois | 1 | 2 | 3 | 4 | 5 | 6 | 9 | 12 |
|---|---|---|---|---|---|---|---|---|
| Mémoires unitaires | 1 | 2 | 3 | 4 | 4 | 5 | 6 | 7 |
| Packs actifs | 0 | 0 | 0 | 1 | 1 | 2 | 3 | 4 |
| **CA (€)** | 590 | 1 180 | 1 770 | 3 850 | 3 850 | 5 930 | 8 010 | 10 090 |

CA année 1 ≈ **55 k€** · revenu net après charges/cotisations ≈ **2 800 €/mois** en sortie d'année.

### Scénario de base (taux de réponse outbound 2,5 %, Ads CAC ~120 €)

| Mois | 1 | 2 | 3 | 4 | 5 | 6 | 9 | 12 |
|---|---|---|---|---|---|---|---|---|
| Mémoires unitaires | 2 | 4 | 6 | 7 | 8 | 8 | 10 | 10 |
| Packs actifs | 0 | 1 | 1 | 2 | 3 | 4 | 6 | 8 |
| **CA (€)** | 1 180 | 3 850 | 5 030 | 7 110 | 9 190 | 10 680 | 14 840 | 17 820* |

\* mix 6 × Conquête + 2 × Attributaire. CA année 1 ≈ **100 k€** · revenu net ≈ **6 000-7 000 €/mois**
en sortie d'année. **Le plafond micro-entreprise (77 700 €) est dépassé en cours d'année → passage
en EI au réel ou SASU prévu au mois 8-9 (anticipé dans le plan légal).**

### Scénario optimiste (outbound 4 %, SEO décolle, 1 partenariat fédération)

CA mois 12 ≈ **28 k€/mois** (12 packs + 12 unitaires), CA année 1 ≈ **160 k€**. Limite : le temps
opérateur — déclenche l'embauche d'un rédacteur freelance (coût ~150 €/mémoire, marge préservée)
et accélère le SaaS.

**Honnêteté sur les délais** : les 2 premiers mois servent à constituer la bibliothèque de
templates et les 5 premières références (éventuellement à prix cassé : 290 €). Le revenu sérieux
(> 5 k€/mois) arrive entre le mois 5 et le mois 8 selon le scénario. Personne ne gagne 10 k€ le
premier mois.

## 8. Risques & mitigations

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Les SaaS IA généralistes descendent sur la cible TPE | Haute | Moyen | Vitesse + marque verticale + done-for-you (ils sont structurellement self-service) ; bibliothèque par corps d'état = switching cost |
| Qualité IA insuffisante → mémoire rejeté/banal | Moyenne | Haut | Relecture humaine systématique, garantie retouches, templates validés par corps d'état, jamais de envoi direct sans contrôle |
| Dépendance au temps opérateur (maladie, vacances) | Moyenne | Haut | Pipeline documenté, freelance de secours identifié dès le mois 4, packs avec délais contractuels en jours ouvrés |
| Saisonnalité de la commande publique (creux été/élections) | Haute | Moyen | Packs mensuels lissés, segment privé (réponses aux consultations privées) en appoint |
| Plafond micro-entreprise / TVA | Certaine si succès | Faible | Bascule SASU planifiée mois 8-9, TVA facturée dès le seuil (39 100 €) — voir doc légal |
| Confidentialité des données clients (DCE, références) | Faible | Haut | Supabase UE, pas d'entraînement sur données clients, clause RGPD, API IA avec opt-out de rétention |
| Réglementation IA (transparence) | Faible | Faible | Le livrable est relu/validé humainement ; mention de l'assistance IA dans les CGV |
