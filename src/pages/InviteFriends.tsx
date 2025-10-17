/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/InviteFriends.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gift, UserPlus, Clipboard } from "lucide-react";
import { auth, addUserXP, addReferralCode, updateReferralCode, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import Newsletter from "../components/Newsletter";

interface ReferralCode {
  code: string;
  status: "unused" | "pending" | "completed";
}

export default function InviteFriends() {
  const [user, setUser] = useState<any>(null);
  const [codes, setCodes] = useState<ReferralCode[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // --- Detectar usuario autenticado ---
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u?.uid) {
        await loadUserCodes(u.uid);
      } else {
        setCodes([]);
      }
    });
    return () => unsub();
  }, []);

  // --- Cargar códigos desde Firestore ---
  const loadUserCodes = async (uid: string) => {
    try {
      const codesRef = collection(db, "users", uid, "referralCodes");
      const snapshot = await getDocs(codesRef);
      const loaded: ReferralCode[] = snapshot.docs.map((doc) => doc.data() as ReferralCode);
      setCodes(loaded);
    } catch (err) {
      console.error("Error loading referral codes:", err);
    }
  };

  // --- Generar un nuevo código ---
  const generateCode = async () => {
    if (!user?.uid || codes.length >= 5) return;

    const newCode: ReferralCode = {
      code: Math.random().toString(36).substring(2, 8).toUpperCase(),
      status: "unused",
    };

    try {
      // Guardar en Firestore
      await addReferralCode(user.uid, newCode.code);
      setCodes((prev) => [...prev, newCode]);
    } catch (err) {
      console.error("Error saving new referral code:", err);
    }
  };

  // --- Copiar código ---
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // --- Simular referido completado ---
  const simulateCompletion = async (index: number) => {
    if (!user?.uid) return;
    const ref = codes[index];
    if (ref.status === "completed") return;

    try {
      // Actualizar estado en Firestore
      await updateReferralCode(user.uid, ref.code, "completed");

      // Sumar 100 XP al usuario
      await addUserXP(user.uid, 100);
      alert("🎉 You earned 100 XP for this referral!");

      // Actualizar estado local
      setCodes((prev) =>
        prev.map((c, i) =>
          i === index ? { ...c, status: "completed" } : c
        )
      );
    } catch (err) {
      console.error("Error completing referral:", err);
    }
  };

  const totalCompleted = codes.filter((c) => c.status === "completed").length;
  const totalPoints = totalCompleted * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full space-y-10 text-center"
      >
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex justify-center items-center gap-2">
            <Gift className="text-[var(--primary)]" /> Invite Friends
          </h1>
          <p className="opacity-80">
            Invite up to <strong>5 friends</strong> and earn <strong>100 XP</strong> each when they complete 5 quests and setup their profile.
          </p>
          <p className="font-semibold mt-2 text-[var(--primary)]">
            Total Referral Points: {totalPoints}
          </p>
        </div>

        {/* Referral Codes Section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-[var(--card)]/50 border border-[var(--card)] rounded-2xl p-6 shadow-lg backdrop-blur-md"
        >
          <div className="flex flex-col gap-4 items-center">
            <div className="flex items-center gap-2">
              <UserPlus className="text-[var(--primary)]" />
              <h2 className="text-xl font-semibold">Your Referral Codes</h2>
            </div>

            <p className="text-sm opacity-70">
              {codes.length < 5
                ? `Generate up to ${5 - codes.length} more codes.`
                : "Maximum of 5 codes reached."}
            </p>

            <button
              onClick={generateCode}
              disabled={codes.length >= 5}
              className={`mt-2 px-6 py-2 rounded-lg font-semibold transition ${
                codes.length >= 5
                  ? "bg-gray-600 cursor-not-allowed text-gray-300"
                  : "bg-[var(--primary)] hover:opacity-90 text-white"
              }`}
            >
              {codes.length >= 5 ? "Limit Reached" : "Generate Code"}
            </button>

            {/* Referral List */}
            <div className="w-full mt-6 space-y-3">
              {codes.length === 0 && (
                <p className="text-sm opacity-60 italic">No referral codes yet.</p>
              )}

              {codes.map((ref, i) => (
                <div
                  key={ref.code}
                  className={`flex justify-between items-center rounded-lg p-3 border transition-all
                    ${
                      ref.status === "completed"
                        ? "border-[var(--primary)]/60 bg-[var(--primary)]/10"
                        : ref.status === "pending"
                        ? "border-yellow-400/50 bg-yellow-400/10"
                        : "border-[var(--card)]"
                    }`}
                >
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-[var(--primary)]">{ref.code}</span>
                    <span className={`text-xs ${
                      ref.status === "completed"
                        ? "text-[var(--primary)] font-semibold"
                        : ref.status === "pending"
                        ? "text-yellow-400"
                        : "text-gray-400"
                    }`}>
                      {ref.status === "completed"
                        ? "Completed ✅"
                        : ref.status === "pending"
                        ? "Pending..."
                        : "Not used"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => copyCode(ref.code)}
                      className="px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-sm flex items-center gap-1"
                    >
                      <Clipboard size={14} />
                      {copiedCode === ref.code ? "Copied!" : "Copy"}
                    </button>
                    {ref.status !== "completed" && (
                      <button
                        onClick={() => simulateCompletion(i)}
                        className="px-3 py-1 rounded-md bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 text-xs"
                      >
                        Simulate
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <Newsletter />
      </motion.div>
    </div>
  );
}
