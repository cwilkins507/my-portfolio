import React from 'react';
import { ENGINEERING_PILOT, INTRO_CALL } from '../data/site.js';

const caseStudies = [
  {
    id: 'ford-inventory',
    headline: "Eliminating a 30-Day Manual Process",
    company: "Ford Motor Company",
    role: "Lead Engineer",
    metric: "$5M",
    metricLabel: "Annual Savings",
    evidence: "Full-time Ford role · production platform · internal operational and finance measures · public implementation unavailable",
    problem: `Ford Credit was spending millions on slow, manual vehicle audits. Auditors drove hundreds of miles to physically count cars at dealerships, discovering discrepancies weeks after the financial impact. In a rising interest rate environment, this lag was expensive.`,
    solution: `An IoT telemetry platform that automated verification for 450,000+ vehicles, saving around $5 million annually in operational costs and interest rate carry. What used to take weeks now happens in real-time.`,
    technical: `I led the architecture of a high-scale event-driven system using Kafka, Google Cloud Pub/Sub, and Azure IoT Hub. The system ingests 600,000+ vehicle events daily with state management to ensure data integrity in a distributed environment. Handles out-of-order events through Kafka partitioning by vehicle_id and stateful buffering.`,
    technologies: ["Kafka", "Google Cloud Pub/Sub", "Azure IoT Hub", "Event-Driven Architecture", "IoT Telemetry"],
    takeaway: "Whether your team is 5 or 500, the pattern is the same — find the manual bottleneck, automate it, measure the savings."
  },
  {
    id: 'morningstar-compliance',
    headline: "Cutting 20% of Weekly Engineering Bandwidth",
    company: "Morningstar",
    role: "Lead Engineer",
    metric: "10h",
    metricLabel: "Weekly Engineering Time Reclaimed",
    evidence: "Full-time Morningstar role · production compliance system · internal delivery and performance measures · public implementation unavailable",
    problem: `Every morning started the same way. An engineer clicking through 80 Postman requests to trigger compliance checks. One by one, like a human cron job. This ate up 20% of our team's weekly bandwidth. When someone got sick for a week, compliance checks just... stopped. That's when we knew we had to automate.`,
    solution: `I transformed the architecture to fully event-driven, freeing up 10 engineering hours every week. This let us onboard 7 new enterprise recordkeepers with zero added overhead while improving throughput and reducing latency by 35%.`,
    technical: `I implemented load-aware scheduling that monitors database capacity before kicking off new jobs via AWS SQS and ephemeral Fargate tasks. Instead of blindly running all checks daily, the system uses database diffing to detect meaningful changes and only publishes events when there's actually a delta. Smart resource utilization that scales.`,
    technologies: ["AWS SQS", "AWS Fargate", "AWS Lambda", "Event-Driven Architecture", "Database Optimization"],
    takeaway: "Manual processes that 'only take 20% of someone's time' add up fast. Automate them, and suddenly your team can innovate instead of maintain."
  },
  {
    id: 'f150-stolen-vehicle',
    headline: "Protecting America's Most Stolen Vehicle",
    company: "Ford Motor Company",
    role: "Lead Engineer",
    metric: "2024",
    metricLabel: "Production Launch",
    evidence: "Full-time Ford role · production vehicle program · internal launch record · public implementation unavailable",
    problem: `The Ford F-150 is America's best-selling truck. Also its most stolen. Owners needed real-time protection, but tracking vehicles raises serious privacy concerns. We had to balance theft recovery capability with strict data privacy compliance.`,
    solution: `A privacy-first telemetry system now deployed in thousands of 2024 F-150s, providing owners with cloud-backed theft recovery. When a theft is reported, the system automatically increases tracking frequency to help police recover the vehicle faster.`,
    technical: `I architected a Zero Trust ingestion layer using GCP Pub/Sub and Kafka where all telemetry is anonymized at entry, with PII encrypted in a secure vault accessible only via ephemeral tokens during active recovery. The adaptive recovery mode transitions the vehicle's modem to high-frequency reporting when theft is detected, balancing recovery speed with cellular costs and battery drain.`,
    technologies: ["GCP Pub/Sub", "Kafka", "Zero Trust Architecture", "Privacy-First Design", "IoT"],
    takeaway: "Security and privacy don't have to be trade-offs. With the right architecture, you can have both — and ship a product customers trust."
  }
];

