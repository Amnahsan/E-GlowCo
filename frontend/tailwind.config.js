/** @type {import('tailwindcss').Config} */
const { tailwindTheme } = require('./src/themes/theme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  important: '#root',
  theme: tailwindTheme,
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  safelist: [
    {
      pattern: /(bg|text|border)-(primary|secondary|accent)-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
}