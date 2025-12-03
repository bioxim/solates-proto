// src/components/home/HeroSection.tsx
import { motion } from "framer-motion";
import logo from "../../assets/logo-tr.png";
import { auth } from "../../firebase";

export default function HeroSection({ onOpenLoginModal }: { onOpenLoginModal: () => void }) {
  
  const handleClick = () => {
    const user = auth.currentUser;

    if (user) {
      window.open("https://solates-mining.vercel.app/", "_blank");
    } else {
      onOpenLoginModal();
    }
  };

  return (
    <div className="w-full max-w-4xl text-center relative mt-10 mb-24">

      {/* Glow de fondo */}
      <div className="absolute inset-0 blur-[120px] bg-gradient-to-r from-violet-600/30 to-cyan-400/30 -z-10" />

      <motion.img
        src={logo}
        alt="Solates"
        className="w-32 mx-auto mb-6 drop-shadow-[0_0_20px_rgba(120,0,255,0.4)]"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />

      <motion.h1
        className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Level Up Your Crypto Journey
      </motion.h1>

      <motion.p
        className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Earn XP, unlock rankings, and access the Solates Platform while learning DeFi, staking, and real crypto skills.
      </motion.p>

      {/* CTA */}
      <motion.button
        onClick={handleClick}
        className="inline-block mt-8 px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 transition font-semibold shadow-lg shadow-violet-500/20"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Start Your Journey
      </motion.button>
    </div>
  );
}
