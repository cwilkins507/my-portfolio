---
title: "Coding Wars 3.0: Opus 5.5 Changed My Default"
date: "2026-10-04"
slug: "coding-wars-3-opus-5-5-vs-gpt-6-1-sol"
tags: ["AI", "Software Engineering", "AI Coding Models", "Developer Tools", "Claude Code", "Codex"]
excerpt: "Seven models, one real repository bug. All passed the hidden test; Opus 5.5 was fastest at 46 seconds and became my routine-work default. GPT-6.1 Sol stays the cheap batch pick at about $0.09."
image: "/images/articles/coding-wars-3-opus-5-5-vs-gpt-6-1-sol.png"
image_alt: "Seven coding models plotted by run speed and estimated cost, with Opus 5.5 marked as the default."
seo_title: "Best AI Coding Model 2026: Opus 5.5 vs GPT-6.1 Sol vs Sonnet 5.5 vs Astra"
meta_description: "Seven coding models on one real repository bug. All passed; Opus 5.5 was fastest at 46s and became my default. GPT-6.1 Sol stays the cheap pick at ~$0.09."
target_keywords: "best ai coding model 2026, opus 5.5 vs gpt-6.1 sol, sonnet 5.5 coding, gpt-6 astra vs opus 5.5, gemini 4 argon coding, kimi k3 coding, gemini 3.8 flash coding"
---
My most popular writeup returns: a review of the latest model releases.

For the last four or five releases, GPT won most of my coding work. I barely touched Claude after Opus 4.7. Then, in ten days, Anthropic shipped Opus 5.5 and Sonnet 5.5, OpenAI shipped GPT-6 Sol, GPT-6 Luna, and GPT-6.1 Sol, and Google announced Gemini 4 Argon.

Almost every major lab put out a new version in the last month, and the pace isn't slowing down. So here's a look at each one and whether it lives up to the hype.

I'll admit I'm skeptical going in. Every launch came with a chart showing it on top, but I'm not convinced these are meaningful improvements over what they replaced, whatever the benchmarks say. So I gave each model the same real bug from one of my repositories and compared what came back.

One small bug isn't enough to crown a universal winner, but it did change my default. Opus 5.5 finished in 46 seconds; the Sols took about 100 for essentially the same fix. GPT-6.1 Sol is still the cheapest at about $0.09, so it keeps my batch work.

## What shipped since Coding Wars 2.0

