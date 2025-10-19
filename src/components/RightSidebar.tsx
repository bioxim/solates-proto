// src/components/RightSidebar.tsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Target,
  Home,
  Gift,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RightSidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [rank, setRank] = useState<string>("Explorer");

  const ADMIN_EMAIL = "mariaximenacamino@gmail.com";

  useEffect(() => {
  const unsub = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserEmail(user.email || null);
      const userRef = doc(db, "users", user.uid);

      // 🔥 Escucha en tiempo real los cambios de XP / Level
      const unsubscribeSnapshot = onSnapshot(userRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setXp(data.xp || 0);
          setLevel(data.level || 1);
        }
      });

      return () => unsubscribeSnapshot();
    } else {
      setUserEmail(null);
      setXp(0);
      setLevel(1);
    }
  });
  return () => unsub();
}, []);


  // 🧮 Calcular porcentaje y rango
  const progress = xp % 100;
  useEffect(() => {
    if (xp < 500) setRank("Explorer");
    else if (xp < 1000) setRank("Trader");
    else if (xp < 1500) setRank("DeFi Learner");
    else if (xp < 2000) setRank("Innovator");
    else setRank("💎 Diamond Pioneer");
  }, [xp]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const menuItems = [
    { icon: <User size={20} />, label: "Profile", path: "/profile" },
    { icon: <Target size={20} />, label: "Quests", path: "/quests" },
    { icon: <Home size={20} />, label: "Dashboard", path: "/dashboard" },
    { icon: <Gift size={20} />, label: "Invite Friends", path: "/invite-friends" },
  ];

  return (
    <div
      className={`fixed top-0 right-0 h-full text-[var(--text)] border-l border-[var(--card)] shadow-xl transition-all duration-300 z-40 ${
        open ? "w-64" : "w-16"
      }`}
      style={{
        background: "linear-gradient(180deg, var(--bg) 0%, var(--card) 100%)",
      }}
    >
      {/* Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute top-20 left-[-26px] bg-[var(--card)] p-1.5 rounded-l-md border border-[var(--card)] hover:bg-[var(--primary)] hover:opacity-90 transition cursor-pointer shadow-md"
        title={open ? "Hide" : "Show"}
      >
        {open ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* Sidebar content */}
      <AnimatePresence>
        <motion.div
          key={open ? "open" : "closed"}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.3 }}
          className="p-4 flex flex-col items-center gap-6 mt-12"
        >
          {open && (
            <div className="w-full text-center">
              <p className="text-sm opacity-70">Level {level}</p>
              <div className="mt-2 bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1 }}
                  className="bg-gradient-to-r from-[#b14eff] to-[#00eaff] h-full rounded-full"
                />
              </div>
              <p className="text-xs mt-1 opacity-70">{xp} XP • {rank}</p>
            </div>
          )}

          {/* Menu */}
          <div
            className={`flex flex-col ${
              open ? "items-start" : "items-center"
            } gap-4 w-full mt-4`}
          >
            {menuItems.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={idx}
                  onClick={() => navigate(item.path)}
                  className={`group relative flex items-center gap-3 w-full rounded-lg py-2 px-2 transition-all duration-200 cursor-pointer
                    ${
                      isActive
                        ? "bg-[var(--primary)]/20 text-[var(--primary)] font-semibold"
                        : open
                        ? "hover:bg-[var(--primary)]/10"
                        : "hover:bg-[var(--primary)]/20"
                    }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`${
                      isActive ? "text-[var(--primary)]" : "text-[var(--text)]"
                    }`}
                  >
                    {item.icon}
                  </motion.div>

                  {open && (
                    <span
                      className={`text-sm font-medium transition ${
                        isActive
                          ? "text-[var(--primary)]"
                          : "group-hover:text-[var(--primary)]"
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Admin Panel — solo visible para vos */}
            {userEmail === ADMIN_EMAIL && (
              <button
                onClick={() => navigate("/admin")}
                className={`group flex items-center gap-3 w-full rounded-lg py-2 px-2 transition-all duration-200 cursor-pointer border-t border-[var(--card)] pt-4 mt-4
                  ${
                    open
                      ? "hover:bg-[var(--primary)]/10"
                      : "hover:bg-[var(--primary)]/20"
                  }`}
              >
                <ShieldCheck size={20} className="text-[var(--primary)]" />
                {open && (
                  <span className="text-sm font-medium text-[var(--primary)]">
                    Admin Panel
                  </span>
                )}
              </button>
            )}

            {/* 🔴 Logout */}
            <button
              onClick={handleLogout}
              className={`group flex items-center gap-3 w-full text-red-400 hover:text-red-500 transition py-2 px-2 rounded-lg ${
                open ? "justify-start" : "justify-center"
              }`}
            >
              <LogOut size={20} />
              {open && <span className="text-sm font-medium">Logout</span>}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
