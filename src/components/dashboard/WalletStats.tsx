import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, ExternalLink, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

export default function WalletStats() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [ola, setOla] = useState<number>(0);
  const [sol, setSol] = useState<number>(0);
  const [olaChange, setOlaChange] = useState<number>(0);
  const [solChange, setSolChange] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const w = localStorage.getItem("solates_wallet_address");
    const olaSaved = localStorage.getItem("solates_ola_balance");
    const solSaved = localStorage.getItem("solates_sol_balance");

    setWallet(w);
    setOla(olaSaved ? Number(olaSaved) : 45.2);
    setSol(solSaved ? Number(solSaved) : 0.84);
  }, []);

  // 🔹 Simular fluctuaciones cada 10s
  useEffect(() => {
    if (!wallet) return;
    const interval = setInterval(() => {
      const olaDelta = (Math.random() - 0.5) * 1.2;
      const solDelta = (Math.random() - 0.5) * 0.03;
      setOla((prev) => Math.max(0, prev + olaDelta));
      setSol((prev) => Math.max(0, prev + solDelta));
      setOlaChange(olaDelta);
      setSolChange(solDelta);
    }, 10000);
    return () => clearInterval(interval);
  }, [wallet]);

  const connectMock = () => {
    const mockAddr = "Fz1a...MockSolAddr";
    localStorage.setItem("solates_wallet_address", mockAddr);
    localStorage.setItem("solates_ola_balance", "72.4");
    localStorage.setItem("solates_sol_balance", "1.23");
    setWallet(mockAddr);
    setOla(72.4);
    setSol(1.23);
  };

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

      {wallet ? (
        <motion.div
          key={wallet}
          animate={{ opacity: [0.9, 1], scale: [0.99, 1] }}
          transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
          className="space-y-3"
        >
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

          {/* OLA */}
          <div className="flex justify-between items-center">
            <div className="text-sm opacity-80">$OLA balance</div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{ola.toFixed(2)} OLA</span>
              {olaChange >= 0 ? (
                <TrendingUp size={14} className="text-green-400" />
              ) : (
                <TrendingDown size={14} className="text-red-400" />
              )}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => navigate("/portfolio")}
              className="px-3 py-1 rounded-md bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 text-sm"
            >
              Portfolio
            </button>
            <a
              href={`https://explorer.solana.com/address/${wallet}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-sm flex items-center gap-2"
            >
              <ExternalLink size={14} /> View on Solana Explorer
            </a>
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-sm opacity-70">
            Connect a Solana wallet to show on-chain balances and alerts.
          </p>
          <div className="flex gap-2">
            <button
              onClick={connectMock}
              className="px-3 py-2 rounded-md bg-[var(--primary)] text-white font-semibold"
            >
              Connect Phantom (mock)
            </button>
            <button
              onClick={() => navigate("/wallets")}
              className="px-3 py-2 rounded-md bg-gray-800"
            >
              Manage wallets
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
