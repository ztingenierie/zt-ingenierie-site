# ZT Video Studio 🎬

Générateur de vidéos IA **ultra-réalistes** à partir d'un prompt et/ou d'une ou
plusieurs images — une application web dans l'esprit de
[Higgsfield](https://higgsfield.ai).

L'app n'entraîne pas son propre modèle (impossible sans une infra ML massive) :
comme Higgsfield, elle **orchestre les meilleurs modèles vidéo du marché**
derrière une interface soignée — Google **Veo 3.1**, **Kling 3.0**,
ByteDance **Seedance 2.0**, **Minimax Hailuo**, **Wan**.

## ✨ Fonctionnalités

- **Prompt → vidéo** et **image(s) → vidéo** (image de départ, image de fin, références)
- **5 modèles** de génération sélectionnables, chacun avec ses réglages
- **Mouvements & styles** type Higgsfield (Bullet Time, Crash Zoom, FPV Drone, Cinematic…)
- Réglages : format (16:9, 9:16, 1:1…), durée, résolution, qualité, audio
- **File d'attente + suivi en temps réel** de la progression
- **Galerie** persistante (localStorage), lecture et téléchargement
- Interface sombre, responsive, prête pour le déploiement (Vercel)
- Couche **provider interchangeable** : `mock` (démo gratuite) ou `fal` (génération réelle)

## 🚀 Démarrage

```bash
npm install
cp .env.example .env.local
npm run dev
```

Ouvre http://localhost:3000. Par défaut (`VIDEO_PROVIDER=mock`) l'app est
**100 % fonctionnelle sans clé** : elle simule la génération et renvoie une
vidéo de démo, ce qui permet de tester toute l'expérience.

## 🔌 Activer la génération réelle (fal.ai)

fal.ai héberge exactement les modèles orchestrés par Higgsfield, avec une API
REST documentée.

1. Crée une clé sur https://fal.ai/dashboard/keys
2. Dans `.env.local` :
   ```env
   VIDEO_PROVIDER=fal
   FAL_KEY=ta_cle_fal
   ```
3. Relance `npm run dev`.

> Les schémas de paramètres de fal évoluent. Toute la spécificité fal (endpoints
> + construction des requêtes) est centralisée dans `lib/providers/fal.ts` :
> c'est le seul fichier à ajuster si un modèle change de schéma.

## 🧩 Architecture

```
app/
  page.tsx              Landing + studio
  api/generate/route.ts Soumission d'un job de génération
  api/status/[id]/route.ts  Polling du statut (sans état, serverless-safe)
components/
  Studio.tsx            Tout le studio (prompt, upload, modèles, presets, galerie)
lib/
  models.ts             Catalogue de modèles + mapping endpoints
  presets.ts            Mouvements caméra / styles
  providers/            Couche d'abstraction (types, mock, fal, sélecteur)
```

### Ajouter un provider (Replicate, API Higgsfield…)

Implémente l'interface `VideoProvider` (`lib/providers/types.ts`) — `submit()` et
`status()` — puis branche-le dans `lib/providers/index.ts`. L'ID de job encode
tout le contexte de polling, donc aucun stockage serveur n'est nécessaire.

## ⚖️ Note honnête sur le « comme Higgsfield »

Higgsfield = belle UX + orchestration de modèles vidéo hébergés + crédits.
Cette app reproduit l'UX et l'orchestration. La qualité « ultra-réaliste »
vient des modèles sous-jacents (Veo 3.1, Kling, Seedance…), facturés à l'usage
par le fournisseur (fal.ai). Le mode `mock` permet de tout tester sans coût.
