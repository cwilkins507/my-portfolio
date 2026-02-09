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
      boxShadow: '0 0 0 rgba(20,184,166,0)',
    },
    hover: {
      scale: 1.01,
      y: -2,
      boxShadow: '0 8px 32px rgba(20,184,166,0.1)',
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
      } hover:bg-[rgba(255,255,255,0.05)]`}
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
      }}
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <h3 className="text-lg font-serif font-semibold text-white mb-2">{title}</h3>

      {/* Metric with gradient text and animated counter */}
      <p className="text-2xl font-mono font-bold mb-2">
        <span
          className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
          style={{
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
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
          <span
            className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
            style={{
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {metric.prefix}{metric.value}{metric.suffix}
          </span>
        </noscript>
      </p>

      <p className="text-zinc-400 text-sm">{description}</p>
    </motion.div>
  );
}