| Model | Vendor | Released | API price (input / output per 1M) | Vendor's coding pitch |
|---|---|---|---|---|
| Claude Opus 5.5 | Anthropic | Sep 22, 2026 | $4 / $20, $0.20 cache reads | Fable 5.1-level on most work at 40% lower run cost than Opus 5; 66.4% Terminal-Bench 4.0 (xhigh) |
| Claude Sonnet 5.5 | Anthropic | Sep 28, 2026 | $2 / $10 | 30%+ faster, up to 30% less per task; 70.6% Terminal-Bench 4.0 |
| GPT-6 Astra | OpenAI | Sep 3, 2026 | $10 / $50 | OpenAI's most capable model |
| GPT-6.1 Sol | OpenAI | Sep 29, 2026 (DevDay) | $2 / $10, $0.10 cached | Matches Astra on DeepSWE v1.1 at about one-fifth the cost |
| Gemini 4 Argon | Google | Announced Sep 30, 2026 | $2 / $10 introductory, then $4 / $20 | 77.9% DeepSWE v1.1; 1M output tokens |
| Gemini 3.8 Flash | Google | Sep 2, 2026 | $0.75 / $3.75 introductory through Dec 31, then $1.50 / $7.50 | 73.8% DeepSWE v1.1 (as listed in OpenAI's Astra table); the Gemini you can call today |
| Kimi K3 | Moonshot AI | Jul 2026 (Bedrock listing Sep 18) | $3 / $15, $0.30 cached | Open-weight, 1M context, native vision; always reasons |
| DeepSeek V4.1 Flash | DeepSeek | Sep 10, 2026 | $0.15 / $0.60 off-peak, $0.30 / $1.20 peak | Open weights; DeepSeek says it beats its own V4-Pro, which it's phasing out |

All benchmark numbers above are vendor-reported. I use them to build the shortlist.

The price cuts made this worth rerunning. Opus 4.5 through Opus 5 cost $5/$25; Opus 5.5 is $4/$20. GPT-6 Sol came in at half of GPT-5.6 Sol, and GPT-6.1 Sol kept the $2/$10 price. Astra and Claude Fable 5.1 remain at $10/$50.

![OpenAI (@OpenAI) on X, Sep 29, 2026: GPT-6.1 Sol pricing card showing GPT-6 Astra at $10/$50, GPT-6.1 Sol at $2/$10 with $0.10 cached input, and GPT-6 Luna at $0.10/$0.50](/images/coding-wars-3-0-openai-gpt-6-1-sol-pricing.png)

![Claude (@claudeai) on X, Sep 22, 2026: "Introducing Claude Opus 5.5, the first model in our new Claude 5.5 family. It performs at the level of Claude Fable 5.1 for most tasks, and costs 40% less to run than Opus 5."](/images/coding-wars-3-0-claude-opus-5-5-launch.png)

The reception went the other way from the price chart. Over the last two weeks, Opus 5.5 has had a warmer reception than either Sol release, and Anthropic and OpenAI have more or less swapped places. Anthropic cut Opus prices and raised five-hour limits on its subscription plans at launch. OpenAI paused new sign-ups for its $200 Pro plan in September, then reopened it at DevDay with half the Codex and Work allowance, added a $500 tier, and launched Dots, its always-on agents, on the Pro plans. That's a lot of subscriber trust to spend in one month.

Anthropic puts Sonnet 5.5 at 70.6% on Terminal-Bench 4.0 versus Opus 5.5 at 66.4%, at half the price. It also says Opus 5.5 "remains clearly stronger at complex, open-ended work requiring sustained judgment." That gives me a reason to test both; it doesn't settle which one to use.

DeepSeek V4.1 Flash costs $0.15/$0.60 off-peak, about a thirteenth of Sol's price. DeepSeek says it beats V4-Pro and is retiring the bigger model. Zhipu's GLM-5.3 Flash ran anonymously on OpenRouter as "Ox Alpha" for six days in August before Z.ai claimed it and published the weights. Neither was included in this test.

![Ahmad Osman (@TheAhmadOsman) on X, Sep 30, 2026: GLM 5.3 Flash, DeepSeek V4.1 Flash, Qwen 3.8 Next Flash, and Qwen 3.8 27B are all outperforming every model considered "frontier intelligence" at Christmas 2025, ten months earlier](/images/coding-wars-3-0-ahmad-open-weights-flash.png)

![DeepSeek (@deepseek_ai) on X, Sep 10, 2026, introducing DeepSeek-V4.1-Flash, with a vendor chart comparing it to Kimi K3, GLM-5.3, Opus 5, and GPT-5.6 Sol on Terminal-Bench 3.0, DeepSWE v1.1, CyberGym, and AutomationBench](/images/coding-wars-3-0-deepseek-v4-1-flash-launch.png)

DeepSeek's chart uses Terminal-Bench 3.0; the other launches here report 4.0. Its comparisons include the previous generation, Opus 5 and GPT-5.6 Sol. I wouldn't combine those scores into a ranking.

## The leaderboard can't tell me how long the PR takes

The vendors didn't pick the same benchmarks. Google leads with Argon's 77.9% on DeepSWE v1.1. OpenAI says GPT-6.1 Sol matches Astra there; Astra's launch table lists 74.1%, Gemini 3.8 Flash at 73.8%, and Opus 5 at 73.7%. Anthropic's Opus 5.5 page leads with Terminal-Bench 4.0 (66.4%) and FrontierCode 1.1 Main (54.4% vs Astra's 53.3%).

Harnesses and fallback rules complicate the comparison. Anthropic says older Claude models finished some Opus 5.5 benchmark tasks when safeguards intervened. OpenAI says one competitor's AutomationBench cost is understated because fallbacks fired on about 40% of tasks. Anthropic's own warning is that benchmark margins "have become a less reliable guide to real-world differences."

METR's finding from [Coding Wars 2.0](/articles/kimi-k2-6-vs-glm-5-1-vs-claude-opus-4-7) is still the useful check: plenty of SWE-bench-passing PRs wouldn't be merged by a maintainer. Passing tests leaves engineering review to do.

Theo ran Terminal-Bench 4.0 himself before public scores existed. His Sep 29 chart puts GPT-6.1 Sol above Opus 5.5 at "~1/30th of the price." Opus lands under 60%, against Anthropic's 66.4%. The benchmark name alone doesn't make those results comparable.

![Theo (@theo) on X: "When I made this video, there were no benchmarks yet, so I had to run them myself… Performance better than Opus 5.5 for ~1/30th of the price," with a Terminal-Bench 4.0 score-vs-cost-per-task chart showing GPT-6.1 Sol near the top left, above Opus 5.5, GPT-6 Astra, and Fable 5.1](/images/coding-wars-3-0-theo-terminal-bench-cost.png)

Kache posted that he'd switched from Astra to DeepSeek V4.1 Flash a week after its launch. That's a usage report, and DeepSeek wasn't part of this test.

![kache (@yacineMTB) on X, Sep 16, 2026: "I'm using deepseek flash 4.1 instead of astra now by the way"](/images/coding-wars-3-0-kache-deepseek-over-astra.png)

## Same repository, same job

StackForge is the Node.js tool I use to run my job search. The task is a bug I fixed in August: when telemetry throws while recording a *successful* browser step, the code relabels that step as a failure. The fix must report `telemetry_write_failed` while preserving the step's success status.

My shipped fix and regression test stayed hidden from every model. The test became the grader.

Fixed for every model:

- Starting point: the commit before my fix, copied into a fresh repo with no git history and personal data redacted
- Prompt: identical, word for word
- Harness: omp in non-interactive mode (`omp -p`), one fresh repo per model (18.3.2 for six runs; 18.5.1 for GPT-6.1 Sol, which needed the update)
- Effort: `--thinking high` for all; no Opus "max"
- Budget: 45 minutes wall clock (nobody came close)
- Grader: my original regression test, added after each run, plus the full suite
- No help or mid-run edits; no model asked a question

Redacting `applicant.json` breaks three unrelated tests at the starting commit. A clean run is 117 passing and those same 3 failing.

## The results

All seven models passed the hidden regression and left the suite's existing failures unchanged. The diffs exposed differences the grader didn't catch.

| Model (route) | Hidden test | Suite | Files | Lines +/− | Wall clock | Output tok/s | Est. cost |
|---|---|---|---|---|---|---|---|
| Claude Opus 5.5 (Anthropic) | Pass | 117 / 3 known | 2 | +47 / −10 | 46s | 88 | $0.48 |
| Claude Sonnet 5.5 (Anthropic) | Pass | 117 / 3 known | 2 | +45 / −7 | 50s | 75 | $0.22 |
| GPT-6 Sol (Codex) | Pass | 117 / 3 known | 2 | +49 / −7 | 99s | 27 | $0.15 |
| GPT-6.1 Sol (Codex) | Pass | 117 / 3 known | 2 | +47 / −7 | 97s | 19 | $0.09 |
| GPT-6 Astra (Codex) | Pass | 117 / 3 known | 3 | +47 / −7 | 155s | 13 | $0.51 |
| Kimi K3 (Copilot) | Pass | 117 / 3 known | 2 | +44 / −5 | 113s | 37 | $0.14 |
| Gemini 3.8 Flash (Copilot) | Pass | 117 / 3 known | 2 | +81 / −13 | 144s | 33 | $0.41 |

Cost is omp's estimate at each model's list API price. I ran on subscriptions, so these are estimated API costs. Output tok/s is output tokens divided by wall clock, so it includes tool calls and test runs; read it as end-to-end speed on this task, not raw generation speed. GPT-6.1 Sol ran later the same day after an omp update added it to the Codex route, with the same starting repo, prompt, and grader.

### A second reviewer: GPT-6.1 Sol as judge

GPT-6.1 Sol reviewed the ticket, original code, and seven diffs labeled A–G in shuffled order, with no model names or tools. It returned scores, merge decisions, and risks. It was judging its own submission blind and ranked itself second, behind GPT-6 Sol.

| Model | Correct | Edit discipline | Convention fit | Est. review | Judge's call |
|---|---|---|---|---|---|
| GPT-6 Sol | 5 | 5 | 5 | 8 min | Merge (ranked 1st) |
| GPT-6.1 Sol | 5 | 5 | 5 | 8 min | Merge (2nd) |
| GPT-6 Astra | 5 | 5 | 5 | 9 min | Merge (3rd) |
| Sonnet 5.5 | 5 | 5 | 5 | 8 min | Merge (4th) |
| Opus 5.5 | 5 | 4 | 5 | 10 min | Merge (5th) |
| Kimi K3 | 3 | 5 | 4 | 12 min | Request changes (6th) |
| Gemini 3.8 Flash | 3 | 2 | 3 | 18 min | Request changes (7th) |

Review minutes are the judge's estimates. It called the top five a "narrow preference based on regression strength and patch size, not a material difference in the core fix." GPT-6 Sol's regression uses a misleading callback error message and an `ETIMEDOUT` code, a better trap for accidental tool-error classification.

### Sonnet 5.5 and the Sols: the same fix

Sonnet's `apply.mjs` change matches my August fix line for line except for one parameter name, including the helper name `emitToolTrace`. GPT-6 Sol's production diff is byte-identical to Sonnet's. GPT-6.1 Sol uses the same logic with a different helper name and a comment restricting failure classification to the operation's own errors. Their tests differ.

Sonnet took 50 seconds for about $0.22. Both Sols took about 100 seconds; 6.1 cost about $0.09. Any of the three is a merge-without-edits result for this ticket.

### Opus 5.5: an extra cleanup

Opus produced the same fix, then extracted error construction into a helper shared with an existing telemetry path. Reasonable cleanup, but outside the task; the judge docked it one point for edit discipline. It was the fastest run at 46 seconds, about 88 output tokens per second end to end, more than four times GPT-6.1 Sol's rate.

Anthropic's cost pitch also showed up in early usage reports:

![wolfie (@wolfie_) on X, Sep 25, 2026: "opus 5.5 is actually ridiculous like wtf. this took almost no effort to make and barely made a dent in my usage. feels like december 2025 again," with a video demo](/images/coding-wars-3-0-wolfie-opus-5-5.png)

### GPT-6 Astra: the same answer for more

Astra used the same production logic as GPT-6.1 Sol and added two lines to the README. I counted that as scope creep; the judge called it "related documentation." It cost about five times as much and took 1.6 times as long. This bug didn't justify the premium.

OpenAI says Astra "should be used for the most difficult scientific research tasks." Both OpenAI and Google report 68.1% on Terminal-Bench Science for Astra. OpenAI also reports 63.9% on internal database migration tasks versus 57.8% for Fable 5.1. Those are vendor claims for work this test didn't cover.

### Kimi K3: a partial fix

Kimi wrapped the success-event callback but left the "started" and failure callbacks raw. The judge requested changes because the ticket requires *any* callback throw to produce `telemetry_write_failed`. Kimi covered one of three events. It was the cheapest of the original six and had the smallest diff, but didn't fully meet the ticket.

### Gemini 3.8 Flash: a useful catch in a diff I wouldn't merge

Gemini's diff is nearly twice the size of the others. It moved declarations, changed page creation, and swallowed telemetry errors on the failure path. It also reused a failure flag from a different telemetry channel, so one callback failure disables the other. The judge requested changes.

Gemini was also the only submission to fix and test a page leak. A success-telemetry exception can interrupt the outer page assignment after the browser opens a page, leaving cleanup unable to close it. Gemini assigns the page inside the operation and asserts that it closes. The judge flagged the same gap in the other six diffs, and an extra test confirmed it: those six leak the page, and so does the fix I shipped in August. I'd keep Gemini's fix while rejecting the unrelated error-path changes.

### Gemini 4 Argon: claims only

I don't have access to Argon. Google is rolling it out to cyber defenders through the Fairwind Program first, with paid API customers later. Gemini 3.8 Flash, generally available since Sep 2, took Google's seat in this run.

Google says Argon leads DeepSWE v1.1 at 77.9%, ranks first on the Vals Index and AutomationBench, and raises the output limit to 1M tokens from 64K. Its migration examples include C/C++ to Rust across Google and 800K+ lines for the Fuchsia Zircon kernel. Introductory API pricing is $2/$10, rising to $4/$20 later.

![Google DeepMind (@GoogleDeepMind) on X introducing Gemini 4 Argon, with a benchmark table against GPT-6 Astra, Claude Fable 5.1, and Claude Opus 5.5](/images/coding-wars-3-0-gemini-4-argon-launch.png)

Google's table puts Argon ahead of Opus 5.5 on DeepSWE (77.9% vs 74.2%), but behind Astra, Fable 5.1, and Opus 5.5 on Terminal-Bench 4.0 (57.4% vs Opus's 66.4%). It gives Astra the top spot on Terminal-Bench Science (68.1%) and FrontierSWE v2. Argon goes into my next packet run when the API opens.

## The review bill

The judge estimated 8 minutes of review for Sonnet and both Sols, versus 18 minutes for Gemini. The page leak explains why review is still necessary after a passing test: a larger diff can contain a useful fix alongside changes I'd reject.

At $2/$10 for both Sol and Sonnet, list token prices don't separate them. The run cost, speed, and review burden do. When the review bill is a near-tie, speed is what I feel all day. For the organizational cost of generation outrunning review, see [The Claude Code Productivity Paradox](/articles/claude-code-productivity-paradox).

## My routing rule after the test

| Work type | Default | Escalate when | Why |
|---|---|---|---|
| Routine reversible edit | Opus 5.5 | Verification fails twice | Fastest run (46s, ~88 tok/s), same core fix as the top-ranked diffs; Opus 5.5's price cut makes it affordable as a default |
| Cost-sensitive or batch work | GPT-6.1 Sol | Speed matters more than spend | Matched my shipped fix, ranked 2nd by the blind judge, cheapest run in the test (~$0.09) |
| Final review on a risky diff | GPT-6.1 Sol as a blind reviewer | Always paired with a human owner | Found the page leak and flagged Kimi's partial fix |
| Open-weight / private deployment | Kimi K3, with review | Serving cost beats managed price | Cheap and fast, but its fix didn't fully meet the ticket |
| Didn't earn a lane on this test | GPT-6 Astra | Hard science or big data migrations, per OpenAI | Same answer as 6.1 Sol at about 5x the cost, and the slowest run |

This task was too small to establish an Opus advantage on difficult cross-file implementation. The case for Opus here is speed at equal correctness, not depth.

Sonnet and the two Sols were equivalent on the core fix, and Opus matched them apart from its extra cleanup. Sonnet was nearly as fast as Opus at half the cost, so it's a reasonable pick if price matters more to you than it does to me. Multi-model routing is infrastructure, and [you probably don't need a gateway yet](/articles/llm-gateway-architecture).

