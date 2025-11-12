import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { db, auth } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

interface Quest {
  id: string;
  title: string;
  description: string;
  reward: number;
  stage: string;
  order?: number;
}

export default function NextQuest() {
  const [next, setNext] = useState<Quest | null>(null);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  // 🔹 Obtener usuario actual
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) setUserId(user.uid);
      else setUserId(null);
    });
    return () => unsub();
  }, []);

  // 🔹 Cargar quests desde Firestore (sin bonus)
  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const q = query(collection(db, "quests"), orderBy("order", "asc"));
        const snap = await getDocs(q);
        const data = snap.docs
          .map((d) => ({ id: d.id, ...d.data() } as Quest))
          .filter((q) => q.stage !== "bonus");
        setQuests(data);
      } catch (err) {
        console.error("Error loading quests:", err);
      }
    };
    fetchQuests();
  }, []);

  // 🔹 Cargar quests completadas del usuario
  useEffect(() => {
    if (!userId) return;
    const fetchCompleted = async () => {
      try {
        const completedRef = collection(db, `users/${userId}/completedQuests`);
        const snap = await getDocs(completedRef);
        const ids = snap.docs.map((d) => d.id);
        setCompletedIds(ids);
      } catch (err) {
        console.error("Error loading completed quests:", err);
      }
    };
    fetchCompleted();
  }, [userId]);

  // 🔹 Encontrar la siguiente quest disponible
  useEffect(() => {
    if (quests.length === 0) return;

    let candidate: Quest | null = null;

    for (const stage of ["initial", "intermediate", "advanced"]) {
      const stageQuests = quests
        .filter((q) => q.stage === stage)
        .sort((a, b) => (a.order ?? 99999) - (b.order ?? 99999));

      for (let i = 0; i < stageQuests.length; i++) {
        const q = stageQuests[i];
        if (!completedIds.includes(q.id)) {
          const prev = stageQuests[i - 1];
          if (i === 0 || (prev && completedIds.includes(prev.id))) {
            candidate = q;
          }
          break;
        }
      }

      if (candidate) break;
    }

    setNext(candidate);
  }, [quests, completedIds]);

  // 🔹 UI
  if (!next) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[var(--card)]/50 p-6 rounded-2xl border border-[var(--card)] shadow-lg"
      >
        <h3 className="text-lg font-semibold">Next Quest</h3>
        <p className="text-sm opacity-70 mt-2">
          All caught up — complete more quests to unlock the next stage.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--card)]/50 p-6 rounded-2xl border border-[var(--card)] shadow-lg"
    >
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
