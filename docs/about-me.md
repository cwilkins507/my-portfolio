Q&A

## 1. The Hook / Origin Story (500+ words)
*Goal: Humanize yourself and build trust.*

**Prompts:**
- What was the first thing you ever automated?
I automated a number of Excel reports using macros that was my first entry into automation
- Why did you move from Sales/Business Development into Engineering? (The "Special Sauce": You understand the business value of code).
I really enjoy tinkering in building things at the time. There was kind of an inflection point around web 3.0 and I just had a curiosity to get back in make things that people found valuable. I enjoyed solving problems I like the continuous learning aspect technology provides, and I'm a bit of a generalist. I like to try out a bunch of different things to see where it might lead.

- Describe a "lightbulb moment" where you realized automation could save a company thousands of dollars.
There was a job that I had that I was required to update pricing for captive contracts pretty regularly (4 market areas, 22 regions, maybe once a quarter) and at the time interest rates are pretty low. It was basically CRP and there wasn't a big cost of if you missed getting your price is updated after a certain time that you might miss or lose out on any sort of interest rate spreads but right before that we were starting to project that like we might not be at 0% or near 0% forever and I saw that there was a very strong chance that like if the Fed was going to increase interest rates, it would take us probably 30 days or so with our processes to match that and at the volume that we were selling in terms of like Ford Motor Company selling vehicles and contracts, it was gonna cost us somewhere around $2 million a year, and I thought that if we could reduce our lead time to get our prices to reflect market rates even by a week or two we would save hundreds of thousands of dollars annually. I came up with an idea proposed and it was declined. We didn't have the resources or technical skills to accomplish the changes. When I was done the process took 7 days, with additional room to Improve.


**Keywords to use:** *Problem-solving, business value, engineering mindset.*

---

## 2. Philosophy: Why "Good Enough" Isn't (400+ words)
*Goal: Position yourself as an expert with high standards.*

**Prompts:**
- What do most people get wrong about AI automation? (e.g., "AI isn't a magic wand, it's a component in a pipeline").
I think people get wrong is that they think it needs to be a big problem or big challenge you can see some lifts in terms of oh I spent 1520 minutes a day doing this or Susie is importing my contacts from XYZ and spends like an hour or two a day but like you can get some really big list from small changes if I don't have to do that on a daily basis if I can remove any sort of manual entry or efforts that compounds

- Why do you prioritize "Architecture as Code" (Terraform)?
It's consistency it's you can't really argue with what's on the paper. I think we can all agree if you've ever come into a team and they had set up their product or service through the city console for one of the larger providers cloud providers. And now you need to make changes or you need to try to understand decisions how they ended up to a certain point it's really hard to do that if you don't have architecture as code.

- How do you ensure automation doesn't break? (Error handling, logging, AWS Lambda best practices).
It's the same way that you wouldn't share anything else doesn't break you start small you handle the cases once you get those you can start to expand it to other areas. You need to make sure that you have air handling logging and you need to do some calculations like for example, for using a lamb do you wanna make sure that you're getting the most out of your invocations that there aren't silent failures, or opportunity costs?

**Keywords to use:** *Robustness, scalability, precision, technical depth.*

---

## 3. Core Specialization: Python & Automation (500+ words)
*Goal: Rank for "Python Automation Scripting".*

**Content Ideas:**
- Discussion on `requests`, `beautifulsoup`, and `pandas` for data pipelines.


- Why Python is the language of choice for connecting disparate APIs.
* Extensive Libraries and Frameworks: Tools like requests, httpx, and Flask simplify HTTP interactions, while frameworks like Django REST and FastAPI streamline API development and integration. These libraries handle complex tasks such as authentication, serialization, and routing, reducing development time.
* Native Support for Data Formats: Python natively supports JSON and XML, the most common data formats used in APIs, enabling efficient data exchange and processing.
* Strong Community and Ecosystem: A vast, active community ensures continuous support, rapid problem-solving, and access to a wide range of third-party packages for almost any integration need.
* Readability and Maintainability: Clean, readable syntax allows developers to quickly understand and maintain integration code, reducing errors and accelerating team onboarding.

- Deep dive into a specific scraping challenge you solved.
Fantasy basketball is a bit newer for analysis so I solved a way to scrape box scores, apply our leagues scoring rules to identify trending and improving players before the industry matured and tools caught up

---

## 4. Core Specialization: AI & LLM Systems (500+ words)
*Goal: Rank for "LLM Prompt Engineering" and "AI Consulting".*

**Content Ideas:**
- How you use the OpenAI API (or others) beyond simple chat.
Download my 23-page article here


- Strategies for prompt engineering: chain-of-thought, few-shot prompting, and evaluation loops.




- Building agentic workflows that actually work in production (not just demos).

