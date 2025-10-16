/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Trophy, Twitter, MessageCircle, Gamepad2 as Discord } from "lucide-react";

interface SocialConnectProps {
  tasks: { twitter: boolean; telegram: boolean; discord: boolean };
  onComplete: (type: string, sub?: string) => void;
}

export default function SocialConnect({ tasks, onComplete }: SocialConnectProps) {
  const socials = [
    { name: "Twitter", icon: <Twitter />, key: "twitter" },
    { name: "Telegram", icon: <MessageCircle />, key: "telegram" },
    { name: "Discord", icon: <Discord />, key: "discord" },
  ];

  return (
    <motion.div className="bg-[var(--card)]/50 p-6 rounded-2xl border border-[var(--card)] backdrop-blur-md shadow-lg">
      <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
        <Trophy className="text-[var(--primary)]" /> Connect Your Socials
      </h2>
      <div className="flex flex-wrap gap-3 justify-center">
        {socials.map((s) => (
          <button
            key={s.key}
            onClick={() => onComplete("social", s.key)}
            disabled={tasks[s.key as keyof typeof tasks]}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
              tasks[s.key as keyof typeof tasks]
                ? "bg-green-700/30 text-green-400 cursor-default"
                : "bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 text-[var(--primary)]"
            }`}
          >
            {s.icon}{" "}
            {tasks[s.key as keyof typeof tasks] ? "Connected" : `Connect ${s.name}`}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
