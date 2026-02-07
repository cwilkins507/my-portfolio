import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';

const caseStudies = [
  {
    id: 'ford-inventory',
    headline: "Eliminating a 30-Day Manual Process",
    company: "Ford Motor Company",
    role: "Lead Engineer",
    metric: "$5M",
    metricLabel: "Annual Savings",
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
    metric: "90%",
    metricLabel: "Reduction in Daily Runs",
    problem: `Every morning started the same way. An engineer clicking through 80 Postman requests to trigger compliance checks. One by one, like a human cron job. This ate up 20% of our team's weekly bandwidth. When someone got sick for a week, compliance checks just... stopped. That's when we knew we had to automate.`,
    solution: `I transformed the architecture to fully event-driven, reducing daily compliance runs by 90% and freeing up 10 engineering hours every week. This let us onboard 7 new enterprise recordkeepers with zero added overhead while improving throughput and reducing latency by 35%.`,
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
    problem: `The Ford F-150 is America's best-selling truck. Also its most stolen. Owners needed real-time protection, but tracking vehicles raises serious privacy concerns. We had to balance theft recovery capability with strict data privacy compliance.`,
    solution: `A privacy-first telemetry system now deployed in thousands of 2024 F-150s, providing owners with cloud-backed theft recovery. When a theft is reported, the system automatically increases tracking frequency to help police recover the vehicle faster.`,
    technical: `I architected a Zero Trust ingestion layer using GCP Pub/Sub and Kafka where all telemetry is anonymized at entry, with PII encrypted in a secure vault accessible only via ephemeral tokens during active recovery. The adaptive recovery mode transitions the vehicle's modem to high-frequency reporting when theft is detected, balancing recovery speed with cellular costs and battery drain.`,
    technologies: ["GCP Pub/Sub", "Kafka", "Zero Trust Architecture", "Privacy-First Design", "IoT"],
    takeaway: "Security and privacy don't have to be trade-offs. With the right architecture, you can have both — and ship a product customers trust."
  }
];

const CaseStudies = () => {
  React.useEffect(() => {
    document.title = "Case Studies | Collin Wilkins";
  }, []);

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">

        {/* Hero */}
        <section className="mb-20 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-extrabold text-white mb-6">
            Case Studies
          </h1>
          <p className="text-lg md:text-xl text-moonlight-text-secondary max-w-3xl mx-auto leading-relaxed">
            Real problems. Measurable results. Here's what happens when you stop tolerating manual processes and start automating them.
          </p>
        </section>

        {/* Case Studies */}
        {caseStudies.map((cs, idx) => (
          <section
            key={cs.id}
            className={`mb-16 ${idx < caseStudies.length - 1 ? 'border-b border-[rgba(255,255,255,0.06)] pb-16' : ''}`}
          >
            {/* Header with metric */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
                  {cs.headline}
                </h2>
                <div className="flex items-center gap-3 text-moonlight-text-muted text-sm">
                  <span>{cs.company}</span>
                  <span className="text-moonlight-text-faint">•</span>
                  <span>{cs.role}</span>
                </div>
              </div>
              <div className="md:text-right flex-shrink-0">
                <div className="text-4xl font-bold text-teal-400">{cs.metric}</div>
                <div className="text-moonlight-text-muted text-sm">{cs.metricLabel}</div>
              </div>
            </div>

            {/* Problem / Solution / Technical */}
            <div className="space-y-8 text-lg text-moonlight-text-secondary leading-relaxed">
              <div>
                <h3 className="text-xl font-serif font-bold text-teal-400 mb-3">The Problem</h3>
                {cs.problem.split('\n\n').map((p, i) => (
                  <p key={i} className="leading-relaxed">{p}</p>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-teal-400 mb-3">What We Built</h3>
                {cs.solution.split('\n\n').map((p, i) => (
                  <p key={i} className="leading-relaxed">{p}</p>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-teal-400 mb-3">How It Works</h3>
                {cs.technical.split('\n\n').map((p, i) => (
                  <p key={i} className="leading-relaxed">{p}</p>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mt-8 mb-8">
              {cs.technologies.map(tech => (
                <span
                  key={tech}
                  className="bg-zinc-900 text-teal-300 text-xs font-medium px-3 py-1 rounded-full border border-[rgba(255,255,255,0.06)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Universal Takeaway */}
            <div className="bg-[rgba(20,184,166,0.08)] border-l-4 border-teal-400 p-6 rounded-r-lg">
              <p className="text-moonlight-text-secondary italic">{cs.takeaway}</p>
            </div>
          </section>
        ))}

        {/* Bottom CTA */}
        <section className="text-center py-16 border-t border-[rgba(255,255,255,0.06)]">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">
            Have a bottleneck like these?
          </h2>
          <p className="text-moonlight-text-secondary mb-8 max-w-2xl mx-auto">
            Tell me about the manual process that's draining your team's time. I'll respond within 24-48 hours with next steps.
          </p>
          <a
            href="?modal=contact"
            className="inline-flex items-center justify-center bg-purple-600 hover:bg-teal-500 text-white font-bold py-3 px-10 rounded-full transition duration-300 shadow-xl shadow-purple-500/20 hover:shadow-teal-500/20"
          >
            <Mail className="w-5 h-5 mr-3" />
            Start a Conversation
          </a>
        </section>

      </div>
    </div>
  );
};

export default CaseStudies;
