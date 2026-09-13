# AGENTS.md — collinwilkins.com

## Repository purpose

This Astro site is a personal publication. The product is the writing.

1. Publish long-form practitioner writing on AI-assisted engineering, agent systems, automation, and distributed systems.
2. Turn readers into newsletter subscribers, and give LLM crawlers accurate, citable source material.

There is nothing for sale here: no offers, prices, packages, booking links, delivery windows, or availability claims. `/services` is a quiet reference page describing the kinds of problems Collin has worked on, and every availability statement on it is gated by `ADVISORY.accepting` in `src/data/site.js`, which is `false`. Do not add an offer, a price, or a scheduling link unless an explicit instruction flips that flag in the same change.

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

1. Current user task
2. This root contract
3. `PRODUCT.md`
4. `src/data/site.js` for site-wide copy, metadata, links, and analytics objects
5. Current repository source

No external strategy vault, planning package, or commercial authority is in play. If a task cites one, stop rather than inventing business decisions. Local working notes under `docs/`, `Session Recaps/`, `artifacts/`, and `.impeccable/critique/` are deliberately untracked: read them for context, never copy their positioning into public files, and never re-add them to git.

## Positioning invariants

- Umbrella message: a working engineer writing about what actually holds up when teams build alongside AI.
- The site sells nothing. Never add a service path, package, tier, price, founding rate, payment step, intake form, scope-acceptance flow, risk reversal, or delivery guarantee.
- Never add a booking, scheduling, or calendar link, and never state or imply availability for client work. `/services` is reference material gated by `ADVISORY.accepting`.
- `/connect` is the only contact surface: email and profile links, no lead capture and no qualification funnel.
- The newsletter is the only conversion goal. Subscribing is free and never gates an article, guide, or download.
- Never name a current or former employer anywhere in this repository, tracked or rendered. That includes copy, alt text, metadata, JSON-LD, `public/llms.txt`, filenames, and asset names. `finimbus.png` is Collin's own product and is the only logo that stays.
- Prior accomplishments may appear only as explicitly-earlier, unattributed work, in past tense, with no company name attached to a metric. "Earlier work included large-scale connected-vehicle telemetry" is the acceptable shape.
- Do not advertise voice-agent delivery experience.
- Do not add service categories, audiences, or funnels without explicit instruction.
- Centralized site, advisory, newsletter, and analytics objects in `src/data/site.js` are the implementation source of truth. Visible copy, metadata, JSON-LD, links, and analytics labels must agree with them.

## Claims and proof

- Never invent clients, testimonials, statistics, quotes, prices, availability, or outcomes.
- Describe earlier engineering work without naming the employer, in past tense, as prior work.
- Never present prior full-time engineering outcomes as client or consulting results.
- Treat examples as synthetic or redacted when applicable.
- Never attribute combined defect or cycle-time outcomes to AI, `AGENTS.md`, or one model alone.
- Do not imply public preview material is an installable starter.
- No fake scarcity, synthetic review cards, or unsupported counters.

## Public/private boundary

This repository is public, so every tracked file is as readable as the rendered site. Never track or publish Collin's working notes, employer names, employer logos, résumé or capability-brief files, the redirect paths that once served them, private paths, credentials, customer data, or private repository links. Public pages may show a lifecycle map, file tree, synthetic issue, redacted usage summary, human-control table, and generic repository-instruction excerpt; treat examples as synthetic or redacted. Before adding a file, ask whether it would be fine on the front page of the repo. Local-only material belongs in `.gitignore`, not in a commit.

## Editorial-print design

- Preserve Newsreader, IBM Plex Mono, paper/ink/gold tokens, and existing spacing utilities.
- Reuse current components and tokens before adding primitives.
- Avoid a generic SaaS palette, decorative dashboard cards, or a new motion system.
- Maintain responsive readability, semantic headings and landmarks, keyboard access, visible focus, contrast, and reduced-motion behavior.
- Check 1440×1000, 768×1024, and 390×844.
- A passing build is not visual QA; use a real browser.

## Conversion and analytics

- A CTA click is not a confirmed subscriber.
- Use the existing Plausible integration and stable centralized event names.
- Every CTA event includes an explicit location.
- Newsletter submit is intent because the cross-origin Buttondown result is not observable.
- A destination, audience, or deliverable change must update visible copy, FAQ, metadata, schema, and analytics in the same change.

## Worktree safety

- Inspect `git status --short --branch` before editing.
- Existing changes and untracked files belong to the user.
- Work only in the checkout you were given.
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
- No offer, price, booking link, availability claim, or employer name entered the repository.
- Desktop, tablet, mobile, keyboard, focus, headings, landmarks, overflow, and reduced motion are checked.
- Plausible events and explicit locations are verified when touched.
- Metadata and structured data match visible content.
- No local note, private asset, or unsupported claim crossed the public boundary.
