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

// Unified grayscale category style
const CATEGORY_STYLE = {
  bg: 'var(--color-surface)',
  text: 'var(--color-text-secondary)',
  border: 'var(--color-border)',
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
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Featured Article Hero */}
      {featuredArticle && (
        <div className="border-b relative overflow-hidden" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          {/* Atmospheric blur depth effect */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[480px] z-0 hidden md:block"
            style={{
              background: 'linear-gradient(135deg, var(--color-blur-primary), var(--color-blur-secondary), transparent)',
              filter: 'blur(80px)',
            }}
            aria-hidden="true"
          />
          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <div className="max-w-4xl mx-auto">
              <span className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-[0.08em]">Latest Article</span>
              <h1 className="text-3xl md:text-5xl font-serif font-black text-moonlight-text-primary mt-4 mb-6 leading-tight tracking-tight">
                {featuredArticle.title}
              </h1>
              <p className="text-lg md:text-xl text-moonlight-text-secondary mb-8 leading-relaxed font-light">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-moonlight-text-secondary">{formatDate(featuredArticle.date)}</span>
                <span className="text-moonlight-text-faint">•</span>
                <span
                  className="text-sm px-3 py-1 rounded-full border"
                  style={{
                    background: CATEGORY_STYLE.bg,
                    color: CATEGORY_STYLE.text,
                    borderColor: CATEGORY_STYLE.border,
                  }}
                >
                  {getCategoryForArticle(featuredArticle.tags)}
                </span>
              </div>
              <a
                href={`/articles/${featuredArticle.slug}`}
                className="inline-flex items-center bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold text-lg py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Read Article <ArrowRight className="w-6 h-6 ml-2" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Category Tabs & Article List */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Category Navigation */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-serif font-semibold text-moonlight-text-primary">All Articles</h2>
          <div className="flex flex-wrap gap-3">
            {['All', ...Object.keys(CATEGORIES)].map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[var(--color-text-primary)] text-[var(--color-bg)] scale-105'
                    : 'text-moonlight-text-secondary border hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]'
                }`}
                style={selectedCategory !== category ? {
                  background: 'var(--color-surface)',
                  borderColor: 'var(--color-border)'
                } : {}}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Article Row List */}
        <motion.div
          ref={gridRef}
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {filteredArticles.map((article) => {
            const category = getCategoryForArticle(article.tags);
            const colors = CATEGORY_STYLE;

            return (
              <motion.a
                href={`/articles/${article.slug}`}
                key={article.slug}
                className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 py-6 border-b hover:bg-[var(--color-surface-hover)] transition-all duration-300 group px-4"
                style={{ borderColor: 'var(--color-border)' }}
                variants={itemVariants}
              >
                {/* Left: Category + Date */}
                <div className="flex-shrink-0 md:w-48 flex items-center gap-3 flex-wrap">
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full border"
                    style={{
                      background: colors.bg,
                      color: colors.text,
                      borderColor: colors.border,
                    }}
                  >
                    {category}
                  </span>
                  <span className="text-moonlight-text-faint text-xs">
                    {formatDate(article.date)}
                  </span>
                </div>

                {/* Middle: Title + Description */}
                <div className="flex-1">
                  <h3 className="text-lg font-serif text-moonlight-text-primary group-hover:text-[var(--color-text-primary)] mb-1 transition leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-moonlight-text-muted text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>

                {/* Right: Arrow */}
                <ArrowRight className="w-5 h-5 text-moonlight-text-faint group-hover:text-[var(--color-text-primary)] transition self-start md:self-center" />
              </motion.a>
            );
          })}
        </motion.div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-moonlight-text-muted text-lg">
              No articles found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleList;
