# Plan Marketing & Acquisition — AccessiVeille

100 % faceless : aucun visage, aucune voix, aucune prospection physique. Tous les canaux sont écrits ou automatisés.

---

## 1. Plan d'acquisition 90 jours (vue d'ensemble)

| Phase | Jours | Objectif | Canaux actifs |
|---|---|---|---|
| Fondations | J1–J21 | Site en ligne, mini-scan opérationnel, 6 articles publiés, Search Console branchée | SEO, outil gratuit |
| Amorçage | J22–J45 | 300 scans gratuits, 150 e-mails capturés, 1ers Packs Déclaration vendus | SEO, cold email agences (vague 1 : 200 contacts), communautés |
| Accélération | J46–J90 | 10 clients payants, 1 partenariat signé, Google Ads testé | + SEA 300 €/mois, partenariats, lead magnets |

KPI nord : **nombre de scans gratuits lancés/semaine** (tout en découle).

---

## 2. Stratégie SEO

### Principe
Le marché cherche des réponses réglementaires, pas un produit. Chaque article répond à une question légale précise et débouche sur le mini-scan gratuit. Cluster sémantique : « obligation / sanction / déclaration / audit / RGAA / EAA ».

### Les 10 premiers articles (ordre de publication)

1. **« Accessibilité numérique : votre site est-il concerné par la loi en 2026 ? (arbre de décision) »** — requête : *accessibilité site web obligation* — l'article pilier, avec schéma décisionnel.
2. **« Déclaration d'accessibilité : modèle officiel, exemples et erreurs à éviter »** — *déclaration d'accessibilité modèle* — intention transactionnelle directe → Pack Déclaration.
3. **« European Accessibility Act : ce qui a changé pour le e-commerce français depuis juin 2025 »** — *european accessibility act france*.
4. **« Amendes et sanctions accessibilité numérique : qui contrôle, combien, et qui a déjà été sanctionné »** — *sanction accessibilité numérique*.
5. **« RGAA 4 : les 106 critères expliqués simplement (et lesquels un outil peut tester) »** — *critères RGAA* — l'article-preuve d'honnêteté.
6. **« Overlay d'accessibilité (accessiBe, UserWay…) : pourquoi ce n'est pas une mise en conformité »** — *overlay accessibilité avis* — l'article de positionnement.
7. **« Agences web : comment répondre à un client qui demande la conformité RGAA »** — *audit RGAA agence web* — l'article persona 1.
8. **« Audit accessibilité : gratuit, automatisé ou manuel — que choisir selon votre budget »** — *audit accessibilité prix*.
9. **« Schéma pluriannuel d'accessibilité : qui doit le publier et comment le rédiger »** — *schéma pluriannuel accessibilité*.
10. **« Accessibilité WordPress / Shopify : checklist des 15 corrections les plus fréquentes »** — *accessibilité wordpress* — porte d'entrée longue traîne dev.

Rythme : 2 articles/semaine (rédigés avec l'aide de Claude, relus et signés « L'équipe AccessiVeille » — aucun personal branding). Maillage interne systématique vers `/audit-gratuit`.

### SEO technique (déjà dans le code livré)
Meta dynamiques, sitemap.xml, robots.txt, JSON-LD (Organization, FAQPage, Product/Offer), Core Web Vitals (site statique), pages légales complètes (signal de confiance).

---

## 3. Cold email B2B (conforme RGPD / LCEN)

