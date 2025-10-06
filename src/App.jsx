import React from 'react';
import { Linkedin, Github, Mail, FileText, ArrowRight } from 'lucide-react';

// Define the portfolio data structure
const portfolioData = {
  name: "Collin Wilkins",
  headline: "Lead Software Engineer | Cloud & Distributed Systems Specialist",
  summary: "Lead Engineer with cross-functional roots in Sales, Operations, Risk, and Management. 5+ years of experience designing highly distributed, reliable cloud platforms across AWS, Azure, and GCP. Skilled in building messaging pipelines with AWS SQS, Kafka and GCP Pub/Sub to support IoT telemetry, event-driven microservices, and real-time application messaging. Adept at improving service reliability, operational efficiency, and scalability in fast-paced, high-impact environments.",
  aboutMe: "I build relationships, systems, and ideas; I’ve designed connected-vehicle networks, enterprise cloud platforms, and a BRMS on AWS, Azure, and GCP. I lead by building alongside others—communicating clearly, aligning teams, enabling sales, shaping go-to-market, and hitting targets. I’m seeking Engineering Management or Sales/Solutions Engineering roles. Let’s talk shop or explore fit, click one of the icons below",
  linkedin: "https://www.linkedin.com/in/collin-wilkins-1020215a/",
  github: "https://github.com/cwilkins507",
  email: "wilkins507@gmail.com",
  resume: "/Collin-Wilkins-Resume.pdf",
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

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans leading-normal tracking-wider">
      
      {/* Navigation */}
      <nav className="bg-gray-800 p-4 sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
          <a href="#" className="text-white text-2xl font-bold hover:text-teal-400 transition">{portfolioData.name}</a>
          <div className="flex space-x-4 pt-2 md:pt-0">
            <a href="#about" className="hover:text-teal-400 transition">About</a>
            <a href="#experience" className="hover:text-teal-400 transition">Experience</a>
            <a href="#projects" className="hover:text-teal-400 transition">Projects</a>
            <a href="#contact" className="hover:text-teal-400 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gray-900">
        <div className="container mx-auto text-center py-20 md:py-32 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-snug tracking-tighter">
            {portfolioData.headline}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mt-6 max-w-4xl mx-auto">
            {portfolioData.summary}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href={portfolioData.resume} target="_blank" rel="noopener noreferrer"
               className="flex items-center justify-center bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-teal-500/30">
              <FileText className="w-5 h-5 mr-2" /> View My Resume
            </a>
            <a href={`mailto:${portfolioData.email}`}
               className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-teal-300 font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 border border-gray-600">
              <Mail className="w-5 h-5 mr-2" /> Email Me
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="container mx-auto p-4 md:p-8">

        {/* About / Skills */}
        <section id="about" className="py-20">
          <h2 className="text-4xl font-bold text-center text-white mb-16">About Me</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Summary */}
            <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
              <h3 className="text-2xl font-bold text-teal-400 mb-4 border-b border-teal-400/50 pb-2">Who I Am</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">{portfolioData.aboutMe}</p>
              <div className="flex space-x-4 mt-6">
                <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition">
                  <Github className="w-6 h-6" />
                </a>
                <a href={`mailto:${portfolioData.email}`} className="text-gray-400 hover:text-teal-400 transition">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
              <h3 className="text-2xl font-bold text-teal-400 mb-4 border-b border-teal-400/50 pb-2">Technical Skills</h3>
              <div className="space-y-6">
                {Object.entries(portfolioData.skills).map(([category, skills]) => (
                  <div key={category}>
                    <h4 className="text-lg font-semibold text-teal-400 mb-3">{category}</h4>
                    <div className="flex flex-wrap gap-3">
                      {skills.map(skill => (
                        <span key={skill} className="bg-gray-700 text-teal-300 text-sm font-medium px-4 py-2 rounded-full transition duration-200 hover:bg-teal-700 hover:text-white transform hover:scale-105 shadow-md">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-20">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Professional Experience</h2>
          <div className="relative border-l-4 border-teal-500/50 ml-4 md:ml-20">
            {portfolioData.experiences.map((exp, idx) => (
              <div key={idx} className="mb-12 pl-10 md:pl-16 relative">
                {/* Timeline Dot */}
                <div className="absolute w-4 h-4 bg-teal-500 rounded-full -left-[10px] top-2 border-4 border-gray-900"></div>
                
                <p className="text-sm text-gray-500 mb-1">{exp.period}</p>
                <h3 className="text-2xl font-bold text-teal-400">{exp.role}</h3>
                <h4 className="text-lg font-semibold text-gray-300 mb-3">{exp.company}</h4>
                <p className="mt-2 text-gray-400 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Key Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {portfolioData.projects.map((project, idx) => (
              <div key={idx} className="bg-gray-800 rounded-xl p-8 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-500 border border-gray-700">
                <h3 className="text-2xl font-bold text-teal-400 mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map(tech => (
                    <span key={tech} className="bg-gray-700 text-xs text-teal-300 font-medium px-3 py-1 rounded-full">{tech}</span>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* Education & Certifications */}
        <section id="education" className="py-20">
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

      </main>

      {/* Contact */}
      <section id="contact" className="bg-gray-800 py-20 border-t border-gray-700">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">Let's Connect</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg">
            I'm currently looking for new opportunities in cloud architecture and distributed systems. Feel free to reach out if you have a project or a role in mind!
          </p>
          <a href={`mailto:${portfolioData.email}`}
             className="flex items-center justify-center w-fit mx-auto bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-10 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-xl shadow-teal-500/30 text-lg">
            <Mail className="w-5 h-5 mr-3" /> Say Hello
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 p-6 border-t border-gray-800">
        <div className="container mx-auto text-center text-gray-500 px-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} {portfolioData.name}. All Rights Reserved.</p>
          <div className="flex justify-center space-x-6 mt-3 text-lg">
            <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition" aria-label="GitHub">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
