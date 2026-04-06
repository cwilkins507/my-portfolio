---
title: "LLM Gateway Architecture: When You Need One and How to Get Started"
date: "2026-04-06"
tags: ["AI", "System Design", "LLM", "Architecture", "Infrastructure", "Cost Optimization"]
excerpt: "Your team is calling 4 LLM providers from 6 services with no routing layer. Here's the architecture pattern that fixes it."
seo_title: "LLM Gateway Architecture and Multi-Model Routing"
meta_description: "A practitioner's guide to LLM gateway architecture: three deployment patterns, model routing strategies, and a step-by-step implementation playbook for engineering teams."
target_keywords: "LLM gateway architecture, LLM routing strategy, multi-model architecture, LLM cost optimization, AI model selection framework, LiteLLM architecture"
faqs:
  - q: "When does an engineering team actually need an LLM gateway?"
    a: "If you can't answer 'what is each team spending per feature per month on LLM calls,' you need one. The clearest triggers are: 3+ services making LLM calls, monthly LLM spend above $3K, need for provider redundancy (automatic failover when Anthropic or OpenAI has an outage), or data residency requirements that force geographic routing. Below those thresholds, single-provider routing with tiered models handles most use cases without additional infrastructure."
  - q: "How much can cost-based model routing actually save?"
    a: "Teams that implement cost-based routing typically report 30-50% reduction in LLM spend. The math is straightforward: routing a classification task from Opus to Sonnet saves 40% on both input and output tokens. Routing it to Haiku saves 80%. Most production LLM traffic is simpler than people assume — classification, extraction, formatting, short summarization — and runs fine on cheaper models. The savings compound when you realize most teams are sending all of that traffic to their most expensive model by default."
  - q: "What's the difference between sidecar proxy and centralized gateway patterns?"
    a: "A sidecar proxy runs as a library or sidecar alongside each service — minimal latency, but each instance tracks its own costs with no cross-service visibility. A centralized gateway is a dedicated service all LLM traffic routes through — one network hop added, but you get a single dashboard showing every team's spend, every model's usage, and every feature's cost. Most mid-market teams with 3+ services should go centralized. The visibility is worth the few extra milliseconds."
  - q: "Should I build a custom LLM routing layer or use an existing tool?"
    a: "Use an existing tool. LiteLLM in proxy mode is open source, supports 100+ providers through a unified API, and handles cost tracking, fallback, and rate limiting out of the box. Building a custom routing layer is almost never justified — routing models by task complexity is a configuration problem, not a software engineering problem. SaaS alternatives like Portkey and Helicone exist if you don't want to run the proxy yourself, but the per-request pricing adds up at scale."
---

# LLM Gateway Architecture: When You Need One and How to Get Started

The monthly invoice comes in $12K higher than expected and nobody can explain it. Engineering added Opus for a summarization feature... Product had QA testing vision with GPT-4o... the data team switched from Sonnet to a fine-tuned model on Bedrock three weeks ago and forgot to mention it.

This is the database connection problem, replayed for LLMs. Every service talking directly to an external provider, no abstraction layer, no visibility, no fallback. You solved this for database connections a decade ago with connection pools. The LLM gateway is the same pattern, and most mid-market engineering teams don't have one yet.

## What an LLM Gateway Actually Does

An LLM gateway sits between your application code and your model providers. Instead of each service importing the OpenAI SDK or the Anthropic SDK or the Bedrock client and calling providers directly, every request routes through a single layer. Your code talks to the gateway. The gateway talks to the providers.

![LLM Gateway Architecture — services route through a gateway to multiple providers](/images/llm-gateway-architecture.svg)

Think API gateway (Kong, Envoy), but built for LLM traffic patterns specifically. LLM calls stream responses, bill per token, throw provider-specific errors like Anthropic's 529 overloaded, and can run for 30+ seconds on complex prompts. A generic API gateway doesn't handle any of that well.

> The practical value comes down to two things: reliability and cost visibility. Everything else the gateway does supports one of those.

On the reliability side, automatic fallback means Anthropic returns a 529 and the gateway retries on Bedrock. The outage becomes a log entry instead of a P1 incident. Prompt format differences between providers require some compatibility work upfront (system message handling, tool schemas), but once that's configured the failover is hands-off. Your application code calls one unified API regardless of which provider handles the request.

On the cost side, tag every request with team, feature, and environment, and suddenly you can say "the summarization feature costs $2,400/month and 80% of that is the QA environment." That sentence is impossible without the gateway. With it, the answer takes five minutes to pull up. Routing rules send classification to Haiku and generation to Opus from a config file instead of hardcoding model names across repositories. Per-team rate limits and budget caps keep a runaway loop from burning through your monthly allocation in an afternoon.

Cost visibility gets the gateway approved. Once the team sees automatic failover survive a provider outage at 2am without a page, nobody proposes removing it.

## Do You Actually Need Multiple Providers?

