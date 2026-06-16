---
title: "Most AI Agent Skills Should Not Exist"
date: "2026-06-09T12:00:00Z"
updated: "2026-06-12T12:00:00Z"
tags: ["AI Agents", "Claude Code", "Agent Skills", "Developer Productivity", "AI Engineering"]
excerpt: "I audited 51 installed skills and found abstraction debt: overlapping triggers, unused instructions, and more ways for the agent to choose wrong. Here is the bar a skill should clear before it earns a place."
image: "/images/articles/building-production-ready-ai-agent-skills.png"
image_alt: "A focused agent skills directory beside an open SKILL.md file with scoped frontmatter and a hard stop."
seo_title: "How to Build Production-Ready AI Agent Skills (2026 Guide)"
meta_description: "Most agent skills are premature abstractions. Learn how to audit skill bloat and build focused skills with scoped triggers, hard stops, tests, and proof."
target_keywords: "how to build ai agent skills, production-ready ai agent skills, reusable ai agent skills, ai agent skill library, claude code skills, agent skill design patterns, ai agent workflow"
related_articles: ["context-engineering-ai-coding-tools", "ai-agent-workflow-claude-code", "doe-framework-claude-skills"]
faqs:
  - q: "When should something become an AI agent skill instead of a prompt?"
    a: "A skill should earn its place by capturing repeated behavior or preventing a repeated failure. A useful rule of three works well: if you have manually asked for the same behavior across three separate sessions, it is a skill candidate. Fewer than three and you are probably abstracting around a guess."
  - q: "Why is having too many agent skills a problem?"
    a: "Every skill's name and description competes for context before the work begins, and similar descriptions make the agent select the wrong one more often. A larger library creates abstraction debt: more triggers to misfire, more conflicting instructions, and more maintenance, while making the agent harder to steer."
  - q: "What does a production-ready agent skill need?"
    a: "Five things: a scoped trigger that says exactly when to load, narrow authority over a defined judgment, positive instructions describing the workflow, hard stops for what it must never do, and proof such as an artifact or observable result that shows it ran."
  - q: "How do you test whether an agent skill's boundary holds?"
    a: "Run it on three paths: a clearly in-scope happy path, an ambiguous task near the edge of the trigger, and a pressure path where skipping a rule would be faster. The pressure path catches the failures that matter, because a skill's instructions have to compete with the agent's other goals in production."
---

Last month I audited my AI agent setup and found 51 skills installed. I couldn't clearly explain what half of them did, and some had barely been used in 30 days. I was building abstraction debt: more triggers to misfire, more instructions competing for context, more maintenance, and more ways for the agent to choose wrong.

Most skills are prompts promoted too early. The library feels more capable as it grows, but overlapping skills make the agent harder to steer and the output less consistent.

