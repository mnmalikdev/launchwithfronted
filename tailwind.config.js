/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8D9E6F",
        secondary: "#526534",
        white: "#FFFFFF",
        orangelight: "#FF8D21",
        orangedark: "#ff7800",
        orangeshade: "#FFE2C6",
        greendark: "#123A13",
        greensemidark: "#2f3b1c",
        bgdark: "#D9D9D9",
        bglight: "#EBEFE3",
        bgbox: "#b2bda0",
      },
    },
  },
  plugins: [],
};
