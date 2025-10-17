// src/pages/Admin.tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { ShieldCheck, Book, Users, Mail, Settings } from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const ADMIN_EMAIL = "mariaximenacamino@gmail.com";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/");
      else if (user.email !== ADMIN_EMAIL) {
        alert("Access denied");
        navigate("/");
      } else setUserEmail(user.email);
    });
    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sections = [
    { title: "Quests", icon: Book, path: "/admin/quests", color: "from-emerald-500 to-green-600" },
    { title: "Users", icon: Users, path: "/admin/users", color: "from-blue-500 to-indigo-600" },
    { title: "Newsletter", icon: Mail, path: "/admin/newsletter", color: "from-pink-500 to-rose-600" },
    { title: "Settings", icon: Settings, path: "/admin/settings", color: "from-yellow-500 to-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-white p-10 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full"
      >
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold flex items-center gap-3 text-[var(--primary)]">
            <ShieldCheck className="w-7 h-7" />
            Admin Dashboard
          </h1>
          {userEmail && (
            <p className="text-sm opacity-70">Logged as {userEmail}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((s) => (
            <motion.div
              key={s.title}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(s.path)}
              className={`cursor-pointer bg-gradient-to-br ${s.color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition flex flex-col items-center justify-center`}
            >
              <s.icon className="w-10 h-10 mb-3" />
              <h2 className="text-lg font-semibold">{s.title}</h2>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
