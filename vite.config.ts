// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// 👇 VOLVEMOS A IMPORTAR ESTO para usar resolve()
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// 👇 VOLVEMOS A DEFINIR ESTO
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      process: resolve(__dirname, "node_modules/process"), 
    
      stream: "stream-browserify",
      util: "util",
      zlib: "browserify-zlib",
      events: "events",
      buffer: "buffer",
    },
  },

  define: {
    global: "globalThis",
    "process.env": {},
  },

  optimizeDeps: {
    include: ["buffer", "process"],
  },
});