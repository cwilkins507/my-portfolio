import React from 'react';
import { Linkedin, Github, Mail, BadgeDollarSign, ArrowRight } from 'lucide-react';

// Portfolio data
const portfolioData = {
  name: "Collin Wilkins",
  headline: "I Build Automation Systems That Eliminate Manual Work and Save Companies Millions",
  aboutMe: [
    {
      title: "The $2 Million Aha Moment: Why I Code for ROI",
      content: `Most engineers start their story with a "Hello World" script. Mine starts with a $2 million liability.

In 2019, while working in Finance at Ford Motor Company, I noticed a costly flaw in our process. We had interest rate spreads that needed daily updates across dozens of regions and thousands of contracts. This was during the end of the zero interest rate era, and we held our breaths each time the Fed announced a meeting.

Our manual lead time? 30 days.

I did the math: if the Fed hiked rates after each meeting, that 30-day lag could cost us roughly $2 million annually.

I proposed an automated fix. The response? "We don't have the technical resources or skills to do that."

So I built what I could myself. Cut that 30-day lead time down to 7 days.

That's when it clicked for me.

Code isn't just for engineers. It's a business tool. I build systems that solve expensive problems and give people their time back.`
    },
    {
      title: "Philosophy: Engineering as a Profit Center",
      content: `I'm a tech optimist and a problem-spotter. The biggest wins don't come from "Big AI" magic wands. They come from fixing the friction points that compound over time. The "death by a thousand cuts" issues. Small manual tasks that add up to massive time sinks.

If your team spends 20% of their week clicking "Run" on a Postman collection or manually importing contacts, you're not just losing time. You're losing the chance to innovate.

I use Infrastructure as Code (Terraform) because I've inherited too many systems where the only documentation was "Steve's memory." And Steve quit. Everything I build is self-documenting through code. If I leave, the logic stays behind.

I pick robustness over trendiness. AWS Lambda and distributed queues (SQS) aren't fashionable, but they scale to millions of requests without the headaches. You only pay for what you use. No expensive servers sitting idle at 3 AM.`
    },
    {
      title: "The Special Sauce: From the Field to the Terminal",
      content: `I spent the first half of my career in Sales and Business Development, moving through 7 states and 13 territories for Ford. I've been the "Field Rep" and I've been the "Lead Engineer."

This is my moat.

Most developers look at a Jira ticket and miss the bigger picture. There's a joke I've seen play out more times than I'd like:

An engineer designs a beautiful deck that meets all structural and safety codes. Except it has no stairs and isn't attached to the house.

When asked why, the engineer replies: "Well, that wasn't in the requirements."

I look at business processes differently. I've lived the pain of operations and manual data entry. I can tie technical architecture directly to business value. I speak Finance, I speak Sales, and I speak Python.

I've lived in Dallas, Atlanta, Denver, Nashville, Boston, Tampa, and now Detroit. I'm a generalist by choice. I can drop into any legacy system, identify the bottleneck, and ship the fix. The soundtrack? Creed and Nickelback are fine by me.`
    }
  ],
  howToWork: {
    title: "How to Work With Me",
    intro: "I help companies eliminate expensive manual processes through custom automation. If your team is wasting hours on work a script could handle, I can help.",
    steps: [
      "Discovery Call (30 minutes, free): We discuss your biggest workflow bottlenecks",
      "Automation Audit (1 week): I analyze your processes and identify savings opportunities",
      "Implementation (timeline varies): I build and deploy the solution",
      "Handoff: Complete documentation and support to ensure your team can own the system"
    ],
    services: [
      {
        name: "AI/LLM Integration",
        description: "Custom agents that handle repetitive analysis and decision-making tasks, freeing your team for high-value work. I build production-ready agentic workflows, not just demos."
      },
      {
        name: "Automation Strategy",
        description: "I audit your workflows, identify the highest-ROI automation opportunities, and implement Python scripts or low-code solutions that save thousands of hours annually."
      },
      {
        name: "Backend Engineering",
        description: "Scalable API design, serverless architecture (AWS Lambda), and database optimization for systems that handle real production load."
      }
    ],
    guarantee: "If I don't identify significant automation savings during the audit, it's free."
  },
  proofPoints: [
    {
      metric: "$5M saved",
      problem: "A team was driving hundreds of miles to manually count cars at dealerships. We automated it with IoT telemetry for 450K+ vehicles."
    },
    {
      metric: "90% reduction",
      problem: "An engineer was burning 20% of their week clicking through 80 Postman requests for compliance checks. We made it event-driven."
    },
    {
      metric: "2024 Launch",
      problem: "America's most stolen truck needed theft recovery without sacrificing owner privacy. We built Zero Trust telemetry."
    }
  ],
  finimbus: {
    title: "Understanding the Business Behind the Code",
    content: [
      `At Ford Credit, I analyzed hundreds of financial statements from dealerships and small businesses applying for credit. You start to see patterns. The best-performing dealerships weren't tracking more metrics — they were focused on fewer, and they understood exactly what those numbers meant for their next move.`,
      `Most small business owners have financial statements they don't understand. They see numbers but don't know what those numbers are telling them to do. So they either ignore the reports, pay someone to translate, or fly blind until a lender or accountant delivers bad news.`,
      `FiNimbus fixes that. It takes your financials and translates them into the key drivers that actually matter — the same ones I watched separate thriving businesses from struggling ones, the same ones lenders use to evaluate your creditworthiness. Not another dashboard. Just clear, plain-language answers.`,
      `This is what I do: spot the manual bottleneck, understand the domain, automate the solution.`
    ]
  },
  linkedin: "https://www.linkedin.com/in/collin-wilkins-1020215a/",
  upwork: "https://www.upwork.com/freelancers/~014ffbc17b83da9407",
  github: "https://github.com/cwilkins507",
  email: "wilkins507@gmail.com",
  skills: {
    Cloud: ["AWS", "Azure", "GCP"],
    "Infrastructure as Code": ["Terraform", "CloudFormation"],
    "CI/CD": ["CodePipeline", "Jenkins", "GitHub Actions"],
    Languages: ["Java", "Kotlin", "Javascript", "Python", "TypeScript"],
    Containers: ["Docker", "ECS", "EKS", "Kubernetes"],
    Databases: ["SQL (Postgres, SQL Server)", "NoSQL (DynamoDB, MongoDB)", "Redis"],
    Frameworks: ["Spring Boot", "React", "Angular"],
    Architecture: ["Microservices", "Serverless", "Event-Driven", "REST", "GraphQL"]
  },
  experiences: [
    {
      role: "Lead Engineer",
      company: "Morningstar, Inc. — Detroit, MI",
      period: "Apr 2024 – Present",
      description: "Architected and deployed secure, cloud-native services for regulated financial clients, onboarding 23 recordkeepers. Modernized compliance engine with AWS SQS & Lambda, improving throughput and reducing latency by 35%. Designed monitoring/alerting solutions with Grafana & Splunk to maintain 99.99% uptime."
    },
    {
      role: "Full Stack Software Engineer – Connected Vehicle",
      company: "Ford Motor Company — Dearborn, MI",
      period: "Feb 2021 – Apr 2024",
      description: "Built and maintained IoT microservices on Azure and GCP for real-time telemetry and OTA updates. Implemented Kafka listeners processing 600k+ vehicle events daily. Developed theft anticipation/recovery features for 2024 F-150. Migrated identity systems to ADFS & SSO, enhancing Zero Trust security. Redesigned cloud-based inventory auditing app handling 450k vehicles, saving $5M annually."
    },
    {
      role: "Market Area Sales Manager (Pricing & Strategy)",
      company: "Ford Motor Company",
      period: "Jul 2019 – Jan 2021",
      description: "Designed digital pricing tools delivering $2.2M in annual savings. Collaborated with leadership on technology roadmaps and pricing models for North America."
    },
    {
      role: "Business Development Manager",
      company: "Ford Motor Company",
      period: "Mar 2017 – Jun 2019",
      description: "Served as technical sales advisor for digital onboarding and financial planning tools across 13 dealer accounts ($75M AUM). Deployed tailored technical sales engagements, capturing $10M in revenue."
    }
  ],
  education: [
    {
      degree: "MBA",
      school: "Lipscomb University – Nashville, TN",
      year: "2016"
    },
    {
      degree: "BS, Business Administration (Finance & Accounting)",
      school: "University of Colorado Boulder",
      year: "2013"
    }
  ],
  certifications: [
    "AWS Cloud Practitioner (2025)",
    "Microsoft Azure Fundamentals (AZ-900) (2024)",
    "Architecting with Google Kubernetes Engine (2024)",
    "Google Foundations of Cybersecurity (2024)",
    "Richardson Next Level Sales Training Certified (2017)",
    "Six Sigma Black Belt CSSBB (2016)"
  ]
};


