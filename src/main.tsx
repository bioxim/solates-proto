// src/main.tsx
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { SolanaWalletContext } from "./context/SolanaWalletContext";
import { Buffer } from "buffer";
window.Buffer = Buffer;


/**
 * Set theme BEFORE React mounts to avoid FOUC.
 */
(function initTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      document.documentElement.classList.remove("dark");
    } else if (saved === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  } catch (err) {
    console.warn("Theme init error:", err);
  }
})();

createRoot(document.getElementById("root")!).render(
  <SolanaWalletContext>
    <App />
  </SolanaWalletContext>
);