Most teams don't need multiple providers yet. Every major provider ships a model family with tiers designed for exactly this kind of routing. Anthropic has Opus for complex reasoning, Sonnet for everyday code and logic, Haiku for classification and lightweight tasks. OpenAI has a similar spread. Google has Gemini Pro and Flash. One provider, three tiers, handles a surprising percentage of use cases.

![Single-provider routing — one provider, three model tiers](/images/llm-single-provider-routing.svg)

The price gaps between tiers make this worth doing even without a gateway. As of April 2026, Claude API pricing per million tokens:

| Model | Input ($/MTok) | Output ($/MTok) | Best For |
|---|---|---|---|
| Opus 4.6 | $5.00 | $25.00 | Complex reasoning, coding agents, multi-step tasks |
| Sonnet 4.6 | $3.00 | $15.00 | Balanced performance, general production workloads |
| Haiku 4.5 | $1.00 | $5.00 | High-throughput, simple queries, cost-sensitive apps |

> Routing a classification task from Opus to Sonnet saves 40%. Routing it to Haiku saves 80%. If half your LLM traffic is simple classification and extraction running on Opus, those numbers compound fast.

This setup uses the same API, SDK, billing, and auth. This doesn't need a gateway. You can manage it with a model parameter that changes per task.

I run LeadSync this way. Haiku handles lead scoring, Sonnet handles email content generation, and the routing is a config value per task. Same pattern works for agent orchestration: route expensive models to code review and content scoring where errors cost the most, cheaper models to research and classification. None of it requires a gateway because it all runs through one provider.

So when does a gateway actually earn its keep? Provider redundancy is the big one — if Anthropic goes down, a gateway fails over to Bedrock or Azure OpenAI automatically. Cost arbitrage matters when Bedrock pricing differs from direct API pricing on the same model. Capability gaps force multi-provider setups when no single provider is best at everything (vision, code generation, long context, and structured output might each have a different best-in-class model). And compliance requirements make multi-provider routing mandatory when European customers' data needs to route through EU-hosted models.

If none of those apply yet, single-provider routing is the right starting point. Add the gateway when you actually hit the wall.

### When to Add the Gateway

- **Single provider, fewer than 3 services** — No gateway needed. Route by model tier in your app config. Revisit when you cross 3 services or $3K/month.
- **3+ services OR $3K+/month LLM spend** — Centralized gateway. Start with cost tagging and one fallback provider.
- **Multiple providers required** (redundancy, compliance, capability gaps) — Centralized gateway with multi-provider routing.
- **Data residency requirements** — Layer edge routing on top.

If you can't answer "what is each team spending per feature per month," you need the gateway regardless of where you fall on this list.

## Three Architecture Patterns

The deployment pattern depends on team size, how many services are making LLM calls, and whether you have data residency requirements.

| Pattern | How It Works | Latency Impact | Visibility | Best For |
|---|---|---|---|---|
| **Sidecar Proxy** | Gateway runs as a library or sidecar alongside each service | Minimal (in-process or localhost) | Per-service only | Small teams, fewer than 3 services |
| **Centralized Gateway** | Dedicated service all LLM traffic routes through | One network hop | Full cross-service visibility | Mid-market teams, 3-20 services |
| **Edge Routing** | Gateway at CDN/edge, routing by geography or compliance zone | Variable by region | Full with regional breakdown | Multi-region, data residency |

**Sidecar proxy** is the fastest way in. Import LiteLLM as a Python library, point your existing model calls at it, and you have basic routing and fallback working in an afternoon.

**Centralized gateway** is where most mid-market teams should land. Deploy LiteLLM in proxy mode (or Portkey) as a standalone service and point each application at the gateway's URL instead of the provider's. One dashboard shows every team's spend, every model's usage, every feature's cost.

**Edge routing** adds geographic or compliance-based routing on top. European requests go to EU-hosted models for GDPR, APAC to the closest region for latency. Most teams don't need this yet. If you don't have data residency requirements, Pattern 2 covers you.

The decision shortcut: fewer than 3 services, sidecar. Three or more, centralized. Data residency requirements, layer edge routing on top.

## Routing Strategies That Actually Save Money

The gateway gives you routing. The strategy determines how much value you extract from it.

**Cost-based routing** has the highest impact and the simplest logic. A support ticket classifier doesn't need Opus. Haiku handles it for a fraction of the cost with comparable accuracy on well-defined tasks. The gateway lets you make that distinction in one routing table instead of hunting through application code for hardcoded model names. 

**Capability-based routing** sends vision tasks to models with vision support, long-context requests to large-window models, and structured output requests to models with native JSON mode. Without a gateway this means importing four SDKs and writing provider-specific conditionals that nobody wants to maintain. With a gateway you define the capability map once and application code doesn't care which model handles the request.

