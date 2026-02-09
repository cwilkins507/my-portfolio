import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * MagneticButton - Button that subtly follows cursor within hover radius
 *
 * @param {string} href - Link destination
 * @param {React.ReactNode} children - Button text/content
 * @param {string} variant - 'primary' | 'secondary'
 * @param {string} className - Additional CSS classes
 */
export default function MagneticButton({
  href,
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 100;

    if (distance < maxDistance) {
      const strength = 1 - distance / maxDistance;
      setPosition({
        x: deltaX * strength * 0.3,
        y: deltaY * strength * 0.3,
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseClasses =
    variant === 'primary'
      ? 'bg-white text-black hover:bg-zinc-200'
      : 'bg-teal-400 hover:bg-teal-500 hover:shadow-glow-sm hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] text-white';

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`${baseClasses} px-8 py-4 rounded-full font-bold shadow-xl transition-all duration-300 will-change-transform inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={
        prefersReducedMotion
          ? {}
          : {
              x: position.x,
              y: position.y,
            }
      }
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