For example, I wrote a pretty short mom I didn't write it. I worked with Claude on it to do this, but essentially within the organizations enterprise we had some trouble with visibility so I put together a script that pulled all of our team get hub pull request. it pulled all of our big bucket request and it grabbed all of the projects and milestone statuses, etc. from Asana so I wouldn't have to go in compile all this together. I would run a script once say I wanted this information for our squad as of this da and it would generate into a template that I built with ChatGPT and email that to my boss Friday at 4 o'clock just every week on the dot a quick summary this is what we shipped. This is what we're doing next week. These are the key customer items or Business impact whatever and that would just be the update.


---

## 5. Expanded Case Study 1: [Project Name] (300+ words)
*Goal: Prove technical outcomes.*

- **Context:** The messy reality before you arrived.


- **The "Surgery":** What you actually built (tech stack: AWS Lambda, Postgres, etc.).


- **The Result:** "Saved $5M annually" — how did that feel? What was the ripple effect in the company?

Cases study one creditor dealer risk had an idea along with some others was a committee or whatever that in order to save money as opposed to going out and physically auditing determining based off of a certain ri criteria, we would try to remote the vehicle right so like four vehicles have telemetry you can ping them to try to get coordination or coordinates and at that point you could loosely Geo fence right so you could see which of those vehicles were inside a Geo fence out of the expected that would b a few years later after I had gone through the risk program and I was a software engineer I was assigned to a team called CB, which is the commercial vehicle business operations portal platform and I was assigned to that project to finish up or work on as support and that became my first project is how do we build this in a way that we could handle millions of events store information and display in a way that was easily an adjustable that you could compare say Geo fence to the vehicle coordinates of a vehicle assigned to the dealership so they would have their wholesale audits going through that way if you are familiar with this, we pretty much leverage Kafka for this we feed listeners and adjusting 600,000 or so vehicle events daily. We had to handle customer location, data and privacy requirements along with that we estimated at the end that this saved about $5 million a year to end.

• Led re-architecture of remote dealership inventory auditing application—handles vehicle-to-cloud events for 450k+ vehicles, saving $5M annually
• Built and maintained IoT microservices on Azure and GCP supporting real-time telemetry for millions of vehicles and over-the-air updates.



---

## 6. Expanded Case Study 2: [Project Name] (300+ words)
- Focus on a different skill (e.g., API integration or IoT telemetry).


- Repeat the Problem/Solution/Result framework.

let's call this case study two or whatever
I joined MorningStar to a team that essentially compares the advisors plans to their fiduciary rules, and we need to do so in a way that was going to use the same input and get the same outfit for every time for every retirement plan and every recordkeeper fund that MorningStar supported on the platform, there was a bus management rule system in place that the existing engineers had stood up, but there had some serious problems with scalability the initial design was triggered by employment so imagine a postman or an API request or curl that would send the context through API to our point, which would then trigger a job for a given fiduciary and recordkeeper combination. The team was managing this by postman with individual API calls for each one because we have to manage the throttling in the CPU utilizations to avoid bringing down the UI which shared a schema with us so if utilization spiked us or a certain point users would not be able to login and we would miss SOA's, so some things that I did first was to include some indexing to improve some of the database operations around the utilization the second was implementing a scheduler that would pull after your period of time would check the database to see how many jobs are running and basically kickoff jobs based off of the utilization remaining that we thought that we would have we leveraged AWSSQS for our messaging pole I set up a scheduled query that would calculate which record keepers had submitted a new file over the last 24 hours and send a message to the queue. 

When were being measured on performance we don't wanna spend 20% of our weekly hours on simply running the product for a couple of reasons that's time taking away from addressing technical dead featuring enhancements and it doesn't live outside of our team. No one else feels those pain points. The customer is not gonna pay you more just cause it takes your time to manually run their product. You're not gonna be devoted additional resources to your development team just so that some we can click a postman button it's completely invisible and painful. And not to do my own Horn, but the reason this wasn't solved more quickly because the infrastructure made it a challenging issue like we were running concurrently multiple. There's multiple threaded five threads for our application. There was a long running API that managed a lot of the orchestration and then each of these batch jobs were deployed as Fargate tasks so they were a funeral. We needed to figure out a way one that the concurrent threads wouldn't spin up more tasks than we expected. That was a challenging thing at the beginning to manage concurrent jobs run at the database level and two we wanted to make sure that those jobs weren't also pulling right so if you remember, we had the Q that had the messages coming in and we would have a polling system that would read message if you know jobs running less than three for example and it would read a message kick off the next job. We had a long running API that needed to manage that the task needed to know nothing about it. It wasn't gonna kick off j or anything like that so we finally got that figured out.

Our job would run overnight during off hours to avoid any of the peak utilization with our court users in North Am so what we started with was an API call for every free record keeper accommodation they were about 46 for Plainte compliance and another 46 for fun compliance so let's go at 8890 some odd individual API request so we would have to manage over course of an hour or two and we did this five days a week afterwards we saved about those 10 hours we didn't miss any runs and we didn't have to run every future accommodation because we knew which ones had actually submitted a chang. Then we took a step further we set up a full event driven architecture where the file ingestion would determine if they were a diff or a delta from the previous record. If it wouldn't would broadcast to a topic we set up a listener to the topic that would run compliance for A Plan or a fund only if there were a meaningful change from the prior record so instead of running compliance for every plan in every file every day we reduce the number of runs by say 90% what this meant is that we were able to leverage the other utilization towards more expensive features. this allow us to expand the business and on board and additional seven record keepers with the new product that we were able to support

