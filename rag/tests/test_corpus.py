from pathlib import Path

import pytest

from rag.corpus import PUBLIC_ARTICLES_DIR, build_chunks, published_post_paths


def test_corpus_is_only_public_article_directory():
    paths = published_post_paths()
    assert paths
    assert all(path.parent.resolve() == PUBLIC_ARTICLES_DIR for path in paths)
    assert all(path.suffix == ".md" for path in paths)


def test_alternate_corpus_is_rejected(tmp_path: Path):
    with pytest.raises(ValueError, match="Corpus must be exactly"):
        published_post_paths(tmp_path)


def test_external_article_symlink_is_rejected(tmp_path: Path):
    external = tmp_path / "external.md"
    external.write_text("external article")
    link = PUBLIC_ARTICLES_DIR / "external-symlink-test.md"
    try:
        link.symlink_to(external)
    except (NotImplementedError, OSError) as error:
        pytest.skip(f"Symlinks are not supported: {error}")
    try:
        assert link not in published_post_paths()
    finally:
        link.unlink(missing_ok=True)


def test_chunks_have_public_urls_and_stable_unique_ids():
    first = build_chunks()
    second = build_chunks()
    assert [chunk.id for chunk in first] == [chunk.id for chunk in second]
    assert len({chunk.id for chunk in first}) == len(first)
    assert all(chunk.url.startswith("https://collinwilkins.com/articles/") for chunk in first)


def test_chunk_id_stays_stable_when_article_content_changes(monkeypatch, tmp_path: Path):
    article = tmp_path / "example.md"
    article.write_text("unused")
    body = {"value": "First version"}
    monkeypatch.setattr("rag.corpus.published_post_paths", lambda: [article])
    monkeypatch.setattr("rag.corpus.read_post", lambda path: ({"title": "Example"}, body["value"]))

    first = build_chunks()[0]
    body["value"] = "Edited version"
    second = build_chunks()[0]

    assert first.id == second.id
    assert first.content_hash != second.content_hash
