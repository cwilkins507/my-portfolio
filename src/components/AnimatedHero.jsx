import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import MagneticButton from './MagneticButton';

/**
 * AnimatedHero - Hero section with stagger word-by-word text reveal animation
 *
 * @param {string} headline - Main headline text
 * @param {string} subheadline - Subheadline text (optional)
 * @param {string} supportingStat - Supporting statistic or proof point (optional)
 * @param {string} sourceUrl - URL for the supporting stat citation (optional)
 * @param {string} subtext - Additional subtext (optional)
 * @param {string} pricingHint - Pricing transparency line (optional)
 * @param {Array} ctas - Array of CTA objects with { href, text, variant }
 */
export default function AnimatedHero({ headline, subheadline, supportingStat, sourceUrl, subtext, pricingHint, ctas = [], showNewsletter = false }) {
  const prefersReducedMotion = useReducedMotion();

  // Split headline into words for stagger animation
  const words = headline.split(' ');

  // Words to emphasize in teal italic
  const emphasizeWords = ['Small', 'Teams', 'Drowning', 'Manual'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom easing for smooth reveal
      },
    },
  };

  const subheadlineVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: words.length * 0.08 + 0.3,
        ease: 'easeOut',
      },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: words.length * 0.08 + 0.6 + i * 0.1,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section className="py-16 md:py-24 text-center relative overflow-hidden">
      {/* Atmospheric blur depth effect */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[480px] z-0 hidden md:block"
        style={{
          background: 'linear-gradient(135deg, rgba(20,184,166,0.15), rgba(139,92,246,0.08), transparent)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      {/* Background grid pattern + gradient */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(20,184,166,0.15), transparent 50%)',
          backgroundImage: `
            linear-gradient(rgba(45,212,191,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45,212,191,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Profile photo */}
        <motion.div
          className="mb-8"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
          animate={prefersReducedMotion ? false : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/images/profile_photo.png"
            alt="Collin Wilkins"
            className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover mx-auto border-2 border-[rgba(255,255,255,0.1)] shadow-[0_0_40px_rgba(20,184,166,0.15)]"
          />
        </motion.div>

        {/* Animated headline with stagger effect */}
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-[1.25]"
          variants={prefersReducedMotion ? {} : containerVariants}
          initial={prefersReducedMotion ? false : "hidden"}
          animate={prefersReducedMotion ? false : "visible"}
        >
          {words.map((word, index) => {
            const shouldEmphasize = emphasizeWords.includes(word);
            return (
              <motion.span
                key={`${word}-${index}`}
                variants={prefersReducedMotion ? {} : wordVariants}
                className={`inline-block mr-2 md:mr-3 ${shouldEmphasize ? 'text-teal-400 font-semibold italic' : ''}`}
              >
                {word}
              </motion.span>
            );
          })}
        </motion.h1>

        {/* Subheadline with fade-in */}
        {subheadline && (
          <motion.p
            className="text-lg md:text-xl text-moonlight-text-secondary mb-2"
            variants={subheadlineVariants}
            initial="hidden"
            animate="visible"
          >
            {subheadline}
          </motion.p>
        )}

        {/* Supporting Stat */}
        {supportingStat && (
          <motion.div
            className="mb-4"
            variants={subheadlineVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-sm text-moonlight-text-muted italic">
              {supportingStat}
            </p>
            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-moonlight-text-faint hover:text-teal-400 transition-colors underline decoration-dotted"
              >
                [Source]
              </a>
            )}
          </motion.div>
        )}

        {/* Subtext */}
        {subtext && (
          <motion.p
            className="text-base md:text-lg text-moonlight-text-muted mb-4"
            variants={subheadlineVariants}
            initial="hidden"
            animate="visible"
          >
            {subtext}
          </motion.p>
        )}

        {/* Pricing Hint */}
        {pricingHint && (
          <motion.p
            className="text-sm md:text-base text-teal-400 font-medium mb-8"
            variants={subheadlineVariants}
            initial="hidden"
            animate="visible"
          >
            {pricingHint}
          </motion.p>
        )}

        {/* CTAs with stagger and magnetic effect */}
        {ctas.length > 0 && (
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            variants={prefersReducedMotion ? {} : ctaVariants}
            initial={prefersReducedMotion ? false : "hidden"}
            animate={prefersReducedMotion ? false : "visible"}
          >
            {ctas.map((cta, index) => (
              <MagneticButton
                key={cta.href}
                href={cta.href}
                variant={cta.variant}
              >
                {cta.text}
              </MagneticButton>
            ))}
          </motion.div>
        )}

        {/* Newsletter Signup */}
        {showNewsletter && (
          <motion.div
            className="mt-10 max-w-md mx-auto"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: words.length * 0.08 + 0.9,
              ease: 'easeOut',
            }}
          >
            <p className="text-sm text-moonlight-text-muted mb-3">Bi-weekly emails on automation, AI, and systems that run without you.</p>
            <form
              action="https://buttondown.com/api/emails/embed-subscribe/collinwilkins"
              method="post"
              target="popupwindow"
              className="flex gap-2"
            >
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="flex-1 px-3 py-2 text-sm bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white placeholder-[#71717a] focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-400 transition-all duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
}
