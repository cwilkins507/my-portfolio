import React from 'react';
import { Linkedin, Github, Mail, BadgeDollarSign, ArrowRight } from 'lucide-react';

// Portfolio data
const portfolioData = {
  name: "Collin Wilkins",
  headline: "I automate the boring stuff so your team stops losing hours to spreadsheets",
  aboutMe: [
    {
      title: "How I Got Here: A $2 Million Mistake",
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
      title: "Why I Think About Money Before Code",
      content: `I'm a tech optimist and a problem-spotter. The biggest wins don't come from "Big AI" magic wands. They come from fixing the friction points that compound over time. The "death by a thousand cuts" issues. Small manual tasks that add up to massive time sinks.

If your team spends 20% of their week on repetitive clicks or manually importing contacts, you're not just losing time. You're losing the chance to focus on what actually matters.

I've inherited too many systems where the only documentation was "Steve's memory." And Steve quit. Everything I build is documented in the code itself. If I leave, the logic stays behind.

I pick reliability over trendiness. The tools I use aren't flashy, but they scale without the headaches. You only pay for what you use. No expensive servers sitting idle at 3 AM.`
    },
    {
      title: "Sales Background, Engineering Toolkit",
      content: `I spent the first half of my career in Sales and Business Development, moving through 7 states and 13 territories for Ford. I've been the "Field Rep" and I've been the "Lead Engineer."

That's the difference.

Most developers look at a Jira ticket and miss the bigger picture. There's a joke I've seen play out more times than I'd like:

An engineer designs a beautiful deck that meets all structural and safety codes. Except it has no stairs and isn't attached to the house.

When asked why, the engineer replies: "Well, that wasn't in the requirements."

I look at business processes differently. I've lived the pain of operations and manual data entry. I can tie technical architecture directly to business value. I speak Finance, I speak Sales, and I speak Python.

I've lived in Dallas, Atlanta, Denver, Nashville, Boston, Tampa, and now Detroit. I'm a generalist by choice. I can drop into any legacy system, identify the bottleneck, and ship the fix. The soundtrack? Creed and Nickelback are fine by me.`
    }
  ],
  howToWork: {
    title: "How to Work With Me",
    intro: "If your team is wasting hours on work a script could handle, I fix that. Most of my projects have been with large companies, but the problems are the same at any size—just smaller numbers.",
    steps: [
      "Discovery Call (30 minutes, free): We discuss your biggest workflow bottlenecks",
      "Automation Audit (1 week): I analyze your processes and identify savings opportunities",
      "Implementation (timeline varies): I build and deploy the solution",
      "Handoff: Complete documentation and support to ensure your team can own the system"
    ],
    services: [
      {
        name: "AI/LLM Integration",
        description: "AI that actually runs in production, not a ChatGPT wrapper that breaks after a week. I've shipped agents that handle real decisions, not just demos."
      },
      {
        name: "Automation Strategy",
        description: "I find the manual work that's eating your week and kill it. Usually Python scripts, sometimes Zapier. Whatever's simplest."
      },
      {
        name: "Backend Engineering",
        description: "APIs and infrastructure that don't fall over when traffic spikes. I use AWS Lambda because you shouldn't pay for servers sitting idle."
      }
    ],
    guarantee: "If I don't identify significant automation savings during the audit, it's free."
  },
  proofPoints: [
    {
      metric: "Hundreds of hours saved",
      problem: "A team was driving to locations to manually count inventory. We automated it so the data updates itself."
    },
    {
      metric: "90% less busywork",
      problem: "Someone was spending a full day each week running the same compliance checks by hand. Now it runs automatically."
    },
    {
      metric: "2024 Product Launch",
      problem: "Built a privacy-first tracking system for vehicle theft recovery. Security without surveillance."
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
      role: "Lead Software Engineer",
      company: "Morningstar, Inc. — Detroit, MI",
      period: "Apr 2024 – Present",
      description: "Architected and deployed secure, cloud-native services for regulated financial clients, onboarding 23 recordkeepers. Modernized compliance engine with AWS SQS & Lambda, improving throughput and reducing latency by 35%. Designed monitoring/alerting solutions with Grafana & Splunk to maintain 99.99% uptime."
    },
    {
      role: "Full Stack Software Engineer – Connected Vehicle",
      company: "Ford Motor Company — Dearborn, MI",
      period: "Feb 2021 – Apr 2024",
      description: "Built and maintained IoT microservices on Azure and GCP for real-time telemetry and OTA updates. Implemented Kafka listeners processing 600k+ vehicle events daily. Developed theft anticipation/recovery features for 2024 F-150. Migrated identity systems to ADFS & SSO and strengthened Zero Trust security. Redesigned cloud-based inventory auditing app handling 450k vehicles. Saved $5M annually."
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
      description: "Served as technical sales advisor for digital onboarding and financial planning tools across 13 dealer accounts ($75M AUM). Deployed tailored technical sales engagements and captured $10M in revenue."
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
    <div className="min-h-screen bg-[var(--color-bg)] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">

        {/* Header / Bio Section */}
        <section className="mb-24 max-w-5xl mx-auto relative overflow-hidden">
          {/* Atmospheric blur depth effect */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[480px] z-0 hidden md:block"
            style={{
              background: 'linear-gradient(135deg, var(--color-blur-primary), var(--color-blur-secondary), transparent)',
              filter: 'blur(80px)',
            }}
            aria-hidden="true"
          />
          <h1 className="text-3xl md:text-4xl font-serif font-extrabold text-[var(--color-text-primary)] mb-8 text-center relative z-10">
            {portfolioData.headline}
          </h1>

          {/* 1. Origin Story, 2. Philosophy, 3. The Moat */}
          <div className="text-base md:text-lg text-moonlight-text-secondary leading-relaxed space-y-6 text-left">
            {portfolioData.aboutMe.map((section, idx) => (
              <div key={idx} className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-text-primary)] mb-6 border-b border-[var(--color-border)] pb-2">
                  {section.title}
                </h2>
                <div className="text-base md:text-lg text-moonlight-text-secondary leading-relaxed space-y-6 text-left">
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
            <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className="text-moonlight-text-secondary hover:text-[var(--color-text-primary)] transition">
              <Linkedin className="w-8 h-8" />
            </a>
            <a href={portfolioData.upwork} target="_blank" rel="noopener noreferrer" className="text-moonlight-text-secondary hover:text-[var(--color-text-primary)] transition">
              <BadgeDollarSign className="w-8 h-8" />
            </a>
            <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="text-moonlight-text-secondary hover:text-[var(--color-text-primary)] transition">
              <Github className="w-8 h-8" />
            </a>
            <a href={`mailto:${portfolioData.email}`} className="text-moonlight-text-secondary hover:text-[var(--color-text-primary)] transition">
              <Mail className="w-8 h-8" />
            </a>
          </div>
        </section>

        {/* 4. Proof Points */}
        <section className="mb-24">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-[var(--color-text-primary)] mb-16">Proof Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {portfolioData.proofPoints.map((point, idx) => (
              <div key={idx} className="bg-[var(--color-surface)] rounded-xl p-6 border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-hover)] hover:shadow-card hover:-translate-y-0.5 will-change-transform transition-all duration-300">
                <div className="text-3xl font-bold text-[var(--color-accent)] mb-3">{point.metric}</div>
                <p className="text-moonlight-text-secondary mb-4 leading-relaxed">
                  {point.problem}
                </p>
                <a href="/case-studies" className="text-[var(--color-accent)] text-sm hover:text-[var(--color-accent-hover)] transition inline-flex items-center">
                  Read full case study <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 5. FiNimbus — Domain Expertise */}
        <section className="mb-24">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-[var(--color-text-primary)] mb-16">
            {portfolioData.finimbus.title}
          </h2>
          <div className="bg-[var(--color-surface)] rounded-xl p-8 border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-hover)] transition-all duration-300 max-w-4xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-[var(--color-text-primary)] mb-4">
              <span className="text-[var(--color-accent)]">FiNimbus</span> — AI-powered CFO for small businesses
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
              className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors font-medium inline-block mt-6"
            >
              → finimbus.com
            </a>
          </div>
        </section>

        {/* 6. How to Work With Me */}
        <section className="mb-24">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-[var(--color-text-primary)] mb-16">
            {portfolioData.howToWork.title}
          </h2>
          <div className="bg-[var(--color-surface)] p-8 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-hover)] transition-all duration-300 max-w-4xl mx-auto">
            <p className="text-lg text-moonlight-text-secondary leading-relaxed mb-8">
              {portfolioData.howToWork.intro}
            </p>

            {/* 4-Step Process */}
            <div className="mb-8">
              <h3 className="text-xl font-serif font-bold text-[var(--color-text-primary)] mb-4">How it works:</h3>
              <ol className="space-y-3 text-moonlight-text-secondary">
                {portfolioData.howToWork.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-[var(--color-text-primary)] font-bold mr-3 flex-shrink-0">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* What I Build */}
            <div className="mb-8">
              <h3 className="text-xl font-serif font-bold text-[var(--color-text-primary)] mb-4">What I build:</h3>
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
            <div className="bg-[var(--color-accent-muted)] border-l-4 border-[var(--color-accent)] p-6 rounded-r-lg mb-8">
              <p className="text-moonlight-text-secondary font-medium">
                <span className="text-[var(--color-accent)] font-bold">Guarantee:</span> {portfolioData.howToWork.guarantee}
              </p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <p className="text-moonlight-text-secondary mb-6">
                Currently accepting new projects. Tell me about the manual process that's draining your team's time, and I'll respond within 24-48 hours with next steps.
              </p>
              <a
                href="?modal=contact"
                className="inline-flex items-center justify-center bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold py-3 px-10 rounded-full transition-all duration-300 shadow-xl transform hover:scale-105"
              >
                <Mail className="w-5 h-5 mr-3" />
                Start a Conversation
              </a>
            </div>
          </div>
        </section>

        {/* 7. Technical Skills */}
        <section className="mb-24">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-[var(--color-text-primary)] mb-12">Technical Skills</h2>
          <div className="bg-[var(--color-surface)] p-8 rounded-xl shadow-xl border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-hover)] transition-all duration-300 max-w-5xl mx-auto">
            <div className="space-y-8">
              {Object.entries(portfolioData.skills).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.map(skill => (
                      <span key={skill} className="bg-[var(--color-surface)] text-[var(--color-text-secondary)] text-sm font-medium px-4 py-2 rounded-full transition duration-200 hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] transform hover:scale-105 shadow-md border border-[var(--color-border)]">
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
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-[var(--color-text-primary)] mb-16">Professional Experience</h2>
          <div className="relative border-l-4 border-[var(--color-border-hover)] ml-4 md:ml-20 max-w-4xl mx-auto">
            {portfolioData.experiences.map((exp, idx) => (
              <div key={idx} className="mb-16 pl-10 md:pl-16 relative">
                {/* Timeline Dot */}
                <div className="absolute w-4 h-4 bg-[var(--color-text-muted)] rounded-full -left-[10px] top-2 border-4 border-[var(--color-bg)]"></div>

                <p className="text-sm text-moonlight-text-muted mb-2">{exp.period}</p>
                <h3 className="text-2xl font-serif font-bold text-[var(--color-text-primary)]">{exp.role}</h3>
                <h4 className="text-lg font-semibold text-moonlight-text-secondary mb-4">{exp.company}</h4>
                <p className="text-moonlight-text-secondary leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Education & Certifications */}
        <section>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-[var(--color-text-primary)] mb-16">Education & Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="bg-[var(--color-surface)] p-6 rounded-xl shadow-xl border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-hover)] transition-all duration-300">
              <h3 className="text-2xl font-serif font-bold text-[var(--color-text-primary)] mb-4 border-b border-[var(--color-border)] pb-2">Education</h3>
              {portfolioData.education.map((edu, idx) => (
                <div key={idx} className="mb-4">
                  <p className="text-lg font-semibold text-moonlight-text-secondary">{edu.degree}</p>
                  <p className="text-moonlight-text-muted text-sm">{edu.school} ({edu.year})</p>
                </div>
              ))}
            </div>
            <div className="bg-[var(--color-surface)] p-6 rounded-xl shadow-xl border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-hover)] transition-all duration-300">
              <h3 className="text-2xl font-serif font-bold text-[var(--color-text-primary)] mb-4 border-b border-[var(--color-border)] pb-2">Certifications</h3>
              <ul className="space-y-3">
                {portfolioData.certifications.map((cert, idx) => (
                  <li key={idx} className="text-moonlight-text-secondary flex items-center">
                    <span className="text-[var(--color-text-muted)] mr-2">&#9679;</span> {cert}
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
