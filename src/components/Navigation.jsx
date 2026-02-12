import React, { useState, useEffect } from 'react';
import { Linkedin, Github, Search } from 'lucide-react';

const Navigation = ({ portfolioData, onSearchClick }) => {
  const [scrolled, setScrolled] = useState(false);

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
        background: 'rgba(10, 10, 11, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="max-w-[960px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="font-serif text-lg font-medium text-moonlight-text-primary hover:text-teal-400 transition">
          {portfolioData?.name || 'Collin Wilkins'}
        </a>

        {/* Right Side: Links + Search */}
        <div className="flex items-center gap-6">
          <a href="/articles" className="text-[13px] text-moonlight-text-muted hover:text-moonlight-text-primary underline decoration-transparent hover:decoration-teal-400 underline-offset-4 transition-all duration-300">
            Articles
          </a>
          <a href="/resources" className="text-[13px] text-moonlight-text-muted hover:text-moonlight-text-primary underline decoration-transparent hover:decoration-teal-400 underline-offset-4 transition-all duration-300">
            Resources
          </a>
          <a href="/services" className="text-[13px] text-moonlight-text-muted hover:text-moonlight-text-primary underline decoration-transparent hover:decoration-teal-400 underline-offset-4 transition-all duration-300">
            Services
          </a>
          <a href="/about" className="text-[13px] text-moonlight-text-muted hover:text-moonlight-text-primary underline decoration-transparent hover:decoration-teal-400 underline-offset-4 transition-all duration-300">
            About
          </a>
          <a href="?modal=contact" className="text-[13px] text-moonlight-text-muted hover:text-moonlight-text-primary underline decoration-transparent hover:decoration-teal-400 underline-offset-4 transition-all duration-300">
            Contact
          </a>

          {/* Search Button */}
          {onSearchClick && (
            <button
              onClick={onSearchClick}
              className="flex items-center gap-2 px-3 py-1.5 border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] rounded-md transition group"
            >
              <Search className="w-4 h-4 text-moonlight-text-muted group-hover:text-teal-400" />
              <span className="text-xs bg-[rgba(255,255,255,0.1)] px-1.5 py-0.5 rounded text-moonlight-text-faint">
                S
              </span>
            </button>
          )}

          {/* Social Icons */}
          <div className="hidden md:flex items-center gap-3 ml-2">
            <a
              href={portfolioData?.linkedin || "https://linkedin.com/in/collin-wilkins"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-moonlight-text-muted hover:text-teal-400 transition"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={portfolioData?.github || "https://github.com/cwilkins507"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-moonlight-text-muted hover:text-teal-400 transition"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
