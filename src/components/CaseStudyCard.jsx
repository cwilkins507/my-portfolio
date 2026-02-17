import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

/**
 * CaseStudyCard - Animated case study card with hover effects and gradient metrics
 *
 * @param {string} title - Case study title
 * @param {object} metric - Metric object with { value, prefix, suffix, type }
 * @param {string} description - Brief description
 * @param {boolean} featured - If true, card is larger/featured
 * @param {number} index - Card index for stagger animation
 */
export default function CaseStudyCard({ title, metric, description, featured = false, index = 0 }) {
  const cardVariants = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: '0 0 0 rgba(0,0,0,0)',
    },
    hover: {
      scale: 1.01,
      y: -2,
      boxShadow: '0 8px 32px var(--color-shadow-card)',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      data-card-type="case-study"
      className={`rounded-lg p-6 transition-all duration-300 border will-change-transform ${
        featured ? 'md:col-span-2' : ''
      } hover:bg-[var(--color-surface-hover)]`}
      style={{
        background: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
      }}
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <h3 className="text-lg font-serif font-semibold text-[var(--color-text-primary)] mb-2">{title}</h3>

      {/* Metric with gradient text and animated counter */}
      <p className="text-2xl font-mono font-bold mb-2">
        <span
          className="text-[var(--color-accent)]"
        >
          {metric.type === 'counter' ? (
            <AnimatedCounter
              value={metric.value}
              prefix={metric.prefix}
              suffix={metric.suffix}
            />
          ) : (
            `${metric.prefix}${metric.value}${metric.suffix}`
          )}
        </span>
        <noscript>
          <span className="text-[var(--color-accent)]">
            {metric.prefix}{metric.value}{metric.suffix}
          </span>
        </noscript>
      </p>

      <p className="text-[var(--color-text-secondary)] text-sm">{description}</p>
    </motion.div>
  );
}
