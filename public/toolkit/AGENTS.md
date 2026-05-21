# AGENTS.md

Universal instructions for any AI coding agent working in this repository (Claude Code, Cursor, Codex, Cline, Aider, GitHub Copilot, etc.). Replace the placeholder content below with your project-specific details before committing.

Agents read this file on every session. Keep it tight. Update it when conventions change.

The useful version is a compact operating contract: project context, stack, scope boundaries, safety stops, memory, and verification.

---

## Project Overview

[One or two sentences: what this project does, who uses it, and why it exists.]

## Tech Stack

- **Language:** [e.g., Python 3.11, Node 20]
- **Framework:** [e.g., FastAPI, Next.js]
- **Database:** [e.g., Postgres 15, Redis]
- **Infrastructure:** [e.g., AWS Lambda, Vercel]
- **Package manager:** [e.g., pnpm, uv, cargo]

## Directory Structure

Describe the non-obvious parts.

```
src/
  api/          - HTTP handlers and route definitions
  services/     - Business logic, isolated from HTTP layer
  models/       - Data models and validation
  lib/          - Shared utilities
tests/          - Mirrors src/ structure
scripts/        - One-off scripts, cron jobs, migrations
```

## Conventions

### Code style

- [Your language-specific style rules]
- [Naming conventions]
- [Import ordering, if enforced]

### Testing

- Every new function needs a unit test
- [Integration test expectations]
- Run tests with: `[command]`

### Commits

- [Your commit convention]
- [Branch naming rules]

## Development Workflow

1. [Step]
2. [Step]
3. [Step]

## Common Commands

```bash
# Install
[command]

# Dev
[command]

# Test
[command]

# Lint
[command]

# Build
[command]
```

---

## Agent Guidelines

These apply regardless of which agent is running the task.

### Default behavior

- Start with the answer or the action; skip filler openings
- Match response length to task complexity
- If a fact, date, statistic, API behavior, or technical detail is uncertain, say so before using it
- For non-trivial work, summarize the intended approach before editing
- Ask clarifying questions when requirements, ownership, or constraints are ambiguous

### Before making changes

- Read the existing code in the file you're editing before generating new code
- Match the existing style — don't introduce new patterns without a reason
- Check if similar functionality already exists in the codebase before writing new code
- If the task is unclear, ask before implementing
- Check `MEMORY.md`, `ERRORS.md`, runbooks, and local docs before proposing architecture or workflow changes

### When making changes

- Prefer small, targeted edits over full rewrites
- Don't add error handling for scenarios that can't happen
- Trust internal code and framework guarantees — only validate at system boundaries
- Don't add comments explaining WHAT the code does; only WHY when the reason is non-obvious
- Never commit directly to main — use feature branches
- Don't refactor code unrelated to your current task
- Only modify files, functions, and lines directly related to the task
- Mention worthwhile adjacent fixes at the end instead of doing them unprompted
- Implement the simplest solution that satisfies the task
- Think step by step before writing code for architecture decisions, debugging, performance work, or non-trivial features
- Flag uncertainty explicitly; do not hide gaps behind confident wording

### Safety stops

- Before deleting files, overwriting existing work, removing dependencies, changing schemas, running migrations, deploying, pushing, or calling external production systems, stop and ask for explicit confirmation
- Confirmation must happen in the current conversation; do not treat earlier context as approval
- Never send, post, publish, schedule, or share anything outside the local repo without explicit confirmation

### Testing your changes

- Run tests before declaring a change complete
- If you can't run tests in your environment, note what tests should be added and leave them for the developer
- Don't mock the database in integration tests unless explicitly told to

### Dependencies

- Don't add a new dependency without a clear justification
- Check if the project already has a similar library before adding one
- Don't upgrade package versions unprompted

### What NOT to do

- Don't refactor code unrelated to your current task
- Don't delete code you don't understand — ask first
- Don't disable linter rules or tests to make things pass
- Don't commit secrets, API keys, or credentials
- Don't use destructive git operations (force push, reset --hard, checkout --) without explicit permission
- Don't create new files when you could edit existing ones

### Completion report

End coding tasks with:

- Files changed
- What changed in each file
- Tests or checks run
- Files intentionally not touched
- Follow-up needed

---

## Memory and Decision Logs

Use lightweight project memory so agents do not rediscover the same constraints every session.

- Maintain `MEMORY.md` for durable decisions: what was decided, why, and what was rejected
- Maintain `ERRORS.md` for repeated failures: what failed, what worked, and what to check next time
- Read both files before suggesting architecture, dependency, or workflow changes
- When a new decision changes how this repo works, add it to `MEMORY.md`
- When an approach fails twice, add it to `ERRORS.md`
- Do not contradict a logged decision silently; flag the conflict first

---

## Gotchas and Known Issues

This section is where the real value lives. Document the expensive lessons.

- [e.g., Migrations have a manual step documented at migrations/README.md]
- [e.g., The auth cache persists across test runs; flush with `[command]`]
- [e.g., `npm install` drifts the lockfile; use `pnpm` instead]

## Where Things Live

- **Docs:** [path]
- **Runbook:** [path]
- **Architecture diagrams:** [path]
- **On-call dashboard:** [path]

---

Starter template from the AI Adoption Playbook by Collin Wilkins.
https://collinwilkins.com/guides/ai-adoption-playbook
