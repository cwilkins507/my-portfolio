import React from 'react';
import { Linkedin, Github, Mail, BadgeDollarSign } from 'lucide-react';

// Portfolio data
const portfolioData = {
  name: "Collin Wilkins",
  headline: "Lead Software Engineer | Cloud & Distributed Systems Specialist",
  aboutMe: [
    {
      title: "The $2 Million Aha Moment: Why I Code for ROI",
      content: `Most engineers start their story with a "Hello World" script. Mine starts with a $2 million liability.

In 2019, while working in Finance at Ford Motor Company, I noticed a hitch in the machine. We had interest rate spreads that needed daily updates across dozens of regions and thousands of contracts. This was during the end of ZIRP and we held our breaths each time the Fed announced a meeting.

Our manual lead time? 30 days.

I did the math: if the Fed hiked rates after each meeting, that 30-day lag could cost us roughly $2 million annually.

I proposed an automated fix. The response? "We don't have the technical resources or skills to do that."

So, I built what I could myself (with the skills I had at the time). I cut that 30-day lead time down to about a week. 

That was my inflection point. 

I realized that code is a high-leverage business tool. Another hat to wear for the generalist. 

I focus on building systems that solve expensive problems and reclaim thousands of wasted human hours.`
    },
    {
      title: "Philosophy: Engineering as a Profit Center",
      content: `I am a Tech Optimist and an Opportunist. I believe the biggest lifts in a company don’t come from "Big AI" magic wands, but from removing the friction points that compound over time. Solve the "death by thousand cuts" issues.

If your team is spending 20% of their week clicking "Run" on a Postman collection or manually importing contacts, you aren't just losing time—you're losing the opportunity to innovate.

My Precision Stack:
- Infrastructure and Architecture as Code (Terraform): Consistency is non-negotiable. If it isn't "on the paper" (in code), it doesn't exist. I build systems that are documented by their own existence, ensuring that if I (or any engineer) leave, the logic remains.
- Robustness over "Shiny": I handle the edge cases, the silent failures, and the opportunity costs. I use AWS Lambda and distributed queues (SQS) not because they're trendy, but because they scale without breaking the UI—and the budget.`
    },
    {
      title: "The Special Sauce: From the Field to the Terminal",
      content: `I spent the first half of my career in Sales and Business Development (moving through 7 states and 13 territories for Ford). I’ve been the "Field Rep" and I’ve been the "Lead Engineer."

This is my mote.

Most developers look at a Jira ticket. Don't see the forest for the trees. 

There's a common joke (and in my experience it exists for a reason) 

An engineer designs a beautiful deck that meets all structural and safety codes—except it has no stairs and isn’t attached to the house. 

When asked why, the engineer replies: "Well, that wasn’t in the requirements."

I look at a business process. Because I’ve lived the "shared pain" of operations and manual data entry, I can tie technical architecture directly to business value. I speak Finance, I speak Sales, and I speak Python.`
    },
    {
      title: "Core Specialization: Python & Agentic Workflows",
      content: `I specialize in Python Automation Scripting and AI/LLM Systems. I don't just use OpenAI for chat. I build production-ready agentic workflows. 
      
      One of my recent scripts pulled GitHub PRs, Bitbucket requests, and Asana milestones across an entire enterprise squad—generating a comprehensive summary of business impact and shipping it to leadership every Friday at 4 PM on the dot.

It didn't just "save time"—it provided vertical visibility that didn't exist before.

Key Tools:
- Data Pipelines: requests, beautifulsoup, pandas.
- Backend Services: Java, Spring Boot, Postgres.
- Cloud Infrastructure: AWS (Lambda, SQS, Fargate), Azure, GCP.`
    },
    {
      title: "Case Study: Remote Dealership Inventory Audit (IoT & Cloud)",
      content: `The Challenge: Ford Credit faced a massive operational bottleneck: auditing floorplan inventory across thousands of North American dealerships. Traditionally, this was a manual, reactive risk-management process. Auditors would physically visit lots to verify vehicle presence, a method that was slow, prone to human error, and lacked the real-time visibility required in a high-interest-rate environment.

The Technical Solution: I led the re-architecture of this audit process into a remote, telemetry-driven platform. We built high-scale IoT microservices using Kafka, Google Cloud Pub/Sub, and Azure IoT Hub.

The Ingestion Challenge: The system was designed to ingest over 600,000 vehicle events daily. Handling this volume was only half the battle; the real complexity lay in event ordering. In a distributed IoT environment, we implemented a sophisticated state management layer:
1. Kafka Partitioning: We partitioned streams by vehicle_id to ensure all events for a specific car were processed chronologically.
2. Stateful Buffering: We utilized stateful consumers that buffered dependent events, ensuring data integrity before committing to the durable store.

The Result: The shift to remote auditing transformed a reactive risk process into a proactive, data-driven operation. By automating the verification of 450,000+ vehicles, we saved approximately $5 million annually in operational costs and interest rate carry.`
    },
    {
      title: "Case Study: Modernizing Compliance at Morningstar",
      content: `The Challenge: I joined a team responsible for ensuring retirement plan advisors remained compliant with Fiduciary rules. Our compliance engine was mission-critical, yet its operation was surprisingly manual. 
      
      Every day, engineers had to trigger individual compliance runs for over 80 recordkeeper plan and fund combinations via Postman. This consumed 20% of our team's weekly bandwidth and was a single point of failure.

The Solution: I modernized the architecture to be fully event-driven and "smart" about resource utilization.
1. Smart Polling & Scheduling: I implemented a scheduler that monitored database load and remaining capacity before kicking off new jobs via AWS SQS and ephemeral AWS Fargate tasks.
2. Delta Detection: I evolved our "change detection" logic from simple timestamp checks to a robust database diffing system. We only published events when a meaningful delta was detected.

The Result: This transformation reduced the number of daily compliance runs by 90%, saving 10 engineering hours every week. More importantly, it allowed us to onboard 7 new enterprise recordkeepers with zero added overhead, improving throughput and reducing latency by 35%.`
    },
    {
      title: "Case Study: Stolen Vehicle Services for 2024 Ford F-150",
      content: `The Challenge: As part of the Connected Vehicle team at Ford, I was tasked with helping build theft anticipation and recovery features for the 2024 F-150. These services require a delicate balance of real-time telemetry, user privacy, and high-availability messaging.

The Technical Solution: I built a cloud-integrated telemetry system that leveraged GCP Pub/Sub and Kafka for real-time risk scoring and theft recovery.
1. Privacy-First Architecture: Handling customer location data requires strict adherence to privacy laws. I architected a Zero Trust ingestion layer where all telemetry was anonymized at the point of entry, with PII encrypted in a secure vault reachable only via ephemeral tokens during an active recovery event.
2. Adaptive Recovery Mode: When a theft is reported, the system transitions the onboard modem into a high-frequency mode, increasing the ingestion rate from minutes to seconds while managing cellular costs and battery drain.

The Result: The system was successfully integrated into the 2024 F-150 launch, providing owners with a robust, cloud-backed theft recovery solution. It demonstrated how agentic IoT telemetry can move beyond simple data collection to active, real-time protection.`
    },
    {
      title: "Behind the Code: Discipline and Context",
      content: `I’m an INTJ with a relentless focus on continuous learning.

- Consistency: I’ve tracked my nutrition and hit the gym 3-5 times a week for the last 8 years. I apply that same "incremental gains" mindset to my codebases.
- Adaptability: I’ve lived in Dallas, Atlanta, Denver, Boston, and now Detroit. I am a generalist by choice—meaning I can drop into any legacy system, find the value, and fix the leak.
- The Soundtrack: I work to a mix of country music and 2000s rock. Creed and Nickelback are ok by me.`
    },
    {
      title: "How to Work With Me",
      content: `I take on high-stakes consulting projects and custom automation builds. If you have a process that is "good enough" but costs you thousands in manual effort, let’s talk.

- AI/LLM Integration: Building custom agents, distinct prompt engineering, and RAG pipelines.
- Automation Strategy: Auditing your current workflows and implementing Python implementation scripts or low-code solutions to save time.
- Backend Engineering: API design, serverless architecture (AWS Lambda), and database optimization.

I work best with teams that value clear communication, autonomy, and results. Let's connect.`
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

// Placeholder testimonials
const testimonials = [
  {
    name: "Jordan Martinez",
    role: "Engineering Manager, Cloud Platform",
    initials: "JM",
    text: "Outstanding engineer who bridges technical excellence with business value. Collin consistently delivers scalable solutions that move the needle.",
    color: "bg-teal-600"
  },
  {
    name: "Sarah Chen",
    role: "Director of Product",
    initials: "SC",
    text: "Rare combination of deep technical skills and clear communication. Collin translates complex architectures into outcomes stakeholders understand.",
    color: "bg-teal-500"
  },
  {
    name: "Alex Thompson",
    role: "Principal Architect",
    initials: "AT",
    text: "Reliable, thoughtful, and results-driven. Collin brings both engineering rigor and strategic thinking to every project.",
    color: "bg-teal-700"
  }
];

const About = () => {
  React.useEffect(() => {
    document.title = "About Collin Wilkins | AI & Automation Expert";
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">

        {/* Header / Bio Section */}
        <section className="mb-24 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-8 text-center">
            {portfolioData.headline}
          </h1>
          <div className="text-lg md:text-xl text-gray-300 leading-relaxed space-y-6 text-left">
            {portfolioData.aboutMe.map((section, idx) => (
              <div key={idx} className="mb-12">
                <h2 className="text-3xl font-bold text-teal-400 mb-6 border-b border-teal-500/20 pb-2">
                  {section.title}
                </h2>
                <div className="text-lg md:text-xl text-gray-300 leading-relaxed space-y-6 text-left">
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
            <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition">
              <Linkedin className="w-8 h-8" />
            </a>
            <a href={portfolioData.upwork} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition">
              <BadgeDollarSign className="w-8 h-8" />
            </a>
            <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition">
              <Github className="w-8 h-8" />
            </a>
            <a href={`mailto:${portfolioData.email}`} className="text-gray-400 hover:text-teal-400 transition">
              <Mail className="w-8 h-8" />
            </a>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-center text-white mb-12">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
                <div className="flex items-center mb-4">
                  <div className={`${testimonial.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 flex-shrink-0`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic leading-relaxed">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Technical Skills</h2>
          <div className="bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700 max-w-5xl mx-auto">
            <div className="space-y-8">
              {Object.entries(portfolioData.skills).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="text-xl font-semibold text-teal-400 mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.map(skill => (
                      <span key={skill} className="bg-gray-700 text-teal-300 text-sm font-medium px-4 py-2 rounded-full transition duration-200 hover:bg-teal-700 hover:text-white transform hover:scale-105 shadow-md">
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
          <h2 className="text-4xl font-bold text-center text-white mb-16">Professional Experience</h2>
          <div className="relative border-l-4 border-teal-500/50 ml-4 md:ml-20 max-w-4xl mx-auto">
            {portfolioData.experiences.map((exp, idx) => (
              <div key={idx} className="mb-16 pl-10 md:pl-16 relative">
                {/* Timeline Dot */}
                <div className="absolute w-4 h-4 bg-teal-500 rounded-full -left-[10px] top-2 border-4 border-gray-900"></div>

                <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                <h3 className="text-2xl font-bold text-teal-400">{exp.role}</h3>
                <h4 className="text-lg font-semibold text-gray-300 mb-4">{exp.company}</h4>
                <p className="text-gray-400 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Key Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {portfolioData.projects.map((project, idx) => (
              <div key={idx} className="bg-gray-800 rounded-xl p-8 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-500 border border-gray-700">
                <h3 className="text-2xl font-bold text-teal-400 mb-4">{project.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span key={tech} className="bg-gray-700 text-xs text-teal-300 font-medium px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Certifications */}
        <section>
          <h2 className="text-4xl font-bold text-center text-white mb-16">Education & Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
              <h3 className="text-2xl font-bold text-teal-400 mb-4 border-b border-teal-400/50 pb-2">Education</h3>
              {portfolioData.education.map((edu, idx) => (
                <div key={idx} className="mb-4">
                  <p className="text-lg font-semibold text-gray-300">{edu.degree}</p>
                  <p className="text-gray-400 text-sm">{edu.school} ({edu.year})</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
              <h3 className="text-2xl font-bold text-teal-400 mb-4 border-b border-teal-400/50 pb-2">Certifications</h3>
              <ul className="space-y-3">
                {portfolioData.certifications.map((cert, idx) => (
                  <li key={idx} className="text-gray-400 flex items-center">
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
