// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        signature: ['"Luxurious Script"', "cursive"],
      },
      boxShadow: {
        glassy: "0 0 40px rgba(255,255,255,0.05)",
      },
      colors: {
      primary: '#A259FF',
      secondary: '#302b63',
      darkNavy: '#0f0c29',
    },
    },
  },
  plugins: [
     require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
