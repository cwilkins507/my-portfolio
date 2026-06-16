---
title: "Stop Choosing AI Models by Leaderboard Rank"
date: "2026-02-03"
tags: ["Software Engineering", "AI", "Machine Learning", "LLMs", "Developer Tools"]
excerpt: "Model names and rankings expire. A useful selection process starts with the task, measures review burden and failure cost, then routes work to the cheapest model that clears the bar."
image: "/images/articles/ai-model-selection.png"
image_alt: "Model selection matrix matching task complexity to model capability and cost."
seo_title: "AI Model Selection Guide: Evaluate and Route Models by Task"
meta_description: "Choose AI models with a repeatable evaluation process based on task fit, quality, review burden, latency, failure cost, and total operating cost."
target_keywords: "AI model selection, LLM evaluation, model routing, choosing AI models, AI model benchmarks"
related_articles: ["kimi-k2-6-vs-glm-5-1-vs-claude-opus-4-7", "llm-gateway-architecture", "ai-agent-harness"]
faqs:
  - q: "How do I choose the right AI model for a task?"
    a: "Define the task and failure cost, build a small evaluation packet from real examples, test a short list of models under the same conditions, and choose the cheapest option that reliably clears your quality bar."
  - q: "Should I always use the most capable AI model?"
    a: "No. Use the most capable model when the task earns it. Routine extraction, classification, and formatting often benefit more from low cost, low latency, and consistent structured output."
  - q: "How should I use AI benchmarks?"
    a: "Use public benchmarks to build a shortlist, then test models on your own tasks. Benchmarks do not capture your prompts, tools, data, failure costs, or human review burden."
  - q: "When should I add model routing?"
    a: "Add routing after repeated evaluations show that different models earn distinct jobs or escalation lanes. A single well-tested default is easier to operate than premature routing."
---
The model names in the original version of this article were stale before the article was four months old.

That is normal now. Providers release new model tiers, previews disappear, prices move, and yesterday's benchmark winner becomes a historical footnote. A model roster can help with a purchase this week. It is a terrible foundation for a durable selection process.

The useful question is not, "Which model is best?"

It is: **What is the cheapest model that reliably clears the bar for this task?**

That wording forces the real decisions into the open: what success means, what failure costs, how much review the output creates, and whether a more capable model improves the final result enough to earn its cost.

## Pick the operating pattern before the model

![Comparison chart of AI automation, AI workflow, and AI agent paradigms](/images/paradigms-comparison.svg)

Teams often jump to model selection before deciding whether the task should use a model at all.

| Pattern | Best fit | Main control |
|---|---|---|
| Deterministic automation | Predictable inputs and fixed rules | Code, schemas, and tests |
| AI-assisted workflow | Ambiguous work that still needs human judgment | Review and approval |
| Agent | Multi-step work that can run inside clear boundaries | Tools, permissions, checkpoints, and verification |

If a regex, SQL query, or normal function can do the job, use it. No model is cheaper, faster, or easier to debug than code that behaves the same way every time.

Use an AI-assisted workflow when a model can draft, classify, summarize, or propose a change but a person still owns the decision. Use an agent when the work requires multiple steps and the environment can verify enough of those steps without constant supervision.

That choice changes the model requirements. A classifier needs consistency and structured output. A coding agent needs tool use, instruction following, and recovery from failed attempts. Buying both jobs the same "best model" is lazy architecture.

## Start with failure cost

Task complexity matters, but failure cost is the sharper filter.

A wrong label in an internal experiment may cost one retry. A wrong account status can interrupt a customer workflow. A bad database migration can ruin your week. Those tasks should not share the same evaluation threshold just because all three look simple in a prompt.

Write down four things before testing models:

1. **The task:** exact inputs, expected outputs, and allowed tools.
2. **The quality bar:** what must be correct for the result to pass.
3. **The failure cost:** what happens when the model is wrong.
4. **The escalation path:** when the system retries, uses a stronger model, or asks a person.

This also prevents a common mistake: using a larger model to cover for a vague task definition. More intelligence can hide bad instructions during a demo. It does not make the system well designed.

## Build a small evaluation packet

Public benchmarks are useful filters. They are not your acceptance test.

