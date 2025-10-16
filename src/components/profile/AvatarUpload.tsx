import { useState, useEffect, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";

interface AvatarUploadProps {
  completed: boolean;
  onComplete: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

export default function AvatarUpload({ completed, onComplete, user }: AvatarUploadProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // 🔹 Cargar avatar desde localStorage
  useEffect(() => {
    const savedAvatar = localStorage.getItem(`avatar_${user?.uid}`);
    if (savedAvatar) setAvatarUrl(savedAvatar);
  }, [user]);

  // 🖼️ Guardar avatar localmente (base64)
  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      localStorage.setItem(`avatar_${user?.uid}`, base64);
      setAvatarUrl(base64);
      if (!completed) onComplete(); // ✅ Sumar XP solo la primera vez
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div className="bg-[var(--card)]/50 p-6 rounded-2xl border border-[var(--card)] backdrop-blur-md shadow-lg flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <Upload className="text-[var(--primary)]" />
        <h2 className="font-semibold text-lg">Upload Your Avatar</h2>
      </div>
      <p className="text-sm opacity-70">Upload a custom image (.png or .jpg)</p>

      {avatarUrl && (
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover border-2 border-[var(--primary)] shadow-md"
        />
      )}

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
        <p className="text-[var(--primary)] font-semibold">✅ +10 XP earned!</p>
      )}
    </motion.div>
  );
}
