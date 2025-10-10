/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Star } from "lucide-react";

// Reads profile progress saved under key "solates_profile_progress"
export default function ProfileSummary() {
  const [xp, setXp] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [olaBalance, setOlaBalance] = useState<number | null>(null);
  const [solBalance, setSolBalance] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("solates_profile_progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setXp(parsed.xp ?? 0);
        setLevel(parsed.level ?? 1);
      } catch {
        // ignore
      }
    }

    const savedAvatar = localStorage.getItem("solates_avatar");
    const savedOla = localStorage.getItem("solates_ola_balance");
    const savedSol = localStorage.getItem("solates_sol_balance");

    setAvatar(savedAvatar || null);
    setOlaBalance(savedOla ? Number(savedOla) : 42.5); // mock default
    setSolBalance(savedSol ? Number(savedSol) : 0.84);  // mock default
  }, []);

  const progressPercent = Math.min(100, (xp % 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--card)]/50 p-6 rounded-2xl border border-[var(--card)] shadow-lg backdrop-blur-md"
    >
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden border border-gray-700">
          {avatar ? (
            // If user uploaded avatar (data URL or URL)
            <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center gap-1 text-sm text-gray-400">
              <User size={28} />
              <span className="text-xs">No avatar</span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">bioxin.eth</h3>
              <p className="text-sm opacity-70">Welcome back — keep earning XP!</p>
            </div>

            <div className="flex items-center gap-3">
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

          <div className="mt-4">
            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#b14eff] to-[#00eaff]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs opacity-70 mt-2">
              <span>{progressPercent}% to next level</span>
              <span><Star size={14} className="inline-block mr-1 text-[var(--primary)]" />{(level * 100) - xp} XP needed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm opacity-75">
        <strong>Note:</strong> Mining Hall unlocks at <strong>500 XP</strong> (Level 5). You can also mint missing points later via special contributions (whitepaper / tokenomics stage).
      </div>
    </motion.div>
  );
}
