/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        blue: {
          500: '#3b82f6',
          600: '#2563eb',
        },
        orange: {
          500: '#f97316',
        },
        emerald: {
          400: '#34d399',
        },
        gray: {
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        zinc: {
          400: '#a1a1aa',
          800: '#27272a',
          950: '#09090b',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 40px rgba(45,212,191,0.3)',
        'glow-sm': '0 0 20px rgba(45,212,191,0.2)',
        'card': '0 12px 32px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  safelist: [
    'bg-teal-400',
    'bg-teal-500',
    'bg-teal-600',
    'text-teal-300',
    'text-teal-400',
    'text-teal-500',
    'border-teal-400',
    'hover:text-teal-400',
    'hover:bg-teal-500',
    'hover:bg-teal-600',
    'text-cyan-400',
    'text-blue-500',
    'text-emerald-400',
    'text-orange-500',
  ],
}
