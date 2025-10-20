import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

type PoolAlert = {
  protocol: string;
  pair: string;
  status: "healthy" | "outOfRange";
  details: string;
};

export default function LiquidityAlerts() {
  const [pools, setPools] = useState<PoolAlert[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("solates_liquidity_pools");
    if (stored) {
      try {
        setPools(JSON.parse(stored));
        return;
      } catch {/* empty */}
    }

    // 🔹 Simulación de pools
    const demoPools: PoolAlert[] = [
      { protocol: "Raydium", pair: "USDC/OLA", status: "outOfRange", details: "Price drifted -12% from midpoint." },
      { protocol: "Orca", pair: "SOL/USDC", status: "healthy", details: "Within target range." },
      { protocol: "Meteora", pair: "mSOL/SOL", status: "healthy", details: "Stable APR at 9.3%." },
    ];
    setPools(demoPools);
    localStorage.setItem("solates_liquidity_pools", JSON.stringify(demoPools));
  }, []);

  const refreshAlerts = () => {
    setPools((prev) =>
      prev.map((p) =>
        Math.random() > 0.7
          ? { ...p, status: "outOfRange", details: "Temporary range deviation detected." }
          : { ...p, status: "healthy", details: "Back within range." }
      )
    );
  };

  const outOfRangeCount = pools.filter((p) => p.status === "outOfRange").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--card)]/50 p-5 rounded-2xl border border-[var(--card)] shadow-lg"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle /> Liquidity Alerts
        </h3>
        <button
          onClick={refreshAlerts}
          className="text-xs flex items-center gap-1 opacity-70 hover:opacity-100"
        >
          <RefreshCcw size={12} /> Refresh
        </button>
      </div>

      {pools.map((pool, i) => (
        <motion.div
          key={i}
          className={`flex items-start gap-3 mb-3 p-3 rounded-lg ${
            pool.status === "outOfRange"
              ? "bg-yellow-500/10 border border-yellow-500/30"
              : "bg-green-500/10 border border-green-500/20"
          }`}
          animate={
            pool.status === "outOfRange"
              ? { opacity: [1, 0.6, 1] }
              : { opacity: 1 }
          }
          transition={
            pool.status === "outOfRange"
              ? { repeat: Infinity, duration: 2 }
              : {}
          }
        >
          {pool.status === "outOfRange" ? (
            <AlertTriangle className="text-yellow-400 mt-1" />
          ) : (
            <CheckCircle className="text-green-400 mt-1" />
          )}
          <div>
            <div className="font-semibold text-sm">
              {pool.protocol}: {pool.pair}
            </div>
            <div className="text-xs opacity-75">{pool.details}</div>
          </div>
        </motion.div>
      ))}

      {outOfRangeCount === 0 && (
        <div className="flex items-center gap-3 text-green-400 mt-3">
          <CheckCircle />
          <div>
            <div className="font-semibold">All positions healthy</div>
            <div className="text-xs opacity-70">
              No liquidity alerts at the moment.
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
