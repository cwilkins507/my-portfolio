---
name: CollinWilkins.com Editorial Gold
description: An authored engineering practice organized with the precision of a working ledger.
colors:
  paper: "oklch(0.987 0.005 95)"
  paper-secondary: "oklch(0.966 0.008 92)"
  paper-tertiary: "oklch(0.944 0.011 90)"
  ink: "oklch(0.235 0.009 80)"
  ink-soft: "oklch(0.44 0.011 80)"
  ink-faint: "#716d66"
  rule: "oklch(0.885 0.012 88)"
  ledger-gold: "oklch(0.595 0.118 80)"
  action-gold: "oklch(0.645 0.118 80)"
  gold-text: "#8f650f"
  gold-deep: "oklch(0.50 0.105 76)"
  on-gold: "oklch(0.235 0.009 80)"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(42px, 7vw, 96px)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(30px, 4.8vw, 54px)"
    fontWeight: 500
    lineHeight: 1.02
  body:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "21px"
    fontWeight: 400
    lineHeight: 1.62
  page-statement:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(2rem, 4.5vw, 3.1rem)"
    fontWeight: 500
    lineHeight: 1.03
    letterSpacing: "-0.03em"
  record-title:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "19px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  compact-title:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.35
  annotation:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0.18em"
rounded:
  square: "0"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "48px"
  section: "clamp(60px, 8vw, 100px)"
components:
  button-primary:
    backgroundColor: "{colors.action-gold}"
    textColor: "{colors.on-gold}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "11px 19px"
  button-primary-hover:
    backgroundColor: "{colors.gold-deep}"
    textColor: "{colors.on-gold}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "11px 19px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "11px 19px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "13px 19px"
---

# Design System: CollinWilkins.com Editorial Gold

## Overview

**Creative North Star: "The Working Ledger"**

The system combines an authored editorial voice with the exactness of an engineering record. It should feel like a practitioner has assembled evidence, decisions, and next actions on warm paper—not like a software company has decorated a conversion template. The atmosphere is authored and exact: human in tone, rigorous in structure, and confident without promotional spectacle.

Typography carries the personality. Rules, spacing, contrast, and ordered records carry the structure. The system rejects generic SaaS UI: interchangeable card grids, blue-purple gradients, glossy dashboards, inflated product theater, and decoration that competes with evidence.

**Key Characteristics:**
- Warm paper, near-black ink, and sparingly used ledger gold.
- Newsreader supplies authored authority; IBM Plex Mono labels evidence, state, and measurement.
- Flat, ruled surfaces with hierarchy produced through spacing and contrast.
- Asymmetric editorial compositions balanced by precise alignment.
- Claims remain attached to inspectable evidence and explicit boundaries.

## Colors

Paper, ink, and ledger gold form the complete visual argument. Gold is rare enough to signal decisions, focus, and action rather than acting as ambient decoration.

### Primary
- **Ledger Gold:** The accent for marks, active rules, focus, and restrained highlights.
- **Action Gold:** A lighter gold reserved for filled primary actions where dark ink must remain legible.
- **Deep Gold:** The primary-action hover state.

### Neutral
- **Warm Paper:** The default page and component surface.
- **Secondary Paper:** A quiet grouped surface for forms, evidence, and supporting regions.
- **Tertiary Paper:** The strongest neutral separation before inversion is warranted.
- **Near-Black Ink:** Primary text and high-authority inverted surfaces.
- **Soft Ink:** Supporting prose.
- **Faint Ink:** Metadata and secondary labels when contrast remains sufficient.
- **Ledger Rule:** One-pixel separators and field boundaries.

### Named Rules

**The Scarce Gold Rule.** Gold identifies a decision, active state, or primary action; it never washes an entire page in decoration.

**The Ink Carries Authority Rule.** High-emphasis surfaces invert to ink and paper before introducing a new color or effect.

## Typography

**Display Font:** Newsreader (with Georgia fallback)  
**Body Font:** Newsreader (with Georgia fallback)  
**Label/Mono Font:** IBM Plex Mono (with the platform monospace fallback)

**Character:** Newsreader makes the site feel authored rather than assembled. IBM Plex Mono is reserved for labels, evidence, state, measurements, and compact controls; it is not a technical costume for ordinary prose.

