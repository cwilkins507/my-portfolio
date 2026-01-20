---
name: Markdown Humanizer
description: Transforms markdown files by removing AI writing patterns and adding human voice. Use when editing portfolio files, documentation, blog posts, or any markdown content to make it sound more natural and authentic. Detects and fixes: inflated importance language, promotional tone, superficial analysis, em dash overuse, rule of three patterns, AI vocabulary, negative parallelisms, excessive conjunctive phrases, bolded lists, and uniform sentence structure.
---

# Markdown Humanizer

Remove signs of AI-generated writing from markdown files to create authentic, human-sounding content.

## When to Use

- Portfolio markdown files that sound too polished or generic
- Technical documentation that feels robotic
- Blog posts or articles lacking personality
- README files with promotional language
- Any markdown content flagged as "AI-sounding"

## What Gets Fixed

This skill identifies and removes common AI writing patterns based on Wikipedia's comprehensive guide on AI writing detection.

### 1. Inflated Importance & Symbolism

**Problem**: AI exaggerates significance by connecting topics to broader themes using predictable phrases.

**Watch for**:
- stands/serves as a testament to
- is a vital/significant/crucial/pivotal/key role/moment
- underscores/highlights its importance/significance
- reflects broader trends/movements
- symbolizing its ongoing/enduring/lasting impact
- contributing to the evolution/advancement of
- setting the stage for
- marking/shaping the future
- represents/marks a shift/turning point
- evolving landscape
- focal point
- indelible mark
- deeply rooted in

**Before**:
```
This project stands as a testament to modern web development, marking a pivotal moment in my career. It represents a significant shift toward user-centric design, symbolizing the evolving landscape of frontend engineering.
```

**After**:
```
This project improved my understanding of modern web development and user-centric design.
```

### 2. Promotional & Admiring Language

**Problem**: AI writes with travel-brochure enthusiasm instead of neutral description.

**Watch for**:
- scenic views, breathtaking landscapes
- clean and modern, sleek design
- vibrant culture, rich heritage
- serves as a hub of activity
- dynamic, thriving, bustling
- testament to innovation
- cutting-edge, state-of-the-art
- seamless, intuitive experience

**Before**:
```
The application offers a seamless, intuitive, and powerful user experience—ensuring that users can accomplish their goals efficiently while enjoying a clean, modern interface.
```

**After**:
```
The application provides a straightforward interface for completing tasks.
```

### 3. Superficial "-ing" Analysis

**Problem**: AI adds empty analysis by tacking present participle phrases onto sentences.

**Watch for**:
- ...emphasizing the significance of
- ...reflecting the continued relevance of
- ...highlighting the importance of
- ...underscoring the need for
- ...showcasing the potential of
- ...demonstrating the value of

**Before**:
```
The framework uses TypeScript, emphasizing the significance of type safety in modern development and highlighting the importance of maintainable code.
```

**After**:
```
The framework uses TypeScript for type safety and maintainability.
```

### 4. Em Dash Overuse

**Problem**: AI uses em dashes (—) more than humans, mimicking punchy sales copy.

**Fix**: Replace most em dashes with commas, parentheses, colons, or periods. One em dash per paragraph maximum.

**Before**:
```
The system supports multiple formats—JSON, XML, and YAML—ensuring compatibility with various APIs—even legacy ones.
```

**After**:
```
The system supports multiple formats (JSON, XML, and YAML) and works with various APIs, including legacy ones.
```

### 5. Rule of Three

**Problem**: AI loves listing exactly three things with parallel structure.

**Watch for**:
- Three adjectives: "fast, efficient, and reliable"
- Three nouns in series
- Three clauses with same structure
- Three benefits/features/characteristics

**Fix**: Vary list length (2, 4, or 5 items), break parallel structure, or eliminate the list.

**Before**:
```
The platform is scalable, maintainable, and performant. It handles data processing, API management, and user authentication.
```

