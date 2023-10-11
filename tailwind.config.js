/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#78C0E0',
        'primary-dark':'#449DD1',
        'secondary': '#A3A3A4',
        'secondary-dark': "#818181",
        'background': '#636363',
        'background-semi-dark': '#424242',
        'background-dark': '#181818'
      }
    },
  },
  plugins: [],
}

