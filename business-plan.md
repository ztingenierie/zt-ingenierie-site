# Business Plan — AccessiVeille

> SaaS français de pré-audit et de veille de conformité en accessibilité numérique (RGAA / European Accessibility Act) pour agences web, PME e-commerce et organismes publics.
>
> Document établi le 12 juin 2026. Toutes les hypothèses chiffrées sont explicites et signalées par « Hyp. ».

---

## Étape 0 — Cadre de décision (6 critères, notés /10)

| # | Critère | Définition |
|---|---------|------------|
| 1 | Taille du marché FR | Nombre d'acheteurs potentiels × panier annuel réaliste |
| 2 | Intensité du problème | Douleur réelle : risque légal, perte d'argent, obligation datée |
| 3 | Volonté de payer | Existence d'un budget déjà alloué ou d'une sanction évitée |
| 4 | Rareté / faible concurrence | Peu d'acteurs FR positionnés, pas de géant gratuit |
| 5 | Faisabilité solo + faceless | Livrable par 1 dev full-stack, sans visage ni terrain |
| 6 | Vitesse de monétisation | Délai réaliste jusqu'aux premiers euros récurrents |

---

## Étape 1 — Les 6 idées candidates

### Idée A — Veille de conformité accessibilité numérique (RGAA / EAA)
- **Problème** : depuis le 28 juin 2025, l'European Accessibility Act (transposé en droit français) impose l'accessibilité numérique aux e-commerçants et services en ligne dépassant 10 salariés **ou** 2 M€ de CA. La DGCCRF contrôle et sanctionne (contraventions de 5e classe de 7 500 € **cumulables par infraction constatée** ; jusqu'à 50 000 € par service pour le périmètre RGAA public/grandes entreprises). 95 %+ des sites concernés ne sont pas conformes et leurs dirigeants ne savent même pas par où commencer.
- **Cible** : agences web françaises (qui doivent répondre à leurs clients), PME e-commerce assujetties, collectivités.
- **Pourquoi c'est rare en France** : l'offre actuelle est soit des **agences d'audit manuel** (3 000–15 000 € l'audit : Access42, Temesis, Aksé…), soit l'outil public gratuit **Ara** (manuel, expert, 106 critères), soit des entrants très récents (Conformi). Quasi aucune offre self-serve à < 100 €/mois avec **suivi continu** + génération de la déclaration d'accessibilité. Les overlays américains (accessiBe, UserWay) sont publiquement discrédités et non conformes RGAA — c'est un repoussoir, pas un concurrent.
- **Monétisation** : abonnement mensuel (veille + alertes + rapports) + pack one-shot « déclaration d'accessibilité ».

### Idée B — Préparation à la facturation électronique pour TPE/micro
- **Problème** : obligation de réception au 1er sept. 2026, émission 2027 pour les PME/micro. Douleur maximale… 
- **Pourquoi écartée a priori** : marché déjà attaqué frontalement par des acteurs énormes et souvent gratuits (banques, Qonto, experts-comptables, PDP subventionnées). Critère 4 effondré.

### Idée C — Générateur/teneur de DUERP pour TPE (document unique sécurité)
- **Problème** : obligatoire dès 1 salarié, majoritairement ignoré, amende 1 500 €/3 000 €.
- **Pourquoi écartée a priori** : l'INRS offre **OiRA**, gratuit et sectoriel ; les branches professionnelles poussent leurs propres outils gratuits. Volonté de payer faible face au gratuit public.

### Idée D — Registre de sécurité numérique pour petits ERP (salles de sport, commerces)
- **Problème** : registre de sécurité obligatoire, tenu papier, perdu, non à jour lors des commissions de sécurité.
- **Limites** : douleur épisodique (contrôle tous les 3–5 ans), cycle de vente nécessitant souvent du relationnel local, acteurs BTP déjà présents (BatiRegistre…). Critères 2 et 6 moyens.

### Idée E — Suite de gestion pour syndics bénévoles de petites copropriétés
- **Problème** : ~100 000 petites copros autogérées, obligations (immatriculation, AG, comptabilité) mal tenues.
- **Limites** : Matera et Cotoit ont éduqué puis verrouillé le marché avec des moyens levés en dizaines de M€ ; cycle de décision collectif (AG) = lent. Critères 4 et 6 faibles.

