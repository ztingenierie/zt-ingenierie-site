# Image du moteur de génération vidéo, prête pour un GPU cloud NVIDIA
# (RunPod, Vast.ai, Lambda...). Base CUDA 12.4 + cuDNN.
FROM nvidia/cuda:12.4.1-cudnn-runtime-ubuntu22.04

ENV DEBIAN_FRONTEND=noninteractive \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    ENGINE_HOST=0.0.0.0 \
    ENGINE_PORT=8000 \
    LOW_VRAM=1 \
    HF_HOME=/workspace/hf-cache

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip ffmpeg git ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# PyTorch build CUDA (les wheels embarquent les libs CUDA nécessaires).
RUN pip3 install --upgrade pip \
    && pip3 install torch torchvision --index-url https://download.pytorch.org/whl/cu124

COPY requirements.txt .
RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["python3", "app.py"]
