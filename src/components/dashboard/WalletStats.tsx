/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { Connection, PublicKey } from "@solana/web3.js";
import { db, auth } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function WalletStats() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [sol, setSol] = useState<number>(0);
  const [snug, setSnug] = useState<number | null>(null);
  const [solChange, setSolChange] = useState<number>(0);
  const [snugChange, setSnugChange] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  const warnedInvalidRef = useRef(false);

  const connection = new Connection("https://api.devnet.solana.com");
  const SNUG_MINT = "HPMrB43LBUnzVNfyeaVZC28kau19MHmxdepTnLqCKopx";

  // --- detectar usuario y asociar wallet por uid ---
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setWallet(null);
        setUserId(null);
        return;
      }

      setUserId(user.uid);
      const storageKey = `solates_wallet_${user.uid}`;
      let stored = localStorage.getItem(storageKey);

      // si no hay wallet guardada, buscar en Firestore
      if (!stored) {
        try {
          const userRef = doc(db, "users", user.uid);
          const snap = await getDoc(userRef);
          if (snap.exists()) {
            const data = snap.data();
            if (data && typeof data.wallet === "string") {
              stored = data.wallet;
              localStorage.setItem(storageKey, stored);
            }
          }
        } catch (err) {
          console.error("Error reading user wallet from Firestore:", err);
        }
      }

      // validar formato de la wallet
      if (stored) {
        if (stored.includes("...") || stored.trim().length === 0) {
          localStorage.removeItem(storageKey);
          setWallet(null);
          if (!warnedInvalidRef.current) {
            console.warn("Invalid wallet format removed from localStorage.");
            warnedInvalidRef.current = true;
          }
          return;
        }

        try {
          new PublicKey(stored);
          setWallet(stored);
        } catch {
          localStorage.removeItem(storageKey);
          setWallet(null);
          if (!warnedInvalidRef.current) {
            console.warn("Invalid wallet address detected and cleared:", stored);
            warnedInvalidRef.current = true;
          }
        }
      } else {
        setWallet(null);
      }
    });

    return () => unsub();
  }, []);

  // --- fetch balances seguro ---
  useEffect(() => {
    if (!wallet) {
      setSol(0);
      setSnug(null);
      return;
    }

    let pubkey: PublicKey;
    try {
      pubkey = new PublicKey(wallet);
    } catch {
      console.warn("Invalid wallet (caught at fetch):", wallet);
      if (userId) localStorage.removeItem(`solates_wallet_${userId}`);
      setWallet(null);
      return;
    }

    let active = true;

    const fetchBalances = async () => {
      try {
        const lamports = await connection.getBalance(pubkey);
        if (!active) return;
        setSol(lamports / 1e9);

        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(pubkey, {
          programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
        });

        if (!active) return;

        const snugAcc = tokenAccounts.value.find(
          (a) => a.account.data.parsed?.info?.mint === SNUG_MINT
        );

        if (snugAcc) {
          const amount = snugAcc.account.data.parsed.info.tokenAmount.uiAmount ?? 0;
          setSnug(amount);
        } else {
          setSnug(0);
        }

        setSolChange((Math.random() - 0.5) * 0.02);
        setSnugChange((Math.random() - 0.5) * 0.5);
      } catch (err) {
        console.error("Error fetching balances:", err);
      }
    };

    fetchBalances();
    const interval = setInterval(fetchBalances, 20000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [wallet, userId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--card)]/50 p-5 rounded-2xl border border-[var(--card)] shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <CreditCard /> Wallet Overview
        </h3>
        <div className="text-xs opacity-70">
          {wallet ? "Connected" : "Not connected"}
        </div>
      </div>

      {!wallet ? (
        <div className="text-sm text-gray-400">
          <p>No wallet associated yet or the stored wallet was invalid.</p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => navigate("/profile")}
              className="px-3 py-1 rounded-md bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 text-sm"
            >
              Go to Profile to link wallet
            </button>
            <button
              onClick={() => {
                if (userId) {
                  localStorage.removeItem(`solates_wallet_${userId}`);
                }
                setWallet(null);
              }}
              className="px-3 py-1 rounded-md bg-gray-800 text-sm"
            >
              Clear local wallet
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* SOL */}
          <div className="flex justify-between items-center">
            <div className="text-sm opacity-80">SOL balance</div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{sol.toFixed(4)} SOL</span>
              {solChange >= 0 ? (
                <TrendingUp size={14} className="text-green-400" />
              ) : (
                <TrendingDown size={14} className="text-red-400" />
              )}
            </div>
          </div>

          {/* SNUG */}
          {snug !== null && (
            <div className="flex justify-between items-center">
              <div className="text-sm opacity-80">$SNUG balance</div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{snug.toFixed(2)} SNUG</span>
                {snugChange >= 0 ? (
                  <TrendingUp size={14} className="text-green-400" />
                ) : (
                  <TrendingDown size={14} className="text-red-400" />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
