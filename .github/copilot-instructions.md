# GitHub Copilot Instructions

## Custom Skills

### /humanize - Markdown Humanizer

Remove AI writing patterns and add authentic human voice to markdown files.

**Usage:**
```
/humanize [filename]
/humanize docs/about.md
/humanize (for current file)
```

**What it does:**
1. Detects and removes 10 common AI writing patterns:
   - Inflated importance language ("stands as a testament to," "pivotal moment")
   - Promotional tone ("seamless," "cutting-edge," "robust")
   - Superficial analysis ("-ing" phrases that add no value)
   - Em dash overuse (limits to one per paragraph)
   - Rule of three patterns (varies list lengths)
   - AI vocabulary clichés ("It's important to note," "dive deep," "leverage")
   - Negative parallelisms ("It's not X, it's Y")
   - Excessive transitions ("Moreover," "Furthermore," "However")
   - Bolded list redundancy
   - Uniform sentence structure

2. Adds human voice elements:
   - Specific details instead of generic statements
   - Personal opinions and reactions
   - Varied sentence length (short punchy + longer explanatory)
   - Messy thinking and failed attempts
   - Authentic uncertainty and admissions

**Preserves:**
- All markdown formatting
- Technical accuracy
- Code blocks
- Factual content

**Example:**
```
/humanize README.md
```

For full pattern reference and examples, see `.github/skills/humanizer/SKILL.md`