**After**:
```
The platform scales well and stays maintainable. It processes data, manages APIs, handles authentication, and includes monitoring.
```

### 6. AI Vocabulary & Clichés

**Problem**: Certain phrases are statistically overrepresented in AI writing.

**Common culprits**:
- It's important to note that
- It's worth noting that
- One of the most important/crucial/significant
- In today's digital landscape/world
- In an era where/of
- In the realm/world of
- Dive deep into
- Delve into
- Unlock the power/potential of
- At the end of the day
- Leverage (as a verb)
- Robust, comprehensive, holistic
- Game-changer, paradigm shift
- Best practices

**Before**:
```
It's important to note that in today's digital landscape, leveraging best practices is crucial to unlock the full potential of this robust framework. Let's dive deep into the comprehensive features.
```

**After**:
```
This framework includes several useful features worth understanding.
```

### 7. Negative Parallelism ("It's not X, it's Y")

**Problem**: AI creates dramatic contrast with this structure for emphasis.

**Before**:
```
This isn't just a library—it's a complete ecosystem. It's not about adding features; it's about solving problems.
```

**After**:
```
This library provides a complete ecosystem for problem-solving.
```

### 8. Excessive Conjunctive Adverbs

**Problem**: AI relies heavily on a small set of transitions.

**Watch for overuse**:
- Moreover, Furthermore, Additionally
- However, Nevertheless, Nonetheless
- Therefore, Thus, Consequently
- In addition, On the other hand
- In contrast, Similarly
- Notably, Significantly

**Fix**: Use these sparingly (one per every 3-4 paragraphs). Most sentences don't need explicit transitions.

**Before**:
```
The API is fast. Moreover, it's secure. Additionally, it scales well. Furthermore, it's easy to use. However, it requires authentication.
```

**After**:
```
The API is fast, secure, and scales well. It's easy to use but requires authentication.
```

### 9. Bolded List Titles

**Problem**: AI creates bulleted lists where each item starts with a bolded phrase followed by a colon, then repeats the same info.

**Before**:
```
- **Scalability**: The system is designed to scale easily across different use cases
- **Performance**: Built for high performance in production environments
- **Security**: Implements security best practices throughout
```

**After**:
```
The system scales easily, performs well in production, and follows security best practices.
```

Or keep the list but remove redundancy:
```
- Scales across different deployment sizes
- Handles high traffic without degradation
- Encrypts data in transit and at rest
```

### 10. Uniform Sentence Structure

**Problem**: AI writes sentences of similar length with predictable patterns.

**Fix**: Vary sentence length dramatically. Mix short punchy statements with longer explanatory ones.

**Before**:
```
The application processes user input efficiently. It validates the data thoroughly. It stores the results securely. It returns the response quickly.
```

**After**:
```
The application processes and validates user input, then stores results securely. Response times are fast.
```

## Adding Human Voice

Removing AI patterns isn't enough. Good writing needs personality.

### Have Opinions

Don't just report facts—react to them.

**Before**:
```
The framework uses dependency injection, which provides better testability and modularity.
```

**After**:
```
I initially resisted the framework's dependency injection approach. It felt like overkill for small projects. After using it for six months, I changed my mind—testing became so much easier that the extra setup was worth it.
```

### Add Specific Details

Replace generic statements with concrete examples.

**Before**:
```
This project taught me valuable lessons about debugging complex systems.
```

**After**:
```
Debugging this project meant tracking down a race condition that only appeared when three specific API calls happened within 50ms of each other. Took me four days.
```

### Use Messy Structure

Real thinking isn't linear. Show your thought process.

**Before**:
```
After evaluating several options, I selected React because of its component model and ecosystem.
```

**After**:
```
I tried Vue first—loved the simplicity. But the ecosystem wasn't quite there for what I needed. React felt more complicated at first, honestly overwhelming. The component model eventually clicked, though. Now I appreciate having so many libraries available.
```

