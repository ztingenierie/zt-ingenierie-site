# Phase 3 / Étape 8 — Stratégie marketing : 90 jours pour 10 clients

Objectif unique : **10 clients payants le plus vite possible.** Trois canaux, par ordre de
priorité : outbound data-driven (gratuit, immédiat), Google Ads (intention chaude), SEO (fond de
cale). Meta pixel installé mais pas de campagne Meta avant le mois 4 (retargeting seulement).

## 1. Le canal signature : outbound « vous avez perdu ce marché »

**Mécanique** (workflow n8n, 1 jour de setup) :
1. Télécharger les **DECP** (données essentielles de la commande publique, data.gouv.fr) +
   flux **BOAMP** ; filtrer CPV second œuvre (45310000 élec, 45330000 plomberie/CVC,
   45442100 peinture, 45421000 menuiserie…) par région.
2. Pour chaque marché attribué : identifier l'attributaire → constituer la liste des entreprises
   locales du même CPV **qui n'ont pas gagné** (annuaire Sirene par code NAF + département).
3. Enrichir (e-mail/téléphone via site web, Pappers) → séquence 3 e-mails + 1 appel.

**E-mail 1 (le crochet)** :
> Objet : le marché du [groupe scolaire de X] — 187 000 €
>
> Bonjour [Prénom], le marché « [intitulé] » a été attribué le [date] à [concurrent] pour
> [montant]. Dans ce type de consultation, le mémoire technique pèse 40 à 60 % de la note — c'est
> presque toujours là que ça se joue, pas sur le prix.
> Nous rédigeons des mémoires techniques pour les entreprises d'[électricité] : livré en 48 h,
> 590 €, structuré sur la grille de notation. Le prochain [marché de ce type] dans votre
> département, on vous aide à le prendre ?
> [Signature] — attriba.fr

E-mail 2 (J+4) : Audit Flash 90 € sur un mémoire perdu. E-mail 3 (J+9) : étude de cas + dernier
rappel. Appel (J+11) sur les ouvreurs. **Script d'appel** :
1. « Je vous appelle parce que vous étiez sur le marché de [X] — c'est [concurrent] qui l'a eu. »
2. Question qualifiante : « Vous répondez à combien de consultations par an ? Qui rédige le
   mémoire ? »
3. Pitch 20 s + proposition unique : « Envoyez-moi votre dernier mémoire perdu, je vous renvoie
   sous 24 h ce qui lui a coûté des points. 90 €, déduits si on travaille ensemble. »

Volume : 100 contacts/semaine. Hypothèses : 40 % d'ouverture, 2,5 % de réponse, 1 client/120
contacts au début → **3-4 clients/mois dès le mois 2** sur ce seul canal.

## 2. Google Ads (à partir de la semaine 3)

- **Campagne 1 « Mémoire technique » (exact/expression)** : « rédaction mémoire technique »,
  « mémoire technique exemple », « mémoire technique BTP », « aide appel d'offres » ;
  CPC attendu 1,5-4 €. Annonce : *« Mémoire technique livré en 48 h | Prix fixe 590 € —
  Spécialistes second œuvre. Rédigé sur la grille de notation. Retouches incluses. »*
- **Campagne 2 « Concurrents/substituts »** (mois 2, si budget) : requêtes outils AO.
- Budget test : **20 €/jour, 600 €/mois**. Critère de poursuite : 1 client (CAC ≤ 300 €) sur les
  600 premiers euros → scale à 40 €/jour. Sinon : pause et 100 % outbound.
- Landing dédiée = page d'accueil (déjà optimisée conversion) ; conversion mesurée via GTM
  (événements `lead` et `purchase` déjà câblés dans le site).

## 3. SEO — les 20 premiers contenus (1/semaine, IA-assisté, 2 h chacun)

Pilier : **« Le guide 2026 du mémoire technique »** (5 000 mots). Puis pages métier et intentions :

1. Mémoire technique électricité : structure + exemple commenté
2. Mémoire technique plomberie/CVC
3. Mémoire technique peinture/finitions
4. Mémoire technique menuiserie/agencement
5. Modèle de mémoire technique gratuit (.docx contre e-mail) — l'aimant à leads
6. Comment lire un règlement de consultation en 20 minutes
7. Critères de notation : comment les acheteurs notent vraiment
8. 10 erreurs qui coûtent des points (avec exemples réels anonymisés)
9. DC1, DC2, DUME : le dossier administratif sans erreur
10. Répondre à son premier marché public : checklist complète
11. Chorus Pro & facturation des marchés : guide artisan
12. PEMD et gestion des déchets dans le mémoire : ce qui rapporte des points
13. Mémoire technique et RE2020/transition énergétique
14. Combien coûte la rédaction d'un mémoire technique ? (page commerciale assumée)
15. Étude de cas : de 11/20 à 16,5/20 sur le critère technique
16. La veille BOAMP en 10 min/semaine (avec n8n) — contenu signature
17. Groupement momentané d'entreprises : répondre à plusieurs
18. Que faire d'un courrier de rejet (et comment demander les motifs)
19. Marchés < 40 000 € : la prospection directe des acheteurs
20. Sous-traitance et DC4 dans la réponse

Production sans visage ni voix : rédaction IA + relecture experte, schémas générés, déclinaison
LinkedIn (3 posts/semaine sur la page entreprise Attriba — citations de marchés réels).

## 4. Plan 90 jours semaine par semaine (acquisition)

| Sem. | Actions |
|---|---|
| 1 | Domaine + déploiement site + Stripe live + GTM/pixel ; setup veille DECP/BOAMP n8n ; liste 1 (100 prospects, 2 départements pilotes) |
| 2 | Lancement séquence outbound liste 1 ; guide pilier publié ; page LinkedIn ; offre early 290 € aux 3 premiers |
| 3 | Google Ads ON (20 €/j) ; liste 2 ; appels J+11 liste 1 ; contenu n° 2 |
| 4 | **Bilan M1 : objectif 2-3 clients.** Itération messages selon réponses ; contenu n° 3 |
| 5-6 | Cadence : 100 contacts/sem., 1 contenu/sem., suivi Ads (CAC ?) ; demander 2 témoignages |
| 7-8 | Aimant à leads (modèle .docx) + séquence e-mail nurture ; premier upsell pack aux clients ×2 mémoires |
| 9 | **Bilan M2 : objectif cumul 5-6 clients, 1 pack.** Décision Ads : scale ou pause |
| 10-11 | Contact CAPEB/FFB de 2 départements (proposition atelier gratuit « répondre aux AO ») ; étude de cas publiée |
| 12-13 | Retargeting Meta (audience site) 5 €/j ; consolidation ; **bilan M3 : objectif cumul 10 clients, 2 packs, MRR ≥ 3 k€** |

KPI hebdo : contacts sortants, taux de réponse, RDV, clients, CA, CAC par canal, délai moyen de
livraison, note moyenne obtenue par les clients (l'arme marketing de l'année 2).
