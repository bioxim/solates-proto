/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { questsData } from "../../data/questsData";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

// Finds first quest not completed (respecting order) and shows CTA
export default function NextQuest() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [next, setNext] = useState<any | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("solates_quests_progress");
    const progress = saved ? JSON.parse(saved) : [];
    setCompletedIds(progress);

    // find first quest that is not completed AND whose previous is completed (order preserved by questsData)
    const all = questsData;
    let candidate = null;
    for (let i = 0; i < all.length; i++) {
      const q = all[i];
      if (!progress.includes(q.id)) {
        // check dependency: if it's the first of its stage, or previous quest of same stage is completed
        const stageQuests = all.filter((s) => s.stage === q.stage);
        const idxInStage = stageQuests.findIndex((s) => s.id === q.id);
        if (idxInStage === 0) {
          candidate = q;
          break;
        } else {
          const prev = stageQuests[idxInStage - 1];
          if (progress.includes(prev.id)) {
            candidate = q;
            break;
          } else {
            // blocked, keep searching (we only want the earliest available)
            break;
          }
        }
      }
    }
    setNext(candidate);
  }, []);

  if (!next) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[var(--card)]/50 p-6 rounded-2xl border border-[var(--card)] shadow-lg">
        <h3 className="text-lg font-semibold">Next Quest</h3>
        <p className="text-sm opacity-70 mt-2">All caught up — complete more quests to unlock the next stage.</p>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-[var(--card)]/50 p-6 rounded-2xl border border-[var(--card)] shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{next.title}</h3>
          <p className="text-sm opacity-70 mt-1">{next.description}</p>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => navigate(`/quest/${next.id}`)}
              className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-semibold hover:opacity-90 transition flex items-center gap-2"
            >
              <Play size={16} /> Continue
            </button>
            <span className="text-xs opacity-60">Reward: +{next.reward} XP</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
