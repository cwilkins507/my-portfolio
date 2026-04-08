import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { CheckCircle2, ArrowRight, Clock, Users, Zap, BookOpen, MessageSquare } from 'lucide-react';
import MagneticButton from './MagneticButton';
import GlowDivider from './GlowDivider';

const services = [
  {
    id: 'assessment',
    title: 'AI & Automation Assessment',
    price: '$7,500 - $15,000',
    duration: '1-2 weeks',
    icon: <Zap className="w-6 h-6" />,
    description:
      "I audit your current workflows, evaluate AI readiness across your engineering org, and deliver a prioritized roadmap with ROI estimates for each opportunity. This includes 3 quick-win implementations so you walk away with working results, not just a PDF.",
    deliverables: [
      'Workflow audit document',
      'AI readiness evaluation',
      'Prioritized roadmap with ROI estimates',
      '3 deployed quick wins',
    ],
    bestFor:
      "Teams that know they should be using AI and automation but aren't sure where to start or what's actually worth the investment.",
  },
  {
    id: 'fractional',
    title: 'Fractional Automation Architect',
    price: '$5,000 - $8,000/mo',
    duration: '3-6 month min',
    icon: <Users className="w-6 h-6" />,
    description:
      "I embed with your engineering team 10-15 hours per week. Architecture decisions, vendor evaluations, hands-on implementation guidance, and code review for AI-generated output. I work async (no business-hours meetings required) and integrate with your existing tools and workflows.",
    deliverables: [
      'Architecture decisions',
      'Vendor evaluations',
      'Hands-on implementation guidance',
      'Code review',
      "Async integration with your team's existing tools",
    ],
    bestFor:
      "Teams building AI into their development workflow and need a practitioner who's done it at enterprise scale, not a recruiter's contractor.",
  },
  {
    id: 'workshop',
    title: 'AI Adoption Workshop',
    price: '$3,000 - $8,000',
    duration: 'Half-day or full-day',
    icon: <BookOpen className="w-6 h-6" />,
    description:
      "Hands-on training for your engineering team. Prompt engineering, AI coding tools (Claude Code, Cursor, Copilot), internal automation patterns, and convention file architecture. Up to 20 engineers. Everyone leaves with a working setup, not just a slide deck they'll forget by Friday.",
    deliverables: [
      'Custom workshop materials',
      'Hands-on exercises using your actual codebase',
      'Working tool configurations for every participant',
    ],
    bestFor:
      'Teams that adopted AI tools six months ago and noticed the output quality varies wildly between developers.',
  },
  {
    id: 'sprint',
    title: 'Implementation Sprint',
    price: '$15,000 - $30,000',
    duration: '4-8 weeks',
    icon: <ArrowRight className="w-6 h-6" />,
    description:
      "I build and deploy a specific automation system end-to-end. You define the problem, we scope it together, I ship it. This is the engagement for teams that have a clear target and want it built by someone who's done it before.",
    deliverables: [
      'A working, deployed automation system',
      'Documentation',
      'Handoff to your team',
    ],
    bestFor:
      "A defined automation problem that's been on the backlog for two quarters because nobody has the bandwidth or the specific expertise.",
  },
  {
    id: 'advisory',
    title: 'Advisory Retainer',
    price: '$3,000 - $5,000/mo',
    duration: 'Ongoing',
    icon: <MessageSquare className="w-6 h-6" />,
    description:
      "Monthly strategy calls, architecture reviews, vendor evaluations, and async access for questions between calls. Think of it as having a senior automation architect on speed dial without the full-time salary.",
    deliverables: [
      'Monthly strategy calls',
      'Architecture reviews',
      'Vendor evaluations',
      'Async access via email/Slack',
    ],
    bestFor:
      "Teams that have the builders but want a second opinion from someone who's seen what works (and what doesn't) across multiple orgs.",
  },
];

const steps = [
  {
    number: '01',
    title: 'Tell me what you\'re working on.',
    description:
      'Fill out the intake form. Describe the problem, your team, your timeline. No 30-minute scheduling dance. I read every submission and respond within 48 hours with either a scoping proposal or an honest "I\'m not the right fit for this."',
  },
  {
    number: '02',
    title: 'We scope it together.',
    description:
      'A short async exchange (or one call if you prefer) to nail down deliverables, timeline, and price. No discovery phase that costs more than the actual work.',
  },
  {
    number: '03',
    title: 'I build it. Or I guide your team while they build it.',
    description:
      'Depends on the engagement. Assessments and sprints are mostly me. Fractional and advisory work is collaborative. Either way, you get working systems and clear documentation, not a binder full of recommendations.',
  },
];

const goodFit = [
  'Engineering teams at 50-500 person companies adopting AI coding tools and want someone who\'s shipped production systems with them (not someone who read about it)',
  'Teams automating manual workflows and want an architect who\'s built the same systems at Ford and Morningstar',
  'Engineering leaders who want a practitioner, not a management consultant. Someone who\'ll review your PRs, not just your org chart.',
  "Companies that value async work. I don't need to be in your office or on your daily standup.",
];

