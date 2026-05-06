---
title: "What Is an AI Agent Harness?"
date: "2026-05-06"
tags: ["AI Agents", "Claude Code", "AGENTS.md", "CLAUDE.md", "Harness Engineering", "Beginners"]
excerpt: "The model is the brain. The harness is the operating environment that makes the brain useful. A plain-English breakdown of guides, sensors, memory, and why the harness matters more than the model."
seo_title: "What Is an AI Agent Harness?"
meta_description: "A beginner-friendly explanation of AI agent harnesses, CLAUDE.md, tools, memory, and verification. The model gives you capability — the harness determines whether you can trust it."
target_keywords: "AI agent harness, harness engineering, AI agents for beginners, CLAUDE.md, AGENTS.md, AI agent tools"
---

# What Is an AI Agent Harness?

If you keep hearing people say "agent harness" and quietly think, *cool, another term I am supposed to pretend I understand*, this is the simple version.

This is for people who are new to AI agents, tooling, workflows, and the weird infrastructure now sitting around models. If you've been living in Claude Code, Codex, Cursor, LangGraph, MCP servers, and custom skills for months, you can probably skim.

The short answer:

> The model is the brain. The harness is the operating environment that makes the brain useful.

Or even shorter:

> Models generate answers. Harnesses generate trust.

That's the whole game.

## Start with the agent

At the simplest level, an AI agent is a model inside a loop:

1. You give it a task
2. The model thinks about what to do
3. It either answers or calls a tool
4. The tool does something
5. The result goes back to the model
6. The loop repeats until the task is done

![An AI agent is a while loop: user input feeds the model, which completes and responds](/images/agent-loop-code.png)

That loop can be a few dozen lines of code or a whole product with permissions, memory, tools, logs, tests, and UI wrapped around it. What matters is everything built around it, not the loop itself. 

## The problem: same model, different results

The easiest mistake to make with agents is blaming the model for everything. Sometimes the model really is the problem but most of the time, it isn't. That's where the proverbial "Skill issue" comes in. The same model and task can produce wildly different output; and that is due to the stochastic nature of LLMs.

One setup produces a clean pull request, runs the tests, catches the edge case, and leaves you a useful summary.

Another setup changes the wrong file, forgets the project conventions, says "done" without verification, and confidently hands you cleanup work disguised as productivity. A "better model" doesn't solve this.

The model gives you raw capability either way. The harness determines whether that capability shows up reliably in real work - it narrows this variance.

## Model vs. agent vs. harness

People blur these words together, so separate them first.

| Term | Plain-English meaning | Example |
|---|---|---|
| Model | The brain that predicts, reasons, and writes | Claude, GPT, Gemini |
| Agent | The model plus a loop that lets it take actions | Claude Code fixing a bug |
| Harness | The system around the agent that guides and checks the work | Instructions, tools, memory, tests, hooks |
| Tool | Something the agent can use | Shell, browser, file search, calculator, MCP server |
| Memory | Context that survives beyond one prompt | `CLAUDE.md`, `AGENTS.md`, project memory, handoff notes |

If you only remember one line:

> A model thinks. An agent acts. A harness keeps the agent from acting like an idiot.

## The simplest harness you already know: CLAUDE.md

Claude Code is a useful doorway into this idea because the harness is visible.

Every serious Claude Code setup eventually has a `CLAUDE.md` file (Or AGENTS.md). Anthropic's docs describe it as a persistent instruction file Claude reads at the start of a session. It carries project context across fresh conversations: build commands, folder structure, testing rules, coding standards, workflow preferences, and the mistakes Claude should stop repeating. That's harness work.

Your `CLAUDE.md` isn't the agent or the model. It's one guide inside the harness.

A good one feels less like motivational advice and more like a brief you would give a contractor before they touched your codebase:

```markdown
# CLAUDE.md

## Project
One sentence on what this project does and who uses it.

## Stack
Framework, language, database, deployment target.

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Test single file: `npm test -- path/to/file`
- Type check: `npx tsc --noEmit`

## Architecture
- `src/lib/services/` - business logic
- `src/components/` - UI components
- `src/app/api/` - API routes
- `docs/decisions/` - architecture decisions

## Rules
- Never commit `.env` files or secrets
- Make minimal changes and avoid unrelated refactors
- Run type check after code changes
- Static export only, no server-side features

## Workflow
- Ask before making architectural changes
- Run tests before saying the task is done
- When unsure between two approaches, explain the tradeoff
```

That file doesn't make the model smarter. It makes the environment stricter and gives the model fewer ways to wander off.

Here's the shape of the whole thing:

![Harness architecture: agent loop on the left with user request, agent loop, model, tools, and observation — harness components on the right with instructions, permissions, verification, and memory feeding into the loop](/images/harness-architecture.svg)

The model is one box in the middle. The harness is the stuff around it that decides what context it gets, what it can touch, how it proves the work, and what survives after the session ends.

## What a harness actually does

