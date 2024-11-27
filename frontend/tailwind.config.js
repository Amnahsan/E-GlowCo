/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  important: '#root',
  theme: {
    extend: {
      colors: {
        // You can add custom colors here that match your Material-UI theme
      },
      fontFamily: {
        // Add custom fonts here if needed
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  safelist: [
    {
      pattern: /(bg|text|border)-/,
    },
  ],
}