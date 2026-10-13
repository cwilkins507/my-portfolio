---
title: "The Price of the Brick Is Going Up"
date: "2026-10-13"
slug: "price-of-the-brick-going-up-local-ai-models"
tags: ["AI", "AI Economics", "Local AI", "Open Source", "LLMs"]
excerpt: "My new work laptop costs $5,399, about what it now takes to run a decent model at home. Local hardware keeps getting more expensive, and I still think it's the best hedge against AI prices that move every month."
image: "/images/articles/price-of-the-brick-going-up-local-ai-models.png"
image_alt: "DGX Spark 128GB price ladder: $3,999 at launch in October 2025, $4,699 in February 2026, and $7,000 to $9,000 in stock by October 2026."
seo_title: "The Price of the Brick Is Going Up: Local AI Is the Hedge"
meta_description: "DGX Spark launched at $3,999 and now runs $7,000+ as AI eats the memory supply. Why local models are still the hedge against moving AI prices."
target_keywords: "run ai models locally 2026, local llm hardware cost, dgx spark price, open weight models at home, local coding model, qwen 3.8 27b hardware"
related_articles: ["coding-wars-3-opus-5-5-vs-gpt-6-1-sol", "stop-calling-ai-subscriptions-subsidized", "best-ai-coding-harness-omp"]
faqs:
  - q: "Why is local AI hardware getting more expensive?"
    a: "Memory makers shifted capacity toward high-bandwidth memory for AI servers. TrendForce reported DRAM contract prices up about 90% in Q1 2026 and expects another 10–15% in Q4. The DGX Spark 128GB went from $3,999 at launch to $4,699 in February 2026, and in-stock units now run $7,000 to $9,000 according to Tom's Hardware."
  - q: "What hardware do I need to run Qwen 3.8 27B locally?"
    a: "The four-bit weights are about 17GB, so the model has to fit in memory with room left for context. A 24GB GPU like an RTX 3090 or 4090 runs it, an RTX 5090 is fast if you choose the runner carefully, and a DGX Spark handles the full 262K context. On a Mac, I'd get 48GB or more of unified memory; 32GB loads the model but is tight."
  - q: "Should I buy hardware or try hosted open-weight models first?"
    a: "Try hosted first. Open-weight Flash models cost cents per million tokens through providers like DeepInfra or OpenRouter. Run your real work through one, then try the same task on a local model. Buy hardware only if both hold up and you want a price, model, and policy that don't change under you."
