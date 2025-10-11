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
          <p className="opacity-80 mb-4">
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
          <h3 className="text-xl font-semibold mb-3 text-[#14F195]">
            Building a Unified DeFi Learning Experience
          </h3>
          <p className="opacity-80 mb-4">
            The Solates ecosystem is structured around progression, interaction, and financial empowerment. It merges educational gamification with real DeFi analytics to guide users from their first wallet to advanced investment strategies — all within a single Solana-powered platform.
          </p>

          <h4 className="text-lg font-semibold mb-2 text-[#14F195]">
            1. The DeFi Layer
          </h4>
          <p className="opacity-80 mb-4">
            The <strong>Dashboard</strong> is the core of Solates, integrating essential tools for tracking and managing on-chain portfolios:
          </p>
          <ul className="list-disc pl-6 opacity-90 space-y-2 mb-4">
            <li>💼 View Solana wallet balances and token holdings.</li>
            <li>📊 Track portfolio performance, XP, and progress levels.</li>
            <li>⚠️ Receive liquidity pool alerts when positions move out of range.</li>
            <li>🌐 Access investment opportunities curated from top DeFi protocols like Raydium and Kamino.</li>
            <li>🏗️ Unlock the <strong>Mining Hall</strong> — an exclusive area for users reaching advanced XP tiers.</li>
          </ul>

          <h4 className="text-lg font-semibold mb-2 text-[#14F195]">
            2. The Learning Layer
          </h4>
          <p className="opacity-80 mb-4">
            Through interactive <strong>quests</strong>, users learn by doing — watching videos, taking quizzes, and completing real blockchain actions.
          </p>
          <ul className="list-disc pl-6 opacity-90 space-y-2 mb-4">
            <li>🎓 Progressive levels: beginner, intermediate, and advanced missions.</li>
            <li>🎯 Each mission awards XP and $OLA tokens upon completion.</li>
            <li>🧩 Unlocks access to new educational content and DeFi tools.</li>
          </ul>

          <h4 className="text-lg font-semibold mb-2 text-[#14F195]">
            3. The Token Layer
          </h4>
          <p className="opacity-80 mb-4">
            The <strong>$OLA token</strong> fuels every layer of the ecosystem — it is both the incentive and governance mechanism of Solates.
          </p>
          <ul className="list-disc pl-6 opacity-90 space-y-2 mb-4">
            <li>💰 Earned by completing educational missions and participating in the ecosystem.</li>
            <li>🔒 Used for staking and unlocking premium features.</li>
            <li>🗳️ Enables DAO-based governance in future updates.</li>
            <li>🪙 Integrated with real DeFi actions on the Solana network.</li>
          </ul>

          <h4 className="text-lg font-semibold mb-2 text-[#14F195]">
            4. Future Integrations
          </h4>
          <p className="opacity-80 mb-4">
            Solates is designed as an evolving ecosystem — one that bridges education, analytics, and decentralized finance into a single unified experience. Upcoming integrations aim to expand the platform’s reach and functionality beyond the Solana network:
          </p>
          <ul className="list-disc pl-6 opacity-90 space-y-2 mb-4">
            <li>
              🌉 <strong>Cross-Chain Expansion:</strong> Future updates will include a bridge mechanism inspired by solutions like Wormhole, enabling seamless interaction between Solana, Ethereum, Base, and Polygon.  
              Users will be able to swap, stake, and provide liquidity for <strong>$OLA</strong> across multiple chains, expanding access to liquidity pools and rewards.
            </li>
            <li>
              📲 <strong>Full Mobile Integration:</strong> Solates aims to deliver a complete mobile experience through a native app — not just wallet connectivity.  
              By integrating live portfolio tracking, DeFi alerts, and yield notifications, the app will act as a personalized financial assistant that evolves with the user’s learning progress.
            </li>
            <li>
              📡 <strong>Real-Time Protocol Connections:</strong> Integration with leading DeFi platforms like Raydium, Orca, and Kamino will provide real-time tracking of liquidity positions, APRs, and strategy analytics directly from the dashboard.
            </li>
            <li>
              🤝 <strong>API for External Partners:</strong> A dedicated API layer will allow third-party educational and DeFi platforms to connect with Solates, enriching the ecosystem with new quests, data insights, and learning experiences.
            </li>
          </ul>

          <p className="opacity-80 mb-4">
            By integrating wallet connections, live portfolio tracking, and intelligent DeFi alerts, users will be able to:
          </p>
          <ul className="list-disc pl-6 opacity-90 space-y-2 mb-4">
            <li>⚡ Detect opportunities for yield optimization.</li>
            <li>📉 Identify when liquidity positions fall out of range.</li>
            <li>🎯 Receive personalized DeFi recommendations based on activity and learning level.</li>
          </ul>

          <p className="opacity-80">
            This combination of <strong>education + analytics</strong> transforms <strong>Solates</strong> from a gamified learning hub into a <strong>smart financial companion</strong> — guiding users from their first quest to their first real yield.
          </p>
        </>
      ),
    },
    {
      id: "token",
      title: "The $OLA Token",
      icon: Coins,
      content: (
        <>
          <h3 className="text-xl font-semibold mb-3 text-[#14F195]">
            Overview & Purpose
          </h3>
          <p className="opacity-80 mb-4">
            The <strong>$OLA</strong> token is the core of the Solates economy — a utility,
            governance, and incentive token that powers every user interaction within the
            ecosystem. It represents progress, participation, and ownership, allowing users
            to grow alongside the platform itself.
          </p>
          <p className="opacity-80 mb-4">
            Every action within Solates — learning, completing missions, referring friends,
            or engaging in DeFi — contributes to an evolving experience where users earn,
            spend, and stake $OLA as part of their growth.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-[#14F195]">
            Utilities within Solates
          </h3>
          <ul className="list-disc pl-6 opacity-90 space-y-2 mb-4">
            <li>🎓 <strong>Learn-to-Earn Rewards:</strong> Users earn $OLA by completing quests, missions, and educational challenges.</li>
            <li>💎 <strong>Access to Premium Features:</strong> Advanced tools such as the Mining Hall, strategy analytics, and personalized insights become available to token holders.</li>
            <li>🧭 <strong>Staking & Yield:</strong> $OLA can be staked to earn passive rewards, boost XP, or unlock exclusive DeFi missions.</li>
            <li>👥 <strong>Referral Rewards:</strong> Inviting verified users generates long-term $OLA incentives tied to network growth.</li>
            <li>🗳️ <strong>Governance Participation:</strong> Token holders will influence future updates, protocol integrations, and DAO decisions.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-[#14F195]">
            The Value Loop
          </h3>
          <p className="opacity-80 mb-4">
            $OLA’s design creates a circular economy that connects <strong>education</strong>, <strong>engagement</strong>, and <strong>reward</strong>.
          </p>
          <ul className="list-disc pl-6 opacity-90 space-y-2 mb-4">
            <li>Users learn and complete missions → earning XP and $OLA.</li>
            <li>Holding or staking $OLA grants access to advanced tools and earning opportunities.</li>
            <li>Increased participation fuels ecosystem growth → raising $OLA’s utility and demand.</li>
          </ul>
          <p className="opacity-80 mb-4">
            This feedback loop ensures that as the community learns and interacts more, both user experience and token value evolve together — forming a sustainable incentive model.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-[#14F195]">
            Incentive Mechanics
          </h3>
          <p className="opacity-80 mb-4">
            The $OLA emission structure is tied to user progression and engagement milestones.
            Instead of relying on speculation, rewards are distributed through measurable achievements:
          </p>
          <ul className="list-disc pl-6 opacity-90 space-y-2 mb-4">
            <li>🏆 Completing beginner, intermediate, and advanced quests.</li>
            <li>📅 Maintaining daily check-in streaks.</li>
            <li>🤝 Referring active participants.</li>
            <li>📊 Engaging in DeFi tools within the Solates dashboard.</li>
          </ul>
          <p className="opacity-80 mb-4">
            This ensures that token distribution directly correlates with genuine participation and long-term platform value.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-[#14F195]">
            Future Integrations
          </h3>
          <p className="opacity-80 mb-4">
            The utility of $OLA will extend far beyond learning rewards. Future phases will enable holders to:
          </p>
          <ul className="list-disc pl-6 opacity-90 space-y-2 mb-4">
            <li>💱 Swap and provide liquidity in cross-chain pools integrated via Wormhole or similar bridge technology.</li>
            <li>🌐 Participate in yield strategies, staking vaults, and governance systems that utilize $OLA as collateral or reward.</li>
            <li>📲 Use $OLA directly through a dedicated Solates mobile app, merging education, portfolio management, and DeFi execution into one interface.</li>
          </ul>
          <p className="opacity-80">
            In the long run, $OLA will not just represent participation — it will become the key
            to a unified, cross-chain, and educational DeFi experience under the Solates brand.
          </p>
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
            Early contributors and learners can participate in the <strong>Solates Airdrop Program</strong>,
            designed to reward early adopters who engage with the platform, complete quests, and help expand the community.
          </p>
          <ul className="list-disc pl-6 opacity-90 space-y-2 mb-4">
            <li>🏆 Earn XP and complete quests to qualify.</li>
            <li>👥 Get extra points for verified referrals.</li>
            <li>💰 Unlock higher tiers for bigger airdrop rewards.</li>
          </ul>
          <p className="opacity-80 mb-4">
            All detailed information about the airdrop structure, eligibility, and reward tiers
            can be found in the dedicated{" "}
            <a
              href="/airdrop"
              className="text-[#14F195] hover:underline font-semibold"
            >
              Airdrop section
            </a>{" "}
            of the Solates documentation.
          </p>
          <p className="opacity-70">
            This approach ensures transparency and fairness, allowing every participant to
            understand exactly how to qualify and maximize their rewards.
          </p>
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
            <strong>Solates</strong> is committed to building a balanced and sustainable token
            economy that aligns user participation, education, and long-term growth.
            The <strong>$OLA</strong> token is designed not just as a reward, but as the
            foundation for engagement, governance, and ecosystem expansion.
          </p>

          <p className="opacity-80 mb-4">
            Our goal is to ensure a healthy token distribution model where incentives are tied
            to real activity — learning, completing quests, staking, and contributing to the
            Solates community. This approach encourages meaningful engagement instead of
            speculation, making the entire ecosystem more resilient and purpose-driven.
          </p>

          <p className="opacity-80 mb-4">
            While the full token distribution model is currently being refined, early
            projections outline a transparent and equitable structure focused on rewarding
            the community and supporting continuous development.
          </p>

          <ul className="list-disc pl-6 opacity-90 space-y-2 mb-4">
            <li>💎 <strong>Total Supply:</strong> 100,000,000 $OLA</li>
            <li>🌍 <strong>Community & Airdrops:</strong> 40%</li>
            <li>🔬 <strong>Development & Team:</strong> 25%</li>
            <li>🤝 <strong>Partnerships & Treasury:</strong> 20%</li>
            <li>🔥 <strong>Reserve & Staking Rewards:</strong> 15%</li>
          </ul>

          <p className="opacity-80 mb-4">
            The allocation and emission details will evolve in coordination with ecosystem
            milestones and platform growth. These updates will be made publicly available
            for full transparency.
          </p>

          <p className="opacity-80 mb-4">
            For an updated breakdown, distribution timeline, and the latest details on $OLA’s
            economic design, please visit the dedicated{" "}
            <a
              href="/docs/tokenomics"
              className="text-[#14F195] hover:underline font-semibold"
            >
              Tokenomics section
            </a>{" "}
            of the documentation.
          </p>
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
            <strong>Solates</strong> is more than a platform — it’s a movement.  
            Built on the belief that knowledge and transparency create trust,
            Solates empowers every user to take control of their financial journey,
            transforming education into empowerment and curiosity into growth.
          </p>

          <p className="opacity-80 mb-4">
            As the ecosystem expands, Solates aims to become the leading bridge between
            learning, analytics, and decentralized finance — guiding users from their
            first steps in blockchain to mastering complex investment strategies.
          </p>

          <p className="opacity-80">
            We invite <strong>builders</strong>, <strong>creators</strong>, and <strong>learners</strong> to join us
            in shaping the next wave of decentralized education and finance.
            Together, we are building not just a platform — but a culture of financial
            confidence for the Web3 era.
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
            onClick={() => setActiveSection(activeSection === id ? null : id)}
            className={`p-6 text-left rounded-xl border border-gray-800/50 transition-all backdrop-blur-md bg-[#0b0b0b]/40 hover:border-[#14F195]/40 ${
              activeSection === id
                ? "shadow-[0_0_15px_#14F19540] border-[#14F195]/60"
                : ""
            }`}
          >
            <Icon className="text-[#14F195] mb-3" size={26} />
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-sm text-gray-400">Click to view content</p>
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
