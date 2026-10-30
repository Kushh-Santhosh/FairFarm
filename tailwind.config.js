/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#183F32',
          dark: '#102E25',
          light: '#245947',
          surface: '#E9EFEA'
        },
        gold: {
          DEFAULT: '#D7A53A',
          hover: '#C2932E',
          light: '#F8E9C6'
        },
        cream: {
          DEFAULT: '#F8F6EE',
          dark: '#EDE7D8'
        },
        earth: '#8B6241',
        mutedGrey: '#747C75',
        success: '#238653',
        warning: '#D99B2B',
        danger: '#C84B43'
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Kannada', 'Noto Sans Telugu', 'Noto Sans Tamil', 'Noto Sans Devanagari', 'sans-serif'],
      },
      screens: {
        'xs': '360px',
      }
    },
  },
  plugins: [],
}

