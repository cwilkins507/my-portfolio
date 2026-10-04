# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2026-10-04] - Coding Wars 3.0 cover

### Changed
- Coding Wars 3.0 hero now uses a generated cover (`scripts/generate-article-covers.js`, accent `#fb923c`) plotting the seven models by end-to-end speed and estimated cost, replacing the Theo screenshot that also appeared inline. Sources heading renamed to "Sources Checked" to match Coding Wars 2.0.
- Coding Wars 3.0 verdict: added an output tok/s column; routine-work default moved from GPT-6.1 Sol to Opus 5.5 (fastest at near-equal quality), with GPT-6.1 Sol kept for batch and cost-sensitive work.

## [2026-10-03] - Small styling refresh and looser newsletter cadence

### Changed
- Pill shapes replaced by 3px corners (`--radius` in `src/index.css`) on buttons, inputs, tags, and archive filters.
- Homepage restructured newsletter-first (after justinwelsh.me / thedankoe.com): signup hero with "Latest letter" → AI Prompt Toolkit → "Start here" (agent-harness explainer leads; most-read rows from Plausible below, set in `MOST_READ_SLUGS`) → Recent (compact dated rows; Company Brain series collapsed to one row) → By topic → Projects → "Hey, I'm Collin." with portrait → closing signup beside the three most recent letters.
- Newsletter issues are read from the Buttondown RSS feed at build time (`src/utils/newsletterIssues.js`); the letter rows render nothing if the feed is unreachable.
- Homepage polish from an Impeccable critique: hero copy now leads with AI-assisted engineering; category/project labels moved off gold to 11px faint ink; inline links meet 44px; `scroll-padding-top` keeps jump targets clear of the sticky header; FiNimbus labelled "Personal project".
- Homepage layout unified on one left rail (`--rail` in `src/index.css`): hero, section headings, Most read (now dated), Recent, By topic and Projects (now rows, not card grids), About, and the closing letters all share the same label column and content edge. Primary button hover now inverts to ink/paper (the old gold-on-gold hover failed contrast).
- Newsletter forms now show a status note on submit ("One more step: finish the check in the Buttondown window…", shared listener in `Layout.astro`). Homepage email inputs got a visible border and placeholder that pass contrast.
- Homepage heading hierarchy: the explainer title now matches the toolkit headline and sits below its "Start here" heading instead of outsizing it; row titles 19px; descriptions 17px. Toolkit band labelled "Free resource". Fixed the closing signup collapsing into a narrow column on phones; the submit note now says to finish Buttondown's check first.
- Newsletter cadence changed from "every other Tuesday" to "when there is something worth sending" across site data, `llms.txt`, and inline copy.
- Article titles and excerpts: removed AI-pattern phrasing ("Definitive", "…and Beyond", "for Builders and Leaders", filler "actually", "Here's…" excerpt openers) across 20 articles. Slugs unchanged; matching `seo_title`, `llms.txt`, and in-article link labels updated where they repeated the old wording.
- Removed filler "actually" from all site copy outside article bodies (pages, guides, resources, components, site data) and from the remaining article title ("What Automation Costs (and Saves) a Small Business"). "32 AI Prompts I Actually Use" is now "32 AI Prompts I Use".

## [2026-09-12] - Repositioning: personal publication

This entry supersedes every consulting-related item below it. Offers, prices, pilots,
assessments, booking links, and employer references described in earlier entries are
historical record only. They are not current product truth and must not be restored
from this file.

### Removed
- Consulting funnel in full: the service paths, all pricing, the scope-acceptance and intake flows, the capability-brief export, and every booking or intro-call CTA.
- Routes and components that existed only to serve that funnel, including the pilot intake form, the assessment and delivery-kit pages, and their downloadable PDFs. Old paths now redirect to surviving pages.
- Employer identification across the repository: employer names in copy, metadata, and `public/llms.txt`, employer logos under `public/images/logos/`, and the résumé redirect in `public/_redirects`.

### Changed
- The site is an editorial and newsletter hub. The writing is the product, and the newsletter is the only conversion goal.
- `/services` is a quiet reference page with no offer. Every availability statement is gated by `ADVISORY.accepting` in `src/data/site.js`, which is `false`.
- Prior engineering accomplishments appear only as explicitly-earlier, unattributed work in past tense, with no company name attached to a metric.
- `AGENTS.md` rewritten to match the publication framing. Local working notes (`docs/`, `Session Recaps/`, `artifacts/`) are untracked and stay on disk only.

