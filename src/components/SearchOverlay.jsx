import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

export default function SearchOverlay({ articles, isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Keyboard listener for ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      inputRef.current?.focus();
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Filter articles based on query
  const filteredArticles = query.trim()
    ? articles.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt?.toLowerCase().includes(query.toLowerCase()) ||
        article.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6)
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4"
          style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(30px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-[560px] bg-[#18181b] rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 p-4 border-b border-[var(--color-border)]">
              <Search className="w-5 h-5 text-moonlight-text-muted" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search articles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-moonlight-text-primary placeholder:text-moonlight-text-faint outline-none text-base"
              />
              <button
                onClick={onClose}
                className="p-1 hover:bg-[var(--color-surface-hover)] rounded transition"
              >
                <X className="w-5 h-5 text-moonlight-text-muted" />
              </button>
            </div>

            {/* Search Results */}
            {query.trim() && (
              <div className="max-h-[400px] overflow-y-auto">
                {filteredArticles.length > 0 ? (
                  <div className="p-2">
                    {filteredArticles.map(article => (
                      <a
                        key={article.slug}
                        href={`/articles/${article.slug}`}
                        className="block p-3 hover:bg-[var(--color-surface-hover)] rounded-lg transition group"
                      >
                        <h3 className="text-moonlight-text-primary font-serif text-base mb-1 group-hover:text-purple-400">
                          {article.title}
                        </h3>
                        <p className="text-moonlight-text-muted text-sm line-clamp-1">
                          {article.excerpt}
                        </p>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-moonlight-text-muted">
                    No articles found for "{query}"
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
