import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark space background
        bg: {
          primary: "#070711",
          secondary: "#0d0d1a",
          card: "#12122a",
          glass: "rgba(255,255,255,0.04)",
        },
        // Brand purple/indigo palette
        brand: {
          50: "#f0edff",
          100: "#e0dbff",
          200: "#c5baff",
          300: "#a18fff",
          400: "#7c5ef4",
          500: "#6241e8",
          600: "#5130d4",
          700: "#4024b0",
          800: "#321891",
          900: "#1e1063",
        },
        // Accent cyan
        accent: {
          DEFAULT: "#38bdf8",
          glow: "rgba(56,189,248,0.25)",
        },
        // Text
        text: {
          primary: "#f0f0ff",
          secondary: "#a0a0c0",
          muted: "#5c5c8a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-cal)", "var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(98,65,232,0.3) 0%, transparent 60%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)",
        "beam-gradient":
          "linear-gradient(90deg, transparent, rgba(98,65,232,0.8), rgba(56,189,248,0.5), transparent)",
      },
      animation: {
        "marquee-ltr": "marquee-ltr 30s linear infinite",
        "marquee-rtl": "marquee-rtl 30s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "beam": "beam 4s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        "marquee-ltr": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-rtl": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        beam: {
          "0%, 100%": { opacity: "0", transform: "scaleX(0)" },
          "50%": { opacity: "1", transform: "scaleX(1)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
