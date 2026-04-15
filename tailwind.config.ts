import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          DEFAULT: "#B5451B",
          light: "#C0392B",
          dark: "#8B3214",
        },
        sand: {
          DEFAULT: "#F5E6C8",
          light: "#FBF4E8",
          dark: "#E8D4A0",
        },
        charcoal: {
          DEFAULT: "#1A1A2E",
          light: "#252540",
          dark: "#0F0F1A",
        },
        gold: {
          DEFAULT: "#D4A843",
          light: "#E8BF5A",
          dark: "#B8922E",
        },
        cream: "#FAFAFA",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "zellige": "url('/images/zellige-pattern.svg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      transitionDuration: {
        "400": "400ms",
      },
      boxShadow: {
        "glow": "0 0 30px rgba(181, 69, 27, 0.25)",
        "glow-gold": "0 0 30px rgba(212, 168, 67, 0.3)",
        "card": "0 4px 24px rgba(26, 26, 46, 0.08)",
        "card-hover": "0 8px 40px rgba(26, 26, 46, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
