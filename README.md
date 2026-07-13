# collinwilkins.com

Static Astro portfolio and article archive. Production deploys to GitHub Pages from `main`.

## Public article search and FAQ

The `/articles` page provides client-side search across public article titles, excerpts, tags, headings, body text, and FAQs. Search uses loose OR matching and light word-stem normalization; empty and one-character queries render no search results while the normal archive remains visible. Every article renders a visible FAQ section backed by the same data used for `FAQPage` JSON-LD, and `/faq` provides a searchable directory of all questions.

```bash
npm run test:content-search
npm run build
npm run test:built-faqs
```

The search index is built only from `src/articles`. Articles without legacy FAQ frontmatter use the grounded question registry in `src/data/faqQuestions.js` and answers extracted from their matching public article sections.

## Ask my blog: local vertical slice

The RAG slice answers questions over the same 47 Markdown files that generate the public `/articles/*` routes. It never scans the Obsidian vault. The only corpus entry point is the hard-coded, exact path `src/articles`, and tests reject alternate directories.

```text
src/articles/*.md
      │ local, re-runnable ingestion
      ▼
OpenAI text-embedding-3-small ──► Supabase Postgres + pgvector
                                           ▲
Browser /ask ──POST──► Modal FastAPI ───────┤
                              │             │ semantic retrieval
                              └──► Claude grounded generation
                                        │
                                        └── answer + public article citations
```

The GitHub Pages bundle contains only `PUBLIC_ASK_BLOG_API_URL`. OpenAI, Anthropic, and Supabase service credentials exist only in local ingestion environment variables or the Modal secret. There is no backend logic in Astro and no direct browser access to Supabase.

### What is implemented

- Deterministic, heading-aware chunking with stable source-position IDs and separate content hashes.
- Idempotent Supabase upserts plus deletion of stale chunks.
- pgvector HNSW index and a service-role-only similarity RPC.
- Modal ASGI endpoint with restricted CORS, input bounds, a similarity floor, explicit refusal, and citation validation.
- A process-local burst limit plus an atomic, deployment-wide hourly paid-call ceiling stored in Supabase.
- `/ask` page plus an Ask panel integrated into `/articles`.
- 17-question evaluation set, retrieval hit-rate@k, and citation-grounded answer checks.
- Tests for corpus isolation, stable/public citations, empty retrieval, uncited answers, and frontend secret handling.

No LangChain or LangGraph is used.

## Local setup

Requires Node 20+ and Python 3.10+ (Modal runs Python 3.12).

```bash
npm ci
python -m venv .venv
source .venv/bin/activate
pip install -r rag/requirements.txt
cp rag/.env.example rag/.env
```

Apply [`rag/supabase.sql`](rag/supabase.sql) in the Supabase SQL editor, then populate `rag/.env`. `ANTHROPIC_MODEL` is intentionally required instead of embedding a model ID in source, so the deployed model choice is explicit and replaceable.

Inventory and chunk the allowlisted corpus without credentials:

```bash
python -m rag.ingest --dry-run
```

Ingest or refresh embeddings:

```bash
python -m rag.ingest
```

Run the checks and build the static site:

```bash
python -m pytest rag/tests
npm run build
```

To run the API locally through Modal, first create a Modal secret named `blog-rag-secrets` containing the variables in `rag/.env.example`, then:

```bash
modal serve rag/modal_app.py
```

Copy the emitted endpoint origin (without `/ask`) into a root `.env` file:

```bash
PUBLIC_ASK_BLOG_API_URL=https://YOUR-MODAL-ENDPOINT.modal.run
```

Then run `npm run dev`. Deploying the Modal function or changing the live GitHub Pages site is deliberately outside this local slice.

## Evaluation

The committed set is [`rag/eval/questions.json`](rag/eval/questions.json). It contains 16 grounded questions spanning real articles and one deliberately out-of-corpus question that should refuse.

```bash
python -m rag.eval.run_eval --k 6
python -m rag.eval.run_eval --k 6 --with-answers
```

The first command reports retrieval hit-rate@6. The second also calls Claude and reports answer groundedness: a supported answer must expose at least one citation that maps to its retrieved chunks, while the negative case must refuse. This is a structural groundedness check, not a claim that semantic correctness has been human-judged.

### Current results

| Metric | Result | Status |
|---|---:|---|
| Corpus isolation | 47 public article files only | Locally verified |
| Retrieval hit-rate@6 | Not run | Requires configured Supabase + OpenAI credentials |
| Answer groundedness | Not run | Requires configured Supabase + OpenAI + Anthropic credentials |

Results are intentionally not fabricated. Run the harness after applying the schema and ingesting the corpus, then replace the two “Not run” rows with the dated output.

## Security boundaries

- `src/articles/*.md` is the complete and only corpus.
- Supabase RLS is enabled; `anon` and `authenticated` have no table or RPC access.
- The service-role key is used only by ingestion and Modal.
- Modal returns only answer text and canonical public article metadata.
- Generated `.env`, Python cache, and test cache files are ignored.
- The API logs exception types, never questions, retrieved content, or secret values.
