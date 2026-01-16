# About Me

## The Origin Story: From Business Development to Engineering

My journey into engineering wasn't a straight line—it was a pursuit of leverage. I started my career in the thick of business operations at Ford Motor Company, moving from credit analysis to business development. I saw firsthand how inefficiencies bled money, but I didn't always have the tools to fix them.

My "lightbulb moment" happened while managing pricing for captive contracts. The process was a logistical nightmare: I had to juggle **four different Excel files** (one for each market area), going back and forth with brand managers to negotiate spreads. Once approved, I had to manually key these changes into a legacy system called "Raptor." It wasn't just tedious; it was fragile. We were almost always waiting on the team before us, and funding managers were constantly frustrated by the delays.

With interest rates potentially rising, I calculated that our 30-day manual update cycle could cost us over **$2 million annually** in lost interest rate spreads. I proposed a solution to reduce this lead time, but we lacked the technical resources to execute it quickly.

That frustration became my catalyst. I realized that understanding the *business problem* was only half the battle; I needed the technical skills to build the *solution*. I started teaching myself to code—nights, weekends, diving into Java and design patterns. 

The learning curve was steep. **Recursion** was the hardest concept for me to grasp initially. It required a shift in thinking: two-level reasoning where you must consider both the current invocation and a generic invocation of the same procedure. Once I clicked that it was just about trees, sorts, and natural loops, it unlocked a new way of thinking about algorithmic problems. I built countless "instructional" repos—React frontends, Python scripts, Terraform managers—piecing together the full stack until I transitioned into a full engineering role.

Today, I’m not just an engineer who writes code; I’m a former business operator who builds systems that drive revenue and cut costs.

## Philosophy: Why "Good Enough" Isn't

There is a misconception that automation is just about saving a few minutes here and there. In reality, robust automation is about **scalability** and **compounding returns**. When you remove manual friction, you don't just save time; you enable your team to focus on higher-value problems.

I prioritize **Architecture as Code** (Terraform) because consistency is non-negotiable. I've seen the pain of "ClickOps" firsthand. When you are a tech lead, auditors and stakeholders constantly ask for roadmaps or service definitions. If your environment was built manually in the AWS console, reverse-engineering that truth is a nightmare. With Terraform, the code *is* the documentation. You can still prototype in the console, but the "definition of done" is always code.

I also believe in learning from failure. Early in my automation career, we launched a workflow that reported "Success" on every run, yet the database remained empty. It was a **silent failure**. It took us 24 hours to realize our DevOps team had failed over to `us-west-2` during an outage, while our application database was still statically configured for `us-east-1`. That lesson stuck with me: **observability is not optional**. Now, I ensure every system I build has robust logging, error handling, and "opportunity cost" calculations for every invocation.

## Core Specialization: Python Automation & Scripting

Python is my weapon of choice for connecting disparate systems. Its ecosystem—spanning `requests` and `httpx` for HTTP interactions to `pandas` for data manipulation—allows me to build powerful integration glue quickly.

Data in the real world is messy. I've tackled datasets that would make most engineers cry: dates mixed between `YYYY-MM-DD`, Excel serials, and literal text like "March 2023"; numeric fields polluted with currency symbols and "N/A" strings; columns that changed meaning based on the file version.

My approach with **Pandas** is strict schema normalization:
1.  **Explicit Types**: Define expected columns and types upfront.
2.  **Aggressive Cleaning**: Use `pd.to_datetime(..., errors="coerce")` to enforce standards, and regex to strip non-numeric noise.
3.  **Quarantine Bad Data**: Never guess. Flag and log rows that fail parsing so they can be reviewed without poisoning the dataset.

My "toolbox" relies on standard libraries like `sys`, `pathlib`, `json`, and of course `pydantic` for data validation and `dotenv` for configuration management.

## Core Specialization: AI & LLM Systems

