import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FileDown } from 'lucide-react';

const Downloads = () => {
  const location = useLocation();

  // Scroll to top when component mounts or route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          Downloadable Resources
        </h1>

        {/* DOE Framework Explanation */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-teal-400 mb-6">The DOE Framework</h2>
          
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              The DOE framework (Directive → Orchestration → Execution) is a structured way to use AI agents reliably by separating intent, decision-making, and deterministic work. Directives are simple Markdown SOPs that describe what needs to be done and live in your repo as the source of truth. Orchestration is handled by the AI agent (Copilot, Claude Code, etc.), which reads those directives, decides what steps to take, and routes work to the correct tools. Execution is performed by deterministic scripts (usually Python) so complex logic is repeatable, testable, and not subject to LLM randomness.
            </p>
            
            <p>
              To use DOE locally, add an agents.md (or equivalent) file to your workspace so your AI tool automatically loads the operating rules. Next, ask the agent to initialize or align the workspace according to the DOE framework and directory structure. Create or refine directives as you define new tasks, and let the agent orchestrate rather than manually performing multi-step work. When something breaks, fix the execution code and update the directive so the system improves over time. This approach keeps AI focused on judgment and coordination while pushing complexity into reliable code.
            </p>
          </div>
        </div>

        {/* Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Agentic Workflows Guide */}
          <a 
            href="/Agentic-Workflows-Guide.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-teal-400 transition duration-300 ease-in-out transform hover:scale-105 group"
          >
            <div className="flex items-start space-x-4">
              <FileDown className="w-8 h-8 text-teal-400 flex-shrink-0 group-hover:text-teal-300 transition" />
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition mb-2">
                  Agentic Workflows Guide
                </h3>
                <p className="text-gray-400 text-sm">
                  Comprehensive guide to implementing agentic workflows with AI
                </p>
              </div>
            </div>
          </a>

          {/* Example AGENTS.md */}
          <Link 
            to="/agents"
            className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-teal-400 transition duration-300 ease-in-out transform hover:scale-105 group"
          >
            <div className="flex items-start space-x-4">
              <FileDown className="w-8 h-8 text-teal-400 flex-shrink-0 group-hover:text-teal-300 transition" />
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition mb-2">
                  Example AGENTS.md
                </h3>
                <p className="text-gray-400 text-sm">
                  AGENTS.md file
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Downloads;
