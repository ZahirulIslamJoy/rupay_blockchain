/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(155deg, #3064c6 35%, #6df91a 100%)',
        'custom-gradient-hover': 'linear-gradient(155deg, #0051a3 35%, #4fd900 100%)', 
      },
    },
  },
  plugins: [],
};
