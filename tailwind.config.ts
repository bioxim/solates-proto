import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#FFFFFF",
          dark: "#0B1120",
        },
        card: {
          light: "#F9FAFB",
          dark: "#111827",
        },
        primary: {
          DEFAULT: "#00C2FF",
          dark: "#00E0FF",
        },
      },
    },
  },
  plugins: [],
};

export default config;
