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
      <h1 className="text-4xl font-bold text-white mb-2">From the Desk</h1>
      <p className="text-xl text-gray-400 mb-8">Cloud, Code, and Enterprise Insights</p>

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search articles..."
          className="bg-gray-800 text-gray-200 px-4 py-2 rounded-md w-full sm:w-64"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <select
          className="bg-gray-800 text-gray-200 px-4 py-2 rounded-md"
          onChange={(e) => setSelectedTag(e.target.value)}
          value={selectedTag}
        >
          <option value="">All Topics</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6">
        {filteredWritings.map(article => (
          <div key={article.slug} className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition duration-300">
            <h2 className="text-2xl font-bold text-teal-400 mb-2">{article.title}</h2>
            <div className="text-gray-400 mb-2">{new Date(article.date).toLocaleDateString()}</div>
            <div className="flex gap-2 mb-4">
              {article.tags && article.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-gray-700 text-teal-300 text-sm px-3 py-1 rounded-full cursor-pointer hover:bg-gray-600"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-300 mb-4">{article.excerpt}</p>
            <a href={`/my-portfolio/articles/${article.slug}`} className="text-teal-400 hover:text-teal-300">
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Writing;