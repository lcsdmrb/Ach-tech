import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-outfit)', 'sans-serif'],
      },
      colors: {
        orange: {
          DEFAULT: '#E85A0A',
          dark:    '#C04500',
          light:   '#FF7A35',
        },
      },
      backgroundImage: {
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        'card':  '0 4px 24px rgba(0,0,0,0.25), 0 1px 4px rgba(0,0,0,0.15)',
        'orange':'0 8px 32px rgba(232,90,10,0.35)',
      },
      keyframes: {
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(30px,-20px) scale(1.05)' },
          '66%':     { transform: 'translate(-20px,15px) scale(0.97)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
      },
      animation: {
        'blob-slow':   'blob 12s ease-in-out infinite',
        'blob-slower': 'blob 16s ease-in-out infinite 3s',
        'blob-slowest':'blob 20s ease-in-out infinite 6s',
        'marquee':     'marquee 30s linear infinite',
        'fade-up':     'fadeUp .6s ease-out both',
        'shimmer':     'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
export default config
