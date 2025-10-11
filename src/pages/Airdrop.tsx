import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Gift } from "lucide-react";

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
          <Gift className="w-12 h-12 text-[#b14eff]" />
        </div>

        <h1 className="text-3xl md:text-5xl font-bold mb-4 pb-5 bg-gradient-to-r from-[#b14eff] via-[#00eaff] to-[#ff4ffb] bg-clip-text text-transparent">
          Solates Airdrop Program
        </h1>

        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
          The <strong>Solates Airdrop</strong> is an incentive program that rewards users 
          for learning, participating, and growing within the ecosystem.  
          Every mission, quiz, and completed task adds points that bring you closer to earning <strong>$OLA</strong> — 
          the native token of Solates.
        </p>

        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          Full program details, eligibility rules, and reward tiers can be explored in the official documentation below.
        </p>

        <Link
          to="/docs/airdrop/general"
          className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-[#b14eff] via-[#6c47ff] to-[#00eaff] text-white font-semibold hover:scale-105 transition-transform shadow-lg"
        >
          View Airdrop Documentation
        </Link>
      </motion.div>
    </div>
  );
}
