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
      <h1 className="text-4xl font-serif font-bold text-white mb-2">From the Desk</h1>
      <p className="text-xl text-zinc-400 mb-8">Cloud, Code, and Enterprise Insights</p>

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search articles..."
          className="bg-zinc-950 text-gray-200 px-4 py-2 rounded-md w-full sm:w-64 border border-zinc-800"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <select
          className="bg-zinc-950 text-gray-200 px-4 py-2 rounded-md border border-zinc-800"
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
            className="bg-zinc-950 p-6 rounded-xl hover:bg-zinc-900 transition duration-300 border border-zinc-800 hover:border-teal-400 group"
          >
            <h2 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-teal-400 transition">{article.title}</h2>
            <div className="text-zinc-500 text-sm mb-2">{new Date(article.date).toLocaleDateString()}</div>
            <div className="flex gap-2 mb-4 flex-wrap">
              {article.tags && article.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="bg-zinc-900 text-teal-300 text-xs px-3 py-1 rounded-full border border-zinc-800"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-zinc-400 mb-4">{article.excerpt}</p>
            <span className="text-teal-400 hover:text-teal-300">
              Read more →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Writing;