### Vary Sentence Length

Short sentences hit hard. Longer sentences provide context, explanation, or build toward a point by layering clauses and ideas together. Mix them.

**Before**:
```
The project was challenging. It required learning new technologies. I improved my skills significantly. The final result exceeded expectations.
```

**After**:
```
This project kicked my ass. I had to learn GraphQL, TypeScript, and AWS Lambda simultaneously—not recommended. But it worked out. The final product handles 10k requests per second.
```

### Admit Uncertainty

Humans don't know everything and aren't afraid to say so.

**Before**:
```
This approach provides optimal performance for most use cases.
```

**After**:
```
This approach seems faster in my testing, though I haven't benchmarked it thoroughly. Might be placebo.
```

### Show Failed Attempts

Real projects involve mistakes.

**Before**:
```
I implemented caching to improve performance.
```

**After**:
```
First attempt: cached everything. Ran out of memory. Second attempt: cached too little, barely any improvement. Third time I got the balance right—cached the 20% of queries that made up 80% of traffic.
```

## Processing Workflow

When humanizing a markdown file:

1. **Read the entire file** to understand context and purpose
2. **Identify AI patterns** from the lists above
3. **Make targeted edits**:
   - Remove inflated importance phrases
   - Cut promotional language
   - Eliminate superficial analysis
   - Replace em dashes (use maximum one per paragraph)
   - Vary list lengths
   - Remove AI vocabulary
   - Simplify transitions
   - Convert bolded lists to prose or meaningful bullets
   - Vary sentence structure
4. **Add human elements**:
   - Include specific examples or details
   - Show opinions or reactions
   - Admit uncertainty where honest
   - Mention failures or iterations
   - Use contractions naturally
   - Let structure be a bit messy
5. **Preserve meaning**: Never change the factual content, just the presentation
6. **Maintain markdown formatting**: Keep all headers, code blocks, links, and structure intact

## Output Format

Return the humanized markdown file with all formatting preserved. Add a brief summary at the top noting:
- Number of AI patterns removed
- Major changes made
- Any sections that needed significant rewriting

## Example Transformation

**Input**:
```markdown
# My Portfolio Project

## Overview

This project stands as a testament to modern web development practices. It's not just an application—it's a comprehensive solution. Moreover, it demonstrates the evolving landscape of full-stack development.

The application leverages cutting-edge technologies:
- **React**: Provides a robust, scalable frontend framework
- **Node.js**: Enables efficient server-side processing  
- **PostgreSQL**: Ensures reliable data persistence

Furthermore, the system is designed to be scalable, maintainable, and performant—meeting the needs of today's demanding users.
```

**Output**:
```markdown
# My Portfolio Project

**Humanization Summary**: Removed 8 AI patterns including inflated importance phrases, promotional language, bolded list format, and rule of three. Added specific details and personal voice.

## Overview

I built this to solve a specific problem: managing user data across multiple services without writing the same integration code repeatedly.

The stack is React, Node.js, and PostgreSQL. I picked React because I already knew it (tried Vue for two days, went back). Node.js made sense for sharing validation logic between frontend and backend. PostgreSQL because the data is relational and I didn't want to fight against that.

Early versions had scaling issues—the database connection pool kept maxing out. Fixed it by adding connection management and caching the 15-20 queries that got hit constantly. Now it handles our traffic fine, though I haven't stress tested beyond 1000 concurrent users.
```

## Notes

- Not every instance of these patterns is wrong—context matters
- Technical documentation can be more formal than blog posts
- README files often need different treatment than personal narratives
- Preserve all technical accuracy and code examples
- When in doubt, err on the side of clarity over personality

## Testing Your Work

Ask yourself:
- Would a human actually write this sentence this way?
- Does this sound like something I'd say to a colleague?
- Are there specific details or just generic statements?
- Can I feel a person behind these words?
- Would I want to keep reading this?

If the answer to any of these is "no," keep editing.