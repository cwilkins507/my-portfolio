import React from 'react';
import { ArrowRight, Download, ExternalLink } from 'lucide-react';

const proofPoints = [
  {
    metric: '$5M',
    label: 'annual savings',
    detail: 'Remote vehicle audit automation replaced physical inventory checks with telemetry-driven verification.',
  },
  {
    metric: '450k',
    label: 'vehicles',
    detail: 'Remote inventory workflows handled dealership audit coverage at production scale.',
  },
  {
    metric: '600k+',
    label: 'daily events',
    detail: 'Kafka and cloud event pipelines processed vehicle telemetry across connected systems.',
  },
  {
    metric: '12 yrs',
    label: 'business + engineering',
    detail: 'Finance, sales, enterprise engineering, cloud architecture, and automation delivery.',
  },
];

const focusAreas = [
  {
    title: 'AI coding tool adoption',
    description:
      'Helping engineering teams move from scattered individual usage to shared conventions, rollout plans, and measurement. Claude Code, Cursor, Copilot, Codex: the tool matters less than the operating layer around it.',
  },
  {
    title: 'Convention files',
    description:
      'Writing and maintaining CLAUDE.md, AGENTS.md, and tool-specific rules that give AI agents the context they need before they touch a repo.',
  },
  {
    title: 'Automation architecture',
    description:
      'Designing Python, API, AWS Lambda, n8n, and data workflows with boring production details included: errors, logs, ownership, monitoring, and handoff.',
  },
];

const principles = [
  {
    title: 'Production over demos',
    description:
      'A working demo is the beginning of the work, not the end. The valuable part is what happens when the system runs without you.',
  },
  {
    title: 'Context over hype',
    description:
      'Better models help. Better context compounds. A repo with real conventions beats a prompt pasted into a blank chat.',
  },
  {
    title: 'Measurement over theater',
    description:
      "If nobody can say what changed after the rollout, the project was mostly vibes with a procurement trail.",
  },
];

