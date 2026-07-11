from __future__ import annotations

import argparse
import json
from pathlib import Path

from dotenv import load_dotenv

from rag.service import answer_question, retrieve

QUESTIONS = Path(__file__).with_name("questions.json")


def run(k: int, include_answers: bool) -> dict:
    cases = json.loads(QUESTIONS.read_text())
    retrieval_hits = 0
    grounded_answers = 0
    answer_cases = 0
    results = []
    for case in cases:
        chunks = retrieve(case["question"], k=k)
        returned = {chunk["slug"] for chunk in chunks}
        expected = set(case["expected_slugs"])
        hit = (not chunks) if case.get("expect_refusal") else bool(returned & expected)
        retrieval_hits += int(hit)
        row = {"question": case["question"], "retrieval_hit": hit, "retrieved_slugs": sorted(returned)}
        if include_answers:
            result = answer_question(case["question"])
            answer_cases += 1
            cited = all(source["url"].removeprefix("https://collinwilkins.com/articles/") in returned for source in result["sources"])
            grounded = (result["refused"] if case.get("expect_refusal") else bool(result["sources"]) and cited)
            grounded_answers += int(grounded)
            row.update({"answer_grounded": grounded, **result})
        results.append(row)
    return {
        "questions": len(cases),
        "k": k,
        "retrieval_hit_rate_at_k": retrieval_hits / len(cases),
        "answer_groundedness": grounded_answers / answer_cases if answer_cases else None,
        "results": results,
    }


if __name__ == "__main__":
    load_dotenv("rag/.env")
    parser = argparse.ArgumentParser()
    parser.add_argument("--k", type=int, default=6)
    parser.add_argument("--with-answers", action="store_true")
    args = parser.parse_args()
    print(json.dumps(run(args.k, args.with_answers), indent=2))
