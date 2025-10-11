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
          The <strong>Solates Airdrop</strong> rewards genuine engagement within the ecosystem.  
          Unlike typical airdrops based only on wallet activity, Solates introduces a 
          <strong> Learn-to-Earn </strong> approach — users gain points through learning, 
          completing missions, and participating in DeFi simulations.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[#b14eff]">1. Purpose</h2>
        <p className="text-gray-400 mb-6">
          Our goal is to make blockchain participation meaningful and educational.  
          Every user has a fair chance to earn <strong>$OLA</strong> by contributing time and effort — not just capital.  
          This aligns with Solates’ mission of promoting transparency, inclusion, and self-empowerment through knowledge.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[#b14eff]">2. Eligibility</h2>
        <ul className="list-disc list-inside text-gray-400 mb-6 space-y-2">
          <li>Anyone with a Solates account can participate.</li>
          <li>Users must connect a Solana wallet (e.g., Phantom) for reward validation.</li>
          <li>Completion of basic onboarding missions is required before claiming rewards.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-[#b14eff]">3. How It Works</h2>
        <p className="text-gray-400 mb-6">
          Users earn <strong>points (XP)</strong> by completing quests and profile actions.  
          Points accumulate on their dashboard and directly influence the share of <strong>$OLA</strong> received during 
          the Token Generation Event (TGE).
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[#b14eff]">4. Key Benefits</h2>
        <ul className="list-disc list-inside text-gray-400 mb-8 space-y-2">
          <li>Gamified learning that rewards knowledge and consistency.</li>
          <li>Transparent point-based ranking with on-chain validation.</li>
          <li>Fair participation for both beginners and experts.</li>
          <li>Long-term incentives connected to the $OLA economy.</li>
        </ul>

        <div className="text-center mt-12">
          <p className="text-gray-300 italic">
            “Learn, earn, and grow — your curiosity fuels your rewards.”
          </p>
        </div>
      </motion.div>
    </div>
  );
}
