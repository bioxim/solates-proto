// src/pages/Admin.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
import { ShieldCheck, Trash2 } from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Solo este mail puede acceder
  const ADMIN_EMAIL = "mariaximenacamino@gmail.com";

  // Verifica sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/"); // Si no hay usuario logueado
      } else if (user.email !== ADMIN_EMAIL) {
        alert("Access denied");
        navigate("/");
      } else {
        setUserEmail(user.email);
        fetchSubscribers();
      }
    });

    return () => unsubscribe();
  }, []);

  // Carga los suscriptores
  const fetchSubscribers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "newsletter"));
      const subs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubscribers(subs);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-[var(--card)]/60 border border-[var(--primary)]/20 rounded-2xl p-6 shadow-xl backdrop-blur-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-[var(--primary)] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[var(--primary)]" />
            Admin Panel
          </h1>
          {userEmail && (
            <p className="text-sm opacity-70">Logged as {userEmail}</p>
          )}
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Loading subscribers...</p>
        ) : subscribers.length === 0 ? (
          <p className="text-center text-gray-400">No subscribers yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-700 rounded-xl">
              <thead className="bg-[#111] text-[var(--primary)]">
                <tr>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Created At</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr
                    key={sub.id}
                    className="border-t border-gray-700 hover:bg-[#191919] transition"
                  >
                    <td className="p-3">{sub.email}</td>
                    <td className="p-3">
                      {sub.createdAt?.seconds
                        ? new Date(sub.createdAt.seconds * 1000).toLocaleString()
                        : "—"}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => alert("Delete feature coming soon")}
                        className="text-red-400 hover:text-red-600 transition"
                      >
                        <Trash2 className="inline w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
