import React, { useEffect } from 'react';
import { FileDown, BookOpen } from 'lucide-react';

const Downloads = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Resources & Case Studies | Collin Wilkins";
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-20">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-serif font-extrabold text-[var(--color-text-primary)] mb-6 tracking-tight">
            Resources
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto font-light">
            Tools, frameworks, and guides to help you engineer high-reliability AI systems and automation.
          </p>
        </div>

        {/* Featured: AI Adoption Playbook (primary) */}
        <div className="mb-10">
          <h2 className="text-[var(--color-text-muted)] text-sm font-mono uppercase tracking-[0.2em] mb-6 text-center md:text-left font-semibold">
            Featured Resource
          </h2>
          <a
            href="/guides/ai-adoption-playbook"
            className="block bg-[var(--color-surface)] p-8 md:p-12 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all duration-500 group shadow-2xl relative overflow-hidden"
          >
            {/* Subtle Gradient Glow */}
            <div className="absolute -inset-x-20 -top-20 h-40 bg-[var(--color-blur-primary)] blur-[100px] pointer-events-none transition-all duration-500" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
              <div className="order-2 md:order-1">
                <div className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4 border border-[var(--color-accent-border)] bg-[var(--color-accent-muted)] px-3 py-1 rounded-full">
                  Free Guide
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] leading-tight mb-3">
                  The AI Adoption Playbook
                </h3>
                <p className="italic text-[var(--color-text-secondary)] text-lg mb-6 font-light">
                  For engineering teams adopting AI coding tools
                </p>

                <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed mb-8 font-light">
                  Five chapters on readiness, context engineering, tool selection, failure patterns, and ROI math. The frameworks I use when I help teams roll out AI coding tools — with a downloadable toolkit (diagnostic worksheet + convention files) for running them with your team.
                </p>

                <div className="inline-flex items-center gap-3 px-6 py-3 bg-[var(--color-accent)] text-white rounded-full font-bold group-hover:bg-[var(--color-accent-hover)] transition-all duration-300">
                  <span>Read the Playbook →</span>
                </div>

                <p className="text-sm text-[var(--color-text-muted)] mt-4 font-light">
                  5 chapters · Free · No email required to read
                </p>
              </div>

              {/* Visual: chapter list card */}
              <div className="order-1 md:order-2">
                <div className="relative group/visual">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-accent-muted)] to-transparent rounded-xl blur opacity-25 group-hover/visual:opacity-40 transition duration-1000"></div>
                  <div className="relative bg-[var(--color-bg)] rounded-lg border border-[var(--color-border)] shadow-2xl p-8 md:p-10 transform transition duration-500 group-hover:scale-[1.02]">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--color-border)]">
                      <BookOpen className="w-6 h-6 text-[var(--color-accent)]" />
                      <span className="text-xs font-mono uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                        Contents
                      </span>
                    </div>
                    <ol className="space-y-3 text-sm">
                      {[
                        'Figuring Out If You’re Ready',
                        'Why Your AI Tools Produce Bad Output',
                        'Which AI Tools Actually Matter',
                        'The 5 Ways AI Pilots Die',
                        'The Math That Makes the Decision',
                      ].map((title, i) => (
                        <li key={i} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                          <span className="font-mono text-[var(--color-accent)] font-semibold flex-shrink-0 w-6">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="leading-snug">{title}</span>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--color-text-faint)]">
                      <span>+ Diagnostic worksheet</span>
                      <span>+ CLAUDE.md template</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Also in the Guides Shelf: Agentic Workflows (secondary) */}
        <div className="mb-16">
          <h2 className="text-[var(--color-text-muted)] text-sm font-mono uppercase tracking-[0.2em] mb-6 text-center md:text-left font-semibold">
            Also in the Guides Shelf
          </h2>
          <a
            href="/guides/agentic-workflows"
            className="block bg-[var(--color-surface)] p-6 md:p-8 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all duration-300 group relative overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6 md:gap-8 items-center">
              <div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-[var(--color-text-primary)] leading-tight mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                  Stop Building Chatbots. <span className="italic text-[var(--color-text-secondary)]">Start Engineering Systems.</span>
                </h3>

                <p className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed font-light mb-4">
                  Most AI workflows collapse under real-world complexity. Learn the DOE Framework to restore 100% reliability to your autonomous agents.
                </p>

                <div className="flex items-center gap-3 text-[var(--color-accent)] font-semibold text-sm">
                  <span>Read guide →</span>
                  <span className="text-[var(--color-text-muted)] font-normal text-xs">28 pages · Free</span>
                </div>
              </div>

              <div className="relative group/image order-first md:order-last">
                <img
                  src="/images/thumbnail.png"
                  alt="Agentic Workflows Guide preview"
                  className="w-full md:w-[200px] rounded-md border border-[var(--color-border)] shadow-lg transform transition duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </div>
          </a>
        </div>

        {/* Other Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Example AGENTS.md */}
          <div>
            <h2 className="text-[var(--color-text-muted)] text-sm font-mono uppercase tracking-[0.2em] mb-6 font-semibold">
              Templates
            </h2>
            <a
              href="/agents"
              className="group block bg-[var(--color-surface)] p-8 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div className="p-3 bg-[var(--color-surface)] rounded-lg w-fit border border-[var(--color-border)] group-hover:border-[var(--color-border-hover)] transition-colors">
                    <FileDown className="w-6 h-6 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                      Example AGENTS.md
                    </h3>
                    <p className="text-[var(--color-text-muted)] font-light leading-relaxed">
                      Download the AGENTS.md template I use to document and specify AI agent behaviors and safety protocols.
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* AI Prompt Toolkit */}
          <div>
            <h2 className="text-[var(--color-text-muted)] text-sm font-mono uppercase tracking-[0.2em] mb-6 font-semibold">
              Toolkits
            </h2>
            <a
              href="/resources/ai-prompt-toolkit"
              className="group block bg-[var(--color-surface)] p-8 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div className="p-3 bg-[var(--color-surface)] rounded-lg w-fit border border-[var(--color-border)] group-hover:border-[var(--color-border-hover)] transition-colors">
                    <FileDown className="w-6 h-6 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                      AI Prompt Toolkit
                    </h3>
                    <p className="text-[var(--color-text-muted)] font-light leading-relaxed">
                      32 tested prompts for code review, documentation, research, SEO, automation, and AI employees.
                    </p>
                    <span className="inline-block mt-3 text-xs text-[var(--color-text-secondary)] border border-[var(--color-border)] rounded-full px-3 py-1">
                      Free · No email required
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Downloads;
