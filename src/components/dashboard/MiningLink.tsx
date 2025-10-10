import { useEffect, useState } from "react";
import { Cpu, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MiningLink() {
  const [xp, setXp] = useState<number>(0);
  const navigate = useNavigate();
  const REQUIRED_XP = 500;

  useEffect(() => {
    const saved = localStorage.getItem("solates_profile_progress");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        setXp(p.xp ?? 0);
      } catch {
        setXp(0);
      }
    }
  }, []);

  const unlocked = xp >= REQUIRED_XP;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-2xl border ${unlocked ? "border-[var(--primary)]/40 bg-[var(--card)]/40" : "border-gray-700/30 bg-gray-900/30 opacity-75"}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-md ${unlocked ? "bg-[var(--primary)]/20" : "bg-gray-800/30"}`}>
            <Cpu />
          </div>
          <div>
            <div className="font-semibold">Mining Hall</div>
            <div className="text-xs opacity-70">
              {unlocked ? "Unlocked — access the mining arena" : `Locked — reach ${REQUIRED_XP} XP (Level 5) to unlock`}
            </div>
          </div>
        </div>

        <div>
          {unlocked ? (
            <button onClick={() => navigate("/mining-hall")} className="px-3 py-1 rounded-md bg-[var(--primary)] text-white">Enter</button>
          ) : (
            <button className="px-3 py-1 rounded-md bg-gray-700 text-sm flex items-center gap-2"><Lock /> Locked</button>
          )}
        </div>
      </div>

      {!unlocked && (
        <div className="text-xs opacity-70 mt-3">
          Tip: mining access can also be obtained via special contributions (whitepaper, tokenomics). This will be available as a community action in future releases.
        </div>
      )}
    </motion.div>
  );
}
