/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './core/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '2000px'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
