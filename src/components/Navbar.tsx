/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Sun, Moon, ChevronDown, Lock, Newspaper, Users, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore"; // Importamos Firestore
import { auth, db } from "../firebase"; // Importamos db
import LoginModal from "./LoginModal";
import logo from "../assets/logo-tr.png";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [xp, setXp] = useState<number>(0); // Estado para XP
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);

  // === Tema ===
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

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((v) => !v);

  // === Listener Firebase Auth & User XP ===
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u?.uid) {
        // Avatar Local
        const localAvatar = localStorage.getItem(`avatar_${u.uid}`);
        setCustomAvatar(localAvatar || null);

        // Listener de XP en tiempo real
        const userRef = doc(db, "users", u.uid);
        const unsubSnapshot = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setXp(docSnap.data().xp || 0);
          }
        });

        return () => unsubSnapshot();
      } else {
        setCustomAvatar(null);
        setXp(0);
      }
    });
    return () => unsubAuth();
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-[var(--bg)]/90 border-b border-[var(--card)] backdrop-blur-md z-50 transition-all duration-300">

        {/* LEFT */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
            <img src={logo} alt="Solates" className="w-8 h-8 object-contain" />
            <span className="text-lg font-semibold tracking-tight">Solates</span>
          </Link>

          {/* Main menu */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">

            <Link to="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>

            {/* ======== CRYPTO HUB (News + Community) ======== */}
            <div
              className="relative group h-full flex items-center"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button 
                className={`flex items-center gap-1 transition-colors ${dropdownOpen ? "text-[var(--primary)]" : "hover:text-[var(--primary)]"}`}
              >
                Crypto Hub
                <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              <div 
                className={`absolute top-full left-0 pt-4 w-60 transition-all duration-200 origin-top-left
                  ${dropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}
                `}
              >
                <div className="bg-[var(--card)] border border-[var(--border)]/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl p-2 flex flex-col gap-1">
                  
                  {/* OLA HALL - Solo visible si XP >= 500 */}
                  {xp >= 500 && (
                     <div className="mb-2 pb-2 border-b border-gray-700/30">
                        <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-[var(--primary)] font-bold opacity-80">
                            Exclusive
                        </div>
                        <a
                            href="https://solates-mining.vercel.app/"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--primary)]/10 text-[var(--primary)] transition-colors group/item"
                        >
                            <Crown size={16} />
                            <span>Solates Platform</span>
                        </a>
                     </div>
                  )}

                  {/* Items "Soon" (No borrables los TODOs) */}
                  
                  {/* Crypto News */}
                  <div className="relative group/disabled cursor-not-allowed opacity-60 hover:opacity-70 transition-opacity">
                    <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        // TODO: Replace with external news site
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm pointer-events-none"
                    >
                        <Newspaper size={16} />
                        <span>Crypto News</span>
                    </a>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-gray-700/50 text-gray-300 px-1.5 py-0.5 rounded border border-gray-600/30">
                        Soon
                    </span>
                  </div>

                  {/* Community */}
                  <div className="relative group/disabled cursor-not-allowed opacity-60 hover:opacity-70 transition-opacity">
                    <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        // TODO: Replace with Skool link
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm pointer-events-none"
                    >
                        <Users size={16} />
                        <span>Community</span>
                    </a>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-gray-700/50 text-gray-300 px-1.5 py-0.5 rounded border border-gray-600/30">
                        Soon
                    </span>
                  </div>

                </div>
              </div>
            </div>

            {/* Removed for now — kept as TODO */}
            {/*
            <Link to="/docs" className="hover:text-[var(--primary)]">Docs</Link>
            <Link to="/airdrop" className="hover:text-[var(--primary)]">Airdrop</Link>
            <Link to="/leaderboard" className="hover:text-[var(--primary)]">Leaderboard</Link>
            */}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative">

          {/* Theme toggle */}
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-[var(--card)] hover:text-[var(--primary)] transition-colors"
          >
            {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-yellow-400" />}
          </button>

          {/* Login / Avatar */}
          {!user ? (
            <button
              onClick={() => setShowLogin(true)}
              className="px-5 py-2 rounded-lg bg-[var(--primary)] text-white font-medium hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[var(--primary)]/20"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-[var(--card)] bg-gray-900 overflow-hidden hover:border-[var(--primary)] transition-colors"
            >
              <img
                src={
                  customAvatar ||
                  user.photoURL ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.displayName || user.email || "User"
                  )}&background=6C47FF&color=fff&size=128`
                }
                alt="avatar"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </button>
          )}
        </div>
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}