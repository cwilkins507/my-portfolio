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

        {/* Featured Download: Agentic Workflows Guide */}
        <a
          href="/Agentic-Workflows-Guide.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700 mb-8 hover:border-teal-400 transition duration-300 ease-in-out group"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Stop Building Chatbots. Start Engineering Systems.
              </h2>

              <p className="text-gray-300 leading-relaxed mt-4">
                {'Most AI workflows collapse under real-world complexity. \n\nLearn the DOE Framework to restore 100% reliability to your autonomous agents.'}
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-teal-400 font-semibold group-hover:text-teal-300 transition">
                <FileDown className="w-5 h-5" />
                <span>Download the guide (PDF)</span>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <img
                src="/images/thumbnail.png"
                alt="Agentic Workflows Guide preview"
                className="w-full rounded-lg border border-gray-700"
                loading="lazy"
              />
            </div>
          </div>
        </a>

        {/* Download Cards */}
        <div className="grid grid-cols-1 gap-6">
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
