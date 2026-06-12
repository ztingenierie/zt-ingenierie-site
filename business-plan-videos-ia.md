# Business Plans — Vidéos IA : YouTube long format + TikTok automatisé

*Document rédigé le 12 juin 2026. Chiffres issus de recherches web récentes (sources en bas de page).*

---

## 1. Le "secret" des vidéos d'1h faites avec l'IA

Tu as mis le doigt sur le bon paradoxe : la génération vidéo par IA (Veo, Kling, Runway) coûte
0,07 à 0,75 $ **par seconde**. Une heure de pure génération vidéo coûterait 250 à 2 700 $.
**Personne ne fait ça.** Voici comment ils font réellement :

### Technique n°1 — L'image animée (90 % du contenu)
La vidéo n'est pas "générée" : ce sont des **images fixes** (Midjourney, Flux, DALL-E —
quelques centimes par image) animées avec des effets simples : zoom lent (effet Ken Burns),
parallaxe 2,5D, particules, transitions. Par-dessus : une **voix off TTS** (ElevenLabs) et de la
musique. Une image tient 5 à 15 secondes à l'écran. Pour 1h de vidéo il faut ~300-500 images,
soit **10-20 € d'images**, pas 2 000 €.

### Technique n°2 — Les boucles (le standard des cartoons enfants)
Les comptines et cartoons enfants ("Baby Songs 1 Hour") sont des **boucles** : une chanson de
3 minutes avec 5-6 plans animés, répétée 20 fois avec de légères variations de couleur/décor.
Coût de la vidéo d'1h ≈ coût de 3 minutes de contenu.

### Technique n°3 — Les compilations
Le créateur produit 10 épisodes de 6 minutes (publiés individuellement), puis les colle bout à
bout dans une "1 Hour Compilation". La vidéo d'1h coûte **0 € de plus** — c'est du montage.
C'est LE format dominant de la niche enfants.

