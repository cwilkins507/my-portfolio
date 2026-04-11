import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Bot, Code, Cloud, CheckCircle2, ArrowRight, Mail } from 'lucide-react';
import MagneticButton from './MagneticButton';
import GlowDivider from './GlowDivider';

const services = [
  {
    id: 'ai-strategy',
    title: 'AI Strategy for Engineering Teams',
    icon: <Bot className="w-12 h-12 text-[var(--color-accent)]" />,
    description:
      "Your team adopted Claude Code, Cursor, or Copilot individually. Output quality varies wildly between developers, senior engineers are skeptical, and nobody can prove ROI. I help you standardize tool selection, build the rollout plan, and run one-day workshops for teams up to 20 engineers.",
    deliverables: [
      'AI readiness assessment across your current workflows',
      'Tool selection and rollout plan (Claude Code, Cursor, Copilot, or multi-tool)',
      'One-day team workshop with hands-on exercises on your actual codebase',
      'Written recommendations and next-step roadmap',
    ],
    idealFor:
      'Engineering teams six months into AI tool adoption who need a practitioner read on what to standardize.',
  },
  {
    id: 'convention-files',
    title: 'Convention Files & Context Engineering',
    icon: <Code className="w-12 h-12 text-[var(--color-accent)]" />,
    description:
      "The reason your AI tools produce inconsistent output isn't the model, it's the context. Convention files (CLAUDE.md, AGENTS.md, .cursorrules) are how you turn AI coding tools from novelty into compounding productivity. I build them for your actual codebase, not generic templates.",
    deliverables: [
      'Codebase audit and convention file architecture',
      'CLAUDE.md, AGENTS.md, and tool-specific rules committed to your repo',
      'Team walkthrough on when and how to update convention files',
      'Written patterns for ongoing maintenance',
    ],
    idealFor:
      'Teams using AI coding tools whose output varies too much between developers or between sessions.',
  },
  {
    id: 'automation-architecture',
    title: 'Automation Architecture',
    icon: <Cloud className="w-12 h-12 text-[var(--color-accent)]" />,
    description:
      "Python, APIs, data pipelines, serverless, n8n. I build production-grade automation systems end to end — the same patterns that saved $5M during my years at Ford Motor Company. Not prototypes, not 'we'll fix that later.'",
    deliverables: [
      'Custom API integrations and webhook handlers',
      'Data pipelines with error handling, logging, and monitoring',
      'AWS Lambda and serverless architectures (Terraform/CloudFormation)',
      'n8n and no-code workflow replacements for Zapier or Make',
    ],
    idealFor:
      'Teams with messy data, disconnected tools, or manual workflows eating hours per week.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Book a 1-hour assessment ($250)',
    description:
      "Paid intake — filters tire-kickers and makes sure we both know whether there's a fit. I review what you send me ahead of the call (30 min async prep), we spend 60 minutes together discussing current state and goals, and you walk away with a written action plan and rough scope estimate. The $250 rolls into the first invoice if we end up scoping a project.",
  },
  {
    number: '02',
    title: 'We scope it together',
    description:
      'A short async exchange to nail down deliverables, timeline, and price. No discovery phase that costs more than the actual work.',
  },
  {
    number: '03',
    title: 'I build it',
    description:
      'Async-first. Weekly check-ins. Production-grade code with error handling, logging, and monitoring — the same bar I hold for my day job.',
  },
  {
    number: '04',
    title: 'Handoff and support',
    description:
      'Complete documentation, runbooks, and training so your team can own the system. 30 days of support for bugs or adjustments included. After that, you can hire me for maintenance or handle it in-house.',
  },
];

const goodFit = [
  'Engineering teams of 10-200 engineers adopting AI coding tools and wanting a practitioner who ships production code',
  'Teams with a clear automation or integration problem and the authority to move on it',
  'Companies that value async work — I work evenings and weekends on consulting, daytime commitments not available',
  "Leaders who want convention files committed to their repo, not a 47-slide capability deck",
];

