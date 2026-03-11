import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Writing = ({ articlesInitial = [] }) => {
  const [articles, setArticles] = useState(articlesInitial);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredWritings = articles.filter(article => {
    const matchesSearch = article.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? article.tags?.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const allTags = [...new Set(articles.flatMap(article => article.tags || []))];

  // Article list view
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-serif font-bold text-[var(--color-text-primary)] mb-2">From the Desk</h1>
      <p className="text-xl text-[var(--color-text-secondary)] mb-8">Cloud, Code, and Enterprise Insights</p>

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search articles..."
          className="bg-[var(--color-bg)] text-[var(--color-text-primary)] px-4 py-2 rounded-md w-full sm:w-64 border border-[var(--color-border)]"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <select
          className="bg-[var(--color-bg)] text-[var(--color-text-primary)] px-4 py-2 rounded-md border border-[var(--color-border)]"
          onChange={(e) => setSelectedTag(e.target.value)}
          value={selectedTag}
        >
          <option value="">All Topics</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredWritings.map(article => (
          <a 
            key={article.slug} 
            href={`/articles/${article.slug}`}
            className="flex flex-col bg-[var(--color-surface)] p-6 rounded-xl transition-all duration-300 border border-[var(--color-border)] hover:border-[var(--color-border-hover)] hover:-translate-y-1 hover:shadow-card group relative"
          >
            <div className="flex justify-between items-start gap-4 mb-2">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition leading-snug">
                {article.title}
              </h2>
              <ArrowRight className="w-5 h-5 text-[var(--color-text-faint)] group-hover:text-[var(--color-accent)] transition mt-1 flex-shrink-0" />
            </div>
            <p className="text-[var(--color-text-secondary)] text-sm md:text-base mb-6 flex-grow">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[var(--color-border)]">
              <span className="text-[var(--color-text-secondary)] text-sm whitespace-nowrap">
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  timeZone: 'UTC'
                })}
              </span>
              <span className="text-[var(--color-text-faint)]">•</span>
              <div className="flex gap-2 flex-wrap">
                {article.tags && article.tags.slice(0, 1).map(tag => (
                  <span
                    key={tag}
                    className="whitespace-nowrap text-xs font-medium px-3 py-1 rounded-full border"
                    style={{
                      background: 'var(--color-surface)',
                      color: 'var(--color-text-secondary)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Writing;