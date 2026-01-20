# Markdown Humanizer Skill

A Claude/Copilot skill that transforms AI-generated markdown into authentic, human-sounding content by removing common AI writing patterns and adding natural voice.

## What It Does

Detects and removes AI writing patterns from markdown files, then adds human personality. Perfect for portfolios, documentation, blog posts, and README files that need to sound less robotic and more authentic.

## Key Features

### Based on Wikipedia's AI Writing Guide

The skill identifies and fixes **10 major AI writing patterns** with before/after examples:

1. **Inflated Importance Language** - Removes phrases like "stands as a testament to," "pivotal moment," "evolving landscape," "indelible mark"
2. **Promotional Tone** - Eliminates travel-brochure enthusiasm: "seamless," "cutting-edge," "vibrant," "breathtaking"
3. **Superficial Analysis** - Cuts empty "-ing" phrases: "emphasizing the significance of," "highlighting the importance of"
4. **Em Dash Overuse** - Limits em dashes (—) to one per paragraph maximum
5. **Rule of Three** - Varies list length to avoid the predictable three-item pattern
6. **AI Vocabulary** - Removes clichés: "It's important to note," "dive deep," "leverage," "unlock the potential"
7. **Negative Parallelisms** - Simplifies "It's not X, it's Y" dramatic contrasts
8. **Excessive Transitions** - Reduces overuse of "Moreover," "Furthermore," "However," "Additionally"
9. **Bolded Lists** - Eliminates redundant bolded-title-plus-description format
10. **Uniform Sentence Structure** - Varies sentence length and patterns dramatically

### Human Voice Guidelines

The skill doesn't just remove AI patterns—it adds authentic personality:

- **Opinions and Personality** - Adds reactions and subjective takes, not just facts
- **Specific Details vs Generic Statements** - Replaces vague descriptions with concrete examples
- **Messy Thinking and Failed Attempts** - Shows real thought process, including mistakes
- **Varied Sentence Length** - Mixes short punchy statements with longer explanatory ones
- **Authentic Uncertainty** - Admits when things aren't fully known or tested

### Processing Workflow

Step-by-step instructions for transforming markdown:

1. **Read** the entire file for context
2. **Identify** AI patterns from the comprehensive pattern list
3. **Make targeted edits** to remove each pattern type
4. **Add human elements** like opinions, specific details, and personality
5. **Preserve** all technical accuracy, code blocks, and factual content
6. **Maintain** markdown formatting (headers, links, lists, code)

**What to Preserve:**
- Markdown structure and formatting
- Technical accuracy
- Code blocks and examples
- Factual information

**What to Change:**
- Tone and voice
- Sentence structure and length
- Word choice and phrasing
- Generic statements to specific ones

**How to Maintain Meaning:**
- Keep all facts intact
- Preserve original intent
- Just change presentation, not content

## How to Use It

### For Claude Code (Desktop App)

1. Create the skill directory:
```bash
mkdir -p ~/.claude/skills/humanizer
```

2. Save the SKILL.md file:
```bash
# Copy SKILL.md to the directory
cp SKILL.md ~/.claude/skills/humanizer/
```

3. Use the skill in your conversations:
```
@humanizer Please humanize my portfolio README.md
```

### For GitHub Copilot

**Option 1: Workspace Settings**

Add to `.github/copilot-instructions.md`:
```markdown
## Markdown Humanizer Skill

[Copy the contents of SKILL.md here]
```

**Option 2: Direct Reference**

In your workspace, reference the skill:
```
@workspace Use the humanizer skill in .github/skills/humanizer/ to rewrite this markdown file
```

**Option 3: Chat Instructions**

Paste the relevant sections from SKILL.md into the chat when you need to humanize content.

## Example Usage

### Simple Request
```
Humanize this markdown file: portfolio-about.md
```

### Specific Focus
```
Remove AI patterns from my README.md but keep the technical tone for the API documentation section
```

### Bulk Processing
```
Humanize all markdown files in the /docs folder
```

## Example Transformation

**Before** (AI-generated):
```markdown
This project stands as a testament to modern web development practices. 
Moreover, it demonstrates the evolving landscape of full-stack development.

The application leverages cutting-edge technologies:
- **React**: Provides a robust, scalable frontend framework
- **Node.js**: Enables efficient server-side processing

Furthermore, the system is designed to be scalable, maintainable, 
and performant—meeting the needs of today's demanding users.
```

**After** (Humanized):
```markdown
I built this to solve a specific problem: managing user data across 
multiple services without writing the same integration code repeatedly.

The stack is React, Node.js, and PostgreSQL. I picked React because 
I already knew it (tried Vue for two days, went back).

Early versions had scaling issues—the database connection pool kept 
maxing out. Fixed it by adding connection management and caching 
the 15-20 queries that got hit constantly.
```

## When to Use

- Portfolio markdown files that sound too polished or generic
- Technical documentation that feels robotic
- Blog posts or articles lacking personality
- README files with promotional language
- Any markdown content flagged as "AI-sounding"
- Before publishing content you want to feel authentic

## Tips for Best Results

- **Context matters**: Not every AI pattern is wrong in every context
- **Technical docs can be formal**: Balance personality with professionalism
- **Clarity over personality**: When in doubt, prioritize being understood
- **Test your work**: Read it aloud—would a human actually say this?
- **Iterate**: First pass removes patterns, second pass adds voice

## Testing Your Humanized Content

Ask yourself:
- Would a human actually write this sentence this way?
- Does this sound like something I'd say to a colleague?
- Are there specific details or just generic statements?
- Can I feel a person behind these words?
- Would I want to keep reading this?

If the answer is "no" to any of these, keep editing.

## Files in This Skill

- `SKILL.md` - Complete skill definition with all patterns and examples
- `README.md` - This file, documentation for using the skill

## Contributing

Found a new AI pattern to detect? Have suggestions for improving the humanization? Open an issue or submit a PR.

## License

MIT - Use this skill however you'd like.

---

**Note**: This skill aims to make content sound more human, but it's a tool, not a replacement for human writing. The best results come from using it as a starting point, then adding your own authentic voice and experiences.