A coding benchmark does not know your repository conventions. A long-context score does not tell you whether a model cites the right source in your research workflow. Provider documentation can tell you which models and capabilities are currently available, but it cannot tell you which one creates the least cleanup for your team.

Build a packet of real examples instead:

- routine examples the system should handle cheaply
- ambiguous examples where instructions can be misread
- edge cases that have failed before
- one or two high-cost failures
- examples that test required output formats or tool use

Ten representative examples are better than fifty random ones. Keep the inputs, expected behavior, and grading notes in version control so you can rerun the same packet when a model or prompt changes.

For each candidate, record:

| Measure | What to capture |
|---|---|
| Task success | Did the result clear the defined quality bar? |
| Review burden | How much human cleanup or verification did it require? |
| Failure shape | Did it fail loudly, quietly, or with polished nonsense? |
| Latency | How long did the full task take, including tools and retries? |
| Cost per accepted result | What did successful output cost after retries and review? |

**Cost per accepted result** matters more than cost per token. A cheap model that needs three retries and ten minutes of cleanup may be the expensive option.

## Match capability to the job

![Decision framework for selecting the right AI model based on task complexity](/images/model-selection-framework.svg)

Model tiers still matter. They just should not become permanent job titles.

Start routine, bounded work with a fast, lower-cost candidate. Classification, extraction, formatting, and simple routing often belong here. Escalate when the task requires deeper reasoning, more reliable tool use, nuanced judgment, or recovery across a long sequence.

For high-risk work, capability alone is not enough. Keep a person in the loop or build deterministic checks around the output. A stronger model can reduce errors; it cannot make an unverified action safe.

Provider model pages are the right place to check the current roster and supported capabilities:

