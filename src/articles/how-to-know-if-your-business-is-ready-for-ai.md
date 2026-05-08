---
title: "How to Know If Your Business Is Ready for AI"
date: "2026-04-10"
updated: "2026-04-15"
tags: ["AI", "AI Adoption", "Engineering Leadership", "Claude Code", "Convention Files", "AI Strategy"]
excerpt: "A 2-minute AI readiness quiz for engineering teams using Claude Code, Cursor, Cowork, or ChatGPT. Five questions, four levels, and the one thing to do next at each stage — whether your team ships code, decks, or reports."
image: "/images/articles/how-to-know-if-your-business-is-ready-for-ai.png"
image_alt: "Four-level AI readiness spectrum moving from individual experimentation to governed team adoption."
seo_title: "How to Know If Your Business Is Ready for AI"
meta_description: "A 2-minute AI readiness quiz for engineering leaders. Five questions, four maturity levels, and what to do next at each stage."
target_keywords: "is my business ready for AI, is my engineering team ready for AI, AI readiness engineering teams, Claude Code rollout, convention files, when to use AI coding tools"
---
# How to Know If Your Business Is Ready for AI

Your team just started using Claude Code, ChatGPT, or Gemini for a few months now. Output quality swings wildly between people, so you are starting to ask whether any of this is actually working. Leadership keeps nodding at the demos, but velocity hasn't moved in a way anyone can prove.

That's the question nobody wants to ask out loud: are we actually ready for this, or did we skip a step?

After a decade inside engineering orgs at Ford and Morningstar, the pattern is consistent. What matters is whether your team has the foundation: convention files, shared patterns, ownership, measurement.

Here's a 2-minute quiz to find out where you actually sit, and what to do next.

**If you're not an engineering team, read along with some mental substitutions** The examples here are engineering-specific (Claude Code, Cursor, CLAUDE.md, code review) because that's where the foundation is most concrete. Convention files are literal files in a repo, which makes them verifiable. But the same principles apply anywhere your team is using AI: marketing copy, client decks, quarterly reports, analytics dashboards, or operational workflows. Replace "CLAUDE.md" with "SOP." Replace "repo" with "shared drive." Replace "code review" with "output review." The foundation stays the same no matter what tools you're running, and the level you land on says the same thing about your team either way.

---

## The AI Readiness Quiz

Five questions. Pick the answer closest to your team's current state. Count your A's, B's, and C's.

### 1. How does your team evaluate AI output quality?

- **A.** Each person decides for themselves. If it passes the sniff test, it ships.
- **B.** Output review catches AI slop, but it's the same slop repeating across workflows.
- **C.** Output reviews flag AI-specific failure modes, and convention files killed the most common ones before they ever reached a human reviewer.

### 2. Where is your team spending time on repetitive work?

- **A.** Honestly, no idea. We haven't tracked it.
- **B.** I can name 2-3 places (test scaffolding, code review, maybe migrations), but we're not measuring whether AI actually helped.
- **C.** We track it per sprint (2 weeks). Migration work and test scaffolding are measurably faster, and we have rough hours-saved numbers per category.

### 3. What's in your main repo for AI context?

- **A.** Nothing. Users prompt however they figured out on their own.
- **B.** A CLAUDE.md or AGENTS.md (convention file) exists, maintained by one brave soul. Most of the team ignores it.
- **C.** Convention files are load-bearing. Updated regularly, reviewed like code. A new team member can onboard to "how we use Claude Code here" in thirty minutes.

### 4. Who owns your AI tooling strategy?

- **A.** Everyone and therefore nobody. Seats are in Finance, usage is in Slack, and there's no single point of accountability.
- **B.** One engineer is informally "the AI person," but it's not on their job description and they do it on the side.
- **C.** Someone owns it explicitly, at least part-time. They set the standards, maintain convention files, and answer to leadership on ROI.

### 5. Can you estimate ROI on your current AI tool spend?

- **A.** No idea. Licenses are a line item, usage is anecdotal.
- **B.** I could make something up in a budget meeting, but I don't trust the number.
- **C.** The math is defensible. We can tell leadership what we spent, what we saved, and on which category of work, with enough confidence to keep the seats through budget scrutiny.