### Idée F — Veille automatisée d'appels d'offres ultra-niche par métier (ex. paysagistes, géomètres)
- **Problème** : le BOAMP/AWS sont illisibles pour les TPE ; les plateformes existantes (Vecteur Plus, France Marchés) sont chères et généralistes.
- **Limites** : concurrence réelle bien installée, différenciation = seulement le filtrage fin ; churn élevé si l'utilisateur ne gagne pas de marché. Critères 4 et 3 moyens.

---

## Étape 2 — Scoring et sélection

| Critère (/10) | A. AccessiVeille | B. Fact. élec. | C. DUERP | D. Registre ERP | E. Syndic bénévole | F. Veille AO |
|---|---|---|---|---|---|---|
| 1. Taille marché FR | 8 | 10 | 8 | 5 | 5 | 6 |
| 2. Intensité du problème | 9 | 9 | 6 | 5 | 6 | 6 |
| 3. Volonté de payer | 7 | 6 | 4 | 5 | 6 | 6 |
| 4. Rareté / concurrence | 7 | 2 | 4 | 6 | 3 | 4 |
| 5. Faisabilité solo faceless | 9 | 5 | 8 | 7 | 5 | 8 |
| 6. Vitesse de monétisation | 7 | 4 | 5 | 4 | 3 | 6 |
| **Total /60** | **47** | 36 | 35 | 32 | 28 | 36 |

**Idée retenue : A — AccessiVeille.**

Justification :
1. **Fenêtre réglementaire ouverte maintenant** : l'EAA s'applique depuis juin 2025, les contrôles DGCCRF ont commencé, et le RGAA 5 est annoncé pour fin 2026 — chaque évolution réglementaire relance la demande. C'est un marché tiré par la loi, pas par la mode.
2. **Adéquation parfaite au profil** : moteur de scan = Next.js/TypeScript + parsing HTML + règles automatisables ; IA (API Claude) pour expliquer chaque non-conformité en français actionnable ; n8n pour les scans récurrents et les alertes. Zéro visage, zéro terrain.
3. **Trou de marché identifiable** : entre l'audit d'agence à 5 000 € et l'outil expert gratuit Ara, il manque l'offre self-serve récurrente à 39–249 €/mois pour les agences et PME. Le concurrent le plus proche (Conformi) valide la demande sans saturer le marché : des millions de sites sont concernés.
4. **Honnêteté sur la limite** : un scan automatique ne couvre qu'environ **25–30 % des 106 critères RGAA**. On ne vendra JAMAIS « conformité garantie » — on vend un **pré-audit, un plan d'action, une veille anti-régression et les livrables documentaires obligatoires**. Cette honnêteté est précisément le positionnement (contre les overlays mensongers).

---

## Étape 3 — Validation marché (France)

### 3.1 TAM / SAM / SOM

| Niveau | Calcul | Montant |
|---|---|---|
| **TAM** | (Hyp. 20 000 agences web/digitales FR × 1 188 €/an panier Agence moyen) + (Hyp. 30 000 PME e-commerce assujetties EAA × 588 €/an) + (Hyp. 10 000 organismes publics équipables × 588 €/an) | **≈ 47 M€/an** |
| **SAM** | Part joignable en self-serve par SEO/cold email/outil gratuit, sans force de vente (Hyp. 10 % du TAM) | **≈ 4,7 M€/an** |
| **SOM 12 mois** | Hyp. : trafic SEO+outil gratuit+cold email → 35–80 clients payants fin M12 (voir projections) | **15 000 – 50 000 € ARR** |

Hypothèses sources : ~20 000 agences = ordre de grandeur des codes NAF 6201Z/7311Z actifs avec salariés ; ~200 000 sites marchands actifs en France (FEVAD), dont Hyp. 15 % dépassent les seuils EAA (10 salariés ou 2 M€ CA) ≈ 30 000. **À re-vérifier avec les données INSEE/FEVAD à jour avant toute dépense publicitaire.**

### 3.2 Concurrents / substituts FR et le trou à occuper

