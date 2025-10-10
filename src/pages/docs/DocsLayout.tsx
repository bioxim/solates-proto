import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Gift,
  Coins,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ScrollText,
  FileText,
  Rocket,
} from "lucide-react";

export default function DocsLayout() {
  const location = useLocation();

  const navItems = [
    {
      name: "Whitepaper",
      path: "/docs/whitepaper",
      icon: FileText,
    },
    {
      name: "Tokenomics",
      path: "/docs/tokenomics",
      icon: Coins,
    },
    {
      name: "Roadmap",
      path: "/docs/roadmap",
      icon: Rocket,
    },
    {
      name: "Airdrop",
      path: "/docs/airdrop/general",
      icon: BookOpen,
    },
    {
      name: "Airdrop - Point System",
      path: "/docs/airdrop/pointsystem",
      icon: Coins,
    },
    {
      name: "Airdrop - Rewards",
      path: "/docs/airdrop/rewards",
      icon: Gift,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto px-6 py-10 text-gray-200">
      {/* Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="md:w-1/4 space-y-4 border border-gray-800/70 rounded-xl p-6 bg-[#0b0b0b]/50 backdrop-blur-md"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-300">Documentation</h2>
        <nav className="flex flex-col space-y-3">
          {navItems.map(({ name, path, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#14F195]/10 to-[#9945FF]/10 border border-[#14F195]/30 text-[#14F195] shadow-[0_0_10px_#14F19550]"
                    : "hover:bg-[#1a1a1a] text-gray-400 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {name}
              </Link>
            );
          })}
        </nav>
      </motion.aside>

      {/* Main content */}
      <motion.main
        className="md:w-3/4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
}
