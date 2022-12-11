const { scryRenderedComponentsWithType } = require('react-dom/test-utils');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'art1': "url('./styles/images/art-1.jpeg')",
        'art2': "url('./styles/images/art-2.jpg')",
        'background2': "url('./styles/images/bg-2.jpg')"
      }
    },
  },
  plugins: [],
}
