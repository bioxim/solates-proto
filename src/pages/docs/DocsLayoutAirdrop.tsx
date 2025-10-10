import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Info, Star, Gift } from "lucide-react";

export default function DocsLayoutAirdrop() {
  const location = useLocation();

  const navItems = [
    { name: "General", path: "/docs/airdrop/general", icon: Info },
    { name: "Point System", path: "/docs/airdrop/pointsystem", icon: Star },
    { name: "Rewards", path: "/docs/airdrop/rewards", icon: Gift },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-6 md:px-20 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="md:w-1/4 border border-[var(--card)] rounded-xl p-6 bg-[var(--card)]/40 backdrop-blur-md shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4 text-[#00eaff]">Airdrop Documentation</h2>
          <nav className="flex flex-col space-y-3">
            {navItems.map(({ name, path, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#14F195]/20 to-[#9945FF]/20 border border-[#14F195]/40 text-[#14F195]"
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

        {/* Content */}
        <motion.main
          className="md:w-3/4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}
