import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });
};

const ArticleList = ({ articles = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: '-100px' });

  const featuredArticle = articles?.length > 0 ? articles[0] : null;
  const remainingArticles = articles?.slice(1) || [];

  const filteredArticles = selectedCategory === 'All'
    ? remainingArticles
    : remainingArticles.filter(article => getCategoryForArticle(article.tags) === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Featured Article Hero */}
      {featuredArticle && (
        <div className="bg-zinc-950 border-b border-zinc-800">
          <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-4xl mx-auto">
              <span className="text-teal-400 text-sm font-bold uppercase tracking-wider">Latest Article</span>
              <h1 className="text-5xl md:text-7xl font-serif font-black text-white mt-4 mb-6 leading-tight tracking-tight">
                {featuredArticle.title}
              </h1>
              <p className="text-xl md:text-2xl text-zinc-400 mb-8 leading-relaxed font-light">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-zinc-400">{formatDate(featuredArticle.date)}</span>
                <span className="text-zinc-800">•</span>
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
                : 'bg-zinc-950 text-zinc-400 hover:bg-zinc-900 hover:text-teal-300 border border-zinc-800'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Article Grid with Stagger Animation */}
        <motion.div
          ref={gridRef}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {filteredArticles.map((article) => (
            <motion.a
              href={`/articles/${article.slug}`}
              key={article.slug}
              className="bg-zinc-950 rounded-xl p-8 hover:bg-zinc-900 transition duration-300 border border-zinc-800 hover:border-teal-400 group"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-teal-400 text-xs font-bold uppercase tracking-wider">
                {getCategoryForArticle(article.tags)}
              </span>
              <h2 className="text-2xl font-serif font-bold text-white mb-3 mt-3 group-hover:text-teal-400 transition leading-tight">
                {article.title}
              </h2>
              <div className="text-zinc-500 text-sm mb-4">
                {formatDate(article.date)}
              </div>
              <p className="text-zinc-400 mb-4">{article.excerpt}</p>
              <div className="flex gap-2 flex-wrap">
                {article.tags?.slice(0, 3).map(tag => (
                  <span key={tag} className="bg-zinc-900 text-teal-300 text-xs px-3 py-1 rounded-full border border-zinc-800">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ArticleList;