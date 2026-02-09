/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Moonlight base colors
        'moonlight-bg': '#0a0a0b',
        'moonlight-surface': 'rgba(255, 255, 255, 0.03)',

        // Text hierarchy
        'moonlight-text': {
          primary: '#e4e4e7',
          secondary: '#a1a1aa',
          muted: '#71717a',
          faint: '#52525b',
        },

        // Teal accent (original color scheme)
        teal: {
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        },

        // Category-specific tag colors
        'category-ai': {
          bg: 'rgba(20, 184, 166, 0.15)',
          text: '#2dd4bf',
          border: 'rgba(20, 184, 166, 0.3)',
        },
        'category-engineering': {
          bg: 'rgba(34, 197, 94, 0.15)',
          text: '#4ade80',
          border: 'rgba(34, 197, 94, 0.3)',
        },
        'category-architecture': {
          bg: 'rgba(251, 146, 60, 0.15)',
          text: '#fb923c',
          border: 'rgba(251, 146, 60, 0.3)',
        },
        'category-cloud': {
          bg: 'rgba(56, 189, 248, 0.15)',
          text: '#38bdf8',
          border: 'rgba(56, 189, 248, 0.3)',
        },

        // Keep zinc for backgrounds
        zinc: {
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['DM Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['DM Sans', 'Inter', 'sans-serif'], // Keep for compatibility
      },
      letterSpacing: {
        'tight-headline': '-0.01em',
        'wide-label': '0.08em',
      },
      lineHeight: {
        'headline': '1.2',
        'body': '1.6',
      },
      boxShadow: {
        'glow': '0 12px 40px rgba(45, 212, 191, 0.3)',
        'glow-sm': '0 8px 24px rgba(45, 212, 191, 0.2)',
        'card': '0 12px 32px rgba(0, 0, 0, 0.5)',
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
    'text-emerald-400',
    'text-orange-500',
    'text-cyan-400',
    'text-blue-500',
  ],
}
