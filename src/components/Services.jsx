import React from 'react';
import { ArrowRight } from 'lucide-react';

const problemCategories = [
  {
    title: 'AI coding tools are installed but inconsistent',
    description:
      "Your team has Claude Code, Cursor, or Copilot licenses, but output quality varies wildly between developers, senior engineers are skeptical, and nobody can prove ROI. I help you standardize tool selection, build a rollout plan, and run a practitioner workshop against your actual codebase.",
    signal: 'Convention files, rollout plans, practitioner workshops',
  },
  {
    title: 'Manual work that should have died years ago',
    description:
      "If a team is still clicking through Postman, copying CSVs, or babysitting runs by hand, there's probably a better system hiding in there. Python, APIs, Lambda, queues, n8n when it fits. Production-grade systems with error handling, logging, and monitoring.",
    signal: 'Python, APIs, Lambda, queues, event-driven systems',
  },
  {
    title: 'A system decision everyone keeps politely avoiding',
    description:
      "Some problems don't need a giant platform. They need someone to map the workflow, find the expensive part, build the right slice, and leave the decision trail somewhere better than Slack. Architecture plus implementation, not just a deck.",
    signal: 'Architecture, implementation, decision support',
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] pt-16 md:pt-24">
      <article className="container mx-auto px-4 md:px-8 max-w-3xl pb-24">

        <header className="grid grid-cols-[1px_minmax(0,1fr)] gap-5 border-b border-[var(--color-border)] pb-14 mb-16 md:gap-8 md:pb-20">
          <div
            className="w-px self-stretch bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent-border)] to-transparent"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="mb-5 font-mono text-xs uppercase text-[var(--color-accent)]">
              Services
            </p>
            <h1 className="max-w-3xl font-serif text-3xl font-bold leading-[1.1] text-[var(--color-text-primary)] md:text-4xl lg:text-5xl">
              I take on a small amount of independent work each week.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
              If your team is drowning in manual work, unsure how to standardize AI coding tools, or shipping inconsistent output because nobody's written the convention files yet, this is the right page.
            </p>
          </div>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-10">
            Problems I work on
          </h2>
          <div className="space-y-6">
            {problemCategories.map((category, index) => (
              <div
                key={category.title}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-glass)] p-6 md:p-7 backdrop-blur transition-all duration-300 hover:border-[var(--color-accent-border)] hover:bg-[var(--color-surface-hover)]"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="inline-flex rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)] flex-shrink-0 mt-1">
                    0{index + 1}
                  </span>
                  <h3 className="font-serif text-xl font-bold leading-tight text-[var(--color-text-primary)] md:text-2xl">
                    {category.title}
                  </h3>
                </div>
                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 ml-[52px]">
                  {category.description}
                </p>
                <p className="font-mono text-xs uppercase leading-relaxed text-[var(--color-text-muted)] ml-[52px]">
                  {category.signal}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-8">
            How engagements work
          </h2>
          <div className="text-[var(--color-text-secondary)] leading-relaxed space-y-4">
            <p>
              Every engagement starts with a short async brief describing the problem, your stack, and what you've already tried. I read it ahead of a 45-minute call, and within 48 hours you get a written action plan: what I'd do, in what order, with rough scope. Yours to keep whether or not we work together.
            </p>
            <p>
              Build is async-first with weekly check-ins. Production-grade code with error handling, logging, and monitoring. Handoff includes documentation, runbooks, and 30 days of support.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-8">
            Not a fit
          </h2>
          <div className="text-[var(--color-text-secondary)] leading-relaxed space-y-4">
            <p>
              I can't take work in investment management, wealth advisory, retirement solutions, ESG data, credit ratings, or compliance software for financial services. Conflict with my current employer.
            </p>
            <p>
              I also don't work well with teams that want a six-month discovery phase before anyone touches code, need daytime or business-hours coverage, or expect me to compete in a formal RFP with a scoring rubric.
            </p>
          </div>
        </section>

        <section id="intake">
          <div className="border-t border-[var(--color-border)] pt-12">
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
              If any of this sounds like your team, send a short note describing the problem. I read every submission and respond within 48 hours with either a scoping proposal or an honest "I'm not the right fit for this."
            </p>
            <a
              href="/services?modal=contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              Start the conversation
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

      </article>
    </div>
  );
};

export default Services;
