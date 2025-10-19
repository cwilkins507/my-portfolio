/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
        gray: {
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
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
  ],
}
