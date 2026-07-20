import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
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
        brand: {
          dark: "#090014",
          mid: "#3C096C",
          light: "#7209B7",
          accent: "#FBBF24",
        },
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #090014 0%, #3C096C 50%, #7209B7 100%)",
        "brand-gradient-vertical":
          "linear-gradient(180deg, #090014 0%, #3C096C 55%, #7209B7 100%)",
        "brand-gradient-subtle":
          "linear-gradient(180deg, #090014 0%, #1a0a2e 100%)",
        "brand-radial":
          "radial-gradient(ellipse at 20% 0%, rgba(114, 9, 183, 0.35) 0%, transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(60, 9, 108, 0.4) 0%, transparent 50%)",
      },
      boxShadow: {
        brand: "0 4px 24px rgba(114, 9, 183, 0.25)",
        "brand-lg": "0 8px 40px rgba(9, 0, 20, 0.6)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "quiz-shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "20%, 60%": { transform: "translateX(-5px)" },
          "40%, 80%": { transform: "translateX(5px)" },
        },
        "quiz-pop": {
          "0%": { transform: "scale(0.98)", opacity: "0.7" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "quiz-reveal": {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "quiz-shake": "quiz-shake 0.4s ease-in-out",
        "quiz-pop": "quiz-pop 0.35s ease-out",
        "quiz-reveal": "quiz-reveal 0.4s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
