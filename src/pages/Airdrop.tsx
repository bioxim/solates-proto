// src/pages/Airdrop.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function Airdrop() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-[var(--bg)] text-[var(--text)]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-12 h-12 text-[#b14eff]" />
        </div>

        <h1 className="text-3xl md:text-5xl font-bold mb-4 pb-5 bg-gradient-to-r from-[#b14eff] via-[#00eaff] to-[#ff4ffb] bg-clip-text text-transparent">
          Airdrop Program
        </h1>

        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
          The Solates Airdrop is still in development.  
          All information, systems and reward mechanics are subject to change as the project evolves.  
          Stay tuned as we finalize the documentation and point system.
        </p>

        <Link
          to="/docs/airdrop/general"
          className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-[#b14eff] via-[#6c47ff] to-[#00eaff] text-white font-semibold hover:scale-105 transition-transform shadow-lg"
        >
          View Documentation
        </Link>
      </motion.div>
    </div>
  );
}
