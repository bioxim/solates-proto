// src/components/admin/LeftSidebar.tsx
import { NavLink } from "react-router-dom";
import { Book, Users, Mail, Settings, Home } from "lucide-react";

const links = [
  { to: "/admin", label: "Dashboard", icon: Home },
  { to: "/admin/quests", label: "Quests", icon: Book },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function LeftSidebar() {
  return (
    <aside className="main-content w-60 min-h-screen bg-[#0d0d0d] border-r border-gray-800 flex flex-col p-4 space-y-2 fixed left-0 top-0">
      <h2 className="text-xl font-semibold text-[var(--primary)] mb-4">Admin</h2>
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-[var(--primary)] text-black font-semibold" : "text-gray-300 hover:bg-gray-800"
            }`
          }
        >
          <Icon className="w-5 h-5" />
          {label}
        </NavLink>
      ))}
    </aside>
  );
}