### Hierarchy
- **Display** (500, fluid 42–96px, approximately 0.98 line-height): The homepage proposition. Reserved for the one statement that opens the site.
- **Page Statement** (500, fluid 32–49.6px, 1.03 line-height, -0.03em): The opening claim on an interior page. Deliberately below Display so an interior page never competes with the homepage proposition, and constrained to roughly a 33ch measure so it reads as a composed shape rather than a paragraph.
- **Headline** (500, fluid 30–54px, approximately 1.02 line-height): Section arguments and closing calls.
- **Body** (400, 21px, 1.62 line-height): Long-form reading and explanatory prose, normally constrained to the established 38rem measure.
- **Record Title** (500, 19px, 1.3 line-height, -0.01em): Role and item names inside a ledger or record. One line at every supported width; if it wraps, the record is too wide or the name too long.
- **Compact Title** (500, 17px, 1.35 line-height): The same role in a denser tabulated context, where a column header already supplies the field name.
- **Annotation** (400, 15px, 1.55 line-height): Copy that describes or qualifies a record rather than narrating — record details, evidence notes, and closing asides. Annotation never carries the reading path; Body does.
- **Label** (500, 11px, 0.18em tracking, uppercase): Evidence types, navigation labels, state, and metadata.

### Named Rules

**The Two-Voice Rule.** Newsreader explains and persuades; IBM Plex Mono identifies, measures, and controls.

**The Annotation Tier Rule.** Records and asides sit one step below Body. Setting a record detail at Body size makes three annotations occupy more page than the story they annotate; setting narrative prose at Annotation size makes the argument look like a footnote.

## Layout

The default content width is 74rem with fluid 20–48px side padding. Reading content stays near the 38rem measure. Persuasive surfaces may use asymmetric columns, but the reading path remains proposition → evidence or explanation → bounded action. Related details group through proximity and one-pixel rules before they receive a filled container.

Wide layouts may divide argument from evidence or decision routes. Intermediate widths reflow before either column becomes cramped. Narrow layouts use DOM-order stacking, full-width actions where helpful, and no horizontal page overflow. Section rhythm is generous; internal record rhythm is compact and repeatable.

## Elevation & Depth

The system is flat and ruled. One-pixel dividers, paper-tone changes, and ink inversion create depth. Shadows are exceptional and must communicate a selected artifact or explicit state; ambient floating-card shadows do not belong.

### Named Rules

**The Flat Ledger Rule.** A surface earns separation through spacing, a paper tone, or a one-pixel rule before it earns elevation.

## Shapes

Editorial regions, ledgers, and evidence containers are square or minimally shaped. Pills are reserved for compact controls, tags, filters, and existing primary/ghost buttons. Mixing large rounded cards with square editorial structures weakens the system.

## Components

### Buttons
- **Shape:** Existing shared actions use the pill radius; preview-study actions may use square editorial buttons when the surrounding surface is explicitly print-like.
- **Primary:** Action Gold with Near-Black Ink and compact mono typography.
- **Hover / Focus:** Deep Gold on hover; the global two-pixel gold focus outline remains visible with a four-pixel offset.
- **Ghost:** Transparent paper surface, one-pixel rule, and Near-Black Ink; the rule darkens on hover.

### Chips
- **Style:** Mono uppercase text, pill shape, one-pixel rule, and transparent or Secondary Paper surface.
- **State:** Selected state uses gold text or rule emphasis without introducing a new hue.

### Cards / Containers
- **Corner Style:** Square by default.
- **Background:** Warm Paper or Secondary Paper.
- **Shadow Strategy:** Flat by default.
- **Border:** One-pixel Ledger Rule; Near-Black Ink only for decisive emphasis.
- **Internal Padding:** Usually 20–38px, scaled to the content hierarchy.

### Inputs / Fields
- **Style:** Warm Paper, one-pixel Ledger Rule, 13px by 19px padding; existing search fields use the pill radius.
- **Focus:** Two-pixel gold outline with four-pixel offset.
- **Error / Disabled:** Preserve the entered value, name the problem in plain language, and keep state distinguishable without color alone.

### Navigation

Navigation uses compact IBM Plex Mono labels, Warm Paper or a lightly translucent paper surface, one-pixel separation, and explicit text links. Mobile navigation preserves keyboard order and visible focus.

### Ledger Route

A ledger route pairs a mono audience or evidence label with a Newsreader action statement and supporting prose. Multiple routes share one structural frame or repeated rules; they do not become a generic grid of floating cards.

## Do's and Don'ts

### Do:
- **Do** use one strong editorial move per major surface, then quiet its supporting elements.
- **Do** attach claims to evidence, scope, or source boundaries.
- **Do** use ink inversion for decisive emphasis.
- **Do** preserve readable measures, visible focus, reduced-motion behavior, and DOM-order responsive stacking.
- **Do** use Ledger Gold sparingly for state, rules, and primary action.

### Don't:
- **Don't** introduce generic SaaS gradients, glossy dashboards, or interchangeable icon-card grids.
- **Don't** use IBM Plex Mono for ordinary explanatory prose.
- **Don't** round every container; pills are a control pattern, not the page skeleton.
- **Don't** use shadows when spacing, paper tone, or a one-pixel rule can express the hierarchy.
- **Don't** let visual theater outrun the evidence available on the page.
