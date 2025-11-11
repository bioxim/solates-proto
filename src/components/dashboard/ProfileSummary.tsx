import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Star, Trophy } from "lucide-react";
import { auth, db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getRankInfo } from "../../utils/levelSystem"; // 👈 asegúrate que la ruta sea correcta

export default function ProfileSummary() {
  const [uid, setUid] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>("User");
  const [xp, setXp] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [rank, setRank] = useState<string>("Explorer");
  const [multiplier, setMultiplier] = useState<number>(1.0);
  const [avatar, setAvatar] = useState<string | null>(null);

  // --- Detect user ---
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setDisplayName(user.displayName || user.email?.split("@")[0] || "User");
      } else {
        setUid(null);
      }
    });
    return () => unsub();
  }, []);

  // --- Load and listen to XP in real-time ---
  useEffect(() => {
    if (!uid) return;
    const userRef = doc(db, "users", uid);

    const unsub = onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const userXP = data.xp || 0;
        const userLevel = data.level || 1;
        setXp(userXP);
        setLevel(userLevel);

        // ✅ Actualizar rango dinámicamente
        const rankInfo = getRankInfo(userXP);
        setRank(rankInfo.rank);
        setMultiplier(rankInfo.multiplier);
      }
    });

    // ✅ Cargar avatar local
    const savedAvatar = localStorage.getItem(`avatar_${uid}`);
    setAvatar(savedAvatar || null);

    return () => unsub();
  }, [uid]);

  const progressPercent = Math.min(100, (xp % 100));
  const xpNeeded = (level * 100) - xp;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--card)]/60 p-6 rounded-2xl border border-[var(--card)] shadow-lg backdrop-blur-md"
    >
      <div className="flex items-center gap-4">
        {/* --- Avatar --- */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden border border-gray-700">
          {avatar ? (
            <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center gap-1 text-sm text-gray-400">
              <User size={28} />
              <span className="text-xs">No avatar</span>
            </div>
          )}
        </div>

        {/* --- Info --- */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{displayName}</h3>
              <p className="text-sm opacity-70">Welcome back — keep earning XP!</p>
              <div className="mt-1 flex items-center gap-1 text-sm text-[var(--primary)]">
                <Trophy size={14} /> <span>{rank}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs opacity-70">Level</div>
                <div className="font-semibold">{level}</div>
              </div>
              <div className="text-right">
                <div className="text-xs opacity-70">XP</div>
                <div className="font-semibold">{xp}</div>
              </div>
            </div>
          </div>

          {/* --- XP Progress --- */}
          <div className="mt-4">
            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#b14eff] to-[#00eaff] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs opacity-70 mt-2">
              <span>{progressPercent}% to next level</span>
              <span>
                <Star size={14} className="inline-block mr-1 text-[var(--primary)]" />
                {xpNeeded > 0 ? `${xpNeeded} XP needed` : "Level up soon!"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Footer info --- */}
      <div className="mt-4 text-sm opacity-75">
        <strong>Note:</strong> Mining Hall unlocks at <strong>500 XP</strong> (Level 5).<br />
        Rank multiplier: <span className="text-[var(--primary)] font-semibold">x{multiplier}</span>
      </div>
    </motion.div>
  );
}
