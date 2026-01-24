# AI Action Plan Platform: Technical Specification

## 1. System Vision
A high-end, dark-themed lead generation platform. The user enters a frictionless quiz funnel, receives immediate value via a "Prompt Library," and is captured as a lead for a personalized AI Action Plan.

---

## 2. Technical Stack (Agent Instructions)
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (Dark Mode focused)
- **Animation:** Framer Motion (Required for quiz step transitions)
- **State Management:** React Hook Form + Zustand (for multi-step persistence)
- **Icons:** Lucide-React

---

## 3. Visual Identity (Obsidian Theme)
- **Background:** `#000000`
- **Surface/Cards:** `#09090b` (Zinc-950)
- **Primary Text:** `#ffffff`
- **Secondary Text:** `#a1a1aa` (Zinc-400)
- **Borders:** `#27272a` (Zinc-800)
- **Button (Primary):** `bg-white text-black hover:bg-zinc-200`
- **Font - Headings:** Serif font stack (e.g., 'Playfair Display', serif)
- **Font - UI:** Sans-serif (e.g., 'Inter', sans-serif)

---

## 4. Feature Spec: Multi-Step Quiz (`/quiz`)
The quiz must use a "Progressive Disclosure" pattern. 

### Data Flow


### Step Logic & Content
1. **Tool Usage:** "Are you regularly using AI tools?" (Binary: Yes/No)
2. **Work Situation:** "What's your current work situation?" (Options: Solopreneur, 1-10 Employees, 10+ Employees, Employee)
3. **Challenge:** "#1 AI challenge right now?" (Options: Overwhelmed, Competitive Gap, No Time)
4. **Outcome:** "Desired #1 outcome?" (Options: Revenue, Time, Quality)
5. **Department:** "Which area eats up most of your time?" (Options: Admin, Marketing, Sales, Fulfillment)
6. **Lead Capture Modal:** White background (`bg-white`), black text, First/Last/Email inputs.

---

## 5. Feature Spec: Prompt Library (`/prompts`)
A searchable database of business-ready AI prompts.

### Schema Requirements:
- **Title:** e.g., "The Executive Assistant Persona"
- **Category:** Tagged by Department (from Quiz Step 5)
- **Prompt String:** The actual text with variables in `[BRACKETS]`.
- **Functionality:** - One-click "Copy to Clipboard" button.
  - Search bar with real-time filtering.
  - Category filter pills.

---

## 6. Feature Spec: Blog (`/blog`)
Markdown-based educational content.

- **Layout:** Clean typography, high readability, integrated CTA.
- **Components:** - `PostPreview`: Card with title, excerpt, and read time.
  - `NewsletterSignup`: Embedded CTA for the Quiz.

---

## 7. Site Map & Routes
- `GET /` : Landing page with "How it works" and Hero CTA.
- `GET /quiz` : The 6-step interactive experience (Hidden header/footer).
- `GET /prompts` : The Prompt Library grid.
- `GET /blog` : Content archive.
- `GET /blog/[slug]` : Individual post page.

---

## 8. Agent Coding Constraints
- **Responsive:** Mobile-first. Quiz options should be large, tappable cards.
- **Accessibility:** Use semantic HTML and ARIA labels for quiz buttons.
- **Performance:** Image optimization via `next/image`.
- **Transitions:** Use `AnimatePresence` from Framer Motion for slide-in/slide-out effects between quiz questions.