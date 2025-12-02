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
import HallItem from "./HallItem";

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

  useEffect(() => setOpen(false), [location.pathname]);
  
  // Nota: Tenías dos useEffects para setOpen(false), dejé uno consolidado arriba si quieres que arranque cerrado, 
  // o elimina el de location.pathname si quieres que persista. 
  // Asumo que quieres que arranque abierto o cerrado según preferencia, aquí lo dejo como estaba:
  useEffect(() => setOpen(false), []); 

  const progress = xp % 100;

  useEffect(() => {
    if (xp < 500) setRank("Explorer");
    else if (xp < 1000) setRank("Trader");
    else if (xp < 1500) setRank("DeFi Learner");
    else if (xp < 2000) setRank("Innovator");
    else setRank("💎 Diamond Pioneer");
  }, [xp]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/", { replace: true });
      window.location.reload();
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const menuItems = [
    { icon: <User size={20} />, label: "Profile", path: "/profile", locked: false },
    { icon: <Target size={20} />, label: "Quests", path: "/quests", locked: false },
    { icon: <Home size={20} />, label: "Dashboard", path: "/dashboard", locked: false },
    { icon: <Gift size={20} />, label: "Invite Friends", path: "/invite-friends", locked: false },
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
        className="absolute top-20 left-[-26px] bg-[var(--card)] p-1.5 rounded-l-md border border-[var(--card)] hover:bg-[var(--primary)] hover:opacity-90 transition cursor-pointer shadow-md text-white z-50"
        title={open ? "Hide" : "Show"}
      >
        {open ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* Sidebar content */}
      <AnimatePresence mode="wait">
        <motion.div
          // Quitamos la key basada en 'open' para evitar que todo el DOM se destruya al colapsar,
          // lo que hace que los tooltips funcionen mejor.
          layout 
          className="p-4 flex flex-col items-center gap-6 mt-12 w-full"
        >
          {/* XP BAR - Solo visible si abierto */}
          {open && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="w-full text-center"
            >
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
            </motion.div>
          )}

          {/* MENU */}
          <div
            className={`flex flex-col ${open ? "items-start" : "items-center"} gap-4 w-full mt-4`}
          >
            {menuItems.map((item, idx) => {
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={idx}
                  onClick={() => item.path && navigate(item.path)}
                  disabled={item.locked}
                  // Aquí aseguramos cursor-pointer y group para el hover
                  className={`group relative flex items-center gap-3 w-full rounded-lg py-2 px-2 transition-all duration-200 
                    ${item.locked 
                        ? "opacity-40 cursor-not-allowed" 
                        : "cursor-pointer hover:bg-[var(--primary)]/10"
                    }
                    ${isActive ? "bg-[var(--primary)]/20 text-[var(--primary)]" : ""}
                    ${!open ? "justify-center" : ""}
                  `}
                >
                  {/* Ícono */}
                  <div className="relative z-10">
                    {item.icon}
                  </div>

                  {/* Texto cuando expandido */}
                  {open && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}

                  {/* Tooltip cuando colapsado */}
                  {!open && (
                    <span
                      className="absolute left-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                      bg-black text-white text-xs py-1 px-2 rounded-md whitespace-nowrap z-50 pointer-events-none border border-gray-800 shadow-xl"
                    >
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}

            {/* OLA HALL / MINING LINK */}
            {/* Pasamos !open como collapsed */}
            <div className="w-full">
                <HallItem collapsed={!open} />
            </div>

            {/* ADMIN */}
            {userEmail === ADMIN_EMAIL && (
              <button
                onClick={() => navigate("/admin")}
                className={`group relative flex items-center gap-3 w-full rounded-lg py-2 px-2 transition-all duration-200 cursor-pointer border-t border-[var(--card)] pt-4 mt-4
                  ${open ? "hover:bg-[var(--primary)]/10" : "justify-center hover:bg-[var(--primary)]/20"}`}
              >
                <ShieldCheck size={20} className="text-[var(--primary)]" />
                {open && (
                  <span className="text-sm font-medium text-[var(--primary)]">
                    Admin Panel
                  </span>
                )}

                {!open && (
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition 
                  bg-black text-white text-xs py-1 px-2 rounded-md whitespace-nowrap z-50 pointer-events-none border border-gray-800">
                    Admin Panel
                  </span>
                )}
              </button>
            )}

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className={`group relative flex items-center gap-3 w-full text-red-400 hover:text-red-500 hover:bg-red-500/10 transition py-2 px-2 rounded-lg cursor-pointer ${
                open ? "justify-start" : "justify-center"
              }`}
            >
              <LogOut size={20} />

              {open && <span className="text-sm font-medium">Logout</span>}

              {!open && (
                <span
                  className="absolute left-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition 
                  bg-black text-white text-xs py-1 px-2 rounded-md whitespace-nowrap z-50 pointer-events-none border border-gray-800"
                >
                  Logout
                </span>
              )}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}