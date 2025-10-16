import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  X as Twitter,
  MessageCircle,
  Gamepad2 as Discord,
  Mail,
  Wallet,
  Trophy,
  ArrowRightCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { updateUserProfile } from "../firebase";

export default function Profile() {
  const navigate = useNavigate();
  const { connected, publicKey } = useWallet();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [tasks, setTasks] = useState({
    avatar: false,
    socials: { twitter: false, telegram: false, discord: false },
    email: false,
    wallet: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userPosition, setUserPosition] = useState<number>(0);

  // --- Detectar usuario autenticado ---
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // --- Cargar progreso local ---
  useEffect(() => {
    const saved = localStorage.getItem("solates_profile_progress");
    if (saved) {
      const parsed = JSON.parse(saved);
      setXp(parsed.xp || 0);
      setLevel(parsed.level || 1);
      setTasks(parsed.tasks || tasks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Guardar progreso en localStorage ---
  useEffect(() => {
    localStorage.setItem(
      "solates_profile_progress",
      JSON.stringify({ xp, level, tasks })
    );
  }, [xp, level, tasks]);

  // --- Leaderboard mock ---
  useEffect(() => {
    const mock = Array.from({ length: 20 }).map((_, i) => ({
      name: `User${i + 1}`,
      xp: Math.floor(Math.random() * 900 + 100),
    }));
    const user = { name: "bioxin.eth", xp };
    const fullBoard = [...mock, user].sort((a, b) => b.xp - a.xp);
    setLeaderboard(fullBoard.slice(0, 20));
    setUserPosition(fullBoard.findIndex((u) => u.name === "bioxin.eth") + 1);
  }, [xp]);

  // --- Manejar tareas completadas ---
  const handleComplete = (type: string, sub?: string) => {
    setXp((prev) => prev + 10);
    if (type === "avatar") setTasks((t) => ({ ...t, avatar: true }));
    if (type === "email") setTasks((t) => ({ ...t, email: true }));
    if (type === "wallet") setTasks((t) => ({ ...t, wallet: true }));
    if (type === "social" && sub)
      setTasks((t) => ({
        ...t,
        socials: { ...t.socials, [sub]: true },
      }));
  };

  // --- Escucha conexión de wallet ---
  useEffect(() => {
  if (connected && publicKey) {
    const alreadyConnected = localStorage.getItem("walletConnectedOnce");

    // 🚫 Evita sumar XP si ya se registró antes
    if (!tasks.wallet && !alreadyConnected) {
      handleComplete("wallet");
      localStorage.setItem("walletConnectedOnce", "true");
      console.log("Wallet connected for the first time:", publicKey.toBase58());
    } else {
      console.log("Wallet already registered, no XP added:", publicKey.toBase58());
    }
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [connected, publicKey]);



  // --- Calcular nivel ---
  useEffect(() => {
    setLevel(1 + Math.floor(xp / 100));
  }, [xp]);

  // --- Guardar XP y nivel en Firestore ---
  useEffect(() => {
    if (user?.uid) {
      updateUserProfile(user.uid, { xp, level });
    }
  }, [xp, level, user]);

  const getProgress = () => xp % 100;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="opacity-70 mt-1">
            Complete your profile to earn rewards and climb the leaderboard.
          </p>
        </div>

        {/* Avatar Upload */}
        <motion.div className="bg-[var(--card)]/50 p-6 rounded-2xl border border-[var(--card)] backdrop-blur-md shadow-lg flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <Upload className="text-[var(--primary)]" />
            <h2 className="font-semibold text-lg">Upload Your Avatar</h2>
          </div>
          <p className="text-sm opacity-70">Upload a custom image or NFT PFP.</p>
          {!tasks.avatar ? (
            <button
              onClick={() => handleComplete("avatar")}
              className="px-5 py-2 bg-[var(--primary)] text-white rounded-lg font-semibold hover:opacity-90 transition"
            >
              Upload
            </button>
          ) : (
            <p className="text-[var(--primary)] font-semibold">
              ✅ +10 points earned!
            </p>
          )}
        </motion.div>

        {/* Connect Your Socials */}
        <motion.div className="bg-[var(--card)]/50 p-6 rounded-2xl border border-[var(--card)] backdrop-blur-md shadow-lg">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Trophy className="text-[var(--primary)]" /> Connect Your Socials
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { name: "Twitter", icon: <Twitter />, key: "twitter" },
              { name: "Telegram", icon: <MessageCircle />, key: "telegram" },
              { name: "Discord", icon: <Discord />, key: "discord" },
            ].map((s) => (
              <button
                key={s.key}
                onClick={() => handleComplete("social", s.key)}
                disabled={tasks.socials[s.key as keyof typeof tasks.socials]}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                  tasks.socials[s.key as keyof typeof tasks.socials]
                    ? "bg-green-700/30 text-green-400 cursor-default"
                    : "bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 text-[var(--primary)]"
                }`}
              >
                {s.icon}{" "}
                {tasks.socials[s.key as keyof typeof tasks.socials]
                  ? "Connected"
                  : `Connect ${s.name}`}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Verify Email */}
        <motion.div className="bg-[var(--card)]/50 p-6 rounded-2xl border border-[var(--card)] backdrop-blur-md shadow-lg text-center">
          <h2 className="font-semibold text-lg mb-3 flex justify-center items-center gap-2">
            <Mail className="text-[var(--primary)]" /> Verify Your Email
          </h2>
          {!tasks.email ? (
            <button
              onClick={() => handleComplete("email")}
              className="px-5 py-2 bg-[var(--primary)] text-white rounded-lg font-semibold hover:opacity-90 transition"
            >
              Verify Email
            </button>
          ) : (
            <p className="text-[var(--primary)] font-semibold">
              ✅ Verified (+10 points)
            </p>
          )}
        </motion.div>

        {/* Add a Wallet (REAL CONNECTION) */}
        <motion.div className="bg-[var(--card)]/50 p-6 rounded-2xl border border-[var(--card)] backdrop-blur-md shadow-lg text-center">
          <h2 className="font-semibold text-lg mb-3 flex justify-center items-center gap-2">
            <Wallet className="text-[var(--primary)]" /> Add a Wallet
          </h2>

          {!connected ? (
            <WalletMultiButton className="!bg-[var(--primary)] !text-white !rounded-lg !font-semibold hover:opacity-90 transition !px-5 !py-2" />
          ) : (
            <p className="text-[var(--primary)] font-semibold">
              ✅ Wallet Connected ({publicKey?.toBase58().slice(0, 4)}...
              {publicKey?.toBase58().slice(-4)}) +10 XP
            </p>
          )}
        </motion.div>

        {/* Level & Progress */}
        <motion.div className="bg-[var(--card)]/50 p-6 rounded-2xl border border-[var(--card)] backdrop-blur-md shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Trophy className="text-[var(--primary)]" /> Level & Progress
            </h2>
            <button
              onClick={() => navigate("/docs/airdrop/pointsystem")}
              className="text-[var(--primary)] flex items-center gap-1 text-sm hover:underline"
            >
              How to level up? <ArrowRightCircle size={14} />
            </button>
          </div>

          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden mt-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getProgress()}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-gradient-to-r from-[#b14eff] to-[#00eaff]"
            />
          </div>
          <p className="text-sm opacity-80 mt-2 text-center">
            Level {level} — {xp} XP
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
