import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, Twitter, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useReducedMotion } from '../hooks/useReducedMotion';

const NAV_LINKS = [
  { href: '/articles', label: 'Articles' },
  { href: '/newsletter', label: 'Newsletter' },
  { href: '/resources', label: 'Resources' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/?modal=contact', label: 'Contact' },
];

const Navigation = ({ portfolioData, onSearchClick }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const hamburgerRef = useRef(null);
  const menuRef = useRef(null);

  // Global keyboard shortcut for search
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (
        e.key === 's' &&
        !e.target.isContentEditable &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)
      ) {
        e.preventDefault();
        onSearchClick?.();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onSearchClick]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close on Escape, trap focus, and auto-focus first item on open
  useEffect(() => {
    if (!mobileOpen) return;

    // Auto-focus first focusable element after animation starts
    const focusTimer = setTimeout(() => {
      menuRef.current?.querySelector('a[href], button:not([disabled])')?.focus();
    }, 100);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll(
          'a[href], button:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Memoized animation variants
  const overlayVariants = useMemo(() => ({
    closed: { opacity: 0, transition: { duration: prefersReducedMotion ? 0 : 0.2 } },
    open: { opacity: 1, transition: { duration: prefersReducedMotion ? 0 : 0.3 } },
  }), [prefersReducedMotion]);

  const menuVariants = useMemo(() => ({
    closed: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.04, staggerDirection: -1 } },
    open: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.07, delayChildren: prefersReducedMotion ? 0 : 0.1 } },
  }), [prefersReducedMotion]);

  const itemVariants = useMemo(() => ({
    closed: { y: prefersReducedMotion ? 0 : 20, opacity: 0 },
    open: {
      y: 0,
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { type: 'spring', stiffness: 300, damping: 24 },
    },
  }), [prefersReducedMotion]);

  const barTransition = useMemo(
    () => prefersReducedMotion ? { duration: 0 } : { duration: 0.3 },
    [prefersReducedMotion]
  );

  return (
    <>
      {/* Nav bar — z-[55] so it sits above the mobile overlay and grain texture */}
      <nav
        className="fixed top-0 left-0 right-0 z-[55] transition-all duration-300"
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

          {/* Right Side: Links + Search (desktop) */}
          <div className="flex items-center gap-6">
            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="text-[13px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] underline decoration-transparent hover:decoration-[var(--color-text-primary)] underline-offset-4 transition-all duration-300"
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Search Button (desktop) */}
            {onSearchClick && (
              <button
                onClick={onSearchClick}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-md transition group"
              >
                <Search className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)]" />
                <span className="text-xs bg-[var(--color-surface)] px-1.5 py-0.5 rounded text-[var(--color-text-faint)]">
                  S
                </span>
              </button>
            )}

            {/* Theme Toggle (always visible) */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-accent)] flex items-center justify-center transition-all duration-200"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Social Icons (desktop) */}
            <div className="hidden md:flex items-center gap-3 ml-2">
              <a
                href={portfolioData?.linkedin || "https://linkedin.com/in/collin-wilkins"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={portfolioData?.github || "https://github.com/cwilkins507"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/CollinWilkins7"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter profile"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            {/* Hamburger Button (mobile) — animates to X when open */}
            <button
              ref={hamburgerRef}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-md"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <motion.span
                  className="block h-[1.5px] w-5 bg-[var(--color-text-primary)] origin-center"
                  animate={mobileOpen
                    ? { rotate: 45, y: 7.25 }
                    : { rotate: 0, y: 0 }
                  }
                  transition={barTransition}
                />
                <motion.span
                  className="block h-[1.5px] w-5 bg-[var(--color-text-primary)]"
                  animate={mobileOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                  }
                  transition={barTransition}
                />
                <motion.span
                  className="block h-[1.5px] w-5 bg-[var(--color-text-primary)] origin-center"
                  animate={mobileOpen
                    ? { rotate: -45, y: -7.25 }
                    : { rotate: 0, y: 0 }
                  }
                  transition={barTransition}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay — z-[52] above grain (z-50) but below nav bar (z-[55]) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-menu"
            ref={menuRef}
            className="fixed inset-0 z-[52] flex flex-col items-center justify-center"
            style={{ background: 'var(--color-bg)' }}
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Nav Links */}
            <motion.nav
              className="flex flex-col items-center gap-6"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map(({ href, label }) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={closeMobile}
                  className="text-3xl font-serif text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors duration-200 py-1"
                  variants={itemVariants}
                >
                  {label}
                </motion.a>
              ))}

              {/* Divider */}
              <motion.div
                className="w-12 h-px my-2"
                style={{ background: 'var(--color-border)' }}
                variants={itemVariants}
              />

              {/* Search Button */}
              {onSearchClick && (
                <motion.button
                  onClick={() => { closeMobile(); onSearchClick(); }}
                  className="flex items-center gap-2 px-4 py-2 border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-md transition text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  variants={itemVariants}
                >
                  <Search className="w-4 h-4" />
                  <span className="text-sm">Search</span>
                </motion.button>
              )}

              {/* Social Icons */}
              <motion.div
                className="flex items-center gap-5 mt-2"
                variants={itemVariants}
              >
                <a
                  href={portfolioData?.linkedin || "https://linkedin.com/in/collin-wilkins"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="w-11 h-11 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={portfolioData?.github || "https://github.com/cwilkins507"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="w-11 h-11 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/CollinWilkins7"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter profile"
                  className="w-11 h-11 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
