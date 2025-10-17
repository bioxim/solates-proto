/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Wallet, Trophy, ArrowRightCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateUserProfile } from "../firebase";
import { getRankInfo } from "../utils/levelSystem";

import { Buffer } from "buffer";
window.Buffer = Buffer;

import AvatarUpload from "../components/profile/AvatarUpload";
import SocialConnect from "../components/profile/SocialConnect";
import EmailVerify from "../components/profile/EmailVerify";

export default function Profile() {
  const navigate = useNavigate();
  //const { connected, publicKey, disconnect } = useWallet();
  const { connected, publicKey, signMessage, disconnect } = useWallet();

  const [user, setUser] = useState<any>(null);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [tasks, setTasks] = useState({
    avatar: false,
    socials: { twitter: false, telegram: false, discord: false },
    email: false,
    wallet: false,
  });
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletConflict, setWalletConflict] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [userPosition, setUserPosition] = useState<number>(0);

  const hasLoadedRef = useRef(false);

  // --- Evitar reconexión automática del adaptador ---
  useEffect(() => {
    localStorage.removeItem("walletName");
  }, []);

  // --- Cargar datos del usuario desde Firestore ---
  const loadUserFromFirestore = async (uid: string) => {
    try {
      const userRef = doc(db, "users", uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        setXp(0);
        setLevel(1);
        setTasks({
          avatar: false,
          socials: { twitter: false, telegram: false, discord: false },
          email: false,
          wallet: false,
        });
        setWalletAddress(null);
        hasLoadedRef.current = true;
        return;
      }

      const data = snap.data();
      setXp(data.xp ?? 0);
      setLevel(data.level ?? 1);
      setTasks({
        avatar: data.tasks?.avatar ?? false,
        socials: data.tasks?.socials ?? { twitter: false, telegram: false, discord: false },
        email: data.tasks?.email ?? false,
        wallet: !!data.wallet,
      });

      if (data.wallet) {
        const walletRef = doc(db, "wallets", data.wallet);
        const walletSnap = await getDoc(walletRef);

        if (!walletSnap.exists() || walletSnap.data().userId !== uid) {
          await updateUserProfile(uid, { wallet: null });
          setWalletAddress(null);
        } else {
          setWalletAddress(data.wallet);
        }
      } else {
        setWalletAddress(null);
      }

      hasLoadedRef.current = true;
    } catch (err) {
      console.error("Error loading user:", err);
    }
  };

  // --- Detectar usuario autenticado ---
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u?.uid) {
        await loadUserFromFirestore(u.uid);
      } else {
        setXp(0);
        setLevel(1);
        setTasks({
          avatar: false,
          socials: { twitter: false, telegram: false, discord: false },
          email: false,
          wallet: false,
        });
        setWalletAddress(null);
        hasLoadedRef.current = false;
      }
    });
    return () => unsub();
  }, []);

  // --- Actualizar XP, level y tasks en Firestore ---
  useEffect(() => {
    if (!user?.uid || !hasLoadedRef.current) return;
    updateUserProfile(user.uid, { xp, level, tasks });
  }, [xp, level, tasks, user]);

  // --- Vincular wallet única ---
  // --- Vincular wallet única (con firma de consentimiento) ---