const CaseStudies = () => {

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-16 md:py-20">
      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        <header className="mb-12 border-b-2 border-[var(--color-text-primary)] pb-10 md:mb-16">
          <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">Engineering work ledger</p>
          <h1 className="max-w-3xl font-serif text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl">Case studies</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl">
            Three production systems, recorded as problem, intervention, operating evidence, and outcome.
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-wide text-[var(--color-accent)]">
            Outcomes from full-time engineering roles, not consulting clients.
          </p>
          <nav aria-label="Case study index" className="mt-7 grid gap-px border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-3">
            {caseStudies.map((cs, idx) => (
              <a className="flex min-h-11 items-center bg-[var(--color-surface)] px-4 py-3 text-sm font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-accent)]" href={`#${cs.id}`}>
                <span className="mr-3 font-mono text-xs text-[var(--color-accent)]">0{idx + 1}</span>{cs.company}
              </a>
            ))}
          </nav>
        </header>

        {/* Case Studies */}
        {caseStudies.map((cs, idx) => (
          <details
            id={cs.id}
            key={cs.id}
            className="group border-b border-[var(--color-border)]"
            open={idx === 0}
          >
            <summary className="grid min-h-24 cursor-pointer list-none gap-4 py-6 marker:hidden md:grid-cols-[1fr_210px] md:items-center">
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-wide text-[var(--color-text-muted)]">0{idx + 1} · {cs.company} · {cs.role}</p>
                <h2 className="font-serif text-2xl font-bold text-[var(--color-text-primary)] md:text-3xl">{cs.headline}</h2>
                <span className="mt-3 inline-block font-mono text-[11px] uppercase tracking-wide text-[var(--color-accent)]">
                  <span className="group-open:hidden">Open case</span>
                  <span className="hidden group-open:inline">Close case</span>
                </span>
              </div>
              <div className="grid gap-1 text-left md:text-right">
                <strong className="font-serif text-2xl text-[var(--color-accent)]">{cs.metric === "$5M" ? "Approx. $5M" : cs.metric}</strong>
                <span className="text-sm text-[var(--color-text-muted)]">{cs.metricLabel}</span>
              </div>
            </summary>
            <div className="pb-12 md:pl-10">

            {/* Problem / Solution / Technical */}
            <div className="space-y-8 text-lg text-moonlight-text-secondary leading-relaxed">
              <div>
                <h3 className="text-xl font-serif font-bold text-[var(--color-text-primary)] mb-3">The Problem</h3>
                {cs.problem.split('\n\n').map((p, i) => (
                  <p key={i} className="leading-relaxed">{p}</p>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-[var(--color-text-primary)] mb-3">What We Built</h3>
                {cs.solution.split('\n\n').map((p, i) => (
                  <p key={i} className="leading-relaxed">{p}</p>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-[var(--color-text-primary)] mb-3">How It Works</h3>
                {cs.technical.split('\n\n').map((p, i) => (
                  <p key={i} className="leading-relaxed">{p}</p>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <p className="mt-8 border-t border-[var(--color-border)] pt-4 font-mono text-xs leading-relaxed text-[var(--color-text-muted)]">
              <strong className="text-[var(--color-text-primary)]">Evidence basis:</strong> {cs.evidence}
            </p>
            <p className="mt-5 border-l-2 border-[var(--color-accent)] pl-5 leading-relaxed text-[var(--color-text-secondary)]">
              <strong className="text-[var(--color-text-primary)]">Transferable lesson:</strong> {cs.takeaway}
            </p>
            <p className="mt-5 font-mono text-xs text-[var(--color-text-muted)]">Systems: {cs.technologies.join(' · ')}</p>
            </div>
          </details>
        ))}

        <section className="grid gap-6 border-t-2 border-[var(--color-text-primary)] py-12 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-[var(--color-accent)]">Apply the pattern</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[var(--color-text-primary)]">Choose the route that matches your team.</h2>
          </div>
          <div className="flex flex-col gap-3">
            <a className="inline-flex min-h-11 items-center justify-center bg-[var(--color-accent)] px-5 text-sm font-bold text-white" href={ENGINEERING_PILOT.capabilityBriefHref}>Engineering teams: review the pilot brief</a>
            <a className="inline-flex min-h-11 items-center justify-center border border-[var(--color-border)] px-5 text-sm font-bold text-[var(--color-text-primary)]" href={INTRO_CALL.href}>Owners, operators, or unsure: book a free intro</a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default CaseStudies;
