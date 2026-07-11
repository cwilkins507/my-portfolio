from __future__ import annotations

import argparse
import json
import os

import httpx
from dotenv import load_dotenv
from openai import OpenAI

from rag.corpus import build_chunks, inventory


def require_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


def ingest(dry_run: bool = False) -> dict:
    chunks = build_chunks()
    report = {"posts": len(inventory()), "chunks": len(chunks), "dry_run": dry_run}
    if dry_run:
        return report

    openai = OpenAI(api_key=require_env("OPENAI_API_KEY"))
    supabase_url = require_env("SUPABASE_URL").rstrip("/")
    service_key = require_env("SUPABASE_SERVICE_ROLE_KEY")
    headers = {"apikey": service_key, "Authorization": f"Bearer {service_key}", "Content-Type": "application/json"}

    records = []
    for start in range(0, len(chunks), 100):
        batch = chunks[start:start + 100]
        response = openai.embeddings.create(
            model="text-embedding-3-small",
            input=[chunk.content for chunk in batch],
            dimensions=1536,
        )
        for chunk, embedding in zip(batch, response.data, strict=True):
            records.append({**chunk.to_record(), "embedding": embedding.embedding})

    with httpx.Client(timeout=60) as client:
        for start in range(0, len(records), 100):
            response = client.post(
                f"{supabase_url}/rest/v1/blog_chunks?on_conflict=slug,chunk_index",
                headers={**headers, "Prefer": "resolution=merge-duplicates"},
                json=records[start:start + 100],
            )
            response.raise_for_status()
        current_ids = {record["id"] for record in records}
        existing = client.get(f"{supabase_url}/rest/v1/blog_chunks?select=id", headers=headers)
        existing.raise_for_status()
        stale_ids = [row["id"] for row in existing.json() if row["id"] not in current_ids]
        for stale_id in stale_ids:
            response = client.delete(f"{supabase_url}/rest/v1/blog_chunks?id=eq.{stale_id}", headers=headers)
            response.raise_for_status()
    return {**report, "stale_deleted": len(stale_ids)}


if __name__ == "__main__":
    load_dotenv("rag/.env")
    parser = argparse.ArgumentParser(description="Index the public src/articles corpus.")
    parser.add_argument("--dry-run", action="store_true", help="Inventory and chunk without external calls.")
    args = parser.parse_args()
    print(json.dumps(ingest(args.dry_run), indent=2))
