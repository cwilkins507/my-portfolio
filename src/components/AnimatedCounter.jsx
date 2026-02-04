import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

/**
 * AnimatedCounter - Counts from 0 to target value when scrolled into view
 *
 * @param {number} value - Target number to count to
 * @param {string} prefix - Text before number (e.g., "$")
 * @param {string} suffix - Text after number (e.g., "M", "%")
 * @param {number} duration - Animation duration in seconds (default: 2)
 * @param {string} className - Additional CSS classes
 */
export default function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  className = ''
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(latest);
    });

    return () => unsubscribe();
  }, [springValue]);

  // Format number with appropriate decimal places
  const formatValue = (num) => {
    // If original value is an integer, show integer
    if (Number.isInteger(value)) {
      return Math.floor(num).toLocaleString();
    }
    // Otherwise, show 1 decimal place
    return num.toFixed(1);
  };

  return (
    <>
      <span ref={ref} className={className}>
        {prefix}{formatValue(displayValue)}{suffix}
      </span>
      <noscript>
        <span className={className}>
          {prefix}{formatValue(value)}{suffix}
        </span>
      </noscript>
    </>
  );
}
