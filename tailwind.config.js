/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"DM Mono"', "monospace"],
      },
      fontWeight: {
        "dm-500": 500,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Ceci améliore les éléments de formulaire
  ],
};
