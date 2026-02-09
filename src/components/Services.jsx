import React from 'react';
import { Bot, Code, Cloud, Mail, BadgeDollarSign, Linkedin, ArrowRight, CheckCircle2 } from 'lucide-react';

const services = [
    {
        id: 'ai-consulting',
        title: "AI Strategy for Small Teams",
        icon: <Bot className="w-12 h-12 text-teal-400" />,
        description: "Not sure if AI fits your business? I'll tell you which 3 tasks AI can actually help with—no hype, no $100K enterprise pilots. Most assessments take 30 minutes.",
        deliverables: [
            "AI Readiness Assessment (free, 30 min)",
            "Custom AI workflows for your specific tools",
            "Team training on prompt engineering",
            "Production-ready agents, not demos"
        ],
        idealFor: "Small teams curious about AI but unsure where to start."
    },
    {
        id: 'python-scripting',
        title: "Python Scripting & API Integration",
        icon: <Code className="w-12 h-12 text-teal-400" />,
        description: "Production-grade glue code to connect your tech stack. I specialize in messy data normalization and system integrations that don't break when APIs change.",
        deliverables: [
            "Custom API Wrappers and Integrations",
            "Data Normalization & Cleaning Pipelines (Pandas/Pydantic)",
            "Automated Web Scraping & Data Extraction",
            "Legacy System Automation"
        ],
        idealFor: "Companies with 'messy data' or disconnected tools that need to talk to each other."
    },
    {
        id: 'aws-serverless',
        title: "AWS & Serverless Architecture",
        icon: <Cloud className="w-12 h-12 text-teal-400" />,
        description: "Serverless architectures that scale automatically and cost 30-70% less than traditional infrastructure. I build everything in Terraform so you can see exactly what you're paying for.",
        sourceUrl: "https://devsu.com/blog/serverless-architecture-in-2025-is-it-time-to-go-completely-serverless",
        deliverables: [
            "AWS Lambda & Event-Driven Workflows",
            "Infrastructure as Code (Terraform/CloudFormation)",
            "System Modernization (Monolith to Serverless)",
            "Observability & Monitoring (Grafana/Splunk/CloudWatch)"
        ],
        idealFor: "Startups or enterprises needing to scale without managing servers."
    }
];

