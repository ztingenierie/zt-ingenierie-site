"""Configuration du moteur de génération, pilotée par variables d'environnement."""
import os
from dataclasses import dataclass


@dataclass
class Settings:
    # Modèle à charger : "ltx" (défaut, léger, t2v + i2v) ou "wan" (t2v).
    model: str = os.getenv("ENGINE_MODEL", "ltx").lower()

    ltx_repo: str = os.getenv("LTX_REPO", "Lightricks/LTX-Video")
    wan_repo: str = os.getenv("WAN_REPO", "Wan-AI/Wan2.1-T2V-1.3B-Diffusers")

    # Active l'offload CPU + tiling VAE pour tenir dans ~16 Go de VRAM
    # (indispensable sur RX 9070 XT / RTX 4060 Ti 16G, etc.).
    low_vram: bool = os.getenv("LOW_VRAM", "1") == "1"

    fps: int = int(os.getenv("ENGINE_FPS", "24"))
    steps: int = int(os.getenv("ENGINE_STEPS", "40"))
    max_frames: int = int(os.getenv("MAX_FRAMES", "161"))

    output_dir: str = os.getenv("OUTPUT_DIR", "outputs")
    host: str = os.getenv("ENGINE_HOST", "0.0.0.0")
    port: int = int(os.getenv("ENGINE_PORT", "8000"))


settings = Settings()
