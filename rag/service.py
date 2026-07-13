from __future__ import annotations

import json
import os
import re

import anthropic
import httpx
from openai import OpenAI

REFUSAL = "I couldn't find enough support in the published articles to answer that without guessing."
SYSTEM_PROMPT = """Answer only from the supplied excerpts from Collin Wilkins's published articles.
Return atomic factual claims, each supported by one or more supplied source indexes.
Do not combine supported and unsupported statements in one claim. If the excerpts do not support an answer,
set refused to true and return no claims. Never use outside knowledge."""

ANSWER_SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "required": ["refused", "claims"],
    "properties": {
        "refused": {"type": "boolean"},
        "claims": {
            "type": "array",
            "items": {
                "type": "object",
                "additionalProperties": False,
                "required": ["text", "source_indexes"],
                "properties": {
                    "text": {"type": "string", "minLength": 1},
                    "source_indexes": {
                        "type": "array",
                        "minItems": 1,
                        "items": {"type": "integer", "minimum": 1},
                    },
                },
            },
        },
    },
}


def require_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


def retrieve(question: str, k: int = 6) -> list[dict]:
    embedding = OpenAI(api_key=require_env("OPENAI_API_KEY")).embeddings.create(
        model="text-embedding-3-small", input=question, dimensions=1536
    ).data[0].embedding
    key = require_env("SUPABASE_SERVICE_ROLE_KEY")
    response = httpx.post(
        f"{require_env('SUPABASE_URL').rstrip('/')}/rest/v1/rpc/match_blog_chunks",
        headers={"apikey": key, "Authorization": f"Bearer {key}"},
        json={
            "query_embedding": embedding,
            "match_count": min(k, 10),
            "similarity_threshold": float(os.getenv("MIN_SIMILARITY", "0.45")),
        },
        timeout=30,
    )
    response.raise_for_status()
    return response.json()


def cited_sources(answer: str, chunks: list[dict]) -> list[dict]:
    indexes = sorted({int(value) for value in re.findall(r"\[(\d+)\]", answer)})
    sources = []
    seen = set()
    for index in indexes:
        if 1 <= index <= len(chunks):
            chunk = chunks[index - 1]
            if chunk["url"] not in seen:
                seen.add(chunk["url"])
                sources.append({"title": chunk["title"], "url": chunk["url"], "heading": chunk["heading"]})
    return sources


def render_claims(payload: object, chunk_count: int) -> str | None:
    """Validate a structured model response and render allowlisted citations."""
    if not isinstance(payload, dict) or set(payload) != {"refused", "claims"}:
        return None
    if not isinstance(payload["refused"], bool) or not isinstance(payload["claims"], list):
        return None
    claims = payload["claims"]
    if payload["refused"] or not claims:
        return None
    rendered = []
    for claim in claims:
        if not isinstance(claim, dict) or set(claim) != {"text", "source_indexes"}:
            return None
        text = claim["text"]
        indexes = claim["source_indexes"]
        if not isinstance(text, str) or not text.strip() or not isinstance(indexes, list) or not indexes:
            return None
        if re.search(r"\[\d+\]", text):
            return None
        if any(type(index) is not int or not 1 <= index <= chunk_count for index in indexes):
            return None
        citations = " ".join(f"[{index}]" for index in dict.fromkeys(indexes))
        rendered.append(f"{text.strip()} {citations}")
    return " ".join(rendered)


def answer_question(question: str) -> dict:
    chunks = retrieve(question)
    if not chunks:
        return {"answer": REFUSAL, "sources": [], "refused": True}
    context = "\n\n".join(
        f"[{i}] {chunk['title']} — {chunk['heading']}\nURL: {chunk['url']}\n{chunk['content']}"
        for i, chunk in enumerate(chunks, 1)
    )
    model = require_env("ANTHROPIC_MODEL")
    message = anthropic.Anthropic(api_key=require_env("ANTHROPIC_API_KEY")).messages.create(
        model=model,
        max_tokens=700,
        temperature=0,
        system=SYSTEM_PROMPT,
        output_config={"format": {"type": "json_schema", "schema": ANSWER_SCHEMA}},
        messages=[{"role": "user", "content": f"Question: {question}\n\nPublished article excerpts:\n{context}\n\nRefusal sentence: {REFUSAL}"}],
    )
    raw_answer = "".join(block.text for block in message.content if block.type == "text").strip()
    if raw_answer == REFUSAL:
        return {"answer": REFUSAL, "sources": [], "refused": True}
    try:
        payload = json.loads(raw_answer)
    except (json.JSONDecodeError, TypeError):
        return {"answer": REFUSAL, "sources": [], "refused": True}
    answer = render_claims(payload, len(chunks))
    if answer is None:
        return {"answer": REFUSAL, "sources": [], "refused": True}
    sources = cited_sources(answer, chunks)
    return {"answer": answer, "sources": sources, "refused": False}
