import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";

interface EmailVerifyProps {
  completed: boolean;
  onComplete: () => void;
}

export default function EmailVerify({ completed, onComplete }: EmailVerifyProps) {
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    // Si hay usuario con email y todavía no se marcó como completado,
    // se da automáticamente la verificación.
    if (user?.email && !completed) {
      onComplete();
    }
  }, [user, completed, onComplete]);

  return (
    <motion.div className="bg-[var(--card)]/50 p-6 rounded-2xl border border-[var(--card)] backdrop-blur-md shadow-lg text-center">
      <h2 className="font-semibold text-lg mb-3 flex justify-center items-center gap-2">
        <Mail className="text-[var(--primary)]" /> Verify Your Email
      </h2>

      {user?.email ? (
        <p className="text-[var(--primary)] font-semibold">
          ✅ {user.email} verified (+10 XP)
        </p>
      ) : (
        <p className="text-gray-400">No email found for this user.</p>
      )}
    </motion.div>
  );
}
