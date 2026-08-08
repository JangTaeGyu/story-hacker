import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // NOCTURNE — dark literary mystery palette
        'noct-black': '#100f0d',
        'noct-black-2': '#15130f',
        // globals.css의 --noct-page와 같은 값. 양쪽을 함께 유지할 것.
        'noct-page': '#0a0908',
        'noct-ink': '#cfc7b8',
        'noct-ink-dim': '#837c6e',
        'noct-ink-faint': '#565045',
        'noct-gold': '#c9a86a',
        'noct-gold-dim': '#8f7a4e',
      },
      fontFamily: {
        display: ['Song Myung', 'serif'],
        serif: ['Nanum Myeongjo', 'serif'],
        mono: ['Space Mono', 'SF Mono', 'monospace'],
      },
      animation: {
        'shake': 'shake 0.4s ease-in-out',
        'fade-in': 'fadeIn 0.6s ease-out both',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.2,0.7,0.2,1) both',
        'reveal': 'reveal 1.4s ease-out both',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-7px)' },
          '40%': { transform: 'translateX(6px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(3px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        reveal: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