| Acteur | Offre | Ce qui lui manque (mon trou) |
|---|---|---|
| **Ara** (DINUM, gratuit) | Outil public d'audit manuel des 106 critères | Réservé aux experts formés ; aucun scan automatique, aucune veille, aucune alerte ; inutilisable par une agence non formée |
| **Agences d'audit** (Access42, Temesis, Aksé, Ideance…) | Audit manuel complet 3 000–15 000 € | Prix inaccessible aux TPE/PME ; photo à l'instant T, aucune surveillance continue ; délais de plusieurs semaines |
| **Conformi** | Audit RGAA automatisé + monitoring (entrant récent) | Positionné propriétaire de site ; pas (encore) d'offre white-label multi-sites pensée pour les **agences** ; marché assez grand pour 2+ acteurs |
| **Tanaguru / Asqatasun** (open source FR) | Moteurs d'audit historiques | Interfaces vieillissantes, orientées experts, pas de SaaS self-serve moderne ni de livrables légaux générés |
| **Overlays US** (accessiBe, UserWay) | Widget « magique » | Publiquement non conformes RGAA, dénoncés par la communauté accessibilité — un anti-modèle qui crédibilise mon discours honnête |

**Le trou** : l'offre **multi-sites white-label pour agences web** + génération automatique des livrables obligatoires (déclaration d'accessibilité, schéma pluriannuel) + explications de correction en français générées par IA, à un prix self-serve.

### 3.3 Preuves de demande (signaux concrets)

