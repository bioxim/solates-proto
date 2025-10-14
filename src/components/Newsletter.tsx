// src/components/Newsletter.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { registerAndSendVerification, listenForEmailVerification } from "../firebase";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("solates_email");
    if (savedEmail) setStatus("success");
    // Iniciar el listener
    listenForEmailVerification();
  }, []);

  const validateEmail = (value: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

  const handleSubscribe = async () => {
    if (!validateEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      await registerAndSendVerification(email);
      localStorage.setItem("solates_email", email);
      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error("Error subscribing:", err);
      setErrorMsg("Could not send verification email. Please try again.");
      setStatus("error");
    }
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

        {status === "success" ? (
          <p className="text-[var(--primary)] font-semibold">
            A verification email was sent to your inbox. 📩
            <br />
            Please confirm it to complete your subscription.
          </p>
        ) : (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className={`w-full max-w-xs px-3 py-2 rounded-lg bg-[#0c0c0f] text-white border 
                ${status === "error" ? "border-red-500" : "border-[#3b3b4b]"} 
                focus:outline-none focus:border-[var(--primary)] 
                focus:shadow-[0_0_8px_var(--primary)] placeholder-gray-500 transition-all`}
            />

            {status === "error" && (
              <p className="text-red-400 text-sm">{errorMsg}</p>
            )}

            <button
              onClick={handleSubscribe}
              disabled={status === "loading"}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#b14eff] via-[#6c47ff] to-[#00eaff] 
                text-white font-semibold hover:opacity-90 transition-all shadow-md disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Subscribe"}
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}
