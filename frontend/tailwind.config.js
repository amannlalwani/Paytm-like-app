/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
      neutral:{
        500:"#7c8b9d",
      }}
    },
  },
  plugins: [],
}

