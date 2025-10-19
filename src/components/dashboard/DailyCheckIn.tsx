import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { auth, db, addUserXP } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function DailyCheckIn() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [streak, setStreak] = useState(0);
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false); // ✅ evita doble click

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setUid(user ? user.uid : null));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!uid) return;

    const fetchCheckIn = async () => {
      const today = new Date().toDateString();
      const userCheckRef = doc(db, "users", uid, "dailyCheckIn", "current");

      try {
        const snap = await getDoc(userCheckRef);
        if (snap.exists()) {
          const data = snap.data();
          const lastCheck = data?.lastCheck || "";
          const currentStreak = data?.streak || 0;

          if (lastCheck === today) setCheckedIn(true);
          setStreak(currentStreak);
        }
      } catch (err) {
        console.error("Error fetching daily check-in:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckIn();
  }, [uid]);

  const handleCheckIn = async () => {
    if (!uid || processing) return; // ✅ no hacer nada si ya se está procesando
    setProcessing(true);

    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const userCheckRef = doc(db, "users", uid, "dailyCheckIn", "current");

    try {
      const snap = await getDoc(userCheckRef);
      let newStreak = 1;

      if (snap.exists()) {
        const data = snap.data();
        const lastCheck = data?.lastCheck || "";
        const currentStreak = data?.streak || 0;

        if (lastCheck === today) {
          // ya checkeó hoy, no sumar XP
          setCheckedIn(true);
          setProcessing(false);
          return;
        }

        newStreak = lastCheck === yesterday ? currentStreak + 1 : 1;
      }

      // guardamos en Firebase
      await setDoc(userCheckRef, {
        lastCheck: today,
        streak: newStreak,
      });

      // sumamos XP solo si no checkeó hoy
      await addUserXP(uid, 1);

      setStreak(newStreak);
      setCheckedIn(true);
    } catch (err) {
      console.error("Error on daily check-in:", err);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <p className="text-gray-400">Loading...</p>;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-[var(--card)]/50 border border-[var(--card)] rounded-2xl p-4 text-center shadow-md"
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <CalendarCheck className="text-[var(--primary)]" />
        <h3 className="font-semibold">Daily Check-in</h3>
      </div>

      {checkedIn ? (
        <p className="text-[var(--primary)] font-semibold">✅ Checked in today!</p>
      ) : (
        <button
          onClick={handleCheckIn}
          disabled={processing} // ✅ deshabilita mientras se procesa
          className="px-4 py-1 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 transition disabled:opacity-50"
        >
          Check In (+1 XP)
        </button>
      )}

      <p className="text-sm opacity-70 mt-2">
        Current Streak: <strong>{streak}</strong> days
      </p>
    </motion.div>
  );
}