1. **Réglementation datée et sanctionnée** : EAA applicable depuis le 28 juin 2025 ([economie.gouv.fr/DGCCRF](https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/professionnels-vos-produits-et-services-doivent-etre-conformes-la-directive-accessibilite)) ; contrôles DGCCRF démarrés dès l'entrée en vigueur, notamment sur signalement ([francenum.gouv.fr](https://www.francenum.gouv.fr/guides-et-conseils/developpement-commercial/site-e-commerce/accessibilite-des-sites-de-e-commerce)) ; la FEVAD elle-même a alerté ses adhérents e-commerçants ([fevad.com](https://www.fevad.com/e-commerce-et-accessibilite-numerique-ce-qui-change-a-partir-de-juin-2025/)).
2. **Sanctions réelles** : contraventions de 5e classe (7 500 €) **cumulables par infraction**, astreintes, et jusqu'à 50 000 € par service sur le périmètre RGAA, renouvelables tous les 6 mois ([rgaa-consulting.com](https://rgaa-consulting.com/blog/amendes-rgaa-2026-sanctions-et-conformite), [rgaaudit.fr](https://rgaaudit.fr/blog/obligation-accessibilite-numerique-2026)).
3. **Apparition de concurrents récents** (Conformi, RGAA Checker, rgaa-ia.fr) : un marché où des entrants se créent en 2025–2026 est un marché qui chauffe, pas un marché mort.
4. **RGAA 5 annoncé fin 2026** ([blogdumoderateur.com](https://www.blogdumoderateur.com/accessibilite-web-2025-rgaa-nouvelles-regles/)) : chaque évolution du référentiel rend la veille continue plus précieuse qu'un audit ponctuel.
5. **Douleur exprimée** : les fils Reddit r/webdev FR, forums WordPress/Shopify FR et newsletters d'agences regorgent de questions « mon client me demande la conformité RGAA, je réponds quoi ? ». (Hyp. qualitative — à documenter en continu pendant la phase SEO.)

### 3.4 Prix acceptable + benchmark

| Référence | Prix constaté |
|---|---|
| Audit RGAA manuel agence | 3 000 – 15 000 € one-shot |
| Outils monitoring internationaux (Silktide, Siteimprove, axe Monitor) | 200 – 1 000+ €/mois, vente enterprise, en anglais, non mappés RGAA |
| Pope Tech, Monsido (US) | ~100–300 $/mois |
| Conformi (FR) | self-serve, ordre de grandeur < 100 €/mois |

→ Zone de prix validée pour du self-serve FR : **29–99 €/mois par site, 249 €/mois multi-sites agence**, pack documentaire one-shot **290–490 €**. C'est 10× moins cher qu'un audit d'agence pour 80 % du besoin courant (pré-audit + veille + livrables).

---

## Étape 4 — Business plan

### 4.1 Résumé exécutif

AccessiVeille est un SaaS 100 % self-serve qui scanne automatiquement les sites web selon les critères automatisables du RGAA, génère un score, un plan d'action expliqué en français (IA Claude), produit les livrables légaux obligatoires (déclaration d'accessibilité, schéma pluriannuel) et surveille en continu les régressions avec alertes e-mail. Cible primaire : les agences web françaises (offre white-label multi-sites) ; cible secondaire : PME e-commerce assujetties à l'EAA. Opéré en solo, sans visage, sans prospection physique, par un micro-entrepreneur développeur full-stack. Objectif honnête à 12 mois : 1 500 – 5 000 € de MRR selon scénario.

### 4.2 Proposition de valeur unique

> « Sachez en 2 minutes où vous en êtes face à la loi accessibilité, obtenez vos documents obligatoires en 1 heure, et soyez alerté avant que la DGCCRF ne vous le dise. Sans audit à 5 000 €, sans widget mensonger. »

Différenciateurs : (1) honnêteté méthodologique affichée (couverture ~30 % automatisable, jamais de « conformité garantie ») ; (2) white-label agences ; (3) livrables légaux générés ; (4) explications de correction en français, par et pour des devs.

### 4.3 Segments & personas

- **Persona 1 — Claire, 38 ans, dirigeante d'agence web (8 salariés, Nantes).** Trois clients lui ont demandé « on est conformes RGAA ? ». Aucun expert accessibilité en interne, pas question de payer 5 000 €/client en sous-traitance. Veut : un rapport white-label crédible par client, une veille, et revendre la prestation avec marge. Budget : 249 €/mois si ça lui fait gagner 10× en prestations revendues.
- **Persona 2 — Mehdi, 45 ans, responsable e-commerce d'une PME textile (60 salariés, 8 M€ CA).** A reçu la newsletter FEVAD sur l'EAA, a paniqué, a demandé un devis d'audit : 9 000 €. Veut : savoir si le risque est réel, prioriser, produire la déclaration d'accessibilité. Budget : 39–99 €/mois sans demander à la direction.
- **Persona 3 — Sandrine, DGS d'une commune de 12 000 habitants.** Obligation RGAA historique jamais traitée, l'opposition municipale a signalé le site. Cycle plus lent (marchés publics) — cible secondaire via le pack one-shot.

### 4.4 Modèle économique & grille tarifaire

| Offre | Prix | Contenu |
|---|---|---|
| **Scan découverte** | 0 € | Mini-audit automatique d'une page, score + 5 problèmes principaux — lead magnet |
| **Essentiel** | 39 €/mois | 1 site, scan hebdomadaire complet, alertes régression, rapport PDF mensuel |
| **Pro** | 99 €/mois | 3 sites, scans quotidiens, générateur de déclaration d'accessibilité + schéma pluriannuel, plan d'action IA priorisé |
| **Agence** | 249 €/mois | 15 sites, rapports white-label (logo de l'agence), export client, accès API |
| **Pack Déclaration** | 390 € one-shot | Pré-audit + déclaration d'accessibilité + plan d'action — porte d'entrée des hésitants, upsell vers l'abonnement |

Facturation mensuelle sans engagement (réduit la friction d'achat solo) ; -2 mois si paiement annuel. Pas de TVA facturée tant que la franchise en base s'applique (voir legal/).

### 4.5 Canaux d'acquisition (100 % faceless)

1. **Outil gratuit + SEO** (canal n°1) : le scan découverte est la page d'atterrissage de requêtes à forte intention (« audit accessibilité site web gratuit », « déclaration d'accessibilité obligatoire »). Contenu écrit expert (voir marketing-plan.md).
2. **Cold email B2B conforme** vers les agences web (personne morale, sollicitation professionnelle en rapport avec la fonction : licite avec opt-out — modèles fournis).
3. **SEA de test** : Google Ads sur 10–15 requêtes réglementaires exactes, budget test 300 €/mois à partir de M2.
4. **Partenariats** : intégrateurs/thèmes WordPress & Shopify FR, syndicats pro (CINOV Numérique...), newsletters dev FR (sponsoring).
5. **Communautés écrites** : réponses utiles (non spammy) sur forums WordPress FR, Reddit, LinkedIn page entreprise (sans visage).

### 4.6 Structure de coûts (mensuelle, régime de croisière an 1)

| Poste | Coût |
|---|---|
| Domaine .fr (OVH) | ~8 €/an |
| Vercel/Netlify (Pro si besoin) | 0 → 20 €/mois |
| Supabase | 0 → 25 €/mois |
| API Claude (explications IA) | Hyp. 20–60 €/mois (≈0,10–0,30 €/rapport) |
| n8n (auto-hébergé VPS OVH) | 7 €/mois |
| E-mail transactionnel (Resend/Brevo) | 0 → 20 €/mois |
| Stripe | 1,5 % + 0,25 €/transaction (cartes UE) |
| Google Ads (test, M2+) | 300 €/mois (optionnel, coupable) |
| Assurance RC pro | ~30 €/mois |
| **Total hors pub** | **≈ 80–170 €/mois** |

### 4.7 Projections financières 12 mois — 3 scénarios

Hypothèses communes : panier moyen abonnement 70 €/mois (mix Essentiel/Pro/Agence) ; churn mensuel 3,5 % ; conversion visiteur→scan gratuit 8 % ; scan gratuit→payant 4 % (prudent) à 8 % (optimiste) ; lancement commercial réel à M3 (M1–M2 = construction + SEO).

| | Prudent | Base | Optimiste |
|---|---|---|---|
| Trafic SEO+ads M12 (visites/mois) | 1 500 | 4 000 | 9 000 |
| Nouveaux abonnés/mois à M12 | 2–3 | 6–8 | 14–18 |
| **Abonnés actifs fin M12** | **12** | **35** | **80** |
| **MRR fin M12** | **≈ 850 €** | **≈ 2 450 €** | **≈ 5 600 €** |
| Packs one-shot vendus (an 1) | 4 (1 560 €) | 12 (4 680 €) | 30 (11 700 €) |
| **CA total an 1** | **≈ 6 000 €** | **≈ 18 000 €** | **≈ 45 000 €** |
| Coûts an 1 (hors temps) | ≈ 1 500 € | ≈ 3 500 € (ads dès M3) | ≈ 6 500 € |

**Lecture honnête** : ce business ne rapporte PAS « beaucoup d'argent en quelques mois ». L'an 1 paie à peine un SMIC partiel dans le scénario de base. La valeur est dans l'actif récurrent : à churn 3,5 % et acquisition constante, le scénario de base atteint ~5 000–7 000 € MRR à M24, avec un produit qui tourne sans présence physique. C'est la trajectoire réaliste d'un SaaS solo bootstrappé en France — quiconque promet mieux ment.

### 4.8 Risques & parades

| Risque | Probabilité | Parade |
|---|---|---|
| Concurrent (Conformi…) prend le marché agences avant moi | Moyenne | Vitesse : MVP en 4 semaines, focus exclusif white-label agences (ils sont sur les propriétaires de sites) |
| Reproche « scan automatique ≠ conformité » | Certaine | L'assumer frontalement dans le marketing : c'est l'argument central contre les overlays ; partenariat de sous-traitance avec un auditeur certifié pour l'audit complet (apport d'affaires) |
| RGAA 5 fin 2026 casse le mapping des règles | Haute | Architecture : règles versionnées en data, pas en dur ; la migration devient un argument commercial (« on a déjà migré pour vous ») |
| Google/Axe sort un outil gratuit grand public | Faible-moyenne | Axe existe déjà (anglais, dev-only) ; ma valeur = RGAA FR + livrables légaux + white-label, pas le scan brut |
| Dépassement des seuils micro-entreprise | Faible an 1 | Bon problème ; bascule EI au réel ou SASU préparée (voir legal/) |
| Mises en demeure abusives / responsabilité sur les rapports | Moyenne | CGV : obligation de moyens, exclusion explicite de garantie de conformité ; RC pro souscrite |

---

## Étape 5 — Identité de marque

- **Nom : AccessiVeille** — explicite (accessibilité + veille), français, prononçable, SEO-friendly.
  - Domaines : `accessiveille.fr` (principal) et `accessiveille.com` — **Hyp. : libres au 12/06/2026, à vérifier immédiatement sur OVH + recherche INPI avant tout achat** (première action du plan 90 jours). Fallbacks : `accessi-veille.fr`, `veille-accessibilite.fr`.
- **Tagline** : « Votre site accessible. Et qui le reste. »
- **Positionnement** : l'anti-overlay — la vigie honnête de l'accessibilité numérique française. On ne promet pas la conformité magique ; on donne la visibilité, les documents obligatoires et l'alerte avant le contrôle.
- **Ton** : expert mais clair, factuel, jamais culpabilisant ni anxiogène gratuit ; on cite les textes, on chiffre, on explique.
- **Palette (elle-même conforme AA — on mange notre propre cuisine)** :
  - Encre `#0B1220` (texte), Blanc `#FFFFFF` (fond)
  - Bleu primaire `#1D4ED8` (contraste 6,3:1 sur blanc)
  - Ambre accent `#B45309` (contraste 4,8:1 sur blanc)
  - Gris ardoise `#475569` (texte secondaire, 7,5:1)
- **Logo** : un œil stylisé dont la pupille est une coche — la vigie qui valide. Livré en SVG dans `site/components/Logo.tsx`.

---

## Étape 6 — Produit

### 6.1 Spécifications fonctionnelles (cible v1.0)

1. **Scan automatique** : crawl d'un site (jusqu'à N pages selon plan), exécution des règles automatisables mappées RGAA (images sans alternative, langue du document, titres, intitulés de formulaires, contrastes, liens vides, iframes sans titre, etc. — via axe-core + règles maison), score pondéré, historique.
2. **Plan d'action IA** : pour chaque non-conformité, explication en français + extrait de code fautif + correction proposée (API Claude, prompt versionné).
3. **Livrables légaux** : générateur de déclaration d'accessibilité (modèle officiel) et de schéma pluriannuel pré-rempli.
4. **Veille** : scans planifiés (n8n cron), diff entre scans, alerte e-mail en cas de régression ou de nouvelle obligation réglementaire (flux d'actualité réglementaire éditorialisé).
5. **White-label (plan Agence)** : logo/couleurs de l'agence sur les rapports PDF et les pages de partage client.
6. **Compte & facturation** : auth Supabase (magic link), abonnements Stripe (Checkout + Customer Portal), factures conformes.

### 6.2 Parcours utilisateur

`Visiteur → colle son URL sur la home → reçoit score + 5 problèmes (e-mail requis) → e-mail automatique J+0 avec rapport, J+2 cas client, J+5 offre Pack Déclaration → achète (Stripe Checkout) → onboarding self-serve (ajout du site, 1er scan complet) → reçoit alertes → reste abonné (la veille est le produit, pas le scan).`

### 6.3 MVP réellement livrable (ce qui est dans ce repo)

- Site vitrine de conversion complet (Next.js + TS + Tailwind) ;
- **Mini-scan fonctionnel** d'une page (vérifications HTML statiques mappées RGAA : alt, lang, title, hiérarchie de titres, labels, liens vides, etc.) — le lead magnet marche dès le déploiement ;
- Capture de leads → Supabase (schéma SQL fourni) ;
- Stripe Checkout prêt à brancher (3 plans + pack one-shot) ;
- SEO complet (meta, sitemap, robots, JSON-LD Organization + FAQ + Product).

### 6.4 Roadmap

| Phase | Semaine | Contenu |
|---|---|---|
| v0 (ce repo) | S0 | Site + mini-scan + leads + paiement prêt |
| v0.5 | S1–S4 | Scan multi-pages headless (Playwright + axe-core sur VPS), dashboard client (Supabase Auth), rapports PDF |
| v1.0 | S5–S8 | Scans planifiés n8n + alertes diff, générateur de déclaration, plan d'action IA |
| v1.5 | S9–S12 | White-label agences, Customer Portal Stripe, API |
| v2 | M4–M6 | Suivi RGAA 5, plugin WordPress de remontée, partenaire audit manuel certifié |
