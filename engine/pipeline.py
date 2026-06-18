"""Chargement du modèle open-weight et génération vidéo via diffusers.

Modèle par défaut : LTX-Video (Lightricks) — léger (tient en ~16 Go avec offload),
rapide, et gère à la fois texte→vidéo et image→vidéo.
Alternative : Wan 2.1 (texte→vidéo).

Le code est GPU-agnostique : il utilise le backend torch installé (CUDA pour
NVIDIA, ROCm/HIP pour AMD — qui s'expose aussi via `torch.cuda`).
"""
import os
from typing import Callable, Optional

from config import settings

_pipe = None
_pipe_key: Optional[str] = None

# Presets de résolution (multiples de 32, requis par les modèles).
_DIMS = {
    "16:9": (768, 448),
    "9:16": (448, 768),
    "1:1": (512, 512),
    "4:3": (640, 480),
    "3:4": (480, 640),
    "21:9": (896, 384),
}

_DEFAULT_NEGATIVE = (
    "worst quality, inconsistent motion, blurry, jittery, distorted, "
    "low resolution, deformed, watermark"
)


def _device_dtype():
    import torch

    if torch.cuda.is_available():  # vrai aussi pour ROCm/HIP
        return "cuda", torch.bfloat16
    if getattr(torch.backends, "mps", None) and torch.backends.mps.is_available():
        return "mps", torch.float16
    return "cpu", torch.float32


def _dims(aspect: str) -> tuple[int, int]:
    return _DIMS.get(aspect, _DIMS["16:9"])


def _frames(duration: float) -> int:
    # LTX/Wan attendent un nombre d'images de la forme 8k+1.
    raw = int(round(duration * settings.fps))
    n = (raw // 8) * 8 + 1
    return max(25, min(settings.max_frames, n))


def _load(kind: str):
    """kind = 't2v' ou 'i2v'. Charge (et met en cache) le pipeline adéquat."""
    global _pipe, _pipe_key
    key = f"{settings.model}:{kind}"
    if _pipe is not None and _pipe_key == key:
        return _pipe

    import torch

    device, dtype = _device_dtype()

    if settings.model == "ltx":
        if kind == "i2v":
            from diffusers import LTXImageToVideoPipeline as Pipe
        else:
            from diffusers import LTXPipeline as Pipe
        pipe = Pipe.from_pretrained(settings.ltx_repo, torch_dtype=dtype)

    elif settings.model == "wan":
        if kind == "i2v":
            raise RuntimeError(
                "Le modèle Wan configuré ici ne gère que le texte→vidéo. "
                "Utilise ENGINE_MODEL=ltx pour l'image→vidéo."
            )
        from diffusers import AutoencoderKLWan, WanPipeline

        vae = AutoencoderKLWan.from_pretrained(
            settings.wan_repo, subfolder="vae", torch_dtype=torch.float32
        )
        pipe = WanPipeline.from_pretrained(
            settings.wan_repo, vae=vae, torch_dtype=dtype
        )
    else:
        raise RuntimeError(f"ENGINE_MODEL inconnu : {settings.model}")

    if settings.low_vram:
        pipe.enable_model_cpu_offload()
        try:
            pipe.vae.enable_tiling()
        except Exception:  # noqa: BLE001
            pass
    else:
        pipe.to(device)

    _pipe, _pipe_key = pipe, key
    return pipe


def generate(params: dict, on_progress: Callable[[int], None]) -> str:
    """Génère une vidéo et renvoie le chemin du fichier .mp4 produit."""
    from diffusers.utils import export_to_video, load_image

    prompt = (params.get("prompt") or "").strip()
    image_path = params.get("image_path")
    duration = float(params.get("duration") or 5)
    aspect = params.get("aspect_ratio") or "16:9"

    kind = "i2v" if image_path else "t2v"
    pipe = _load(kind)

    width, height = _dims(aspect)
    num_frames = _frames(duration)
    steps = settings.steps

    def _cb(_pipe, step: int, _timestep, kwargs):
        on_progress(int(5 + (step / max(1, steps)) * 90))
        return kwargs

    call = dict(
        prompt=prompt or "a high quality, detailed, cinematic video",
        negative_prompt=_DEFAULT_NEGATIVE,
        width=width,
        height=height,
        num_frames=num_frames,
        num_inference_steps=steps,
        callback_on_step_end=_cb,
    )
    if kind == "i2v":
        call["image"] = load_image(image_path)

    result = pipe(**call)
    frames = result.frames[0]

    os.makedirs(settings.output_dir, exist_ok=True)
    out_path = os.path.join(settings.output_dir, f"{params['id']}.mp4")
    export_to_video(frames, out_path, fps=settings.fps)
    return out_path
