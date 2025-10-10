import { motion } from "framer-motion";
import { useState } from "react";
import {
  BookOpen,
  Layers,
  Coins,
  Rocket,
  Users,
  Target,
} from "lucide-react";

export default function Whitepaper() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: BookOpen,
      content: (
        <>
          <h3 className="text-xl font-semibold mb-3 text-[#14F195]">
            Vision & Mission
          </h3>
          <p className="opacity-80 mb-4">
            At <strong>Solates</strong>, our mission is to empower individuals to enter the
            world of decentralized finance (DeFi) with confidence, clarity, and purpose.
            We believe that transparency, honesty, and education are the foundations of sustainable growth — both for investors and for the Web3 ecosystem as a whole.
          </p>
          <p className="opacity-80 mb-4">
            <strong>Solates</strong> bridges the gap between learning and earning by offering a gamified
            environment where users can discover blockchain, DeFi, and investment strategies
            in a guided and rewarding way.
          </p>
          <p className="opacity-80 mb-4">
            Our vision is to become the most trusted educational hub in the Solana ecosystem — where every user, from beginner to advanced investor, can learn, grow, and design their own investment path.
          </p>
          <h3 className="text-xl font-semibold mb-3 text-[#14F195]">
            The Problem
          </h3>
          <p className="opacity-80 mb-4">
            Most users entering crypto today are overwhelmed.
          </p>
          <p className="opacity-80 mb-4">
            Crypto onboarding is confusing. Information is scattered, risks are high, and
            newcomers often learn through losses. Solates addresses this by merging
            education, gamification, and real DeFi tools in one intuitive platform.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-[#14F195]">
            Why Solates
          </h3>
          <p>
            We combine education, gamification, and real DeFi tools in a single intuitive platform — helping users not only understand blockchain, but also apply that knowledge effectively.
          </p>
          <p className="opacity-80 mb-4">
            Every mission, quest, and reward inside Solates is designed to make the learning process engaging and practical.
          </p>
          <p className="opacity-80 mb-4">
            As users complete missions, they gain XP, learn how DeFi works, and unlock real economic opportunities through the native token $OLA.
          </p>
          <p className="opacity-80 mb-4">
            <strong>Solates</strong> doesn’t just teach what DeFi is — it teaches how to use it confidently and safely.
          </p>
          <h3 className="text-xl font-semibold mb-3 text-[#14F195]">
            Guiding Users to Success
          </h3>
          <p className="opacity-80 mb-4">
            What makes <strong>Solates</strong> truly unique is its human-centered approach.
          </p>
          <p className="opacity-80 mb-4">
            We don’t leave users alone in a sea of complexity — we guide them step by step toward success.
            Through structured missions, interactive dashboards, and community-driven learning, Solates helps each user build personalized strategies that fit their own goals and risk tolerance.
          </p>
          <h4 className="font-semibold mb-3 text-[#9ca3af]">
            Our commitment is simple:
          </h4>
          <p className="opacity-80 mb-4">
            To create a transparent, educational, and rewarding ecosystem where every user can learn, invest, and grow — their way.
          </p>
        </>
      ),
    },
    {
      id: "ecosystem",
      title: "The Solates Ecosystem",
      icon: Layers,
      content: (
        <>
          <p className="opacity-80 mb-4">
            The Solates ecosystem is designed around progression, interaction, and reward.
            It includes:
          </p>
          <ul className="list-disc pl-6 opacity-90 space-y-2">
            <li>📘 <strong>Quests System:</strong> Learn-to-Earn modules with videos, quizzes, and interactive learning.</li>
            <li>💼 <strong>Dashboard:</strong> Track XP, wallet balance, DeFi positions, and alerts.</li>
            <li>👥 <strong>Referral & Social Layer:</strong> Earn by inviting friends who complete quests.</li>
            <li>🔥 <strong>Daily Engagement:</strong> Check-ins, streaks, and leaderboards that encourage consistency.</li>
          </ul>
        </>
      ),
    },
    {
      id: "token",
      title: "The $OLA Token",
      icon: Coins,
      content: (
        <>
          <p className="opacity-80 mb-4">
            $OLA is the native utility token of Solates, powering every interaction in the
            ecosystem. It represents both reward and governance.
          </p>
          <ul className="list-disc pl-6 opacity-90 space-y-2">
            <li>🎯 Reward for completing quests and leveling up.</li>
            <li>🔒 Access to exclusive features like the Mining Hall.</li>
            <li>💬 Governance and future DAO participation.</li>
            <li>🧠 Staking, liquidity, and future DeFi integrations.</li>
          </ul>
        </>
      ),
    },
    {
      id: "airdrop",
      title: "Airdrop & Incentives",
      icon: Rocket,
      content: (
        <>
          <p className="opacity-80 mb-4">
            Early contributors and learners can participate in the Solates Airdrop Program.
          </p>
          <ul className="list-disc pl-6 opacity-90 space-y-2">
            <li>🏆 Earn XP and complete quests to qualify.</li>
            <li>👥 Get extra points for verified referrals.</li>
            <li>💰 Unlock higher tiers for bigger airdrop rewards.</li>
          </ul>
        </>
      ),
    },
    {
      id: "tokenomics",
      title: "Tokenomics",
      icon: Target,
      content: (
        <>
          <p className="opacity-80 mb-4">
            Solates maintains a balanced and sustainable token model for long-term growth.
          </p>
          <ul className="list-disc pl-6 opacity-90 space-y-2">
            <li>💎 Total Supply: 100,000,000 $OLA</li>
            <li>🌍 Community & Airdrops: 40%</li>
            <li>🔬 Development & Team: 25%</li>
            <li>🤝 Partnerships & Treasury: 20%</li>
            <li>🔥 Reserve & Staking Rewards: 15%</li>
          </ul>
        </>
      ),
    },
    {
      id: "team",
      title: "Vision Beyond",
      icon: Users,
      content: (
        <>
          <p className="opacity-80 mb-4">
            Solates is more than a platform — it’s a movement. Founded with the belief that
            knowledge and transparency create trust, Solates empowers every user to take
            control of their financial journey.
          </p>
          <p className="opacity-80">
            We invite builders, creators, and learners to join us in shaping the next wave of
            decentralized education and finance.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-gray-100">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#14F195] to-[#9945FF] text-transparent bg-clip-text">
          Solates Whitepaper
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore the foundations, vision, and economic design of Solates — the gamified
          learning ecosystem built on Solana.
        </p>
      </motion.div>

      {/* Navigation Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {sections.map(({ id, title, icon: Icon }) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.03 }}
            onClick={() =>
              setActiveSection(activeSection === id ? null : id)
            }
            className={`p-6 text-left rounded-xl border border-gray-800/50 transition-all backdrop-blur-md bg-[#0b0b0b]/40 hover:border-[#14F195]/40 ${
              activeSection === id
                ? "shadow-[0_0_15px_#14F19540] border-[#14F195]/60"
                : ""
            }`}
          >
            <Icon className="text-[#14F195] mb-3" size={26} />
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-sm text-gray-400">
              Click to view content
            </p>
          </motion.button>
        ))}
      </div>

      {/* Expanded Section */}
      {activeSection && (
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-8 rounded-2xl border border-gray-800/50 bg-[#0b0b0b]/60 backdrop-blur-md shadow-lg"
        >
          {sections.find((s) => s.id === activeSection)?.content}
        </motion.div>
      )}
    </div>
  );
}
