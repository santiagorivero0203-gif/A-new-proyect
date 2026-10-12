/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#f5f5f7',
          subtle: '#fafafc',
          muted: '#ebebeb',
        },
        card: {
          DEFAULT: '#ffffff',
          hover: '#fbfbfd',
          subtle: '#f7f7f9',
        },
        text: {
          primary: '#1d1d1f',
          secondary: '#64748b',
          muted: '#86868b',
          light: '#94a3b8',
        },
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          500: '#0071e3', // Apple Blue elegante
          600: '#005bb5',
          700: '#0047ab', // Azul Cobalto Institucional
          800: '#003580',
        },
        academic: {
          castellano: '#e11d48',
          biologia: '#059669',
          quimica: '#7c3aed',
          fisica: '#0284c7',
          matematica: '#d97706',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'soft-sm': '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'soft-md': '0 4px 16px rgba(0, 0, 0, 0.05), 0 2px 6px rgba(0, 0, 0, 0.02)',
        'soft-lg': '0 10px 30px rgba(0, 0, 0, 0.06), 0 4px 10px rgba(0, 0, 0, 0.03)',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
