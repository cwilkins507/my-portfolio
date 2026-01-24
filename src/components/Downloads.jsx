import React, { useEffect } from 'react';
import { FileDown } from 'lucide-react';

const Downloads = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Resources & Case Studies | Collin Wilkins";
  }, []);

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-serif font-extrabold text-white mb-6 tracking-tight">
            Resources
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">
            Tools, frameworks, and guides to help you engineer high-reliability AI systems and automation.
          </p>
        </div>

        {/* Featured Download: Agentic Workflows Guide */}
        <div className="mb-16">
          <h2 className="text-zinc-500 text-sm font-mono uppercase tracking-[0.2em] mb-6 text-center md:text-left font-semibold">
            Featured Resource
          </h2>
          <a
            href="/Agentic-Workflows-Guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-zinc-950 p-8 md:p-12 rounded-2xl border border-zinc-800 hover:border-teal-400/50 transition-all duration-500 group shadow-2xl relative overflow-hidden"
          >
            {/* Subtle Gradient Glow */}
            <div className="absolute -inset-x-20 -top-20 h-40 bg-teal-500/5 blur-[100px] pointer-events-none group-hover:bg-teal-500/10 transition-all duration-500" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
              <div className="order-2 md:order-1">
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-6">
                  Stop Building Chatbots. <br /><span className="italic text-zinc-400">Start Engineering Systems.</span>
                </h3>

                <p className="text-zinc-400 text-lg leading-relaxed mb-8 font-light">
                  Most AI workflows collapse under real-world complexity. Learn the DOE Framework to restore 100% reliability to your autonomous agents.
                </p>

                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full font-bold group-hover:bg-teal-400 transition-all duration-300">
                  <FileDown className="w-5 h-5" />
                  <span>Download Free Guide (PDF)</span>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="relative group/image">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-zinc-500/20 rounded-xl blur opacity-25 group-hover/image:opacity-40 transition duration-1000"></div>
                  <img
                    src="/images/thumbnail.png"
                    alt="Agentic Workflows Guide preview"
                    className="relative w-full rounded-lg border border-zinc-800 shadow-2xl transform transition duration-500 group-hover:scale-[1.02]"
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
            <h2 className="text-zinc-500 text-sm font-mono uppercase tracking-[0.2em] mb-6 font-semibold">
              Templates
            </h2>
            <a
              href="/agents"
              className="group block bg-zinc-950 p-8 rounded-2xl border border-zinc-800 hover:border-teal-400/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div className="p-3 bg-zinc-900 rounded-lg w-fit border border-zinc-800 group-hover:border-teal-400/30 transition-colors">
                    <FileDown className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                      Example AGENTS.md
                    </h3>
                    <p className="text-zinc-500 font-light leading-relaxed">
                      Download the AGENTS.md template I use to document and specify AI agent behaviors and safety protocols.
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* You can add more cards here easily */}
        </div>
      </div>
    </div>
  );
};


export default Downloads;
