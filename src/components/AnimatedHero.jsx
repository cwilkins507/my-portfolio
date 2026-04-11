/**
 * Hero - Static practitioner-style hero section.
 *
 * Renders instantly with no entrance animations. Word emphasis (gold italic on
 * specified words) is preserved. Newsletter signup lives in the footer only.
 *
 * Previously "AnimatedHero" with framer-motion stagger reveal; stripped to
 * match the practitioner/CV positioning. File name kept to avoid churn across
 * imports — rename to Hero.jsx is a low-risk follow-up.
 *
 * @param {string} headline - Main headline text
 * @param {string} subheadline - Subheadline / bio paragraph (optional)
 * @param {string} supportingStat - Supporting stat or proof point (optional)
 * @param {string} sourceUrl - URL for the supporting stat citation (optional)
 * @param {string} subtext - Additional subtext (optional)
 * @param {string} pricingHint - Pricing transparency line (optional)
 * @param {Array} ctas - Array of CTA objects with { href, text, variant }
 * @param {Array} emphasizeWords - Words to render in gold italic
 */
export default function AnimatedHero({
  headline,
  subheadline,
  supportingStat,
  sourceUrl,
  subtext,
  pricingHint,
  ctas = [],
  emphasizeWords: emphasizeWordsProp,
}) {
  const words = headline.split(' ');
  const emphasizeWords = emphasizeWordsProp || [];

  return (
    <section className="py-16 md:py-24 text-center relative">
      <div className="max-w-3xl mx-auto px-4">
        {/* Profile photo */}
        <div className="mb-8">
          <img
            src="/images/profile_photo.png"
            alt="Collin Wilkins"
            className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover mx-auto border-2 border-[var(--color-border-hover)] shadow-[0_0_40px_var(--color-shadow-card)]"
          />
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[var(--color-text-primary)] mb-6 leading-[1.25]">
          {words.map((word, index) => {
            const shouldEmphasize = emphasizeWords.includes(word);
            return (
              <span
                key={`${word}-${index}`}
                className={`inline-block mr-2 md:mr-3 ${shouldEmphasize ? 'text-[var(--color-accent)] font-semibold italic' : ''}`}
              >
                {word}
              </span>
            );
          })}
        </h1>

        {/* Subheadline */}
        {subheadline && (
          <p className="text-lg md:text-xl text-moonlight-text-secondary mb-2">
            {subheadline}
          </p>
        )}

        {/* Supporting Stat */}
        {supportingStat && (
          <div className="mb-4">
            <p className="text-sm text-moonlight-text-muted italic">
              {supportingStat}
            </p>
            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-moonlight-text-faint hover:text-[var(--color-accent)] transition-colors underline decoration-dotted"
              >
                [Source]
              </a>
            )}
          </div>
        )}

        {/* Subtext */}
        {subtext && (
          <p className="text-base md:text-lg text-moonlight-text-muted mb-4">
            {subtext}
          </p>
        )}

        {/* Pricing Hint */}
        {pricingHint && (
          <p className="text-sm md:text-base text-[var(--color-accent)] font-medium mb-8">
            {pricingHint}
          </p>
        )}

        {/* CTAs - simple anchors, no magnetic/motion effects */}
        {ctas.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            {ctas.map((cta) => {
              const isPrimary = cta.variant === 'primary';
              const className = isPrimary
                ? 'inline-block px-6 py-3 text-sm font-semibold rounded-lg bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors'
                : 'inline-block px-6 py-3 text-sm font-semibold rounded-lg border border-[var(--color-border-hover)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors';
              return (
                <a key={cta.href} href={cta.href} className={className}>
                  {cta.text}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
