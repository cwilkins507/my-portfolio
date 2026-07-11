from __future__ import annotations

import os

import modal

from rag.rate_limit import ProcessBurstGuard, consume_deployment_budget


def _bounded_positive_env(name: str, default: int, maximum: int) -> int:
    try:
        return max(1, min(int(os.getenv(name, str(default))), maximum))
    except ValueError:
        return default


# Defense-in-depth for bursts within one container. The authoritative deployment-wide
# hourly ceiling is consumed atomically in Supabase before any paid API request.
burst_guard = ProcessBurstGuard(
    per_minute=_bounded_positive_env("RATE_LIMIT_PER_MINUTE", 20, 100),
)

image = (
    modal.Image.debian_slim(python_version="3.12")
    .pip_install_from_requirements("rag/requirements.txt")
    .add_local_python_source("rag")
)
app = modal.App("ask-collin-blog")


@app.function(image=image, secrets=[modal.Secret.from_name("blog-rag-secrets")], timeout=60)
@modal.concurrent(max_inputs=20)
@modal.asgi_app()
def api():
    from fastapi import FastAPI, HTTPException
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel, Field
    from rag.service import answer_question

    web = FastAPI(title="Ask Collin's Blog", docs_url=None, redoc_url=None)
    origins = [value.strip() for value in os.getenv("ALLOWED_ORIGINS", "https://collinwilkins.com").split(",")]
    web.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["POST"], allow_headers=["Content-Type"])

    class AskRequest(BaseModel):
        question: str = Field(min_length=3, max_length=500)

    @web.get("/health")
    def health():
        return {"status": "ok"}

    @web.post("/ask")
    def ask(request: AskRequest):
        if not burst_guard.allow():
            raise HTTPException(status_code=429, detail="The article assistant's request limit has been reached.")
        try:
            allowed = consume_deployment_budget(
                os.environ["SUPABASE_URL"],
                os.environ["SUPABASE_SERVICE_ROLE_KEY"],
                _bounded_positive_env("GLOBAL_REQUESTS_PER_HOUR", 500, 5000),
            )
        except Exception as error:
            print(f"budget_check_failed: {type(error).__name__}")
            raise HTTPException(status_code=503, detail="The article assistant is temporarily unavailable.") from None
        if not allowed:
            raise HTTPException(status_code=429, detail="The article assistant's request limit has been reached.")
        try:
            return answer_question(request.question.strip())
        except Exception as error:
            print(f"ask_failed: {type(error).__name__}")
            raise HTTPException(status_code=503, detail="The article assistant is temporarily unavailable.") from None

    return web
