 
import { motion } from "framer-motion";
import { Trophy, Twitter, MessageCircle, Gamepad2 as Discord } from "lucide-react";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

interface SocialConnectProps {
  tasks: { twitter: boolean; telegram: boolean; discord: boolean };
  onComplete: (type: string, sub?: string, value?: string) => void;
  usernames: { [key: string]: string }; // recibidos desde Profile
  userId: string; // 🔹 añadimos esto para saber quién conecta
}

export default function SocialConnect({ tasks, onComplete, usernames, userId }: SocialConnectProps) {
  const socials = [
    { name: "Twitter", icon: <Twitter />, key: "twitter" },
    { name: "Telegram", icon: <MessageCircle />, key: "telegram" },
    { name: "Discord", icon: <Discord />, key: "discord" },
  ];

  // 🔹 Función para limpiar el username
  const cleanUsername = (input: string) => {
    input = input.trim();

    // Si es URL tipo https://x.com/@username, extraer solo username
    try {
      const url = new URL(input);
      if (url.pathname) {
        const parts = url.pathname.split("/");
        const last = parts.pop() || "";
        return last.replace(/^[@#]+/, "").toLowerCase();
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // no es URL, seguir
    }

    // Si empieza con @ o #, eliminarlo
    return input.replace(/^[@#]+/, "").toLowerCase();
  };

  const handleConnect = async (key: string, name: string) => {
    if (tasks[key as keyof typeof tasks]) return;

    const usernameInput = prompt(`Enter your ${name} username:`)?.trim();
    if (!usernameInput) return;

    const username = cleanUsername(usernameInput);
    if (!username) return;

    try {
      // 🔍 Verificar duplicados en Firestore
      const usersRef = collection(db, "users");
      const q = query(usersRef, where(`socials.${key}`, "==", username));
      const querySnap = await getDocs(q);

      const duplicateFound = querySnap.docs.some((doc) => doc.id !== userId);
      if (duplicateFound) {
        alert(`⚠️ This ${name} username is already linked to another account.`);
        return;
      }

      // ✅ Conexión permitida
      onComplete("social", key, username);
    } catch (err) {
      console.error("Error checking duplicates:", err);
      alert("❌ Error checking existing usernames. Try again later.");
    }
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
              <div className="flex items-center gap-2">
                {s.icon}
                {connected && <span className="text-xs opacity-70">🔗 Verified connection</span>}
              </div>
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
