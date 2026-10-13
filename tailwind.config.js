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
          DEFAULT: '#f8fafc',
          subtle: '#ffffff',
          muted: '#f1f5f9',
        },
        card: {
          DEFAULT: '#ffffff',
          hover: '#f8fafc',
          subtle: '#f1f5f9',
        },
        text: {
          primary: '#0f172a', // Grafito profundo y nítido
          secondary: '#64748b', // Gris medio para textos secundarios
          muted: '#94a3b8',
          light: '#cbd5e1',
        },
        // Azul Cobalto Original Simadi (#0F52BA) como acento institucional
        brand: {
          50: '#f0f5ff',
          100: '#e0ecff',
          200: '#bad4fe',
          300: '#85b3fd',
          400: '#4789fa',
          500: '#0F52BA', // Azul Cobalto Puro Simadi
          600: '#0d459d',
          700: '#0a3880',
          800: '#072b63',
          900: '#051e47',
        },
        cobalt: {
          DEFAULT: '#0F52BA',
          light: '#2563eb',
          subtle: 'rgba(15, 82, 186, 0.08)',
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
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        editorial: ['Newsreader', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'soft-sm': '0 1px 2px rgba(15, 23, 42, 0.04)',
        'soft': '0 2px 8px -2px rgba(15, 23, 42, 0.05), 0 1px 4px -1px rgba(15, 23, 42, 0.03)',
        'soft-md': '0 6px 20px -4px rgba(15, 23, 42, 0.07), 0 2px 6px -2px rgba(15, 23, 42, 0.03)',
        'soft-lg': '0 12px 32px -6px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.03)',
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
