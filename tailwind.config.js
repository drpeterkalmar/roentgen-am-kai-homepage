/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B2323',
          hover: '#A52A2A',
          soft: 'rgba(139, 35, 35, 0.1)',
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      lineHeight: {
        'relaxed': '1.75',
        'loose': '2',
      }
    },
  },
  plugins: [],
}
