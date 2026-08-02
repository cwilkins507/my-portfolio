---
target: homepage
total_score: 21
max_score: 32
na_heuristics: 7,9
p0_count: 0
p1_count: 2
timestamp: 2026-08-02T20-43-02Z
slug: src-pages-index-astro
---
Method: dual-agent (A: HomepageDesignReview · B: HomepageDetectorEvidence)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 3 | Native disclosure and mobile-menu states work; no active-home cue. |
| 2 | Match System / Real World | 2 | Concrete workflow language is mixed with engineering jargon and the wrong official offer name. |
| 3 | User Control and Freedom | 3 | Navigation, browser Back, native details, Escape, focus return, and mobile-menu exits work. |
| 4 | Consistency and Standards | 3 | Visual system is cohesive; audience and offer priorities conflict with PRODUCT.md. |
| 5 | Error Prevention | 2 | Missing eligibility and offer priority can route owner-operators toward a deferred pilot. |
| 6 | Recognition Rather Than Recall | 3 | Actions are labeled, but owners must translate jargon and retain context across pilot-focused sections. |
| 7 | Flexibility and Efficiency | n/a | Persuasion/portfolio homepage; accelerators are not meaningfully applicable. |
| 8 | Aesthetic and Minimalist Design | 3 | Disciplined visual system; first viewport and 6,826 px mobile page carry too many equal-weight decisions. |
| 9 | Error Recovery | n/a | No on-page input or recoverable error flow; conversion moves to Cal.com. |
| 10 | Help and Documentation | 2 | FAQ is concise but exclusively explains the engineering pilot, not the current assessment path. |
| **Total** | | **21/32** | **Acceptable (65.6%)** |

## Design Specificity Verdict

**LLM assessment:** Authored and product-specific, not category-interchangeable—but strategically pointed at the wrong product truth. Warm paper, scarce ledger gold, Newsreader plus IBM Plex Mono, square ruled structures, the asymmetric hero docket, and careful evidence qualifiers form a coherent Working Ledger system. The conventional hero → credibility → services → proof → FAQ → close skeleton is executed recognizably for Collin. The major specificity failure is commercial: PRODUCT.md makes non-financial owner-operators and the $99 AI Workflow Opportunity Assessment current truth while treating engineering-leader pilot/homepage positioning as provisional or deferred. The page nevertheless gives the pilot the dominant docket, Service schema, all four FAQs, closing secondary CTA, and footer positioning.

**Deterministic scan:** 36 advisory findings in `src/pages/index.astro`, all `design-system-font-size` / “Font size outside DESIGN.md,” at lines 259, 290, 307, 368, 376, 383, 431, 475, 484, 493, 513, 520, 529, 551, 593, 607, 630, 640, 663, 672, 680, 714, 729, 751, 765, 778, 788, 827, 851, 878, 949, 962, 1061, 1067, 1104, and 1117. The scan confirms type-ramp drift, especially 8–10 px metadata that creates a real low-vision/mobile readability risk. Many fluid display/component endpoints are false positives: DESIGN.md defines only a few canonical steps, so deliberate responsive clamps such as 48–72 px and 20–25 px are mechanically flagged despite coherent use.

**Visual overlays:** No reliable user-visible overlay is available. Assessment B’s fresh Playwright context failed before tab creation with `EPERM` creating the browser artifact directory; detect.js was not injected and no detector server was started. Assessment A did complete fresh visual inspection at 1160×922 and 390×844.

## Overall Impression

The homepage looks confident, unusually authored, and technically disciplined. The visual design is ahead of the decision architecture. Its biggest opportunity is to make the current owner-operator assessment—not the deferred engineering pilot—the unmistakable five-second path.

## What’s Working

1. **Genuinely authored Working Ledger system.** The asymmetric proposition/docket, ruled proof row, split FAQ, and ink close maintain square surfaces, scarce gold, and two typographic voices with precision.
2. **Trust through disciplined attribution.** “Built & shipped at,” “not consulting-client logos,” and “Proof before promises” separate employment/founder work from consulting-client claims; metrics retain careful qualifiers.
3. **Strong responsive and accessibility foundation.** At 390×844 there was no horizontal overflow. DOM-order stacking, native disclosures, alt text, reduced motion, visible focus, focus trapping, Escape dismissal, inert main, scroll lock, and focus return worked.

## Priority Issues

### [P1] Homepage contradicts authoritative current product and audience

**Why it matters:** PRODUCT.md identifies non-financial owner-operators and the free intro → $99 Workflow Opportunity Assessment as current truth. The page makes the deferred pilot central visually, commercially, and in JSON-LD, risking misrouting and incorrect search messaging.

**Fix:** Make the owner-operator assessment the primary hero/docket, official offer name, FAQ, close, footer, and schema. Surface $99, 60 minutes, up to three ranked opportunities, a recommended first system, 14-day plan, 48-hour Opportunity Map, and eligibility. Remove pilot homepage schema/priority unless explicitly authorized.