---
I got a new laptop for work: a 16-inch MacBook Pro with an M5 Max and 64GB of memory. Out of curiosity I looked up what it costs. [Apple lists that configuration at $5,399](https://www.apple.com/shop/buy-mac/macbook-pro/16-inch-silver-standard-display-apple-m5-max-chip-18-core-cpu-40-core-gpu-64gb-memory-2tb-storage). That's a lot for a laptop, and it's about what it costs now to run a decent model at home.

So I started pricing the alternatives, expecting local hardware to be getting cheaper. It's going the other way. When Nvidia launched the DGX Spark [in October 2025](https://www.engadget.com/ai/nvidia-starts-selling-its-3999-dgx-spark-ai-developer-pc-120034479.html), the 128GB box cost $3,999. In February Nvidia [raised it to $4,699](https://overclock3d.net/news/systems/nvidia-raises-dgx-spark-price-by-700-due-to-memory-supply-constraints). Today, if you can find one in stock, [Tom's Hardware says](https://www.tomshardware.com/pc-components/gpus/nvidia-introduces-64gb-dgx-spark-to-throw-local-ai-fans-a-lifeline-amid-the-rampocalypse-new-gb10-config-starts-at-usd4999-for-those-who-can-work-with-less) you'll pay $7,000 to $9,000. Same box is at least 75% more money. Tom's has a name for it - the "rampocalypse."

![Marlo Stanfield in The Wire, captioned "Price of the brick going up"](/images/price-of-the-brick-wire-marlo.gif)

The brick (the machine you'd need to run models yourself) keeps getting more expensive. I still think it's the best hedge you've got.

## Prices keep moving

Per-token prices are falling, and I've argued in [Stop Calling AI Subscriptions Subsidized](/articles/stop-calling-ai-subscriptions-subsidized) that the cuts are real. On September 22, Anthropic cut Opus 5.5 to $4/$20 per million tokens, 20% below every Opus since 4.5. An hour later OpenAI shipped GPT-6 Sol and Luna at [about half the price of their GPT-5.6 equivalents](https://simonwillison.net/2026/Sep/22/opus-and-sol-and-luna/). In [Coding Wars 3.0](/articles/coding-wars-3-opus-5-5-vs-gpt-6-1-sol), a $2/$10 model held its own against a $10/$50 one.

Now look at the same month from the other side:

- GPT-5.6 has a scheduled 25% price increase in November. OpenAI's pricing page says the promotional rate runs ["at least through November 21."](https://developers.openai.com/api/docs/pricing)
- At DevDay, OpenAI launched a [$500/month ChatGPT plan](https://thenextweb.com/news/openai-devday-pro-200-usage-cut-pro-500-plan). Starting October 30, the $200 plan's Work and Codex usage drops from 20x the Plus allowance to 10x. Same price, half the usage.

None of these are scandals. Subscriptions and APIs are drifting toward the same metered economics, and the provider gets to redraw the meter whenever it wants. If you built a workflow around last month's limits, you found out on a launch day that they changed.

## The brick went up too

The obvious answer is "fine, I'll run it myself." That's gotten more expensive for one simple reason: AI data centers are eating the world's memory.

DRAM contract prices rose about 90% in Q1 2026 compared with Q4 2025, [according to TrendForce](https://thenextweb.com/news/apple-mac-mini-price-dram-ai-shortage), the largest quarterly jump on record. Samsung, SK Hynix, and Micron shifted capacity toward high-bandwidth memory for AI servers, and everything with ordinary RAM got squeezed. TrendForce [expects another 10–15% in Q4](https://www.trendforce.com/presscenter/news/20260930-13258.html) and warns PC DRAM supply could shrink in 2027.

You can see it in the price tags:

| Machine | Memory | Launch price | Price now | Change |
|---|---|---|---|---|
| DGX Spark | 128GB unified | $3,999 (Oct 2025) | $7,000–$9,000 in stock (Oct 2026) | +75% or more |
| RTX PRO 6000 Blackwell | 96GB GDDR7 | $8,565 (Apr 2025) | $16,000 Nvidia store (Aug 2026) | +87% |
| RTX 5090 | 32GB GDDR7 | $1,999 MSRP (Jan 2025) | ~$4,600 cheapest in stock (Aug 2026) | +130% |
| DGX Spark (new 64GB) | 64GB unified | $4,999 (Oct 23, 2026) | — | — |
| Mac Studio RAM upgrade | 96GB → 256GB | $1,600 | $2,000 (May 2026) | +25% |

Three Blackwell products, three different markets (desktop box, workstation card, gaming card), same direction. The RTX PRO 6000 went from $8,565 to $13,250 in June, then to [$16,000 in August](https://www.tomshardware.com/pc-components/gpus/nvidia-doubles-rtx-pro-6000-blackwells-msrp-to-a-staggering-usd16-000-96gb-card-started-pre-orders-below-usd8-000-last-year). The cheapest RTX 5090 a retailer would actually sell you [went from $2,000 in January to $4,100 in August](https://www.trackalacker.com/articles/news/nvidia-rtx-5090-price-increase-2026). Nvidia's answer for the Spark was a 64GB version at $4,999, which is still more than the 128GB box cost a year ago.

Apple, which has about as much supply-chain leverage as anyone, [raised Mac and iPad prices in June](https://www.cnn.com/2026/06/25/tech/apple-hikes-the-prices-of-macbooks-and-ipads-because-of-memory-chip-shortage) and said it had "never seen a component price increase this much, this quickly." If Apple can't absorb it, your local Micro Center isn't going to either.

## What you're buying is a price that stops moving

So why would anyone pay $5,000–$9,000 for a box when a hosted model costs a few dollars per million tokens?

Because the box doesn't renegotiate. Once you own it, the price of the next token is electricity. Nobody halves your allowance on a Tuesday. Nobody retires the model you tuned your prompts around, changes the safety policy under you, or ships a "better" version that's worse at the one thing you needed. Your data stays on your desk.

What you give up is real, and I'm not going to pretend otherwise. Local models are slower. They're not frontier-quality on the hardest tasks. You're now the person who maintains the thing. For a lot of people, paying a provider and eating the occasional price change is the right call.

The way I'd think about it: hosted AI is the cheaper bet with a moving price. Local is the bigger bet with a fixed one. The bigger bet looks better the more of your work depends on a model behaving the same way next month as it did this month.

## How to try it without buying a brick

Start with the same models on someone else's hardware. The open-weight Flash tier is absurdly cheap right now. As of September, [DeepSeek V4 Flash lists at $0.14/$0.28](https://regolo.ai/deepseek-v4-flash-vs-qwen3-8-flash-next-vs-glm-5-3-flash-the-real-leader-in-quality-to-price-in-2026) per million tokens, Qwen3.8-Flash-Next at $0.15/$0.47, and GLM-5.3-Flash at $0.15/$0.50. DeepSeek V4.1 Flash is [$0.14/$0.42 on DeepInfra](https://deepinfra.com/deepseek-ai/DeepSeek-V4.1-Flash/api). Compare that with $2/$10 for GPT-6.1 Sol. One catch: reasoning tokens bill as output, so agent sessions cost more than the input price suggests.

Keep the harness, swap the model. I use [omp](/articles/best-ai-coding-harness-omp) every day, and it doesn't care where the model lives. Point it at OpenRouter to run the hosted Flash models on your real work. When you go local, omp [auto-discovers](https://omp.sh/docs) a llama.cpp server on `127.0.0.1:8080`, Ollama on `11434`, and LM Studio on `1234`, no config file required. Same prompts, same tools, same task packet; the only thing that changes is the endpoint.

Then go local with something that fits. The Flash models are big: GLM-5.3-Flash is 320B parameters and about 306GB at FP8, which is server territory, not a desk. The dense models are where home hardware makes sense, and Qwen 3.8 27B is the one people are running. The easiest install is [Ollama](https://ollama.com/library/qwen3.8):

```bash
ollama run qwen3.8:27b
```

That pulls about 17GB of four-bit weights and serves the model on port 11434. If you'd rather use llama.cpp:

```bash
llama-server -hf unsloth/Qwen3.8-27B-GGUF:UD-Q4_K_M --port 8080 -c 32768 -ngl 99
```

Start omp and the model shows up.

## Will your machine run it?

Probably not the one you're on. My personal laptop is an M1 MacBook with 16GB of memory. It can't even hold 17GB of weights, never mind the context window and everything else I have open. That's the rule for local models: the whole model has to fit in memory, with room left over for context.

For a 27B model, [Tom's Hardware's testing](https://www.tomshardware.com/tech-industry/artificial-intelligence/benchmarking-qwen-3-8-27b-on-rtx-5090-and-beyond-vram-capacity-alone-cant-overcome-severe-software-and-inference-engine-bottlenecks) is the best guide I've found:

- **24GB GPU (RTX 3090 or 4090):** runs the four-bit model with about 112K of context, but it needs every byte of VRAM, so plan on a second card for your display.
- **RTX 5090 (32GB):** fast, if you pick the runner carefully. llama.cpp hit a wall at long contexts, and vLLM and SGLang held only 32K–38K of context on one card.
- **DGX Spark:** about 20 tokens per second, and it held up out to the model's full 262K context. I'd skip this unless you are looking to stack them.
- **Mac:** Tom's M4 Max Mac Studio generated tokens quickly but processed long prompts slowly, so long turns took longer than on the Spark.

My recommendation: if you're buying for a 27B model, get 48GB or more of unified memory on a Mac, or a 24GB-plus GPU. 32GB of unified memory will load the model, but it's tight once the OS and a real context window share it. A 64GB machine like my work laptop is comfortable. And check your local areas on Facebook Marketplace, people might not know what they have.

Tom's own conclusion is that $5,000 to $15,000 buys a lot of hosted tokens, and they're right. That's why you test hosted first.

## Where this goes

My bold prediction - within a year, near-frontier models will run at home. Open weights are closing the gap. On September 30, Ahmad Osman [posted](https://x.com/TheAhmadOsman/status/2101794480345026624) that GLM 5.3 Flash, DeepSeek V4.1 Flash, Qwen 3.8 Next Flash, and even Qwen 3.8 27B, the model above, now outperform every model considered frontier at Christmas 2025. That's one practitioner's read, but it matches the direction I've seen in every Coding Wars round.

![Ahmad Osman (@TheAhmadOsman) on X, Sep 30, 2026: "GLM 5.3 Flash, DeepSeek V4.1 Flash, Qwen 3.8 Next Flash, and even Qwen 3.8 27B are all outperforming (in both intelligence and capabilities) every model that was considered 'frontier intelligence' in Xmas 2025 (just 10 months ago). Opensource AI is on fire"](/images/coding-wars-3-0-ahmad-open-weights-flash.png)

Run your task packet against a hosted Flash model this week. If it holds up, try the same packet on a local model. If that holds up too, start pricing bricks. Just don't wait for them to get cheaper.
