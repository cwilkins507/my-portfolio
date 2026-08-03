---
target: the About page
total_score: 25
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 3
timestamp: 2026-08-03T15-00-34Z
slug: src-components-about-jsx
---
Method: dual-agent (A: CritiqueDesignReview [scout] · B: CritiqueDetectorEvidence [task])
⚠️ PARTIAL: A's browser inspection failed (Playwright EPERM in its sandbox; A worked from source + supplied measurements). B completed its work but yielded a placeholder instead of its report; its detector findings were recovered from its transcript and its browser evidence was re-measured in the parent. Both assessments stayed isolated from each other.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Little state to expose, but neither the booking CTA nor the resume download says what happens next. |
| 2 | Match System / Real World | 4 | "Business math first", Ford finance/field-ops language maps directly to owner-operator concerns. |
| 3 | User Control and Freedom | 3 | Skip link + ordinary links; external booking and PDF download offer no return affordance. |
| 4 | Consistency and Standards | 2 | `rounded-lg` card grid, `rounded-full` buttons, and 7 off-ramp font sizes contradict DESIGN.md's square/flat ledger + documented type ramp. |
| 5 | Error Prevention | 3 | Nothing in `main` can error; no destructive actions. Revised up from A's 2 — A penalised missing "what happens next" copy, which is a hierarchy issue, not error prevention. |
| 6 | Recognition Rather Than Recall | 3 | Section kickers and table headers aid scanning; role/company/detail density rises on small screens. |
| 7 | Flexibility and Efficiency | 2 | No skim path, anchor index, or proof summary — a seven-section backstory must be read linearly. |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained paper/rule palette is strong; seven sections plus five+ CTAs dilute the single ask. |
| 9 | Error Recovery | 2 | The only failure path is the global footer newsletter (`popupwindow` target, no visible success/error state). |
| 10 | Help and Documentation | n/a | Persuade/Read surface; no docs expected. |
| **Total** | | **25/36** | **Acceptable (69%), one point under the Good band** |

## Design Specificity Verdict

**LLM assessment (A).** Authored for this product more than a template — but the authorship is carried by *copy*, not by an ownable composition. "Most engineers start with 'Hello World.' Mine starts with a $2 million pricing problem." is a specific practitioner claim; the Ford/Raptor/Excel origin, the "field rep and the engineer with the ticket" framing, and the explicit employment-context caveat make the rhetoric unusually accountable. The Newsreader + IBM Plex Mono pairing, warm paper tokens, and ruled record support that voice.

The generic parts remain substantial: hero portrait plus two CTA buttons, repeated kicker/heading/body rows, a three-card standards grid, "View services", "Read case studies", newsletter signup, rounded gold buttons. Another independent consultant could reuse this shell unchanged and swap the anecdotes. Strongest authored move: the evidence ledger in `BackgroundRecord.jsx`. Weakest: `Working standards`, whose `rounded-lg` card treatment visibly breaks the stated flat, square ledger language.

**Deterministic scan (B).** `detect.mjs` exit 2 — **7 findings, all `design-system-font-size` advisory**, all the same root cause: literal type sizes off the DESIGN.md ramp. `About.jsx:44` (2rem, 3.1rem), `About.jsx:217` (15px), `BackgroundRecord.jsx:54` (19px), `:61` (15px), `:110` (17px), `:118` (15px). No false positives — DESIGN.md documents only display / headline / body 21px / label 11px, and the 15/17/19px annotation tier used across the record and notes genuinely is not in it. This is real system drift introduced by the recent record rework.

**Visual overlays.** Not attempted — no user-visible overlay was injected, so no overlay claim is made. Browser evidence is measured values only.

## Overall Impression

The copy is the best thing here and the page mostly gets out of its way. Two structural problems hold it at Acceptable: a **measured 43% layout discontinuity at the `md` breakpoint**, and a **decision architecture that never closes** — the visitor reads seven sections of trust-building and the final action sends them to case studies rather than the conversation the page exists to start.

## What's Working

- **Bounded claims.** The "Employment context" aside explicitly states the pricing story came from a full-time Ford role, not a consulting engagement, and that the cost is directional with no public artifact. That is unusually good trust design for a consultant page.
- **The two-voice system.** Newsreader carries narrative authority; IBM Plex Mono labels periods, companies, and section kickers as evidence metadata. Verified consistent: all 7 kickers at 11px/0.18em, all 5 h2s at weight 500 with negative tracking.
- **Accessibility is genuinely solid, not just clean-scanning.** Full axe (every rule) returns **0 violations at all 10 widths tested**. All 6 interactive elements in `main` are ≥44px tall. Every focusable carries a visible 2px gold outline. Tab order follows DOM and visual order. Reduced motion confirmed: all arrow transforms report `none` or identity. Both webfonts load.

