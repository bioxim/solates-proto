import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// 👇 VOLVEMOS A IMPORTAR ESTO para las rutas absolutas
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// 👇 VOLVEMOS A DEFINIR ESTO
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // SIN 'inject' y SIN 'nodePolyfills'
  ],

  resolve: {
    // 👇 ESTA ES LA SECCIÓN CRÍTICA
    // Volvemos a usar las rutas absolutas con 'resolve(__dirname, ...)'
    // que Rolldown estaba pidiendo.
    alias: {
      process: resolve(__dirname, "node_modules/process/browser.js"),
      stream: resolve(__dirname, "node_modules/stream-browserify/index.js"),
      util: resolve(__dirname, "node_modules/util/"),
      zlib: resolve(__dirname, "node_modules/browserify-zlib/lib/"),
      events: resolve(__dirname, "node_modules/events/"),
      buffer: resolve(__dirname, "node_modules/buffer/"),
    },
  },

  define: {
    // Esto sigue siendo correcto
    global: "globalThis",
    "process.env": {},
  },

  optimizeDeps: {
    // Esto sigue siendo correcto
    include: ["buffer", "process"],
  },
});