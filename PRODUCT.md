# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Potential clients—primarily owner-operators of non-financial-services small teams—evaluating Collin Wilkins for AI engineering, automation, or technical delivery work. Technical practitioners are a supporting audience for the public articles and knowledge tools.

## Product Purpose

CollinWilkins.com establishes Collin as an engineering practitioner writing about production AI, automation, and agent systems, then helps a small number of qualified visitors trust the evidence and start a consulting conversation. The current commercial path begins with a free 30-minute introduction and, for a qualified workflow problem, the $99 AI Workflow Opportunity Assessment. It also provides practitioners with useful articles and a grounded way to explore the public archive.

## Positioning

The site demonstrates practical AI and automation delivery through inspectable artifacts, implementation detail, and grounded writing rather than relying on broad consultancy claims.

## Operating Context

Visitors evaluate capabilities, projects, and articles; search the public article archive and FAQs; or use Ask My Blog to ask questions over the published corpus and follow citations back to public articles. The current offer routes eligible owner-operators from the free introduction to the AI Workflow Opportunity Assessment: one 60-minute session focused on one workflow, followed by a concise Workflow Opportunity Map within 48 hours.

## Capabilities and Constraints

- Publishes a static Astro portfolio and public article archive at `collinwilkins.com`.
- Provides client-side search across public article content and FAQs.
- Provides Ask My Blog, a retrieval-grounded question-answering experience over `src/articles` only.
- Ask My Blog must cite public articles, refuse unsupported questions, and never expand its corpus to the private Obsidian vault.
- Public frontend code must not expose OpenAI, Anthropic, Supabase service-role, or other server-side credentials.
- Production deploys to GitHub Pages from `main`; the question-answering API runs separately on Modal.
- The current commercial offer is the $99 AI Workflow Opportunity Assessment, preceded by the free 30-minute introduction. It provides up to three ranked opportunities, one recommended first system, a 14-day action plan, and next-path options.
- The assessment is limited to eligible non-financial-services owner-operators. Financial-services customers remain excluded.
- A separate engineering-leader track, the AI-Assisted Delivery Pilot funnel, new service routing, and homepage repositioning are provisional or deferred work—not current product truth or authorization to deploy.
- Centralizes consulting offers, newsletter, booking destinations, and analytics definitions in `src/data/site.js`; implementation must reconcile that source with the binding commercial authority before release.
- Must not invent clients, testimonials, outcomes, prices, availability, delivery guarantees, or service categories. Employment outcomes must remain attributed to full-time roles rather than consulting clients.
- Public pages may explain delivery systems but must not expose runnable private-kit assets, scripts, credentials, customer data, private paths, or private repository links.

## Brand Commitments
Use the name Collin Wilkins and the `collinwilkins.com` domain. Communication should be direct, technically specific, and credible. Capability should be demonstrated with evidence rather than generic agency language.

## Evidence on Hand

The repository contains the deployed portfolio, public articles, FAQs, search implementation, capability artifacts, and Ask My Blog implementation. The Ask My Blog corpus is limited to the public files in `src/articles`. Retrieval and answer-quality metrics that require configured external services remain unverified unless dated evaluation output is available; future work must not fabricate results.

## Product Principles

- Demonstrate capability with shipped work and inspectable detail.
- Make technical depth useful, not performative.
- Give potential clients a clear path from evidence to contact.
- Keep generated answers grounded in the public corpus with visible citations.
- Protect private content and service credentials by design.
- Keep the current assessment route distinct from deferred engineering-leader and funnel concepts in messaging, destinations, and analytics.

## Accessibility & Inclusion

Public content and interactive tools should remain keyboard-accessible, responsive, and understandable without requiring specialist AI terminology.