I should've seen it coming. One of the first rules I learned in software development was YAGNI: **You Aren't Gonna Need It**. [Ron Jeffries](https://ronjeffries.com/articles/019-01ff/iter-yagni-skimp/) describes it as solving today's problem today instead of designing for a future that may never arrive. I had applied that lesson to code for years, then ignored it while collecting markdown files.

The cost isn't theoretical. In the tools I use, the agent sees skill names and descriptions so it can decide what to load. A larger library means more context spent on routing before the work begins, and similar descriptions make selection harder. A [RAG-MCP study](https://arxiv.org/abs/2505.03275) showed the same problem with tools: a baseline that received every tool description used nearly twice the prompt tokens and selected the correct tool less often than a retrieval approach that narrowed the options first. Skills aren't tools, but they create a similar selection problem.

![Tool-selection accuracy drops as agents face larger toolsets, illustrating the context cost of capability bloat](/images/agent-skills-tool-selection-bloat.png)

My opinion now is simple: **a skill should earn its place by capturing repeated behavior or preventing a repeated failure.** Until then, keep it as a prompt.

## The bar for creating a skill

A prompt helps the agent complete a task. A skill preserves a decision you don't want to make again.

That distinction matters because the first successful run is seductive. The prompt worked, so you package it, write a broad description, and give it permanent space in the library. You still don't know whether the instructions survive a different task, whether the trigger is clear, or whether you'll need the behavior again.

I use a loose rule of three: if I've manually asked for the same behavior across three separate sessions, it is a skill candidate. Three repetitions usually expose enough variation to write something better than a saved prompt. Fewer than three and I'm probably abstracting around a guess.

Useful candidates usually come from two places:

- **Repeated work:** a sequence you keep explaining, such as researching before drafting or updating an Obsidian vault at the end of a session.
- **Repeated failure:** a constraint the agent keeps dropping, such as editing outside its assigned scope or skipping verification.

This is YAGNI applied to agent behavior. Don't formalize a workflow because it might become useful. Wait until usage or failure proves that it already is.

## What skill bloat looks like

The most obvious problem in my audit was Excalidraw. I had three similarly named diagram skills across my agent setup: a custom Claude skill, `cole-excalidraw`, and a legacy `excalidraw-diagram` entry. Asking for a diagram should've selected a renderer. Instead, I sometimes had to tell the agent which skill I meant.

The three options also carried different instructions about output format, visual argument, and rendering. That creates four costs at once:

| Cost | What happens |
|---|---|
| **Selection errors** | The agent loads the wrong skill or asks me to choose. |
| **Context cost** | Multiple descriptions compete before the task starts. |
| **Conflicting instructions** | Similar skills disagree about the workflow or output. |
| **Maintenance burden** | A fix in one skill leaves the others stale. |

The fix wasn't to make all three descriptions longer. I made `cole-excalidraw` the preferred Codex renderer, marked `excalidraw-diagram` as legacy, and kept the Claude-specific skill on the surface it governs. The library became easier to route because each remaining option had a clear job.

If two skills can fire on the same request, their scopes need to be obviously different or one needs to call the other deliberately. Otherwise the library pushes a design decision back onto the agent every time it runs.

## What a production skill needs

A skill that earns permanent context needs a scoped trigger, narrow authority, positive instructions, hard stops, and proof that it ran.

![The anatomy of a skill that holds: a scoped trigger, role and authority, positive instructions, and hard stops](/images/skill-anatomy-four-components.png)

1. **Scoped trigger:** say exactly when the skill should load. "When I say wrap up this session" is useful. "For maintenance" can fire almost anywhere.
2. **Narrow authority:** define the judgment it owns. A session-maintenance skill shouldn't have permission to rewrite an article it notices along the way.
3. **Positive instructions:** describe the required workflow and outputs.
4. **Hard stops:** state what the skill must never do when speed or helpfulness pulls it outside scope.
5. **Proof:** leave an artifact or observable result that shows the workflow completed.

My `wrapup` skill clears that bar. It came from a repeated chore: every session needed a recap, topic-map breadcrumbs, and index maintenance. It also prevents a specific failure. During maintenance, the agent isn't allowed to "helpfully" edit content bodies or auto-fix links it discovers.

The proof is visible after every run: a dated session recap exists, the affected topic maps have new breadcrumbs, and the vault index reflects files that changed. If those artifacts aren't there, the skill didn't finish.

The file itself is mostly trigger, workflow, and limits:

```yaml
---
name: wrapup
description: >
  Run end-of-session maintenance for the vault: write a dated session recap,
  update topic-map breadcrumbs, refresh the index, and audit for missing links.
  Use when I say "wrapup," "wrap up this session," or "session end."
---

## Role
You are a session-maintenance agent for this vault. You record what changed
and keep the navigation layer current. You don't write or edit the content.

## Do
- Write a dated recap: what got done, files changed, next priorities
- Add a breadcrumb to each affected topic map, newest first
- Reconcile the index against the files that changed

## Never Do This
- Never edit the body of a content file
- Never auto-fix a broken link; flag it for review
- Never delete a file; move it to Archive instead
- Never change priorities or status without asking first
```

## Pressure-test the boundary

The first run of a skill is usually flattering. You wrote it for the task in front of you, so of course it works on that task.

The useful test is whether the boundary holds when following it becomes inconvenient:

1. **Happy path:** run a normal, clearly in-scope task.
2. **Ambiguous path:** run something near the edge of the trigger.
3. **Pressure path:** run a task where skipping a rule would be faster.

The pressure path catches the failures that matter. I once had a voice rule banning em dashes without explaining how to replace them. The agent followed the constraint and left worse sentences behind. Another domain skill described the audience in detail but didn't constrain tone, so the output drifted whenever the task looked slightly different.

Both skills worked on their demo cases. They failed when their instructions had to compete with the agent's other goals, which is the actual production environment for a skill file.

## Maintain the library like code

Reusable skills belong at the global level. Project-specific skills should sit beside the project they govern. That split keeps local rules from leaking into unrelated work, and it gives the agent a clearer routing decision.

![Skill library architecture separating reusable global skills from project-local skills](/images/skill-library-architecture.png)

The description in each skill's frontmatter is its interface. Keep it specific enough to distinguish the skill from its neighbors. When behavior changes, note why, especially after narrowing a trigger or adding a hard stop in response to a failure.

Then delete or archive what hasn't earned its place. An unused skill isn't harmless just because it is a markdown file. Its description still competes for attention, and somebody has to remember whether its instructions are current.

## The keepers checklist

Before a skill stays in the library, it should pass these checks:

- It captures behavior repeated across separate sessions or prevents a repeated failure.
- Its trigger doesn't overlap with another skill unless the relationship is deliberate.
- Its authority is narrow enough that it can't wander into unrelated work.
- It says what to do and where to stop.
- It leaves proof that you can inspect.
- It holds on happy, ambiguous, and pressure paths.

Anything else is still a prompt, and that is fine. Prompts are cheaper to change, easier to discard, and don't ask every future session to carry their instructions.

## Run a two-sided skill audit

Audit both directions: find repeated behavior that has earned promotion, then remove installed skills that haven't earned their context.

```text
Audit my agent skills from the last 30 days.

1. What behavior have I repeated across multiple sessions that should become a skill? Look for workflows I re-explain and failures I repeatedly correct.

2. Which installed skills haven't been used in the last 30 days? Distinguish actual skill usage from skills merely listed as available.

For each skill candidate, explain the repeated behavior, proposed trigger, hard stops, and how I could verify it ran.

For each unused or overlapping skill, recommend keep, narrow, merge, archive, or remove. Favor a smaller library unless usage proves the skill earns its context and maintenance cost.
```

My audit promoted `wrapup`, clarified the Excalidraw overlap, and exposed skills I had installed for a future that never showed up.

Start there. Remove what hasn't earned its context, then formalize the repeated behavior you can prove is worth keeping.

*Related: [Context Engineering for AI Coding Tools](/articles/context-engineering-ai-coding-tools) explains where skill descriptions fit in the broader context layer. [How I Actually Use AI Agents Every Day](/articles/ai-agent-workflow-claude-code) shows the workflow around them. [Is the DOE Framework Still Relevant in the Age of Claude Skills?](/articles/doe-framework-claude-skills) covers how skills fit into a larger operating system.*
