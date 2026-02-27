---
title: "How I Actually Use AI Agents Every Day"
date: "2026-02-27"
tags: ["AI Agents", "Claude Code", "Obsidian", "Workflow", "Developer Productivity", "Context Engineering", "MCP"]
excerpt: "Most AI agent tutorials show Python loops and vector databases. Here's what daily agent use actually looks like: terminal-first orchestration, agent files, context architecture, and a knowledge system that feeds all of it."
seo_title: "How I Use AI Agents Every Day: Claude Code, Agent Files, and Context Architecture"
meta_description: "Skip the Python loops. Here's how I run AI agents daily: Claude Code CLI, markdown agent definitions, Obsidian as a knowledge layer, and file-backed context that holds across sessions."
target_keywords: "AI agent development, Claude Code agents, AI workflow, file-backed context, agent files, AI productivity workflow, Claude Code daily use"
---

# How I Actually Use AI Agents Every Day

Most posts about AI agent development show you how to build agents. Write the Python loop. Define the tool schemas. Set up the vector database. Wire up the observability stack. All of that is real and useful if you're shipping agent products. It's not what I do.

I use AI agents to run two businesses, produce content across two domains, write and ship code, and manage a knowledge base as a solo operator. In the last two months: 44 published posts across both domains, an automation pipeline (LeadSync) built and shipped in a weekend, and a SaaS beta in market. No custom inference loops. No database-backed memory. No LLM observability dashboards.

Here's what it actually looks like.

## The Terminal Is the Control Plane

I primarily run Claude Code from the terminal (Ghostty) rather than the IDE chat panel or web UI.

The terminal gives me access to the full agent system: file reads, file writes, bash commands, git operations, and web search (for agents that declare it), all within one session. When I open a session in a specific project directory, Claude Code inherits that context and everything in it — the CLAUDE.md operating manual, the project structure, the history of decisions in the knowledge base.

Chat interfaces are conversation-first. The terminal is task-first. That distinction compounds fast when you're running 10-20 agentic operations a day.

Planning, research, content production, code review, publishing — all of it routes through terminal sessions. For precise code edits to a specific file, I switch to an IDE plugin (Claude for VS Code or Codex for VS Code). But the terminal handles everything around them: reading context, planning the approach, reviewing output, managing files, committing and pushing.

Most people treat the terminal as a fallback. I treat it as the primary interface and the IDE as a specialized tool for one specific job.

## Agent Files Are the Unit of Specialization

Generic AI advice assumes one monolithic session that handles everything. I use specialized agents instead.

Each agent is a markdown file with a YAML frontmatter header. Claude Code reads these at startup and surfaces them as delegatable sub-agents within any session. Here's the real definition for my code reviewer:

```yaml
---
name: code-reviewer
description: "Expert code reviewer for security, performance, and quality audits. Use when the user asks to review code, check for security issues, audit a codebase, or after significant code changes."
tools: Read, Glob, Grep, Bash
disallowedTools: Write, Edit
model: opus
maxTurns: 15
memory: user
---
```

Every field is doing real work.

**`tools` and `disallowedTools`** define what the agent can touch. The code reviewer can read, search, and run git commands — but `disallowedTools: Write, Edit` means it cannot touch a single file. Read-only by definition, not by convention. I don't have to trust the agent to behave — the permission model enforces it.

**`model: opus`** routes this agent to the most capable model specifically for high-stakes review work, while other agents in the same session run on faster, cheaper models. You're not locked into one model per session.

**`maxTurns: 15`** caps how many reasoning steps the agent takes before returning control to me. Without this, a review agent can go deep into rabbit holes. 15 turns is enough for a thorough code review without burning tokens on diminishing returns.

**`memory: user`** means the agent persists learnings about my codebases and workflows across every session, across every project. It knows my patterns, my recurring antipatterns, my architectural preferences — without me re-explaining them each time.

I have four agents in production:

