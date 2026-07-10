/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F8FA',
        paper: '#FFFFFF',
        charcoal: '#0B1F33',
        bodyText: '#263442',
        slateText: '#687684',
        line: '#DDE3E8',
        navy: '#0B1F33',
        forest: '#137A5A',
        positive: '#137A5A',
        burgundy: '#B54747',
        negative: '#B54747',
        link: '#2F5FA7',
        gold: '#B08D3A',
        acid: '#2F5FA7',
        mist: '#F7F8FA',
      },
      fontFamily: {
        serif: ['"Newsreader"', 'Georgia', 'serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        editorial: '0 20px 60px rgba(11, 31, 51, 0.08)',
        glow: '0 18px 60px rgba(47, 95, 167, 0.12)',
      },
    },
  },
  plugins: [],
};
