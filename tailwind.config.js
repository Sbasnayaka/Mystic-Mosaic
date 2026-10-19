/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // We will toggle dark mode manually by adding a 'dark' class to the HTML
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"VT323"', 'monospace'], // For headings and retro UI
        body: ['"Inter"', 'sans-serif'], // For readable body text
      },
      colors: {
        // Whimsical Light Mode
        magic: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#a08075', // Soft retro brown/pink
          600: '#8a6a60',
          700: '#74554b',
          800: '#5e4037',
          900: '#482c23',
        },
        // Cosmic Dark Mode
        cosmic: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          800: '#1a202c', // Deep navy
          900: '#111827', // Near black
          950: '#0B0D17', // Void black
        },
        accent: '#A78BFA', // Electric lavender for magical highlights
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}