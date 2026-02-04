import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import MagneticButton from './MagneticButton';

/**
 * AnimatedHero - Hero section with stagger word-by-word text reveal animation
 *
 * @param {string} headline - Main headline text
 * @param {string} subheadline - Subheadline text (optional)
 * @param {string} subtext - Additional subtext (optional)
 * @param {Array} ctas - Array of CTA objects with { href, text, variant }
 */
export default function AnimatedHero({ headline, subheadline, subtext, ctas = [] }) {
  const prefersReducedMotion = useReducedMotion();

  // Split headline into words for stagger animation
  const words = headline.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
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
    <section className="py-20 md:py-32 text-center relative overflow-hidden">
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
        {/* Animated headline with stagger effect */}
        <motion.h1
          className="text-4xl md:text-7xl lg:text-8xl font-serif font-extrabold text-white mb-6 leading-tight"
          variants={prefersReducedMotion ? {} : containerVariants}
          initial={prefersReducedMotion ? false : "hidden"}
          animate={prefersReducedMotion ? false : "visible"}
        >
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              variants={prefersReducedMotion ? {} : wordVariants}
              className="inline-block mr-3 md:mr-4"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheadline with fade-in */}
        {subheadline && (
          <motion.p
            className="text-xl md:text-2xl text-zinc-400 mb-2"
            variants={subheadlineVariants}
            initial="hidden"
            animate="visible"
          >
            {subheadline}
          </motion.p>
        )}

        {/* Subtext */}
        {subtext && (
          <motion.p
            className="text-lg md:text-xl text-zinc-500 mb-8"
            variants={subheadlineVariants}
            initial="hidden"
            animate="visible"
          >
            {subtext}
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
      </div>
    </section>
  );
}
