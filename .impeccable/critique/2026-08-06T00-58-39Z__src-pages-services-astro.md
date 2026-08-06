---
target: services page
total_score: 20
max_score: 28
na_heuristics: 3,5,9
p0_count: 0
p1_count: 3
timestamp: 2026-08-06T00-58-39Z
slug: src-pages-services-astro
---
# Services Page Critique

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 2 | Active navigation is clear, but card and proof CTAs look like labels. |
| 2 | Match with the real world | 4 | Buyer-language problem statements and operational outcomes are excellent. |
| 3 | User control and freedom | n/a | Static persuasive surface; no reversible flow. |
| 4 | Consistency and standards | 2 | One link job uses three visual treatments. |
| 5 | Error prevention | n/a | No on-page input or committed action. |
| 6 | Recognition rather than recall | 3 | Strong recognition section; unexplained Diagnose/Govern/Decide/Build taxonomy adds memory load. |
| 7 | Flexibility and efficiency | 3 | Strong audience routing, but proof is buried. |
| 8 | Aesthetic and minimalist design | 3 | Restrained system; some metadata and dead space do not earn attention. |
| 9 | Error recovery | n/a | No reachable error state. |
| 10 | Help and documentation | 3 | Useful self-serve evidence exists but is visually weak. |
| **Total** | | **20/28** | **Good, with a weak decision layer** |

## Design Specificity Verdict

Authored and specific, not category-interchangeable. Newsreader plus IBM Plex Mono, warm paper/ink/ochre tokens, asymmetric editorial measures, and hairline structure form a coherent visual system. The weakness is not taste; it is conversion hierarchy and information architecture.

The deterministic scan found 14 advisory `design-system-font-size` findings in `src/pages/services.astro` at lines 218, 227, 284, 314, 321, 381, 388, 395, 431, 436, 512, 522, and 557. These are typography-token drift warnings, not rendering failures; several fluid `clamp()` endpoints are likely intentional but remain undocumented in `DESIGN.md`. No reliable overlay was created: the bundled server exhausted the valid port range and browser automation hit an EPERM temporary-directory failure in the detector assessment.

## Overall Impression

The page earns trust through restraint and unusually good buyer-language recognition. It loses that trust at the decision point: four equal cards, inconsistent link affordances, incomplete proof, and no recommended starting path make the visitor do the consultant's routing work.

## What's Working

- The recognition copy sounds observed rather than invented: Claude Code/Cursor/Copilot inconsistency, owner uncertainty, and spreadsheet/person-memory bottlenecks.
- The anti-hard-sell language is credible because it offers inspectable artifacts and explicitly permits “no useful next step.”
- Typography, palette, focus states, touch targets, heading order, and the single 900px responsive collapse are coherent and accessible.

## Priority Issues

### [P1] The four service cards do not create a clear decision
Two cards resolve to the same introduction-call destination, all four have equal weight, only one shows price, and none is recommended. The reader compares four concepts to reach three outcomes.

**Fix:** Merge or clearly differentiate the two call-based paths, expose the pilot price, and mark the common starting path. **Suggested command:** `/impeccable shape`.

### [P1] Conversion links look like metadata
Card, proof-ledger, and referral links use 11px undecorated mono text—the same voice as inert labels. The arrow is the only affordance. The closing section then introduces a third link grammar in 18px serif.

**Fix:** Standardize links: 13–14px, underline, accent color, visible hover/focus treatment; demote closing secondary links beneath the primary button. **Suggested command:** `/impeccable clarify`.

### [P1] Recognition raises tension but withholds the answer already in the data
`referralSignals` contains a tailored `detail` response for every pain; the page renders only label and quote. Visitors move from “that is my problem” directly into a menu.

**Fix:** Render `signal.detail` as a subordinate response line under each quote. **Suggested command:** `/impeccable clarify`.

### [P2] Proof and credibility are buried
The Morningstar/Ford credibility line comes after the CTA and disclaimer. The capability brief sits in the least prominent band. There is no third-party proof, named result, or client evidence on the page.

**Fix:** Reorder the hero, demote the bio to supporting text, elevate inspectable evidence, and add real third-party proof only when available. **Suggested command:** `/impeccable layout`.

### [P2] Precision breaks at the outcomes grid and sticky navigation
Five outcomes in a two-column grid produce an orphaned half-width final row. The translucent sticky navigation allows large display text to bleed through it.

**Fix:** Make the fifth outcome a deliberate full-width coda (or add a sixth), and make the shared navigation effectively opaque. **Suggested command:** `/impeccable polish`.

## Persona Red Flags

- **Jordan, first-time buyer:** Four equal service cards offer no “start here,” duration, or consistent price signal. The page’s smallest text carries the decisive $99 CTA.
- **Riley, evidence-oriented evaluator:** “Inspect before you book” is excellent, but both proof links are visually recessive; no client evidence validates the claims.
- **Casey, distracted mobile visitor:** The recognition hit is followed by a four-way decision. The final “Not sure which path fits?” section repeats four choices instead of simplifying them.
- **Dana, owner-operator:** Her best starting action is the secondary ghost quiz button, while three of four service cards primarily address engineering teams.

## Cognitive Load and Emotional Journey

Moderate cognitive load: hierarchy, chunking, and grouping work; minimal choices and one-thing-at-a-time fail at the service grid and final CTA. The emotional arc is confidence → recognition → overwhelm → competence → dilution. The missing beat is relief: “Here is what usually fixes this.”

## Minor Observations

- `Problem recognition / 03 patterns` is authoring metadata with a hardcoded count, not reader value.
- Five high-intent links lack analytics events.
- `pilotSteps`, `.process-*` rules, and the orphan `.recognition` class are dead code.
- The detector reports 14 undocumented font-size steps; reconcile intentional sizes with `DESIGN.md` rather than blindly changing them.

## Questions to Consider

- Why present four ways when visitors can reach only three destinations?
- If the $99 assessment is the owner/operator entry point, why is its price in the smallest, least link-like text?
- What evidence can replace assertion before asking a skeptical visitor to self-route?
- Should the page recommend a path, or is avoiding that recommendation the current strategy?
