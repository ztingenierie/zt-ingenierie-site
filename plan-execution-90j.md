# Plan d'exécution 90 jours — AccessiVeille

Hypothèse de charge : 15–25 h/semaine en solo. Si temps plein, compresser ×2. Les dépendances sont notées ⛓.

---

## Semaine par semaine

### Semaine 1 — Exister légalement et techniquement
- [ ] Vérifier dispo `accessiveille.fr` / `.com` (OVH) + recherche d'antériorité INPI (data.inpi.fr). Si pris → fallback (`accessi-veille.fr`, `veille-accessibilite.fr`) et renommer dans le code (1 variable, voir README).
- [ ] Acheter le domaine (OVH), configurer e-mail pro (contact@) — MX OVH ou Zoho gratuit.
- [ ] Déclaration micro-entrepreneur sur le guichet unique INPI (si pas déjà fait) ⛓ Stripe.
- [ ] Déployer ce repo sur Vercel + domaine OVH (instructions README) — **le site est en ligne en S1**.
- [ ] Créer projet Supabase (région eu-west) + exécuter `site/supabase/schema.sql`.
- [ ] Search Console + Bing Webmaster + sitemap soumis.

### Semaine 2 — Encaisser et capter
- [ ] Compte Stripe (SIRET reçu) : créer les 4 produits/prix, renseigner les IDs dans `.env`, tester un paiement réel à 1 €.
- [ ] Compte bancaire dédié + virement Stripe configuré.
- [ ] Brancher Resend (ou Brevo) : e-mail de livraison du rapport de scan.
- [ ] Publier articles #1 et #2 (rédaction assistée Claude, relecture humaine).
- [ ] RC pro souscrite.

### Semaine 3 — Le moteur de scan v0.5
- [ ] VPS OVH (7 €/mois) : installer n8n + Playwright.
- [ ] Pipeline scan complet : crawl 20 pages, axe-core, mapping RGAA (table `rules`), score, stockage Supabase.
- [ ] Publier articles #3 et #4.

### Semaine 4 — Rapport vendable
- [ ] Génération rapport PDF (HTML → PDF) avec plan d'action.
- [ ] Intégration API Claude : explication FR + correction proposée par non-conformité (prompt versionné dans le repo).
- [ ] Publier articles #5 et #6. Jalon : **le Pack Déclaration 390 € est livrable de bout en bout.**

### Semaines 5–6 — Amorçage commercial
- [ ] Constituer la liste agences vague 1 (200 contacts, sources publiques, fiche registre n°4).
- [ ] Domaine d'envoi séparé + warm-up 14 jours ⛓ démarré en S4.
- [ ] Séquence cold email n8n (3 e-mails, désinscription fonctionnelle) — envois 30/jour.
- [ ] Publier articles #7–#10. Lead magnet « Kit DGCCRF » en ligne.
- [ ] Auto-audit du propre site + publication de SA déclaration d'accessibilité (crédibilité).

### Semaines 7–8 — Dashboard client (v1.0)
- [ ] Auth Supabase (magic link), espace client : sites, historique, téléchargement rapports.
- [ ] Scans planifiés n8n + e-mail d'alerte régression (le cœur de la rétention).
- [ ] Générateur de déclaration d'accessibilité (formulaire → document conforme au modèle officiel).
- [ ] Google Ads campagne « Déclaration » : 10 €/jour.

### Semaines 9–10 — Vague agences
- [ ] White-label : logo agence sur rapports + page de partage client.
- [ ] Cold email vague 2 (300 contacts) + relance vague 1.
- [ ] 2 partenariats proposés (newsletter dev FR sponsorisée, intégrateur WordPress).
- [ ] 2 articles longue traîne/semaine (sectoriels).

### Semaines 11–12 — Boucle d'optimisation
- [ ] Analyse entonnoir : scans → e-mails → payants ; corriger le maillon faible.
- [ ] Customer Portal Stripe (self-service résiliation/factures).
- [ ] Bilan Google Ads (CAC < 150 € ? scale : coupe).
- [ ] Interviews écrites (e-mail) de 5 utilisateurs gratuits non convertis : pourquoi ?
- [ ] Choisir la PDP facturation électronique (échéance légale 01/09/2026 — réception).

### Semaine 13 — Bilan J90
- [ ] KPI vs cibles (10 payants, 600–900 € MRR, 500 e-mails, 5 top-10 SEO).
- [ ] Décision : doubler le canal qui marche, tuer celui qui ne marche pas. Pas de nouveau canal avant 1 000 € MRR.

---

## Checklist « prêt à lancer » (avant toute dépense publicitaire)

- [ ] Domaine + HTTPS + e-mail pro opérationnels
- [ ] Mini-scan : testé sur 20 sites réels variés sans crash
- [ ] Lead enregistré en base + e-mail de rapport reçu < 2 min
- [ ] Paiement Stripe réel testé (et remboursé) sur les 4 offres
- [ ] Mentions légales, CGV, politique de confidentialité publiées et remplies (plus aucun [champ])
- [ ] Registre des traitements rempli, opt-out testé
- [ ] Déclaration d'accessibilité de mon propre site publiée
- [ ] Sitemap indexé, 6 articles publiés
- [ ] Sauvegarde Supabase activée + alerte erreur (e-mail) sur les fonctions

---

## Les 10 premiers clients — méthode sans visage ni terrain

1. **Scans non sollicités utiles (agences)** : scanner 50 sites de clients visibles sur les portfolios d'agences, envoyer le rapport réel par e-mail (séquence conforme du marketing-plan). C'est de la prospection écrite avec preuve de valeur immédiate — taux de réponse attendu 3–8 % (Hyp.).
2. **Pack Déclaration en SEA** : la requête « déclaration d'accessibilité » est transactionnelle et peu chère ; 1 vente = 390 € ≈ le budget test mensuel.
3. **Communautés écrites** : 10 réponses détaillées et sourcées par semaine (forums WordPress FR, Reddit, groupes LinkedIn) avec lien vers le scan gratuit en signature — jamais de spam, toujours répondre d'abord.
4. **Offre fondateur** : -50 % à vie pour les 10 premiers abonnés contre un témoignage écrit et 30 min de feedback par e-mail. Affiché sur le site (rareté honnête : compteur réel).
5. **Partenaire auditeur** : proposer à 2 cabinets d'audit accessibilité de leur envoyer mes demandes d'audit complet contre leur recommandation de ma veille post-audit.

## KPI à suivre (tableau de bord hebdo, Supabase + n8n → e-mail du lundi)

| KPI | Définition | Cible J90 |
|---|---|---|
| Scans gratuits/sem. | submissions table `leads` | 75 |
| Taux scan→e-mail | leads avec e-mail / scans | > 60 % |
| MQL cumulés | e-mails uniques | 500 |
| Clients payants | abonnements Stripe actifs | 10 |
| MRR | Stripe | 600–900 € |
| Churn mensuel | résiliations/actifs | < 5 % |
| Top 10 SEO | sur 25 requêtes suivies | 5 |
| Délai scan→rapport | p95 | < 2 min |
