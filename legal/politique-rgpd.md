# POLITIQUE DE CONFIDENTIALITÉ ET RGPD — FicheIA

*Conformément au Règlement (UE) 2016/679 du 27 avril 2016 (RGPD) et à la loi Informatique et Libertés n° 78-17 du 6 janvier 1978 modifiée*

*Version 1.0 — [DATE DE LANCEMENT]*

---

## 1. Responsable du traitement

**[VOTRE NOM ET PRÉNOM]** (micro-entrepreneur)
[VOTRE ADRESSE]
Email RGPD : **rgpd@ficheai.fr**

---

## 2. Données collectées et finalités

| Catégorie de données | Données collectées | Finalité | Base légale |
|---------------------|-------------------|----------|-------------|
| **Identité et contact** | Adresse email | Création et gestion du compte | Exécution du contrat |
| **Données de paiement** | Identifiant client Stripe (pas de données bancaires brutes) | Facturation, gestion abonnement | Exécution du contrat |
| **Données d'utilisation** | Noms de produits importés, fiches générées, quota utilisé | Fourniture du service | Exécution du contrat |
| **Données techniques** | Adresse IP, user agent, logs de connexion | Sécurité, prévention des fraudes | Intérêt légitime |
| **Cookies analytiques** | Comportement de navigation (Google Analytics 4), événements de conversion (Meta Pixel) | Amélioration du service, mesure publicité | Consentement |

**Aucune donnée sensible** (santé, origine ethnique, opinions politiques, etc.) n'est collectée.

---

## 3. Durée de conservation

| Données | Durée de conservation |
|---------|----------------------|
| Compte utilisateur (email, profil) | Jusqu'à suppression du compte + 1 an |
| Historique des générations | 12 mois glissants |
| Données de facturation (Stripe) | 10 ans (obligations comptables) |
| Logs techniques | 3 mois |
| Données analytiques anonymisées | 26 mois (standard GA4) |

---

## 4. Destinataires des données

| Destinataire | Pays | Rôle | Garanties |
|-------------|------|------|-----------|
| **Supabase** (base de données) | Allemagne (Frankfurt, UE) | Hébergeur | Serveur UE, accord sous-traitant RGPD |
| **Vercel** (hébergement app) | États-Unis | Hébergeur CDN | Clauses contractuelles types UE-US |
| **Stripe** (paiements) | Irlande (UE) | Processeur paiements | Privacy Shield / Standard Contractual Clauses |
| **Anthropic** (API Claude) | États-Unis | Traitement IA | Données anonymisées des requêtes, accord DPA |
| **Google** (GA4) | États-Unis | Analytique | Anonymisation IP, accord sous-traitant |
| **Meta** (Pixel) | États-Unis | Publicité | Consentement préalable requis |

**Aucune vente de données** à des tiers. Aucun courtier de données.

### Transferts hors UE
Pour les transferts vers les États-Unis (Vercel, Anthropic, Google, Meta), FicheIA s'appuie sur les Clauses Contractuelles Types (CCT) de la Commission Européenne. Sur demande, les CCT peuvent être communiquées à l'utilisateur.

---

## 5. Vos droits (RGPD)

Vous disposez des droits suivants sur vos données personnelles :

| Droit | Description | Comment l'exercer |
|-------|-------------|------------------|
| **Accès** | Obtenir une copie de vos données | Email à rgpd@ficheai.fr |
| **Rectification** | Corriger des données inexactes | Depuis votre tableau de bord ou par email |
| **Effacement** | Supprimer votre compte et vos données | Bouton "Supprimer mon compte" dans les paramètres |
| **Portabilité** | Recevoir vos données dans un format lisible | Email à rgpd@ficheai.fr |
| **Opposition** | Vous opposer au traitement | Email à rgpd@ficheai.fr |
| **Limitation** | Geler un traitement contesté | Email à rgpd@ficheai.fr |
| **Retrait du consentement** | Retirer votre consentement aux cookies | Bandeau de gestion des cookies |

Délai de réponse : **30 jours** maximum.

Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la **CNIL** :
- En ligne : https://www.cnil.fr/fr/plaintes
- Par courrier : CNIL, 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07

---

## 6. Cookies et traceurs

### Cookies strictement nécessaires (pas de consentement requis)
| Cookie | Émetteur | Durée | Finalité |
|--------|----------|-------|----------|
| supabase-auth-token | Supabase | Session | Authentification utilisateur |
| next-auth.session-token | Next.js | Session | Session utilisateur |
| stripe-mids | Stripe | Nécessaire | Prévention fraude paiements |

### Cookies analytiques et publicitaires (consentement requis)
| Cookie | Émetteur | Durée | Finalité |
|--------|----------|-------|----------|
| _ga, _ga_XXXX | Google Analytics | 26 mois | Statistiques de navigation |
| _fbp | Meta (Facebook) | 90 jours | Mesure publicité Facebook/Instagram |
| fr | Meta (Facebook) | 90 jours | Publicité personnalisée |

Vous pouvez gérer vos préférences via le bandeau de gestion des cookies accessible en bas de chaque page.

---

## 7. Sécurité des données

FicheIA met en œuvre les mesures techniques et organisationnelles suivantes :
- Connexions chiffrées HTTPS/TLS sur toutes les communications
- Chiffrement des données au repos dans Supabase (AES-256)
- Row Level Security (RLS) dans Supabase — chaque utilisateur n'accède qu'à ses propres données
- Authentification sécurisée (Supabase Auth) avec tokens JWT
- Accès aux données de production limité au seul opérateur
- Clés API stockées dans les variables d'environnement (jamais en clair dans le code)
- Sauvegardes automatiques quotidiennes (Supabase)

---

## 8. Violation de données (data breach)

En cas de violation de données susceptible d'engendrer un risque pour les droits et libertés des personnes concernées, FicheIA s'engage à :
1. Notifier la CNIL dans les **72 heures** suivant la découverte
2. Informer les utilisateurs concernés dans les meilleurs délais si la violation présente un risque élevé

---

## 9. Données des mineurs

FicheIA est un service destiné aux professionnels et n'est pas conçu pour les personnes de moins de 18 ans. Aucune donnée relative à des mineurs n'est sciemment collectée.

---

## 10. Modifications de la politique

Cette politique de confidentialité peut être mise à jour. Toute modification substantielle sera communiquée par email aux utilisateurs enregistrés au moins 15 jours avant son entrée en vigueur.

---

## 11. Contact

Pour toute question relative à la protection de vos données :
📧 **rgpd@ficheai.fr**
📮 [VOTRE ADRESSE POSTALE]

---

*Dernière mise à jour : [DATE]*
