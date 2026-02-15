/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        'sm': '510px',
        'md': '767px',
        'lg': '990px',
        'xl': '1920px',
      },
    },
  },
  plugins: [],
}
