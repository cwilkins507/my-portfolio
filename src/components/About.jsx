import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ANALYTICS_EVENTS, INTRO_CALL } from '../data/site.js';
import BackgroundRecord from './BackgroundRecord';

const standards = [
  {
    title: 'Business math first',
    description:
      "Before the architecture diagram, I want the boring numbers. Where is the money leaking? Where is the time going? What breaks if the system is slow, wrong, or quietly stuck?",
  },
  {
    title: 'Production tells the truth',
    description:
      "A green job with an empty database isn't success. Ask me how I learned that one. The work has to tell you what happened, not just that something ran.",
  },
  {
    title: 'Context has to live somewhere',
    description:
      "If the important part only exists in Slack, a console click, or someone's memory, it's already drifting. Write down the traps before they become folklore.",
  },
];

const personalNotes = [
  'I have lived in Dallas, Atlanta, Denver, Boston, Detroit, Little Rock, Nashville, and Tampa. Moving that much makes you adaptable and quick to read people. After that, almost anyone is easy to work with.',
  'Outside work: gym 3-5 times a week for years, nutrition tracking, the outdoors, sports, country music, and 2000s rock. Yes, I still listen to Creed and Nickelback.',
];

const About = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] pt-16 md:pt-24">
      <article className="mx-auto max-w-6xl px-6 pb-24 md:px-8">
        <header className="grid grid-cols-[1px_minmax(0,1fr)] gap-5 border-b border-[var(--color-border)] pb-14 md:gap-8 md:pb-20 lg:grid-cols-[1px_minmax(0,1fr)_240px]">
          <div
            className="w-px self-stretch bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent-border)] to-transparent"
            aria-hidden="true"
          />

          <div className="min-w-0">
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              <span className="h-px w-[38px] shrink-0 bg-[var(--color-accent)] opacity-[0.86]" aria-hidden="true" />
              About
            </p>
            <h1 className="max-w-[33ch] text-balance font-serif text-[2rem] font-medium leading-[1.03] tracking-[-0.03em] text-[var(--color-text-primary)] md:text-[2.6rem] lg:text-[3.1rem]">
              Most engineers start with "Hello World." Mine starts with a $2 million pricing problem.
            </h1>
            <p className="mt-7 max-w-[min(100%,37rem)] text-lg leading-[1.62] text-[var(--color-text-secondary)] md:text-xl">
              I help companies turn AI and automation experiments into systems their teams can use and maintain. My path through Ford finance, sales, operations, connected vehicles, and software engineering means I look at both how to build the system and whether it solves a real business problem.
            </p>
            <div className="mt-9 max-w-3xl">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                Owners, operators, or unsure where to start
              </p>
              <a
                href={INTRO_CALL.href}
                data-analytics-event={ANALYTICS_EVENTS.bookingPageOpen}
                data-analytics-location="about-booking"
                className="group inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--color-accent)] px-5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
              >
                {INTRO_CALL.bookingLabel}
                <ArrowRight
                  className="ml-2 h-4 w-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-focus-visible:translate-x-0"
                  aria-hidden="true"
                />
              </a>
              <p className="mt-4 text-[15px] leading-[1.55] text-[var(--color-text-secondary)]">
                Engineering leader with a ready repository?{' '}
                <a
                  href="/services/ai-delivery-kit/capability-brief"
                  className="font-bold text-[var(--color-accent)] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
                >
                  Review the AI Delivery Pilot brief
                </a>
                .
              </p>
            </div>
          </div>

          <aside className="col-start-2 flex items-center gap-4 pt-2 text-[var(--color-text-secondary)] lg:col-start-auto lg:block lg:border-l lg:border-[var(--color-accent-border)] lg:pl-6">
            <picture className="shrink-0">
              <source srcSet="/images/profile_photo.webp" type="image/webp" />
              <img
                src="/images/profile_photo.png"
                alt="Collin Wilkins"
                width={128}
                height={128}
                className="h-20 w-20 rounded-full border border-[var(--color-border)] object-cover sm:h-24 sm:w-24 lg:mb-6 lg:h-32 lg:w-32"
              />
            </picture>
            <p className="text-sm leading-relaxed">
              Lead Software Engineer at Morningstar. Previously Ford. Comfortable somewhere between finance, field ops, Python, and the system everyone is annoyed by but nobody has had time to fix.
            </p>
          </aside>
        </header>

        <section className="grid gap-10 border-b border-[var(--color-border)] py-14 md:grid-cols-[clamp(120px,18vw,280px)_minmax(0,1fr)] md:py-20">
          <div>
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              <span className="h-px w-[38px] shrink-0 bg-[var(--color-accent)] opacity-[0.86]" aria-hidden="true" />
              Origin
            </p>
            <h2 className="mt-4 text-balance font-serif text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-[var(--color-text-primary)] md:text-4xl">
              Four Excel files, Raptor, and a 30-day delay.
            </h2>
          </div>

          <div className="max-w-[38rem] space-y-5 text-base leading-[1.62] text-[var(--color-text-secondary)] md:text-lg">
            <p>
              In 2019, I was working in finance and pricing at Ford. Interest rate spreads moved through four Excel files (one for each market area), brand approvals, and then a legacy system called Raptor. Brand managers negotiated spreads, someone keyed the changes in manually, and everybody waited.
            </p>
            <p>
              That was annoying on a quiet week. During the end of ZIRP, with Fed meetings moving rates, it got expensive. A 30-day lag between decision and system update could cost roughly $2 million a year.
            </p>
            <p className="[hanging-punctuation:first]">
              I proposed an automated fix. The answer was: "We don't have the technical resources or skills to do that." Fair enough. So I built what I could with the skills I had, then spent nights and weekends filling in the rest: Java, Python, React, Terraform, cloud systems, design patterns. The first version cut the delay down to about a week.
            </p>
            <p>
              That was the point where software stopped feeling like another department and started feeling like another tool I needed to be useful.
            </p>
            <aside className="mt-10 border-t border-[var(--color-accent-border)] bg-[var(--color-surface)] px-5 py-5 text-sm leading-[1.6]">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">Employment context</p>
              <p className="mt-3">This pricing story comes from a full-time Ford finance role, not a consulting engagement. The cost is a directional estimate from that workflow; no public client artifact is available.</p>
              <a
                className="group mt-3 inline-flex min-h-11 items-center font-bold text-[var(--color-accent)] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
                href="/Collin-Wilkins-Resume.pdf"
                download="collin-wilkins-resume.pdf"
              >
                Download the resume for role history
                <ArrowRight
                  className="ml-2 h-4 w-4 shrink-0 no-underline transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-focus-visible:translate-x-0"
                  aria-hidden="true"
                />
              </a>
            </aside>
          </div>
        </section>

        <section className="grid gap-10 border-b border-[var(--color-border)] py-14 md:grid-cols-[clamp(120px,18vw,280px)_minmax(0,1fr)] md:py-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              The through line
            </p>
            <h2 className="mt-4 text-balance font-serif text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-[var(--color-text-primary)] md:text-4xl">
              I have been the field rep and the engineer with the ticket.
            </h2>
          </div>

          <div className="max-w-3xl space-y-5 text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
            <p>
              I spent the first half of my career in sales and business development, moving through 7 states and 13 territories for Ford. I have been the person asking engineering for help, and now I have been the person receiving the Jira ticket. That ruins you in a useful way.
            </p>
            <p>
              People rarely hand you the real problem neatly packaged. They hand you the workaround. A dashboard request might be a broken handoff. An AI request might be a team without a shared way of writing things down. A "simple automation" might be covering for a system nobody trusts.
            </p>
            <p>
              So I ask annoying questions early. Who touches this? What breaks silently? Where does the money leak? What happens after version one ships? That's the operator part of me. The engineer part still has to make the APIs, queues, schemas, tests, and logs behave.
            </p>
          </div>
        </section>

        <section className="border-b border-[var(--color-border)] py-14 md:py-20">
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Working standards
          </p>
          <div className="grid overflow-hidden rounded-lg border border-[var(--color-border)] md:grid-cols-3">
            {standards.map((standard, index) => (
              <div
                key={standard.title}
                className={`bg-[var(--color-surface)] p-6 md:p-7 ${index > 0 ? 'border-t border-[var(--color-border)] md:border-l md:border-t-0' : ''}`}
              >
                <h3 className="text-balance font-serif text-2xl font-medium leading-[1.15] tracking-[-0.02em] text-[var(--color-text-primary)]">
                  {standard.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {standard.description}
                </p>
              </div>
            ))}
          </div>
        </section>


        <section className="grid gap-10 border-b border-[var(--color-border)] py-14 md:grid-cols-[clamp(120px,18vw,280px)_minmax(0,1fr)] md:py-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Selected background
            </p>
            <h2 className="mt-4 text-balance font-serif text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-[var(--color-text-primary)] md:text-4xl">
              The formal record, minus the resume wall.
            </h2>
          </div>

          <BackgroundRecord variant="table" />
        </section>

        <section className="grid gap-10 py-14 md:grid-cols-[clamp(120px,18vw,280px)_minmax(0,1fr)] md:py-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              A little more human
            </p>
            <h2 className="mt-4 text-balance font-serif text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-[var(--color-text-primary)] md:text-4xl">
              The page behind the portfolio.
            </h2>
          </div>

          <div className="max-w-[34rem] space-y-3.5">
            {personalNotes.map(note => (
              <p
                key={note}
                className="text-[15px] leading-[1.6] text-[var(--color-text-secondary)] [text-wrap:pretty]"
              >
                {note}
              </p>
            ))}
          </div>
        </section>

        <section className="grid gap-10 border-b border-[var(--color-border)] py-14 md:grid-cols-[clamp(120px,18vw,280px)_minmax(0,1fr)] md:py-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Working together
            </p>
            <h2 className="mt-4 text-balance font-serif text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-[var(--color-text-primary)] md:text-4xl">
              If your team needs help.
            </h2>
          </div>

          <div className="max-w-[38rem] space-y-5 text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
            <p>
              I take on a small amount of independent work each week: AI coding tool adoption, convention files, automation architecture, and the system decisions that keep getting deferred because every option has consequences.
            </p>
            <p>
              No hard sell. We will name the problem, the next useful decision, and whether I am the right person to help.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-[var(--color-border)] pt-6">
              <a
                href={INTRO_CALL.href}
                data-analytics-event={ANALYTICS_EVENTS.bookingPageOpen}
                data-analytics-location="about-close"
                className="group inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--color-accent)] px-6 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
              >
                {INTRO_CALL.bookingLabel}
                <ArrowRight
                  className="ml-2 h-4 w-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-focus-visible:translate-x-0"
                  aria-hidden="true"
                />
              </a>
              <a
                href="/services"
                className="inline-flex min-h-11 items-center font-bold text-[var(--color-accent)] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
              >
                Or read how I work
              </a>
            </div>
          </div>
        </section>

        <footer className="grid gap-8 border-t border-[var(--color-border)] pt-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <p className="max-w-3xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
            That's the backstory. The case studies are the receipts.
          </p>
          <a
            href="/case-studies"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--color-accent)] px-5 text-sm font-bold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
          >
            Read case studies
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
        </footer>
      </article>
    </div>
  );
};

export default About;
