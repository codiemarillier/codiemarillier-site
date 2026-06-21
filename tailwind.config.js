/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#f6f1e8',
        paper: '#fbf8f2',
        charcoal: '#171717',
        slateText: '#4c4a44',
        line: '#ded5c6',
        navy: '#122238',
        forest: '#1f3a2f',
        burgundy: '#5a2730',
        gold: '#9b7b3f',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        editorial: '0 24px 70px rgba(18, 34, 56, 0.10)',
      },
    },
  },
  plugins: [],
};