const notFit = [
  "You want a 6-month discovery phase before anyone touches code. I start building in week one.",
  "You need staff augmentation. I'm not a contractor filling a headcount gap.",
  "You need daytime availability or business-hours coverage — my weekday schedule is committed to my day job.",
  "You're in investment management, wealth advisory, retirement solutions, ESG data, credit ratings, or compliance software for financial services. Conflict with my current employer — I can't take work in these sectors.",
  "You're evaluating five agencies in a formal RFP with a scoring rubric. I can participate, but that process selects for firms optimized to win RFPs, which isn't the same as firms optimized to ship your work.",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const Services = () => {
  const prefersReducedMotion = useReducedMotion();

  React.useEffect(() => {
    document.title = 'Services | Collin Wilkins';
  }, []);

  const motionProps = (variants = fadeUp) =>
    prefersReducedMotion
      ? {}
      : {
          variants,
          initial: 'hidden',
          whileInView: 'visible',
          viewport: { once: true, margin: '-50px' },
        };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pt-16 md:pt-24">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">

        {/* ── Hero Section ── */}
        <section className="py-16 md:py-24 text-center relative overflow-hidden">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[480px] z-0 hidden md:block"
            style={{
              background:
                'linear-gradient(135deg, var(--color-blur-primary), var(--color-blur-secondary), transparent)',
              filter: 'blur(80px)',
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[var(--color-text-primary)] mb-6 leading-[1.25]"
              {...motionProps()}
            >
              Services
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-moonlight-text-secondary max-w-3xl mx-auto leading-relaxed"
              {...motionProps()}
            >
              I help engineering teams adopt AI coding tools, build convention-file foundations, and ship production automation. Twelve years across enterprise engineering orgs — previously IoT telemetry at Ford Motor Company, now shipping production automation at a major financial data company.
            </motion.p>
          </div>
        </section>

        <GlowDivider />

        {/* ── Services Grid ── */}
        <section className="mb-16 md:mb-24 pt-16 md:pt-24">
          <motion.div className="text-center mb-12 md:mb-16" {...motionProps()}>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-4">
              What I Work On
            </h2>
            <p className="text-lg text-moonlight-text-secondary max-w-2xl mx-auto">
              Three problem categories. Each inquiry gets a direct response from me, not a sales team.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            {...motionProps(staggerContainer)}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                className="bg-[var(--color-surface)] rounded-2xl p-8 border border-[var(--color-border)] flex flex-col hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-hover)] hover:shadow-card hover:-translate-y-0.5 hover:scale-[1.01] will-change-transform transition-all duration-300"
                variants={fadeUp}
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-serif font-bold text-[var(--color-text-primary)] mb-4">
                  {service.title}
                </h3>

                <p className="text-moonlight-text-secondary text-sm leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-[0.08em] mb-3 flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-2" /> You get
                  </h4>
                  <ul className="space-y-2">
                    {service.deliverables.map((item, i) => (
                      <li
                        key={i}
                        className="text-moonlight-text-secondary text-sm flex items-start"
                      >
                        <span className="text-[var(--color-text-muted)] mr-2">-</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 border-t border-[var(--color-border)]">
                  <p className="text-xs text-moonlight-text-muted italic mb-4">
                    <span className="font-semibold text-moonlight-text-secondary">Ideal if:</span>{' '}
                    {service.idealFor}
                  </p>
                  <a
                    href={`/?modal=contact&service=${service.id}`}
                    className="inline-flex items-center text-[var(--color-accent)] font-semibold hover:text-[var(--color-accent-hover)] transition"
                  >
                    Inquire about this <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <GlowDivider />

        {/* ── How It Works ── */}
        <section className="mb-16 md:mb-24 pt-16 md:pt-24">
          <motion.h2
            className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-12 text-center"
            {...motionProps()}
          >
            How It Works
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            {...motionProps(staggerContainer)}
          >
            {steps.map((step) => (
              <motion.div
                key={step.number}
                className="bg-[var(--color-surface)] rounded-2xl p-8 border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-hover)] transition-all duration-300"
                variants={fadeUp}
              >
                <div className="text-3xl font-serif font-bold text-[var(--color-accent)] mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">
                  {step.title}
                </h3>
                <p className="text-moonlight-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <GlowDivider />

        {/* ── Who This Is For / Not For ── */}
        <section className="mb-16 md:mb-24 pt-16 md:pt-24">
          <motion.h2
            className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-12 text-center"
            {...motionProps()}
          >
            Who This Is For
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-[var(--color-surface)] rounded-2xl p-8 border border-[var(--color-border)]"
              {...motionProps()}
            >
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                <span className="text-[var(--color-accent)]">Good fit</span>
              </h3>
              <ul className="space-y-4">
                {goodFit.map((item, idx) => (
                  <li key={idx} className="text-moonlight-text-secondary text-sm flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] mr-3 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="bg-[var(--color-surface)] rounded-2xl p-8 border border-[var(--color-border)]"
              {...motionProps()}
            >
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                Not a fit
              </h3>
              <ul className="space-y-4">
                {notFit.map((item, idx) => (
                  <li key={idx} className="text-moonlight-text-secondary text-sm flex items-start">
                    <span className="text-moonlight-text-muted mr-3 mt-0.5 flex-shrink-0">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        <GlowDivider />

        {/* ── Final CTA ── */}
        <section
          id="intake"
          className="mb-16 md:mb-24 bg-[var(--color-surface)] p-8 md:p-12 rounded-3xl border border-[var(--color-border)] text-center mt-16 md:mt-24"
        >
          <motion.div {...motionProps()}>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-4">
              Tell me what you're working on.
            </h2>
            <p className="text-moonlight-text-secondary mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              Short intake form. I read every submission and respond within 48 hours with either a scoping proposal or an honest "I'm not the right fit for this."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton href="/?modal=contact" variant="primary">
                <Mail className="w-5 h-5 mr-2 inline" /> Start the conversation
              </MagneticButton>
              <MagneticButton href="/articles" variant="secondary">
                Or read what I write
              </MagneticButton>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Services;
