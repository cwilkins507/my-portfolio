import React from 'react';
import ServiceCards from './ServiceCards';
import ServicesFAQ from './ServicesFAQ';

const cardSets = {
  deliverable: {
    heading: 'What I deliver',
    subhead:
      'Three bounded engagement types. Each ships with concrete artifacts that live in your repo and outlast my involvement.',
    cards: [
      {
        tag: 'Diagnostic',
        title: 'AI Readiness Audit',
        description:
          '1-hour working call plus a 3-artifact bundle within 48 hours: written action plan, custom AI Adoption Playbook, and a ready-to-commit AGENTS.md tailored to your codebase.',
        meta: '$99 (first 5) · $250 after',
      },
      {
        tag: 'Build',
        title: 'Convention File Architecture',
        description:
          'CLAUDE.md, AGENTS.md, and tool-specific rules built against your actual codebase — committed to your repo, paired with one of your engineers so the team owns the result.',
        meta: 'Scoped after intake',
      },
      {
        tag: 'Build',
        title: 'Automation Architecture',
        description:
          'Python, AWS Lambda, n8n, and the integrations between them. Production-grade systems with error handling, logging, monitoring, and runbooks. The same patterns that cut $5M at Ford.',
        meta: 'Scoped after intake',
      },
    ],
  },
  engagement: {
    heading: 'How we can work together',
    subhead:
      'Three engagement shapes. Pick the one that matches where you are — diagnose, build, or stay sharp over time.',
    cards: [
      {
        tag: '1–2 weeks',
        title: 'Audit',
        description:
          'Fixed-scope diagnostic. Working call plus a 3-artifact deliverable bundle within 48 hours: written action plan, custom AI Adoption Playbook, and AGENTS.md committed to your repo.',
        meta: '$99–$250 fixed',
      },
      {
        tag: '4–6 weeks',
        title: 'Project',
        description:
          'Scoped build with weekly check-ins. Convention files, automation systems, or a focused AI tooling rollout for an engineering team up to 20. Async-first; production-grade handoff with 30 days of support.',
        meta: 'Scoped after intake',
      },
      {
        tag: 'Ongoing',
        title: 'Advisory',
        description:
          'Async retainer plus a weekly office hour. Best for engineering leaders who want a practitioner on call for tooling decisions, code review on convention files, or unblocking team rollouts.',
        meta: 'Monthly retainer',
      },
    ],
  },
};

const ServicesPreview = ({ variant = 'deliverable' }) => {
  const cardConfig = cardSets[variant] ?? cardSets.deliverable;
  const previewPath = `/preview/services-${variant === 'engagement' ? 'engagement' : 'deliverable'}`;

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

        {/* ── NEW: Service cards (variant-driven) ── */}
        <ServiceCards
          heading={cardConfig.heading}
          subhead={cardConfig.subhead}
          cards={cardConfig.cards}
        />

        {/* ── AI Readiness Assessment (existing soft launch block) ── */}
        <section
          id="assessment"
          className="mb-16 border border-[var(--color-accent)] rounded-lg p-6 md:p-8 bg-[var(--color-accent-muted)]"
        >
          <div className="mb-4 inline-block px-3 py-1 text-xs font-semibold rounded bg-[var(--color-accent)] text-white">
            First 5 at $99 (normally $250)
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-4">
            AI Readiness Assessment
          </h2>
          <p className="text-base md:text-lg text-moonlight-text-secondary leading-relaxed mb-6">
            A 1-hour working call plus a 3-artifact deliverable bundle — written action plan, adapted playbook, and custom AGENTS.md committed to your repo.
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
          <a
            href={`${previewPath}?modal=contact&service=ai-strategy`}
            className="inline-block px-6 py-3 text-sm font-semibold rounded-lg bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            Book an assessment →
          </a>
        </section>

        {/* ── The intake (PROSE — numbered intake intentionally NOT used per Q4) ── */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-8">
            How engagements start
          </h2>
          <div className="text-moonlight-text-secondary leading-relaxed space-y-4">
            <p>
              Every engagement begins with a{' '}
              <strong className="text-[var(--color-text-primary)]">paid intake: $500, about 45 minutes of live time</strong>. You send a short async brief beforehand. I read it ahead of the call. We spend the time direct, practitioner-to-practitioner — no discovery theater. Within 48 hours, you get a written action plan: what I'd do, in what order, with rough scope and pricing. Yours to keep whether or not we work together. If we scope a project, the $500 rolls into the first invoice.
            </p>
            <p className="pt-4 border-l-2 border-[var(--color-accent)] pl-4 italic">
              <strong className="text-[var(--color-accent)] not-italic">Guarantee:</strong>{' '}
              if the written action plan doesn't identify meaningful automation savings or a clear path forward, I refund the $500. I don't reshape the problem to fit a billable engagement.
            </p>
          </div>
        </section>

        {/* ── If we work together (existing) ── */}
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

        {/* ── NEW: FAQ ── */}
        <ServicesFAQ />

        {/* ── Not a fit (existing) ── */}
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

        {/* ── CTA (existing) ── */}
        <section id="intake">
          <div className="border-t border-[var(--color-border)] pt-12">
            <p className="text-lg text-moonlight-text-secondary leading-relaxed mb-8">
              If any of this sounds like your team, send a short note describing the problem. I read every submission and respond within 48 hours with either a scoping proposal or an honest "I'm not the right fit for this."
            </p>
            <a
              href={`${previewPath}?modal=contact`}
              className="inline-block px-6 py-3 text-sm font-semibold rounded-lg bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              Start the conversation →
            </a>
          </div>
        </section>

      </article>
    </div>
  );
};

export default ServicesPreview;
