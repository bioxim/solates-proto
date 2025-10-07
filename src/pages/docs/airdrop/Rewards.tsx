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
          The Solates airdrop distributes the $OLA token to users based on their total points and level. 
          Rewards are designed to be fair, transparent, and directly tied to user engagement, ensuring that 
          those who learn, explore, and participate more, earn more.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[#b14eff]">1. Total Supply Allocation</h2>
        <p className="text-gray-400 mb-6">
          The $OLA token allocation dedicated to the airdrop represents <span className="text-[#00eaff] font-semibold">15% of total supply</span>, 
          distributed progressively among verified users. Future airdrops may be scheduled for continued engagement campaigns.
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
              ["Profile & Onboarding", "10%"],
              ["Beginner & Intermediate Quests", "35%"],
              ["Advanced Quests & DeFi Missions", "35%"],
              ["Diamond Level Bonuses", "15%"],
              ["Referral & Community Rewards", "5%"],
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
          The formula for reward calculation is based on each user’s point ratio within the global leaderboard.
        </p>

        <pre className="bg-[var(--card)] p-4 rounded-xl text-sm text-gray-300 mb-8 overflow-x-auto">
{`User Reward = (User Points / Total Points of All Participants) × Airdrop Pool`}
        </pre>

        <p className="text-gray-400 mb-8">
          Multipliers are then applied based on rank — up to <span className="text-[#b14eff] font-semibold">1.2×</span> for Diamond users.  
          All verified wallets will receive their final $OLA balance during the Token Generation Event (TGE).
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[#b14eff]">3. Claim Process</h2>
        <ul className="list-disc list-inside text-gray-400 mb-6 space-y-2">
          <li>Rewards can be claimed directly through the Solates dashboard after TGE.</li>
          <li>Unclaimed rewards remain available for a 60-day period after launch.</li>
          <li>Any unclaimed $OLA will be redirected to the ecosystem growth fund.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-[#b14eff]">4. Anti-Sybil Measures</h2>
        <p className="text-gray-400 mb-8">
          Each wallet must complete human verification through Solates’ integrated login system.  
          Duplicate or automated accounts are filtered out using a hybrid off-chain scoring algorithm 
          and wallet activity validation.
        </p>

        <div className="text-center mt-12">
          <p className="text-gray-300 italic">
            “Fair. Transparent. Educational. — The Solates Airdrop rewards true participation.”
          </p>
        </div>
      </motion.div>
    </div>
  );
}