## What I'd use tomorrow

GPT-6 Sol ranked first, though the judge's top five were a near-tie. When the outputs are that close, I take the faster model. Opus finished in 46 seconds; the Sols took about 100. Across a day of small edits, that difference compounds, and waiting is what pulls me out of the work. GPT-6.1 Sol is still the cheapest run, and I'll keep it for batch and cost-sensitive jobs, but Opus 5.5 is my default for routine work. After four or five releases on GPT, the price cut is what brought me back to Claude.

One thing this test made me think about: if a $2/$10 model writes the same fix as a $10/$50 one, the price is going to keep moving, and I don't think it settles anytime soon. That's why I still think local models are worth figuring out. The hardware isn't cheap. A 64GB M5 Max MacBook Pro runs about $5,400, and NVIDIA's DGX Spark went up to $4,699 this year. It's a bigger upfront bet, but a model you run yourself doesn't change its price, its safety rules, or its behavior on you after you've built around it. I'll dig into that in a separate piece.

Argon, Haiku 5.5, and Sol Ultrafast will need fresh runs when they're available. Copy the task packet and compare your current default with one challenger. Count the review minutes.

For the harness I used to switch providers mid-test, read [The Best AI Coding Harness You Have Probably Never Heard Of](/articles/best-ai-coding-harness-omp).

