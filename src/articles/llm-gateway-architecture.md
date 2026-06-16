---
title: "You Probably Don't Need an LLM Gateway Yet"
date: "2026-04-06"
updated: "2026-06-12T12:00:00Z"
tags: ["AI", "System Design", "LLM", "Architecture", "Infrastructure", "Cost Optimization"]
excerpt: "An LLM gateway earns its keep when provider calls become an operational problem. Before that, it is infrastructure you have to maintain."
image: "/images/articles/llm-gateway-architecture.png"
image_alt: "LLM gateway architecture diagram showing routing, policy, observability, and model provider boundaries."
seo_title: "LLM Gateway Architecture and Multi-Model Routing"
meta_description: "Learn when an LLM gateway is worth the operational cost, when simple model routing is enough, and how to introduce one without overbuilding."
target_keywords: "LLM gateway architecture, LLM routing strategy, multi-model architecture, LLM cost optimization, AI model selection framework, LiteLLM architecture, LLM gateway vs API gateway, self-hosted LLM gateway, LLM provider failover"
faqs:
  - q: "When does an engineering team actually need an LLM gateway?"
    a: "You need an LLM gateway when direct provider calls create a real operational problem: unclear spend ownership, multiple services duplicating routing logic, provider failover requirements, or data residency rules. Until then, route model tiers in application configuration and keep the architecture simple."
  - q: "How much can cost-based model routing actually save?"
    a: "Savings depend on your traffic mix and eval results. The reliable method is to tag requests, measure a baseline, move one bounded task to a cheaper model, and compare quality before expanding the rule."
  - q: "What's the difference between sidecar proxy and centralized gateway patterns?"
    a: "A sidecar proxy runs beside each service and keeps the request path local, but it fragments policy and visibility. A centralized gateway gives one place for authentication, budgets, routing, and audit logs, but adds another production dependency."
  - q: "Should I build a custom LLM routing layer or use an existing tool?"
    a: "Start with an existing gateway or proxy unless your routing policy is genuinely proprietary. LiteLLM documents a self-hosted proxy with cost tracking, rate limits, routing, and fallbacks. Prove that the standard path is insufficient before building your own."
---
You probably do not need an LLM gateway yet. If one service calls one provider and the bill is understandable, adding a proxy gives you another production dependency without solving a real problem.

The gateway earns its keep later, when direct model calls become an operational problem: nobody can attribute spend, every service implements its own retry logic, or a provider outage takes down a customer workflow. At that point, the extra layer buys control instead of architecture theater.

## What an LLM Gateway Actually Does

An LLM gateway sits between your application code and your model providers. Instead of each service importing the OpenAI SDK or the Anthropic SDK or the Bedrock client and calling providers directly, every request routes through a single layer. Your code talks to the gateway. The gateway talks to the providers.

![LLM Gateway Architecture — services route through a gateway to multiple providers](/images/llm-gateway-architecture.svg)

