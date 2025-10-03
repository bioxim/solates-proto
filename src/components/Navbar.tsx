import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-tr.png";

export default function Navbar() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--card)] bg-[var(--bg)] text-[var(--text)]">
      {/* Logo + Links */}
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Solates Logo"
            className="h-9 w-auto object-contain"
          />
          <span className="text-2xl font-bold">Solates</span>
        </Link>

        <ul className="flex gap-6 font-medium">
          <li>
            <Link to="/" className="hover:text-[var(--primary)]">Home</Link>
          </li>
          <li>
            <Link to="/docs" className="hover:text-[var(--primary)]">Docs</Link>
          </li>
          <li>
            <Link to="/airdrop" className="hover:text-[var(--primary)]">Airdrop</Link>
          </li>
          <li>
            <Link to="/leaderboard" className="hover:text-[var(--primary)]">Leaderboard</Link>
          </li>
        </ul>
      </div>

      {/* Theme toggle + Auth */}
      <div className="flex items-center gap-4">
        {/* Toggle theme */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-[var(--card)]"
        >
          {isDark ? (
            <Moon className="w-5 h-5 text-[var(--text)]" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-500" />
          )}
        </button>

        {/* Login/Profile */}
        {!isLoggedIn ? (
          <button
            onClick={handleLogin}
            className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-semibold hover:opacity-90"
          >
            Login
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/profile"
              className="w-9 h-9 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold"
            >
              U
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary)]"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