**Suggested command:** `/impeccable clarify`

### [P1] Mobile primary conversion is below the fold and touch targets are undersized

**Why it matters:** At 390×844, the primary gold CTA starts at y=931. The hamburger measured 32×26, close control 30×36, and multiple standalone/footer links exposed only 14–21 px-high targets. One-handed and motor-impaired users may never see or reliably hit the intended path.

**Fix:** Put one 44+ px primary CTA directly after a shorter mobile lede; move audience routing lower or make the authoritative owner-operator route primary. Enlarge menu controls and pad standalone/footer actions to at least 44×44 px.

**Suggested command:** `/impeccable adapt`

### [P2] Too many kinds of decision compete at once

**Why it matters:** The first desktop viewport contains 10 non-brand actions: five header choices, two audience routes, booking, all-paths navigation, and the docket link. Visitors must infer whether their decision is audience, service, call, or pilot. Four equal-weight offers push recommendation work onto the buyer.

**Fix:** Choose one primary decision and one secondary escape. Lead owner-operators to intro/assessment, demote engineering to a lower route, reduce top-level navigation where possible, and remove the 330 px mobile minimum from offer records.

**Suggested command:** `/impeccable distill`

### [P2] Reassurance serves only the pilot

**Why it matters:** Every FAQ covers pilot acceptance, readiness, and founding price. Owner-operators get no reassurance about eligibility, $99, 48-hour delivery, recording, or the no-opportunity outcome.

**Fix:** Use homepage FAQs for current-path eligibility, free intro, assessment inputs/output, and what happens when no worthwhile opportunity is found. Move pilot terms to the pilot page.

**Suggested command:** `/impeccable clarify`

### [P2] Proof is careful but not inspectable

**Why it matters:** PRODUCT.md promises inspectable artifacts, but the three largest proof metrics link nowhere. A skeptical buyer can only accept or reject assertions.

**Fix:** Attach each metric to a public case note, artifact, article, or scoped capability detail while retaining employment attribution.

**Suggested command:** `/impeccable harden`

## Cognitive Load

**High: 4/8 checklist failures.** Single focus, visual hierarchy, one-thing-at-a-time, and minimal choices fail. Chunking, grouping, working-memory support, and progressive disclosure pass. The desktop header and mobile menu each expose five choices. The entire first desktop viewport exposes ten non-brand actions. Four offers and four FAQs are exactly at the working-memory limit.

The emotional journey begins with confident recognition, shifts to hesitation during audience/service self-selection, peaks at carefully qualified proof, falls during four equal-weight offers and pilot-only reassurance, then recovers with the low-pressure ledger close. External conversion to the clearly labeled 30-minute Cal.com event is abrupt but understandable.

## Persona Red Flags

**Jordan — first-timer:** The hero presents two audience records, a free call, all paths, and a pilot docket without one obvious first decision. “Governed delivery path,” “bounded agents,” “repository,” and “fail closed” assume engineering fluency. The official current offer name is absent, so Jordan cannot tell whether the next step is the free intro, quiz, $99 assessment, or pilot.

**Riley — stress tester:** PRODUCT.md and page strategy conflict. The deferred pilot dominates hierarchy, schema, FAQ, close, and footer. Carefully qualified metrics have no inspectable sources. The non-financial-services eligibility boundary is missing, and the FAQ tests pilot terms rather than the current assessment contract.

**Casey — mobile user:** At 390×844, the primary CTA begins below the first viewport at y=931. The document is 6,826 px tall; four offers remain 330 px each. Menu controls and several links miss 44×44 px targets. Positives: the CTA itself is 350×46, there is no horizontal overflow, and the menu’s keyboard/focus behavior is robust.

**Morgan — owner-operator:** Small-team routing is secondary while the pilot owns the docket, FAQ, close, and footer identity. The $99 offer is one of four below-fold records and renamed “AI readiness assessment.” Eligibility, 60-minute session, ranked opportunities, recommended first system, 14-day plan, and 48-hour map are absent at the decision point.

## Minor Observations

- Organization marks have uneven optical weight; FiNimbus appears much smaller/lighter.
- The ethically important credibility qualifier is only 8 px.
- The anti-sales reassurance in the dark close is persuasive but tiny.
- One-off presentation values in the homepage weaken maintainability of an otherwise disciplined system.
- Contrast appeared strong for primary combinations, but faint 8–10 px labels need an explicit numeric WCAG audit.

## Questions to Consider

- If owner-operators and the $99 assessment are current truth, why does the homepage spend most authority proving a deferred pilot?
- What one decision should a qualified visitor make in five seconds: audience, engagement, booking, or pilot review?
- If the brand promise is inspectable evidence, why are the three largest proof claims inert?
- Would a confident owner-operator homepage recommend the assessment instead of presenting four equal paths?
- At 390×844, is the gold CTA truly primary if it starts at y=931?
