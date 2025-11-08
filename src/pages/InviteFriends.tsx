/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gift, UserPlus, Clipboard } from "lucide-react";
import {
  auth,
  addUserXP,
  addReferralCode,
  updateReferralCode,
  handleReferralUsage,
  db,
} from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { 
  getDocs, 
  collection, 
  query,
  doc,
  getDoc, 
  where 
} from "firebase/firestore";
import Newsletter from "../components/newsletter/Newsletter";

interface ReferralCode {
  code: string;
  status: "unused" | "pending" | "completed";
}

export default function InviteFriends() {
  const [user, setUser] = useState<any>(null);
  const [codes, setCodes] = useState<ReferralCode[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [referralInput, setReferralInput] = useState("");
  const [userReferredBy, setUserReferredBy] = useState<string | null>(null);
  const [referrerName, setReferrerName] = useState<string | null>(null);

  // Detectar usuario logueado
  // Detectar usuario logueado y cargar el estado del referido
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      
      // Si el usuario está logueado
      if (u?.uid) {
        await loadUserCodes(u.uid);

        try {
          const userDocRef = doc(db, "users", u.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          let referrerId: string | null = null;
          
          // Comprobación defensiva:
          if (userDocSnap.exists() && userDocSnap.data().referredBy) {
              // Si existe y el campo referredBy no es nulo/undefined
              referrerId = userDocSnap.data().referredBy as string;
          }
          
          if (referrerId) {
            // El usuario FUE referido
            setUserReferredBy(referrerId);
            const name = await fetchReferrerName(referrerId);
            setReferrerName(name);
          } else {
            // El usuario NO FUE referido (o el documento no existe)
            // ¡IMPORTANTE! Restablecer el estado explícitamente a NULL
            setUserReferredBy(null); 
            setReferrerName(null);
          }

        } catch (err) {
          console.error("Error loading user profile data:", err);
          // Si hay un error, dejamos que el usuario intente agregar un código
          setUserReferredBy(null);
          setReferrerName(null);
        }

      } else {
        // Usuario desconectado
        setCodes([]);
        setUserReferredBy(null);
        setReferrerName(null);
      }
    });
    return () => unsub();
  }, []); // Dependencias: [] para que solo corra al montar

  const fetchReferrerName = async (referrerId: string): Promise<string> => {
    try {
      const userDocRef = doc(db, "users", referrerId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        // Prioriza el displayName, si no existe, usa el email como fallback
        return userData.displayName || userData.email || "un amigo";
      }
    } catch (err) {
      console.error("Error fetching referrer name:", err);
    }
    return "un amigo"; // Fallback genérico
  };

  const loadUserCodes = async (uid: string) => {
    try {
      const codesRef = collection(db, "users", uid, "referralCodes");
      const snapshot = await getDocs(codesRef);
      setCodes(snapshot.docs.map((d) => d.data() as ReferralCode));
    } catch (err) {
      console.error("Error loading referral codes:", err);
    }
  };

  const generateCode = async () => {
    if (!user?.uid || codes.length >= 5) return;
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    try {
      await addReferralCode(user.uid, newCode);
      setCodes((prev) => [...prev, { code: newCode, status: "unused" }]);
    } catch (err) {
      console.error("Error generating referral code:", err);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Usar código de referido
  const handleUseReferral = async () => {
    if (!referralInput || !user?.uid) return;
    if (userReferredBy) {
      alert("⚠️ You already used a referral code.");
      return;
    }

    try {
      // Esta función ahora te devuelve el ID o null
      const referrerId = await handleReferralUsage(user.uid, referralInput);

      // 👇 LÓGICA MODIFICADA
      if (referrerId) {
        setUserReferredBy(referrerId); // Guarda el ID
        const name = await fetchReferrerName(referrerId); // Busca el nombre
        setReferrerName(name); // Guarda el nombre

        // Refrescar los códigos (esto está bien)
        if (referrerId === user.uid) await loadUserCodes(user.uid);
      }
      // --- FIN DEL CAMBIO ---
      
    } catch (err) {
      console.error("Error using referral code:", err);
      alert("❌ An unexpected error occurred.");
    }
  };
  const totalCompleted = codes.filter((c) => c.status === "completed").length;
  const totalPoints = totalCompleted * 100;

  return (
    <div className="main-content flex flex-col items-center justify-center min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full space-y-10 text-center"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex justify-center items-center gap-2">
            <Gift className="text-[var(--primary)]" /> Invite Friends
          </h1>
          <p className="opacity-80">
            Invite up to <strong>5 friends</strong> and earn <strong>100 XP</strong> when they join Solates using your referral code.
          </p>
          <p className="font-semibold mt-2 text-[var(--primary)]">
            Total Referral Points: {totalPoints}
          </p>
        </div>

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

            <div className="w-full mt-6 space-y-3">
              {codes.length === 0 && (
                <p className="text-sm opacity-60 italic">
                  No referral codes yet.
                </p>
              )}

              {codes.map((ref) => (
                <div
                  key={ref.code}
                  className={`flex justify-between items-center rounded-lg p-3 border transition-all ${
                    ref.status === "completed"
                      ? "border-[var(--primary)]/60 bg-[var(--primary)]/10"
                      : ref.status === "pending"
                      ? "border-yellow-400/50 bg-yellow-400/10"
                      : "border-[var(--card)]"
                  }`}
                >
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-[var(--primary)]">
                      {ref.code}
                    </span>
                    <span
                      className={`text-xs ${
                        ref.status === "completed"
                          ? "text-[var(--primary)] font-semibold"
                          : ref.status === "pending"
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                    >
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 👉 Nueva sección: agregar código */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">Add a Referral Code</h2>
          {userReferredBy ? ( // Solo si el ID del referente es truthy (no null)
            <p className="text-green-400">
              You were referred by <strong>{referrerName || "un amigo"}</strong> 🎉
            </p>
          ) : (
            <div className="flex gap-2 justify-center">
              <input
                type="text"
                value={referralInput}
                onChange={(e) => setReferralInput(e.target.value.toUpperCase())}
                placeholder="Enter referral code"
                className="px-3 py-2 rounded-lg bg-gray-800 text-white w-40 text-center"
              />
              <button
                onClick={handleUseReferral}
                className="px-4 py-2 bg-[var(--primary)] hover:opacity-90 rounded-lg text-white font-semibold"
              >
                Submit
              </button>
            </div>
          )}
        </div>

        <Newsletter />
      </motion.div>
    </div>
  );
}
