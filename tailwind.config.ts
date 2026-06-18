import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#06060a",
          900: "#0a0a12",
          800: "#111120",
          700: "#1a1a2e",
          600: "#26263f"
        },
        brand: {
          DEFAULT: "#7c5cff",
          400: "#9b82ff",
          500: "#7c5cff",
          600: "#6843ff"
        },
        accent: "#21d4fd"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(60% 50% at 50% 0%, rgba(124,92,255,0.22) 0%, rgba(6,6,10,0) 70%)"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-700px 0" },
          "100%": { backgroundPosition: "700px 0" }
        },
        floaty: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" }
        }
      },
      animation: {
        shimmer: "shimmer 2.2s linear infinite",
        floaty: "floaty 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
