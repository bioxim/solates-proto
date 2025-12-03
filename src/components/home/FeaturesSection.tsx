// src/components/home/FeaturesSection.tsx
import { motion } from "framer-motion";
import { Rocket, Coins, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <Rocket size={28} />,
    title: "Learn & Level Up",
    desc: "Complete crypto quests, earn XP, and increase your Solates rank.",
  },
  {
    icon: <Coins size={28} />,
    title: "Stake & Earn",
    desc: "Access staking tools, liquid staking and DeFi learning modules.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "$OLA Platform Access",
    desc: "Unlock the exclusive OLA Platform by accumulating XP.",
  },
];

export default function FeaturesSection() {
  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full mt-10">
      {features.map((f, idx) => (
        <motion.div
          key={idx}
          className="p-6 rounded-2xl border border-slate-700 bg-slate-900/40 backdrop-blur-md shadow-lg hover:shadow-violet-600/20 transition"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
        >
          <div className="flex items-center gap-3 mb-3 text-violet-400">
            {f.icon}
            <h3 className="text-xl font-semibold">{f.title}</h3>
          </div>

          <p className="text-slate-400 text-sm">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
