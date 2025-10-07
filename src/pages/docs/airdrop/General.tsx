import { motion } from "framer-motion";

export default function General() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-6 md:px-20 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#b14eff] via-[#00eaff] to-[#ff4ffb] bg-clip-text text-transparent">
          Solates Airdrop — General Overview
        </h1>

        <p className="text-gray-400 mb-8 leading-relaxed">
          The Solates airdrop is designed to reward real engagement, learning, and contribution 
          within the Solana ecosystem. Instead of relying solely on wallet activity, 
          Solates introduces a transparent and educational approach — every user can earn points, 
          level up, and participate in the future token generation event ($OLA TGE).
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[#b14eff]">1. Purpose</h2>
        <p className="text-gray-400 mb-6">
          Solates was created to make crypto investing more accessible and trustworthy. 
          The airdrop reflects this philosophy — rewarding users who learn, explore, 
          and interact with the decentralized world in a meaningful way.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[#b14eff]">2. Eligibility</h2>
        <ul className="list-disc list-inside text-gray-400 mb-6 space-y-2">
          <li>Anyone can participate by creating a Solates account.</li>
          <li>No minimum balance or prior experience is required.</li>
          <li>Each user must complete basic verification and connect a Solana wallet.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-[#b14eff]">3. How It Works</h2>
        <p className="text-gray-400 mb-6">
          Through interactive quests, users learn DeFi concepts, simulate transactions, 
          and complete small challenges. Each completed task adds points to their 
          global ranking — determining the share of $OLA received during the airdrop.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[#b14eff]">4. Key Benefits</h2>
        <ul className="list-disc list-inside text-gray-400 mb-8 space-y-2">
          <li>Transparent, gamified system based on measurable progress.</li>
          <li>Open to both beginners and advanced DeFi users.</li>
          <li>Long-term utility for $OLA inside and outside the Solates ecosystem.</li>
          <li>Daily check-ins and achievements for consistent users.</li>
        </ul>

        <div className="text-center mt-12">
          <p className="text-gray-300 italic">
            “Crypto doesn’t have to be hard — earn $OLA by learning and exploring DeFi.”
          </p>
        </div>
      </motion.div>
    </div>
  );
}
