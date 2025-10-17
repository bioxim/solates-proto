/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Trophy, Twitter, MessageCircle, Gamepad2 as Discord } from "lucide-react";
import { useState } from "react";

interface SocialConnectProps {
  tasks: { twitter: boolean; telegram: boolean; discord: boolean };
  onComplete: (type: string, sub?: string) => void;
}

export default function SocialConnect({ tasks, onComplete }: SocialConnectProps) {
  const [usernames, setUsernames] = useState<{ [key: string]: string }>({});

  const socials = [
    { name: "Twitter", icon: <Twitter />, key: "twitter" },
    { name: "Telegram", icon: <MessageCircle />, key: "telegram" },
    { name: "Discord", icon: <Discord />, key: "discord" },
  ];

  const handleConnect = (key: string, name: string) => {
    if (tasks[key as keyof typeof tasks]) return;

    // Pedir username
    const username = prompt(`Enter your ${name} username:`)?.trim();
    if (!username) return;

    // Guardar username y marcar tarea como completada
    setUsernames((prev) => ({ ...prev, [key]: username }));
    onComplete("social", key);
  };

  return (
    <motion.div className="bg-[var(--card)]/50 p-6 rounded-2xl border border-[var(--card)] backdrop-blur-md shadow-lg">
      <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
        <Trophy className="text-[var(--primary)]" /> Connect Your Socials
      </h2>
      <div className="flex flex-wrap gap-3 justify-center">
        {socials.map((s) => {
          const connected = tasks[s.key as keyof typeof tasks];
          const username = usernames[s.key] || "";
          return (
            <button
              key={s.key}
              onClick={() => handleConnect(s.key, s.name)}
              disabled={connected}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg font-semibold transition text-center ${
                connected
                  ? "bg-green-700/30 text-green-400 cursor-default"
                  : "bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 text-[var(--primary)]"
              }`}
            >
              <div className="flex items-center gap-2">{s.icon}</div>
              {connected ? (
                <>
                  <span>✅ Connected</span>
                  <span className="text-xs opacity-80">{username}</span>
                </>
              ) : (
                `Connect ${s.name}`
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
