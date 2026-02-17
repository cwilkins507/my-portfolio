/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware semantic tokens (via CSS custom properties)
        'theme-bg': 'var(--color-bg)',
        'theme-surface': 'var(--color-surface)',
        'theme-surface-hover': 'var(--color-surface-hover)',
        'theme-border': 'var(--color-border)',
        'theme-border-hover': 'var(--color-border-hover)',

        'theme-text': {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          faint: 'var(--color-text-faint)',
        },

        // Gold accent
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          muted: 'var(--color-accent-muted)',
          border: 'var(--color-accent-border)',
        },

        // Keep moonlight-text aliases for gradual migration
        'moonlight-text': {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          faint: 'var(--color-text-faint)',
        },

        // Keep zinc for utility usage
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
        display: ['DM Sans', 'Inter', 'sans-serif'],
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
        'card': '0 12px 32px var(--color-shadow-card)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  safelist: [
    'bg-accent',
    'text-accent',
    'border-accent',
    'hover:text-accent',
  ],
}
