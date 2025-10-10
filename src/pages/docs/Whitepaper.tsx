import { motion } from "framer-motion";

export default function Whitepaper() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-gray-200">
      <motion.h1
        className="text-4xl font-bold mb-10 bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Solates Whitepaper
      </motion.h1>

      {/* Introduction */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="text-gray-400 leading-relaxed">
          Solates is an educational and gamified ecosystem built on Solana that
          helps users learn Web3 fundamentals through interactive quests, real
          progress tracking, and DeFi integrations. The platform combines
          education, engagement, and incentives — transforming complex blockchain
          concepts into simple, interactive learning experiences.
        </p>
      </motion.section>

      {/* Vision & Goals */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Vision & Goals</h2>
        <p className="text-gray-400 leading-relaxed">
          Our vision is to build the gateway for the next wave of Solana users
          through education. Solates rewards curiosity — empowering users to
          explore blockchain principles, master DeFi tools, and understand the
          value behind decentralization. Every completed quest, every connection,
          and every point earned represents knowledge gained and potential unlocked.
        </p>
      </motion.section>

      {/* The $OLA Token */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold mb-4">The $OLA Token</h2>
        <p className="text-gray-400 leading-relaxed mb-3">
          $OLA is the native token powering the Solates ecosystem. It represents
          both progress and participation — earned through learning, completing
          quests, inviting friends, and contributing to the community.
        </p>
        <ul className="list-disc list-inside text-gray-400 ml-4 space-y-2">
          <li><b>Utility:</b> Access premium quests, governance rights, and mining privileges.</li>
          <li><b>Earned by:</b> Completing educational missions, referrals, and staking activities.</li>
          <li><b>Redeemable for:</b> Special rewards, limited NFTs, or participation in $OLA mining.</li>
        </ul>
      </motion.section>

      {/* User Progression */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4">User Journey</h2>
        <p className="text-gray-400 leading-relaxed">
          Each user starts their journey as a <b>Rookie</b> and advances through
          levels by completing quests, checking in daily, and connecting their wallet.
          Progression unlocks access to new content and interactive DeFi simulations.
        </p>
        <div className="mt-4 border border-gray-700 rounded-xl p-6 bg-[#0a0a0a]/40">
          <ul className="list-decimal list-inside text-gray-400 space-y-2">
            <li>Beginner Level – Learn blockchain fundamentals.</li>
            <li>Intermediate Level – Explore trading, staking, and liquidity pools.</li>
            <li>Advanced Level – Manage DeFi strategies and governance participation.</li>
          </ul>
        </div>
      </motion.section>

      {/* Governance */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Governance & DAO</h2>
        <p className="text-gray-400 leading-relaxed">
          Future versions of Solates will evolve into a DAO structure, giving
          token holders the ability to vote on platform upgrades, reward mechanisms,
          and educational content. The community drives the evolution of the ecosystem,
          ensuring transparency and fairness in every decision.
        </p>
      </motion.section>

      {/* Technical Architecture */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Technical Architecture</h2>
        <p className="text-gray-400 leading-relaxed">
          Solates is built on Solana to take advantage of its scalability,
          security, and low transaction costs. The application integrates Firebase
          for user management, and will progressively transition to decentralized
          identity verification and wallet-based authentication.
        </p>
      </motion.section>

      {/* Roadmap */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Roadmap</h2>
        <ul className="list-disc list-inside text-gray-400 ml-4 space-y-2">
          <li><b>Q4 2025:</b> Platform MVP launch and quest system beta.</li>
          <li><b>Q1 2026:</b> $OLA token integration and mining hall release.</li>
          <li><b>Q2 2026:</b> DAO activation and user-driven content expansion.</li>
          <li><b>Q3 2026:</b> Full ecosystem deployment with DeFi integrations.</li>
        </ul>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="text-center py-12 border-t border-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <h3 className="text-2xl font-semibold mb-3">Join the Solates Revolution</h3>
        <p className="text-gray-400 mb-6">
          Learn. Earn. Grow. Together we build the new decentralized future.
        </p>
        <a
          href="/dashboard"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#14F195] to-[#9945FF] text-white font-semibold hover:opacity-90 transition-all"
        >
          Start Your Journey
        </a>
      </motion.section>
    </div>
  );
}
