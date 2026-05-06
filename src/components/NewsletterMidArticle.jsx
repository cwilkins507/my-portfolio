import React from 'react';

const NewsletterMidArticle = () => {
  return (
    <aside className="my-16 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 md:p-12 relative overflow-hidden backdrop-blur-xl flex flex-col items-center text-center">
      <div
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
        aria-hidden="true"
      />

      <h3 className="font-serif text-2xl font-bold text-[var(--color-text-primary)] mb-3 md:text-[1.8rem]">
        Notes from production.
      </h3>
      <p className="text-[1.05rem] text-[var(--color-text-secondary)] leading-relaxed max-w-[460px] mb-8">
        Every other week: working playbooks on AI coding tools, convention files, and automation architecture. The production details that decide whether the work survives past the demo.
      </p>

      <form
        action="https://buttondown.com/api/emails/embed-subscribe/collinwilkins"
        method="post"
        target="popupwindow"
        className="flex flex-col sm:flex-row gap-3 w-full max-w-[440px]"
      >
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          className="flex-1 min-h-12 px-5 py-3 text-[0.95rem] bg-[rgba(0,0,0,0.3)] border border-[var(--color-border)] rounded-full text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[rgba(255,255,255,0.25)] focus:bg-[rgba(0,0,0,0.5)] transition-all font-sans"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center min-h-12 px-7 rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] font-semibold text-[0.95rem] transition-all hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 shadow-[0_16px_50px_rgba(201,169,110,0.18)]"
        >
          Subscribe
        </button>
      </form>

      <p className="text-xs text-[var(--color-text-muted)] mt-4">
        No spam. Unsubscribe anytime.
      </p>
    </aside>
  );
};

export default NewsletterMidArticle;
