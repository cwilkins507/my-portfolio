import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CATEGORIES, getCategoryForArticle } from '../data/categories';

const CATEGORY_STYLE = {
  bg: 'var(--color-surface)',
  text: 'var(--color-text-secondary)',
  border: 'var(--color-border)',
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
          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10 flex flex-col items-center text-center">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              {featuredArticle.image && (
                <div className="w-full mb-8 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-deep)] shadow-2xl">
                  <img
                    src={featuredArticle.image}
                    alt=""
                    className="aspect-[7/4] w-full object-cover"
                    loading="eager"
                  />
                </div>
              )}
              <span className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-[0.08em]">Latest Article</span>
              <h1 className="text-3xl md:text-5xl font-serif font-black text-[var(--color-text-primary)] mt-4 mb-6 leading-tight tracking-tight">
                {featuredArticle.title}
              </h1>
              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-8 leading-relaxed font-light">
                {featuredArticle.excerpt}
              </p>
              <div className="flex justify-center items-center gap-4 mb-8">
                <span className="text-[var(--color-text-secondary)]">{formatDate(featuredArticle.date)}</span>
                <span className="text-[var(--color-text-faint)]">•</span>
                <span
                  className="text-sm px-3 py-1 rounded-full border whitespace-nowrap"
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h2 className="text-3xl font-serif font-semibold text-[var(--color-text-primary)]">All Articles</h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {['All', ...Object.keys(CATEGORIES)].map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 md:px-6 py-2 rounded-full font-medium text-xs md:text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[var(--color-text-primary)] text-[var(--color-bg)] scale-105 shadow-card'
                    : 'text-[var(--color-text-secondary)] border hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]'
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
                className="flex flex-col md:flex-row md:items-center gap-4 py-6 border-b hover:bg-[var(--color-surface-hover)] transition-all duration-300 group px-4 md:px-6"
                style={{ borderColor: 'var(--color-border)' }}
                variants={itemVariants}
              >
                {article.image && (
                  <div className="flex-none w-full md:w-[160px] aspect-video rounded-lg overflow-hidden border border-[var(--color-border)] group-hover:border-[var(--color-border-hover)] transition-colors">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="text-xl md:text-2xl font-serif text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition leading-snug">
                      {article.title}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-[var(--color-text-faint)] group-hover:text-[var(--color-accent)] transition mt-1 flex-shrink-0" />
                  </div>

                  <p className="text-[var(--color-text-secondary)] text-sm md:text-base mb-4 line-clamp-2 md:line-clamp-none">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-4 mt-auto">
                    <span className="text-[var(--color-text-secondary)] text-sm">{formatDate(article.date)}</span>
                    <span className="text-[var(--color-text-faint)]">•</span>
                    <span
                      className="whitespace-nowrap text-xs font-medium px-3 py-1 rounded-full border"
                      style={{
                        background: colors.bg,
                        color: colors.text,
                        borderColor: colors.border,
                      }}
                    >
                      {category}
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[var(--color-text-muted)] text-lg">
              No articles found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleList;
