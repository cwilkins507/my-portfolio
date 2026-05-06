import React from 'react';
import { ArrowRight } from 'lucide-react';

const StartHere = ({ articles = [] }) => {
  if (articles.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <a
          key={article.slug}
          href={`/articles/${article.slug}`}
          className="group flex flex-col"
        >
          <div className="aspect-video rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface)] to-[rgba(201,169,110,0.03)] mb-6 overflow-hidden transition-all duration-300 group-hover:border-[var(--color-border-hover)] flex items-center justify-center">
            {article.image ? (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--color-text-faint)]">
                Hero image
              </span>
            )}
          </div>

          {article.category && (
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-accent)] mb-3">
              {article.category}
            </p>
          )}

          <h3 className="font-serif text-xl font-bold leading-snug text-[var(--color-text-primary)] mb-3 transition-colors group-hover:text-[var(--color-accent)] lg:text-[1.35rem]">
            {article.title}
          </h3>

          <p className="text-[0.95rem] leading-relaxed text-[var(--color-text-secondary)] flex-grow mb-5">
            {article.blurb || article.excerpt}
          </p>

          <span className="inline-flex items-center gap-2 text-[0.95rem] font-semibold text-[var(--color-text-primary)] mt-auto">
            Read article
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </a>
      ))}
    </div>
  );
};

export default StartHere;
