import React from 'react';

const defaultFaqs = [
  {
    q: 'How long does a typical engagement run?',
    a: 'Most projects land between two and six weeks of calendar time, working at three to four hours per week on my side. Audits are fixed-scope; builds are scoped after the paid intake call.',
  },
  {
    q: 'Do you work alongside our existing engineering team or independently?',
    a: 'Both, depending on the engagement. Convention file work usually means pairing with one or two engineers on your side so you own the result. Automation builds tend to be async with weekly check-ins. I do not work in isolation from your team — that is how knowledge gets stranded.',
  },
  {
    q: 'Who owns the artifacts (code, CLAUDE.md / AGENTS.md, runbooks)?',
    a: 'You do, fully. Everything I deliver lives in your repo, under your license, with no dependency on any service or tool I run. I want you to be able to take it in-house the day I stop sending invoices.',
  },
  {
    q: 'Can you sign an NDA or work under our security review?',
    a: 'Yes to a standard mutual NDA. I cannot fill out lengthy vendor security questionnaires or go through formal procurement — that is not how a 3–4 hour-per-week practice can work. If your company requires either, this is probably not a fit.',
  },
  {
    q: 'What does the $99 readiness assessment actually produce?',
    a: 'A 1-hour working call plus three artifacts within 48 hours: a written action plan with your team\'s diagnosed readiness level, a custom AI Adoption Playbook adapted to your stack, and a ready-to-commit AGENTS.md tailored to your codebase. Running the first 5 at $99 to build case studies; $250 after that. Rolls into the first invoice if we scope a larger project.',
  },
  {
    q: 'Why a paid intake instead of a free discovery call?',
    a: 'Two reasons. First, a $500 paid intake filters for teams that have an actual budget and decision authority — both sides save weeks. Second, you get a written action plan within 48 hours that is yours to keep, whether or not we work together. If the plan doesn\'t identify meaningful opportunity, I refund the fee.',
  },
];

const ServicesFAQ = ({ faqs = defaultFaqs, heading = 'Common questions' }) => {
  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-8">
        {heading}
      </h2>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.q}
            className="group border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] hover:border-[var(--color-border-hover)] transition-colors"
          >
            <summary className="cursor-pointer list-none px-5 py-4 flex items-start justify-between gap-4">
              <span className="text-base font-serif font-semibold text-[var(--color-text-primary)] leading-snug">
                {faq.q}
              </span>
              <span
                className="text-[var(--color-accent)] text-xl leading-none flex-none mt-0.5 transition-transform group-open:rotate-45"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <div className="px-5 pb-5 -mt-1">
              <p className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed">
                {faq.a}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

export default ServicesFAQ;
