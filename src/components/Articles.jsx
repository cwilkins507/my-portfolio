import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

// Category mapping
const CATEGORIES = {
  'AI & Agents': ['AI', 'LLM Tools', 'CLI Agents', 'MCP', 'Workflow Automation', 'Prompt Engineering'],
  'Cloud & DevOps': ['AWS', 'Terraform', 'Infrastructure as Code', 'DevOps', 'Serverless', 'Azure', 'GCP'],
  'Architecture': ['Software Architecture', 'System Design', 'Microservices', 'Distributed Systems'],
  'Engineering': ['Software Engineering', 'Best Practices', 'Low-code', 'Database Optimization']
};

const getCategoryForArticle = (tags) => {
  if (!tags || tags.length === 0) return 'Engineering';

  for (const [category, categoryTags] of Object.entries(CATEGORIES)) {
    for (const tag of tags) {
      if (categoryTags.some(catTag => catTag.toLowerCase() === tag.toLowerCase())) {
        return category;
      }
    }
  }
  return 'Engineering';
};

const ArticleList = ({ articles = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const featuredArticle = articles?.length > 0 ? articles[0] : null;
  const remainingArticles = articles?.slice(1) || [];

  const filteredArticles = selectedCategory === 'All'
    ? remainingArticles
    : remainingArticles.filter(article => getCategoryForArticle(article.tags) === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Featured Article Hero */}
      {featuredArticle && (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-b border-gray-700">
          <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-4xl mx-auto">
              <span className="text-teal-400 text-sm font-bold uppercase tracking-wider">Latest Article</span>
              <h1 className="text-5xl md:text-7xl font-black text-white mt-4 mb-6 leading-tight tracking-tight">
                {featuredArticle.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed font-light">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-gray-400">{new Date(featuredArticle.date).toLocaleDateString()}</span>
                <span className="text-gray-600">•</span>
                <span className="bg-teal-600/20 text-teal-300 text-sm px-3 py-1 rounded-full">
                  {getCategoryForArticle(featuredArticle.tags)}
                </span>
              </div>
              <a
                href={`/articles/${featuredArticle.slug}`}
                className="inline-flex items-center bg-teal-600 hover:bg-teal-500 text-white font-bold text-lg py-4 px-10 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-xl shadow-teal-500/40"
              >
                Read Article <ArrowRight className="w-6 h-6 ml-2" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Category Tabs & Article Grid */}
      <div className="container mx-auto px-4 py-20">
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {['All', ...Object.keys(CATEGORIES)].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-3 rounded-full font-bold text-base transition duration-300 ${selectedCategory === category
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30 scale-105'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-teal-300'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <a
              href={`/articles/${article.slug}`}
              key={article.slug}
              className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition duration-300 border border-gray-700 hover:border-teal-400 group"
            >
              <span className="text-teal-400 text-xs font-bold uppercase tracking-wider">
                {getCategoryForArticle(article.tags)}
              </span>
              <h2 className="text-2xl font-bold text-white mb-3 mt-3 group-hover:text-teal-400 transition leading-tight">
                {article.title}
              </h2>
              <div className="text-gray-500 text-sm mb-4">
                {new Date(article.date).toLocaleDateString()}
              </div>
              <p className="text-gray-300 mb-4">{article.excerpt}</p>
              <div className="flex gap-2 flex-wrap">
                {article.tags?.slice(0, 3).map(tag => (
                  <span key={tag} className="bg-gray-700 text-teal-300 text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleList;