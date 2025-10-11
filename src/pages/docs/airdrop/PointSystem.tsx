import { motion } from "framer-motion";

export default function PointSystem() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-6 md:px-20 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#b14eff] via-[#00eaff] to-[#ff4ffb] bg-clip-text text-transparent">
          Solates Airdrop — Point System
        </h1>

        <p className="text-gray-400 mb-8 leading-relaxed">
          The <strong>Solates Point System</strong> defines how users accumulate XP and determine their airdrop eligibility.  
          Points are earned by completing missions, improving profiles, and staying active daily.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[#b14eff]">1. Point Allocation</h2>
        <table className="w-full text-left border-collapse mb-8">
          <thead>
            <tr className="border-b border-[var(--card)]">
              <th className="py-3">Category</th>
              <th className="py-3">Example</th>
              <th className="py-3 text-right">Points</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Profile Setup", "Avatar upload, socials, wallet link", "10 each"],
              ["Beginner Quests", "Blockchain basics, wallets, Solana intro", "10 each"],
              ["Intermediate Quests", "DeFi simulations, staking tutorials", "20 each"],
              ["Advanced Quests", "Liquidity pools, yield strategies", "50 each"],
              ["Daily Check-in", "Maintain streaks and consistency", "+1/day"],
            ].map(([cat, ex, pts], i) => (
              <tr key={i} className="border-b border-[var(--card)] text-gray-300">
                <td className="py-3">{cat}</td>
                <td className="py-3">{ex}</td>
                <td className="py-3 text-right text-[#00eaff] font-semibold">{pts}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-2xl font-semibold mb-4 text-[#b14eff]">2. Level Ranks</h2>
        <table className="w-full text-left border-collapse mb-8">
          <thead>
            <tr className="border-b border-[var(--card)]">
              <th className="py-3">Rank</th>
              <th className="py-3">XP Range</th>
              <th className="py-3 text-right">Multiplier</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Explorer", "0 – 499", "x1.0"],
              ["Trader", "500 – 999", "x1.1"],
              ["DeFi Learner", "1000 – 1499", "x1.25"],
              ["Innovator", "1500 – 1999", "x1.5"],
              ["Diamond Pioneer 💎", "2000+", "x2.0 + exclusive rewards"],
            ].map(([r, xp, mult], i) => (
              <tr key={i} className="border-b border-[var(--card)] text-gray-300">
                <td className="py-3 font-semibold text-[#00eaff]">{r}</td>
                <td className="py-3">{xp}</td>
                <td className="py-3 text-right">{mult}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="text-gray-400 mb-8">
          Your total XP can be tracked from the <strong>Dashboard</strong>.  
          The higher your rank, the higher your airdrop multiplier and $OLA reward allocation.
        </p>

        <div className="text-center mt-12">
          <p className="text-gray-300 italic">“Knowledge is your currency — and $OLA is your reward.”</p>
        </div>
      </motion.div>
    </div>
  );
}
