# CLAUDE.md

Instructions for Claude Code when working in this repository. Replace the placeholder content below with your project-specific details before committing.

Claude Code reads this file on every session. Keep it tight — the more noise, the less useful. Update it when conventions change.

The fastest useful version is not a giant policy manual. It is a small operating contract: project context, stack, scope boundaries, safety stops, memory, and verification.

---

## Project Overview

[One or two sentences: what this project does, who uses it, and why it exists.]

## Tech Stack

- **Language:** [e.g., Python 3.11, Node 20, Go 1.22, Rust 1.75]
- **Framework:** [e.g., FastAPI, Next.js, Django, Gin]
- **Database:** [e.g., Postgres 15, Redis, DynamoDB]
- **Infrastructure:** [e.g., AWS Lambda, Vercel, GCP Cloud Run, Kubernetes]
- **Package manager:** [e.g., pnpm, uv, cargo]

## Directory Structure

Describe the non-obvious parts. Don't list every folder — list the ones that would confuse someone new.

```
src/
  api/          - HTTP handlers and route definitions
  services/     - Business logic, isolated from HTTP layer
  models/       - Data models and validation
  lib/          - Shared utilities
tests/          - Test files, mirrors src/ structure
scripts/        - One-off scripts, cron jobs, migrations
```

## Conventions

### Code style

- [e.g., snake_case for Python, camelCase for TypeScript]
- [e.g., Prefer functional components in React]
- [e.g., No default exports — use named exports for easier refactoring]
- [e.g., Every public function gets a docstring; private functions only if the logic is non-obvious]

### Testing

- [e.g., Every new function in services/ needs a unit test]
- [e.g., Integration tests hit a real test database, no mocks]
- Run tests with: `[command]`

### Commits

- [e.g., Conventional commits: feat, fix, chore, docs, refactor]
- [e.g., Reference issue numbers when applicable]
- [e.g., One logical change per commit — no drive-by refactors]

### Branch naming

- [e.g., `feat/short-description`, `fix/issue-123`, `chore/dependency-updates`]

## Development Workflow

1. [How to run the dev server]
2. [How to run tests]
3. [How to run linters/formatters]
4. [Pre-commit hooks if any]

## Common Commands

```bash
# Install dependencies
[command]

# Run dev server
[command]

# Run tests
[command]

# Run linter
[command]

# Build for production
[command]

# Deploy
[command]
```

## Gotchas and Known Issues

This section is where the real value lives. Document the expensive lessons so future developers (and agents) don't relearn them.

- [e.g., The migrations folder has a manual step — see migrations/README.md]
- [e.g., The auth middleware caches tokens for 5 minutes; flush with `[command]` if testing]
- [e.g., The API rate-limits at 100 req/min per IP; tests need to use the test-bypass header]
- [e.g., Don't run `npm install` — use `pnpm` or the lockfile drifts]

## Memory and Decision Logs

Use lightweight project memory so Claude does not rediscover the same constraints every session.

- Maintain `MEMORY.md` for durable decisions: what was decided, why, and what was rejected
- Maintain `ERRORS.md` for repeated failures: what failed, what worked, and what to check next time
- Read both files before suggesting architecture, dependency, or workflow changes
- When a new decision changes how this repo works, add it to `MEMORY.md`
- When an approach fails twice, add it to `ERRORS.md`
- Do not contradict a logged decision silently; flag the conflict first

## Where to Find Things

- **Documentation:** [link or path]
- **API reference:** [link or path]
- **Deployment runbook:** [link or path]
- **On-call dashboard:** [link or path]
- **Architecture diagrams:** [link or path]

## Instructions for Claude

### Default behavior

- Start with the answer or the action; skip filler openings
- Match response length to task complexity
- If a fact, date, statistic, API behavior, or technical detail is uncertain, say so before using it
- For non-trivial work, summarize the intended approach before editing
- Ask clarifying questions when requirements, ownership, or constraints are ambiguous

### Scope and editing

- Prefer editing existing files over creating new ones
- Match the existing code style in the file you're editing
- Never commit directly to main — use feature branches
- Run tests and linters before suggesting a commit
- Don't add comments explaining WHAT the code does; only WHY when the reason is non-obvious
- Don't add error handling for scenarios that can't happen
- If you're unsure about a change, ask before making it
- Don't refactor code unrelated to your current task
- Only modify files, functions, and lines directly related to the task
- Mention worthwhile adjacent fixes at the end instead of doing them unprompted
- Do not rewrite, reorganize, rename, or reformat unrelated code

### Safety stops

- Before deleting files, overwriting existing work, removing dependencies, changing schemas, running migrations, deploying, pushing, or calling external production systems, stop and ask for explicit confirmation
- Confirmation must happen in the current conversation; do not treat earlier context as approval
- Never send, post, publish, schedule, or share anything outside the local repo without explicit confirmation

### Implementation discipline

- Ask instead of assuming when intent, architecture, or requirements are unclear
- Implement the simplest solution that satisfies the task
- Think step by step before writing code for architecture decisions, debugging, performance work, or non-trivial features
- Flag uncertainty explicitly; do not hide gaps behind confident wording

### Completion report

End coding tasks with:

- Files changed
- What changed in each file
- Tests or checks run
- Files intentionally not touched
- Follow-up needed

---

Starter template from the AI Adoption Playbook by Collin Wilkins.
https://collinwilkins.com/guides/ai-adoption-playbook
