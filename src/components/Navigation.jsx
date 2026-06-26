import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { BOOKING_HREF } from '../data/site.js';

const NAV_LINKS = [
  { href: '/articles', label: 'Articles' },
  { href: '/resources', label: 'Resources' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
];

const Navigation = ({ portfolioData }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const hamburgerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    // Focus first focusable element
    const timer = setTimeout(() => {
      menuRef.current?.querySelector('a[href], button:not([disabled])')?.focus();
    }, 100);

    // Trap focus inside overlay
    const onKey = (e) => {
      if (e.key === 'Escape') { setMobileOpen(false); hamburgerRef.current?.focus(); return; }
      if (e.key !== 'Tab') return;
      const focusable = [...menuRef.current?.querySelectorAll('a[href], button:not([disabled])') ?? []];
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);

    // Inert background content
    document.getElementById('page-content')?.setAttribute('inert', '');

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
      document.getElementById('page-content')?.removeAttribute('inert');
    };
  }, [mobileOpen]);

  const close = useCallback(() => setMobileOpen(false), []);
  const dur = prefersReducedMotion ? 0 : 0.25;

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          borderBottom: '1px solid var(--rule)',
          background: 'color-mix(in oklch, var(--paper) 88%, transparent)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          maxWidth: 'var(--maxw)',
          margin: '0 auto',
          padding: '22px clamp(20px, 5vw, 48px)',
        }}>
          <a
            href="/"
            style={{
              fontSize: '19px',
              fontWeight: 600,
              letterSpacing: '-.01em',
              textDecoration: 'none',
              color: 'var(--ink)',
              whiteSpace: 'nowrap',
            }}
          >
            {portfolioData?.name || 'Collin Wilkins'}
          </a>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '26px' }}>
            <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '26px' }}>
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '12px',
                    letterSpacing: '.05em',
                    textDecoration: 'none',
                    color: 'var(--ink-soft)',
                    transition: 'color .15s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-soft)'}
                >
                  {label}
                </a>
              ))}
              <a
                href={BOOKING_HREF}
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '12px',
                  letterSpacing: '.05em',
                  textDecoration: 'none',
                  color: 'var(--ink)',
                  border: '1px solid var(--rule)',
                  borderRadius: '999px',
                  padding: '7px 15px',
                  transition: 'border-color .15s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--rule)'}
              >
                Book a call
              </a>
            </div>

            {/* Hamburger */}
            <button
              ref={hamburgerRef}
              onClick={() => setMobileOpen(p => !p)}
              className="nav-hamburger"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                display: 'none',
              }}
            >
              <div style={{ width: '20px', height: '14px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <motion.span
                  style={{ display: 'block', height: '1.5px', width: '20px', background: 'var(--ink)', transformOrigin: 'center' }}
                  animate={mobileOpen ? { rotate: 45, y: 6.25 } : { rotate: 0, y: 0 }}
                  transition={{ duration: dur }}
                />
                <motion.span
                  style={{ display: 'block', height: '1.5px', width: '20px', background: 'var(--ink)' }}
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: dur }}
                />
                <motion.span
                  style={{ display: 'block', height: '1.5px', width: '20px', background: 'var(--ink)', transformOrigin: 'center' }}
                  animate={mobileOpen ? { rotate: -45, y: -6.25 } : { rotate: 0, y: 0 }}
                  transition={{ duration: dur }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 45,
              background: 'var(--paper)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '32px',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: prefersReducedMotion ? 0 : 0.2 } }}
            exit={{ opacity: 0, transition: { duration: prefersReducedMotion ? 0 : 0.15 } }}
          >
            {/* Close button */}
            <button
              onClick={close}
              aria-label="Close menu"
              style={{
                position: 'absolute',
                top: '20px',
                right: 'clamp(20px, 5vw, 48px)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                color: 'var(--ink)',
                fontSize: '24px',
                lineHeight: 1,
              }}
            >
              ✕
            </button>
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={close}
                style={{
                  fontSize: '28px',
                  fontWeight: 500,
                  letterSpacing: '-.01em',
                  textDecoration: 'none',
                  color: 'var(--ink)',
                  fontFamily: 'var(--serif)',
                }}
              >
                {label}
              </a>
            ))}
            <a
              href={BOOKING_HREF}
              onClick={close}
              className="btn btn-solid"
              style={{ marginTop: '8px' }}
            >
              Book a call
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 680px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
};

export default Navigation;
