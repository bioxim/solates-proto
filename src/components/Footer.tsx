import { Github, X, Gamepad2, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-[5] w-full py-8 text-center border-t border-[var(--card)] bg-[var(--bg)] text-[var(--text-secondary)]">
      <style>{`
        .neon-icon {
          transition: all 0.3s ease;
          filter: drop-shadow(0 0 0px transparent);
        }
        .neon-icon:hover {
          transform: scale(1.15);
          filter: drop-shadow(0 0 10px #b14eff)
                  drop-shadow(0 0 20px #00eaff)
                  drop-shadow(0 0 30px #ff4ffb);
        }

        @keyframes neonPulse {
          0%, 100% {
            filter: drop-shadow(0 0 6px #b14eff)
                    drop-shadow(0 0 10px #00eaff);
          }
          50% {
            filter: drop-shadow(0 0 15px #ff4ffb)
                    drop-shadow(0 0 25px #00eaff);
          }
        }

        .neon-icon svg {
          animation: neonPulse 3s ease-in-out infinite;
        }
      `}</style>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <span className="text-sm opacity-80">© 2025 Solates</span>

        <div className="flex items-center gap-6">
          <a
            href="https://discord.gg/your-invite"
            target="_blank"
            rel="noreferrer"
            className="neon-icon"
          >
            <Gamepad2 className="w-6 h-6 text-[#00eaff]" />
          </a>

          <a
            href="https://x.com/SolatesDefi"
            target="_blank"
            rel="noreferrer"
            className="neon-icon"
          >
            <X className="w-6 h-6 text-[#b14eff]" />
          </a>

          <a
            href="https://github.com/bioxim/solates-proto"
            target="_blank"
            rel="noreferrer"
            className="neon-icon"
          >
            <Github className="w-6 h-6 text-[#ff4ffb]" />
          </a>

          {/* Línea divisoria sutil */}
          <div className="h-6 w-px bg-gray-600/40 mx-2"></div>

          {/* Enlace al PDF */}
          <a
            href="/Solates_Technical_Documentation_v1.0.pdf"
            target="_blank"
            rel="noreferrer"
            className="neon-icon"
            title="View Technical Documentation"
          >
            <FileText className="w-6 h-6 text-[#00eaff]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
