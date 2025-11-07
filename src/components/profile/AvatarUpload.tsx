import { useState, useEffect, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Upload, User } from "lucide-react";

interface AvatarUploadProps {
  completed: boolean;
  onComplete: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any; // Firebase user
}

export default function AvatarUpload({ completed, onComplete, user }: AvatarUploadProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // 🧩 Cargar avatar desde localStorage al montar o cambiar de usuario
  useEffect(() => {
    if (user?.uid) {
      const savedAvatar = localStorage.getItem(`avatar_${user.uid}`);
      if (savedAvatar) {
        setAvatarUrl(savedAvatar);
      } else {
        setAvatarUrl(null);
      }
    }
  }, [user?.uid]);

  // 🖼️ Subir y guardar avatar (base64)
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      localStorage.setItem(`avatar_${user?.uid}`, base64);
      // 🔔 Notificar al navbar del cambio
      window.dispatchEvent(new CustomEvent("avatarUpdated", { detail: { uid: user?.uid } }));
      setAvatarUrl(base64);

      if (!completed) onComplete(); // ✅ Sumar XP solo la primera vez
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      className="bg-[var(--card)]/50 p-6 rounded-2xl border border-[var(--card)] backdrop-blur-md shadow-lg flex flex-col items-center gap-4"
    >
      <div className="flex items-center gap-2">
        <Upload className="text-[var(--primary)]" />
        <h2 className="font-semibold text-lg">Upload Your Avatar</h2>
      </div>

      <p className="text-sm opacity-70 mb-2">
        Upload a custom image (.png or .jpg)
      </p>

      {/* 🖼️ Mostrar avatar o ícono por defecto */}
      <div className="relative">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-[var(--primary)] shadow-md"
          />
        ) : (
          <div className="w-24 h-24 rounded-full border-2 border-[var(--card)] flex items-center justify-center bg-[var(--bg)]">
            <User className="text-[var(--primary)] opacity-60" size={40} />
          </div>
        )}
      </div>

      {/* 📤 Botón o mensaje */}
      {!completed ? (
        <label className="px-5 py-2 bg-[var(--primary)] text-white rounded-lg font-semibold hover:opacity-90 transition cursor-pointer">
          Upload
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </label>
      ) : (
        <p className="text-[var(--primary)] font-semibold mt-2">
          ✅ +10 XP earned!
        </p>
      )}
    </motion.div>
  );
}