• Lead architecture and delivery of secure, cloud-native services for regulated financial clients; enabled onboarding of 23+ enterprise recordkeepers with Zero Trust access models. • Drove modernization of compliance engine using AWS SQS, Lambda, and distributed queues— improved throughput and reduced latency by 35%.

---

## 7. How to Work With Me (200 words)
*Goal: Conversion.*

- Clearly list the types of projects you love.


- Mention Upwork, LinkedIn, and Email.


- Set expectations for how you communicate and deliver results.






Who am I 
-optimist - I try to imagine the positive outlook on every situation
-generalist - I am interested in lots of things, shiny objects, continuous learning/curious, wide skill set
-fitness enthusiast - I track my nutrition most of the time, enjoy gym 3-5 times a week, general health is important to me , dicey family history



Brief history / Background / Work
All right about me I was born in Garland, Texas in the early 90s. I have moved around quite a bit since then I have lived in seven states Texas, Georgia, Arkansas, Colorado, Tennessee, Massachusetts, Florida, and Michigan. I have spent at least 23 years in each location mostly major cities so Dallas Atlanta, Little Rock Denver, Boston, Nashville, Tampa now Detroit playing baseball growing up played baseball through high school as a pitcher and spent a couple years at Colorado University of Colorado Boulder on the club team there after they refunded the division one program I started my career at Ford Motor Company in Nashville, Tennessee in 2013 as part of a leadership development program my undergraduate background was in a dual major of financing accounting. I was planning to graduate early since I had some credits from high school and my dad convinced me at the time that it was best that I stretch it out to the 44 years and go ahead and pick up the dual degree in accounting, which was a large part of my early work career and what kind of got me into the NBA program at Lipscomb, where my concentration was in accounting the leadership development program we were taken through customer service or quote calling there was individual credit analysis so like if you were a customer applying for a loan at a Ford dealership they would send in your application to us. We would score it approved deny it, etc. and structure deal accordingly and then there was dealer credit which was basically commercial financing for Ford franchise he nor Ford dealers we would determine the line of credit that we were willing to extend to them based off of certain risk criteria that was the program rotated for a few years through that it was supposed to be three years and then I was a team lead in customer service loss prevention for about a year and a half still in Nashville after that I was promoted to be a business development manager in Boston so I moved out to the field, but I had where I was supporting 13 franchisees various of whether they were floorplan or not various consulting sales just general support type work and then I move to Tampa for a little bit where I met my wife and moved up here to Michigan with many of those I started with about 10 years ago and transitioned briefly into operations. I loved learning all right I wanted to be on what I consider the stack of company there is the team that is closest to the product which is typically your builders engineers software developers whether it's hardware software, etc. hands-on the physical or actual service and then there's the other end of the spectrum which is customer facing we typically sales your field wraps employees I learned that those are the only two things that I really enjoy somewhere in the middle in terms of operations or middle management really didn't interest me all that much I got bored pretty quickly at the time there weren't any sales positions opening up I tried to apply to some jobs in tech sales and most of them wanted as you guessed tech sales experie so around that time I started thinking that OK if they want technical experience, I should get the technical aspect of it to teach myself how to code using the head first by O'Reilly. They have a Java book that I have a JavaScript programming, design patterns HD LNCSS or the primary ones at the same time Ford was offering a skiing program for those that were interested in learning to Code I was selected that was several years ago now I have been on the technical engineering side as a full stack engineer has it as a junior as a senior now I'm a lead engineer technically still full tax stack, but primarily backend around systems design database optimization backend services like Java, etc. so let's take a moment of kind of an aha or full circle moment when I was in dealer, 



School
CU - Boulder ; Go Buffs. Undergrad in Finance and Accounting ; unique non-technical background (tho a lot of those skills translate to engineering : structured problem solving, systems thinking, precision/attention to detail, logic rules and constraints, modeling, working with ambiguity, risk management, documentation & communication, process, ethics)



Branching into software 


Ford 
Ask me if you need more

Morningstar
Ask me if you need more



Why Now?
- Stuck in the trap of “ I need to learn X, Y, or Z to become a better Software Engineer”
- Realized that having experience DOING the actions I am now automating is a mote, shared pain. Tie technical needs to business value
- Gained confidence, really good at this; Tring to learn more, find and solve more problems, freelance 
- Agentic workflows / automation right in my wheel house


MISC facts
Meyers Briggs:
INTJ / borderline ENTJ

I like country music and 2000s rock. Creed and Nickelback are ok by me, was the first concert and most recent concert I attended (20 years apart)

Favorite authors are Terry Brooks (Shannara Series), Will Wight (Cradle +), Tolkien (LOTR), and Chris Ruocchio (Sun Eater Series)
I read non-fiction too, went thru my own self-help phase / biographies 