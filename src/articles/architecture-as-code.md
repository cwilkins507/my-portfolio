---
title: "Architecture as Code: Why Tech Leaders and Engineers Should Adopt Diagrams‑as‑Code Now"
date: "2025-10-23"
tags: ["Architecture as Code", "Software Engineering", "Developer Tools", "Diagrams", "System Design"]
excerpt: "AI now writes a large share of new code. Stand out with Architecture as Code—pros, cons, tools, and a simple adoption plan for leaders, engineers, and recruiters."
seo_title: "Architecture as Code: Diagrams-as-Code Adoption Guide"
meta_description: "Adopt architecture as code with diagrams-as-code tools. Learn the pros, cons, and tools for version-controlled architecture diagrams that keep up with your codebase."
target_keywords: "architecture as code, diagrams as code, architecture documentation, system design diagrams, Structurizr, Mermaid diagrams"
---

# Architecture as Code: The Senior Engineer's Edge in an AI Era #
We live in a world of AI. New model update every two weeks, the countdown until the death of the software engineer creeping ever closer. So you can stop reading here.

## Why It Matters for Tech Leadership, Engineers, and Recruiters ##
AI trend: At large enterprises, AI pair programmers now author a material share of net‑new code. GitHub (Microsoft) reports developers accept roughly 30-40% of Copilot suggestions on average, with some languages and teams exceeding 50%. AWS customers using CodeWhisperer report ~57% faster task completion in controlled benchmarks. Net: double‑digit percentages of new production code at big companies are already machine‑generated—and that share is rising—especially in boilerplate‑heavy stacks such as AWS, Microsoft, others.

But writing code is just a small part of software, and the portion that least differentiates engineers. Yes, people will argue about clean code, variable naming, which languages are best. If you can master one of the primary enterprise back-end languages (Java/Kotlin, C++, Go, Ruby), a front end language (JavaScript or TypeScript), and SQL then you have the basic tools you need to be considered full-stack. LLMs are pretty good at generating text, code is a language, and it's the exact type of content purposed for AI. Now what?

The job of a senior level software engineer (or manager) is to raise the gaze beyond the microservice or JIRA ticket you are currently working on. How should an application flow, what do users expect (requirements), what is the impact on other portions of the business if you make certain decisions? Tradeoffs.

This isn't a new concept, but it becomes more important — Architecture diagrams as code.

I had a conversation with our principal architect last week and our teams are moving away from visual diagrams such as Gliffy, Miro, or Visio towards text based diagrams such as PlantUML or Mermaid. Each has their place. If you're presenting to key decision makers or non-technical folks, the visual based diagram is going to be a better fit for your audience. But for technical documents and flow diagrams, text-based proves superior. You can easily embed these in wikis or commit to code in GitHub/BitBucket.

## Pros and Cons of Diagrams‑as‑Code ##
Pros

- Plain text that diffs cleanly, which makes pull request reviews straightforward.

- Full version control and change management out of the box — history, blame, and rollback all just work.

- LLMs and scripts can modify, generate, or interpret them. Fits naturally into "docs‑as‑code."

- No vendor lock-in. PlantUML, Mermaid, Graphviz, and the C4 model are all portable and open.

- CI/CD can auto‑render PNG/SVG/PDF on commit, so your wikis and runbooks stay current without manual effort.

- Co‑located with code, which means diagrams evolve alongside the system (less diagram rot).

- Searchable and greppable. When you refactor a service name, you can find it in your diagrams too.

- You can lint and validate them — enforce naming conventions, boundary rules, and C4 levels programmatically.

- Every change is traceable to a ticket or ADR, which simplifies governance and audits.

- A clear hiring signal: recruiters and managers can inspect design artifacts right alongside the code.

Cons

- The default output isn't pretty. Theming and spacing take real effort to get right.

- There's a learning curve (PlantUML, Mermaid, and C4 each have their own syntax quirks).

- Non‑technical audiences often prefer polished visuals, so these won't replace your executive slide decks.

- Toolchain friction is real — local renderers, CI renderers, fonts, and Graphviz versions can all drift apart.

- Large diagrams get unreadable fast. You need discipline to modularize into separate views.

