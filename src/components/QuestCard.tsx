import { Lock, CheckCircle, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface QuestCardProps {
  id: string;
  title: string;
  description: string;
  reward: number;
  index: number;
  unlocked: boolean;
  completed: boolean;
}

export default function QuestCard({
  id,
  title,
  description,
  reward,
  index,
  unlocked,
  completed,
}: QuestCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`p-5 rounded-2xl border backdrop-blur-lg shadow-lg cursor-pointer transition-all duration-200
      ${
        completed
          ? "border-green-400/40 bg-green-900/10 hover:bg-green-900/20"
          : unlocked
          ? "border-[var(--primary)]/40 bg-[var(--card)]/40 hover:bg-[var(--card)]/60"
          : "border-gray-700/50 bg-gray-900/30 opacity-50 cursor-not-allowed"
      }`}
      onClick={() => unlocked && navigate(`/quest/${id}`)}
    >
      <div className="flex items-center justify-between mb-3">
        <h3
          className={`text-lg font-semibold ${
            completed ? "text-green-400" : unlocked ? "text-[var(--text)]" : "text-gray-500"
          }`}
        >
          {title}
        </h3>

        {completed ? (
          <CheckCircle className="text-green-400" size={22} />
        ) : unlocked ? (
          <PlayCircle className="text-[var(--primary)]" size={22} />
        ) : (
          <Lock className="text-gray-600" size={20} />
        )}
      </div>

      <p className="text-sm opacity-80 mb-3">{description}</p>

      <div className="text-xs text-[var(--primary)] font-medium">
        Reward: +{reward} XP
      </div>
    </motion.div>
  );
}
