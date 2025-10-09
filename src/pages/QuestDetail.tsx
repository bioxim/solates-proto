import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { questsData } from "../data/questsData";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function QuestDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  const quest = questsData.find((q) => q.id === id);

  useEffect(() => {
    const saved = localStorage.getItem("solates_quests_progress");
    if (saved) {
      const progress = JSON.parse(saved);
      if (progress.includes(id)) setCompleted(true);
    }
  }, [id]);

  const handleComplete = () => {
    const saved = localStorage.getItem("solates_quests_progress");
    const progress = saved ? JSON.parse(saved) : [];
    if (!progress.includes(id)) {
      progress.push(id);
      localStorage.setItem("solates_quests_progress", JSON.stringify(progress));
    }
    setCompleted(true);

    // Optional toast or redirect
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

        {/* Video Section */}
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

        {/* Image Section */}
        {quest.imageUrl && (
          <img
            src={quest.imageUrl}
            alt={quest.title}
            className="rounded-xl shadow-md mx-auto mt-4 max-h-64 object-contain"
          />
        )}

        {/* Quiz Section */}
        {quest.questions && (
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-lg">Quick Quiz</h3>
            {quest.questions.map((q, i) => (
              <div key={i} className="bg-gray-800/40 p-4 rounded-xl">
                <p className="font-medium mb-2">{q.q}</p>
                <ul className="space-y-1">
                  {q.options.map((opt, idx) => (
                    <li
                      key={idx}
                      className="px-3 py-1 rounded-md bg-gray-900/40 hover:bg-[var(--primary)]/20 cursor-pointer"
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Completion Button */}
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
