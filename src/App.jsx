import React from 'react';

const portfolioData = {
  name: "Collin Wilkins",
  headline: "Innovative Software Engineer | Cloud & Distributed Systems Specialist",
  summary: "Innovative Software Engineer with over 5 years of experience designing highly distributed, reliable cloud platforms across AWS, Azure, and GCP. Skilled in building messaging pipelines with Kafka and GCP Pub/Sub to support IoT telemetry, event-driven microservices, and real-time application messaging. Adept at improving service reliability, operational efficiency, and scalability in fast-paced, high-impact environments.",
  linkedin: "https://www.linkedin.com/in/collin-wilkins-1020215a/",
  github: "https://github.com/your-username", // replace with real GitHub
  email: "wilkins507@gmail.com",
  resume: "/Collin-Wilkins-Resume.pdf",
  skills: [
    "Python", "Java", "Kotlin", "JavaScript", "Bash", "SQL",
    "AWS", "Azure", "GCP", "PCF",
    "Kafka", "GCP Pub/Sub", "Kubernetes", "Serverless", "SQS/SNS",
    "Terraform", "Jenkins", "TLS", "VPN", "Firewalls",
    "TCP/IP", "DNS", "IAM", "OAuth", "MFA", "Zero Trust",
    "Grafana", "Splunk", "Prometheus", "CloudTrail", "SOC 2", "HIPAA", "PCI DSS",
    "MySQL", "PostgreSQL", "MongoDB", "Redis", "Firestore",
    "Linux", "Windows Server"
  ],
  experiences: [
    {
      role: "Lead Engineer",
      company: "Morningstar, Inc. — Detroit, MI",
      period: "Apr 2024 – Present",
      description: "Architected and deployed secure, cloud-native services for regulated financial clients, onboarding 23+ enterprise recordkeepers with Zero Trust models. Modernized compliance engine with AWS SQS & Lambda, improving throughput and reducing latency by 35%. Designed monitoring/alerting solutions with Grafana & Splunk to maintain 99.99% uptime."
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
  projects: [
    {
      title: "IoT Telemetry Messaging Platform",
      description: "Designed event-driven microservices using Kafka and GCP Pub/Sub to process real-time telemetry from millions of devices.",
      technologies: ["Kafka", "GCP Pub/Sub", "Kubernetes", "Serverless"],
      link: "#"
    },
    {
      title: "Cloud-Based Compliance Engine",
      description: "Modernized a compliance engine with AWS Lambda and SQS, improving throughput by 35% for financial clients.",
      technologies: ["AWS Lambda", "SQS", "Python", "Terraform"],
      link: "#"
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
    "Google Foundations of Cybersecurity (2024)"
  ]
};

const App = () => {
  return (
    <div className="bg-gray-900 text-gray-200 font-sans leading-normal tracking-wider">
      {/* Navigation */}
      <nav className="bg-gray-800 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-white text-2xl font-bold">{portfolioData.name}</a>
          <div className="space-x-4">
            <a href="#about" className="hover:text-teal-400">About</a>
            <a href="#experience" className="hover:text-teal-400">Experience</a>
            <a href="#projects" className="hover:text-teal-400">Projects</a>
            <a href="#contact" className="hover:text-teal-400">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gray-900">
        <div className="container mx-auto text-center py-20 md:py-32">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">{portfolioData.headline}</h1>
          <p className="text-lg md:text-xl text-gray-400 mt-4 max-w-3xl mx-auto">{portfolioData.summary}</p>
          <div className="mt-8">
            <a href={portfolioData.resume} target="_blank" rel="noopener noreferrer"
               className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              View My Resume
            </a>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto p-4">

        {/* About / Skills */}
        <section id="about" className="py-20">
          <h2 className="text-4xl font-bold text-center text-white mb-12">About Me</h2>
          <div className="md:flex md:items-start md:space-x-12">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold text-teal-400 mb-4">Who I Am</h3>
              <p className="text-gray-400 mb-8">{portfolioData.summary}</p>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold text-teal-400 mb-4">Technical Skills</h3>
              <div className="flex flex-wrap">
                {portfolioData.skills.map(skill => (
                  <span key={skill} className="bg-gray-700 text-teal-300 text-sm font-semibold mr-2 mb-2 px-3 py-1 rounded-full">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-20">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Professional Experience</h2>
          <div className="relative border-l-2 border-teal-500 ml-4 md:ml-0">
            {portfolioData.experiences.map((exp, idx) => (
              <div key={idx} className="mb-12 ml-8">
                <div className="absolute w-4 h-4 bg-teal-500 rounded-full -left-2 mt-1.5"></div>
                <p className="text-sm text-gray-500">{exp.period}</p>
                <h3 className="text-xl font-bold text-teal-400 mt-1">{exp.role}</h3>
                <h4 className="text-lg font-semibold text-gray-300">{exp.company}</h4>
                <p className="mt-2 text-gray-400">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Key Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project, idx) => (
              <div key={idx} className="bg-gray-800 rounded-lg p-6 hover:shadow-lg hover:shadow-teal-500/20 transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-teal-400 mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap mb-4">
                  {project.technologies.map(tech => (
                    <span key={tech} className="bg-gray-700 text-xs text-teal-300 mr-2 mb-2 px-2 py-1 rounded">{tech}</span>
                  ))}
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                   className="text-teal-400 hover:text-teal-500 font-semibold">View Project &rarr;</a>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Certifications */}
        <section id="education" className="py-20">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Education & Certifications</h2>
          <div className="md:flex md:space-x-12 justify-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h3 className="text-2xl font-semibold text-teal-400 mb-4">Education</h3>
              {portfolioData.education.map((edu, idx) => (
                <p key={idx} className="text-gray-400 mb-2">{edu.degree}, {edu.school} ({edu.year})</p>
              ))}
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold text-teal-400 mb-4">Certifications</h3>
              {portfolioData.certifications.map((cert, idx) => (
                <p key={idx} className="text-gray-400 mb-2">{cert}</p>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Contact */}
      <section id="contact" className="bg-gray-800 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            I'm currently looking for new opportunities. If you have a project in mind or just want to connect, feel free to send me a message.
          </p>
          <a href={`mailto:${portfolioData.email}`}
             className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Say Hello
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 p-4">
        <div className="container mx-auto text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} {portfolioData.name}. All Rights Reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">LinkedIn</a>
            <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
