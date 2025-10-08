import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("solates_email");
    if (savedEmail) setSubscribed(true);
  }, []);

  const handleSubscribe = () => {
    if (!email) return;
    localStorage.setItem("solates_email", email);
    setSubscribed(true);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-[var(--card)]/60 border border-[var(--primary)]/20 rounded-2xl p-6 shadow-lg backdrop-blur-md text-center"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <Mail className="text-[var(--primary)]" />
          <h2 className="text-xl font-semibold">Subscribe to our Newsletter</h2>
        </div>

        {subscribed ? (
          <p className="text-[var(--primary)] font-semibold">
            You’re subscribed! 🎉 Stay tuned for upcoming updates.
          </p>
        ) : (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full max-w-xs px-3 py-2 rounded-lg bg-[#0c0c0f] text-white border border-[#3b3b4b] focus:outline-none focus:border-[var(--primary)] focus:shadow-[0_0_8px_var(--primary)] placeholder-gray-500 transition-all"
            />
            <button
              onClick={handleSubscribe}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#b14eff] via-[#6c47ff] to-[#00eaff] text-white font-semibold hover:opacity-90 transition-all shadow-md"
            >
              Subscribe
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}