- [OpenAI models](https://platform.openai.com/docs/models)
- [Anthropic models overview](https://docs.anthropic.com/en/docs/about-claude/models)
- [Gemini API models](https://ai.google.dev/gemini-api/docs/models)

Use those pages when building the shortlist. Do not hard-code their current model names into your architecture or your mental model.

## The model shortlist I would test on June 15, 2026

A dated roster is still useful. You just have to treat it like a starting lineup, not a tattoo.

This is the shortlist I would use to begin an evaluation on June 15, 2026. These are candidates to test, not universal winners.

| Job | Models I would shortlist | Why they make the first cut |
|---|---|---|
| Complex reasoning, coding, and high-autonomy agents | [GPT-5.5](https://developers.openai.com/api/docs/models/gpt-5.5), [Claude Opus 4.8](https://platform.claude.com/docs/en/about-claude/models/overview), [Gemini 3.1 Pro Preview](https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview), [Kimi K2.7 Code](https://platform.moonshot.ai/docs/guide/use-kimi-k2-thinking-model), [GLM-5.1](https://docs.z.ai/guides/overview/migrate-to-glm-new) | Each provider positions these models for complex reasoning, coding, tool use, or long-running agent work. Gemini 3.1 Pro is still a preview, so I would not make it the only production path. |
| Maximum-capability escalation | [Claude Fable 5](https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5) | Anthropic positions Fable 5 above Opus for its most demanding reasoning and long-horizon agent work. It also has special refusal-handling and data-retention constraints, so read the deployment terms before treating it as a normal Opus upgrade. |
| Everyday production work and coding | [GPT-5.4](https://developers.openai.com/api/docs/models/gpt-5.4), [Claude Sonnet 4.6](https://platform.claude.com/docs/en/about-claude/models/overview), [Gemini 3.5 Flash](https://ai.google.dev/gemini-api/docs/models) | These are the first models I would test when the job needs strong capability but does not automatically earn the most expensive tier. |
| High-volume classification, extraction, and routing | [GPT-5.4 mini](https://developers.openai.com/api/docs/models/gpt-5.4-mini), [GPT-5.4 nano](https://developers.openai.com/api/docs/models), [Claude Haiku 4.5](https://platform.claude.com/docs/en/about-claude/models/overview), [Gemini 3.1 Flash-Lite](https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-lite), [GLM-4.7-Flash](https://docs.z.ai/guides/llm/glm-4.7) | Their providers position them around lower latency, lower cost, or high-volume work. They still need your extraction schema and edge cases before they earn production traffic. |
| Long-document analysis and cited research | [GPT-5.5](https://developers.openai.com/api/docs/models/gpt-5.5), [Claude Opus 4.8 or Sonnet 4.6](https://platform.claude.com/docs/en/build-with-claude/context-windows), [Gemini Deep Research Preview or Max Preview](https://ai.google.dev/gemini-api/docs/models/deep-research-preview-04-2026) | GPT-5.5 and current Claude models offer large context windows. Google's Deep Research models are purpose-built for multi-step cited research, but both research variants are previews. |
| Writing, synthesis, and content work | GPT-5.4 or GPT-5.5, Claude Sonnet 4.6 or Opus 4.8, Gemini 3.5 Flash | This lane is subjective enough that provider positioning tells you very little. Test against your voice examples, revision instructions, factuality checks, and the amount of editing you still have to do. |
| Image generation and editing | [GPT Image 2](https://developers.openai.com/api/docs/models/gpt-image-2), [Nano Banana 2](https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-image), [Nano Banana Pro](https://ai.google.dev/gemini-api/docs/models) | These are current first-party image models with generation and editing workflows. Test text rendering, edit fidelity, consistency, latency, and cost on the exact assets you produce. |
| Open-weight or self-hosted deployments | [Mistral Medium 3.5](https://docs.mistral.ai/models/model-cards/mistral-medium-3-5-26-04), [GPT-OSS 120B or 20B](https://developers.openai.com/api/docs/models/gpt-oss-120b) | These belong on the shortlist when deployment control, local inference, or open weights are requirements. Infrastructure and operations become part of the cost comparison. |

**Fable 5 availability warning:** Fable 5 may be disabled in your region or account. [Axios reported on June 13](https://www.axios.com/2026/06/13/anthropic-amazon-white-house) that users lost access after the White House subjected Fable and Mythos to sweeping export controls, with potential restrictions affecting U.S. allies and foreign nationals in the United States. Verify access before designing a production path around it.

Two details matter here.

First, model status is part of model selection. Google [shut down the old Gemini 3 Pro Preview](https://ai.google.dev/gemini-api/docs/models/gemini-3-pro-preview) in March 2026, and Anthropic [retired the original Claude Sonnet 4 and Opus 4 API models](https://platform.claude.com/docs/en/about-claude/model-deprecations) on June 15, 2026. A preview can be worth testing, but it needs a fallback and an exit plan.

Second, the provider's recommended tier is only the beginning. I would expect Opus 4.8 and GPT-5.5 to make a complex coding shortlist. I would not pay for either until the evaluation packet shows that it improves accepted results enough to justify the bill.

## Route only after the evidence earns it

Model routing sounds sophisticated, which is exactly why teams build it too early.

Start with one default that clears the bar. Add a cheaper lane when repeated tests show it handles a bounded task reliably. Add an escalation lane when you can identify the signal that justifies the extra cost: low confidence, failed validation, risky file changes, missing evidence, or a task class that consistently needs more capability.

A practical routing policy might look like this:

| Lane | Trigger | Action |
|---|---|---|
| Deterministic | Rules fully cover the task | Skip the model |
| Routine | Bounded task with cheap failure | Use the fast default |
| Escalation | Validation fails or the task crosses a risk threshold | Retry with a stronger model or more context |
| Human review | Failure has a meaningful business or engineering cost | Stop for approval |

Keep the model ID in configuration, log the exact version used, and preserve the evaluation result behind each routing decision. Otherwise your "smart router" becomes a pile of opinions nobody can safely change.

## Re-evaluate when something material changes

You do not need to rerun evaluations for every launch announcement. Rerun them when:

- a provider deprecates or materially changes a model
- price or latency changes enough to affect the decision
- your prompt, tools, or agent harness changes
- the task distribution changes
- quality monitoring shows drift

This is why the evaluation packet matters. Without it, every model update starts another subjective argument. With it, changing models is a controlled engineering decision.

The model roster will keep moving. Let it.

Define the job, measure the whole task, and route only when the evidence earns the complexity. That process survives the next leaderboard.
