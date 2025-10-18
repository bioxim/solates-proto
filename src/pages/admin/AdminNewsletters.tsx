import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import LeftSidebar from "../../components/admin/LeftSidebar";

interface Newsletter {
  id: string;
  email: string;
  verified: boolean;
  createdAt?: { seconds: number; nanoseconds: number };
}

export default function AdminNewsletter() {
  const [emails, setEmails] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const ref = collection(db, "newsletter");
        const q = query(ref, orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Newsletter[];
        setEmails(data);
      } catch (err) {
        console.error("Error cargando newsletter:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmails();
  }, []);

  return (
    <div className="flex">
      <LeftSidebar />
      <main className="ml-60 mr-16 p-6 flex-1 min-h-screen bg-[#0a0a0a] text-white">
        <h1 className="text-2xl font-bold mb-6 text-[var(--primary)]">
          Suscripciones al Newsletter
        </h1>

        {loading ? (
          <p className="text-gray-400">Cargando suscriptores...</p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-lg bg-[#111] p-4 border border-gray-800">
            <table className="min-w-full text-sm">
              <thead className="bg-[#1a1a1a] text-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Verificado</th>
                  <th className="px-4 py-3 text-left">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {emails.map((e) => (
                  <tr
                    key={e.id}
                    className="border-b border-gray-800 hover:bg-[#1e1e1e] transition"
                  >
                    <td className="px-4 py-3 text-gray-300">{e.email}</td>
                    <td className="px-4 py-3">
                      {e.verified ? (
                        <span className="text-green-400 font-semibold">✔</span>
                      ) : (
                        <span className="text-red-400 font-semibold">✖</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {e.createdAt
                        ? new Date(e.createdAt.seconds * 1000).toLocaleString()
                        : "—"}
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
