import React from 'react';

/**
 * Services - Practitioner-style services page.
 *
 * No motion, no card grids, no "good fit / not fit" dual columns. Narrative
 * prose with a clear paid-intake block. Pure SSR — no client hydration needed.
 *
 * Previously a motion-heavy landing page with 3 service cards + 4-step process
 * + good-fit/not-fit grid + final CTA box. Collapsed to match the site's
 * practitioner-notes + CV positioning and the author's ~3-4 hrs/week capacity.
 */

const services = [
  {
    title: 'AI coding tool adoption',
    description:
      "Your team has Claude Code, Cursor, or Copilot licenses, but output quality varies wildly between developers, senior engineers are skeptical, and nobody can prove ROI. I help you standardize tool selection, build a rollout plan, and run a practitioner workshop against your actual codebase — for teams up to 20 engineers.",
  },
  {
    title: 'Convention files (CLAUDE.md, AGENTS.md)',
    description:
      "The reason your AI tools produce inconsistent output usually isn't the model — it's the context. Convention files are how you turn AI coding tools from novelty into compounding productivity. I audit your codebase and ship CLAUDE.md / AGENTS.md / tool-specific rules committed to your repo. Not generic templates.",
  },
  {
    title: 'Automation architecture',
    description:
      "Python, APIs, data pipelines, AWS Lambda, n8n. The same patterns that cut $5M in annual operational costs during my years at Ford Motor Company. Production-grade systems with error handling, logging, and monitoring — not prototypes, not 'we'll fix that later.'",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] pt-16 md:pt-24">
      <article className="container mx-auto px-4 md:px-8 max-w-3xl pb-24">

        {/* ── Heading + bio ── */}
        <header className="mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[var(--color-text-primary)] mb-6 leading-[1.2]">
            Services
          </h1>
          <p className="text-lg md:text-xl text-moonlight-text-secondary leading-relaxed mb-5">
            I take on a small amount of independent work each week.
          </p>
          <p className="text-base md:text-lg text-moonlight-text-muted leading-relaxed">
            If your team is drowning in manual work, unsure how to standardize AI coding tools, or shipping inconsistent output because nobody's written the convention files yet, this page is for you.
          </p>
        </header>

        {/* ── AI Readiness Assessment (soft launch) ── */}
        <section id="assessment" className="mb-16 border border-[var(--color-accent)] rounded-lg p-6 md:p-8 bg-[var(--color-accent)]/5">
          <div className="mb-4 inline-block px-3 py-1 text-xs font-semibold rounded bg-[var(--color-accent)] text-white">
            First 5 at $99 (normally $250)
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-4">
            AI Readiness Assessment
          </h2>
          <p className="text-base md:text-lg text-moonlight-text-secondary leading-relaxed mb-6">
            A 1-hour working call plus a 3-artifact deliverable bundle scoped to your team. Built for VP Eng, CTOs, and engineering leads trying to move past the "should we try this" phase and into measurable adoption.
          </p>
          <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">What you get:</p>
          <ul className="space-y-3 pl-5 list-disc marker:text-[var(--color-accent)] text-moonlight-text-secondary leading-relaxed mb-6">
            <li>
              <strong className="text-[var(--color-text-primary)]">Written action plan</strong> — your team's diagnosed readiness level and the 3-4 highest-ROI next steps, with effort and expected outcome per action.
            </li>
            <li>
              <strong className="text-[var(--color-text-primary)]">Custom AI Adoption Playbook</strong> — my public playbook adapted to your stack, scale, and level. Examples use your domain, not generic SaaS.
            </li>
            <li>
              <strong className="text-[var(--color-text-primary)]">Custom AGENTS.md</strong> — ready to commit to your main repo. Tailored to your codebase structure, conventions, and stack.
            </li>
          </ul>
          <p className="text-sm text-moonlight-text-muted mb-6">
            Running the first 5 at $99 to build out case studies. After that, $250. Rolls into the first invoice if we scope a larger project.
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openContactModal'))}
            className="inline-block px-6 py-3 text-sm font-semibold rounded-lg bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            Book an assessment →
          </button>
        </section>

        {/* ── What I work on ── */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-8">
            What I work on
          </h2>
          <div className="space-y-10">
            {services.map((service) => (
              <div key={service.title}>
                <h3 className="text-xl font-serif font-semibold text-[var(--color-text-primary)] mb-3">
                  {service.title}
                </h3>
                <p className="text-moonlight-text-secondary leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── The intake ── */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-8">
            How engagements start
          </h2>
          <div className="text-moonlight-text-secondary leading-relaxed space-y-4">
            <p>
              Every engagement begins with a{' '}
              <strong className="text-[var(--color-text-primary)]">paid intake: $500, about 45 minutes of live time</strong>. Here's what that looks like:
            </p>
            <ol className="space-y-3 pl-5 list-decimal marker:text-[var(--color-accent)] marker:font-semibold">
              <li>
                You send a short async brief (about ten minutes of your time) describing the problem, your stack, and what you've already tried.
              </li>
              <li>
                I read the brief ahead of the call. We spend ~45 minutes together on Zoom — direct, practitioner-to-practitioner, no discovery theater.
              </li>
              <li>
                Within 48 hours, you get a written action plan: what I'd do, in what order, with rough scope and pricing. Yours to keep whether or not we work together.
              </li>
              <li>
                If we scope a project, the $500 intake rolls into the first invoice.
              </li>
            </ol>
            <p className="pt-4 border-l-2 border-[var(--color-accent)] pl-4 italic">
              <strong className="text-[var(--color-accent)] not-italic">Guarantee:</strong>{' '}
              if the written action plan doesn't identify meaningful automation savings or a clear path forward, I refund the $500. I don't reshape the problem to fit a billable engagement.
            </p>
          </div>
        </section>

        {/* ── If we work together ── */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-8">
            If we work together
          </h2>
          <div className="text-moonlight-text-secondary leading-relaxed space-y-4">
            <p>
              Scoping is a short async exchange — deliverables, timeline, price. No multi-week discovery phase that costs more than the actual work.
            </p>
            <p>
              Build is async-first with weekly check-ins. Production-grade code with error handling, logging, and monitoring — the same bar I hold for my day job.
            </p>
            <p>
              Handoff includes documentation, runbooks, and 30 days of support for bugs or adjustments. After that, you can hire me for maintenance or take it in-house — I prefer when teams can own what I build.
            </p>
          </div>
        </section>

        {/* ── Not a fit ── */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-8">
            Not a fit
          </h2>
          <div className="text-moonlight-text-secondary leading-relaxed space-y-4">
            <p>
              I can't take work in investment management, wealth advisory, retirement solutions, ESG data, credit ratings, or compliance software for financial services — conflict with my current employer.
            </p>
            <p>
              I also don't work well with teams that want a six-month discovery phase before anyone touches code, need daytime or business-hours coverage (my weekdays belong to Morningstar), or expect me to compete in a formal RFP with a scoring rubric. None of those are bad things — they're just not how I can help.
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="intake">
          <div className="border-t border-[var(--color-border)] pt-12">
            <p className="text-lg text-moonlight-text-secondary leading-relaxed mb-8">
              If any of this sounds like your team, send a short note describing the problem. I read every submission and respond within 48 hours with either a scoping proposal or an honest "I'm not the right fit for this."
            </p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openContactModal'))}
              className="inline-block px-6 py-3 text-sm font-semibold rounded-lg bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              Start the conversation →
            </button>
          </div>
        </section>

      </article>
    </div>
  );
};

export default Services;
