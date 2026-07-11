import json
import inspect

import anthropic

from rag.service import REFUSAL, answer_question, cited_sources


def test_installed_anthropic_sdk_supports_structured_output():
    signature = inspect.signature(anthropic.resources.messages.Messages.create)
    assert "output_config" in signature.parameters


def test_citations_are_limited_to_retrieved_sources():
    chunks = [{"title": "One", "url": "https://collinwilkins.com/articles/one", "heading": "A"}]
    assert cited_sources("Supported [1], invented [2].", chunks) == [chunks[0]]


def test_empty_retrieval_refuses(monkeypatch):
    monkeypatch.setattr("rag.service.retrieve", lambda question: [])
    assert answer_question("unknown") == {"answer": REFUSAL, "sources": [], "refused": True}


def test_answer_without_valid_citation_refuses(monkeypatch):
    monkeypatch.setattr("rag.service.retrieve", lambda question: [{
        "title": "One", "url": "https://collinwilkins.com/articles/one", "heading": "A", "content": "fact"
    }])
    class Messages:
        def create(self, **kwargs):
            return type("Response", (), {"content": [type("Block", (), {"type": "text", "text": "An uncited claim."})()]})()
    class Client:
        messages = Messages()
    monkeypatch.setenv("ANTHROPIC_MODEL", "test-model")
    monkeypatch.setenv("ANTHROPIC_API_KEY", "test-key")
    monkeypatch.setattr("rag.service.anthropic.Anthropic", lambda **kwargs: Client())
    assert answer_question("question")["refused"] is True


def _mock_answer(monkeypatch, answer, chunks=None):
    chunks = chunks or [{
        "title": "One", "url": "https://collinwilkins.com/articles/one", "heading": "A", "content": "fact"
    }]
    monkeypatch.setattr("rag.service.retrieve", lambda question: chunks)

    class Messages:
        def create(self, **kwargs):
            block = type("Block", (), {"type": "text", "text": answer})()
            return type("Response", (), {"content": [block]})()

    class Client:
        messages = Messages()

    monkeypatch.setenv("ANTHROPIC_MODEL", "test-model")
    monkeypatch.setenv("ANTHROPIC_API_KEY", "test-key")
    monkeypatch.setattr("rag.service.anthropic.Anthropic", lambda **kwargs: Client())


def test_mixed_cited_and_uncited_claims_refuse(monkeypatch):
    _mock_answer(monkeypatch, "A supported claim [1]. An unsupported uncited claim.")

    assert answer_question("question") == {"answer": REFUSAL, "sources": [], "refused": True}


def test_invalid_citation_id_refuses(monkeypatch):
    _mock_answer(monkeypatch, json.dumps({
        "refused": False,
        "claims": [{"text": "A claim", "source_indexes": [2]}],
    }))

    assert answer_question("question") == {"answer": REFUSAL, "sources": [], "refused": True}


def test_semicolon_and_colon_free_form_bypasses_refuse(monkeypatch):
    _mock_answer(monkeypatch, "Supported [1]; unsupported claim: another unsupported claim.")

    assert answer_question("question") == {"answer": REFUSAL, "sources": [], "refused": True}


def test_malformed_structured_response_refuses(monkeypatch):
    _mock_answer(monkeypatch, '{"refused": false, "claims": [}')

    assert answer_question("question") == {"answer": REFUSAL, "sources": [], "refused": True}


def test_claim_with_empty_citations_refuses(monkeypatch):
    _mock_answer(monkeypatch, json.dumps({
        "refused": False,
        "claims": [{"text": "A claim", "source_indexes": []}],
    }))

    assert answer_question("question") == {"answer": REFUSAL, "sources": [], "refused": True}


def test_structured_refusal_and_no_claims_refuses(monkeypatch):
    _mock_answer(monkeypatch, json.dumps({"refused": True, "claims": []}))

    assert answer_question("question") == {"answer": REFUSAL, "sources": [], "refused": True}


def test_empty_claim_text_refuses(monkeypatch):
    _mock_answer(monkeypatch, json.dumps({
        "refused": False,
        "claims": [{"text": "   ", "source_indexes": [1]}],
    }))

    assert answer_question("question") == {"answer": REFUSAL, "sources": [], "refused": True}


def test_claim_text_with_forged_out_of_range_citation_refuses(monkeypatch):
    _mock_answer(monkeypatch, json.dumps({
        "refused": False,
        "claims": [{"text": "A claim with a forged citation [999]", "source_indexes": [1]}],
    }))

    assert answer_question("question") == {"answer": REFUSAL, "sources": [], "refused": True}


def test_claim_text_with_forged_in_range_citation_refuses(monkeypatch):
    _mock_answer(monkeypatch, json.dumps({
        "refused": False,
        "claims": [{"text": "A claim with a model-written citation [1]", "source_indexes": [1]}],
    }))

    assert answer_question("question") == {"answer": REFUSAL, "sources": [], "refused": True}


def test_valid_multi_claim_structured_response(monkeypatch):
    chunks = [
        {"title": "One", "url": "https://collinwilkins.com/articles/one", "heading": "A", "content": "one"},
        {"title": "Two", "url": "https://collinwilkins.com/articles/two", "heading": "B", "content": "two"},
    ]
    _mock_answer(monkeypatch, json.dumps({
        "refused": False,
        "claims": [
            {"text": "First claim.", "source_indexes": [1]},
            {"text": "Second claim.", "source_indexes": [2, 1]},
        ],
    }), chunks)

    assert answer_question("question") == {
        "answer": "First claim. [1] Second claim. [2] [1]",
        "sources": [
            {"title": "One", "url": "https://collinwilkins.com/articles/one", "heading": "A"},
            {"title": "Two", "url": "https://collinwilkins.com/articles/two", "heading": "B"},
        ],
        "refused": False,
    }