A harness has two jobs:

1. Help the agent get it right the first time
2. Catch problems early enough that the agent can correct itself

Martin Fowler's framing is useful here. He splits a harness into guides and sensors.

| Piece | What it does | Examples |
|---|---|---|
| Guides | Shape the agent before it acts | `CLAUDE.md`, `AGENTS.md`, skills, tool descriptions, project docs |
| Sensors | Check the agent after it acts | tests, linters, type checks, screenshots, review agents |
| Memory | Carries forward what should survive the session | project memory, handoff notes, session recaps, index files |

Guides steer the agent before it acts. Sensors tell you whether the work actually held up. Memory is the notebook you leave for tomorrow.

If your setup only has guides, the agent may sound aligned and still ship broken work. If your setup only has sensors, the agent may fail repeatedly before it learns what you wanted. A useful harness needs both.

The loop looks like this:

![The feedback loop: guides feed into agent acts, sensors check the output, passing triggers memory that loops back to guides — failing loops back to agent acts](/images/harness-guides-sensors-loop.svg)

Take note of the last arrow. A harness controls how the agent acts this time AND how the next run starts a little less cold. That's how it improves.

## Same model, better harness

This isn't just semantics.

LangChain published a useful example in February 2026. They kept the model fixed and changed the harness around their coding agent. The score moved from `52.8` to `66.5` on Terminal Bench 2.0.

Same model improved ~14 points from changing the harness.

What factored into the changes:

- better system prompts
- better tool setup
- middleware that pushed the agent to verify before finishing
- trace analysis to see where the agent failed
- loop detection when the agent kept editing the same file without progress

That's the pattern beginners should steal.

Don't start by asking, "Which model will solve this?"

Instead ask, "What does the model need around it to do this reliably?"

## A simple example

Say you ask an agent to fix a failing test. Without much of a harness, the session often looks like this:

1. The model reads your prompt
2. It scans a few files
3. It changes some code
4. It rereads its own code
5. It says "done"

That sounds fine until you notice the missing step:

It never ran the tests.

With a basic harness, the flow changes:

1. The agent starts and loads the project instructions
2. It sees the commands, conventions, and files that matter
3. It changes the code
4. The harness tells it to run the test command before exiting
5. If tests fail, the agent keeps going
6. When it finishes, it writes a short handoff note

The model didn't get smarter. What changed was the environment around it.

## The minimum viable harness

You don't need a six-agent system, a vector database, and twenty custom tools to get value from this.

Please don't start there. That's how you end up debugging your infrastructure instead of doing the work.

For most people, a minimum viable harness is four things:

| Layer | Beginner version | Why it matters |
|---|---|---|
| Instructions | `CLAUDE.md` or `AGENTS.md` | The agent knows the project before you re-explain it |
| Tools | One or two tools it actually needs | The agent can act instead of only talk |
| Verification | Test, lint, type check, screenshot, review pass | The agent has to prove the work |
| Memory | Handoff note, index file, project memory | The next session doesn't start cold |

That's already a harness, even if it's ugly and amounts to one markdown file and one test command. The point is reliability, not complexity.

## How to write the instruction file

The blunder with `CLAUDE.md` is treating it like a wish list.

"Be a senior engineer."

"Think step by step."

"Write clean code."

That's fine but it's also mostly wasted space. Use the file for things the agent would otherwise get wrong.

The five useful sections are:

1. **Critical commands**
   How to build, test, lint, type check, and run one file.

2. **Architecture map**
   Where things live and what belongs where.

3. **Hard rules**
   The specific mistakes the agent must not make.

4. **Workflow preferences**
   When to ask, when to act, how much to change, how to verify.

5. **Out of scope**
   Files, systems, or integrations the agent should not touch.

Keep it short.

Anthropic's current memory docs emphasize hierarchy, imports, recursive lookup, and specific instructions over vague guidance. That last part matters. A `CLAUDE.md` shapes behavior. It doesn't physically prevent bad actions.

For enforcement, you need settings, permissions, tests, hooks, or human review. That's the difference between a guide and a guardrail.

## Where tools fit

Tools are the agent's hands.

They're how the model does things it can't do from text alone:

- search files
- run shell commands
- query an API
- calculate something
- open a browser
- read a spreadsheet
- edit a document

The beginner mistake is thinking more tools equals a smarter agent. Usually it means a more confused one.

Start with the smallest tool set that can do the job. If the task is rewriting a paragraph, it probably needs no tools. If the task is fixing a bug, it needs file access and a test command. If the task is researching current prices, it needs web search or an API.

One tool should have one clear job.

Bad:

```python
manage_files(action, file, destination, overwrite, format, permissions)
```

Better:

```python
read_file(path)
write_file(path, content)
delete_file(path)
```

The tool description matters too. "Calculator tool" is weak. "Use this tool whenever math is required. Never guess calculations." is better. Tool design is part of the harness.

## Where memory fits

Memory is where people make this sound harder than it needs to be.

