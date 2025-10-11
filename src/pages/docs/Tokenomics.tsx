import { motion } from "framer-motion";

export default function Tokenomics() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-gray-200">
      {/* Title */}
      <motion.h1
        className="text-4xl font-bold mb-10 bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        $OLA Tokenomics
      </motion.h1>

      {/* Intro / Overview */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          <strong>$OLA</strong> is the heartbeat of the Solates ecosystem — 
          connecting learning, participation, and growth in a single token economy.  
          It fuels engagement, rewards real activity, and powers governance within the platform.
        </p>
        <p className="text-gray-400 leading-relaxed">
          Designed with sustainability and fairness in mind, $OLA aligns incentives between
          the community, developers, and long-term contributors — creating a balanced 
          economy where education drives value.
        </p>
      </motion.section>

      {/* Token Utility */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Token Utility</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
          <li><b>Learn-to-Earn Rewards:</b> Earn $OLA by completing quests and advancing your skills.</li>
          <li><b>Governance:</b> Vote on future missions, integrations, and DAO proposals.</li>
          <li><b>Premium Access:</b> Unlock analytics, DeFi alerts, and the Mining Hall.</li>
          <li><b>Staking & Boosts:</b> Stake $OLA to increase XP gain or earn passive yield.</li>
          <li><b>Cross-Platform Utility:</b> Use $OLA for integrations with partner dApps, NFTs, and liquidity pools.</li>
        </ul>
      </motion.section>

      {/* Token Distribution */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Token Distribution</h2>
        <p className="text-gray-400 mb-4">
          The distribution model ensures long-term alignment between early users, 
          contributors, and ecosystem partners.  
          Allocations are subject to refinement as the platform evolves.
        </p>

        <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
          <li><b>Community & Airdrops:</b> 15% — rewarding learning and participation.</li>
          <li><b>Staking & Rewards:</b> 25% — distributed through on-chain missions and liquidity programs.</li>
          <li><b>Treasury & Ecosystem:</b> 30% — reserved for future collaborations and expansions.</li>
          <li><b>Team & Advisors:</b> 15% — supporting core development and long-term sustainability.</li>
          <li><b>Liquidity & Partnerships:</b> 15% — ensuring healthy market operations and bridge integrations.</li>
        </ul>
      </motion.section>

      {/* Supply & Emission */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Supply & Emission</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          The total supply of <b>$OLA</b> is capped at <b>100,000,000 tokens</b>.  
          No further minting will occur after deployment to preserve scarcity and trust.
        </p>
        <p className="text-gray-400 leading-relaxed">
          Token emissions will follow a progressive release model tied to platform milestones 
          and user engagement — avoiding inflationary pressure and encouraging consistent growth.
        </p>
      </motion.section>

      {/* Vesting Schedule */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Vesting Schedule</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          To ensure alignment between the team and the community, all internal allocations 
          are subject to vesting:
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
          <li><b>Team & Advisors:</b> 12-month linear vesting after a 3-month cliff.</li>
          <li><b>Community Rewards:</b> Gradual unlocks as quests and engagement milestones are completed.</li>
          <li><b>Treasury:</b> Released in tranches tied to development progress and DAO votes.</li>
        </ul>
      </motion.section>

      {/* Circular Economy Diagram (Textual Explanation) */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-2xl font-semibold mb-4">The Circular Value Loop</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          The Solates token economy connects <b>learning</b>, <b>earning</b>, and <b>DeFi participation</b> 
          in one continuous feedback loop:
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
          <li>Users learn and complete quests → earn XP and $OLA.</li>
          <li>Staking $OLA unlocks advanced tools, governance, and rewards.</li>
          <li>DeFi activity increases $OLA demand and strengthens ecosystem value.</li>
        </ul>
        <p className="text-gray-400 leading-relaxed mt-4">
          This creates a sustainable, self-reinforcing economy where education directly 
          contributes to token utility and ecosystem growth.
        </p>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="text-center py-12 border-t border-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-2xl font-semibold mb-3">A Token with Purpose</h3>
        <p className="text-gray-400 mb-6">
          $OLA is more than an asset — it’s the fuel of an educational movement on Solana.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/docs/whitepaper"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white font-semibold hover:opacity-90 transition-all"
          >
            Read the Whitepaper
          </a>
          <a
            href="/docs/airdrop"
            className="px-6 py-3 rounded-xl bg-[#0b0b0b] border border-[#14F195]/40 text-[#14F195] font-semibold hover:bg-[#14F195]/10 transition-all"
          >
            Learn About the Airdrop
          </a>
        </div>
      </motion.section>
    </div>
  );
}
