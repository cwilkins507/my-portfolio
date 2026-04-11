# AI Adoption Toolkit

Three resources that go with the [AI Adoption Playbook](https://collinwilkins.com/guides/ai-adoption-playbook).

## What's Inside

### 1. `AI-Readiness-Worksheet.xlsx`

A diagnostic spreadsheet that scores your engineering team across 7 dimensions and gives you level-based next steps.

**How to use it:**

1. Open in Excel, Google Sheets, or LibreOffice (works in all three)
2. Read the Instructions tab
3. Fill out the Scoring tab — enter 1-4 per dimension using the dropdown
4. Your total score and readiness level appear automatically
5. Read the Results tab for level-specific recommendations

**Best results:** Run it in a team meeting. 20-30 minutes with discussion. The disagreement between team members is where the useful conversation lives. Don't aim for consensus — a mix of 2s and 3s on a dimension tells you something a straight 2.5 doesn't.

### 2. `CLAUDE.md`

A starter convention file for [Claude Code](https://claude.com/claude-code). Drop it in your repo root, fill in the project-specific sections, and Claude Code will pick up the context on every session.

Structured sections: project overview, tech stack, directory structure, conventions (code style, testing, commits), workflow, common commands, gotchas, and Claude-specific instructions.

### 3. `AGENTS.md`

A universal convention file for any AI coding agent — Claude Code, Cursor, Codex, Cline, Aider, GitHub Copilot, and whatever ships next. Similar structure to CLAUDE.md but with agent-neutral language, so one file works across tools.

**Using both:** You can commit both CLAUDE.md and AGENTS.md to the same repo. Claude Code reads CLAUDE.md preferentially. Other agents read AGENTS.md. Some teams put shared content in AGENTS.md and Claude-specific overrides in CLAUDE.md to avoid duplication.

## Why These Exist

The playbook argues that AI coding tools produce bad output because of context, not the model. Convention files are the fastest way to fix the context problem on a per-repo basis. The worksheet is a team facilitation tool for deciding where to spend your AI adoption energy first.

None of these are prescriptive. They're starting points. The value is in the customization, not the template.

## License

Free to use, modify, share. No attribution required, no email required to download, no upsell.

If you find them useful, the [full playbook](https://collinwilkins.com/guides/ai-adoption-playbook) goes deeper on the frameworks behind each one.

---

By Collin Wilkins
https://collinwilkins.com
