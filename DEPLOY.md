# 🚀 Guide de déploiement — tester ton générateur (Mac + GPU cloud)

Tu es sur **Mac M5 Air** (pas de GPU NVIDIA), donc on sépare en deux :

```
   TON MAC                                  GPU CLOUD LOUÉ (NVIDIA)
 ┌────────────────────┐   internet      ┌──────────────────────────┐
 │  Interface web      │ ───────────────▶│  Moteur (engine/)         │
 │  (Next.js, npm dev) │   ENGINE_URL    │  LTX-Video sur le GPU     │
 │  http://localhost   │◀─────────────── │  https://...runpod.net    │
 └────────────────────┘   vidéo .mp4     └──────────────────────────┘
```

Le **moteur** (qui a besoin du GPU) tourne dans le cloud. L'**interface** tourne
sur ton Mac (ou tu peux même tester sans, voir la Partie 2).

> 💡 Tu paies le GPU **à l'heure, uniquement quand le pod tourne**. Pense à
> **arrêter le pod** après tes tests (voir la fin du guide).

---

## ✅ Ce qu'il te faut
- Une carte bancaire pour créditer le cloud (compte ~5–10 $ suffit pour tester).
- 15 minutes.

---

## PARTIE 1 — Lancer le moteur sur un GPU loué (RunPod)

RunPod est le plus simple pour débuter. (Vast.ai marche aussi, voir tout en bas.)

### 1. Crée un compte et ajoute du crédit
1. Va sur **https://runpod.io** → *Sign up*.
2. Menu **Billing** → ajoute ~10 $ de crédit.

### 2. Déploie un pod GPU
1. Menu **Pods** → **Deploy**.
2. Choisis un GPU : **RTX 4090 (24 Go)** — ~0,34 $/h, parfait pour LTX-Video.
   (Une RTX 3090 24 Go un peu moins chère marche aussi.)
3. Template : choisis **« RunPod PyTorch »** (PyTorch + CUDA déjà installés).
4. Clique **Edit Template** (ou *Customize*) et règle :
   - **Container Disk** : 30 Go (les poids du modèle font plusieurs Go).
   - **Expose HTTP Ports** : ajoute **`8000`**.  ⬅️ très important
5. **Deploy On-Demand**. Attends que le pod passe en *Running*.

### 3. Récupère le code et lance le moteur
1. Sur la carte du pod → **Connect** → **Start Web Terminal** (ou *Connect to
   Jupyter Lab* → ouvre un terminal).
2. Dans le terminal, récupère le projet. Le dépôt est privé, il te faut un
   **token GitHub** (lecture seule) :
   - Sur GitHub : *Settings → Developer settings → Personal access tokens →
     Fine-grained tokens → Generate*. Donne-lui accès en **lecture** au dépôt
     `ztingenierie/zt-ingenierie-site`. Copie le token (commence par `github_pat_…`).
   - Puis, dans le terminal du pod (remplace `LE_TOKEN`) :
     ```bash
     cd /workspace
     git clone -b claude/higgsfield-video-generator-kijkm1 \
       https://LE_TOKEN@github.com/ztingenierie/zt-ingenierie-site.git
     cd zt-ingenierie-site/engine
     ```
3. Installe et démarre :
   ```bash
   bash setup_cloud.sh
   ```
   Le premier lancement **télécharge le modèle** (quelques Go, ~2–5 min). Quand tu
   vois `Uvicorn running on http://0.0.0.0:8000`, c'est prêt.

### 4. Récupère l'URL publique du moteur
1. Sur la carte du pod → **Connect** → clique le port **8000** (HTTP).
2. RunPod ouvre une URL du type :
   ```
   https://abcd1234-8000.proxy.runpod.net
   ```
   **Garde cette URL** — c'est ton `ENGINE_URL`.
3. Vérifie que le moteur répond : ouvre `…proxy.runpod.net/health` dans ton
   navigateur. Tu dois voir `"status":"ok"` et le nom du GPU.

---

## PARTIE 2 — Test rapide SANS rien installer sur le Mac (recommandé pour débuter)

