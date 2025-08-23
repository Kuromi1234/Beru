// tailwind.config.js
import { fontFamily } from "tailwindcss/defaultTheme"
import animate from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", // for shadcn components
  ],
  theme: {
    extend: {
      fontFamily: {
        signature: ['"Luxurious Script"', "cursive"],
        sans: ["Inter", ...fontFamily.sans], // shadcn default
      },
      boxShadow: {
        glassy: "0 0 40px rgba(255,255,255,0.05)",
      },
      colors: {
        primary: "#A259FF",   // BERU violet
        secondary: "#302b63", // deep blue
        darkNavy: "#0f0c29",  // dark theme bg

        // shadcn semantic colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primaryshad: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondaryshad: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    animate, // required for dropdown animations
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
}
