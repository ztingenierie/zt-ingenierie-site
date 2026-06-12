import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0F2A43",
        chantier: "#F2730D",
        steel: "#3E6C97",
        paper: "#F7F6F2",
        ink: "#1E232A",
        win: "#1F8A4C",
      },
    },
  },
  plugins: [],
};

export default config;
