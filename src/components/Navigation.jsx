import React, { useState, useEffect } from 'react';
import { Linkedin, Github, Twitter, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Navigation = ({ portfolioData, onSearchClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global keyboard shortcut for search
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only trigger if not typing in an input
      if (e.key === 's' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        onSearchClick?.();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onSearchClick]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: 'var(--color-nav-bg)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="max-w-[960px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="font-serif text-lg font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition">
          {portfolioData?.name || 'Collin Wilkins'}
        </a>

        {/* Right Side: Links + Search */}
        <div className="flex items-center gap-6">
          <a href="/articles" className="text-[13px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] underline decoration-transparent hover:decoration-[var(--color-text-primary)] underline-offset-4 transition-all duration-300">
            Articles
          </a>
          <a href="/newsletter" className="text-[13px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] underline decoration-transparent hover:decoration-[var(--color-text-primary)] underline-offset-4 transition-all duration-300">
            Newsletter
          </a>
          <a href="/resources" className="text-[13px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] underline decoration-transparent hover:decoration-[var(--color-text-primary)] underline-offset-4 transition-all duration-300">
            Resources
          </a>
          <a href="/services" className="text-[13px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] underline decoration-transparent hover:decoration-[var(--color-text-primary)] underline-offset-4 transition-all duration-300">
            Services
          </a>
          <a href="/about" className="text-[13px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] underline decoration-transparent hover:decoration-[var(--color-text-primary)] underline-offset-4 transition-all duration-300">
            About
          </a>
          <a href="?modal=contact" className="text-[13px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] underline decoration-transparent hover:decoration-[var(--color-text-primary)] underline-offset-4 transition-all duration-300">
            Contact
          </a>

          {/* Search Button */}
          {onSearchClick && (
            <button
              onClick={onSearchClick}
              className="flex items-center gap-2 px-3 py-1.5 border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-md transition group"
            >
              <Search className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)]" />
              <span className="text-xs bg-[var(--color-surface)] px-1.5 py-0.5 rounded text-[var(--color-text-faint)]">
                S
              </span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-accent)] flex items-center justify-center transition-all duration-200"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Social Icons */}
          <div className="hidden md:flex items-center gap-3 ml-2">
            <a
              href={portfolioData?.linkedin || "https://linkedin.com/in/collin-wilkins"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={portfolioData?.github || "https://github.com/cwilkins507"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/CollinWilkins7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
