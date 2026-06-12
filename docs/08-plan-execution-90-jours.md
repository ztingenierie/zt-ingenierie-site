# Phase 3 / Étape 10 — Plan d'exécution 90 jours

## L'action n° 1 — aujourd'hui, dans l'heure

**Vérifier et acheter `attriba.fr` (et `attriba.com`) sur OVH (~15 €), puis déployer ce dépôt sur
Vercel (15 min, guide : `DEPLOIEMENT.md`).** Tout le reste s'appuie dessus. Si le .fr est pris :
plan B `attriba.io` / `lattributaire.fr`, et on ne change plus d'avis.

## Semaine par semaine

### Mois 1 — Fondations + premiers euros

| Sem. | À faire | Livrable de fin de semaine |
|---|---|---|
| **1** | Acheter domaine ; déployer le site (Vercel + Supabase + Stripe live + GTM/pixel) ; compte pro ; déclaration micro-entrepreneur (guichet unique INPI, 30 min, gratuit) ; assurance RC Pro ; vérif INPI marque « Attriba » | Site en ligne qui encaisse ; statut légal actif |
| **2** | Construire le pipeline de production : 4 prompts maîtres (analyse RC/CCTP → plan noté → rédaction sections → contrôle qualité) via API Claude ; gabarit .docx pro ; test complet sur 2 DCE réels téléchargés sur BOAMP | 1 mémoire « démo » complet en < 3 h chrono |
| **3** | Workflow n8n veille DECP/BOAMP + extraction des perdants (2 départements pilotes) ; liste 1 de 100 prospects enrichis ; lancement séquence e-mails ; Google Ads ON (20 €/j) | 100 contacts engagés |
| **4** | Appels J+11 ; offre early : 3 mémoires à 290 € contre témoignage ; publier le guide pilier SEO | **Objectif : 2-3 clients, premiers 600-1 200 €** |

### Mois 2 — Cadence et preuve

| Sem. | À faire |
|---|---|
| 5 | Liste 2 (100 prospects, +2 départements) ; contenu n° 2 ; itérer les e-mails selon les réponses |
| 6 | Demander 2 témoignages + autorisation logo ; les mettre sur la landing ; contenu n° 3 |
| 7 | Aimant à leads (modèle .docx contre e-mail) + séquence nurture 5 e-mails ; contenu n° 4 |
| 8 | **Bilan Ads** : CAC ≤ 300 € → passer à 40 €/j ; sinon pause. Premier upsell pack aux clients ×2 mémoires. **Objectif cumul : 5-6 clients, 1 pack, ~3 000 € de CA mensuel** |

### Mois 3 — Récurrence

| Sem. | À faire |
|---|---|
| 9 | Portail client v1 (espace de dépôt DCE sur le site, Supabase auth) ; contenu n° 5-6 |
| 10 | Contacter CAPEB/FFB de 2 départements : proposer un atelier gratuit « répondre aux marchés publics en 2026 » |
| 11 | Étude de cas chiffrée publiée (avant/après note technique) ; retargeting Meta 5 €/j |
| 12-13 | Consolidation ; recruter 1 freelance relecteur « de secours » ; **objectif cumul : 10 clients, 2 packs, MRR ≥ 3 000 €, CA total ≥ 8 000 €** |

## Checklist de lancement (à cocher avant de prospecter)

- [ ] Domaine acheté + DNS vers Vercel + HTTPS actif
- [ ] Variables d'environnement remplies (`.env.example` → Vercel)
- [ ] Stripe en mode live + produits créés + webhook testé + un paiement test réel remboursé
- [ ] Table `leads` Supabase créée (`supabase/schema.sql`) + test du formulaire contact
- [ ] GTM publié + pixel Meta vérifié (événements `lead`, `begin_checkout`, `purchase`)
- [ ] Mentions légales/CGV/CGU/RGPD : champs `[À COMPLÉTER]` remplis (SIREN, adresse…)
- [ ] Micro-entreprise immatriculée + compte pro ouvert + RC Pro signée
- [ ] E-mail pro contact@attriba.fr opérationnel (+ SPF/DKIM pour la délivrabilité outbound)
- [ ] Pipeline de production testé de bout en bout sur 2 DCE réels
- [ ] Veille n8n active sur 2 départements pilotes

## KPI à suivre (tableau hebdomadaire)

| KPI | Cible M1 | Cible M3 | Cible M6 |
|---|---|---|---|
| CA mensuel | 600-1 200 € | 3 000-5 000 € | 8 000-11 000 € |
| Clients cumulés | 2-3 | 10 | 25 |
| Packs récurrents actifs | 0 | 2 | 4-5 |
| CAC moyen | < 150 € | < 250 € | < 300 € |
| Marge nette (après cotisations) | > 55 % | > 55 % | > 55 % |
| Délai moyen de livraison | ≤ 48 h | ≤ 48 h | ≤ 48 h |
| Taux de réponse outbound | ≥ 2 % | ≥ 2,5 % | ≥ 3 % |

## Les 3 règles d'exécution

1. **La prospection passe avant tout** : 100 contacts/semaine, même quand il y a des mémoires à
   livrer. Un trimestre sans prospection = un trimestre mort 6 semaines plus tard.
2. **Chaque mémoire enrichit la machine** : sections réutilisables taguées par corps d'état →
   le coût marginal baisse à chaque livraison, c'est tout le modèle.
3. **Demander la note** : après chaque attribution, récupérer la note technique du client —
   c'est la matière première des études de cas, du SaaS et du pricing power.
