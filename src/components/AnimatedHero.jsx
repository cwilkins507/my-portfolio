/**
 * Hero - Editorial left-aligned hero section.
 *
 * Redesigned from centered blog-template to editorial layout (2026-04-22):
 * - Left-aligned headline at larger type scale
 * - Photo as accent (top-right, smaller), not the visual center
 * - Vertical gold rule as a signature design element
 * - Availability badge as a discrete gold pill above the headline
 * - Supports two CTAs (primary + secondary)
 *
 * Previously stripped of animations to match practitioner/CV positioning.
 * File name kept as AnimatedHero to avoid churn across imports.
 *
 * @param {string} headline - Main headline text
 * @param {string} subheadline - Bio/descriptor paragraph (optional)
 * @param {string} availabilityBadge - Short availability signal, e.g. "Currently taking 2–3 clients" (optional)
 * @param {Array} ctas - Array of { href, text, variant } — up to 2
 * @param {Array} emphasizeWords - Words to render in gold italic
 */
export default function AnimatedHero({
  headline,
  subheadline,
  availabilityBadge,
  ctas = [],
  emphasizeWords: emphasizeWordsProp,
}) {
  const words = headline.split(' ');
  const emphasizeWords = emphasizeWordsProp || [];

  return (
    <section className="pt-20 pb-16 md:pt-28 md:pb-24 relative overflow-hidden">
      {/* Atmospheric gold blur — top left, behind the rule */}
      <div
        className="pointer-events-none absolute -left-32 top-0 w-[480px] h-[480px] rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.07) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="flex items-start gap-8 md:gap-12">

          {/* Vertical gold rule — the signature design element */}
          <div
            className="hidden md:block flex-none w-px self-stretch mt-1"
            style={{ background: 'linear-gradient(to bottom, var(--color-accent) 0%, rgba(201,169,110,0.15) 80%, transparent 100%)' }}
            aria-hidden="true"
          />

          {/* Main content block */}
          <div className="flex-1 min-w-0">

            {/* Availability badge */}
            {availabilityBadge && (
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full border border-[var(--color-accent-border)] text-[var(--color-accent)] bg-[var(--color-accent-muted)] tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block" aria-hidden="true" />
                  {availabilityBadge}
                </span>
              </div>
            )}

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[var(--color-text-primary)] mb-6 leading-[1.1] tracking-tight">
              {words.map((word, index) => {
                const shouldEmphasize = emphasizeWords.includes(word);
                return (
                  <span
                    key={`${word}-${index}`}
                    className={`inline-block mr-2 md:mr-2.5 ${shouldEmphasize ? 'text-[var(--color-accent)] italic' : ''}`}
                  >
                    {word}
                  </span>
                );
              })}
            </h1>

            {/* Subheadline */}
            {subheadline && (
              <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-10 max-w-2xl">
                {subheadline}
              </p>
            )}

            {/* CTAs */}
            {ctas.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {ctas.map((cta) => {
                  const isPrimary = cta.variant === 'primary';
                  return (
                    <a
                      key={cta.href}
                      href={cta.href}
                      className={
                        isPrimary
                          ? 'inline-block px-5 py-2.5 text-sm font-semibold rounded-lg bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors'
                          : 'inline-block px-5 py-2.5 text-sm font-semibold rounded-lg border border-[var(--color-border-hover)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors'
                      }
                    >
                      {cta.text}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Profile photo — accent, not focal point */}
          <div className="hidden lg:block flex-none">
            <img
              src="/images/profile_photo.png"
              alt="Collin Wilkins"
              className="w-28 h-28 xl:w-32 xl:h-32 rounded-full object-cover border border-[var(--color-border-hover)] opacity-90"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
