/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: { 50: '#effaf3', 100: '#d8f4e2', 500: '#24955d', 600: '#18794e', 700: '#12613f', 900: '#0b3525' },
        ink: '#17231d',
      },
      boxShadow: { card: '0 12px 32px rgba(25, 65, 42, 0.08)', soft: '0 4px 16px rgba(20, 53, 35, 0.07)' },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}
