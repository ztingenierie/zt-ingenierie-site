# Registre des activités de traitement (art. 30 RGPD) — AccessiVeille

> Modèle simplifié CNIL pour TPE. Tenir à jour à chaque nouveau traitement/outil. Responsable : [Prénom NOM] EI — contact@accessiveille.fr. Pas de DPO désigné (non obligatoire) ; point de contact : l'exploitant.

## Fiche 1 — Gestion des leads (scan découverte)
- **Finalité** : fournir le rapport de mini-audit demandé, puis proposer les offres AccessiVeille.
- **Catégories de personnes** : prospects professionnels.
- **Données** : e-mail, URL soumise, résultats techniques du scan, horodatage, consentement.
- **Base légale** : intérêt légitime (réponse à la demande) ; e-mails marketing ultérieurs : intérêt légitime B2B avec opt-out.
- **Destinataires** : exploitant uniquement. **Sous-traitants** : Supabase (UE), Resend/Brevo.
- **Durée** : 3 ans après dernier contact, puis suppression.
- **Sécurité** : TLS, chiffrement au repos, accès restreint, MFA.

## Fiche 2 — Gestion des clients et abonnements
- **Finalité** : exécution du contrat (comptes, scans, rapports, support).
- **Personnes** : clients professionnels (contacts).
- **Données** : identité, e-mail, entreprise, sites surveillés, historique de scans, échanges support.
- **Base légale** : contrat.
- **Sous-traitants** : Supabase (UE), Vercel/Netlify, Resend/Brevo.
- **Durée** : contrat + 5 ans.

## Fiche 3 — Facturation et comptabilité
- **Finalité** : facturation, obligations comptables et fiscales.
- **Données** : coordonnées de facturation, transactions (les données carte sont traitées exclusivement par Stripe, certifié PCI-DSS).
- **Base légale** : obligation légale.
- **Sous-traitants** : Stripe, PDP de facturation électronique [à désigner].
- **Durée** : 10 ans.

## Fiche 4 — Prospection B2B
- **Finalité** : prospection commerciale auprès de professionnels (agences web, PME).
- **Données** : e-mail pro, nom, fonction, entreprise — collectées depuis des sources publiques (sites des entreprises, annuaires professionnels).
- **Base légale** : intérêt légitime (sollicitation professionnelle en rapport avec la fonction du destinataire), information dès le premier message, opt-out simple et immédiat.
- **Sous-traitants** : outil d'envoi [à désigner], n8n auto-hébergé (VPS OVH, France).
- **Durée** : 3 ans ; liste d'opposition conservée sans durée pour garantir l'opt-out.

## Fiche 5 — Mesure d'audience (si activée)
- **Finalité** : statistiques d'usage du site.
- **Données** : données de navigation agrégées, sans cookie, sans identifiant individuel (Plausible ou Matomo configuration exemptée CNIL).
- **Base légale** : intérêt légitime.
- **Durée** : 25 mois.

## Transferts hors UE
Vercel/Netlify, Stripe, Resend, Anthropic : États-Unis — encadrés par clauses contractuelles types / Data Privacy Framework. Données applicatives principales maintenues en UE (Supabase eu-west).

## Violations de données
Procédure : détection → évaluation du risque → notification CNIL sous 72 h si risque (notifications.cnil.fr) → information des personnes si risque élevé → journal des violations tenu en annexe de ce registre.
