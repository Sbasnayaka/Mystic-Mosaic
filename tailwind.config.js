/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // We will toggle this manually for precise control
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"VT323"', 'monospace'], // 90s terminal/header font
        retro: ['"Press Start 2P"', 'cursive'], // Occasional chunky labels
        body: ['"Inter"', 'system-ui', 'sans-serif'], // Readable body text
      },
      colors: {
        // Light Mode (Dreamy, warm, magical)
        magic: {
          50: '#fdf8f6',   // Warm cream
          100: '#f2e8e5',  // Soft parchment
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#a0939e',  // Soft lavender gray
          600: '#817384',
          700: '#6b5b6e',
          800: '#5a4a5c',
          900: '#4a3a4b',
        },
        accent: {
          light: '#fbbf24', // Magical yellow/gold highlight
          DEFAULT: '#8b5cf6', // Electric lavender
          dark: '#6d28d9',
        },
        // Dark Mode (Cosmic, mysterious, nostalgic)
        cosmic: {
          900: '#0f0a1e',   // Deep near-black navy
          800: '#1a1230',   // Dark purple
          700: '#251c45',
          600: '#32285c',
          500: '#4c3b82',
          400: '#6b5b9f',   // Muted electric lavender
          300: '#9083c2',
          200: '#c4b9e6',
          100: '#e6e0f5',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        }
      }
    },
  },
  plugins: [],
}