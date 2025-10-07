import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

export default function DocsLayout() {
  const links = [
    { name: "General", path: "/docs/airdrop/general" },
    { name: "Point System", path: "/docs/airdrop/pointsystem" },
    { name: "Rewards", path: "/docs/airdrop/rewards" },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col md:flex-row">
      {/* ===== SIDEBAR ===== */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="md:w-64 w-full border-b md:border-b-0 md:border-r border-[var(--card)] bg-[var(--bg)]/70 backdrop-blur-lg p-6 sticky top-0 z-20"
      >
        <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-[#b14eff] via-[#00eaff] to-[#ff4ffb] bg-clip-text text-transparent">
          Airdrop Docs
        </h2>

        <nav className="flex md:flex-col flex-row md:space-y-4 space-x-6 md:space-x-0">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `transition-all text-sm font-medium ${
                  isActive
                    ? "text-[#00eaff] border-b-2 md:border-b-0 md:border-l-4 border-[#00eaff] pl-2"
                    : "text-gray-400 hover:text-[#b14eff]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </motion.aside>

      {/* ===== CONTENT AREA ===== */}
      <motion.main
        className="flex-1 overflow-y-auto p-6 md:p-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
}
