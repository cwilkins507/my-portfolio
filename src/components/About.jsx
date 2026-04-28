import React from 'react';
import { ArrowRight, Download } from 'lucide-react';

const background = [
  {
    period: 'Now',
    role: 'Lead Software Engineer',
    company: 'Morningstar',
    detail:
      "Regulated workflows, queues, compliance systems, observability, and the kind of cloud work where missing a record isn't a cute little edge case.",
  },
  {
    period: '2021-2024',
    role: 'Connected Vehicle Engineering',
    company: 'Ford Motor Company',
    detail:
      'IoT telemetry, Kafka, Pub/Sub, identity work, inventory audit automation, and vehicle event systems across hundreds of thousands of connected vehicles.',
  },
  {
    period: '2017-2021',
    role: 'Finance, pricing, sales, business development',
    company: 'Ford Credit / Ford Motor Company',
    detail:
      'The business-side apprenticeship: dealer ops, pricing systems, field trust, manual process pain, and what long delays actually cost.',
  },
];

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
  'I taught myself engineering from the business side inward. Java made me slow down. Python made me dangerous enough to automate things. React made me respect state more than I wanted to.',
  'Recursion was the first CS concept that made my brain need a new gear. It clicked when I stopped treating it like syntax and started seeing trees, sorts, and repeated structures.',
  'I have lived in Dallas, Atlanta, Denver, Boston, and Detroit. Moving that much gives you a useful read on incentives, communication styles, and how quickly headquarters assumptions get weird in the field.',
  'Outside work: gym 3-5 times a week for years, nutrition tracking, country music, and 2000s rock. Creed and Nickelback are OK by me. I said what I said.',
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
            <p className="mb-5 font-mono text-xs uppercase text-[var(--color-accent)]">
              About
            </p>
            <h1 className="max-w-4xl font-serif text-4xl font-bold leading-[1.08] text-[var(--color-text-primary)] md:text-5xl">
              Most engineers start with "Hello World." Mine starts with a $2 million pricing problem.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl">
              Before engineering, I worked in finance, pricing, sales, and field roles at Ford. That matters because I still see software through the business process it's supposed to fix: who touches it, where it stalls, and what the delay costs.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="/case-studies"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--color-accent)] px-5 text-sm font-bold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
              >
                View the work
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="/Collin-Wilkins-Resume.pdf"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[var(--color-border-hover)] bg-[var(--color-surface)] px-5 text-sm font-bold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                Download CV
                <Download className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <aside className="col-start-2 pt-2 text-[var(--color-text-secondary)] lg:col-start-auto lg:border-l lg:border-[var(--color-accent-border)] lg:pl-6">
            <img
              src="/images/profile_photo.png"
              alt="Collin Wilkins"
              className="mb-6 hidden h-32 w-32 rounded-full border border-[var(--color-border)] object-cover lg:block"
            />
            <p className="text-sm leading-relaxed">
              Lead Software Engineer at Morningstar. Previously Ford. Comfortable somewhere between finance, field ops, Python, and the system everyone is annoyed by but nobody has had time to fix.
            </p>
          </aside>
        </header>

        <section className="grid gap-10 border-b border-[var(--color-border)] py-14 md:grid-cols-[280px_minmax(0,1fr)] md:py-20">
          <div>
            <p className="font-mono text-xs uppercase text-[var(--color-accent)]">
              Origin
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[var(--color-text-primary)] md:text-4xl">
              Four Excel files, Raptor, and a 30-day delay.
            </h2>
          </div>

          <div className="max-w-3xl space-y-5 text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
            <p>
              In 2019, I was working in finance and pricing at Ford. Interest rate spreads moved through four Excel files (one for each market area), brand approvals, and then a legacy system called Raptor. Brand managers negotiated spreads, someone keyed the changes in manually, and everybody waited.
            </p>
            <p>
              That was annoying on a quiet week. During the end of ZIRP, with Fed meetings moving rates, it got expensive. A 30-day lag between decision and system update could cost roughly $2 million a year.
            </p>
            <p>
              I proposed an automated fix. The answer was: "We don't have the technical resources or skills to do that." Fair enough. So I built what I could with the skills I had, then spent nights and weekends filling in the rest: Java, Python, React, Terraform, cloud systems, design patterns. The first version cut the delay down to about a week.
            </p>
            <p>
              That was the point where software stopped feeling like another department and started feeling like another tool I needed to be useful.
            </p>
          </div>
        </section>

        <section className="grid gap-10 border-b border-[var(--color-border)] py-14 md:grid-cols-[280px_minmax(0,1fr)] md:py-20">
          <div>
            <p className="font-mono text-xs uppercase text-[var(--color-accent)]">
              The through line
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[var(--color-text-primary)] md:text-4xl">
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
          <p className="mb-8 font-mono text-xs uppercase text-[var(--color-accent)]">
            Working standards
          </p>
          <div className="grid overflow-hidden rounded-lg border border-[var(--color-border)] md:grid-cols-3">
            {standards.map((standard, index) => (
              <div
                key={standard.title}
                className={`bg-[var(--color-surface)] p-6 md:p-7 ${index > 0 ? 'border-t border-[var(--color-border)] md:border-l md:border-t-0' : ''}`}
              >
                <h3 className="font-serif text-2xl font-bold leading-tight text-[var(--color-text-primary)]">
                  {standard.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {standard.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 border-b border-[var(--color-border)] py-14 md:grid-cols-[280px_minmax(0,1fr)] md:py-20">
          <div>
            <p className="font-mono text-xs uppercase text-[var(--color-accent)]">
              Production scars
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[var(--color-text-primary)] md:text-4xl">
              The database was empty, but the job said success.
            </h2>
          </div>

          <div className="max-w-3xl space-y-5 text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
            <p>
              Early in my automation career, a workflow reported success while the target database stayed empty. It took about 24 hours to find the real issue: DevOps had failed us over to us-west-2, while part of the application still pointed at us-east-1.
            </p>
            <p>
              Nobody was trying to be careless. The system just had enough hidden assumptions to lie convincingly. That one stuck.
            </p>
            <p>
              Now I care a lot about boring things: logs that show the actual outcome, alerts on the result instead of the attempt, config that lives in code, and docs that tell the next person where the trap doors are. Glamorous? No. Useful? Very.
            </p>
          </div>
        </section>

        <section className="grid gap-10 border-b border-[var(--color-border)] py-14 md:grid-cols-[280px_minmax(0,1fr)] md:py-20">
          <div>
            <p className="font-mono text-xs uppercase text-[var(--color-accent)]">
              Selected background
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[var(--color-text-primary)] md:text-4xl">
              The formal record, minus the resume wall.
            </h2>
          </div>

          <div className="border-t border-[var(--color-border)]">
            {background.map(item => (
              <div
                key={`${item.company}-${item.role}`}
                className="grid gap-4 border-b border-[var(--color-border)] py-7 md:grid-cols-[170px_minmax(0,1fr)] md:gap-8"
              >
                <p className="font-mono text-xs uppercase text-[var(--color-text-muted)]">
                  {item.period}
                </p>
                <div>
                  <h3 className="font-serif text-2xl font-bold leading-tight text-[var(--color-text-primary)]">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    {item.company}
                  </p>
                  <p className="mt-4 leading-relaxed text-[var(--color-text-secondary)]">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 py-14 md:grid-cols-[280px_minmax(0,1fr)] md:py-20">
          <div>
            <p className="font-mono text-xs uppercase text-[var(--color-accent)]">
              A little more human
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[var(--color-text-primary)] md:text-4xl">
              The page behind the portfolio.
            </h2>
          </div>

          <div className="border-t border-[var(--color-border)]">
            {personalNotes.map(note => (
              <p
                key={note}
                className="border-b border-[var(--color-border)] py-5 leading-relaxed text-[var(--color-text-secondary)]"
              >
                <span className="mr-2 text-[var(--color-accent)]" aria-hidden="true">/</span>
                {note}
              </p>
            ))}
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