## Priority Issues

- **[Resolved 2026-08-03] Layout discontinuity reduced without breaking the shared rail.** Baseline measured **366px at 767px and 524px at 768px — a 158px, 43% jump**. End-to-end measurements disproved the container-stack estimate: (a) measured 532px at a 494px track, worse than baseline; (c) removed the jump only by returning this section to a single column while every peer retained its rail. The shipped narrow shared rail, `clamp(120px,18vw,280px)`, measures **366px → 456px**, reducing the discontinuity to **90px (25%)** while preserving the page's information architecture and avoiding overflow. The remaining 90px is the real cost of activating the rail.
- **[Resolved 2026-08-03] Hero has one dominant action.** The free 30-minute call remains the only filled action. The provisional AI Delivery Pilot brief is now a quiet contextual text link for engineering leaders with a ready repository.
- **[Resolved 2026-08-03] The ask closes.** `Working together` now repeats the booking action after the existing no-pressure reassurance; services is a secondary text link. Booking attribution uses `bookingPageOpen` with location `about-close`.
- **[P2] Shape drift.** **What:** `rounded-lg` on the standards grid, pill CTAs, and a rounded profile photo remain against DESIGN.md's "square by default" and "flat ledger" language. The 15/17/19px annotation tier is now explicitly documented in DESIGN.md and the detector is clean. **Why it matters:** the system's own rules make the page feel authored; each unexplained exception spends that credibility. **Fix:** square the standards columns with 1px separators to match the record; treat the photo and shared CTA pills as explicit component exceptions rather than silently generalizing them. **Suggested command:** `/impeccable polish`
- **[P2] Remaining gold actions still dilute the ask.** **What:** booking appears as the filled action in hero and close, while the case-studies footer remains a separate filled gold action. Resume, services, and pilot routes are now text links. **Why it matters:** the close should remain the final authored decision. **Fix:** quiet the case-studies footer action or move that utility route before the close. **Suggested command:** `/impeccable quieter`

## Persona Red Flags

**Casey (distracted mobile, one-handed)** — the 767→768 discontinuity lands squarely in the band where a tablet rotates or a laptop window is half-snapped; the record grows 158px taller as the screen widens. At 390px the booking CTA sits at y=730 while the next action is at y=2109 and the final one at y=5777: nearly 5,000px of scroll between decision points, with no persistent action.

**Jordan (first-timer)** — "AI Delivery Pilot brief" and "AI coding tool adoption" appear with no plain explanation of the current offer; understanding how to start requires leaving for `/services`. The Ford story is credible but never bridged to "what happens in my team".

**Sam (screen reader / keyboard)** — mostly passing, and better than typical: stacked-table roles restored (`role="table"/"row"/"cell"`), `thead` hidden at 390px with every cell carrying a visually-hidden label, tab order logical, focus always visible. One real residual: the second cell announces **"Role: Lead Software EngineerMorningstar"** — role and company run together with no separator, because both spans are inside one `<td>` with no punctuation or comma between them.

## Minor Observations

- The record's company label is accent gold in the ledger variant but muted in the shipped table variant, so the chosen treatment loses the gold evidence cue.
- `Working standards` is the only full-width section; its kicker sits at the page edge while all five other kickers sit in the rail — a visible alignment outlier at every width ≥768px.
- The footer newsletter is global chrome, not page-specific, yet it adds a separate subscription decision immediately after the About closing CTA.
- `document.fonts` enumerates empty while `check()` returns true for both families — Google Fonts `display=optional` means a slow connection silently falls back to Georgia/monospace with no layout shift, which is the right trade but worth knowing.

## Questions to Consider

1. If the page exists to sell a free 30-minute intro, why is the strongest closing action "Read case studies"?
2. Is "$2 million" proof of consulting relevance, or an employment anecdote that still needs an explicit bridge to the owner-operator's own workflow?
3. Does the deferred AI Delivery Pilot brief belong in the hero at all, or is it quietly changing which product this page sells?
4. If "The Working Ledger" is the north star, why is the only full-width emphasis component a rounded card grid rather than a ruled record?