- Real‑time collaboration doesn't match whiteboards or Miro for early-stage ideation.

- Without wiring diagrams into the dev workflow, they go stale and start misleading people.

- Internal topology could leak if repos or artifacts are exposed. Treat diagram source like you treat code.

- Accessibility (color, contrast) suffers unless you pay explicit attention to it.

## Examples and Workflow ##

a CRUD case for example

Diagram with User (API call) to console (front-end) which calls back-end service connected to DB. Hosted on AWS, chosen just because its 30% of the market.


### PlantUML ###


![PlantUML diagram example](/images/PlantUML-example.png)

You can copy this code into any [PlantUML viewer](//www.plantuml.com/plantuml/png/VLLDKzim4BthL-o40p0j4EB2a1uwXDW6EXJIE1aklSYs22gsv6fbQEZqltVb3pSkq0nZxDst-_QzbPDJjDpOCi-ObJOJC9qlVPWKHIOJRgLMC379lRGYiQKHi7EXqOeKNFmsscLi6yup7VCCqAupgLOC7wGgkE4vn3nvM1bTgdIgCsrWAwm-6mX3NRbQ4Uil1d3s0dyIZiE9osYJ2jD4Hzuez0AAXbhP9dPOVPfO99y577wWftdTp2XXu738VczGyyHgymPjE1uFXttQDjgZVNA-zBgctFAOetYhSNWK7BtUkDScqNcXbL3szJx1IJWCWt_xUDxnyNHAVLYjROcacYEKz9-nlrOFQ74mpNIP3boQFs7r05lKr0l75INzRHI4XYGBbS9KAzIP-APsve98u02YsMItQdFNODhfgZQmeMHmAs8uC_g9ngagulgUO3HoZyy9TgqYOHvbukYYmj3P8htQaLxhLEn_HvZCBcjoTzB-orqTwdaGBLnDBRkGBNEtj87Vt16ZCsdkHyJchnNFjNzMKwLnjyV-qAxWKjqPZjQKrSlIsbj5QRO97TlHozacEN_M2Y8FtjLhgUnseYstCW7tnf7ucXwz5-N46qn7S41ND-uLp-EKKpafxTUwejAAD_ZxOgc-DQDTGwE_YLRcaNtR9DeAmnFtNO7C7JROs_lKRXS-maoOEsroX6e9ZvB3yfArQGT5Zr1NcgSahvQCqWeYGs6nXwIb4JGIYg0NYyMC_FzH2hG8E-V1uZtCRY9tNTB53ww2HR3BN0cLjkAfFFWf4hf3Y4kKIY12fbSowP1fJA2ve74ERerqGES4et0t0gLfmGhXQodCcfwmp2ow3dtj7UvpT7DDmo9vZgAlgQoHliGYusk4iY2BHLePxUprHP7fTUvMPKJ6dSqaD-LuJw3C2G2o5sHro79U56xVh7iTz_SRWxilRjQ-BPJQi6LUAgIiqqc9Ri-K-S8LNr5fl6Rib0hTRyKV) or .puml file.

Also here's a link to the [documentation](https://crashedmind.github.io/PlantUMLHitchhikersGuide/)

### Mermaid ###

![Mermaid diagram example](/images/Mermaid-example.png)


You can render this directly in:

Markdown files (GitHub, GitLab, Obsidian, Notion, etc.)

Static site generators like Docusaurus or Astro (just use ```mermaid blocks)

In-browser visualizers like [Mermaid Live Editor](https://mermaid.live/edit#pako:eNqdVl1v6jgQ_StWqiu1WmgJED6yqyuRL21X7d2KFFXaZR-cxIC3Ic61nVJu6X_fcRwCofQ-bJ6M58yZmeMZmzcjZgkxbOPLFzR5Ctuh3KYkQe505qFJnqMJj1dUklgWnKDLe8LXmCZX82yRsk28wlyiR2-eIfiAoN1uo0cqU6JW9S7QIjdlRYL87IVylq1JJrVVFNGS43ylMH_PjfNI4x8NVt9hBcQBICTJksNmzRf4QLe3I5dlgkFWl1OCY4luUPgwuWrwqm9igs8TiZDD2UYQDoCjeI04jTQcHD-fz8JRWVRmFBL-QmNIIsw5zZbIYUyl8g3kv_5XoMnD7ceUHJVSeRZTP3xUmAbk85w8LHGEBTmTlOcA596O7vC2rLQZ1zWr05h6IeTobTO8Zp7zMXgj6G224FhIXpTdciZ0CaiYT8CnGYQ9hVvjHyyDNfpF90V5or9F_ObrZSixpDH6nQkJan6Uzne7VSRYQQ2-qyq5w-sowZoB1PzcHQo_JNBUQXvXClbnenX-ZI5UqgZkBq0F1UvCoRcpsNezMoOIs6rx2u2vuwfCF4yvhZ7GF4rR7HYHbXpCCGOa0hiXXAGMpTgwTsyS6I7hRCChFcNCECl2oGoDc4-fSdmFKMZpCnbH1HZH2_1XEhcSIFEhaEaEQClb0nin5G0AYcYScfPEqQInoNIO2kkj3D0CjjwT6HtB-BZxIopUfgy4R_0R_vlNgXIYYiJ0_Ud5e1TkKd4KVOQQDK4uHXJ2IpJH8pRt1X0CXGkplljRXKDLBIsVSa4OogU-al8Ds-oN4GPZQSunMk0LSEwZ6uI9R1vucYaX4BVtd6ptTrJQt6ua_TpWnMJxeGSBMBzbgqapfRF0gl4wbsFosGdiX3R73aDnVz_bG5rIld3NX1sxSxm3L0zTbC1gKNobQpcraUcsTX494U7VjO_ZR8E4mNTsjuM0qc3PqTPoRZyeki_2l6zm90eQv1_z93qDgeseMZ66R9Xt-P-8k_0QVsUFgeVbtXsQjMedzk_cqbqD9qEnIHP3ILs_cqzhT3xheFktqg50Nu5GPZ_njujwPsL8bjUxEUdRyocT-uJ4C3pz0Xj19Db0ZXT8Culd6Mmk8Q7o7fLm1bUfb890SfPMaBlLThPDhsuZtIy1fvPhL8Kbgs8NuSJruLBtWCaYP8-NefYOPjnO_mJsvXfjrFiuDHuBUwG_9HB6FMNDsK53OSRMuMuKTBq2ZfVLEsN-M14N2xxdW2Or3zd7Zncw6A77g5axBZR53bM6nf5oOOgMLWvYfW8ZP8qwnetRf9QbjocgvmWZg5H1_h_kaKfs)

To learn more, visit the [documentation](https://mermaid.js.org/intro/)

### Miro ###

This demo was created using the free, single-user version of Miro so please excuse the lack of visual detail. Updating the diagram is cumbersome: any change requires reopening Miro, manually editing the content, and potentially granting other users access. Unlike text-based diagrams, there's no version-controlled, automated way to propagate updates.

![Miro diagram example](/images/Miro-example.png)


---


**Diagramming tools like Miro, Gliffy, or Visio** give you richer visual polish and an intuitive drag-and-drop experience, but they drift out of sync with the code they describe. **Architecture-as-Code approaches** — PlantUML or Mermaid — sacrifice some design flair for **precision, version control, and automation**. There's a learning curve, but the payoff is diagrams that stay maintainable over time. And you get to use your AI buddy to help generate them.

The last diagram you hand-drew on a whiteboard six months ago? Nobody updated it. Text-based diagrams wired into CI don't have that problem.


## How to Adopt It This Quarter ##

Just before year end is the perfect time to implement new practices ahead of Q1 next year.

- Pick one area to diagram (System context, service boundaries, data flow, deployment topology).

- Author a PlantUML or a Mermaid version (Use PlantUML for enterprise or JVM-heavy systems, and Mermaid for Markdown/JS-based projects) and add to vsc of your codebase.

- Add a CI job to render PNG/SVG and publish to your wiki/README on every merge to main.

- Gate merges on a simple diagram linter.

- Review in sprint demos with engineering and product.

Start this week. Convert one architecture diagram to code, put the renders in CI, and review it in your next PR. If it reduces drift and speeds up decisions, standardize it across the org. The future of architecture is text — make it a habit.