### Cadre de conformité
- Cible exclusivement **professionnelle** (adresses génériques d'agences ou contacts pro nominatifs), message **en rapport avec la fonction** du destinataire : la prospection B2B par e-mail est licite en France **sans consentement préalable**, à condition d'informer, d'offrir un opt-out simple et de respecter le droit d'opposition (doctrine CNIL).
- Chaque e-mail contient : identité complète, motif de la sollicitation, lien de désinscription fonctionnel, adresse postale.
- Sources de contacts : données publiques (sites d'agences, annuaires pro) collectées loyalement, mention au registre des traitements (voir legal/registre-traitements.md), purge à 3 ans.
- Volume : max 30/jour, domaine d'envoi séparé (ex. `accessiveille-outreach.fr`), warm-up 2 semaines.

### Séquence agences web (3 e-mails)

**E-mail 1 — J0 : le service rendu**
> Objet : vos clients e-commerce et la loi accessibilité
>
> Bonjour,
>
> Depuis juin 2025, les sites e-commerce de plus de 10 salariés ou 2 M€ de CA doivent être accessibles (European Accessibility Act). La DGCCRF a commencé les contrôles — l'amende est de 7 500 € par infraction constatée, cumulable.
>
> J'ai scanné la page d'accueil de [client visible sur votre portfolio / votre site] : [X] points bloquants détectés automatiquement (alternatives d'images, contrastes, intitulés de formulaires).
>
> Le rapport complet est ici, sans inscription : [lien rapport public]
>
> Si le sujet monte chez vos clients, AccessiVeille fournit aux agences des rapports white-label et la veille continue, à partir de 249 €/mois pour 15 sites — soit moins que ce que vous facturez une demi-journée.
>
> [Prénom], AccessiVeille — [adresse] — Vous ne souhaitez plus recevoir nos e-mails : [lien désinscription]

**E-mail 2 — J+4 : la preuve** — cas chiffré : « comment une agence de 6 personnes a transformé l'obligation RGAA en 18 000 € de prestations revendues » (étude de cas écrite, anonymisée ou hypothétique clairement signalée tant qu'il n'y a pas de vrai cas).

**E-mail 3 — J+10 : la clôture** — « Je clos le dossier de votre côté ? Si le sujet revient, le scan gratuit reste ici : [lien] ». Stop après 3 messages, opt-out global respecté.

### Séquence PME e-commerce (2 e-mails)
Même structure, angle risque/assurance : scan de LEUR site + lien rapport + Pack Déclaration 390 €.

---

## 4. Tunnels payants (budgets de test)

### Google Ads (priorité 1 — intention chaude)
- Budget test : **300 €/mois pendant 60 jours** (M2–M3), CPC estimé 1,50–4 € (Hyp. — niche réglementaire B2B).
- Campagne 1 « Déclaration » : *déclaration d'accessibilité*, *déclaration accessibilité obligatoire*, *modèle déclaration accessibilité* → landing Pack Déclaration 390 €. Seuil de viabilité : 1 vente / 130 € dépensés.
- Campagne 2 « Audit » : *audit accessibilité site web*, *audit RGAA prix*, *test accessibilité site* → landing scan gratuit (objectif : lead à < 8 €).
- Exclusions : *formation*, *emploi*, *gratuit* (sur campagne 1), requêtes étudiantes.
- Décision J60 : CAC abonné < 150 € → scale à 600 €/mois ; sinon coupe et tout sur SEO.

### Meta Ads (priorité 2 — à ne tester qu'après)
- 150 €/mois max, audience : admins de pages « agence web / e-commerce France », créa : visuel chiffré « 7 500 € d'amende par infraction. Votre site est-il concerné ? Test en 2 min. » Faceless par nature. Hypothèse faible — B2B réglementaire sur Meta convertit rarement ; couper sans état d'âme si CPL > 15 €.

---

## 5. Calendrier de contenu écrit (12 semaines)

| Sem. | Article blog (lun.) | Article blog (jeu.) | LinkedIn page entreprise (2 posts/sem.) | Newsletter |
|---|---|---|---|---|
| 1 | #1 arbre de décision | #2 déclaration modèle | Extraits chiffrés des articles | — |
| 2 | #3 EAA e-commerce | #4 sanctions | idem | — |
| 3 | #5 critères RGAA | #6 overlays | idem | NL#1 « Êtes-vous concerné ? » |
| 4 | #7 agences | #8 audit prix | idem | — |
| 5 | #9 schéma pluriannuel | #10 WordPress/Shopify | idem | NL#2 cas client |
| 6–12 | 1 article/sem. longue traîne (sectoriels : « accessibilité site mairie », « accessibilité banque en ligne », « accessibilité Prestashop »…) | — | 2 posts/sem. | NL bimensuelle |

Tous les contenus sont signés « AccessiVeille » — jamais une personne. Les visuels sont des schémas/captures, jamais des photos de moi.

---

## 6. Lead magnets

1. **Le mini-scan gratuit** (déjà codé) — lead magnet principal, valeur immédiate.
2. **« Kit DGCCRF » (PDF)** : checklist d'auto-évaluation EAA + modèle de déclaration d'accessibilité à trous + tableau des sanctions. Téléchargement contre e-mail.
3. **« Arbre de décision : suis-je concerné ? »** : version interactive de l'article #1 (3 questions → verdict + CTA scan).
4. **Modèle de devis « prestation accessibilité » pour agences** : aide les agences à VENDRE de l'accessibilité à leurs clients → elles ont besoin de mon outil pour livrer. C'est le lead magnet le plus stratégique.

---

## 7. Partenariats faceless

- **Intégrateurs WordPress/Shopify FR** : commission d'apport 20 % récurrente 12 mois (lien tracké).
- **Newsletters dev/agences FR** (sponsoring écrit, 100–300 €/parution).
- **Auditeur accessibilité certifié** (accord de renvoi réciproque : je lui envoie les audits complets, il m'envoie la veille continue post-audit) — complémentarité, pas concurrence.

## 8. KPI hebdomadaires

| KPI | Cible M3 |
|---|---|
| Scans gratuits / semaine | 75 |
| Taux scan → e-mail | > 60 % |
| E-mails capturés cumulés | 500 |
| Taux e-mail → client payant (30 j) | 3–5 % |
| Clients payants | 10 |
| MRR | 600–900 € |
| Positions SEO top 10 (sur 25 requêtes suivies) | 5 |
