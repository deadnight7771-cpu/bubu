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
        rose: {
          blush:  "#ffe0ec",
          soft:   "#ffb3cc",
          mid:    "#f06292",
          deep:   "#e91e63",
          darker: "#c2185b",
          dark:   "#880e4f",
        },
        cream: "#fff8fa",
      },
      fontFamily: {
        nunito:  ["var(--font-nunito)", "sans-serif"],
        dancing: ["var(--font-dancing)", "cursive"],
      },
      backdropBlur: { xs: "2px" },
      animation: {
        "float-slow":  "float 6s ease-in-out infinite",
        "float-med":   "float 4s ease-in-out infinite",
        "spin-slow":   "spin 6s linear infinite",
        "spin-med":    "spin 3.5s linear infinite",
        "pulse-glow":  "pulseGlow 2.5s ease-in-out infinite",
        "heart-beat":  "heartBeat 1.4s ease-in-out infinite",
        "fade-in":     "fadeIn 0.8s ease both",
        "slide-up":    "slideUp 0.7s cubic-bezier(.34,1.4,.64,1) both",
        "bounce-in":   "bounceIn 0.5s cubic-bezier(.34,1.6,.64,1) both",
        "shake":       "shake 0.45s ease both",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px) rotate(-2deg)" },
          "50%":     { transform: "translateY(-18px) rotate(2deg)" },
        },
        pulseGlow: {
          "0%,100%": { boxShadow: "0 8px 30px rgba(233,30,99,0.38)" },
          "50%":     { boxShadow: "0 12px 50px rgba(233,30,99,0.65)" },
        },
        heartBeat: {
          "0%,100%": { transform: "scale(1)" },
          "50%":     { transform: "scale(1.3)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(40px) scale(0.92)" },
          to:   { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        bounceIn: {
          from: { opacity: "0", transform: "scale(0.7)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        shake: {
          "10%,90%":       { transform: "translateX(-4px)" },
          "20%,80%":       { transform: "translateX(6px)"  },
          "30%,50%,70%":   { transform: "translateX(-6px)" },
          "40%,60%":       { transform: "translateX(6px)"  },
        },
      },
    },
  },
  plugins: [],
};

export default config;