---

## Your Score

| Your answers | Your level |
|---|---|
| **4-5 A's** | **Level 1** — Individual experimentation, no foundation |
| **Mostly A's and B's** | **Level 2** — Foundation exists, standardization starting |
| **Mostly B's and C's** | **Level 3** — Convention-driven workflows, measured ROI |
| **4-5 C's** | **Level 4** — Multi-team adoption, architectural integration |

If you're stuck between two levels, default down. The pre-work you were going to do anyway happens there, and the tools catch up faster than you think.

![AI Readiness Spectrum: four levels from individual experimentation to multi-team adoption](/images/ai-readiness-4-level-spectrum.svg)

---

## Level 1: Individual experimentation, no foundation

Licenses are being activated and developers using the tools however they figured out on their own. There are no convention files in the repo or shared patterns. Two employees on the same team prompt Claude Code completely differently, and neither is wrong, but neither is shared. Most teams are here right now, and most of them think they're at Level 2. The output variance you're seeing is baked in.

**You're here if:** Your repo has no CLAUDE.md or AGENTS.md, and "how we use AI here" lives in one person's head.

**Do this next:** Commit a first-draft convention file to your main repo this week. Thirty lines from your best-AI-output senior engineer, describing how the codebase actually works. It'll be wrong in places. Iterate from there. (If you need a starting template, [Context Engineering for AI Coding Tools](/articles/context-engineering-ai-coding-tools) breaks down the anatomy. For real examples to copy from, see the [community catalog at agents.md](https://agents.md/#examples) or [mine](/agents).)

## Level 2: Foundation exists, standardization starting

You've created a convention file. One or two employees are sharing patterns in PR reviews and Slack. You can see measurable improvement on boilerplate, migrations, scaffolding — the stuff that used to be Wednesday afternoon work and is now Wednesday morning work. This is where most "successful AI adoption" stories actually sit. The LinkedIn posts about how AI changed someone's velocity are usually right around here. The trap is mistaking Level 2 for Level 3 — that's [The Claude Code Productivity Paradox](/articles/claude-code-productivity-paradox) in a sentence. AI feels productive without moving team-wide velocity in a way leadership can measure.

**You're here if:** Your convention file gets updated by more than one person, and you've killed at least one recurring category of AI slop through better context rather than manual review catches.

**Do this next:** Measure one recurring workflow for a month. Output review first-pass, migration work, or draft generation. Real numbers: how many PRs, how many hours, how much cleanup after the AI finished. That measurement is the entry point to Level 3, and without it you're guessing.

## Level 3: Convention-driven workflows with measured ROI

Convention files live alongside code, get updated like code, and the team treats them as load-bearing. Someone owns AI tooling strategy. When a new team member joins, they're productive with the tooling in the first week because the context for how this team works is committed to the shared file. Leadership can answer "what did AI save us this quarter" with a defensible range.

**You're here if:** ROI is rough but tangible, convention files are part of code review, and AI tooling has a named owner with at least part-time allocation.

**Do this next:** Find the highest-leverage workflow that isn't yet AI-augmented and get it to production. Internal automation replacing SaaS line items is usually the biggest win after code generation work. The IoT telemetry pipeline that I helped build at Ford cut $5M in operational costs follows the same pattern. Find the repetitive operational work, build the thing, measure the savings.

## Level 4: Multi-team adoption, architectural integration

Multiple teams running production workloads that depend on AI. Agentic workflows for incident triage, release notes, on-call augmentation. Maybe an LLM-powered feature in the product itself. The question stops being "which AI coding tool" and starts being "how do we govern AI-dependent systems across the whole org." Model selection becomes strategic.

**You're here if:** You read the first three levels and mostly nodded. Most teams aren't at Level 4 this year, and that's fine.

**Do this next:** You need architectural judgment across teams, not another rollout. Find someone who's built and shipped this in an org your size.

---

## What Other Teams Are Actually Running

