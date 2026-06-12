# Cadre légal & administratif — Micro-entrepreneur (France)

> Chiffres donnés à titre indicatif au 12/06/2026 sur la base des barèmes connus — **à re-vérifier sur urssaf.fr et impots.gouv.fr avant immatriculation/déclaration**, les seuils et taux évoluant chaque année (et la réforme du seuil unique de TVA ayant été suspendue puis rediscutée en 2025).

## 1. Régime applicable à AccessiVeille

- **Nature de l'activité** : vente d'abonnements logiciels (SaaS) = **prestation de services commerciale (BIC)**.
- **Plafond de chiffre d'affaires micro** : **77 700 €/an** (prestations de services BIC/BNC). Au-delà 2 années consécutives → sortie du régime.
- **Cotisations sociales (versement libératoire exclu)** : ~**21,2 %** du CA encaissé pour les prestations de services BIC (taux à confirmer l'année en cours), déclaration mensuelle ou trimestrielle sur autoentrepreneur.urssaf.fr.
- **Impôt sur le revenu** : abattement forfaitaire 50 % (BIC services), ou option **versement libératoire** (1,7 % du CA pour services BIC) si revenu fiscal de référence éligible.
- **CFE** : exonération l'année de création ; ensuite cotisation minimale de la commune (souvent 200–700 €/an).
- **Franchise en base de TVA** : pas de TVA facturée tant que le CA reste sous les seuils (services : seuil de base ~37 500 € / seuil majoré ~41 250 € — chiffres 2025, à vérifier). Mention obligatoire sur chaque facture : *« TVA non applicable, art. 293 B du CGI »*. **Anticiper** : au scénario optimiste, le seuil TVA est franchi avant le plafond micro → s'immatriculer à la TVA (numéro intracommunautaire), facturer 20 %, déposer CA3. Stripe Tax peut automatiser le calcul.
- **Compte bancaire dédié** : obligatoire si CA > 10 000 € deux années de suite — l'ouvrir dès le départ (Shine, Qonto, ou compte secondaire bancaire classique).
- **Assurance RC professionnelle** : non obligatoire pour cette activité mais fortement recommandée (rapports d'audit = risque de mise en cause) — ~25–40 €/mois.

## 2. Immatriculation (à faire en semaine 1 du plan 90 jours)

1. Déclaration de début d'activité sur le **guichet unique INPI** (formalites.entreprises.gouv.fr) — activité : « Édition de logiciels applicatifs / conception de solutions SaaS » (NAF probable 58.29C ou 62.01Z).
2. Obtention SIREN/SIRET (quelques jours).
3. Création du compte URSSAF auto-entrepreneur + choix périodicité de déclaration.
4. Vérifier la disponibilité de la marque **AccessiVeille** sur data.inpi.fr ; dépôt de marque optionnel (~190 €, classe 42) recommandé dès les premiers revenus.

## 3. Facturation conforme (dont réforme de la facturation électronique)

- Mentions obligatoires sur chaque facture : identité + SIREN, adresse, numéro de facture séquentiel, date, désignation précise, prix HT (= TTC en franchise), mention art. 293 B, date d'exigibilité, pénalités de retard (taux légal ×3 min.), indemnité forfaitaire de recouvrement 40 € (clients pro), mention « EI » après le nom commercial.
- **Réforme e-invoicing** : depuis le **1er septembre 2026**, toute entreprise française (micro incluse) doit être **en mesure de recevoir** des factures électroniques via une Plateforme de Dématérialisation Partenaire (PDP). L'obligation d'**émission** pour les micro/PME s'applique au **1er septembre 2027**. Action : choisir une PDP (beaucoup d'offres gratuites pour les micro — votre banque pro ou un acteur type Qonto/Pennylane en proposent) **avant le 01/09/2026**, soit dans les 3 mois.
- Les clients étant majoritairement des entreprises FR, les factures B2B devront transiter par la PDP dès l'obligation d'émission. Les factures Stripe restent le reçu de paiement ; la facture légale part de la PDP (ou d'un outil conforme connecté).

## 4. Encaissement

- **Stripe** (compte individuel micro-entrepreneur accepté) : Checkout + Customer Portal + Stripe Tax (préparer la TVA). Frais cartes UE ~1,5 % + 0,25 €.
- Virements des payouts Stripe vers le compte dédié.
- Conservation des justificatifs 10 ans (les exports Stripe + factures PDP suffisent).

## 5. RGPD — obligations de l'éditeur

- Registre des traitements : voir `registre-traitements.md`.
- Politique de confidentialité publiée : voir `politique-confidentialite.md` (intégrée au site).
- Pas de DPO obligatoire à cette échelle ; désigner néanmoins un point de contact (l'exploitant).
- Sous-traitants à lister avec DPA signés : Supabase (UE possible — choisir la région **eu-west**), Vercel/Netlify, Stripe, Resend/Brevo, Anthropic (API Claude — ne JAMAIS envoyer de données personnelles de clients dans les prompts d'analyse ; n'envoyer que du HTML public).
- Cookies : le site livré n'utilise **aucun cookie tiers** par défaut → pas de bandeau nécessaire tant qu'on n'ajoute pas d'analytics non exemptés. Si analytics : choisir un outil exempté de consentement (Matomo configuré CNIL, Plausible) pour rester sans bandeau.

## 6. Sortie du régime (anticipation)

Si MRR > ~5 000 € (≈ 60 k€/an), préparer la bascule : EI au réel (déduction des charges réelles, TVA) ou SASU (dividendes, crédibilité, levée éventuelle). Coût de bascule SASU ~500–800 € (greffe + annonces). Décision à prendre avec un expert-comptable en ligne (~80 €/mois, déductible au réel).
