import React from 'react';
import { ArrowRight } from 'lucide-react';

const problemCategories = [
  {
    title: 'A recurring workflow is creating operational drag',
    description:
      "Leads wait, reports require repeated cleanup, or important handoffs live in someone's head. I map the workflow, identify the expensive failure point, and determine whether a conventional automation or a supervised AI system is justified.",
    signal: 'Workflow mapping, opportunity ranking, implementation decision',
  },
  {
    title: 'An AI workflow needs reliable boundaries',
    description:
      "A useful agent needs more than a prompt. I define the context it can trust, the systems it can reach, the actions it can take, and the moments when a person must approve or intervene.",
    signal: 'Operating contract, permissions, integrations, escalation',
  },
  {
    title: 'A prototype needs to become an operable system',
    description:
      "I build the smallest production-ready slice: one workflow, only the integrations it needs, observable execution, and a clean handoff. Authority expands only after the results support it.",
    signal: 'Backend implementation, logging, runbooks, measured rollout',
  },
];

const engagementSteps = [
  {
    number: '01',
    title: 'Map the workflow',
    description:
      'Start with the $99 AI Workflow Opportunity Assessment. We identify the recurring work, its consequence, and the highest-leverage first system.',
  },
  {
    number: '02',
    title: 'Define the operating contract',
    description:
      'If implementation is justified, I specify the context, tools, permissions, approval thresholds, and failure path before granting the system authority.',
  },
  {
    number: '03',
    title: 'Pilot one supervised workflow',
    description:
      'The first build stays narrow: one workflow, limited integrations, customer-owned credentials, and human review for consequential actions.',
  },
  {
    number: '04',
    title: 'Measure before expanding',
    description:
      'We review completed work, interventions, errors, latency, and operating cost. Broader autonomy follows evidence, not enthusiasm.',
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
              Two focused ways to make AI useful in real work.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
              For owners, I identify the right workflow to fix. For engineering leaders, I install a governed AI-assisted delivery path in one repository. Both start narrow, keep consequential decisions human-controlled, and produce customer-owned operating assets.
            </p>
          </div>
        </header>

        <section aria-labelledby="starting-point" className="mb-16">
          <div className="mb-8">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">Choose by problem</p>
            <h2 id="starting-point" className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)]">
              Two starting points. Neither hides behind a discovery retainer.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <article id="engineering-pilot" className="flex h-full flex-col rounded-2xl border border-[var(--color-accent)] bg-[var(--color-accent-muted)] p-6 md:p-7">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">For engineering leaders</p>
              <h3 className="font-serif text-2xl font-bold leading-tight text-[var(--color-text-primary)]">
                AI-Assisted Delivery Pilot
              </h3>
              <p className="mt-2 font-mono text-sm text-[var(--color-text-primary)]">$1,500 founding price · first three clients</p>
              <p className="mt-5 text-[var(--color-text-secondary)] leading-relaxed">
                In five business days after readiness, your team owns a repository-native AI delivery path proven on one approved low-risk issue.
              </p>
              <ul className="my-6 space-y-3 pl-5 list-disc marker:text-[var(--color-accent)] text-sm text-[var(--color-text-secondary)] leading-relaxed">
                <li>One team, repository, intake system, and coding-agent adapter</li>
                <li>Repository rules, protected paths, model configuration, and five smoke cases</li>
                <li>Verified draft pull request plus a customer-run working handoff</li>
                <li>$500 after scope acceptance; $1,000 only after acceptance passes</li>
              </ul>
              <div className="mt-auto space-y-3">
                <a
                  href="/services?modal=contact&service=ai-delivery-pilot"
                  className="block w-full rounded-lg bg-[var(--color-accent)] px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                >
                  Request a pilot scope review →
                </a>
                <a href="https://cal.com/collinwilkins/intro" className="block text-center text-sm font-semibold text-[var(--color-accent)] underline underline-offset-4 hover:text-[var(--color-accent-hover)]">
                  Or book a free fit call
                </a>
              </div>
            </article>

            <article id="workflow-assessment" className="flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-glass)] p-6 md:p-7">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">For owners and operators</p>
              <h3 className="font-serif text-2xl font-bold leading-tight text-[var(--color-text-primary)]">
                AI Workflow Opportunity Assessment
              </h3>
              <p className="mt-2 font-mono text-sm text-[var(--color-text-primary)]">$99 · delivered within 48 hours</p>
              <p className="mt-5 text-[var(--color-text-secondary)] leading-relaxed">
                A focused 60-minute working session on one recurring workflow, followed by a concise Workflow Opportunity Map.
              </p>
              <ul className="my-6 space-y-3 pl-5 list-disc marker:text-[var(--color-accent)] text-sm text-[var(--color-text-secondary)] leading-relaxed">
                <li>Up to three ranked workflow opportunities</li>
                <li>One recommended first system</li>
                <li>Where AI helps, where conventional automation is safer, and where a person stays in control</li>
                <li>A 14-day action plan with self-serve and implementation paths</li>
              </ul>
              <div className="mt-auto space-y-3">
                <a
                  href="https://cal.com/collinwilkins/assessment"
                  className="block w-full rounded-lg border border-[var(--color-accent)] px-5 py-3 text-center text-sm font-semibold text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                >
                  Book the assessment →
                </a>
                <a href="https://cal.com/collinwilkins/intro" className="block text-center text-sm font-semibold text-[var(--color-accent)] underline underline-offset-4 hover:text-[var(--color-accent-hover)]">
                  Or start with a free intro call
                </a>
              </div>
            </article>
          </div>
        </section>

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
            From workflow to supervised operator
          </h2>
          <div className="space-y-6">
            {engagementSteps.map(step => (
              <div key={step.number} className="grid grid-cols-[44px_minmax(0,1fr)] gap-4 border-t border-[var(--color-border)] pt-5">
                <span className="font-mono text-xs text-[var(--color-accent)]">{step.number}</span>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[var(--color-text-primary)] mb-2">{step.title}</h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[var(--color-text-secondary)] leading-relaxed">
            The deliverable is not a general-purpose “AI employee.” It is the minimum reliable system for one business outcome, with explicit authority, observable execution, and a handoff your team can operate.
          </p>
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
              I also don't take open-ended “AI employee” builds, unrestricted purchasing or customer commitments, business-hours support, or projects that require broad access before a narrow workflow proves itself.
            </p>
          </div>
        </section>

        <section id="intake">
          <div className="border-t border-[var(--color-border)] pt-12">
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
              Not sure which path fits? Use the free 30-minute call. We'll identify the problem, confirm the boundary, and choose the smaller credible next step.
            </p>
            <a
              href="https://cal.com/collinwilkins/intro"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              Book a free fit call
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

      </article>
    </div>
  );
};

export default Services;
