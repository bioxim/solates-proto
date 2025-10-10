import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

type AlertState = {
  outOfRange: number; // how many pools out of range
  details?: string;
};

export default function LiquidityAlerts() {
  const [alerts, setAlerts] = useState<AlertState | null>(null);

  useEffect(() => {
    // read mocked alerts or set default for demo
    const raw = localStorage.getItem("solates_liquidity_alerts");
    if (raw) {
      try {
        setAlerts(JSON.parse(raw));
        return;
      } catch { /* empty */ }
    }

    // default demo: 1 pool out of range
    setAlerts({ outOfRange: 1, details: "USDC/OLA pool on Raydium left the range." });
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-[var(--card)]/50 p-4 rounded-2xl border border-[var(--card)] shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold flex items-center gap-2"><AlertTriangle /> Liquidity Alerts</h3>
      </div>

      {alerts && alerts.outOfRange > 0 ? (
        <div className="flex items-start gap-3">
          <div className="text-yellow-400">
            <AlertTriangle />
          </div>
          <div>
            <div className="font-semibold text-sm">{alerts.outOfRange} position(s) out of range</div>
            <div className="text-xs opacity-75 mt-1">{alerts.details}</div>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1 rounded-md bg-yellow-500/20 hover:bg-yellow-500/30 text-xs">View positions</button>
              <button className="px-3 py-1 rounded-md bg-gray-800 text-xs">Ignore</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 text-green-400">
          <CheckCircle />
          <div>
            <div className="font-semibold">All positions healthy</div>
            <div className="text-xs opacity-70">No liquidity alerts at the moment.</div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