| Agent | Model | Memory Scope | What It Does |
|---|---|---|---|
| `code-reviewer` | opus | user (global) | Security, performance, code quality — read-only |
| `researcher` | sonnet | user (global) | Web research, competitor analysis, peer voice gathering |
| `seo-auditor` | sonnet | user (global) | 12-point SEO checklist, keyword density, internal linking |
| `content-reviewer` | opus | project (vault only) | Scores content against rubric + runs fabrication check |

Three live globally in `~/.claude/agents/`. One lives in `.claude/agents/` inside the vault, scoped to that project only. The scoping is intentional: the content reviewer knows FiNimbus brand rules that shouldn't bleed into a code project.

Agent specialization changes what you can ask. Instead of one session where I'm constantly re-explaining context, I invoke a fresh agent built for exactly this task, with exactly the right permissions, running on exactly the right model. The session that wrote the code tends to be biased toward its own decisions. A separate read-only agent catches what the author missed.

But even a perfectly scoped agent starts blind without the right context. That's the harder problem.

## Context Architecture

Agents are only as useful as the context you give them. The operational problem isn't which agent to use. It's how you make an agent understand your project, your conventions, your history, without pasting the same background into every session.

Every project I use with Claude Code has a `CLAUDE.md` at the root. Claude Code reads it at session start and injects it as standing instructions. For the content vault, `CLAUDE.md` covers domain structures, how content moves from brief to draft to published, linking conventions, frontmatter standards, the no-fabrication rule, and what each agent is for. For a code project: tech stack, testing conventions, naming patterns, architectural decisions. Same pattern, different project. Write it once, version it, update it when conventions change.

The vault has 300+ notes, so orientation is its own problem. I have a `VAULT-INDEX.md` — one line per file — that the agent reads at session start before touching anything. It's the map. Without it, the agent hallucinates file paths or misses context that's already been captured.

For topic context, I use Maps of Content: one per major topic, capturing current state, active priorities, and recent decisions. Starting a session on consulting strategy means reading `00-Automation-Consulting.md` first. The agent knows this week's priority, what changed last session, what's blocked. When I shifted OpsScan from Week 9 to immediate, that decision lived in the MOC — not in my head, not buried in a session recap, not re-explained from scratch.

After each significant session, I write a recap: what changed, what files were modified, what's remaining. These stack up as searchable history. The code reviewer's `MEMORY.md` holds codebase conventions and recurring antipatterns. The researcher's holds high-value sources and audience language. Both are auto-injected into every new session — the first 200 lines, before I type anything.

Start a session in any project, and the agent already knows what exists, what the conventions are, what changed recently, and what patterns to apply. That's what it looks like when the system is working.

## Skills as Modular Capabilities

Beyond agents, I use a skills system — discrete prompt files that load on demand for specific tasks.

The vault has these locally: `brand-voice`, `trend-router`, `obsidian-markdown`, `obsidian-bases`, `json-canvas`. Globally I have around 35 more: `voice-polish`, `ai-pattern-killer`, `seo-audit`, `copy-editing`, `social-content`, and others.

Skills solve a real scoping problem: the code reviewer shouldn't know FiNimbus brand voice rules. The researcher shouldn't carry the full SEO audit methodology into every search. Skills load exactly what the task needs and nothing else.

The `trend-router` skill is the clearest example. Every day I route a topic through it and get a routing decision: blog brief, Twitter thread, or standalone tweet. The logic is calibrated to my thresholds: Combined score >= 9.0 AND Evergreen >= 9.0 maps to a blog brief, Combined >= 8.5 with a pillar match maps to a thread, everything else is a tweet. That routing logic lives in one file, invoked when needed, invisible everywhere else.

Once you have the right agents with the right context and the right skills, the remaining lever is model selection — and most people get this wrong by defaulting to one model for everything.

## Model Selection by Task

Not every task needs the same model. Defaulting to one model for everything is easy, but it means you're paying opus prices for work haiku can handle. The agent files make a better default possible.