const Services = () => {
    React.useEffect(() => {
        document.title = "Services | AI Automation & Python Consulting";
    }, []);

    return (
        <div className="min-h-screen bg-black py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-8 max-w-6xl">

                {/* Hero Section */}
                <section className="mb-24 text-center relative overflow-hidden">
                    {/* Atmospheric blur depth effect */}
                    <div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[480px] z-0 hidden md:block"
                        style={{
                            background: 'linear-gradient(135deg, rgba(20,184,166,0.15), rgba(139,92,246,0.08), transparent)',
                            filter: 'blur(80px)',
                        }}
                        aria-hidden="true"
                    />
                    <div className="relative z-10">
                        <h1 className="text-5xl md:text-6xl font-serif font-extrabold text-white mb-6">
                            Services
                        </h1>
                        <p className="text-xl text-moonlight-text-secondary max-w-3xl mx-auto leading-relaxed mb-4">
                            I help small businesses figure out where AI and automation actually make sense—without the enterprise price tag.
                        </p>
                        <p className="text-xl text-moonlight-text-secondary max-w-3xl mx-auto leading-relaxed mb-4">
                            You're here because something in your business is costing too much time.
                            Manual data entry eating 10 hours a week. Copying between systems. Following up with leads by hand.
                        </p>
                        <p className="text-xl text-moonlight-text-secondary max-w-3xl mx-auto leading-relaxed">
                            I fix those. The same patterns I used at Ford and Morningstar work for small teams too—just scaled appropriately.
                        </p>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
                    {services.map((service, idx) => (
                        <div key={idx} className="bg-[rgba(255,255,255,0.03)] rounded-2xl p-8 border border-[rgba(255,255,255,0.06)] flex flex-col hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.12)] hover:shadow-[0_8px_32px_rgba(20,184,166,0.1)] hover:-translate-y-0.5 hover:scale-[1.01] will-change-transform transition-all duration-300">
                            <div className="mb-6">{service.icon}</div>
                            <h2 className="text-2xl font-serif font-bold text-white mb-4">{service.title}</h2>
                            <div className="mb-6 flex-grow">
                                <p className="text-moonlight-text-secondary">{service.description}</p>
                                {service.sourceUrl && (
                                    <a
                                        href={service.sourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-moonlight-text-faint hover:text-teal-400 transition-colors underline decoration-dotted inline-block mt-2"
                                    >
                                        [Source]
                                    </a>
                                )}
                            </div>

                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-[0.08em] mb-4 flex items-center">
                                    <CheckCircle2 className="w-4 h-4 mr-2" /> Key Deliverables
                                </h3>
                                <ul className="space-y-3">
                                    {service.deliverables.map((item, iIdx) => (
                                        <li key={iIdx} className="text-moonlight-text-secondary text-sm flex items-start">
                                            <span className="text-teal-500 mr-2">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-6 border-t border-[rgba(255,255,255,0.06)]">
                                <p className="text-xs text-moonlight-text-muted italic mb-4">
                                    <span className="font-semibold text-moonlight-text-secondary">Ideal if:</span> {service.idealFor}
                                </p>
                                <a
                                    href={`?modal=contact&service=${service.id}`}
                                    className="inline-flex items-center text-teal-400 font-semibold hover:text-teal-300 transition"
                                >
                                    Inquire about this <ArrowRight className="w-4 h-4 ml-2" />
                                </a>
                            </div>
                        </div>
                    ))}
                </section>

                {/* How It Works Section */}
                <section className="mb-24 bg-[rgba(255,255,255,0.03)] p-8 md:p-12 rounded-3xl border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.12)] transition-all duration-300">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 border-b border-purple-500/20 pb-4">
                        How It Works
                    </h2>
                    <div className="text-lg text-moonlight-text-secondary leading-relaxed space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-teal-400 mb-2">
                                1. Discovery Call (30 minutes, free)
                            </h3>
                            <p>
                                We discuss your biggest workflow bottlenecks. I ask about manual processes,
                                data quality issues, and systems that don't talk to each other.
                                By the end, you'll know if automation can help—and roughly how much it'll cost.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-teal-400 mb-2">
                                2. Automation Audit (1-2 weeks)
                            </h3>
                            <p>
                                I analyze your processes and identify savings opportunities.
                                This includes API research, data mapping, and architecture design.
                                You get a detailed proposal with estimated ROI, timeline, and implementation approach.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-teal-400 mb-2">
                                3. Implementation (4-12 weeks, depending on scope)
                            </h3>
                            <p>
                                I build and deploy the solution. Weekly check-ins keep you informed.
                                All code is production-grade: error handling, logging, monitoring, tests.
                                No prototypes, no "we'll fix that later."
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-teal-400 mb-2">
                                4. Handoff & Support
                            </h3>
                            <p>
                                Complete documentation, runbooks, and training so your team can own the system.
                                I include 30 days of support for bugs or adjustments.
                                After that, you can hire me for maintenance or handle it in-house.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="mb-24">
                    <h2 className="text-3xl font-serif font-bold text-white mb-8 text-center">
                        What Does This Cost?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-6 border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.12)] transition-all duration-300">
                            <div className="text-2xl font-bold text-teal-400 mb-2">$2K - $5K</div>
                            <div className="text-moonlight-text-primary font-medium mb-2">Quick Wins</div>
                            <p className="text-moonlight-text-secondary text-sm">
                                Single workflow automation. Zapier/Make replacement.
                                API integration. 1-2 week delivery.
                            </p>
                        </div>
                        <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-6 border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.12)] transition-all duration-300">
                            <div className="text-2xl font-bold text-teal-400 mb-2">$5K - $15K</div>
                            <div className="text-moonlight-text-primary font-medium mb-2">Full Systems</div>
                            <p className="text-moonlight-text-secondary text-sm">
                                Multi-step automations. Custom AI agents.
                                Data pipelines. 4-8 week delivery.
                            </p>
                        </div>
                        <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-6 border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.12)] transition-all duration-300">
                            <div className="text-2xl font-bold text-teal-400 mb-2">$15K+</div>
                            <div className="text-moonlight-text-primary font-medium mb-2">Enterprise</div>
                            <p className="text-moonlight-text-secondary text-sm">
                                Large-scale systems. Cloud architecture.
                                Ongoing support. 2-4 month engagements.
                            </p>
                        </div>
                    </div>
                    <p className="text-center text-moonlight-text-muted text-sm mt-6">
                        Discovery call is always free. I'll tell you if automation makes sense before you spend anything.
                    </p>

                    {/* Guarantee Badge */}
                    <div className="mt-8 text-center">
                        <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-6 py-3">
                            <span className="text-teal-400 font-medium">
                                ✓ If it doesn't work as promised, you don't pay. Simple as that.
                            </span>
                        </div>
                    </div>

                    {/* Portfolio Builder Promo */}
                    <div className="mt-12 bg-gradient-to-r from-purple-500/10 to-teal-500/10 rounded-2xl p-8 border border-purple-500/20">
                        <h3 className="text-xl font-bold text-white mb-2">
                            Building My Small Business Portfolio — 3 Spots
                        </h3>
                        <p className="text-moonlight-text-secondary mb-4">
                            I've built automation for Ford and Morningstar. Now I need small business stories to point to.
                            I'll do your first project <span className="text-teal-400 font-semibold">free</span>—you just agree
                            to a testimonial afterward (written, video, or case study, your call). You get working automation,
                            I get something to show future clients.
                        </p>
                        <a
                            href="?modal=contact&promo=portfolio"
                            className="inline-flex items-center text-teal-400 font-semibold hover:text-teal-300 transition"
                        >
                            Claim a spot →
                        </a>
                    </div>
                </section>

                {/* Quiz CTA */}
                <section className="mb-24 bg-[rgba(255,255,255,0.03)] p-8 md:p-12 rounded-3xl border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.12)] transition-all duration-300 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Not sure which service fits?</h2>
                    <p className="text-moonlight-text-secondary mb-8 max-w-2xl mx-auto text-lg">
                        Take our 2-minute quiz to get a personalized AI action plan delivered to your inbox.
                    </p>
                    <a
                        href="/quiz"
                        className="inline-block bg-teal-500 text-white hover:bg-teal-400 px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                        Take the Quiz →
                    </a>
                </section>

                {/* CTA Section */}
                <section className="bg-[rgba(255,255,255,0.03)] p-8 md:p-12 rounded-3xl border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.12)] transition-all duration-300 text-center shadow-2xl">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Ready to start a project?</h2>
                    <p className="text-moonlight-text-secondary mb-10 max-w-2xl mx-auto text-lg">
                        I'm taking on 2-3 new clients per quarter.
                        If your team is losing 5+ hours a week to manual work, let's talk.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                        <a href="?modal=contact"
                            className="flex items-center justify-center w-full md:w-auto bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 px-10 rounded-full transition-all duration-300 shadow-xl transform hover:scale-105">
                            <Mail className="w-5 h-5 mr-3" /> Contact Me
                        </a>
                        <a href="https://www.linkedin.com/in/collin-wilkins-1020215a/" target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center w-full md:w-auto bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)] text-white font-bold py-3 px-10 rounded-full transition-all duration-300 border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]">
                            <Linkedin className="w-5 h-5 mr-3" /> LinkedIn
                        </a>
                        <a href="https://www.upwork.com/freelancers/~014ffbc17b83da9407" target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center w-full md:w-auto bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)] text-white font-bold py-3 px-10 rounded-full transition-all duration-300 border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]">
                            <BadgeDollarSign className="w-5 h-5 mr-3" /> Upwork
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Services;