const About = () => {
  React.useEffect(() => {
    document.title = "About Collin Wilkins | AI & Automation Expert";
  }, []);

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">

        {/* Header / Bio Section */}
        <section className="mb-24 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-extrabold text-white mb-8 text-center">
            {portfolioData.headline}
          </h1>

          {/* 1. Origin Story, 2. Philosophy, 3. The Moat */}
          <div className="text-lg md:text-xl text-moonlight-text-secondary leading-relaxed space-y-6 text-left">
            {portfolioData.aboutMe.map((section, idx) => (
              <div key={idx} className="mb-12">
                <h2 className="text-3xl font-serif font-bold text-teal-400 mb-6 border-b border-purple-500/20 pb-2">
                  {section.title}
                </h2>
                <div className="text-lg md:text-xl text-moonlight-text-secondary leading-relaxed space-y-6 text-left">
                  {section.content.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className="leading-relaxed whitespace-pre-line">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-6 mt-10">
            <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className="text-moonlight-text-secondary hover:text-teal-400 transition">
              <Linkedin className="w-8 h-8" />
            </a>
            <a href={portfolioData.upwork} target="_blank" rel="noopener noreferrer" className="text-moonlight-text-secondary hover:text-teal-400 transition">
              <BadgeDollarSign className="w-8 h-8" />
            </a>
            <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="text-moonlight-text-secondary hover:text-teal-400 transition">
              <Github className="w-8 h-8" />
            </a>
            <a href={`mailto:${portfolioData.email}`} className="text-moonlight-text-secondary hover:text-teal-400 transition">
              <Mail className="w-8 h-8" />
            </a>
          </div>
        </section>

        {/* 4. Proof Points */}
        <section className="mb-24">
          <h2 className="text-4xl font-serif font-bold text-center text-white mb-16">Proof Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {portfolioData.proofPoints.map((point, idx) => (
              <div key={idx} className="bg-[rgba(255,255,255,0.03)] rounded-xl p-6 border border-[rgba(255,255,255,0.06)] hover:border-teal-400/50 transition-colors">
                <div className="text-3xl font-bold text-teal-400 mb-3">{point.metric}</div>
                <p className="text-moonlight-text-secondary mb-4 leading-relaxed">
                  {point.problem}
                </p>
                <a href="/case-studies" className="text-teal-400 text-sm hover:text-teal-300 transition inline-flex items-center">
                  Read full case study <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 5. FiNimbus — Domain Expertise */}
        <section className="mb-24">
          <h2 className="text-4xl font-serif font-bold text-center text-white mb-16">
            {portfolioData.finimbus.title}
          </h2>
          <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-8 border border-[rgba(255,255,255,0.06)] max-w-4xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              <span className="text-teal-400">FiNimbus</span> — AI-powered CFO for small businesses
            </h3>
            <div className="space-y-4 text-moonlight-text-secondary leading-relaxed">
              {portfolioData.finimbus.content.map((paragraph, idx) => (
                <p key={idx} className={idx === portfolioData.finimbus.content.length - 1 ? "font-medium text-moonlight-text-primary" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>
            <a
              href="https://finimbus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 transition-colors font-medium inline-block mt-6"
            >
              → finimbus.com
            </a>
          </div>
        </section>

        {/* 6. How to Work With Me */}
        <section className="mb-24">
          <h2 className="text-4xl font-serif font-bold text-center text-white mb-16">
            {portfolioData.howToWork.title}
          </h2>
          <div className="bg-[rgba(255,255,255,0.03)] p-8 rounded-xl border border-[rgba(255,255,255,0.06)] max-w-4xl mx-auto">
            <p className="text-lg text-moonlight-text-secondary leading-relaxed mb-8">
              {portfolioData.howToWork.intro}
            </p>

            {/* 4-Step Process */}
            <div className="mb-8">
              <h3 className="text-xl font-serif font-bold text-teal-400 mb-4">How it works:</h3>
              <ol className="space-y-3 text-moonlight-text-secondary">
                {portfolioData.howToWork.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-teal-400 font-bold mr-3 flex-shrink-0">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* What I Build */}
            <div className="mb-8">
              <h3 className="text-xl font-serif font-bold text-teal-400 mb-4">What I build:</h3>
              <div className="space-y-4 text-moonlight-text-secondary">
                {portfolioData.howToWork.services.map((service, idx) => (
                  <p key={idx}>
                    <span className="font-semibold text-moonlight-text-primary">{service.name}:</span>{' '}
                    {service.description}
                  </p>
                ))}
              </div>
            </div>

            {/* Guarantee */}
            <div className="bg-[rgba(20,184,166,0.08)] border-l-4 border-teal-400 p-6 rounded-r-lg mb-8">
              <p className="text-moonlight-text-secondary font-medium">
                <span className="text-teal-400 font-bold">Guarantee:</span> {portfolioData.howToWork.guarantee}
              </p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <p className="text-moonlight-text-secondary mb-6">
                Currently accepting new projects. Tell me about the manual process that's draining your team's time, and I'll respond within 24-48 hours with next steps.
              </p>
              <a
                href="?modal=contact"
                className="inline-flex items-center justify-center bg-purple-600 hover:bg-teal-500 text-white font-bold py-3 px-10 rounded-full transition duration-300 shadow-xl shadow-purple-500/20 hover:shadow-teal-500/20"
              >
                <Mail className="w-5 h-5 mr-3" />
                Start a Conversation
              </a>
            </div>
          </div>
        </section>

        {/* 7. Technical Skills */}
        <section className="mb-24">
          <h2 className="text-4xl font-serif font-bold text-center text-white mb-12">Technical Skills</h2>
          <div className="bg-[rgba(255,255,255,0.03)] p-8 rounded-xl shadow-xl border border-[rgba(255,255,255,0.06)] max-w-5xl mx-auto">
            <div className="space-y-8">
              {Object.entries(portfolioData.skills).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="text-xl font-semibold text-teal-400 mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.map(skill => (
                      <span key={skill} className="bg-zinc-900 text-teal-300 text-sm font-medium px-4 py-2 rounded-full transition duration-200 hover:bg-teal-700 hover:text-white transform hover:scale-105 shadow-md border border-[rgba(255,255,255,0.06)]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Experience */}
        <section className="mb-24">
          <h2 className="text-4xl font-serif font-bold text-center text-white mb-16">Professional Experience</h2>
          <div className="relative border-l-4 border-purple-500/50 ml-4 md:ml-20 max-w-4xl mx-auto">
            {portfolioData.experiences.map((exp, idx) => (
              <div key={idx} className="mb-16 pl-10 md:pl-16 relative">
                {/* Timeline Dot */}
                <div className="absolute w-4 h-4 bg-teal-500 rounded-full -left-[10px] top-2 border-4 border-black"></div>

                <p className="text-sm text-moonlight-text-muted mb-2">{exp.period}</p>
                <h3 className="text-2xl font-serif font-bold text-teal-400">{exp.role}</h3>
                <h4 className="text-lg font-semibold text-moonlight-text-secondary mb-4">{exp.company}</h4>
                <p className="text-moonlight-text-secondary leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Education & Certifications */}
        <section>
          <h2 className="text-4xl font-serif font-bold text-center text-white mb-16">Education & Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="bg-[rgba(255,255,255,0.03)] p-6 rounded-xl shadow-xl border border-[rgba(255,255,255,0.06)]">
              <h3 className="text-2xl font-serif font-bold text-teal-400 mb-4 border-b border-teal-400/50 pb-2">Education</h3>
              {portfolioData.education.map((edu, idx) => (
                <div key={idx} className="mb-4">
                  <p className="text-lg font-semibold text-moonlight-text-secondary">{edu.degree}</p>
                  <p className="text-moonlight-text-muted text-sm">{edu.school} ({edu.year})</p>
                </div>
              ))}
            </div>
            <div className="bg-[rgba(255,255,255,0.03)] p-6 rounded-xl shadow-xl border border-[rgba(255,255,255,0.06)]">
              <h3 className="text-2xl font-serif font-bold text-teal-400 mb-4 border-b border-teal-400/50 pb-2">Certifications</h3>
              <ul className="space-y-3">
                {portfolioData.certifications.map((cert, idx) => (
                  <li key={idx} className="text-moonlight-text-secondary flex items-center">
                    <span className="text-teal-500 mr-2">&#9679;</span> {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
