import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import LeftSidebar from "../../components/admin/LeftSidebar";

interface User {
  id: string;
  displayName: string;
  email: string;
  role: string;
  level: number;
  xp: number;
  wallet: string;
  joinedAt?: { seconds: number; nanoseconds: number };
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const ref = collection(db, "users");
        const q = query(ref, orderBy("joinedAt", "desc"));
        const snap = await getDocs(q);
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as User[];
        setUsers(data);
      } catch (err) {
        console.error("Error cargando usuarios:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex">
      <LeftSidebar />
      <main className="ml-60 mr-16 p-6 flex-1 min-h-screen bg-[#0a0a0a] text-white">
        <h1 className="text-2xl font-bold mb-6 text-[var(--primary)]">
          Panel de Usuarios
        </h1>

        {loading ? (
          <p className="text-gray-400">Cargando usuarios...</p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-lg bg-[#111] p-4 border border-gray-800">
            <table className="min-w-full text-sm">
              <thead className="bg-[#1a1a1a] text-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left">Nombre</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Rol</th>
                  <th className="px-4 py-3 text-left">Nivel</th>
                  <th className="px-4 py-3 text-left">XP</th>
                  <th className="px-4 py-3 text-left">Wallet</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-gray-800 hover:bg-[#1e1e1e] transition"
                  >
                    <td className="px-4 py-3">{u.displayName || "—"}</td>
                    <td className="px-4 py-3 text-gray-400">{u.email}</td>
                    <td className="px-4 py-3 capitalize">{u.role}</td>
                    <td className="px-4 py-3">{u.level}</td>
                    <td className="px-4 py-3">{u.xp}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs break-all">
                      {u.wallet}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
