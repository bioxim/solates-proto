import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gift, UserPlus, Clipboard } from "lucide-react";
import Newsletter from "../components/Newsletter";

interface ReferralCode {
  code: string;
  status: "unused" | "pending" | "completed";
}

export default function InviteFriends() {
  const [codes, setCodes] = useState<ReferralCode[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Load referral codes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("solates_referral_codes");
    if (saved) {
      setCodes(JSON.parse(saved));
    }
  }, []);

  // Save whenever codes change
  useEffect(() => {
    localStorage.setItem("solates_referral_codes", JSON.stringify(codes));
  }, [codes]);

  // Generate up to 5 codes
  const generateCode = () => {
    if (codes.length >= 5) return;
    const newCode = {
      code: Math.random().toString(36).substring(2, 8).toUpperCase(),
      status: "unused" as const,
    };
    setCodes((prev) => [...prev, newCode]);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Simulate that a referred user completed 5 quests and profile (for demo)
  const simulateCompletion = (index: number) => {
    setCodes((prev) =>
      prev.map((c, i) =>
        i === index ? { ...c, status: "completed" } : c
      )
    );
  };

  const totalCompleted = codes.filter((c) => c.status === "completed").length;
  const totalPoints = totalCompleted * 100; // 100 points per completed referral

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
            Invite up to <strong>5 friends</strong> to join{" "}
            <span className="text-[var(--primary)] font-semibold">Solates</span>{" "}
            and earn <strong>100 points</strong> for each one who completes at
            least <strong>5 quests</strong> and their <strong>profile setup</strong>.
          </p>
        </div>

        {/* Referral Section */}
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
                : "You’ve reached the maximum of 5 codes."}
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
                <p className="text-sm opacity-60 italic">
                  No referral codes yet.
                </p>
              )}

              {codes.map((ref, i) => (
                <div
                  key={ref.code}
                  className={`flex justify-between items-center rounded-lg p-3 border ${
                    ref.status === "completed"
                      ? "border-[var(--primary)]/60 bg-[var(--primary)]/10"
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
                          ? "text-[var(--primary)]"
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
                      className="px-2 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-sm flex items-center gap-1"
                    >
                      <Clipboard size={14} />
                      {copiedCode === ref.code ? "Copied!" : "Copy"}
                    </button>
                    {ref.status !== "completed" && (
                      <button
                        onClick={() => simulateCompletion(i)}
                        className="px-2 py-1 rounded-md bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 text-xs"
                      >
                        Simulate
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm opacity-70 mt-4">
              <strong>{totalPoints}</strong> total referral points earned.
            </p>
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <Newsletter />
      </motion.div>
    </div>
  );
}
