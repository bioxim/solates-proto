import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo-tr.png";

type LoginModalProps = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: LoginModalProps) {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25 }}
          className="bg-[var(--bg)] text-[var(--text)] rounded-2xl shadow-xl w-[400px] max-w-[90%] p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center">
            <img src={logo} alt="Solates logo" className="w-20 mb-6" />
            <h2 className="text-sm mb-3 opacity-80 uppercase tracking-wide">
              log in with
            </h2>

            <button
              onClick={handleLogin}
              className="w-full mt-3 flex items-center justify-center gap-3 px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
              <span className="font-medium text-[var(--text)]">Google</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
