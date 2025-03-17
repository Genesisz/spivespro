/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        adumu: ["Adumu"],
      },
      colors: {
        primary: {
          blue: "#000066",
          orange: "#FF9434",
        },
      },
    },
  },
  plugins: [],
};

export default config; 