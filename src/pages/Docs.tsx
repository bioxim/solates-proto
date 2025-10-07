import { motion } from "framer-motion";
import { FileText, Rocket, Coins, Map } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Docs() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Whitepaper",
      desc: "Understand the full vision behind Solates — from design principles to token structure.",
      icon: <FileText className="w-10 h-10 text-[#b14eff]" />,
      path: "/docs/whitepaper",
    },
    {
      title: "Tokenomics",
      desc: "Explore $OLA token distribution, pre-mining structure, staking and long-term incentives.",
      icon: <Coins className="w-10 h-10 text-[#00eaff]" />,
      path: "/docs/tokenomics",
    },
    {
      title: "Roadmap",
      desc: "Follow Solates’ development milestones and upcoming DeFi integrations.",
      icon: <Map className="w-10 h-10 text-[#ff4ffb]" />,
      path: "/docs/roadmap",
    },
    {
      title: "Airdrop",
      desc: "Learn how to join, earn points, and unlock early access to the $OLA ecosystem.",
      icon: <Rocket className="w-10 h-10 text-[#6c47ff]" />,
      path: "/docs/airdrop/general",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B021A] via-[#110030] to-[#000000] text-white py-24 px-6 md:px-20 text-center">
      <motion.h1
        className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-[#b14eff] via-[#00eaff] to-[#ff4ffb] bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Solates Documentation
      </motion.h1>

      <motion.p
        className="text-gray-300 max-w-3xl mx-auto mb-16 text-lg leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Learn everything about Solates — the DeFi learning ecosystem built on Solana.  
        Explore our documentation and get ready to earn $OLA.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {sections.map((section, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-[var(--card)]/60 backdrop-blur-xl rounded-2xl p-6 w-full max-w-xs text-left border border-[#2e1a52] shadow-[0_0_20px_rgba(108,71,255,0.25)] cursor-pointer hover:border-[#00eaff] transition-all"
            onClick={() => navigate(section.path)}
          >
            <div className="flex items-center space-x-4 mb-4">
              {section.icon}
              <h2 className="text-xl font-semibold">{section.title}</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {section.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