- **Opus** for high-stakes judgment tasks: code review, content scoring, anything where I'm relying on the output to catch real problems. A missed security issue or a fabrication flag costs more to fix than the extra API spend.
- **Sonnet** for research, planning, writing, most content production. Fast enough for iteration, capable enough for complex multi-step tasks.
- **Haiku-class** for routing, classification, short transformations — anything with well-defined inputs and outputs where raw capability doesn't change the result.

The code reviewer runs on opus. The researcher runs on sonnet. Model selection is baked into the agent definition. I don't think about it per-session, which means I always get the right model without any friction to skip it.

## Obsidian as the Knowledge Layer

The content vault runs in Obsidian, and this is where the knowledge layer lives. Not a note-taking tool — a structured knowledge base that feeds agent context.

Every research piece gets tagged with standard frontmatter. Every content brief follows a template. Every published post has a record in the vault. That consistency is what makes the vault navigable by an agent. When the researcher does competitive analysis, it reads existing competitor notes before searching the web. It builds on what's already there rather than starting from scratch every time.

The Obsidian graph view isn't what makes this useful. The useful part is the convention: every file has the same frontmatter structure, every folder has a clear purpose, every MOC has a current state section. That structure is what the agent can read programmatically. A visually beautiful vault with inconsistent structure is just noise.

The terminal plugs into all of it.

## Terminal for Orchestration, IDE for Code

The terminal is for orchestrating work across multiple files and contexts: reading current state, planning the approach, delegating to agents, managing output, updating indexes, writing session recaps. It can see everything and act across the whole project.

The IDE handles one specific job: precise edits to code files. I use two plugins — Claude for VS Code and Codex for VS Code — depending on the task. When the planning is done and all that's left is a surgical change to a specific file, I switch to the IDE, make the edit, and come back.

Codex reads `AGENTS.md` for project context rather than `CLAUDE.md`. Same principle — file-backed context injected at startup — different convention. For projects I use with both tools, I keep both files. The instructions overlap significantly; the split exists because each tool has its own convention for where to look. I've also started using the Codex app directly for certain coding tasks — same AGENTS.md pattern.

Trying to orchestrate everything from the IDE leads to sessions that lose scope. Trying to do precise multi-file edits from the terminal leads to drift. The split keeps each tool doing what it's actually good at.

## What I Don't Do (Yet)

No MCP servers in this stack yet. The Model Context Protocol defines a standard interface for connecting AI agents to external tools and data sources — databases, APIs, internal services. At my scale, bash commands and file reads cover the same ground without the overhead of running server processes. When I need to expose a tool to multiple agents at once, MCP becomes the right abstraction. Not yet.

No Python agent loops in this stack. Claude Code handles orchestration, tool dispatch, and multi-turn reasoning without me touching inference code. That layer is abstracted away and I'm building on top of it.

Vector database-backed memory isn't part of it either. The retrieval pattern I use is file-based: VAULT-INDEX for orientation, MOCs for topic state, session recaps for history. It works at my scale. When the vault hits a size where file-based retrieval becomes slow or imprecise, I'd look at embedding-based search. Not yet.

For observability, I read session outputs and session recaps. That's it. A team running agents across hundreds of users would need something more structured — Langfuse or similar. As a solo operator, session recaps are sufficient.

This architecture runs two domains of content production, a code project, a SaaS beta, and automation consulting work simultaneously. That's the scope it's built for. Scaling to a team or a product would require different decisions at each layer — different memory strategy, structured observability, probably MCP. But the core pattern holds: file-backed context, specialized agents, a knowledge base your tools can actually read.

## The Real Work

The tutorials focus on building agents. That part is solved. The hard part is running them — consistently, across sessions, without losing context, without paying tokens to re-explain what you already documented.

The discipline isn't technical. It's editorial. Write the CLAUDE.md. Keep the VAULT-INDEX current. Write the session recap before you close the terminal. None of this requires inference code. It requires writing things down well and being consistent about where they live.

That's the whole system.