## [Unreleased]

> Historical. The items below predate the 2026-09 repositioning and describe state
> that no longer ships. Read them as a record of what was tried, not as commitments.

### Changed
- Reframed consulting services around bounded, human-controlled AI systems while preserving two distinct entry points. (Superseded 2026-09: consulting services were removed entirely.)
- Presented a $1,500 AI-Assisted Delivery Pilot for engineering leaders alongside a $99 AI Workflow Opportunity Assessment for owners, with separate scope-review and booking paths. (Superseded 2026-09: both offers, their prices, and their booking paths were removed. These are not current prices and nothing on the site is for sale.)
- Added above-the-fold, audience-specific starting actions for engineering leaders and small-team owners, with distinct routes and analytics locations. (Superseded 2026-09: those routes and analytics locations were deleted.)
- Added a noindex five-layout homepage reduction study with Editorial Gold, Rosé Pine Dawn, Rosé Pine, Rosé Pine Moon, and Everforest palettes. (Superseded 2026-09: the studies and the pilot and referral content they carried were removed.)
- Prepared “Stop Calling AI Subscriptions Subsidized” with source-backed revisions, a new editorial cover, and four polished evidence images.

## [1.0.0] - 2026-01-20

### 🎉 Stable Release

This marks the first stable release of the portfolio with production-ready features, comprehensive content, and excellent SEO performance.

### ✨ Features

#### SEO & Performance
- **Lighthouse SEO Score: 91/100** - Production-grade search engine optimization
- Complete meta tags implementation across all pages (title, description, Open Graph, Twitter Cards)
- JSON-LD structured data for enhanced search results (WebSite, Person, Article schemas)
- Automatic sitemap generation with Astro integration
- Canonical URLs configured on all pages
- Google Site Verification implemented
- Robots.txt properly configured

#### Contact & Engagement
- **Web3Forms Integration** - Functional contact form with email delivery
- Accessible modal implementation with keyboard navigation and focus management
- Service-specific contact flows with pre-selection capability
- Mobile-responsive design (slide-in modal on mobile devices)
- Three contact service options: AI & Automation, Python Scripting, AWS Serverless
- Loading states and error handling for improved UX

#### Services Showcase (removed 2026-09)
- **Three Core Service Offerings** documented at the time, none of which are offered now:
  1. **AI & Automation Consulting** - Bot frameworks, workflow automation, LLM integration
  2. **Python Scripting & API Integration** - Custom scripts, API development, data processing
  3. **AWS & Serverless Architecture** - Lambda functions, API Gateway, cost optimization
- Detailed deliverables and use cases for each service
- Direct CTAs linking to pre-filled contact form
- LinkedIn and Upwork integration for additional contact options

#### Content Library
- **18 Published Technical Articles** covering:
  - AI & Automation (6 articles) - MCP, AI-Assisted Coding, CLI Agents, Prompt Engineering, Structured Output
  - Architecture & System Design (5 articles) - Architecture as Code, System Design Best Practices, Microservice Redesign, Lessons Learned
  - Cloud & Infrastructure (3 articles) - AWS Lambda Practices, Terraform, BGP
  - Development Tools (4 articles) - No-Code/n8n, CRM No-Code, SQL Optimization, JPA
- Recent content updates with 6 new articles in January 2026
- Consistent markdown formatting with metadata (title, date, tags, excerpt)
- Dynamic article routing with slug-based pages

### 🏗️ Technical Stack
- **Astro** - Modern static site generator
- **React** - Component library for interactive elements
- **Tailwind CSS** - Utility-first styling framework
- **Web3Forms** - Contact form backend
- **PostCSS** - CSS processing
- **ESLint** - Code quality enforcement

### 📊 Performance Metrics
- SEO: 91/100 (Lighthouse)
- Mobile-responsive across all pages
- Fast static site generation
- Optimized asset delivery

### 🔗 Live URLs
- Production: https://collinwilkins.com
- Repository: https://github.com/collinwilkins/my-portfolio

---

## Release Notes Format

For future releases, changes will be categorized as:
- **Added** - New features
- **Changed** - Changes to existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security improvements

Versions will follow semantic versioning (MAJOR.MINOR.PATCH).
