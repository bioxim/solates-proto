import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";

export default function DailyCheckIn() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastCheck = localStorage.getItem("solates_last_checkin");
    const savedStreak = Number(localStorage.getItem("solates_streak") || 0);

    if (lastCheck === today) {
      setCheckedIn(true);
      setStreak(savedStreak);
    } else {
      setCheckedIn(false);
    }
  }, []);

  const handleCheckIn = () => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const lastCheck = localStorage.getItem("solates_last_checkin");
    let newStreak = streak;

    if (lastCheck === yesterday) newStreak += 1;
    else newStreak = 1;

    localStorage.setItem("solates_last_checkin", today);
    localStorage.setItem("solates_streak", newStreak.toString());
    setStreak(newStreak);
    setCheckedIn(true);

    // Bonus: could trigger +1 XP update here
  };

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
          className="px-4 py-1 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 transition"
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
