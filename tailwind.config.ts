/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

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
          DEFAULT: "#f200ffff",
          dark: "#7c008aff",
        },
      },
    },
  },
  plugins: [
    typography as any
  ],
};

export default config;
