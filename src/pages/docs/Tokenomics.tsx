import { motion } from "framer-motion";

export default function Tokenomics() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-gray-200">
      <motion.h1
        className="text-4xl font-bold mb-10 bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        $OLA Tokenomics
      </motion.h1>

      {/* Overview */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="text-gray-400 leading-relaxed">
          The $OLA token powers the Solates ecosystem. It’s designed to align user incentives,
          reward participation, and fuel the learning-to-earn model on Solana.  
          Each $OLA represents both progress and participation in the educational economy.
        </p>
      </motion.section>

      {/* Token Distribution */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Token Distribution</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
          <li><b>Community Airdrop:</b> 25%</li>
          <li><b>Staking & Rewards:</b> 20%</li>
          <li><b>Treasury & Ecosystem:</b> 25%</li>
          <li><b>Team & Advisors:</b> 15%</li>
          <li><b>Liquidity & Partnerships:</b> 15%</li>
        </ul>
      </motion.section>

      {/* Supply */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Total Supply</h2>
        <p className="text-gray-400 leading-relaxed">
          The total supply of <b>$OLA</b> is capped at <b>100,000,000 tokens</b>.  
          No additional tokens can be minted after deployment, ensuring transparency and scarcity.
        </p>
      </motion.section>

      {/* Vesting */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Vesting Schedule</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          To ensure fairness and stability, team and advisor allocations follow a
          12-month linear vesting period after a 3-month cliff.  
          Community and liquidity allocations unlock immediately upon mainnet release.
        </p>
      </motion.section>

      {/* Utility */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Token Utility</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
          <li>Access premium quests and mining areas.</li>
          <li>Participate in governance and DAO votes.</li>
          <li>Stake $OLA to earn yield or boost XP rewards.</li>
          <li>Redeem limited NFTs and Solates merchandise.</li>
        </ul>
      </motion.section>

      {/* Closing */}
      <motion.section
        className="text-center py-12 border-t border-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="text-2xl font-semibold mb-3">Fuel the Learning Economy</h3>
        <p className="text-gray-400 mb-6">
          $OLA is more than a token — it’s the reward for curiosity, growth, and progress.
        </p>
        <a
          href="/docs/whitepaper"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#14F195] to-[#9945FF] text-white font-semibold hover:opacity-90 transition-all"
        >
          Read the Whitepaper
        </a>
      </motion.section>
    </div>
  );
}
