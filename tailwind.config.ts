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
          DEFAULT: '#FF6B1A',
          dark:    '#D95500',
          light:   '#FF8C47',
          faint:   'rgba(255,107,26,0.08)',
        },
      },
      boxShadow: {
        'glass':  '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)',
        'glass-light': '0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
        'orange': '0 8px 28px rgba(255,107,26,0.35)',
        'card':   '0 2px 16px rgba(0,0,0,0.08)',
      },
      keyframes: {
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(28px,-18px) scale(1.04)' },
          '66%':     { transform: 'translate(-18px,14px) scale(0.97)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'blob-1':    'blob 14s ease-in-out infinite',
        'blob-2':    'blob 18s ease-in-out infinite 3s',
        'blob-3':    'blob 22s ease-in-out infinite 6s',
        'marquee':   'marquee 32s linear infinite',
        'float':     'float 4s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
      },
    },
  },
  plugins: [],
}
export default config
