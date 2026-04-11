# AGENTS.md

Universal instructions for any AI coding agent working in this repository (Claude Code, Cursor, Codex, Cline, Aider, GitHub Copilot, etc.). Replace the placeholder content below with your project-specific details before committing.

Agents read this file on every session. Keep it tight. Update it when conventions change.

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

### Before making changes

- Read the existing code in the file you're editing before generating new code
- Match the existing style — don't introduce new patterns without a reason
- Check if similar functionality already exists in the codebase before writing new code
- If the task is unclear, ask before implementing

### When making changes

- Prefer small, targeted edits over full rewrites
- Don't add error handling for scenarios that can't happen
- Trust internal code and framework guarantees — only validate at system boundaries
- Don't add comments explaining WHAT the code does; only WHY when the reason is non-obvious
- Never commit directly to main — use feature branches
- Don't refactor code unrelated to your current task

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
