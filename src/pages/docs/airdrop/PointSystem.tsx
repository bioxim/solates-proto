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
          The Solates point system rewards active participation and learning inside the ecosystem. 
          Every action contributes to your total score and determines your eligibility tier in the $OLA airdrop.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[#b14eff]">1. Overview</h2>
        <p className="text-gray-400 mb-6">
          Each quest or action within Solates grants a fixed number of points based on its category. 
          Points accumulate permanently and define your progress level on your profile dashboard.
        </p>

        <table className="w-full text-left border-collapse mb-8">
          <thead>
            <tr className="border-b border-[var(--card)]">
              <th className="py-3">Quest Type</th>
              <th className="py-3">Example</th>
              <th className="py-3 text-right">Points</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Profile", "Avatar setup, social links, wallet connection", "50"],
              ["Beginner", "Bitcoin Basics, Ethereum Evolution", "100"],
              ["Intermediate", "First DeFi simulations, staking practice", "150"],
              ["Advanced", "Yield farming, liquidity optimization", "200"],
              ["Daily Check-in", "Maintain your streak", "10/day"],
            ].map(([type, example, pts], i) => (
              <tr key={i} className="border-b border-[var(--card)] text-gray-300">
                <td className="py-3">{type}</td>
                <td className="py-3">{example}</td>
                <td className="py-3 text-right text-[#00eaff] font-semibold">{pts}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-2xl font-semibold mb-4 text-[#b14eff]">2. Airdrop Ranks</h2>
        <p className="text-gray-400 mb-6">
          The higher your score, the higher your airdrop multiplier. Levels are unlocked 
          automatically when you reach the required point threshold.
        </p>

        <table className="w-full text-left border-collapse mb-8">
          <thead>
            <tr className="border-b border-[var(--card)]">
              <th className="py-3">Rank</th>
              <th className="py-3">Required Points</th>
              <th className="py-3 text-right">Reward</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Explorer", "0 – 499", "Base access to the airdrop"],
              ["Trader", "500 – 999", "+10% $OLA bonus"],
              ["DeFi Learner", "1000 – 1499", "+25% $OLA bonus"],
              ["Innovator", "1500 – 1999", "+50% $OLA bonus + early access"],
              ["Diamond Pioneer 💎", "2000+", "Premine access + daily check-in + 1.2x multiplier"],
            ].map(([rank, pts, reward], i) => (
              <tr key={i} className="border-b border-[var(--card)] text-gray-300">
                <td className="py-3 font-semibold text-[#00eaff]">{rank}</td>
                <td className="py-3">{pts}</td>
                <td className="py-3 text-right">{reward}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-2xl font-semibold mb-4 text-[#b14eff]">3. Validation</h2>
        <ul className="list-disc list-inside text-gray-400 mb-6 space-y-2">
          <li>Each quest includes a short quiz or blockchain action verification.</li>
          <li>Completion adds points to your total instantly.</li>
          <li>Some actions will use on-chain validation on Solana testnet/mainnet.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-[#b14eff]">4. Progress Tracking</h2>
        <p className="text-gray-400 mb-8">
          You can view your progress in the <span className="text-[#00eaff] font-semibold">Profile Dashboard</span>, 
          which displays your level, total points, and upcoming rank benefits.
        </p>

        <div className="text-center mt-12">
          <p className="text-gray-300 italic">“Learn. Play. Earn. — Welcome to the Solates Airdrop.”</p>
        </div>
      </motion.div>
    </div>
  );
}
