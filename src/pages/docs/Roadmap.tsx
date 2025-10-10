import { motion } from "framer-motion";

export default function Roadmap() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-gray-200">
      <motion.h1
        className="text-4xl font-bold mb-10 bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Solates Roadmap
      </motion.h1>

      {/* Intro */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Vision</h2>
        <p className="text-gray-400 leading-relaxed">
          The Solates roadmap outlines our strategic phases — from building the
          educational foundation to deploying a full Web3 learning economy on Solana.
          Each milestone strengthens the bridge between blockchain education and real participation.
        </p>
      </motion.section>

      {/* Roadmap Timeline */}
      <motion.section
        className="space-y-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div>
          <h3 className="text-xl font-semibold text-[#14F195] mb-2">Q4 2025 – MVP & Quests Launch</h3>
          <p className="text-gray-400">
            Launch of Solates MVP, onboarding system, and first quest modules for beginner users.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[#14F195] mb-2">Q1 2026 – $OLA Token & Mining Hall</h3>
          <p className="text-gray-400">
            Introduction of $OLA token and Mining Hall access for users reaching milestone XP.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[#14F195] mb-2">Q2 2026 – DAO & Governance Layer</h3>
          <p className="text-gray-400">
            Establishment of a governance structure where users can vote on new features and quests.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[#14F195] mb-2">Q3 2026 – Solates DeFi Hub</h3>
          <p className="text-gray-400">
            Integration of Solana-based DeFi dashboards, portfolio tracking, and educational yield strategies.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[#14F195] mb-2">Q4 2026 – Global Expansion</h3>
          <p className="text-gray-400">
            Partnerships with educational institutions and DeFi protocols to expand Solates worldwide.
          </p>
        </div>
      </motion.section>

      {/* Outro */}
      <motion.section
        className="text-center py-12 border-t border-gray-800 mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-2xl font-semibold mb-3">The Future of Learning is On-Chain</h3>
        <p className="text-gray-400 mb-6">
          Solates continues to evolve — powered by the community, built on Solana.
        </p>
        <a
          href="/docs/whitepaper"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white font-semibold hover:opacity-90 transition-all"
        >
          Explore the Vision
        </a>
      </motion.section>
    </div>
  );
}
