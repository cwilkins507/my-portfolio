import React, { useEffect } from 'react';
import { FileDown } from 'lucide-react';

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

        {/* Featured Download: Agentic Workflows Guide */}
        <div className="mb-16">
          <h2 className="text-[var(--color-text-muted)] text-sm font-mono uppercase tracking-[0.2em] mb-6 text-center md:text-left font-semibold">
            Featured Resource
          </h2>
          <a
            href="/guides/agentic-workflows"
            className="block bg-[var(--color-surface)] p-8 md:p-12 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all duration-500 group shadow-2xl relative overflow-hidden"
          >
            {/* Subtle Gradient Glow */}
            <div className="absolute -inset-x-20 -top-20 h-40 bg-[var(--color-blur-primary)] blur-[100px] pointer-events-none transition-all duration-500" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] leading-tight mb-6">
                  Stop Building Chatbots. <br /><span className="italic text-[var(--color-text-secondary)]">Start Engineering Systems.</span>
                </h3>

                <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-8 font-light">
                  Most AI workflows collapse under real-world complexity. Learn the DOE Framework to restore 100% reliability to your autonomous agents.
                </p>

                <div className="inline-flex items-center gap-3 px-6 py-3 bg-[var(--color-accent)] text-white rounded-full font-bold group-hover:bg-[var(--color-accent-hover)] transition-all duration-300">
                  <span>Read Guide →</span>
                </div>

                <p className="text-sm text-[var(--color-text-muted)] mt-4 font-light">
                  28 pages · Free · No email required
                </p>
              </div>

              <div className="order-1 md:order-2">
                <div className="relative group/image">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-accent-muted)] to-transparent rounded-xl blur opacity-25 group-hover/image:opacity-40 transition duration-1000"></div>
                  <img
                    src="/images/thumbnail.png"
                    alt="Agentic Workflows Guide preview"
                    className="relative w-full rounded-lg border border-[var(--color-border)] shadow-2xl transform transition duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
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
                      22 tested prompts for market research, competitor analysis, SEO, and automation.
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
