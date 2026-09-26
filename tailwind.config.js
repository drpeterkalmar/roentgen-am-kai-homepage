/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Markenrot „Röntgen am Kai“ (#8B2323) als Farbskala.
        // Kontraste (WCAG AA, Text): brand/brand-700/800 auf Weiß ≥ 7:1; brand-300 auf slate-900 ≥ 6:1.
        brand: {
          DEFAULT: '#8B2323',
          50: '#FBF4F4',
          100: '#F5E3E3',
          200: '#EAC5C5',
          300: '#F28B82',
          400: '#D0645D',
          500: '#A83434',
          600: '#8B2323',
          700: '#761D1D',
          800: '#5F1818',
          900: '#471313',
          950: '#2A0B0B',
        },
        // Altbestand (bestehende Komponenten)
        primary: {
          DEFAULT: '#8B2323',
          hover: '#A52A2A',
          soft: 'rgba(139, 35, 35, 0.1)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      lineHeight: {
        relaxed: '1.75',
        loose: '2',
      },
      outlineWidth: {
        3: '3px',
      },
    },
  },
  plugins: [],
};