const background = [
  {
    company: 'Morningstar',
    role: 'Lead Software Engineer',
    description:
      'Cloud-native services, regulated systems, compliance workflows, distributed queues, and observability.',
  },
  {
    company: 'Ford Motor Company',
    role: 'Connected Vehicle Engineering',
    description:
      'IoT telemetry, Kafka, Pub/Sub, remote inventory audit systems, and vehicle event workflows at production scale.',
  },
  {
    company: 'Ford Credit',
    role: 'Finance, pricing, sales',
    description:
      'The business-side foundation: process gaps, pricing exposure, field operations, and stakeholder trust.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] pt-16 md:pt-24">
      <article className="container mx-auto px-4 md:px-8 max-w-6xl pb-24">
        <header className="grid grid-cols-[1px_minmax(0,1fr)] lg:grid-cols-[1px_minmax(0,1fr)_220px] gap-5 md:gap-8 mb-20 md:mb-24 pb-16 md:pb-20 border-b border-[var(--color-border)]">
          <div
            className="flex-none w-px self-stretch bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent-muted)] to-transparent"
            aria-hidden="true"
          />

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)] mb-5">
              About
            </p>
            <h1 className="max-w-3xl text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[var(--color-text-primary)] leading-[1.1] break-words mb-8">
              I build the operating layer around AI tools, automation, and engineering teams.
            </h1>
            <p className="max-w-3xl text-lg md:text-xl text-moonlight-text-secondary leading-relaxed mb-5">
              Most of my work happens inside enterprise engineering teams. This site is where I write down the patterns that survive contact with production: convention files, agent workflows, automation architecture, and the business math underneath them.
            </p>
            <p className="max-w-3xl text-sm md:text-base text-moonlight-text-muted leading-relaxed mb-8">
              I take on a small amount of independent work when the fit is clear. The goal is not to look like a big agency. The goal is to be useful before, during, and after the first conversation.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/articles"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-11 px-5 rounded-lg bg-[var(--color-accent)] text-white text-sm font-bold hover:bg-[var(--color-accent-hover)] transition-colors"
              >
                Read the writing
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="/services#assessment"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-11 px-5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm font-bold hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-hover)] transition-colors"
              >
                Work with me
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="/Collin-Wilkins-Resume.pdf"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-11 px-5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm font-bold hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-hover)] transition-colors"
              >
                Download CV
                <Download className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <aside className="col-start-2 lg:col-start-auto lg:border-l lg:border-[var(--color-accent-border)] lg:pl-6 pt-2 text-moonlight-text-secondary leading-relaxed">
            <img
              src="/images/profile_photo.png"
              alt="Collin Wilkins"
              className="hidden lg:block w-32 h-32 rounded-full object-cover border border-[var(--color-border)] mb-6"
            />
            <p className="text-sm md:text-base">
              Lead software engineer. Previously Ford Motor Company, now Morningstar. Writing about AI coding tools, convention files, and automation architecture.
            </p>
            <p className="inline-flex mt-5 px-3 py-1.5 rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-muted)] text-[var(--color-accent)] text-xs font-bold">
              Limited independent work
            </p>
          </aside>
        </header>

        <section className="grid md:grid-cols-[260px_minmax(0,1fr)] gap-8 md:gap-16 mb-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)] mb-4">
              Why this exists
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-text-primary)] leading-tight">
              Not a resume. Not an agency costume.
            </h2>
          </div>
          <div className="max-w-3xl text-base md:text-lg text-moonlight-text-secondary leading-relaxed space-y-5">
            <p>
              I am not trying to turn this site into a glossy consulting firm with a fake bench of people behind it. I am also not trying to make the page read like I am shopping for a job.
            </p>
            <p>
              The useful middle is a practitioner trust page: enough background to understand where my judgment comes from, enough proof to reduce risk, and enough clarity to know what kind of work I can actually help with.
            </p>
            <p>
              That matters because the work I care about is usually messy. AI tooling fails because teams have no shared conventions. Automation fails because nobody owns the error paths. Internal systems fail because the business process was never understood before the code was written.
            </p>
          </div>
        </section>

        <section className="mb-20" aria-label="Proof points">
          <div className="grid md:grid-cols-4 border border-[var(--color-border)] rounded-lg overflow-hidden">
            {proofPoints.map((point, index) => (
              <div
                key={point.metric}
                className={`p-6 md:p-7 bg-[var(--color-bg)] ${index > 0 ? 'border-t md:border-t-0 md:border-l border-[var(--color-border)]' : ''}`}
              >
                <p className="text-3xl md:text-4xl font-bold text-[var(--color-accent)] mb-2">{point.metric}</p>
                <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">{point.label}</p>
                <p className="text-sm text-moonlight-text-secondary leading-relaxed">{point.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-[260px_minmax(0,1fr)] gap-8 md:gap-16 mb-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)] mb-4">
              Where my judgment comes from
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-text-primary)] leading-tight">
              I learned software through the cost of bad process.
            </h2>
          </div>
          <div className="max-w-3xl text-base md:text-lg text-moonlight-text-secondary leading-relaxed space-y-5">
            <p>
              I started close to the business side: finance, pricing, sales, dealer operations. That made software feel concrete before it felt technical. A missing workflow was not an abstraction. It was lost time, delayed decisions, operational risk, or seven figures of exposure quietly accumulating in a spreadsheet.
            </p>
            <p>
              Engineering gave me the toolkit to fix those problems at scale. The earlier roles gave me the instinct to ask whether the system should exist, what it should replace, who has to trust it, and what happens when it breaks.
            </p>
            <p>
              That is still the thread. The AI tools are newer. The work is not. Define the process, encode the context, build the system, measure whether it helped.
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-[260px_minmax(0,1fr)] gap-8 md:gap-16 mb-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)] mb-4">
              Current focus
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-text-primary)] leading-tight">
              The narrow lane I am building around.
            </h2>
          </div>
          <div className="border-t border-[var(--color-border)]">
            {focusAreas.map((area) => (
              <div key={area.title} className="grid md:grid-cols-[220px_minmax(0,1fr)] gap-4 md:gap-8 py-7 border-b border-[var(--color-border)]">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-[var(--color-text-primary)] leading-tight">
                  {area.title}
                </h3>
                <p className="text-moonlight-text-secondary leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)] mb-5">
            Operating philosophy
          </p>
          <div className="grid md:grid-cols-3 border border-[var(--color-border)] rounded-lg overflow-hidden">
            {principles.map((principle, index) => (
              <div
                key={principle.title}
                className={`p-6 md:p-7 bg-[var(--color-surface)] ${index > 0 ? 'border-t md:border-t-0 md:border-l border-[var(--color-border)]' : ''}`}
              >
                <h3 className="text-xl md:text-2xl font-serif font-bold text-[var(--color-text-primary)] mb-4">
                  {principle.title}
                </h3>
                <p className="text-moonlight-text-secondary leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-[260px_minmax(0,1fr)] gap-8 md:gap-16 mb-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)] mb-4">
              Selected background
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-text-primary)] leading-tight">
              The formal record, condensed.
            </h2>
          </div>
          <div className="border-t border-[var(--color-border)]">
            {background.map((item) => (
              <div key={`${item.company}-${item.role}`} className="grid md:grid-cols-[220px_minmax(0,1fr)] gap-4 md:gap-8 py-7 border-b border-[var(--color-border)]">
                <div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-[var(--color-text-primary)] mb-1">
                    {item.company}
                  </h3>
                  <p className="text-sm text-moonlight-text-muted">{item.role}</p>
                </div>
                <p className="text-moonlight-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="grid md:grid-cols-[minmax(0,1fr)_auto] gap-8 items-center border-t border-[var(--color-border)] pt-10">
          <p className="max-w-3xl text-lg text-moonlight-text-secondary leading-relaxed">
            If you are wrestling with AI adoption, convention files, or automation architecture, start with the writing. If the problem is concrete and time-sensitive, book the assessment.
          </p>
          <a
            href="/services#assessment"
            className="inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-lg bg-[var(--color-accent)] text-white text-sm font-bold hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            Book an assessment
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </footer>
      </article>
    </div>
  );
};

export default About;
