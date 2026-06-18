"""File d'attente de jobs en mémoire, traitée par un worker en arrière-plan.

Un seul worker = un seul GPU traité séquentiellement. La génération vidéo est
lente (plusieurs dizaines de secondes), donc l'API répond immédiatement avec un
id de job et le client interroge /status.
"""
import queue
import threading
import traceback
import uuid
from dataclasses import dataclass
from typing import Callable, Optional


@dataclass
class Job:
    id: str
    params: dict
    state: str = "queued"  # queued | processing | completed | failed
    progress: int = 0
    video_path: Optional[str] = None
    error: Optional[str] = None


_jobs: dict[str, Job] = {}
_lock = threading.Lock()
_queue: "queue.Queue[str]" = queue.Queue()
_worker_started = False


def submit(params: dict) -> Job:
    job_id = params.get("id") or uuid.uuid4().hex
    params["id"] = job_id
    job = Job(id=job_id, params=params)
    with _lock:
        _jobs[job_id] = job
    _queue.put(job_id)
    _ensure_worker()
    return job


def get(job_id: str) -> Optional[Job]:
    with _lock:
        return _jobs.get(job_id)


def _ensure_worker() -> None:
    global _worker_started
    with _lock:
        if _worker_started:
            return
        _worker_started = True
    threading.Thread(target=_worker_loop, daemon=True).start()


def _worker_loop() -> None:
    # Import tardif : ne charge torch/diffusers qu'au premier job.
    from pipeline import generate

    while True:
        job_id = _queue.get()
        job = get(job_id)
        if job is None:
            continue
        try:
            job.state = "processing"
            job.progress = 5

            def on_progress(p: int, _job: Job = job) -> None:
                _job.progress = max(_job.progress, min(99, p))

            job.video_path = generate(job.params, on_progress)
            job.state = "completed"
            job.progress = 100
        except Exception as exc:  # noqa: BLE001
            job.error = str(exc)
            job.state = "failed"
            traceback.print_exc()
        finally:
            _queue.task_done()
