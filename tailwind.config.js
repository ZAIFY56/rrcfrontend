/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.css", "./src/**/*.{jsx,tsx,js,ts}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#4B9795",
      },
    },
  },
  plugins: [],
};
