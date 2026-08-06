---
target: services page
total_score: 24
max_score: 28
na_heuristics: 3,5,9
p0_count: 0
p1_count: 0
timestamp: 2026-08-06T01-32-35Z
slug: src-pages-services-astro
---
# Services Page Critique — Post-Revision

Method: dual-agent (A: FinalServicesReview · B: FinalServicesDetector)

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 3 | Routes are explicit; external booking context is not signaled. |
| 2 | Match with the real world | 4 | Buyer language, prices, fixed scope, and no-project exits are concrete. |
| 3 | User control and freedom | n/a | Static persuasive surface. |
| 4 | Consistency and standards | 3 | Link grammar is unified; price still resembles a second eyebrow. |
| 5 | Error prevention | n/a | No on-page committed action. |
| 6 | Recognition rather than recall | 4 | Problems now include their corresponding response copy. |
| 7 | Flexibility and efficiency | 3 | Routes fit different readiness levels; booking competes with audience routing above the fold. |
| 8 | Aesthetic and minimalist design | 3 | Authored system; Outcomes heading retains an unused right column. |
| 9 | Error recovery | n/a | No reachable error state. |
| 10 | Help and documentation | 3 | Strong inspect-first evidence; duration and deliverable remain absent. |
| **Total** | | **24/28** | **Good; up from 20/28** |

## Design Specificity Verdict

Authored and product-specific. Newsreader plus IBM Plex Mono, warm paper/ink/ochre tokens, asymmetric measures, and hairline rules create a designed-document character rather than a landing-page template. The revision strengthened specificity by making the reader's own problem the visual center of gravity.

## Deterministic Scan

The final detector returned 14 advisory `design-system-font-size` findings, all in `src/pages/services.astro`, at lines 228, 237, 290, 302, 327, 333, 340, 350, 397, 446, 451, 517, 538, and 580. No other detector rules fired. Browser overlay creation failed in the detector assessment because Playwright could not create its temporary artifact directory; no user-visible overlay exists.

## Baseline Comparison

- Baseline: 20/28
- Final: 24/28
- Change: +4
- Recognition-without-answer: resolved.
- Metadata-looking CTAs: resolved.
- Four equal service cards: resolved into two audience routes plus a subordinate conversation path.
- Faint price text: resolved for readability; hierarchy can still improve.
- Orphaned fifth outcome: resolved.
- Closing link wrapping found during the final critique: corrected afterward and verified as one line at both 1280px and 390px.

## What's Working

- Recognition-first information architecture now pairs each buyer quote with a useful diagnosis.
- Two audience-specific fixed-scope cards expose both prices and one action each.
- A single underlined, accent-colored, 44px action-link grammar works across cards, proof, closing links, and referral.
- Inspect-before-booking and repeated no-project language create an unusually credible low-pressure posture.
- Responsive behavior is sound: one-column mobile flow, no horizontal overflow, and the fifth outcome becomes a deliberate full-width coda on desktop.

## Remaining Issues

### [P2] Price reads as a second eyebrow
The price is now high-contrast 13px ink, but it remains uppercase mono directly under an 11px uppercase audience label. It is readable without becoming a primary decision variable.

**Fix:** Give the number a distinct treatment—larger mono without uppercase tracking, or a card term row opposite the CTA.

### [P2] Booking competes with routing above the fold
The sticky navigation and hero both emphasize booking while the owner/operator quiz is secondary. This conflicts with the page's audience-routing thesis.

**Fix:** Decide whether the quiz or generic booking should carry the hero's primary weight. Hero proof remains explicitly deferred.

### [P3] Outcomes heading reserves an empty right column
The shared two-column heading grid has no right-column content in Outcomes, so the void can read as a missing element.

**Fix:** Use a single-column heading variant or add one concise framing sentence.

### [P3] Offer mechanics remain one click away
The assessment duration and deliverable exist in data but are absent from the card. The pilot likewise does not state its output or timing.

**Fix:** Add deliverable and duration/turnaround to the offer metadata when those facts are approved.

## Persona Red Flags

- Owner/operator: the free quiz remains subordinate to the higher-commitment booking call.
- Engineering leader: inspectable technical evidence exists, but no client outcome or third-party result yet supports the pilot.
- Mobile visitor: the responsive mechanics are clean, but the page remains long and repeats several terminal actions.

## Deferred Opportunity: Hero Proof

Not scored as a regression. The empty hero-right area is the natural place for one named, inspectable result—not a logo wall. The existing Morningstar/Ford line currently carries credibility from beneath the hero actions.

## Questions

- Should the owner/operator quiz carry primary weight in the hero while the sticky nav preserves booking access?
- Should prices become terms of the offer rather than metadata?
- When hero proof is ready, what single artifact or result can a skeptical buyer inspect?
