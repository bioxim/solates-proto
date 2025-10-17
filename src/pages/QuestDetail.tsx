import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { questsData } from "../data/questsData";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { auth, updateUserProfile } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function QuestDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  const quest = questsData.find((q) => q.id === id);

  // --- Detectar usuario logueado
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  // --- Cargar progreso local
  useEffect(() => {
    const saved = localStorage.getItem("solates_quests_progress");
    if (saved) {
      const progress = JSON.parse(saved);
      if (progress.includes(id)) setCompleted(true);
    }
  }, [id]);

  const handleComplete = async () => {
    if (!user?.uid || !quest) return;

    const saved = localStorage.getItem("solates_quests_progress");
    const progress = saved ? JSON.parse(saved) : [];
    if (!progress.includes(id)) {
      progress.push(id);
      localStorage.setItem("solates_quests_progress", JSON.stringify(progress));
    }

    setCompleted(true);

    // ✅ Sumar XP en Firestore
    try {
      await updateUserProfile(user.uid, { xpIncrement: quest.reward }); 
      alert(`🎉 You earned ${quest.reward} XP!`);
    } catch (err) {
      console.error("Error updating XP:", err);
    }

    setTimeout(() => navigate("/quests"), 1500);
  };

  if (!quest)
    return (
      <div className="p-6 text-center text-red-400">
        Quest not found 😢
      </div>
    );

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full space-y-6 bg-[var(--card)]/40 border border-[var(--card)] rounded-2xl p-6 shadow-lg backdrop-blur-lg"
      >
        <h1 className="text-3xl font-bold">{quest.title}</h1>
        <p className="opacity-80">{quest.description}</p>

        {quest.contentUrl && (
          <div className="mt-4">
            <iframe
              className="w-full h-64 rounded-xl"
              src={quest.contentUrl}
              title={quest.title}
              allowFullScreen
            />
          </div>
        )}

        {quest.imageUrl && (
          <img
            src={quest.imageUrl}
            alt={quest.title}
            className="rounded-xl shadow-md mx-auto mt-4 max-h-64 object-contain"
          />
        )}

        {!completed ? (
          <button
            onClick={handleComplete}
            className="w-full mt-6 py-2 rounded-lg font-semibold bg-[var(--primary)] text-white hover:opacity-90 transition"
          >
            Mark as Completed
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 text-green-400 font-semibold mt-6">
            <CheckCircle size={22} /> Quest completed! +{quest.reward} XP
          </div>
        )}
      </motion.div>
    </div>
  );
}
