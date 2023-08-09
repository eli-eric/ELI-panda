/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '2000px'
      },
      colors: {
        primary: colors.orange
      },
      animation: {
        progressBar: 'indeterminateProgressBarAnimation 1s infinite linear'
      },
      keyframes: {
        indeterminateProgressBarAnimation: {
          '0%': {
            transform: 'translateX(0) scaleX(0)'
          },
          '40%': {
            transform: 'translateX(0) scaleX(0.4)'
          },
          '100%': {
            transform: 'translateX(100%) scaleX(0.5)'
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar')
  ]
}
