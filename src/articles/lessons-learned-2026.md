---
title: "Lessons Learned in 2026"
date: "2026-02-15"
tags: ["Lessons Learned", "Software Engineering", "Mindset", "AI", "Career"]
excerpt: "A generalist's field notes from 2026. AI changed the game, execution still wins, and the engineers who connect dots nobody else sees are the ones getting ahead."
seo_title: "Lessons Learned in 2026: A Generalist Engineer's Field Notes"
meta_description: "Hard-won lessons from a senior engineer on AI, career growth, and the generalist advantage in 2026."
target_keywords: "software engineering lessons 2026, developer lessons learned, generalist engineer, AI coding tools, career growth software engineering"
---
Dear reader,

This is the 2026 edition. If you read last year's lessons, you know the format: weekly reflections from the intersection of engineering, leadership, and figuring it out as you go.

[2025's lessons](/articles/lessons-learned-2025) were about foundations — compounding, communication, writing things down, engineering your own luck. Those still hold. But this year hit different. AI went from "interesting tool" to "daily coworker." The job market got brutal. The old career playbooks started showing cracks.

These lessons come from what I actually did this year — building software, leading teams, running side projects. Some landed. Some didn't. All of them taught me something.

Let's get into it.

---

**1. "AI is a power tool, not a replacement."**

The discourse is exhausting. AI will take your job. AI won't take your job. Here's what actually happened in 2026:

- Engineers who use AI ship faster. Period.
- Engineers who *only* use AI ship garbage.
- The skill is knowing when to prompt and when to think.

**Translation:**
AI multiplies your existing ability. If you're a strong engineer, you become dangerous. If you're not, AI just helps you produce bad code faster.

But knowing when to use the tool is only half the equation. The other half is knowing what kind of engineer you are in the first place.

**2. "Generalists win when the rules change."**

Every time the industry shifts (cloud, mobile, AI) specialists scramble to stay relevant while generalists connect the dots.

- They see how AI fits into existing systems and bridge product, engineering, and business because they've sat in all three rooms.
- Adaptation is their default mode. They've been doing it their whole career.

Specialists get hired for what they know. Generalists get hired for what they can figure out. In 2026, "figure it out" is the most in-demand skill on the market.

But figuring it out only matters if someone knows you can.

**3. "Being qualified and being hireable are two different things."**

I interview candidates. A lot of them. I ask three things:

1. **System design.** I give them two endpoints I'm actually building at work. I want to see how they think — what questions they ask, whether they consider caching, scaling, observability, indexing, failure modes... The answer matters less than the approach.
2. **AI stance.** How are they using it today? Not "do you think AI is cool" but "show me how it fits into your workflow." What habits they've built around it. What guardrails they have in place. This separates people who've actually integrated it from people who've read about it.
3. **Depth check.** I pick something from their resume or website and ask them to go deep. Did they drive that project or were they along for the ride? You can tell in about 90 seconds.

Here's the problem: most engineers work on internal systems. There's no public proof of what they built. Their resume says "designed microservice architecture for payment processing" and so does everyone else's. I can't tell who actually made the decisions and who just attended the meetings.

That's exactly why I started this website. I wanted proof of work that exists outside a company's walls.

The candidates who stand out do the same thing. Or they have a network referral.

Your skills are the product. Your visibility is the distribution. You need both.

**4. "Multitasking is a cope."**

Context switching doesn't make you productive. It makes you feel productive. There's a difference.

I tested this on myself. For one day, I set an hourly timer and wrote down what I was working on. The pattern was obvious: meeting, come out, start one thing, meeting, come out, start a different thing. By end of day I'd touched six tasks and finished zero. I felt busy. I wasn't.

Two changes fixed it. First, I set up Outlook to auto-schedule two hours of focus time every day. It blocks my calendar so people can't drop meetings into that window. I can move it around if I need to, but it's there by default. Second, I stopped jumping between tasks. I pick one, get it to a state where I feel comfortable leaving it (which is typically a PR), then move to the next. I audited the tasks I was working on - if it's something I can delegate to someone I trust, I hand it off. If I don't know how to do it, I set it aside and find the right person instead of spinning on it.

**Translation:**
Deep work is the only work that compounds. Everything else is motion without progress.

**5. "Plan first, ship fast, iterate features."**

The engineers I learn the most from don't skip planning. They plan well, ship the first version fast, then iterate on features. The design doc comes first. The architecture review comes first. But neither takes three weeks.

This matters more now than it did two years ago. AI moved the bottleneck. Writing code is no longer the slow part. Thinking about what to build, how it fits together, what breaks at scale — that's where the time goes. The engineers who skip that step ship faster on day one and spend the next month cleaning up the mess.

Plan tight. Ship fast. Iterate on what users actually need, not what you guessed they'd want.

AI made code cheap. That makes the design doc more valuable, not less.

**6. "Your network is your safety net. Build it before you need it."**

Layoffs hit 500,000+ tech workers since 2023. The ones who landed quickly had one thing the others didn't: relationships.

- Referrals make up [7% of applications but 40% of hires](https://www.zippia.com/advice/employee-referral-statistics/). Cold applications convert at 1-2%.
- People hire people they've seen ship. A warm introduction beats a perfect resume every time.

Build relationships before you need them. Open source, blog posts, conferences, Slack communities. Show up so people know what you're capable of before you need them to.

**7. "Analyze what others do wrong."**

I've learned more from studying failures than success stories. Every engineer I respect does this.

Our most recent outage? JPA changes. Someone loaded entire joins across multiple tables, pulling way more data than needed. No lazy loading, no native queries. Just a full table scan hiding behind an ORM. That's not a hard problem to avoid — but only if you've seen it go wrong before.

We also get 4xx and 5xx errors from engineers who don't follow the API contract documented in Swagger or our wikis. Same pattern every time: someone builds to what they assume the interface does instead of reading the spec.

The deeper lesson I keep coming back to: clean your data before it enters the database. If you validate at ingestion, you need less explicit error handling and safeguards scattered across every downstream service. Most defensive code exists because someone upstream was sloppy.

**Translation:**
Critical thinking about failures is staff-level thinking. Anyone can copy a pattern that works. The edge comes from recognizing what doesn't.

**8. "Learn to drop your ego."**

You will ship bugs. You will be wrong in design reviews. You will propose an architecture that gets torn apart. That's the process.

Take code review feedback as signal, not attack. Say "I was wrong" out loud. It's free and it earns trust. The least defensive engineers I know are also the ones who grow the fastest.

Ego protects your feelings. Humility protects your growth.

**9. "Sprinters vs. grinders. Know your style."**

Some engineers thrive in bursts. Hack weeks, tight deadlines, sprint-to-finish energy. Others produce their best work through slow, steady, daily progress.

Neither is wrong. Both ship great software. The mistake is forcing one style when you're wired for the other.

I'm a grinder. Slow, steady, daily progress. I've tried sprinting (hack week energy, caffeine-fueled late nights) and the output never holds up. Knowing that saved me years of frustration pretending otherwise.

**Translation:**
Match your workflow to your wiring. Borrowed productivity systems break on contact with reality.

**10. "Focus is the only way to create meaningful work."**

Deep architecture design, production debugging, high-quality PRs. None of these happen in 30-minute increments between meetings.

AI tools actually make this harder. Waiting for code generation creates micro-pauses that invite Slack, email, social media. Every pause is a door out of flow state. I've started treating my IDE like a cockpit — notifications off, Slack closed, phone in another room. The difference in output quality is night and day.

Distraction is the tax on deep work. In 2026, the tax rate went up.

**11. "Invest in growth, not comfort."**

Six years ago, I transitioned into software engineering. I took a red-circle (a salary grade decrease for two years) to make it happen. I watched my peers earn more while I learned the fundamentals from scratch.

It took a while to catch back up. Longer than I expected. But the skill foundation I built during those two years is what everything else sits on — this website, the side projects, the ability to lead technical teams.

You can probably only afford to do this once in a career. That's why you have to be selective about when. Pick the right moment, take the hit, and build something that compounds for the next decade.

Here's the math: 1 hr/day of deliberate learning x 5 days/week x 50 weeks = 250 hours/year. That's 250 hours your peers aren't putting in. Over 3 years, you're playing a different game.

**Translation:**
Optimize for learning velocity in your 20s and 30s. The money follows. But be selective about when you take the hit — you only get one good window.

**12. "Put in the hours early. Then redirect them."**

I worked a lot more hours in my 20s than I do now. Long days, weekends, whatever it took to close the gap between where I was and where I wanted to be. I don't regret a single hour.

But here's what changed: the hours didn't go away. They shifted. I spend more time now on side projects, this blog, and building things outside my day job than I ever did in my 20s. The intensity is the same. The direction is different.

Early-career hours build your foundation. Mid-career hours build your optionality.

The work ethic doesn't expire. Where you point it does.

**13. "The best engineers think in systems, not features."**

Features are what you build. Systems are how everything connects.

We ran into this recently. We were designing a feature so consumers could query our results using existing identifiers. Simple enough. Except our data wasn't keyed the way our consumers expected. They had layman codes. We had internal IDs. To get our data, they'd need to make additional API calls just to translate their identifiers into ours.

Feature thinking says: build GET /domain/{id} and call it done. Systems thinking says: our consumers don't have our internal IDs, so that endpoint is useless to them. We had to design around what they actually had available, not what was convenient for our data model. It meant we couldn't follow typical REST conventions exactly, but we could still use proper identifiers that made sense on both sides.

The gap between mid-level and senior is almost entirely this shift. Before you write a line of code, ask:

- How does this change affect the rest of the codebase?
- What happens when this fails at scale?
- Who else depends on this, and do they know it's changing?

Feature thinking gets the ticket closed. Systems thinking prevents the next five tickets from being opened.

Systems thinking also means knowing *why* the system exists in the first place. Which brings up the hardest problem in engineering.

**14. "Document your decisions, not just your code."**

Code comments explain *what*. Decision logs explain *why*. The second one is 10x more valuable.

Most of our data lives in Postgres. That's the default. But we hit cases where we didn't need normalized data — we could store structured data for specific use cases and take advantage of something AWS already offered that would speed up development. The decision to use DynamoDB for those cases made sense at the time. But in an enterprise where team structures change frequently, the person who made that call might not be around in six months.

Write it down. There's a reason you chose Postgres for one thing and DynamoDB for another. Without documentation, someone inherits that codebase and starts asking "why do we do it this way?" — and now your team is re-investigating decisions that were already made.

This matters even more with AI tools. LLMs don't store context. If you want to use an AI assistant to move fast on an existing codebase, it needs documented decisions to load. Otherwise you're asking it to reason about code without knowing why the code exists.

The most expensive knowledge in any codebase is the context that only exists in someone's head.

**15. "Culture beats tooling. Every time."**

No AI tool, CI pipeline, or observability platform will save a team with bad culture.

- Blameless post-mortems and psychological safety matter more than any incident management software or code coverage metric.
- I've watched a team with mediocre tools outship a well-funded team with the best infrastructure money could buy. The difference was trust.

No tool will ever outperform a team that trusts each other.

**16. "Continuous learning isn't a buzzword. It's survival."**

The half-life of technical skills is getting shorter. What you learned two years ago is already outdated.

Most of my background is Java backend. I had some full-stack experience with JavaScript and Angular, but the community moved. So I taught myself React and Tailwind. Not because someone told me to — because the job market did.

Right now I'm consuming a lot of content around Claude and AI tooling because enterprise is slower to adopt these things and I don't want my skills to atrophy while I wait for my org to catch up. I'm building side projects, writing this blog, and learning things I never thought I'd need — email structure, sales practices, marketing fundamentals. In enterprise, other people do that for you. When you step outside your W-2, you realize you're starting from zero on skills that most solo builders take for granted.

There's a quote I like: legacy code is code without supporting tests. I think about that for careers too. If you're not testing yourself against new skills, not continuously improving, you're becoming legacy.

**Translation:**
The moment you stop learning, you start becoming legacy.

---

## The generalist's edge

If there's one thread through everything above, it's this: the world is getting more complex, not less. AI handles the routine. Specialists handle the deep. But someone still needs to see the whole board, connect the systems, and make sense of the chaos.

That's the generalist's job.

In a year where AI replaced the easy parts and the hard parts got harder, the people who looked across domains and found the pattern nobody else saw? They were the ones who mattered.
