# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Technical practitioners — software engineers, platform and infrastructure people, and engineering leads — who arrive from search, a link, or the newsletter to read something specific about distributed systems, infrastructure, developer tooling, or AI-native development. A secondary audience is anyone evaluating Collin professionally: they should be able to judge the depth of the work from the writing itself.

## Product Purpose

CollinWilkins.com is a personal publication. It exists so Collin can think in public about software systems and so readers can find, read, and subscribe to that thinking. The writing is the product. Success is a reader finishing an essay and subscribing to the newsletter — not a lead, a booking, or an inquiry.

## Positioning

A working engineer's notebook, published. Depth and specificity are the argument; nothing here is being sold.

## Operating Context

Visitors land on the homepage or deep-link into a single article from search. They browse the archive by topic, search across articles and FAQs, use Ask My Blog to ask questions over the published corpus and follow citations back to public articles, and subscribe to the newsletter. Personal projects and experiments are shown as personal work, not as offerings.

## Capabilities and Constraints

- Publishes a static Astro site and public article archive at `collinwilkins.com`, deployed to GitHub Pages from `main`.
- Provides client-side search across public article content and FAQs, and a topic filter on the archive that is shareable via `?cat=`.
- Provides Ask My Blog, a retrieval-grounded question-answering experience over `src/articles` only. The question-answering API runs separately on Modal.
- Ask My Blog must cite public articles, refuse unsupported questions, and never expand its corpus to the private Obsidian vault.
- The newsletter is "Collin's Thoughts", every other Tuesday, delivered through Buttondown.
- **The site is not selling anything.** There are no offers, prices, booking links, intake forms, lead magnets gated behind email, availability claims, or calls to hire. `/services` exists only as a quiet reference and must state that new client engagements are not being accepted; `ADVISORY.accepting` in `src/data/site.js` gates every availability statement and flipping it is a deliberate, reviewed change.
- **The site is not an employment record.** Do not name a current employer, publish a resume or CV, or present a dated role chronology. Prior technical accomplishments may appear framed explicitly as earlier work; the reader should learn what was built, not where Collin currently works.
- Personal projects (FiNimbus, the Agent Harness Builder, the prompt toolkit, the retrieval service behind Ask) must read as personal work, never as commercial offerings.
- Public frontend code must not expose OpenAI, Anthropic, Supabase service-role, or other server-side credentials.
- The GitHub repository is public. Anything committed is readable, including files never rendered by the site.
- Must not invent clients, testimonials, outcomes, prices, availability, or delivery guarantees. Existing accomplishment figures are directional estimates from full-time roles and must stay labeled as such.
- Public pages may explain systems and methods but must not expose private kit assets, scripts, credentials, customer data, private paths, or private repository links.

## Brand Commitments

Use the name Collin Wilkins and the `collinwilkins.com` domain. Voice is direct, technically specific, and unhurried — a practitioner writing for peers. Show the reasoning and the failed attempts, not just the conclusion. No agency language, no urgency, no persuasion architecture.

## Evidence on Hand

The repository contains the deployed site, the article corpus, FAQs, the search implementation, and the Ask My Blog implementation. The Ask corpus is limited to public files in `src/articles`. Retrieval and answer-quality metrics requiring configured external services remain unverified unless dated evaluation output exists; do not fabricate results.

## Product Principles

- The writing is the product; every other surface serves it.
- Demonstrate capability by publishing real work, not by claiming it.
- Make technical depth useful, not performative.
- Ask for nothing except a subscription, and ask quietly.
- Keep generated answers grounded in the public corpus with visible citations.
- Protect private content and service credentials by design.

## Accessibility & Inclusion

Content and interactive tools stay keyboard-accessible, responsive, and readable without specialist AI terminology. Text meets WCAG AA contrast, interactive targets meet 44px, and reduced-motion preferences are respected.
