# AGENTS.md — collinwilkins.com

## Repository purpose

This Astro site has two jobs:

1. Establish Collin Wilkins as an engineering practitioner writing about production AI, automation, and agent systems.
2. Convert a small number of qualified visitors into consulting conversations.

The prepared local funnel makes the AI-Assisted Delivery Pilot primary. The public AI Workflow Opportunity Assessment remains a separate SMB route. This branch is not authorization to deploy either change.

## Stack and commands

- Astro 5 static site
- React 19 islands
- Tailwind CSS and shared CSS variables
- GitHub Pages deployment
- Plausible analytics

Use the locked install and existing scripts:

```bash
npm ci
npm run dev -- --host 127.0.0.1
npm run test:content-search
npm run build
npm run test:built-faqs
npm run preview
```

`npm run test:rag` is required only when RAG source or its contract changes.

## Source precedence

For this implementation:

1. Current user task
2. This root contract
3. `Founder Intelligence System/Current Bet.md` for commercial authority only
4. `Personal/Strategy/AI Delivery Kit Pilot - Planning Package Index.md`
5. `Personal/Strategy/Handoff - Implement AI Delivery Kit Pilot and Engineering Funnel.md`
6. Current repository source

The planning package is provisional site design. It does not replace the Current Bet, authorize deployment, or create market evidence. If the vault is unavailable, stop rather than inventing business decisions.

## Offer and routing invariants

- Umbrella message: help business owners and engineering leaders turn AI experiments and manual workflows into systems their teams can use and maintain.
- The site exposes four service paths: AI readiness assessment, AI-Assisted Delivery Pilot, technical advisory, and hands-on backend/automation work.
- Advisory and hands-on work are scoped through the free 30-minute intro; do not invent fixed prices, delivery windows, or guarantees for them.

- Engineering offer: AI-Assisted Delivery Pilot.
- Asset: AI Delivery Kit.
- Scope: one team, one repository, one real backlog item.
- Founding price: $1,500 for the first three clients whose written scope is accepted and $500 first installment is paid; accepted pilots keep that price.
- Delivery: five business days after the full readiness gate passes, async-first.
- Readiness requires written scope, one approved low-risk issue, least-privilege access, a passing agreed baseline, authenticated agent access, working CI/draft-PR/branch protection, a named technical owner and reviewer, the $500 first installment, and a confirmed start date.
- Acceptance requires the agreed customer-owned assets, passing existing verification and five smoke cases, fail-closed protected paths, one approved issue at a verified draft PR with normalized usage evidence, retained human approval, and a customer engineer completing the documented non-production path without Collin driving.
- Payment: $500 after written scope acceptance; $1,000 only after acceptance passes.
- Risk reversal: if a ready environment misses acceptance by business day five, the final installment is not due and Collin corrects the agreed in-scope installation at no additional charge until acceptance passes. Customer delays pause the clock; scope changes and pre-existing failures are re-scoped.
- General intro calls use `https://cal.com/collinwilkins/intro`; the call is free, 30 minutes, and optional. It may route to an assessment, pilot, advisory need, hands-on build, or no engagement.
- Direct pilot intake is site-owned, collects no payment, and precedes written scope acceptance.
- SMB assessment stays separate: $99, 60 minutes, Workflow Opportunity Map within 48 hours, booked at `/assessment`.
- Never route an engineering CTA to the SMB assessment.
- Preserve the financial-services exclusion.
- Do not add service categories without evidence or explicit instruction.
- Do not advertise voice-agent delivery experience.

Centralized consulting overview, offer, newsletter, booking, and analytics objects in `src/data/site.js` are the implementation source of truth. Visible copy, metadata, JSON-LD, links, and analytics labels must agree.

## Claims and proof

- Never invent clients, testimonials, statistics, quotes, prices, availability, or outcomes.
- Use Ford and Morningstar outcomes only in their verified wording and employment context.
- Label employment proof: `Outcomes from full-time engineering roles, not consulting clients.`
- Treat examples as synthetic or redacted when applicable.
- Never attribute combined defect or cycle-time outcomes to AI, `AGENTS.md`, or one model alone.
- Do not imply public preview material is an installable starter.
- No fake scarcity, synthetic review cards, or unsupported counters.

## Public/private boundary

Public pages may show a lifecycle map, file tree, synthetic issue, redacted usage summary, human-control table, and generic repository-instruction excerpt. Never publish a runnable ZIP, complete workflow, complete issue template, scripts, skills, adapter code, credentials, customer data, private paths, or private repository links.

## Editorial-print design

- Preserve Newsreader, IBM Plex Mono, paper/ink/gold tokens, and existing spacing utilities.
- Reuse current components and tokens before adding primitives.
- Avoid a generic SaaS palette, decorative dashboard cards, or a new motion system.
- Maintain responsive readability, semantic headings and landmarks, keyboard access, visible focus, contrast, and reduced-motion behavior.
- Check 1440×1000, 768×1024, and 390×844.
- A passing build is not visual QA; use a real browser.

## Conversion and analytics

- A CTA click is not a booking, purchase, or confirmed subscriber.
- Use the existing Plausible integration and stable centralized event names.
- Every CTA event includes an explicit location.
- Newsletter submit is intent because the cross-origin Buttondown result is not observable.
- Cal.com and external payment systems remain authoritative for completed bookings and payments.
- A price, destination, audience, or deliverable change must update visible copy, FAQ, metadata, schema, and analytics in the same change.

## Worktree safety

- Inspect `git status --short --branch` before editing.
- Existing changes and untracked files belong to the user.
- Work only in this isolated worktree for this funnel.
- Do not reset, clean, stash, pull, merge, switch another checkout, or overwrite unrelated work.
- Do not push, open a pull request, deploy, configure a remote, or change external accounts.
- Local focused commits are authorized for the approved implementation only.

## Workflow

1. Read the approved implementation task and cited authority.
2. Search for existing patterns before creating components.
3. Define route and conversion-event behavior before editing.
4. Make the smallest coherent change.
5. Run focused checks and the production build.
6. Exercise changed paths in a browser, including forms with intercepted requests.
7. Inspect responsive, keyboard, print, metadata, schema, and analytics behavior.
8. Confirm no private asset or unsupported claim crossed the public boundary.
9. Record limitations and external actions that still need approval.

## Done criteria

- Locked install and relevant test scripts pass.
- Production build passes; changed routes render without console errors.
- Engineering and SMB links remain distinct and accurate.
- Intake success and failure states work without creating a production lead.
- Desktop, tablet, mobile, keyboard, focus, headings, landmarks, overflow, and reduced motion are checked.
- Capability brief exports as one readable US Letter page with production-absolute PDF links.
- Plausible events and explicit locations are verified when touched.
- Metadata and structured data match visible content.
- No new public private-kit source or unauthorized external action exists.
