import React from 'react';
import { Linkedin, Github, Mail, BadgeDollarSign } from 'lucide-react';

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

I look at business processes differently. I've lived the pain of operations and manual data entry. I can tie technical architecture directly to business value. I speak Finance, I speak Sales, and I speak Python.`
    },
    {
      title: "Core Specialization: Python & Agentic Workflows",
      content: `I specialize in Python automation and AI/LLM systems. I build production-ready agentic workflows using LLMs. Not just chat demos, but systems that run reliably at scale.

One of my recent scripts pulled GitHub PRs, Bitbucket requests, and Asana milestones across an entire enterprise squad. Generated a summary of business impact and shipped it to leadership every Friday at 4 PM sharp.

It didn't just save time. It gave leadership real-time insight into what 12 engineering teams were shipping, without scheduling a single status meeting.

Key Tools:
- Data Pipelines: requests, beautifulsoup, pandas
- Backend Services: Java, Spring Boot, Postgres
- Cloud Infrastructure: AWS (Lambda, SQS, Fargate), Azure, GCP`
    },
    {
      title: "Case Study: Remote Dealership Inventory Audit (IoT & Cloud)",
      content: `The problem: Ford Credit was spending millions on slow, manual vehicle audits. Auditors drove hundreds of miles to physically count cars at dealerships, discovering discrepancies weeks after the financial impact. In a rising interest rate environment, this lag was expensive.

What we built: An IoT telemetry platform that automated verification for 450,000+ vehicles, saving around $5 million annually in operational costs and interest rate carry. What used to take weeks now happens in real-time.

How it works: I led the architecture of a high-scale event-driven system using Kafka, Google Cloud Pub/Sub, and Azure IoT Hub. The system ingests 600,000+ vehicle events daily with state management to ensure data integrity in a distributed environment. Handles out-of-order events through Kafka partitioning by vehicle_id and stateful buffering.`
    },
    {
      title: "Case Study: Modernizing Compliance at Morningstar",
      content: `The problem: Every morning started the same way. An engineer clicking through 80 Postman requests to trigger compliance checks. One by one, like a human cron job. This ate up 20% of our team's weekly bandwidth. When someone got sick for a week, compliance checks just... stopped. That's when we knew we had to automate.

What we built: I transformed the architecture to fully event-driven, reducing daily compliance runs by 90% and freeing up 10 engineering hours every week. This let us onboard 7 new enterprise recordkeepers with zero added overhead while improving throughput and reducing latency by 35%.

How it works: I implemented load-aware scheduling that monitors database capacity before kicking off new jobs via AWS SQS and ephemeral Fargate tasks. Instead of blindly running all checks daily, the system uses database diffing to detect meaningful changes and only publishes events when there's actually a delta. Smart resource utilization that scales.`
    },
    {
      title: "Case Study: Stolen Vehicle Services for 2024 Ford F-150",
      content: `The problem: The Ford F-150 is America's best-selling truck. Also its most stolen. Owners needed real-time protection, but tracking vehicles raises serious privacy concerns. We had to balance theft recovery capability with strict data privacy compliance.

What we built: A privacy-first telemetry system now deployed in thousands of 2024 F-150s, providing owners with cloud-backed theft recovery. When a theft is reported, the system automatically increases tracking frequency to help police recover the vehicle faster.

How it works: I architected a Zero Trust ingestion layer using GCP Pub/Sub and Kafka where all telemetry is anonymized at entry, with PII encrypted in a secure vault accessible only via ephemeral tokens during active recovery. The adaptive recovery mode transitions the vehicle's modem to high-frequency reporting when theft is detected, balancing recovery speed with cellular costs and battery drain.`
    },
    {
      title: "Behind the Code: Discipline and Context",
      content: `I'm an INTJ with a focus on continuous learning.

Consistency: I track my nutrition and hit the gym 3-5 times a week. I apply that same "incremental gains" mindset to my codebases.

Adaptability: I've lived in Dallas, Atlanta, Denver, Nashville, Boston, Tampa, and now Detroit. I'm a generalist by choice. I can drop into any legacy system, identify the bottleneck, and ship the fix.

The Soundtrack: I work to a mix of country music and 2000s rock. Creed and Nickelback are fine by me.`
    },
    {
      title: "How to Work With Me",
      content: `I help companies eliminate expensive manual processes through custom automation. If your team is wasting hours on work a script could handle, I can help.

How it works:

1. Discovery Call (30 minutes, free): We discuss your biggest workflow bottlenecks
2. Automation Audit (1 week): I analyze your processes and identify savings opportunities
3. Implementation (timeline varies): I build and deploy the solution
4. Handoff: Complete documentation and support to ensure your team can own the system

What I build:

AI/LLM Integration: Custom agents that handle repetitive analysis and decision-making tasks, freeing your team for high-value work. I build production-ready agentic workflows, not just demos.

Automation Strategy: I audit your workflows, identify the highest-ROI automation opportunities, and implement Python scripts or low-code solutions that save thousands of hours annually.

Backend Engineering: Scalable API design, serverless architecture (AWS Lambda), and database optimization for systems that handle real production load.

Guarantee: If I don't identify significant automation savings during the audit, it's free.

Currently accepting new projects. Email me at wilkins507@gmail.com with the manual process that's draining your team's time, and I'll respond within 24-48 hours with next steps.`
    }
  ],
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
  projects: [
    {
      title: "Remote Dealership Inventory Audit Platform",
      description: "Redesigned cloud-based inventory auditing; processed vehicle-to-cloud events for 450,000+ vehicles and delivered $5M+ annual savings.",
      technologies: ["Event-Driven Architecture", "Cloud Messaging", "IoT Telemetry"],
    },
    {
      title: "Stolen Vehicle Services for 2024 Ford F-150",
      description: "Built theft anticipation and recovery features using cloud-integrated telemetry and real-time messaging.",
      technologies: ["GCP Pub/Sub", "Kafka", "Real-Time Messaging", "Telemetry"],
    },
    {
      title: "Event-Driven Compliance Engine (AWS)",
      description: "Redesigned a compliance engine to event-driven architecture, improving throughput and reducing latency by 35%.",
      technologies: ["AWS SQS", "AWS Lambda", "Distributed Queues", "Event-Driven Architecture", "BRMS"],
    },
    {
      title: "Terraform-Backed CI/CD Acceleration",
      description: "Implemented CI/CD pipelines with Terraform, increasing deployment frequency by 40%.",
      technologies: ["Terraform", "CI/CD", "CodePipeline"],
    },
    {
      title: "Identity Modernization to ADFS + SSO (Zero Trust)",
      description: "Migrated identity systems to Microsoft ADFS and SSO, streamlining authentication and aligning with Zero Trust.",
      technologies: ["Microsoft ADFS", "SSO", "Zero Trust"],
    }
  ],
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


        {/* Technical Skills */}
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

        {/* Experience */}
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

        {/* Projects */}
        <section className="mb-24">
          <h2 className="text-4xl font-serif font-bold text-center text-white mb-16">Key Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {portfolioData.projects.map((project, idx) => (
              <div key={idx} className="bg-[rgba(255,255,255,0.03)] rounded-xl p-8 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-500 border border-[rgba(255,255,255,0.06)]">
                <h3 className="text-2xl font-serif font-bold text-teal-400 mb-4">{project.title}</h3>
                <p className="text-moonlight-text-secondary mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span key={tech} className="bg-zinc-900 text-xs text-teal-300 font-medium px-3 py-1 rounded-full border border-[rgba(255,255,255,0.06)]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What I'm Building Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-serif font-bold text-center text-white mb-16">
            What I'm Building
          </h2>

          <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-8 border border-[rgba(255,255,255,0.06)]">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              <span className="text-teal-400">FiNimbus</span> — AI-powered CFO for small businesses.
            </h3>

            <div className="space-y-4 text-moonlight-text-secondary leading-relaxed">
              <p>
                At Ford Credit, I analyzed hundreds of financial statements from dealerships on our floor plan and small businesses applying for lines of credit. You start to see patterns. The best-performing dealerships weren't tracking more metrics—they were focused on fewer, and they understood exactly what those numbers meant for their next move. Meanwhile, I watched lenders approve or deny credit based on the same handful of drivers, over and over.
              </p>

              <p>
                Most small business owners have financial statements they don't understand. They see numbers but don't know what those numbers are telling them to <em>do</em>. So they either ignore the reports, pay someone to translate, or fly blind until a lender or accountant delivers bad news.
              </p>

              <p>
                FiNimbus fixes that. It takes your financials and translates them into the key drivers that actually matter—the same ones I watched separate thriving businesses from struggling ones, the same ones lenders use to evaluate your creditworthiness. Not another dashboard. Not forecasts. Just clear, plain-language answers: here's what's happening, here's why, here's what to do about it.
              </p>

              <p className="font-medium">
                Financial clarity, instantly.
              </p>
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

        {/* Education & Certifications */}
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