### Technique n°4 — La génération vidéo en touche finale seulement
Seuls quelques plans "héros" (l'intro, les moments clés, la miniature animée) sont en vraie
génération vidéo via des **abonnements illimités ou à crédits** (Kling Premier ~65 $/mois ≈
0,01 $/s, Hailuo, Higgsfield, Runway Unlimited 76 $/mois) — jamais via l'API à la demande.

### Technique n°5 — Réutilisation d'assets
Mêmes personnages, mêmes décors, mêmes animations de bouche d'un épisode à l'autre. L'épisode 2
coûte 3 fois moins cher que l'épisode 1.

**Coût réel d'une vidéo d'1h "style cartoon/documentaire" bien faite : 15 à 60 € + ton temps.**

---

## 2. ⚠️ Avant les chiffres : 3 vérités à connaître (2025-2026)

1. **La niche "cartoon enfants" est un piège en 2026.**
   - Contenu "Made for Kids" = COPPA = pas de pub personnalisée → **RPM de 0,50 à 2 $**
     pour 1 000 vues, contre 3 à 15 $ pour du contenu adulte. Tu gagnes 50 à 80 % de moins.
   - Pas de commentaires, pas de notifications, pas de fin d'écran cliquable → croissance très lente.
   - La niche est **saturée** de slop IA depuis 2024 ; YouTube réduit activement la recommandation
     de ce contenu.

2. **Politique YouTube "Inauthentic Content" (15 juillet 2025).**
   Le contenu IA produit en masse, répétitif, sans valeur ajoutée humaine est **démonétisé**
   (des chaînes à 80k+ abonnés ont été supprimées). L'IA est autorisée comme *outil*, mais la
   vidéo finale doit avoir un vrai travail éditorial : script original, montage soigné, identité
   de chaîne. **Le "100 % automatisé sans toucher" ne survit plus sur YouTube.**

3. **TikTok paie peu et exige >1 minute.**
   Creator Rewards : ~0,40-1,00 $ / 1 000 vues qualifiées, vidéos de **1 minute minimum**
   (en dessous = 0 €). Le contenu IA visiblement repompé est souvent jugé inéligible. Le vrai
   argent sur TikTok vient de **TikTok Shop (affiliation)** et de la redirection vers YouTube,
   pas du programme de monétisation.

---

## 3. La niche recommandée (à la place des cartoons)

Critères : audience **adulte** (RPM élevé), format long naturel, compatible images IA + voix off,
pas de visage requis.

**🥇 Recommandation : Documentaires narrés "Histoire & Mystères"** (en français ou en anglais)
- Exemples : "La nuit où Rome a brûlé", "3 mystères non résolus de l'Égypte ancienne",
  "L'histoire vraie derrière...", récits de survie, catastrophes historiques.
- RPM : **4 à 10 $** (8 à 20 $ en anglais sur audience US) — soit 5 à 10× la niche enfants.
- Format 30-60 min parfait : les gens regardent pour s'endormir → watchtime énorme → l'algo adore.
- Production 100 % compatible IA : script LLM + images Midjourney + voix ElevenLabs.

**Alternatives solides :**
- **Histoires pour s'endormir / sleep stories pour adultes** (RPM moyen mais rétention record, très peu de production)
- **Business / finance storytelling** ("Comment Kodak a tout perdu") — RPM 10-20 $ mais concurrence forte
- **Mythologie & religions anciennes** — sous-niche de l'histoire, très porteuse en format 1h+

---

## 4. BUSINESS PLAN N°1 — Chaîne YouTube long format (documentaires IA)

### Le modèle
4 à 8 vidéos/mois de 30-60 min, audience adulte, monétisation AdSense puis sponsors.

### Stack & coûts mensuels

| Poste | Outil | Coût/mois |
|---|---|---|
| Script + recherche | Claude / ChatGPT | 20 € |
| Voix off | ElevenLabs Creator (100k crédits) | 22 € |
| Images | Midjourney Standard | 28 € |
| Plans vidéo "héros" | Higgsfield / Kling (abonnement crédits) | 10-30 € |
| Musique/SFX | Suno ou Epidemic Sound | 0-15 € |
| Montage | DaVinci Resolve / CapCut | 0 € |
| Miniatures | inclus Midjourney + Canva | 0 € |
| **TOTAL solo** | | **≈ 80-115 €/mois** |

Option "scaling" (mois 6+) : monteur freelance 50-100 €/vidéo → budget 400-800 €/mois.

### Étapes
1. **Semaine 1** — Choisir la sous-niche, analyser 10 chaînes concurrentes (vues/abonnés, titres
   qui marchent). Créer l'identité de chaîne (nom, logo, style visuel cohérent).
2. **Semaine 1-2** — Construire le pipeline : template de script (hook 30s → promesse → chapitres),
   style d'images fixe (même prompt de base Midjourney), voix unique ElevenLabs.
3. **Semaine 2-4** — Produire les 4 premières vidéos (20-30 min chacune pour commencer).
   Compter 8-12h de travail par vidéo au début, 4-6h ensuite.
4. **Mois 2-4** — Rythme 1-2 vidéos/semaine. Itérer **uniquement** sur : miniature, titre,
   rétention des 60 premières secondes (c'est 80 % du jeu).
5. **Seuil de monétisation** : 1 000 abonnés + 4 000 h de visionnage → réaliste en 3-6 mois
   si une vidéo "prend".
6. **Mois 6+** — Compilations des meilleurs épisodes (1h+, coût nul), 2e langue (doublage
   ElevenLabs → chaîne anglaise = RPM ×2), sponsors.

### Rentabilité (RPM moyen 4 € en FR, 8 € en EN)

| Scénario | Vues/mois | Revenus | Coûts | Profit |
|---|---|---|---|---|
| Mois 1-4 (pré-monétisation) | — | 0 € | ~100 € | **-100 €/mois** |
| Décollage timide | 50 000 | 200 € | 100 € | +100 € |
| Ça prend | 300 000 | 1 200 € | 150 € | **+1 050 €** |
| Chaîne établie (12-18 mois) | 1 000 000 | 4 000 € + sponsors | 600 € | **+3 400-5 000 €** |

**Investissement avant 1er euro : 300-600 € + 150-300 h de travail.**
**Honnêteté : ~70-80 % des chaînes ne décollent jamais.** Ceux qui réussissent ont itéré 20-50
vidéos avant le hit. Ce n'est pas passif, c'est un media business.

---

## 5. BUSINESS PLAN N°2 — TikTok automatisé quotidien

### Le modèle
1-2 vidéos/jour de 1-3 minutes (minimum 1 min pour être payé), pipeline semi-automatisé,
monétisation Creator Rewards + **TikTok Shop (le vrai moteur)** + funnel vers la chaîne YouTube.

### Stack & coûts mensuels

| Poste | Outil | Coût/mois |
|---|---|---|
| Orchestration | n8n (cloud) | 20 € |
| Scripts | API Claude/GPT | 5-10 € |
| Voix | ElevenLabs Creator | 22 € |
| Assemblage vidéo auto | JSON2Video / Creatomate / ffmpeg | 0-40 € |
| Images | Flux API ou banque d'images | 5-10 € |
| Publication | n8n + API TikTok (ou Buffer) | 0-15 € |
| **TOTAL** | | **≈ 50-115 €/mois** |

### Le pipeline automatisé (réalisable avec ton n8n)
1. **Trigger quotidien** n8n → 2. LLM génère le script (60-90 s, hook dans les 2 premières
   secondes) → 3. ElevenLabs génère la voix → 4. Creatomate/ffmpeg assemble images + voix +
   sous-titres animés + musique → 5. Publication programmée → 6. Log dans un Google Sheet.
**Garde 15-20 min/jour de contrôle humain** (choix des sujets, validation) : c'est ce qui évite
le ban "contenu inauthentique" et ce qui fait la différence de qualité.

### Étapes
1. **Semaine 1** — Même niche que la chaîne YouTube (synergie !) : versions courtes des
   documentaires ("Le saviez-vous : ce roi a disparu 3 ans..."). Créer le compte, poster 3-5
   vidéos manuellement pour calibrer.
2. **Semaine 2-3** — Construire le workflow n8n (je peux te le construire).
3. **Mois 1-2** — 1-2 posts/jour. Seuil monétisation : 10 000 followers + 100 000 vues/30 jours.
4. **Mois 2-3** — Activer Creator Rewards + TikTok Shop (produits affiliés liés à la niche :
   livres d'histoire, gadgets, etc.). Republier sur YouTube Shorts et Instagram Reels (coût
   marginal nul, triple la portée).
5. **En continu** — Chaque TikTok renvoie vers la vidéo YouTube longue ("la suite en bio").

### Rentabilité (RPM TikTok réaliste : 0,20-0,90 €)

| Scénario | Vues/mois | Creator Rewards | TikTok Shop/affiliation | Profit net |
|---|---|---|---|---|
| Démarrage (mois 1-2) | 100 000 | 0 € (seuil non atteint) | 0 € | **-80 €/mois** |
| Monétisé | 1 000 000 | 200-700 € | 100-300 € | **+250-900 €** |
| Compte qui perce | 5 000 000 | 1 000-3 500 € | 500-2 000 € | **+1 500-5 000 €** |

**Honnêteté :** les vues TikTok sont volatiles (un compte peut faire 5M de vues un mois, 200k le
suivant), et TikTok purge régulièrement les comptes 100 % IA. Le TikTok seul est un revenu
d'appoint instable ; sa vraie valeur est d'**alimenter la chaîne YouTube** (revenu stable).

---

## 6. La stratégie combinée (recommandée)

Ne choisis pas : les deux business utilisent **les mêmes assets**.

```
          Script documentaire (LLM)
                   │
        ┌──────────┴──────────┐
   Vidéo YouTube 30-60 min   3-5 extraits TikTok/Shorts/Reels (1-2 min)
   (revenu principal, RPM 4-10 €)   (acquisition d'audience, RPM 0,2-1 €)
                   ▲                          │
                   └────── funnel "suite en bio" ─────┘
```

- **Budget total : 120-180 €/mois** (les outils sont mutualisés).
- **Objectif réaliste à 12 mois : 1 500-4 000 €/mois** de profit si la niche prend.
- **Mois 1-4 : tu perds de l'argent.** Prévois 600-800 € de trésorerie et 15-20 h/semaine.

### Tes atouts actuels
- **Higgsfield** déjà connecté à Claude (plan gratuit, ~10 crédits — prévoir le plan payant
  ~9-29 $/mois pour les plans "héros" et les images).
- **n8n** déjà connecté → le pipeline TikTok automatisé peut être construit directement.

### Prochaines actions concrètes
1. Valider la niche (histoire/mystères FR ou EN ?)
2. Générer un pilote : script 10 min + 20 images + voix → juger la qualité
3. Construire le workflow n8n TikTok
4. Publier 10 vidéos avant de juger quoi que ce soit

---

## Sources
- [AI Video Generation Cost Per Second Compared (2026) — Soloa](https://soloa.ai/blog/ai-video-generation-cost-per-second-2026)
- [AI Video Generation API Pricing — BuildMVPFast](https://www.buildmvpfast.com/api-costs/ai-video)
- [Runway AI Pricing 2026 — Somake](https://www.somake.ai/blog/runway-ai-pricing)
- [Made for Kids YouTube: How to Make Money in 2026 — vidIQ](https://vidiq.com/blog/post/make-money-kids-youtube-channel/)
- [Made for Kids Monetization Rules — Subscribr](https://subscribr.ai/p/youtube-made-for-kids-monetization-rules)
- [YouTube Monetization Policy Update July 2025 — Fliki](https://fliki.ai/blog/youtube-monetization-policy-2025)
- [YouTube AI Monetization Policy 2025 — Knolli](https://www.knolli.ai/post/youtube-ai-monetization-policy-2025)
- [TikTok Creator Rewards RPM 2026 — FluxNote](https://fluxnote.io/guides/tiktok-creator-rewards-program-rpm)
- [How Much Does TikTok Pay in 2026 — DemandSage](https://www.demandsage.com/how-much-do-you-get-paid-on-tiktok/)
- [Faceless TikTok Monetization 2026 — ShortsFast](https://shortsfast.com/blog/faceless-tiktok-monetization-2026)
- [Step-by-Step Long-Form YouTube Videos Using AI — Medium](https://medium.com/the-ai-studio/step-by-step-guide-to-creating-long-form-youtube-videos-using-ai-tools-b998af26320a)