There are two simple versions:

1. **Conversation memory**
   What has been said in this session.

2. **Longer-term memory**
   What should survive across sessions.

For a beginner, longer-term memory can be boring markdown:

- what changed
- what is still broken
- what command to run next
- what the next session should not repeat

That can live in a handoff note, an `INDEX.md`, a session recap, or a project memory file.

In my own note system, the pattern is pretty literal. The agent reads an index file, a topic map, and `CLAUDE.md` before touching anything. That gives the session a map, the rules, and the current state.

That's not glamorous, but it works.

## Workflows before agents

Not every problem needs a fully autonomous agent.

Anthropic makes a useful distinction here: workflows follow predefined code paths, while agents dynamically decide their own process and tool use.

If the steps are predictable, use a workflow:

- write outline
- check outline
- write draft
- review draft

If the steps are not predictable, use an agent:

- inspect this unfamiliar codebase
- figure out why the tests fail
- decide which files to change
- verify the fix

Start with the simplest pattern that works. Most useful setups begin as a boring workflow and only become agents when the model genuinely needs to decide the path.

## When multiple agents make sense

Forget the swarm for now. Start with one agent and a good harness. Multiple agents make sense when the roles are meaningfully different:

- one researches, one writes
- one implements, one reviews
- one can read sensitive data, one can execute actions
- one routes tasks, specialists handle narrow domains

If the second agent doesn't have a different job, permission set, or evaluation role, you probably added complexity for vibes.

The safer pattern is a supervisor:

```text
User -> Main agent -> Specialist agent only when needed -> Verification
```

That's plenty for most people and most use cases.

There's one multi-agent pattern worth knowing early, though: separate the person building from the person judging.

Anthropic Labs described this in their long-running application harness. They used a planner, a generator, and an evaluator. The generator built. The evaluator inspected the result with Playwright like a user, graded it against concrete criteria, and sent feedback back into the next sprint. That separation matters because agents are usually too generous when grading their own work. They'll write mediocre code, reread it, and decide it looks fine. Must've missed that invite to reality.

You don't need that full setup for your first harness. But the principle scales down cleanly:

| Small setup | Bigger setup |
|---|---|
| Write code, then run tests | Generator builds, evaluator tests in browser |
| Ask a second agent to review | Dedicated evaluator agent grades each sprint |
| Write a checklist before starting | Planner and evaluator negotiate what "done" means |

The point isn't "use three agents." The point is simpler: don't let the same session that made the thing be the only judge of whether the thing is good.

## What not to overbuild

Don't turn your first harness into a platform.

You probably don't need:

- vector search
- twenty tools
- custom dashboards
- multi-agent routing
- long-term autonomous memory
- complex eval pipelines
- a new framework for every task

Start with:

- one job
- one agent
- one clear instruction file
- one or two tools
- one verification step
- five to ten messy test prompts

Then watch where it fails.

When the same failure repeats, improve the harness. That's the loop.

## The practical build path

If you want to build your first harness today, do this:

1. Write one sentence describing the agent's job.
2. List the tools it truly needs.
3. Write the rules it must follow.
4. Define the output format.
5. Add one verification step.
6. Test it on five real examples.
7. Add memory only when the next session needs something from this one.

You can ask an LLM to help design the first version:

```markdown
I want to build an AI agent.

Goal:
[what I want it to do]

Example user requests:
[5 messy examples]

Tools it may use:
[web search / files / calculator / custom API / none]

Rules it must follow:
[non-negotiables]

It must never:
[boundaries]

Please turn this into:
1. A clear agent spec
2. A system prompt
3. A minimal tool list
4. A verification checklist
5. 10 test cases
```

The formula is simple:

```text
Agent = Role + Goal + Tools + Rules + Output format
Harness = Instructions + Tools + Verification + Memory
```

That's enough to start.

This is also why I built a simple [Agent Harness Builder](https://collinwilkins.com/resources/agent-harness-builder): answer a short quiz, get a paste-ready starter kit for `AGENTS.md`, `RUNBOOK.md`, and the first verification path.

The tool isn't the point. The first 15 minutes are the point. Give the agent enough structure to do one real job, verify it, and leave the next session better off.

## Takeaway

A harness is the setup around an agent that makes its work more reliable.

It's the operating environment: the instructions, tools, tests, memory, permissions, and feedback loops that keep the agent pointed at the job. 

The model gives you capability, you can swap this out whenever. The harness decides whether you can trust it.

## Sources

- Anthropic, [Manage Claude's memory](https://docs.anthropic.com/en/docs/claude-code/memory)
- Anthropic, [Building Effective AI Agents](https://www.anthropic.com/research/building-effective-agents)
- Anthropic, [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps)
- LangChain, [Improving Deep Agents with harness engineering](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering)
- Martin Fowler, [Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html)
- Geoffrey Huntley, [Ralph Wiggum as an AI agent loop](https://ghuntley.com/agent/)
