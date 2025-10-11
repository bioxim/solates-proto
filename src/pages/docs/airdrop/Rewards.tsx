// src/docs/airdrop/Rewards.tsx
import { motion } from "framer-motion";

export default function Rewards() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-6 md:px-20 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#b14eff] via-[#00eaff] to-[#ff4ffb] bg-clip-text text-transparent">
          Solates Airdrop — Rewards and Distribution
        </h1>

        <p className="text-gray-400 mb-8 leading-relaxed">
          The Solates Airdrop distributes <b>$OLA</b> tokens to verified learners and contributors 
          based on their total points and engagement level. Rewards are calculated transparently, 
          ensuring that those who truly participate — not bots or idle wallets — receive the most benefit.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[#b14eff]">1. Total Supply Allocation</h2>
        <p className="text-gray-400 mb-6">
          The airdrop represents <span className="text-[#00eaff] font-semibold">15% of total $OLA supply</span>, 
          reserved for active users completing verified learning and DeFi missions.  
          This ensures sustainability while leaving room for future engagement campaigns and ecosystem incentives.
        </p>

        <table className="w-full text-left border-collapse mb-8">
          <thead>
            <tr className="border-b border-[var(--card)]">
              <th className="py-3">Category</th>
              <th className="py-3 text-right">Share of Airdrop Pool</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Profile & Onboarding", "0.5%"],
              ["Beginner Quests", "4%"],
              ["Intermediate Quests", "6%"],
              ["Advanced Quests & DeFi Missions", "3.5%"],
              ["Diamond & Community Rewards", "1%"],
            ].map(([cat, share], i) => (
              <tr key={i} className="border-b border-[var(--card)] text-gray-300">
                <td className="py-3">{cat}</td>
                <td className="py-3 text-right text-[#00eaff] font-semibold">{share}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-2xl font-semibold mb-4 text-[#b14eff]">2. Reward Calculation</h2>
        <p className="text-gray-400 mb-6">
          Each participant’s airdrop reward is proportional to their contribution and learning score, 
          calculated as a share of the total verified points accumulated by all users.
        </p>

        <pre className="bg-[var(--card)] p-4 rounded-xl text-sm text-gray-300 mb-8 overflow-x-auto">
{`User Reward = (User Points / Total Verified Points) × Airdrop Pool`}
        </pre>

        <p className="text-gray-400 mb-8">
          Rank multipliers increase rewards for top participants — up to a 
          <span className="text-[#b14eff] font-semibold"> 1.2× bonus</span> for Diamond-level learners.  
          All eligible wallets will receive their $OLA distribution during the Token Generation Event (TGE).
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[#b14eff]">3. Claim Process</h2>
        <ul className="list-disc list-inside text-gray-400 mb-6 space-y-2">
          <li>Rewards will be claimable through the Solates dashboard after TGE.</li>
          <li>Unclaimed tokens remain available for <b>60 days</b> post-launch.</li>
          <li>Expired allocations return to the ecosystem growth fund.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-[#b14eff]">4. Anti-Sybil & Verification</h2>
        <p className="text-gray-400 mb-8">
          Each wallet must pass human verification and connect to a unique Solates profile.  
          Automated or duplicate accounts are excluded using a hybrid off-chain scoring algorithm 
          combined with Solana wallet activity validation.
        </p>

        <div className="text-center mt-12">
          <p className="text-gray-300 italic">
            “Fair. Transparent. Educational. — The Solates Airdrop rewards genuine learning and contribution.”
          </p>
        </div>
      </motion.div>
    </div>
  );
}
