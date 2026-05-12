/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "system-ui", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "IBM Plex Mono", "ui-monospace", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(45, 212, 191, 0.35)",
        panel: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
