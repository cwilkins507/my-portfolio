import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Download } from 'lucide-react';

const AgentsDoc = () => {
  const [content, setContent] = useState("");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Example AGENTS.md | AI Project Documentation";
  }, []);

  // Load the AGENTS.md content
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('/example-AGENTS.md');
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Failed to load AGENTS.md:', error);
      }
    };

    loadContent();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        {/* Back Button and Download Button */}
        <div className="flex justify-between items-center mb-8">
          <a
            href="/resources"
            className="inline-flex items-center text-teal-400 hover:text-teal-300 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Downloads
          </a>

          <a
            href="/example-AGENTS.md"
            download="example-AGENTS.md"
            className="inline-flex items-center bg-teal-500 hover:bg-teal-400 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            <Download className="w-4 h-4 mr-2" />
            Download File
          </a>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Example AGENTS.md
        </h1>

        {/* Content */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700">
          <article className="prose prose-invert prose-teal max-w-none
            prose-headings:text-teal-400 
            prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-4
            prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-3 prose-h2:mt-8
            prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-2 prose-h3:mt-6
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-teal-400 prose-a:no-underline hover:prose-a:text-teal-300 hover:prose-a:underline
            prose-strong:text-white prose-strong:font-semibold
            prose-code:text-teal-300 prose-code:bg-gray-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700
            prose-ul:text-gray-300 prose-ul:mb-4
            prose-ol:text-gray-300 prose-ol:mb-4
            prose-li:mb-2
            prose-blockquote:border-l-teal-400 prose-blockquote:text-gray-400 prose-blockquote:italic
            prose-img:rounded-lg prose-img:shadow-lg">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
};

export default AgentsDoc;