## Sources Checked

- Anthropic, [Claude Opus 5.5](https://www.anthropic.com/claude-opus-5-5)
- Anthropic, [Claude Sonnet 5.5](https://www.anthropic.com/claude-sonnet-5-5)
- Addy Osmani / claude.dev, [What a task costs on Opus 5.5](https://claude.dev/blog/what-a-task-costs-on-opus-5-5/)
- OpenAI, [Introducing GPT-6.1 Sol](https://openai.com/index/introducing-gpt-6-1-sol/)
- OpenAI, [Introducing GPT-6 Sol and Luna](https://openai.com/index/introducing-gpt-6-sol-and-luna/)
- OpenAI, [GPT-6 Astra](https://openai.com/index/gpt-6-astra/)
- Google, [Gemini 4 Argon: our next era of frontier intelligence](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/)
- Google, [Introducing Gemini 3.8 Flash and 3.8 Flash Cyber](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/)
- DeepSeek, [DeepSeek-V4.1-Flash release note](https://api-docs.deepseek.com/news/news260910) and [Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing)
- Moonshot AI, [Kimi K3 on OpenRouter](https://openrouter.ai/moonshotai/kimi-k3)
- Business Insider, [Mystery solved: Chinese lab Z.ai says it's behind the Ox Alpha model](https://www.businessinsider.com/ox-alpha-model-made-by-china-z-ai-2026-8)
- CDW, [MacBook Pro 16" M5 Max, 64GB, 2TB](https://www.cdw.com/product/apple-macbook-pro-16-m5-max-64gb-2tb-40-core-standard-glass-si/9097338) ($5,399 listed)
- Overclock3D, [Nvidia raises DGX Spark price by $700](https://overclock3d.net/news/systems/nvidia-raises-dgx-spark-price-by-700-due-to-memory-supply-constraints) ($3,999 → $4,699, Feb 2026)
- Simon Willison, [Claude Opus 5.5, GPT-6 Sol, GPT-6 Luna, and a new price war](https://simonwillison.net/2026/Sep/22/opus-and-sol-and-luna/)
- InfoQ, [OpenAI DevDay 2026 Recap for Developers](https://www.infoq.com/news/2026/10/openai-devday-2026/)
- Fortune, [OpenAI pauses $200 ChatGPT Pro sign-ups](https://fortune.com/2026/09/11/openai-astra-chatgpt-pro-pause/)
- The Next Web, [OpenAI halves Pro 200 usage and launches a $500 ChatGPT plan](https://thenextweb.com/news/openai-devday-pro-200-usage-cut-pro-500-plan)
- METR, [Many SWE-bench-Passing PRs Would Not Be Merged into Main](https://metr.org/notes/2026-03-10-many-swe-bench-passing-prs-would-not-be-merged-into-main/)
