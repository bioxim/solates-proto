/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, Rocket, Brain, Trophy, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import LoginModal from "../components/LoginModal";
import logo from "../assets/logo-tr.png";
import bg from "../assets/solates-bg.mp4";
import dashboard from "../assets/landing-dashboard.png";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleLaunchApp = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#000000] text-white">
      {/* ========== VIDEO BACKGROUND (covers whole hero area) ========== */}
      <style>{`
        @keyframes videoFlow {
          0% { transform: scale(1) translate(0, 0); filter: hue-rotate(0deg); }
          50% { transform: scale(1.04) translate(-2%, -2%); filter: hue-rotate(15deg); }
          100% { transform: scale(1) translate(0, 0); filter: hue-rotate(0deg); }
        }
        .video-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform-origin: center;
          will-change: transform, filter;
          animation: videoFlow 20s ease-in-out infinite alternate;
          filter: blur(24px) brightness(1.05) saturate(120%);
          pointer-events: none;
        }

        /* Overlay tint on top of the video so text keeps good contrast */
        .video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(30,0,62,0.55) 0%, rgba(44,0,110,0.35) 40%, rgba(0,0,0,0.65) 100%);
          pointer-events: none;
        }

        /* Respect reduce-motion */
        @media (prefers-reduced-motion: reduce) {
          .video-bg { animation: none !important; transform: scale(1); }
        }
      `}</style>

      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="video-bg"
          autoPlay
          loop
          muted
          playsInline
          // usar la importación 'bg' como src — Vite manejará la ruta
        >
          <source src={bg} type="video/mp4" />
        </video>

        <div className="video-overlay" />
      </div>

      {/* ========== HERO (whole viewport) ========== */}
      <header className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div
          className="max-w-4xl px-6 md:px-10 pt-6 pb-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="Solates Logo"
              className="w-28 h-20 drop-shadow-[0_0_20px_rgba(108,71,255,0.7)]"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold pb-4 bg-gradient-to-r from-[#b14eff] via-[#00eaff] to-[#ff4ffb] bg-clip-text text-transparent">
            Solates — where your journey into DeFi begins
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            Crypto doesn’t have to be hard. Solates integrates an educational
            system that grows with your blockchain activity — making your time and
            investment in crypto truly worth it.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleLaunchApp}
              className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-[#b14eff] via-[#6c47ff] to-[#00eaff] text-white font-semibold hover:scale-105 transition-transform shadow-lg cursor-pointer"
            >
              Launch App
            </button>
          </div>

          {/* Scroll indicator INSIDE hero (so it stays at the bottom of the hero) */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-300 text-sm"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ↓ Scroll to explore
          </motion.div>
        </motion.div>
      </header>

      {/* ========== MAIN CONTENT (Sections 2 & 3 & 4) ========== */}
      <main className="relative z-10">
        
        {/* SECTION 2 */}
        
        <section className="bg-[var(--bg)] text-[var(--text)] relative py-24 px-6 md:px-20 overflow-hidden">
          <motion.h2
            className="text-center text-3xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-[#b14eff] via-[#00eaff] to-[#ff4ffb] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Solates is the best way to invest in crypto — from beginners to experts
          </motion.h2>

          <div className="grid md:grid-cols-3 items-center gap-10 md:gap-16">
            {/* Left Column */}
            <div className="flex flex-col items-end text-right space-y-10">
              {[
                { icon: Brain, title: "Learn by Doing", desc: "Master DeFi concepts through real blockchain actions." },
                { icon: Wallet, title: "Wallet Mastery", desc: "Get comfortable managing your crypto safely." },
                { icon: Rocket, title: "Airdrop Missions", desc: "Complete quests and earn early rewards." },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={i}
                  className="max-w-xs"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-end mb-2 text-[#b14eff] dark:text-[#00eaff]">
                    <Icon className="w-6 h-6 mr-2" />
                    <h3 className="font-semibold text-lg">{title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Center Image */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src={dashboard}
                alt="Solates Dashboard Preview"
                className="rounded-2xl shadow-[0_0_40px_rgba(108,71,255,0.4)] w-[90%] md:w-[110%] hover:scale-105 transition-transform"
              />
            </motion.div>

            {/* Right Column */}
            <div className="flex flex-col items-start text-left space-y-10">
              {[
                { icon: Trophy, title: "Earn $OLA", desc: "Convert your learning and activity into token rewards." },
                { icon: BarChart3, title: "Track Your Progress", desc: "Monitor your skills and wallet stats in real time." },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={i}
                  className="max-w-xs"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-2 text-[#b14eff] dark:text-[#00eaff]">
                    <Icon className="w-6 h-6 mr-2" />
                    <h3 className="font-semibold text-lg">{title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 (Road to $OLA) */}
        
        <section className="relative py-28 px-6 md:px-16 overflow-hidden bg-gradient-to-b from-[#0b021a] via-[#110030] to-[#000000] text-center text-white">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="animate-pulse-slow absolute top-10 left-1/4 w-72 h-72 bg-[#b14eff33] rounded-full blur-3xl"></div>
            <div className="animate-float absolute bottom-10 right-1/4 w-72 h-72 bg-[#00eaff33] rounded-full blur-3xl"></div>
          </div>

          <motion.div
            className="relative z-10 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#b14eff] via-[#00eaff] to-[#ff4ffb] bg-clip-text text-transparent">
              Road to $OLA
            </h2>

            <p className="text-gray-300 text-lg md:text-xl mb-8">
              Join the Solates Early Access — start your journey, complete missions, and earn your future $OLA tokens.
              <br />Each step brings you closer to the DeFi ecosystem of Solana.
            </p>

            <div className="relative flex flex-col items-center space-y-6 md:space-y-2">
              {[
                { title: "Start", desc: "Sign up and verify your Solana wallet." },
                { title: "Engage", desc: "Complete learning quests to earn points." },
                { title: "Collect", desc: "Turn progress into $OLA token rewards." },
                { title: "Expand", desc: "Use $OLA across the Solates DeFi ecosystem." },
              ].map((layer, index) => (
                <motion.div
                  key={index}
                  className="relative w-[90%] md:w-[60%] bg-[var(--card)] rounded-2xl p-6 shadow-[0_0_40px_rgba(108,71,255,0.25)] border border-[#2e1a52] hover:scale-105 transition-transform backdrop-blur-sm"
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.3 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold text-[#b14eff] mb-2">{layer.title}</h3>
                  <p className="text-gray-400">{layer.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        
        {/* ====== SECTION 4 — SOLATES TOOLS / JOIN ====== */}
        <style>{`
          @keyframes floatUpDown {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }

          @keyframes pulseGlow {
            0% { box-shadow: 0 0 15px rgba(108,71,255,0.2); border-color: rgba(177,78,255,0.25); }
            50% { box-shadow: 0 0 25px rgba(0,234,255,0.45); border-color: rgba(0,234,255,0.5); }
            100% { box-shadow: 0 0 15px rgba(108,71,255,0.2); border-color: rgba(177,78,255,0.25); }
          }

          .tool-card {
            background: linear-gradient(180deg, rgba(177,78,255,0.15) 0%, rgba(0,234,255,0.08) 100%);
            border: 1px solid rgba(108,71,255,0.25);
            transition: all 0.3s ease;
            cursor: pointer;
            animation: pulseGlow 6s ease-in-out infinite;
          }

          .tool-card:hover {
            transform: translateY(-6px) scale(1.03);
            box-shadow: 0 0 35px rgba(108,71,255,0.6);
            border-color: rgba(0,234,255,0.6);
          }

          .join-banner {
            background: radial-gradient(circle at center, rgba(177,78,255,0.25), rgba(0,0,0,0.9));
            border-top: 1px solid rgba(177,78,255,0.3);
          }
        `}</style>

        <section className="relative py-28 px-6 md:px-20 text-center bg-[#0b021a] text-white overflow-hidden">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-[#b14eff] via-[#00eaff] to-[#ff4ffb] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Tools for the New DeFi Era
          </motion.h2>

          <motion.p
            className="text-gray-300 text-lg md:text-xl mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Solates integrates a powerful suite of tools to guide you through DeFi,  
            helping you learn, track and grow your portfolio effortlessly.
          </motion.p>

          {/* Grid de cuadrantes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
            {[
              { title: "Quests", desc: "Complete guided missions that reward you in $OLA as you master DeFi." },
              { title: "DeFi Alerts", desc: "Monitor liquidity positions, price ranges and yields in real time." },
              { title: "Airdrop Hub", desc: "Track new airdrops and optimize your eligibility across protocols." },
              { title: "Portfolio Tracker", desc: "View and analyze all your wallet positions in one clear dashboard." },
              { title: "Learning Paths", desc: "Structured educational journeys to level up your crypto knowledge." },
              { title: "Analytics", desc: "Get performance insights and stats powered by Solates Engine." },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="tool-card rounded-2xl p-6 md:p-8 text-left hover:bg-opacity-80 backdrop-blur-sm"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-3 text-[#b14eff]">{item.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Banner final “Join Now” */}
          <motion.div
            className="join-banner mt-28 py-16 rounded-3xl flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <img
              src={logo}
              alt="Solates Logo"
              className="w-28 h-20 mb-6 animate-[floatUpDown_4s_ease-in-out_infinite]"
            />
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#b14eff] via-[#00eaff] to-[#ff4ffb] bg-clip-text text-transparent">
              Join Solates Now
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-xl">
              Be part of the next wave of DeFi learners, earn $OLA, and grow with the ecosystem.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#b14eff] via-[#6c47ff] to-[#00eaff] text-white font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              Get Started
            </button>
          </motion.div>
        </section>

      </main>

      {/* LOGIN MODAL */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}
