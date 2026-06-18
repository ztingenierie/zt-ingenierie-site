#!/usr/bin/env bash
# Installe et lance le moteur sur un GPU cloud NVIDIA "nu" (sans Docker),
# par ex. un pod RunPod/Vast basé sur une image PyTorch ou Ubuntu+CUDA.
# Usage :  bash setup_cloud.sh
set -euo pipefail

echo "==> Dépendances système (ffmpeg, git)…"
if command -v apt-get >/dev/null; then
  apt-get update -y
  apt-get install -y --no-install-recommends ffmpeg git python3-pip
fi

# Installe torch CUDA seulement s'il n'est pas déjà présent (les images PyTorch
# l'ont souvent déjà).
if ! python3 -c "import torch" 2>/dev/null; then
  echo "==> Installation de PyTorch (CUDA 12.4)…"
  pip3 install torch torchvision --index-url https://download.pytorch.org/whl/cu124
fi

echo "==> Dépendances du moteur…"
pip3 install -r requirements.txt

echo "==> Vérification GPU :"
python3 -c "import torch; print('CUDA dispo:', torch.cuda.is_available(), '| GPU:', torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'aucun')"

echo "==> Démarrage du moteur sur le port ${ENGINE_PORT:-8000}…"
export ENGINE_HOST=0.0.0.0
python3 app.py
