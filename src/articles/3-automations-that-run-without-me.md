---
title: "3 Automations I Built That Run Without Me"
date: "2026-03-08"
tags: ["Automation", "Python", "PandaDoc", "GitHub Actions", "ClickUp"]
excerpt: "Three real automations I use daily: PandaDoc proposals, a GitHub Actions trend scanner, and automated onboarding. Exact tools and code."
image: "/images/articles/3-automations-that-run-without-me.png"
image_alt: "Three autonomous automation loops running without manual intervention."
seo_title: "3 Automations I Built That Run Without Me"
meta_description: "Three real automations I use daily: PandaDoc proposals, a GitHub Actions trend scanner, and automated onboarding. Tools, code, and results."
target_keywords: "automation examples small business, PandaDoc API automation, GitHub Actions automation, ClickUp CRM automation, real automation examples"
---

# 3 Automations I Built That Run Without Me

The best automation is the one you forget exists.

These are three systems I actually run. Each one replaced something I was doing by hand, and each one still runs today.

## 1. Automated PDF Proposals with PandaDoc

Every proposal I sent used to start with the same Word doc. I'd open the template, swap out the client name, rewrite the problem statements, adjust the solutions section, fix the formatting that broke somewhere in the middle, export to PDF, and send it. This took 30-60 minutes per proposal, and every one looked slightly different because I was editing a living document instead of generating from a clean source.

The structure never actually changed. Three to four problems the client faces, solutions I'm proposing, their company on the cover. The strategic thinking was the valuable part. The formatting and copy-pasting wasn't.

So I moved it to a Python script that generates proposals through PandaDoc's API. One command:

```
python create_pandadoc_proposal.py --input .tmp/proposal_input.json
```

The input is a JSON file with the client's info and the proposal content:

```json
{
  "client": {
    "first_name": "Sarah",
    "last_name": "Chen",
    "email": "sarah@acmecorp.com",
    "company": "Acme Corp"
  },
  "problems": [
    {
      "title": "Manual client reporting",
      "description": "8 hours/week pulling data from 4 platforms",
      "impact": "Team capacity locked up on non-billable work"
    }
  ],
  "solutions": [
    {
      "title": "Automated reporting pipeline",
      "description": "Scheduled data pulls with templated output",
      "outcome": "Reporting drops from 8 hours to 30 minutes/week"
    }
  ]
}
```

The script validates input (problems, solutions, email), maps everything to PandaDoc merge fields, creates the document from a pre-designed template, waits for it to render, and sends it directly to the client's email. They get a professionally designed PDF with a cover page, problem/impact section, and solution/outcome section.

Template design, layout, and static content (about section, terms, branding) all live in PandaDoc. The code only touches variable content.

**The tools:**

- Python (`create_pandadoc_proposal.py` + `pandadoc_client.py` API wrapper)
- PandaDoc API (template, merge fields, email delivery)
- JSON input (assembled manually or by an AI agent)

**Before:** 30-60 minutes per proposal. Inconsistent formatting. I once sent a proposal with the previous client's name still in the header.

**After:** 5-10 minutes. Most of that is thinking through the problems and solutions. Generation and delivery take about 60 seconds. Every proposal looks identical in quality.

At 6 proposals a month, 30 minutes saved each, that's 3 hours back. But the bigger win is speed. Proposals go out the same day the conversation happens instead of two days later when I sit down to "do the proposal." One click.

---

## 2. Daily Tech Trend Scanner via GitHub Action

I used to spend 30 minutes every morning scanning Hacker News, Reddit, and GitHub Trending. Some mornings I'd skip it. Then I'd miss a trend for a week and watch others publish about it first.

The inconsistency was a problem. I needed something that ran whether I remembered to or not.

I built a GitHub Actions pipeline that runs every day at 5am EST. It pulls from three sources, clusters topics using AI, scores them for evergreen content potential, and emails me the top 5 before I pour coffee.

**The sources:**

1. **Hacker News.** Top 50 stories via Firebase API. Title, URL, score, comment count, front page status. No auth required.

2. **Reddit.** Hot posts from `r/programming`, `r/webdev`, `r/devops`, `r/ExperiencedDevs`. 25 posts per sub via public JSON endpoints. Score, upvote ratio, comments, subreddit. Rate-limited to stay under unauthenticated caps.

3. **GitHub Trending.** Daily trending repos scraped from `github.com/trending` with BeautifulSoup. Repo name, description, language, total stars, stars today.

**The scoring:**

All fetched data feeds into a Claude Sonnet 4.5 call that clusters overlapping topics and scores each 1-10 for evergreen content potential.

Scoring criteria:

- **7-10 (Evergreen).** Architectural patterns, tools gaining real adoption, recurring developer problems, system design, career growth.
- **4-6 (Medium).** Interesting but niche. New tools that may not stick. Specific tutorials.
- **1-3 (Low).** Version-specific features. Bug fixes. Already well-covered topics.
- **0 (Excluded).** Funding news. Drama. Hot takes. Company-specific news.

