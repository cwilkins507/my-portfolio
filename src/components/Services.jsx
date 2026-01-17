import React from 'react';
import { Bot, Code, Cloud, Mail, BadgeDollarSign, Linkedin, ArrowRight, CheckCircle2 } from 'lucide-react';

const services = [
    {
        id: 'ai-automation',
        title: "AI & Automation Consulting",
        icon: <Bot className="w-12 h-12 text-teal-400" />,
        description: "I help businesses leverage Large Language Models and automation to streamline operations, reduce manual overhead, and build intelligent workflows.",
        deliverables: [
            "Custom Agentic Workflows (GitHub/Asana/Slack integrations)",
            "Prompt Engineering & Context Design (CLEAR framework)",
            "RAG Pipeline Architecture",
            "AI Strategy Audits & Roadmaps"
        ],
        idealFor: "Teams looking to move beyond basic chatbots into production AI systems."
    },
    {
        id: 'python-scripting',
        title: "Python Scripting & API Integration",
        icon: <Code className="w-12 h-12 text-teal-400" />,
        description: "Robust, production-grade glue code to connect your tech stack. I specialize in complex data normalization and resilient system integration.",
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
        description: "Cloud-native solutions designed for scalability, observability, and cost-efficiency. Everything is built as code (Terraform).",
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
        <div className="min-h-screen bg-gray-900 py-20">
            <div className="container mx-auto px-4 md:px-8 max-w-6xl">

                {/* Hero Section */}
                <section className="mb-24 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
                        How I Can Help
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        I bridge the gap between complex business problems and technical solutions.
                        Whether you need to automate a tedious manual process, integrate AI into your product,
                        or scale your cloud infrastructure, I build systems that deliver measurable business value.
                    </p>
                </section>

                {/* Services Grid */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
                    {services.map((service, idx) => (
                        <div key={idx} className="bg-gray-800 rounded-2xl p-8 border border-gray-700 flex flex-col hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300">
                            <div className="mb-6">{service.icon}</div>
                            <h2 className="text-2xl font-bold text-white mb-4">{service.title}</h2>
                            <p className="text-gray-400 mb-6 flex-grow">{service.description}</p>

                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wider mb-4 flex items-center">
                                    <CheckCircle2 className="w-4 h-4 mr-2" /> Key Deliverables
                                </h3>
                                <ul className="space-y-3">
                                    {service.deliverables.map((item, iIdx) => (
                                        <li key={iIdx} className="text-gray-300 text-sm flex items-start">
                                            <span className="text-teal-500 mr-2">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-6 border-t border-gray-700">
                                <p className="text-xs text-gray-500 italic mb-4">
                                    <span className="font-semibold text-gray-400">Ideal if:</span> {service.idealFor}
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

                {/* CTA Section */}
                <section className="bg-gradient-to-br from-teal-900/20 to-gray-800 p-8 md:p-12 rounded-3xl border border-teal-500/20 text-center shadow-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to start a project?</h2>
                    <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg">
                        I'm currently taking on new consulting engagements and project work.
                        Let's discuss how we can streamline your operations or build your next big idea.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                        <a href="?modal=contact"
                            className="flex items-center justify-center w-full md:w-auto bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-10 rounded-full transition duration-300 shadow-xl shadow-teal-500/30">
                            <Mail className="w-5 h-5 mr-3" /> Contact Me
                        </a>
                        <a href="https://www.linkedin.com/in/collin-wilkins-1020215a/" target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center w-full md:w-auto bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-10 rounded-full transition duration-300 border border-gray-600">
                            <Linkedin className="w-5 h-5 mr-3" /> LinkedIn
                        </a>
                        <a href="https://www.upwork.com/freelancers/~014ffbc17b83da9407" target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center w-full md:w-auto bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-10 rounded-full transition duration-300 border border-gray-600">
                            <BadgeDollarSign className="w-5 h-5 mr-3" /> Upwork
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Services;
