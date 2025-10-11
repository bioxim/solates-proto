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
          The Solates roadmap outlines our strategic evolution — from an educational foundation
          to a full Web3 learning and earning ecosystem on Solana.  
          Each milestone represents a step forward in empowering users through decentralized knowledge, 
          transparency, and real DeFi tools.
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
          <h3 className="text-xl font-semibold text-[#14F195] mb-2">
            Q4 2025 – MVP & Quests Launch
          </h3>
          <p className="text-gray-400">
            Launch of the first MVP version featuring user onboarding, quest-based learning,
            and the first interactive dashboard.  
            This phase focuses on education, accessibility, and early community building.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[#14F195] mb-2">
            Q1 2026 – $OLA Token & Mining Hall
          </h3>
          <p className="text-gray-400">
            Introduction of the $OLA token — the utility and reward engine of the Solates ecosystem.  
            Users reaching key XP milestones will unlock access to the Mining Hall and early staking programs.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[#14F195] mb-2">
            Q2 2026 – DAO & Governance Layer
          </h3>
          <p className="text-gray-400">
            The transition to community-driven decision-making begins.  
            Through governance and proposals, users will shape new features, missions, and reward models.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[#14F195] mb-2">
            Q3 2026 – Solates DeFi Hub
          </h3>
          <p className="text-gray-400">
            Expansion into advanced DeFi tools: integrated portfolio tracking, on-chain alerts, and yield dashboards.  
            Solates becomes the all-in-one hub for decentralized education and real asset management.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[#14F195] mb-2">
            Q4 2026 – Global Expansion & Partnerships
          </h3>
          <p className="text-gray-400">
            Scaling the platform globally through collaborations with educational institutions, 
            DeFi protocols, and ecosystem partners.  
            Solates establishes itself as a universal gateway for Web3 learning and financial empowerment.
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
        <h3 className="text-2xl font-semibold mb-3">
          The Future of Learning is On-Chain
        </h3>
        <p className="text-gray-400 mb-6">
          Solates continues to evolve — powered by the community, built on Solana,
          and guided by transparency, knowledge, and collaboration.
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
