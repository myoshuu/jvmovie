/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        secondary: "#282828",
        gray: "#9F9F9F",
        blue: "#00829B",
      },
    },
  },
  plugins: [],
};
