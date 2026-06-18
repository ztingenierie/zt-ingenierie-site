# ZT Video Studio 🎬

Générateur de vidéos IA à partir d'un prompt et/ou d'une ou plusieurs images —
une application web dans l'esprit de [Higgsfield](https://higgsfield.ai), avec
**ton propre moteur de génération auto-hébergé**.

Deux façons de générer, au choix (variable `VIDEO_PROVIDER`) :

1. **`selfhost` — ton propre moteur** (dossier [`engine/`](./engine)) : un modèle
   **open-weight** (LTX-Video / Wan) tourne sur **ton GPU**, aucune API tierce.
   C'est le mode « comme Kling, mais à toi ».
2. **`fal`** — orchestration de modèles hébergés (Veo 3.1, Kling, Seedance…) via
   l'API fal.ai, à la manière de Higgsfield.
3. **`mock`** — démo gratuite sans clé ni GPU, pour tester toute l'interface.

> ⚠️ Honnêteté : entraîner *de zéro* un modèle équivalent à Kling/Seedance
> (des milliards de paramètres, des milliers de GPU, des mois) n'est pas réaliste
> en solo. Le mode `selfhost` te donne la vraie alternative : **héberger** et
> contrôler un modèle open-weight de haute qualité — le générateur t'appartient.

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

## 🧠 Mode `selfhost` — ton propre moteur (recommandé)

Fais tourner un vrai modèle open-weight sur ta machine. Tout est dans
[`engine/`](./engine/README.md).

1. Lance le moteur Python :
   ```bash
   cd engine
   # installe torch adapté à ton GPU (CUDA ou ROCm) — voir engine/README.md
   pip install -r requirements.txt
   python app.py          # -> http://localhost:8000
   ```
2. Dans `.env.local` (racine) :
   ```env
   VIDEO_PROVIDER=selfhost
   ENGINE_URL=http://localhost:8000
   ```
3. `npm run dev`, et génère depuis l'interface.

Matériel : LTX-Video tient dans ~16 Go de VRAM (`LOW_VRAM=1`). Sur AMD RX 9070 XT
il faut Linux + ROCm (voir notes dans `engine/README.md`) ; sinon un GPU cloud
NVIDIA (RunPod/Vast, ~0,20–0,40 $/h) est le chemin le plus simple.

## 🔌 Mode `fal` — modèles hébergés (style Higgsfield)

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
