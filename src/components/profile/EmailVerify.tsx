/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

interface EmailVerifyProps {
  completed: boolean;
  onComplete: () => void;
}

export default function EmailVerify({ completed, onComplete }: EmailVerifyProps) {
  return (
    <motion.div className="bg-[var(--card)]/50 p-6 rounded-2xl border border-[var(--card)] backdrop-blur-md shadow-lg text-center">
      <h2 className="font-semibold text-lg mb-3 flex justify-center items-center gap-2">
        <Mail className="text-[var(--primary)]" /> Verify Your Email
      </h2>
      {!completed ? (
        <button
          onClick={onComplete}
          className="px-5 py-2 bg-[var(--primary)] text-white rounded-lg font-semibold hover:opacity-90 transition"
        >
          Verify Email
        </button>
      ) : (
        <p className="text-[var(--primary)] font-semibold">✅ Verified (+10 points)</p>
      )}
    </motion.div>
  );
}