const notFit = [
  'You want a 6-month discovery phase before anyone touches code. I start building in week one.',
  "You need staff augmentation. I'm not a contractor filling a headcount gap.",
  "You need a full-time hire. If the work is ongoing and full-time, you should hire someone. I can help you figure out what that role looks like.",
  "Your budget is under $3,000. I'm not the cheapest option and I don't try to be.",
];

const proofItems = [
  'Ford Motor Company',
  'Morningstar',
  '$5M saved',
  '90% reduction in manual process',
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

const Consulting = () => {
  const prefersReducedMotion = useReducedMotion();

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
          {/* Atmospheric blur */}
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
              I help engineering teams ship AI and automation without the 6-month consulting engagement.
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-moonlight-text-secondary mb-10 max-w-3xl mx-auto leading-relaxed"
              {...motionProps()}
            >
              I spent years building automation systems at Ford Motor Company ($5M in savings) and
              Morningstar (90% reduction in compliance review time). Now I work with mid-market
              engineering teams that want the same results without hiring a big-four firm or waiting
              six months for a roadmap.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              {...motionProps()}
            >
              <MagneticButton href="/?modal=contact" variant="primary">
                Tell me what you're working on
              </MagneticButton>
              <MagneticButton href="/case-studies" variant="secondary">
                Read a case study
              </MagneticButton>
            </motion.div>
          </div>
        </section>

        {/* ── Proof Bar ── */}
        <motion.section
          className="py-8 mb-16 md:mb-24"
          {...motionProps()}
        >
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
            {proofItems.map((item, idx) => (
              <React.Fragment key={item}>
                <span className="text-sm md:text-base font-medium text-moonlight-text-secondary tracking-wide">
                  {item}
                </span>
                {idx < proofItems.length - 1 && (
                  <span className="hidden sm:inline text-moonlight-text-faint" aria-hidden="true">
                    |
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.section>

        <GlowDivider />

        {/* ── What I Do ── */}
        <section className="mb-16 md:mb-24">
          <motion.div className="text-center mb-12 md:mb-16" {...motionProps()}>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-4">
              What I Do
            </h2>
            <p className="text-lg text-moonlight-text-secondary max-w-2xl mx-auto">
              I build systems. Not slide decks. Every engagement ships something: a working
              automation, a team that knows how to use AI tools, or a roadmap specific enough to
              execute without me.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            {...motionProps(staggerContainer)}
          >
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                className={`bg-[var(--color-surface)] rounded-2xl p-8 border border-[var(--color-border)] flex flex-col hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-hover)] hover:shadow-card hover:-translate-y-0.5 hover:scale-[1.01] will-change-transform transition-all duration-300${
                  idx === services.length - 1 && services.length % 2 !== 0
                    ? ' md:col-span-2 md:max-w-[calc(50%-0.75rem)] md:mx-auto'
                    : ''
                }`}
                variants={fadeUp}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-[var(--color-accent)]">{service.icon}</div>
                    <h3 className="text-xl font-serif font-bold text-[var(--color-text-primary)]">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Price + Duration */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[var(--color-accent)] font-bold text-sm">
                    {service.price}
                  </span>
                  <span className="text-moonlight-text-faint" aria-hidden="true">|</span>
                  <span className="text-moonlight-text-muted text-sm flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {service.duration}
                  </span>
                </div>

                {/* Description */}
                <p className="text-moonlight-text-secondary text-sm leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Deliverables */}
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

                {/* Best For */}
                <div className="pt-5 border-t border-[var(--color-border)]">
                  <p className="text-xs text-moonlight-text-muted italic">
                    <span className="font-semibold text-moonlight-text-secondary">Best for:</span>{' '}
                    {service.bestFor}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <GlowDivider />

        {/* ── How It Works ── */}
        <section className="mb-16 md:mb-24">
          <motion.h2
            className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-12 text-center"
            {...motionProps()}
          >
            How It Works
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
        <section className="mb-16 md:mb-24">
          <motion.h2
            className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-12 text-center"
            {...motionProps()}
          >
            Who This Is For
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Good Fit */}
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

            {/* Not a Fit */}
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
          className="mb-16 md:mb-24 bg-[var(--color-surface)] p-8 md:p-12 rounded-3xl border border-[var(--color-border)] text-center"
        >
          <motion.div {...motionProps()}>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-4">
              Tell me what you're working on.
            </h2>
            <p className="text-moonlight-text-secondary mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              The intake form takes 5 minutes. I'll respond within 48 hours with a scoping proposal
              or tell you I'm not the right fit. No sales calls, no "let me loop in my team," no
              47-slide capability deck.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton href="/?modal=contact" variant="primary">
                Tell me what you're working on
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

export default Consulting;
