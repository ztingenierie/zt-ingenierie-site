import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1220",
        primary: { DEFAULT: "#1D4ED8", dark: "#1E40AF" },
        accent: "#B45309",
        slate2: "#475569",
      },
      maxWidth: { content: "72rem" },
    },
  },
  plugins: [],
};

export default config;
