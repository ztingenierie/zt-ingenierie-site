# Phase 3 / Étape 9 — Cadre légal & administratif (France, 2026)

> ⚠️ Document d'orientation rédigé en juin 2026 — vérifier les seuils sur urssaf.fr et
> impots.gouv.fr au moment d'agir ; ce n'est pas un conseil juridique individualisé.

## 1. Régime micro-entrepreneur (activité : prestations de services BNC)

| Sujet | Règle (valeurs 2026 à re-vérifier) |
|---|---|
| Plafond CA | **77 700 €/an** pour les prestations de services (BNC/BIC services). Dépassement 2 ans de suite → sortie du régime |
| Cotisations sociales | ~**26,1 %** du CA encaissé (BNC), déclaration mensuelle ou trimestrielle URSSAF |
| Impôt | Abattement forfaitaire 34 % (BNC) puis barème IR, ou **versement libératoire 2,2 %** si éligible |
| TVA | Franchise en base jusqu'à **39 100 €** (services) avec seuil majoré ~41 250 € ; au-delà : facturation TVA 20 %, déclaration via impots.gouv.fr. **Attention : le scénario de base franchit ce seuil vers le mois 6-7 → anticiper le n° de TVA intracommunautaire dès le départ** |
| CFE | Exonérée l'année de création, due ensuite (selon commune) |
| Mentions activité | « Conseil et rédaction de documents de réponse aux marchés publics » — code NAF probable 70.22Z |

**Trajectoire prévue** : micro-entreprise pour démarrer (simplicité, coût ~0 €) → **bascule en
SASU au mois 8-9 du scénario de base** (avant le plafond), pour facturer en société, déduire les
charges réelles (API, pub, freelance) et préparer l'embauche. Coût de bascule ~1 000-1 500 €
(statuts + annonce légale + comptable).

## 2. Facturation conforme — réforme de la facture électronique

- **1er septembre 2026** : toute entreprise française (micro incluse) doit pouvoir **recevoir**
  des factures électroniques via une Plateforme Agréée (PA/ex-PDP) ou le circuit public.
- **1er septembre 2027** : obligation d'**émettre** en électronique pour PME et micro-entreprises.
- Action : choisir une plateforme agréée dès le lancement (les offres gratuites/low-cost pour
  micro existent chez les éditeurs de facturation) ; nos clients B2B s'attendront à des factures
  conformes (mentions : n° SIREN, TVA le cas échéant, pénalités de retard 3× taux légal,
  indemnité forfaitaire de recouvrement 40 €).
- Les clients « marchés publics » utilisent déjà **Chorus Pro** — bonne nouvelle : nous vendons à
  des entreprises privées, pas aux acheteurs publics, donc pas d'obligation Chorus pour nous.

## 3. Encaissement

- **Stripe** (intégré au site) : paiement carte des offres Mémoire Express et Audit Flash ;
  frais ~1,5 % + 0,25 € (cartes UE). Packs mensuels : Stripe Billing (abonnement) ou virement
  sur facture pour les clients réticents à la carte.
- **Compte pro** : obligatoire de fait (compte dédié exigé dès 10 k€ de CA 2 ans de suite) —
  recommandé dès le jour 1 : Shine, Qonto ou compte secondaire bancaire classique.
- CGV avec acompte/paiement à la commande pour l'unitaire (déjà rédigées — voir le site).

## 4. Documents contractuels livrés (pages du site, juridiquement structurées)

| Document | Emplacement | Points clés couverts |
|---|---|---|
| **CGV** | `/cgv` | Objet, commande en ligne, prix HT, délai 48 h ouvrées et ses conditions, retouches, obligation de moyens (pas de garantie d'attribution du marché — crucial), confidentialité, assistance IA mentionnée, droit applicable |
| **CGU** | `/cgu` | Usage du site, compte, propriété intellectuelle, responsabilité |
| **Mentions légales** | `/mentions-legales` | Éditeur, hébergeur, directeur de publication, médiation consommation (non applicable B2B mais mentionnée), contact |
| **Politique de confidentialité RGPD** | `/confidentialite` | Bases légales, données traitées (leads, clients, documents DCE), durées, sous-traitants (Vercel/Netlify, Supabase UE, Stripe, Google, Meta, API IA avec non-rétention), droits CNIL, cookies/consentement |

À personnaliser avant mise en ligne : SIREN, adresse, nom du responsable (champs balisés
`[À COMPLÉTER]` dans les pages).

## 5. Spécifique au métier

- **Pas d'activité réglementée** : la rédaction de mémoires techniques est du conseil ; aucune
  carte ou agrément requis. Ne jamais signer la candidature à la place du client (lui seul
  s'engage).
- **Confidentialité** : les DCE et pièces clients sont confidentiels → clause dans les CGV +
  chiffrement au repos (Supabase) + pas d'utilisation des données d'un client pour un concurrent
  direct sur la même consultation (**règle d'or : jamais 2 clients sur le même lot du même
  marché** — clause d'exclusivité par consultation dans les CGV).
- **Assurance RC Pro** : ~30-40 €/mois, indispensable en B2B (erreur dans un document = grief).
- **IA et transparence** : mention dans les CGV que la production est assistée par IA et validée
  humainement ; aucune donnée client utilisée pour entraîner des modèles.
