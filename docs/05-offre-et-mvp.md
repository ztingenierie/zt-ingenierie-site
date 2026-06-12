# Phase 2 / Étape 6 — Offre produit & MVP

## 1. Ce qu'Attriba vend, précisément

| Livrable | Détail |
|---|---|
| **Mémoire Express (590 € HT)** | Mémoire technique de 15-30 pages, personnalisé : présentation entreprise, moyens humains/matériels, méthodologie chantier par lot, planning, démarche sécurité/environnement, gestion des déchets (PEMD), références — **structuré sur les critères exacts du règlement de consultation (RC)**, aux couleurs du client, livré en .docx + .pdf sous 48 h ouvrées, 1 série de retouches incluse. |
| **Audit Flash (90 € HT)** | Analyse d'un mémoire perdu : reconstitution de la grille de notation, 5 corrections prioritaires, estimation de la note. Produit d'appel → upsell Mémoire Express. |
| **Pack Conquête (1 490 € HT/mois)** | 3 mémoires/mois + veille personnalisée (codes CPV + départements) + scoring go/no-go de chaque consultation détectée. |
| **Pack Attributaire (2 990 € HT/mois)** | 8 mémoires/mois + veille + relecture pièces administratives (DC1/DC2/DUME) + analyse des courriers de notation pour amélioration continue. |

## 2. Parcours client de A à Z

1. **Découverte** : e-mail outbound « vous avez perdu le marché X » / annonce Google « mémoire
   technique » / article SEO → arrive sur attriba.fr.
2. **Conviction** : landing page = douleur chiffrée (40-60 % de la note) + promesse 48 h + prix
   fixe + processus en 3 étapes + FAQ.
3. **Achat** : paiement Stripe en ligne (Mémoire Express, Audit Flash) ou prise de rendez-vous
   15 min (packs). Zéro friction : pas de devis pour l'offre unitaire.
4. **Onboarding (1 fois)** : formulaire sécurisé → l'entreprise dépose ses « actifs » : Kbis,
   attestations, moyens, CV, photos de chantiers, références. Stockés dans sa bibliothèque
   (Supabase) et réutilisés à chaque mémoire → le 2ᵉ mémoire est encore meilleur et plus rapide.
5. **Production** : dépôt du DCE → pipeline IA (extraction RC/CCTP → plan calé sur la grille de
   notation → rédaction par sections avec les données client) → **relecture humaine** → livraison
   .docx/.pdf sous 48 h.
6. **Valeur** : le client dépose sa réponse ; après attribution, on lui demande sa note et le
   courrier de rejet/attribution → boucle d'amélioration + témoignage + upsell pack.

## 3. MVP — livrable en 2 semaines (et déjà codé ici)

- **Livré dans ce dépôt** : site complet (landing, tarifs, vente, contact, légal), paiement Stripe,
  capture de leads Supabase, tracking GTM + pixel Meta, SEO (sitemap, robots, JSON-LD).
- **À assembler en semaine 1-2 (outillage interne, pas de code produit nécessaire)** :
  1. Pipeline de production : prompts structurés (analyse DCE → plan → rédaction par section)
     opérés via l'API Claude — un script Node ou un workflow n8n suffit au début ;
  2. Gabarit .docx de mémoire (1 template Word soigné, styles + page de garde) ;
  3. Workflow n8n de veille BOAMP (flux quotidien filtré par CPV 45xxx + départements) ;
  4. Formulaire d'onboarding (Tally/Typeform au début, migré dans le site au mois 3).
- **Règle MVP** : tout ce qui n'est pas le mémoire livré en 48 h est secondaire. Le premier client
  peut être servi avec : le site (paiement) + 1 template Word + le pipeline de prompts + 3 h de
  travail.

## 4. Roadmap 18 mois

| Période | Jalon produit | Jalon business |
|---|---|---|
| M1-M2 | Pipeline v1, template par 3 corps d'état (élec, CVC, peinture), veille n8n | 5 premières références (dont 2 à 290 € « early ») |
| M3-M4 | Portail client (espace Supabase : dépôt DCE, suivi, historique), templates 6 corps d'état | 10 clients, 1er pack mensuel |
| M5-M6 | Scoring go/no-go automatisé, analyse des courriers de notation | 4-5 k€/mois, embauche freelance relecture en secours |
| M7-M9 | Extension propreté/espaces verts, bibliothèque 12 corps d'état | 8-10 k€/mois, bascule SASU, 2 partenariats |
| M10-M12 | **SaaS bêta** (self-service sur le portail : génération + veille, 249 €/mois) avec 10 clients pilotes | 12-15 k€/mois |
| M13-M18 | SaaS GA, onboarding automatisé, le service devient l'offre « premium » | 15-30 k€/mois, 1 rédacteur freelance permanent |
