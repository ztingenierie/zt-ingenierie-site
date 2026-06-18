"""API HTTP du moteur de génération vidéo auto-hébergé.

Endpoints :
  POST /generate        -> { id }
  GET  /status/{id}     -> { id, state, progress, video_url?, error? }
  GET  /outputs/{file}  -> fichier mp4 généré
  GET  /health          -> état + device
"""
import base64
import os
import re
import uuid

import jobs
from config import settings
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI(title="ZT Video Engine")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs(settings.output_dir, exist_ok=True)
app.mount("/outputs", StaticFiles(directory=settings.output_dir), name="outputs")


class GenRequest(BaseModel):
    prompt: str = ""
    image: str | None = None  # data URL (data:image/...;base64,...) ou base64 brut
    aspect_ratio: str = "16:9"
    duration: float = 5


def _save_image(data: str, job_id: str) -> str:
    match = re.match(r"^data:(image/\w+);base64,(.*)$", data, re.DOTALL)
    payload = match.group(2) if match else data
    raw = base64.b64decode(payload)
    path = os.path.join(settings.output_dir, f"{job_id}_input.png")
    with open(path, "wb") as f:
        f.write(raw)
    return path


@app.get("/health")
def health():
    try:
        import torch

        device = "cuda" if torch.cuda.is_available() else "cpu"
        name = torch.cuda.get_device_name(0) if torch.cuda.is_available() else "cpu"
    except Exception:  # noqa: BLE001
        device, name = "unknown", "torch indisponible"
    return {
        "status": "ok",
        "model": settings.model,
        "device": device,
        "gpu": name,
        "low_vram": settings.low_vram,
    }


@app.post("/generate")
def generate(req: GenRequest):
    if not req.prompt.strip() and not req.image:
        raise HTTPException(400, "Fournis au moins un prompt ou une image.")

    job_id = uuid.uuid4().hex
    image_path = _save_image(req.image, job_id) if req.image else None

    job = jobs.submit(
        {
            "id": job_id,
            "prompt": req.prompt,
            "image_path": image_path,
            "aspect_ratio": req.aspect_ratio,
            "duration": req.duration,
        }
    )
    return {"id": job.id}


@app.get("/status/{job_id}")
def status(job_id: str):
    job = jobs.get(job_id)
    if job is None:
        raise HTTPException(404, "Job introuvable.")
    video_url = None
    if job.video_path:
        video_url = f"/outputs/{os.path.basename(job.video_path)}"
    return {
        "id": job.id,
        "state": job.state,
        "progress": job.progress,
        "video_url": video_url,
        "error": job.error,
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host=settings.host, port=settings.port)
