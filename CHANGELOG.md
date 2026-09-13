# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