Only topics scoring 5+ make the cut. Each gets a score, target audience, suggested writing angle, recommended word count, and raw engagement signals from each source.

**The daily email:**

HTML digest in my inbox every morning. Each topic gets a color-coded card: green for 8+, blue for 6-7, yellow for under 6.

The whole pipeline runs in 2-3 minutes. Costs about $0.10-0.20 per run in API fees. That's $3-6 a month.

**The tools:**

- GitHub Actions (cron scheduling, free compute, version controlled)
- Python: `fetch_hackernews.py`, `fetch_reddit_trending.py`, `fetch_github_trending.py`, `analyze_topics.py`, `send_topic_digest.py`
- Anthropic API (Claude Sonnet 4.5 for clustering and scoring)
- SMTP for email delivery

**Before:** 20-30 minutes of manual scanning I'd skip half the time. Missed trends.

**After:** A scored, filtered digest at 5am. I spend 2 minutes scanning it over coffee. Topics I would've missed get flagged before they're saturated.

The unexpected win was the evergreen filter. When a topic scores a 3 because it's time-sensitive drama, I don't waste a morning on it (I actually just don't even see those anymore). The system makes that editorial decision for me.

---

## 3. Client Onboarding: Email + ClickUp Task

New client signs on. Two things need to happen: a welcome email with next steps and a calendar link, and a ClickUp task so the engagement doesn't vanish.

Before this, I wrote each welcome email from scratch. Sometimes the tone was off. Sometimes I forgot the calendar link. Sometimes I'd send it an hour after signing. Sometimes a full day passed. For someone selling automation services, that gap between what I sold and how I operated was becoming noticeable.

One command fixed it:

```
python onboard_client.py --email sarah@acme.com --name "Sarah Chen" --company "Acme Corp"
```

**Step 1: Welcome email.** `send_email.py` sends a personalized onboarding email via SMTP (or SendGrid). Template with the client's first name, company background, clear next steps, and a calendar link for kickoff.

The email:

> Hi Sarah,
>
> Great to have you on board.
>
> [Company background]
>
> Here's what happens next:
> - We'll do a kickoff call to lock down goals and scope
> - You'll get introduced to the project team
> - We'll build out the project plan together
> - You'll get daily updates until the project is done
>
> Schedule your kickoff call here: [Calendar Link]

**Step 2: ClickUp task.** `create_clickup_task.py` creates a task in a designated list: "Onboard: Sarah Chen (Acme Corp)" with email, name, and status note: "Email sent, awaiting kickoff call." Auto-assigns if a default assignee is configured.

Both steps log to timestamped files. Full traceability.

Under 10 seconds end to end. Can also trigger through GitHub Actions for remote execution.

**The tools:**

- Python: `onboard_client.py` (orchestrator), `send_email.py` (SMTP/SendGrid), `create_clickup_task.py` (ClickUp API)
- ClickUp API for task creation
- SMTP or SendGrid for email
- Environment variables for all config

**Before:** 10-15 minutes per new client. Inconsistent emails. Forgot the calendar link sometimes. No tracking system.

**After:** One command. Under 10 seconds. Every client gets the same professional welcome. Every engagement gets a ClickUp task. Nothing falls through.

---

## The Pattern Behind All Three

**They replaced something I was already doing by hand.** I didn't automate a hypothetical workflow. I automated the thing that was annoying me or the thing I kept doing inconsistently. If you're not already doing it manually, you probably don't understand it well enough to automate it.

**They're simple enough to debug in minutes.** None of these are 30-step workflows. PandaDoc script: one API call with validation. Trend scanner: fetch, analyze, email. Onboarding: email, task. When something breaks, I can find the problem fast.

**They don't need me to remember they exist.** The trend scanner fires every morning whether I'm awake or not. The proposal generator runs in 60 seconds instead of asking me to open Word. The onboarding script means I never draft a welcome email again. If you have to remember to trigger it, it's a tool. If it runs without you, it's a system.

I didn't use Zapier, Make, or n8n for any of these. Python scripts, APIs, and GitHub Actions. For simple, well-defined workflows, you don't need a platform. You only need a script and a cron job.

That's not always the right call. Platforms win for non-technical users and complex multi-tool orchestration (I wrote about that in [The No-Code Automation Stack for Non-Technical Founders](/articles/no-code-automation-stack)). But for my use cases, the simplicity of "run this script" won every time.

## You Don't Need Python for Any of This

Each of these could be rebuilt in Make.com or Zapier in a few hours. PandaDoc has native Zapier integrations. ClickUp connects to everything. The trend scanner is the most custom piece, but an RSS-to-email tool with good filters gets you 80% there. (If you're curious about the no-code route, I broke down [the full stack here](/articles/no-code-automation-stack).)

Pick the one that annoys you the most. Build the ugliest version that works. Let it run for a month.

If you'd rather have someone build it, that's what I do. [Get in touch →](https://collinwilkins.com/?modal=contact)
