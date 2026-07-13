from __future__ import annotations

import hashlib
import re
from dataclasses import dataclass, asdict
from pathlib import Path

import yaml

PROJECT_ROOT = Path(__file__).resolve().parents[1]
PUBLIC_ARTICLES_DIR = (PROJECT_ROOT / "src" / "articles").resolve()
PUBLIC_BASE_URL = "https://collinwilkins.com/articles"


@dataclass(frozen=True)
class Chunk:
    id: str
    slug: str
    title: str
    url: str
    heading: str
    content: str
    chunk_index: int
    content_hash: str

    def to_record(self) -> dict:
        return asdict(self)


def published_post_paths(directory: Path = PUBLIC_ARTICLES_DIR) -> list[Path]:
    """Return only Markdown files directly inside the public article source directory."""
    directory = directory.resolve()
    if directory != PUBLIC_ARTICLES_DIR:
        raise ValueError(f"Corpus must be exactly {PUBLIC_ARTICLES_DIR}")
    return sorted(
        path
        for path in directory.glob("*.md")
        if not path.is_symlink()
        and path.is_file()
        and path.resolve().parent == PUBLIC_ARTICLES_DIR
    )


def inventory() -> list[dict]:
    posts = []
    for path in published_post_paths():
        metadata, _ = read_post(path)
        posts.append({
            "slug": path.stem,
            "title": metadata.get("title", path.stem),
            "date": str(metadata.get("date", "")),
            "url": f"{PUBLIC_BASE_URL}/{path.stem}",
            "source": str(path.relative_to(PROJECT_ROOT)),
        })
    return posts


def read_post(path: Path) -> tuple[dict, str]:
    raw = path.read_text(encoding="utf-8")
    if not raw.startswith("---\n"):
        return {}, raw
    parts = raw.split("---\n", 2)
    if len(parts) != 3:
        return {}, raw
    return yaml.safe_load(parts[1]) or {}, parts[2].lstrip()


def _sections(markdown: str) -> list[tuple[str, str]]:
    heading = "Introduction"
    buffer: list[str] = []
    sections: list[tuple[str, str]] = []
    for line in markdown.splitlines():
        match = re.match(r"^#{1,3}\s+(.+?)\s*$", line)
        if match:
            if "\n".join(buffer).strip():
                sections.append((heading, "\n".join(buffer).strip()))
            heading, buffer = match.group(1), []
        else:
            buffer.append(line)
    if "\n".join(buffer).strip():
        sections.append((heading, "\n".join(buffer).strip()))
    return sections


def _window(text: str, max_chars: int = 1400, overlap_chars: int = 180) -> list[str]:
    paragraphs = [p.strip() for p in re.split(r"\n\s*\n", text) if p.strip()]
    chunks: list[str] = []
    current = ""
    for paragraph in paragraphs:
        if len(paragraph) > max_chars:
            if current:
                chunks.append(current)
                current = ""
            start = 0
            while start < len(paragraph):
                chunks.append(paragraph[start:start + max_chars].strip())
                start += max_chars - overlap_chars
            continue
        candidate = f"{current}\n\n{paragraph}".strip()
        if current and len(candidate) > max_chars:
            chunks.append(current)
            overlap = current[-overlap_chars:].lstrip()
            current = f"{overlap}\n\n{paragraph}".strip()
        else:
            current = candidate
    if current:
        chunks.append(current)
    return chunks


def build_chunks() -> list[Chunk]:
    chunks: list[Chunk] = []
    for path in published_post_paths():
        metadata, content = read_post(path)
        slug = path.stem
        title = str(metadata.get("title", slug))
        index = 0
        for heading, section in _sections(content):
            for text in _window(section):
                content = f"{title}\n{heading}\n{text}".strip()
                digest = hashlib.sha256(content.encode()).hexdigest()
                chunks.append(Chunk(
                    # Chunk identity describes its stable source position. Content changes
                    # are tracked separately so an edit updates instead of conflicting
                    # with the unique (slug, chunk_index) database constraint.
                    id=hashlib.sha256(f"{slug}:{index}".encode()).hexdigest(),
                    slug=slug,
                    title=title,
                    url=f"{PUBLIC_BASE_URL}/{slug}",
                    heading=heading,
                    content=content,
                    chunk_index=index,
                    content_hash=digest,
                ))
                index += 1
    return chunks
