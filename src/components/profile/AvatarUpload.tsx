import { motion } from "framer-motion";
import { Upload } from "lucide-react";

interface AvatarUploadProps {
  completed: boolean;
  onComplete: () => void;
}

export default function AvatarUpload({ completed, onComplete }: AvatarUploadProps) {
  return (
    <motion.div className="bg-[var(--card)]/50 p-6 rounded-2xl border border-[var(--card)] backdrop-blur-md shadow-lg flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <Upload className="text-[var(--primary)]" />
        <h2 className="font-semibold text-lg">Upload Your Avatar</h2>
      </div>
      <p className="text-sm opacity-70">Upload a custom image or NFT PFP.</p>
      {!completed ? (
        <button
          onClick={onComplete}
          className="px-5 py-2 bg-[var(--primary)] text-white rounded-lg font-semibold hover:opacity-90 transition"
        >
          Upload
        </button>
      ) : (
        <p className="text-[var(--primary)] font-semibold">✅ +10 points earned!</p>
      )}
    </motion.div>
  );
}