**Latency-based routing** sends streaming chat responses to the fastest available provider and batch jobs to the cheapest. The gateway can measure provider performance empirically and shift traffic away from degraded providers before users start complaining. This is where the reliability engineering value shows up, since the gateway is making routing decisions based on real-time performance data rather than static configuration.

**A/B testing** routes a percentage of traffic to a new model, compares quality against the baseline, and promotes or rolls back. Without a gateway this means feature flags, comparison infrastructure, and new deployment code. With a gateway you change a routing weight and let it run.

Most teams combine cost-based with one other strategy. That covers the vast majority of the value.

Here's what a basic cost-based routing config looks like in LiteLLM proxy mode:

```yaml
model_list:
  - model_name: "fast-classify"
    litellm_params:
      model: "anthropic/claude-haiku-4-5-20251001"
  - model_name: "generate"
    litellm_params:
      model: "anthropic/claude-sonnet-4-20250514"
  - model_name: "generate"
    litellm_params:
      model: "bedrock/anthropic.claude-sonnet-4-v1"

router_settings:
  routing_strategy: "simple-shuffle"
  num_retries: 2
```

Your application calls `fast-classify` for ticket routing and tagging, `generate` for content and reasoning. Two entries for `generate` means if the direct Anthropic API fails, the gateway retries on Bedrock automatically. The routing decision lives in this config file, not scattered across your application code.

## Build vs. Adopt

Most teams should start with **LiteLLM** in proxy mode. It's open source, supports 100+ providers through a unified API, runs as a Python library or standalone proxy, and handles cost tracking, fallback, and rate limiting out of the box. SaaS alternatives like Portkey and Helicone exist if you don't want to run the proxy yourself, but the per-request pricing adds up. Building a custom routing layer is almost never justified — routing models by task complexity is a configuration problem, not a software engineering problem.

## Getting It Into Production

The sequence matters more than the timeline. With AI-assisted scaffolding you can get through this in a few days, but doing the steps out of order is where teams get burned.

1. **Deploy the proxy with one service.** Point a single existing service at LiteLLM without any changes. If something breaks, you want to find out before migrating anything else.
2. **Add cost tags.** Team, feature, environment on every request. Let baseline data collect. This is where teams have their first real conversation about LLM spend, because the data almost always surfaces something nobody expected — QA running expensive calls around the clock, a retry loop doubling costs on one endpoint, a feature nobody uses still generating hundreds of requests a day.
3. **Configure automatic fallback.** Primary provider returns a 429 or 529, gateway retries on a secondary. Test by blocking the primary in staging while you're watching, not during an actual outage at 2am.
4. **Downgrade one use case.** Pick a task where you're using an expensive model for something simple and switch it to Haiku-class. Measure quality against your baseline. If it holds (and it usually does for classification and extraction), that's your first real cost savings. If quality drops, switch back and try a different task boundary.
5. **Roll out and publish the dashboard.** I know, _another_ dashboard to worry about.

Migrate remaining services and share the cost dashboard with engineering leadership. Teams that can see their LLM costs start optimizing without anyone writing a policy memo.

## What Goes Wrong

This section matters more than the implementation playbook, because the mistakes are where the real money goes.

**The QA environment is the silent budget killer.** A test suite running Opus calls against every PR, 24/7, with nobody reviewing the results. The fix takes five minutes once cost tagging by environment is in place, but without it the spend is invisible. This is the single most common cost surprise and it's also the easiest to fix, which makes it a good argument for the gateway all by itself.

**Retry loops compound faster than you'd expect.** A service gets a 429 rate limit, retries with exponential backoff, but the backoff ceiling is set too high and the service hammers the same provider with progressively more expensive calls (longer prompts on each retry because context accumulates). Gateway fallback routing eliminates this entirely since the retry goes to a different provider instead of beating on the rate-limited one.

**Over-engineering the routing logic.** The first strategy should be simple: expensive model for complex tasks, cheap model for simple tasks, one fallback provider. The teams that get the most value from gateways are the ones that start with simple routing rules and add more only when the cost data shows they need them.

**Treating the gateway as a one-time cost savings project.** Teams deploy the gateway, save 30% through routing, and call it done. They never build the cost dashboard or set up ongoing tagging for new services. Cost savings are great, but the bigger win is permanent visibility into what you're spending, where, and why. That requires treating the gateway as infrastructure, not a project.

---

If you're running a multi-model setup and want help designing the routing strategy or deploying the gateway, that's the kind of engagement I do — audit current usage, design the architecture, get it into production. Usually 2-4 weeks. [Reach out here](https://collinwilkins.com/contact) if you want to scope it.

*Related: [Context Engineering for AI Coding Tools](https://collinwilkins.com/articles/context-engineering) covers the upstream discipline that makes model routing effective. [Intentional AI Integration](https://collinwilkins.com/articles/intentional-ai-integration) covers the governance layer that sits above the gateway.*

*I write about AI infrastructure and engineering every couple weeks. [Subscribe to the newsletter](https://buttondown.com/collinwilkins) if this was useful.*
