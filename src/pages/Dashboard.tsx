import ProfileSummary from "../components/dashboard/ProfileSummary";
import DailyCheckIn from "../components/DailyCheckIn";
import NextQuest from "../components/dashboard/NextQuest";
import WalletStats from "../components/dashboard/WalletStats";
import LiquidityAlerts from "../components/dashboard/LiquidityAlerts";
import MiningLink from "../components/dashboard/MiningLink";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] px-6 py-8 overflow-hidden">
      {/* Animated Solana-style gradient background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(153,69,255,0.35), transparent 70%), radial-gradient(circle at 80% 80%, rgba(20,241,149,0.25), transparent 60%)",
          animation: "pulseGradient 8s ease-in-out infinite",
        }}
      />

      {/* Animation keyframes inline */}
      <style>
        {`
          @keyframes pulseGradient {
            0%, 100% {
              opacity: 0.35;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.05);
            }
          }
        `}
      </style>

      <div className="relative max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent animate-pulse">
            Solates Dashboard
          </h1>
          <p className="opacity-70 mt-1 text-sm">
            Track your Solana progress, wallet activity, and $OLA ecosystem performance — all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-2">Profile Summary</h2>
              <p className="text-sm opacity-70 mb-3">Your XP, level, and avatar connected to Solates.</p>
              <ProfileSummary />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Next Quest</h2>
              <p className="text-sm opacity-70 mb-3">Continue your journey through the Solana learning path.</p>
              <NextQuest />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Liquidity Alerts</h2>
              <p className="text-sm opacity-70 mb-3">Stay updated on your DeFi positions and out-of-range liquidity pools.</p>
              <LiquidityAlerts />
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            <section>
              <h2 className="text-lg font-semibold mb-2">Daily Check-In</h2>
              <p className="text-sm opacity-70 mb-3">Log in daily to earn +1 XP and keep your streak going.</p>
              <DailyCheckIn />
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Wallet Overview</h2>
              <p className="text-sm opacity-70 mb-3">Manage your Solana wallet and $OLA token balances.</p>
              <WalletStats />
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Mining Access</h2>
              <p className="text-sm opacity-70 mb-3">Unlock the $OLA Mining Hall at 500 XP.</p>
              <MiningLink />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