If you're familiar with API gateways like Kong or Envoy, the concept is similar, but the policies are different. LLM traffic needs token-aware budgets, model routing, streaming support, provider-specific error handling, and request-level cost tracking. Anthropic's own [gateway guidance](https://docs.anthropic.com/en/docs/claude-code/llm-gateway) lists centralized authentication, usage tracking, cost controls, audit logging, and model routing as the common reasons to add one.

> The practical value comes down to two things: reliability and cost visibility. Everything else the gateway does supports one of those.

On the reliability side, automatic fallback can send a failed request to another deployment or provider. That reduces outage impact, but only after you handle prompt formats, tool schemas, quotas, and different model behavior. Failover is a feature you test, not a checkbox that makes outages disappear.

On the cost side, tag every request with team, feature, and environment. That turns one provider invoice into something you can investigate. Routing rules keep model choices in configuration instead of hardcoding them across repositories, while rate limits and budget caps contain runaway loops.

## Do You Actually Need Multiple Providers?

Most teams don't need multiple providers yet. Every major provider ships a model family with tiers designed for exactly this kind of routing. Anthropic has Opus for complex reasoning, Sonnet for everyday code and logic, Haiku for classification and lightweight tasks. OpenAI has a similar spread. Google has Gemini Pro and Flash. One provider, three tiers, handles a surprising percentage of use cases.

![Single-provider routing — one provider, three model tiers](/images/llm-single-provider-routing.svg)

The price gaps between model tiers make routing worth doing even without a gateway. Provider prices and model names change quickly, so use the current [Claude pricing page](https://docs.anthropic.com/en/docs/about-claude/pricing) rather than copying a model table into architecture documentation. The durable rule is simpler: use evals to find the cheapest model that clears the quality bar for each bounded task.

This setup uses the same API, SDK, billing, and auth. This doesn't need a gateway. You can manage it with a model parameter that changes per task.

I use this pattern across agent workflows: route capable models to code review and content scoring where errors cost more, then use cheaper models for bounded research and classification after they clear an eval. None of it requires a gateway when it runs through one provider.

So when does a gateway earn its keep? Provider redundancy is the big one. Cost differences matter when the same workload is available through more than one platform. Capability gaps can force multi-provider setups when one provider doesn't meet every requirement. Contractual, regulatory, or internal data residency rules may also require regional routing.

If none of those apply yet, single-provider routing is the right starting point. Add the gateway when you hit the wall.

### When to Add the Gateway

- **One provider and understandable spend** — No gateway needed. Route by model tier in application config.
- **Several services duplicating auth, budgets, or routing logic** — Consider a centralized gateway. Start with cost tagging.
- **Multiple providers required** (redundancy, compliance, capability gaps) — Centralized gateway with multi-provider routing.
- **Data residency requirements** — Layer edge routing on top.

If you can't answer what each feature costs or how a provider failure behaves, you have earned the right to consider a gateway. That is still not the same as needing one.

## Three Architecture Patterns

The deployment pattern depends on team size, how many services are making LLM calls, and whether you have data residency requirements.

| Pattern | Tradeoff | Use When |
|---|---|---|
| **Sidecar Proxy** | Local request path, fragmented policy | Testing routing without a shared service |
| **Centralized Gateway** | Shared control, another production dependency | Several services need the same policy and reporting |
| **Edge Routing** | Regional control, more operational complexity | Residency or latency requirements justify it |

**Sidecar proxy** is the smallest first step. Import a routing library, point one service at it, and learn where compatibility breaks before creating shared infrastructure.

**Centralized gateway** gives teams one policy and reporting layer. Deploy a gateway as a standalone service and point each application at its URL instead of the provider's. The tradeoff is straightforward: better shared control, plus another service that can fail.

**Edge routing** adds geographic or compliance-based routing on top. Use it when a real residency rule or latency requirement justifies the extra complexity.

The decision shortcut: keep routing local until duplicated policy or missing visibility becomes painful. Centralize after the pain is real. Add edge routing only for actual regional requirements.

## Routing Strategies That Actually Save Money

The gateway gives you routing. The strategy determines how much value you extract from it.

**Cost-based routing** starts with one measured task. A support ticket classifier may not need your most capable model. The gateway lets you test that distinction in one routing table instead of hunting through application code for hardcoded model names.

**Capability-based routing** sends vision tasks to models with vision support, long-context requests to large-window models, and structured output requests to models with native JSON mode. Without a gateway this means importing four SDKs and writing provider-specific conditionals that nobody wants to maintain. With a gateway you define the capability map once and application code doesn't care which model handles the request.

**Latency-based routing** sends streaming chat responses to the fastest available provider and batch jobs to the cheapest. The gateway can measure provider performance empirically and shift traffic away from degraded providers before users start complaining. This is where the reliability engineering value shows up, since the gateway is making routing decisions based on real-time performance data rather than static configuration.

**A/B testing** routes a percentage of traffic to a new model, compares quality against the baseline, and promotes or rolls back. Without a gateway this means feature flags, comparison infrastructure, and new deployment code. With a gateway you change a routing weight and let it run.

Start with one routing rule and one fallback. Anything more should be justified by measured traffic or a reliability requirement.

Here's what a basic cost-based routing config looks like in LiteLLM proxy mode:

```yaml
model_list:
  - model_name: "fast-classify"
    litellm_params:
      model: "anthropic/claude-haiku-4-5-20251001"
  - model_name: "generate"
    litellm_params:
      model: "anthropic/claude-sonnet-4-6"
  - model_name: "generate"
    litellm_params:
      model: "bedrock/anthropic.claude-sonnet-4-6"

router_settings:
  routing_strategy: "simple-shuffle"
  num_retries: 2
```

Your application calls `fast-classify` for ticket routing and tagging, then `generate` for content and reasoning. Two deployments under `generate` give the router another target when one is unavailable. Provider-specific model IDs change, so verify the exact configuration against the current LiteLLM and provider documentation before deployment.

## Build vs. Adopt

Most teams should start with **LiteLLM** in proxy mode or another established gateway. LiteLLM documents a self-hosted proxy with [cost tracking and rate limits](https://docs.litellm.ai/) plus [routing strategies and fallbacks](https://docs.litellm.ai/docs/proxy/load_balancing). Building a custom routing layer is rarely justified. Prove that your policy cannot fit in configuration first.

## Getting It Into Production

The sequence matters more than the timeline. Doing the steps out of order is where teams get burned.

1. **Deploy the proxy with one service.** Point a single existing service at LiteLLM without any changes. If something breaks, you want to find out before migrating anything else.
2. **Add cost tags.** Team, feature, environment on every request. Let baseline data collect before changing routing.
3. **Configure automatic fallback.** Primary provider returns a 429 or 529, gateway retries on a secondary. Test by blocking the primary in staging while you're watching, not during an actual outage at 2am.
4. **Move one bounded use case.** Pick a task that may work on a cheaper model and measure quality against your baseline. If quality drops, switch back and try a narrower task boundary.
5. **Roll out and publish the dashboard.** I know, _another_ dashboard to worry about.

Migrate remaining services and share the cost dashboard with engineering leadership. Teams that can see their LLM costs start optimizing without anyone writing a policy memo.

## What Goes Wrong

This section matters more than the implementation playbook, because the mistakes are where the real money goes.

**The QA environment can hide waste.** Test suites and preview environments generate real model traffic, but provider invoices rarely tell you which environment caused it. Tagging requests by environment makes that spend visible.

**Retry loops compound faster than you'd expect.** A service gets a 429, retries, and multiplies traffic during a provider problem. A gateway can route retries elsewhere, but only if you test the fallback and prevent duplicate work.

**Over-engineering the routing logic.** The first strategy should be simple: one evaluated model choice per task and one tested fallback. Add more only when cost or reliability data justifies it.

**Treating the gateway as a one-time cost project.** The bigger win is permanent visibility into what you're spending, where, and why. That requires treating the gateway as infrastructure, including ownership, upgrades, alerts, and failure testing.

---

If you're running a multi-model setup and want help designing the routing strategy or deploying the gateway, that's the kind of engagement I do — audit current usage, design the architecture, get it into production. Usually 2-4 weeks. [Reach out here](https://collinwilkins.com/?modal=contact) if you want to scope it.

*Related: [Context Engineering for AI Coding Tools](https://collinwilkins.com/articles/context-engineering) covers the upstream discipline that makes model routing effective. [Intentional AI Integration](https://collinwilkins.com/articles/intentional-ai-integration) covers the governance layer that sits above the gateway.*

*I write about AI infrastructure and engineering every couple weeks. [Subscribe to the newsletter](https://buttondown.com/collinwilkins) if this was useful.*
