// src/components/home/SoonBlocks.tsx
import { motion } from "framer-motion";

const blocks = [
  {
    title: "Crypto News Feed",
    desc: "A real-time feed of curated crypto & Web3 updates.",
  },
  {
    title: "Solates Community",
    desc: "Join our exclusive Skool community for discussions, Q&A and growth.",
  },
  {
    title: "Official Partners",
    desc: "More integrations and Web3 partnerships coming soon.",
  },
];

export default function SoonBlocks() {
  return (
    <div className="max-w-5xl w-full mt-20">
      <h2 className="text-3xl text-center font-bold text-slate-200 mb-10">
        Coming Soon
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {blocks.map((b, idx) => (
          <motion.div
            key={idx}
            className="p-6 rounded-xl border border-slate-700 bg-slate-900/30 backdrop-blur-md text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
          >
            <h3 className="text-xl font-semibold mb-2 text-violet-400">
              {b.title}
            </h3>
            <p className="text-slate-400 text-sm">{b.desc}</p>

            <div className="mt-4 text-xs text-violet-500">Soon</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