We are past the "basic chatbot" phase of AI. I focus on building **agentic workflows** that deliver tangible business value.

I successfully implement workflows by moving beyond simple prompting. I follow the **CLEAR** framework: **C**ontext, **L**ogic, **E**xpectations, **A**ction, **R**esponse.
*   **Context Files**: I use files like `AGENTS.md` or `CLAUDE.md` to inject architecture, tech stack, and "dos/donts" into every session. This keeps the prompt focused on the task, not the setup.
*   **Stored Prompts**: Instead of stuffing massive context windows, I use stored prompts with variables. I identify the 3-4 variables that actually change (topic, audience, length) and keep the instruction evergreen.
*   **Iteration**: Ask first, plan, review, then execute. This "measure twice, cut once" approach exposes gaps in context before tokens are wasted.

One specific implementation involved solving a visibility problem. I architected a workflow that pulled status updates from GitHub/Bitbucket and milestones from Asana, then used an LLM to synthesize a "Shipped & Next Up" executive summary emailed to leadership every Friday. It wasn't just a demo; it was a production workflow that saved hours of context-switching.

## Case Study: Remote Dealership Inventory Audit (IoT & Cloud)

**The Challenge**: Ford Credit needed to audit substantial inventory across thousands of dealerships to manage risk. The traditional process involved physical audits, which were slow, expensive, and didn't provide real-time visibility.

**The Solution**: I helped lead the re-architecture of a remote inventory auditing application using vehicle telemetry.
*   **Tech Stack**: Kafka, Google Cloud Pub/Sub, Azure (IoT Hub).
*   **Architecture**: We built an event-driven system capable of ingesting **600,000+ vehicle events daily**. The challenge wasn't just volume; it was ordering. A "Location Ping" might arrive before a "Trip Started" event.
*   **Handling State**: We solved out-of-order events by partitioning Kafka by `vehicle_id` (ensuring all events for one car went to one consumer) and using stateful consumers that buffered dependent events until their prerequisites arrived.

**The Result**: The remote audit capability saved approximately **$5 million annually** in operational costs. We transformed a reactive, manual risk process into a proactive, data-driven operation.

## Case Study: Modernizing Compliance at Morningstar

**The Challenge**: At Morningstar, our compliance engine was triggered manually via Postman for each recordkeeper—over 80 individual API calls daily. It was unscalable, prone to human error, and consumed 20% of the team's weekly bandwidth.

**The Solution**: I modernized the architecture to be fully event-driven.
1.  **Smart Polling**: We reduced the scheduled run to be single-threaded but implemented a self-identifier API. Fargate tasks (ephemeral) knew *not* to poll, while our long-running EC2 instances handled the cron schedule.
2.  **Delta Detection**: We moved from simple MD5 hashes to timestamp checks, and eventually to a full database diff that only published events when data *actually* changed.
3.  **Scale**: This allowed us to handle concurrent processing without overwhelming the shared database.

**The Result**: We reduced the number of daily runs by **90%**, essentially "saving" 10 engineering hours per week. This efficiency gain allowed us to onboard **7 new enterprise recordkeepers** without adding headcount.

## How to Work With Me

I am currently open to **consulting engagements** and **contract roles** focused on:
*   **AI/LLM Integration**: Building custom agents, distinct prompt engineering, and RAG pipelines.
*   **Automation Strategy**: Auditing your current workflows and implementing Python implementation script or low-code solutions to save time.
*   **Backend Engineering**: API design, serverless architecture (AWS Lambda), and database optimization.

I work best with teams that value **clear communication**, **autonomy**, and **results**. If you have a gnarly technical problem that needs a business-minded engineer, let's connect.

[**Email Me**](mailto:wilkins507@gmail.com) • [**LinkedIn**](https://www.linkedin.com/in/collin-wilkins-1020215a/) • [**Upwork**](https://www.upwork.com/freelancers/~014ffbc17b83da9407)
