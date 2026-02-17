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
    <div className="min-h-screen bg-[var(--color-bg)] py-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        {/* Back Button and Download Button */}
        <div className="flex justify-between items-center mb-8">
          <a
            href="/resources"
            className="inline-flex items-center text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Downloads
          </a>

          <a
            href="/example-AGENTS.md"
            download="example-AGENTS.md"
            className="inline-flex items-center bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            <Download className="w-4 h-4 mr-2" />
            Download File
          </a>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-8">
          Example AGENTS.md
        </h1>

        {/* Content */}
        <div className="bg-[var(--color-surface)] p-8 rounded-xl shadow-xl border border-[var(--color-border)]">
          <article className="prose prose-invert max-w-none
            prose-headings:text-[var(--color-text-primary)]
            prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-4
            prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-3 prose-h2:mt-8
            prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-2 prose-h3:mt-6
            prose-p:text-[var(--color-text-secondary)] prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-[var(--color-accent)] prose-a:no-underline hover:prose-a:text-[var(--color-accent-hover)] hover:prose-a:underline
            prose-strong:text-[var(--color-text-primary)] prose-strong:font-semibold
            prose-code:text-[var(--color-text-secondary)] prose-code:bg-[var(--color-bg)] prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-[var(--color-bg)] prose-pre:border prose-pre:border-[var(--color-border)]
            prose-ul:text-[var(--color-text-secondary)] prose-ul:mb-4
            prose-ol:text-[var(--color-text-secondary)] prose-ol:mb-4
            prose-li:mb-2
            prose-blockquote:border-l-[var(--color-accent)] prose-blockquote:text-[var(--color-text-muted)] prose-blockquote:italic
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