If your team isn't running at least one of these workflows, the quiz above is telling you something. These are things real teams are doing right now with Claude, ChatGPT, and Cowork. [Worklytics' 2025 adoption benchmark](https://www.worklytics.co/resources/2025-ai-adoption-benchmarks-employee-usage-statistics) puts marketing teams at 70-85% AI tool adoption and finance and sales at 65-80%. Every function is already using AI. The differentiator now is depth of use.

**Marketing:** brand voice checkers against every outbound draft, ad copy variants at scale, a living instruction file holding banned phrases, current campaigns, and competitor positioning.

>Foundation test: does your brand voice doc live somewhere the AI can actually reference, or is it a PDF nobody has opened in six months?

**Sales:** auto-enriching CRM notes from call transcripts, first-draft proposals from intake forms, battle cards the AI pulls from during live deals. [Morgan Stanley's AskResearchGPT](https://www.morganstanley.com/press-releases/morgan-stanley-research-announces-askresearchgpt) gives salespeople and research staff a way to surface insights across 70,000+ proprietary reports, with a one-click auto-draft-email feature that cut client-inquiry response time by roughly 90%.

>Foundation test: does your ICP and objection-handling playbook live in a shared doc the AI uses?

**Finance and ops:** variance analysis narratives from raw P&L ("why revenue dropped 8%"), monthly board packets generated from metrics, SOPs for recurring processes.

>Foundation test: do your metric definitions live in one place, or does each report reinvent the wheel?

**HR and People:** job descriptions from role scorecards, interview feedback summarized across panels, performance review scaffolding from quarterly notes.

>Foundation test: do your competency frameworks live where the AI can reference them, or only in one HR business partner's head?

**Analysts:** dashboard commentary (the "why behind the numbers" paragraph nobody wants to write), exec summaries of weekly metrics, slide-ready takeaways from raw SQL.

>Foundation test: do your metric definitions and chart style rules live anywhere the AI can see?

**Operations and PMs:** meeting summaries from recordings, runbooks from post-incident notes, weekly status updates built from Slack and Jira threads.

>Foundation test: does your team's operating rhythm live in a doc, or only in your head?

The Anthropic skills pack makes much of this plug-and-play: **pptx** for decks, **xlsx** for spreadsheets, **docx** for Word files with tracked changes, **pdf** for document processing, **internal-comms** for status reports, **canvas-design** for one-pagers. Anthropic's official [financial-services-plugins pack](https://github.com/anthropics/financial-services-plugins) ships 41 purpose-built skills for equity research, investment banking, PE, and wealth management, all installable without writing code. And community MCP servers like [Aanerud's Microsoft Office integration](https://github.com/Aanerud/MCP-Microsoft-Office) (117 tools across Outlook, Excel, PowerPoint, Teams) plug Claude directly into the tools your non-technical teams already live in.

Whatever your function, the quiz above is telling you the same thing.

---

## What Most Teams Get Wrong About Timing

Most teams won't skip the tools. They'll keep paying for seats, keep shipping AI-assisted work (code, decks, reports, marketing copy, whatever their function produces), and keep wondering six months from now why output didn't move the way the vendor demos implied. The orgs figuring this out first use the same models everyone else has access to, just with better context: convention files, shared patterns, measured workflows, a named owner. The gap compounds every quarter.

Nobody's telling you that part from stage. The tools aren't the competitive advantage anymore. The foundation is.

Figure out your level. Do the one thing that matches. The worst move right now is spending another quarter evaluating the next AI coding tool while your convention files stay empty and your ROI stays unmeasurable.

---

**Not ready to book yet? Start here.** The [AI Prompt Toolkit](/resources/ai-prompt-toolkit) is 32 prompts I use across two businesses - code review, documentation, market research, competitor analysis, SEO, automation, and AI employees. Copy what fits your team.

---

Want a practitioner read on where your team actually sits? I'm running the first 5 AI readiness assessments at $99 (normally $250) to build out case studies. You get a 1-hour working call, a written action plan with 3-4 highest-ROI next steps, a custom AI Adoption Playbook adapted to your stack, and a ready-to-commit AGENTS.md for your main repo. **[Book one →](/services#assessment)**

Or read the public framework: **[AI Adoption Playbook →](/guides/ai-adoption-playbook)** — this post is Chapter 1. The playbook walks through the other four.
