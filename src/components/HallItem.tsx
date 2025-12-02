import { useEffect, useState } from "react";
import { Cpu, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";

interface HallProps {
  collapsed: boolean;
}

export default function Hall({ collapsed }: HallProps) {
  const [xp, setXp] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const REQUIRED_XP = 500;

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const unsub = onSnapshot(userRef, (snapshot) => {
      const data = snapshot.data();
      setXp(data?.xp ?? 0);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const unlocked = xp >= REQUIRED_XP;

  // Lógica de estilos según el estado
  const containerClasses = collapsed
    ? `relative group flex justify-center p-2 rounded-md transition-all duration-200 cursor-pointer 
       ${unlocked 
          ? "hover:bg-[var(--primary)]/20 text-[var(--primary)]" 
          : "opacity-40 grayscale hover:opacity-60 text-gray-400"}` // Colapsado: Sin bordes, gris si bloqueado
    : `relative p-4 rounded-2xl border transition 
       ${unlocked
          ? "border-[var(--primary)]/40 bg-[var(--card)]/40"
          : "border-gray-700/30 bg-gray-900/30 opacity-75"}`; // Expandido: Con bordes y fondo

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={containerClasses}
      onClick={() => {
        // Opcional: Permitir click en el icono si está desbloqueado y colapsado
        if (collapsed && unlocked) {
            window.open("https://solates-mining.vercel.app/", "_blank");
        }
      }}
    >
      {/* Tooltip cuando está colapsado */}
      {collapsed && (
        <span className="absolute left-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100
          bg-black text-white text-xs py-1 px-2 rounded-md whitespace-nowrap z-50 transition pointer-events-none border border-gray-800 shadow-lg">
          {unlocked ? "OLA Hall" : `Locked (${REQUIRED_XP} XP)`}
        </span>
      )}

      {/* Contenido */}
      <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between gap-3"}`}>
        <div className="flex items-center gap-3">
          {/* Icono */}
          <div
            className={`rounded-md transition-colors ${
              !collapsed && unlocked ? "p-2 bg-[var(--primary)]/20" : ""
            } ${!collapsed && !unlocked ? "p-2 bg-gray-800/30" : ""}`}
          >
            {/* Si está colapsado y bloqueado, mostramos el candado en lugar del CPU, o ambos */}
            {collapsed && !unlocked ? <Lock size={20} /> : <Cpu size={20} />}
          </div>

          {!collapsed && (
            <div>
              <div className="font-semibold">Solates Platform</div>
              <div className="text-xs opacity-70">
                {loading
                  ? "Loading..."
                  : unlocked
                  ? "Enter $OLA hall"
                  : `Locked — reach ${REQUIRED_XP} XP`}
              </div>
            </div>
          )}
        </div>

        {/* Botón (Solo visible extendido) */}
        {!collapsed && (
          <div>
            {unlocked ? (
              <button
                onClick={(e) => {
                    e.stopPropagation();
                    window.open("https://solates-mining.vercel.app/", "_blank")
                }}
                className="px-3 py-1 rounded-md bg-[var(--primary)] text-white hover:bg-[var(--primary)]/80 transition cursor-pointer"
              >
                Enter
              </button>
            ) : (
              <button className="px-3 py-1 rounded-md bg-gray-700 text-sm flex items-center gap-2 cursor-not-allowed opacity-70">
                <Lock size={14} /> Locked
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}