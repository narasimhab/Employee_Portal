/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#e0e9f1',
          200: '#c1d3e3',
          300: '#a1bcd5',
          400: '#6186b8',
          500: '#04228c',
          600: '#02145d',
          700: '#010e3a',
          800: '#000925',
          900: '#000612',
        },
        secondary: {
          50: '#faf5ff',
          500: '#a855f7',
          600: '#9333ea',
        },
        accent: {
          blue: '#3b82f6',
          teal: '#14b8a6',
          emerald: '#10b981',
          orange: '#f97316',
          pink: '#ec4899',
          purple: '#a855f7',
          yellow: '#eab308',
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 4px rgba(0,0,0,0.02)',
        'md': '0 10px 25px -5px rgba(0,0,0,0.15)',
      }
    },
  },
  plugins: [],
}