Le moteur fournit une page de test automatique (Swagger) :

1. Ouvre **`https://…proxy.runpod.net/docs`** dans ton navigateur.
2. Déplie **POST `/generate`** → **Try it out**, mets par ex. :
   ```json
   { "prompt": "a cinematic drone shot over snowy mountains at sunrise", "aspect_ratio": "16:9", "duration": 5 }
   ```
   → **Execute**. Tu reçois un `id`.
3. Déplie **GET `/status/{job_id}`**, colle l'`id`, **Execute**, et réexécute
   toutes les ~10 s jusqu'à `"state":"completed"` (la 1ère génération est plus
   lente, le modèle se met en mémoire).
4. La réponse contient `video_url` (ex. `/outputs/xxx.mp4`). Ouvre
   `https://…proxy.runpod.net/outputs/xxx.mp4` → **ta vidéo générée** 🎬.

Si ça marche ici, ton générateur fonctionne. La Partie 3 ajoute la belle interface.

---

## PARTIE 3 — L'interface complète sur ton Mac

### 1. Installe les outils (une seule fois)
- **Node.js** : https://nodejs.org (version LTS) — ou via Homebrew :
  ```bash
  brew install node git
  ```

### 2. Récupère le projet sur le Mac
```bash
git clone -b claude/higgsfield-video-generator-kijkm1 \
  https://github.com/ztingenierie/zt-ingenierie-site.git
cd zt-ingenierie-site
npm install
```

### 3. Connecte l'interface au moteur cloud
```bash
cp .env.example .env.local
```
Ouvre `.env.local` et mets (avec TON URL RunPod) :
```env
VIDEO_PROVIDER=selfhost
ENGINE_URL=https://abcd1234-8000.proxy.runpod.net
```

### 4. Lance
```bash
npm run dev
```
Ouvre **http://localhost:3000**, écris un prompt (et/ou dépose une image), clique
**Générer**. La vidéo apparaît dans la galerie quand c'est prêt.

---

## 💸 Coûts & arrêt (important !)

- Tu paies **tant que le pod est *Running*** (~0,34 $/h sur 4090).
- Après tes tests : RunPod → **Pods** → ton pod → **Stop**.
  - **Stop** : garde le disque (et le modèle téléchargé), petit coût de stockage,
    redémarrage rapide.
  - **Terminate** : tout supprimé, plus aucun coût (il faudra tout réinstaller).

---

## 🛠️ Dépannage

| Problème | Solution |
|---|---|
| `/health` injoignable | Le port 8000 n'est pas exposé en HTTP, ou le moteur n'a pas fini de démarrer. |
| Génération bloquée à 0 % | 1ère génération = chargement du modèle (lent). Patiente, regarde les logs du terminal du pod. |
| `CUDA out of memory` | Garde `LOW_VRAM=1` (défaut), baisse `MAX_FRAMES` (ex. `export MAX_FRAMES=121`) ou prends un GPU ≥24 Go. |
| L'interface dit « Statut indisponible » | Vérifie `ENGINE_URL` dans `.env.local` (sans `/` final) et que le pod tourne. |
| Vidéo ne se charge pas dans la galerie | Le pod a été arrêté entre-temps : les fichiers `/outputs` disparaissent à l'arrêt. |

---

## Alternative : Vast.ai (souvent moins cher)
1. https://vast.ai → crédite le compte.
2. Loue une instance avec image **`pytorch/pytorch`** (CUDA), GPU ≥24 Go.
3. Dans **Docker options**, expose le port `8000` (`-p 8000:8000`).
4. Connecte-toi en SSH, puis mêmes étapes qu'en Partie 1.3 (`git clone` + `bash setup_cloud.sh`).
5. Récupère l'IP:port public fournis par Vast → c'est ton `ENGINE_URL`.

## Alternative avancée : Docker
Le dossier `engine/` contient un `Dockerfile`. Si tu sais utiliser un registre
Docker (ou un service qui build depuis le repo), tu peux construire l'image et la
déployer telle quelle ; elle écoute sur le port 8000.
