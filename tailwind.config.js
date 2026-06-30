/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Themeable neutrals — channels live in index.css (:root = light, .dark = dark).
        ground: 'rgb(var(--c-ground) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        slate2: 'rgb(var(--c-slate2) / <alpha-value>)',
        steel: 'rgb(var(--c-steel) / <alpha-value>)',
        panel: 'rgb(var(--c-panel) / <alpha-value>)',
        hairline: 'rgb(var(--c-hairline) / <alpha-value>)',
        hairsoft: 'rgb(var(--c-hairsoft) / <alpha-value>)',
        // Text — themeable
        cloud: 'rgb(var(--c-cloud) / <alpha-value>)',
        mist: 'rgb(var(--c-mist) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        faint: 'rgb(var(--c-faint) / <alpha-value>)',
        // Stage colours (fixed — read on both themes)
        foundation: { DEFAULT: '#5E92B3', deep: '#34607C', chip: '#3F6E8C' },
        generative: { DEFAULT: '#45C3B9', deep: '#27928B', chip: '#2FA39B' },
        agentic: { DEFAULT: '#8E86F0', deep: '#5F54D8', chip: '#6E63E6' },
        physical: { DEFAULT: '#F0A95E', deep: '#CE7A2E', chip: '#E08A3C' },
        // Energy + governance — gold.DEFAULT flips (deep gold for text on light); light/deep fixed for buttons.
        gold: { DEFAULT: 'rgb(var(--c-gold) / <alpha-value>)', light: '#F2D49A', deep: '#D9AE5E' },
        core: { DEFAULT: '#1FA877', light: '#36C794', deep: '#13744F' },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        tamil: ['Catamaran', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        'screen-2xl': '1440px',
      },
      boxShadow: {
        'lift': '0 24px 60px -20px var(--shadow-strong)',
        'card': '0 1px 2px rgba(20,32,43,0.04), 0 12px 32px -16px var(--shadow-soft)',
        'glow-gold': '0 0 40px -8px rgba(230,185,104,0.45)',
      },
      animation: {
        'spin-slow': 'spin 48s linear infinite',
        'spin-slower': 'spin 90s linear infinite',
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 4s linear infinite',
        'pulse-ring': 'pulse-ring 3.5s ease-out infinite',
        'fade-up': 'fade-up 0.7s ease-out both',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.6' },
          '80%,100%': { transform: 'scale(1.7)', opacity: '0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
