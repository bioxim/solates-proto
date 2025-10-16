import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";

interface UserData {
  wallet: string;
  xp: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  joinedAt?: any; // serverTimestamp puede ser Timestamp o undefined
}

export default function Leaderboard() {
  const [users, setUsers] = useState<UserData[]>([]);

  const fetchLeaderboard = async () => {
    try {
      const q = query(collection(db, "users"), orderBy("xp", "desc"), limit(20));
      const snap = await getDocs(q);
      const data = snap.docs.map((doc) => doc.data() as UserData);
      setUsers(data);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
    }
  };

  // 🔹 Primer fetch + refresco cada 24hs
  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 24 * 60 * 60 * 1000); // 24 horas
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Leaderboard
      </h1>

      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                User (Wallet)
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                XP
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Joined
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {users.map((user, index) => (
              <tr
                key={user.wallet || index}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200 font-medium">
                  #{index + 1}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {user.wallet ? `${user.wallet.slice(0, 6)}...${user.wallet.slice(-4)}` : "—"}
                </td>
                <td className="px-6 py-4 text-[var(--primary)] font-semibold">
                  {user.xp ?? 0}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">
                  {user.joinedAt?.toDate
                    ? user.joinedAt.toDate().toLocaleDateString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
