import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import LoginModal from "./LoginModal";
import logo from "../assets/logo-tr.png";

export default function Navbar() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Tema
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") return true;
      if (saved === "light") return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return true;
    }
  });

  // Sync DOM + persistencia
  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const toggleTheme = () => setIsDark((v) => !v);


  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 bg-[var(--bg)] border-b border-[var(--card)] relative z-50">
        {/* LEFT */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Solates" className="w-8 h-8 object-contain" />
            <span className="text-lg font-semibold">Solates</span>
          </Link>

          <div className="hidden md:flex items-center gap-5 text-sm">
            <Link to="/" className="hover:text-[var(--primary)]">Home</Link>
            <Link to="/docs" className="hover:text-[var(--primary)]">Docs</Link>
            <Link to="/airdrop" className="hover:text-[var(--primary)]">Airdrop</Link>
            <Link to="/leaderboard" className="hover:text-[var(--primary)]">Leaderboard</Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative">
          {/* Theme toggle */}
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-[var(--card)] transition"
            title={isDark ? "Switch to light" : "Switch to dark"}
          >
            {isDark ? (
              <Moon className="w-5 h-5 text-[var(--text)]" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
          </button>

          {/* Login / Avatar */}
          {!user ? (
            <button
              onClick={() => setShowLogin(true)}
              className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-semibold hover:opacity-90 transition"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-[var(--card)] overflow-hidden hover:scale-105 transition"
              >
                <img
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.displayName || user.email || "User"
                    )}&background=6C47FF&color=fff&size=128`
                  }
                  alt="avatar"
                  className="w-9 h-9 rounded-full border border-[var(--card)] object-cover hover:scale-105 transition"
                />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Login modal */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
