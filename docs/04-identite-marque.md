# Phase 2 / Étape 5 — Identité de marque

## Nom : **Attriba**

- Construit sur **« attributaire »** — le mot officiel qui désigne l'entreprise qui REMPORTE le
  marché public. Le nom dit le résultat, pas le moyen. Court (7 lettres), prononçable, mémorisable,
  sonorité sérieuse compatible BTP et juridique.
- **Domaines visés : `attriba.fr` (principal) et `attriba.com` (redirection).**
  ⚠️ Hypothèse à vérifier le jour J (action n° 1 du plan 90 jours) : au moment de la rédaction,
  aucune marque INPI ni société du même nom n'est connue de nous, mais la disponibilité des
  domaines doit être confirmée sur OVH avant tout achat. Plans B prêts dans le même esprit :
  `attriba.io`, `attribapro.fr`, `lattributaire.fr`.
- Vérifications à faire dans la foulée (15 min) : recherche INPI (marques), societe.com (dénominations),
  poignées réseaux sociaux @attriba.

## Positionnement

> **Attriba — le bureau d'études des marchés publics, réservé au second œuvre.**
> Eux vendent des logiciels. Nous livrons des mémoires qui gagnent.

- On ne parle jamais « d'IA » en premier : on parle de **note technique**, de **délai 48 h**, de
  **marchés gagnés**. L'IA est le moteur, pas la promesse.
- Ton : direct, chiffré, artisan-compatible. Pas de jargon startup. Vouvoiement. Phrases courtes.
  On prouve avec des chiffres publics (BOAMP/DECP), pas avec des adjectifs.

## Tagline

> **« Le mémoire technique qui gagne des marchés. Livré en 48 h. »**

Variantes selon support : « Devenez l'attributaire. » (signature courte) ·
« 40 à 60 % de votre note se joue sur le mémoire technique. Confiez-le à des pros. » (Ads)

## Palette de couleurs

| Rôle | Couleur | Hex | Usage |
|---|---|---|---|
| Primaire | Bleu nuit institutionnel | `#0F2A43` | Fond héros, titres — sérieux « commande publique » |
| Accent | Orange chantier | `#F2730D` | CTA, soulignements — énergie BTP, contraste AA sur bleu nuit |
| Secondaire | Bleu acier | `#3E6C97` | Liens, icônes, graphiques |
| Fond | Blanc cassé | `#F7F6F2` | Fonds de sections |
| Texte | Gris anthracite | `#1E232A` | Corps de texte |
| Succès | Vert validation | `#1F8A4C` | Preuves, badges « marché gagné » |

## Concept de logo

Un **« A » majuscule formé d'un chevron de toise/équerre**, dont la barre horizontale est une
ligne de signature — l'équerre du chantier qui devient le paraphe de l'attributaire. Déclinable en
favicon (chevron seul). Fichier livré : `public/logo.svg` (logotype complet) — utilisé par le site.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 120" role="img" aria-label="Attriba">
  <g fill="none" stroke="#F2730D" stroke-width="14" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 100 L60 20 L100 100"/>
    <path d="M38 72 L98 72" stroke="#0F2A43"/>
  </g>
  <text x="130" y="86" font-family="Inter, Arial, sans-serif" font-size="64"
        font-weight="800" fill="#0F2A43" letter-spacing="-1">attriba</text>
  <circle cx="452" cy="80" r="7" fill="#F2730D"/>
</svg>
```

## Architecture de messages (réutilisée sur le site et les Ads)

1. **Douleur** : « Vous perdez des marchés sur le mémoire technique, pas sur le prix. »
2. **Preuve** : « Le mémoire pèse 40 à 60 % de la note. C'est écrit dans le règlement de
   consultation. »
3. **Promesse** : « Envoyez le DCE. Recevez sous 48 h un mémoire personnalisé, structuré sur la
   grille de notation. 590 €, prix fixe. »
4. **Réassurance** : relecture humaine systématique, retouches incluses, confidentialité totale,
   spécialistes second œuvre uniquement.
