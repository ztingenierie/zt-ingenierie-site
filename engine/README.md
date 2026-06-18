# ZT Video Engine 🧠

Moteur de génération vidéo **auto-hébergé**. Il charge un modèle **open-weight**
(les poids tournent sur **ta** machine, aucune API tierce) et expose une petite
API HTTP que le front-end ZT Video Studio appelle.

- **Modèle par défaut : LTX-Video** (Lightricks) — léger, rapide, gère
  texte→vidéo **et** image→vidéo, tient dans ~16 Go de VRAM avec offload.
- **Alternative : Wan 2.1** (texte→vidéo).
- **GPU-agnostique** : fonctionne sur NVIDIA (CUDA) comme sur AMD (ROCm).

---

## 1. Installer PyTorch adapté à ton GPU (à faire EN PREMIER)

### NVIDIA (cloud RunPod/Vast, ou carte locale) — le plus simple
```bash
python -m venv .venv && source .venv/bin/activate
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu124
```

### AMD Radeon RX 9070 XT (RDNA 4) — Linux + ROCm uniquement
ROCm ne fonctionne **pas** sous Windows pour ça : utilise **Linux** (Ubuntu 24.04).
La RDNA 4 est récente — il faut une build ROCm ≥ 6.2/6.3 et parfois forcer la
version d'architecture :
```bash
python -m venv .venv && source .venv/bin/activate
pip install torch torchvision --index-url https://download.pytorch.org/whl/rocm6.2
# Si la 9070 XT n'est pas reconnue, force la cible RDNA :
export HSA_OVERRIDE_GFX_VERSION=12.0.0
```
> Si ROCm te bloque (RDNA 4 reste bleeding-edge début 2026), bascule sur un GPU
> cloud NVIDIA : c'est plus rapide à mettre en route et souvent moins cher en temps.

## 2. Installer les dépendances du moteur
```bash
pip install -r requirements.txt
```

## 3. Lancer le moteur
```bash
# 16 Go de VRAM (9070 XT, 4060 Ti 16G…) : garde LOW_VRAM=1 (défaut)
python app.py
# -> http://localhost:8000  (vérifie /health pour voir le GPU détecté)
```

Le premier lancement télécharge les poids du modèle (plusieurs Go).

## Configuration (variables d'environnement)

| Variable | Défaut | Description |
|---|---|---|
| `ENGINE_MODEL` | `ltx` | `ltx` (t2v + i2v) ou `wan` (t2v) |
| `LOW_VRAM` | `1` | Offload CPU + tiling VAE (indispensable ≤16 Go) |
| `ENGINE_STEPS` | `40` | Étapes de diffusion (qualité ↔ vitesse) |
| `ENGINE_FPS` | `24` | Images/seconde de sortie |
| `MAX_FRAMES` | `161` | Plafond de durée (161 ≈ 6–7 s à 24 fps) |
| `LTX_REPO` | `Lightricks/LTX-Video` | Dépôt HF du modèle LTX |
| `WAN_REPO` | `Wan-AI/Wan2.1-T2V-1.3B-Diffusers` | Dépôt HF Wan |
| `ENGINE_PORT` | `8000` | Port d'écoute |

## Brancher le front-end

Dans le `.env.local` du projet Next.js (racine) :
```env
VIDEO_PROVIDER=selfhost
ENGINE_URL=http://localhost:8000
```

## Options cloud les moins chères (sans GPU local viable)

- **RunPod** / **Vast.ai** : RTX 3090 ou 4090 (24 Go) à ~0,20–0,40 $/h. Choisis
  un template PyTorch CUDA, clone le repo, suis les étapes NVIDIA ci-dessus.
- Lance le moteur, expose le port 8000, et pointe `ENGINE_URL` dessus.