const linkWallet = async () => {
  if (!user?.uid || !connected || !publicKey) {
    console.warn("No user / wallet connected");
    return;
  }

  // Preparar mensaje humano que el usuario firmará
  const walletBase58 = publicKey.toBase58();
  const timestamp = new Date().toISOString();
  const messageText = `🔹 Solates – Wallet Linking Request

    You are signing this message to confirm that you own the wallet below 
    and agree to link it to your Solates account.

    This signature:
    - Does NOT cost any gas or fees.
    - Does NOT perform any blockchain transaction.
    - Is only used for account verification.

    Wallet Address: ${walletBase58}
    User ID: ${user.uid}
    Timestamp: ${timestamp}
    Nonce: ${Math.random().toString(36).slice(2, 10)}

    By signing, you authorize Solates to link this wallet to your profile.`;

    try {
      // Verificar que el adapter soporte signMessage
      if (typeof signMessage !== "function") {
        alert("Este wallet no soporta firma de mensajes. Usá Phantom o Backpack para firmar y asociar la wallet.");
        return;
      }

      // Convertir message a Uint8Array y pedir firma
      const encoded = new TextEncoder().encode(messageText);
      const signed = await signMessage(encoded); // devuelve Uint8Array
      const signatureBase64 = Buffer.from(signed).toString("base64");

      // Guardar en Firestore: wallet doc con signature y en el perfil del usuario
      const walletRef = doc(db, "wallets", walletBase58);
      await setDoc(walletRef, {
        userId: user.uid,
        message: messageText,
        signature: signatureBase64,
        signedAt: timestamp,
      }, { merge: true });

      await updateUserProfile(user.uid, { wallet: walletBase58 });

      setWalletAddress(walletBase58);
      setTasks((prev) => ({ ...prev, wallet: true }));
      setXp((prev) => prev + 10);
      setWalletConflict(false);

    } catch (err: any) {
      console.error("Error linking wallet (signature flow):", err);
      // Mensaje claro al usuario
      alert("No se pudo firmar/guardar la asociación. Revisá permisos en tu wallet y volvé a intentar.");
    }
  };


  // --- Nivel automático ---
  useEffect(() => {
    setLevel(1 + Math.floor(xp / 100));
  }, [xp]);

  // --- Leaderboard simulado ---
  useEffect(() => {
    const mock = Array.from({ length: 20 }).map((_, i) => ({
      name: `User${i + 1}`,
      xp: Math.floor(Math.random() * 900 + 100),
    }));
    const currentUser = { name: user?.email || "Unknown", xp };
    const fullBoard = [...mock, currentUser].sort((a, b) => b.xp - a.xp);
    setLeaderboard(fullBoard.slice(0, 20));
    setUserPosition(fullBoard.findIndex((u) => u.name === (user?.email || "Unknown")) + 1);
  }, [xp, user]);

  const handleComplete = (type: string, sub?: string) => {
    setXp((prev) => prev + 10);
    if (type === "avatar") setTasks((t) => ({ ...t, avatar: true }));
    if (type === "email") setTasks((t) => ({ ...t, email: true }));
    if (type === "wallet") setTasks((t) => ({ ...t, wallet: true }));
    if (type === "social" && sub)
      setTasks((t) => ({ ...t, socials: { ...t.socials, [sub]: true } }));
  };

  const getProgress = () => xp % 100;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="opacity-70 mt-1">
            Complete your profile to earn rewards and climb the leaderboard.
          </p>
        </div>

        <AvatarUpload completed={tasks.avatar} onComplete={() => handleComplete("avatar")} user={user} />

        <SocialConnect tasks={tasks.socials} onComplete={handleComplete} />

        <EmailVerify completed={tasks.email} onComplete={() => handleComplete("email")} />

        {/* --- WALLET --- */}
        <motion.div className="bg-[var(--card)]/50 p-6 rounded-2xl border border-[var(--card)] backdrop-blur-md shadow-lg text-center">
          <h2 className="font-semibold text-lg mb-3 flex justify-center items-center gap-2">
            <Wallet className="text-[var(--primary)]" /> Wallet
          </h2>

          {!connected ? (
            <WalletMultiButton
              className="!bg-[var(--primary)] !text-white !rounded-lg !font-semibold hover:opacity-90 transition !px-5 !py-2"
              onClick={() => {
                localStorage.removeItem("walletName");
              }}
            />
          ) : walletConflict ? (
            <p className="text-yellow-400 font-semibold">
              ⚠️ Wallet already linked to another account
            </p>
          ) : walletAddress ? (
            <p className="text-[var(--primary)] font-semibold">
              ✅ Linked ({walletAddress.slice(0, 4)}...{walletAddress.slice(-4)})
            </p>
          ) : (
            <button
              onClick={linkWallet}
              className="!bg-[var(--primary)] !text-white !rounded-lg !font-semibold hover:opacity-90 transition !px-5 !py-2"
            >
              Connect Wallet
            </button>
          )}
        </motion.div>

        {/* --- XP & LEVEL --- */}
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
          <p className="text-xs opacity-70 mt-1 text-center">
            Rank: {getRankInfo(xp).rank}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
