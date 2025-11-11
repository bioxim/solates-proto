import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import inject from "@rollup/plugin-inject";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    inject({
      Buffer: ["buffer", "Buffer"],
      process: "process",
    }),
  ],
  resolve: {
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
    global: "globalThis",
    "process.env": {},
  },
  optimizeDeps: {
    include: ["buffer", "process"],
  },
});
