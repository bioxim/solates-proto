import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ agregamos useNavigate
import { db, addUserXP } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ArrowLeft } from "lucide-react"; // ✅ icono de back

interface Quest {
  id: string;
  title: string;
  description: string;
  reward: number;
  contentUrl?: string;
  imageUrl?: string;
  questions?: { q: string; options: string[]; answer: number }[];
}

export default function QuestDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ inicializamos navigate
  const [quest, setQuest] = useState<Quest | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setUid(user ? user.uid : null));
    return () => unsub();
  }, []);

  useEffect(() => {
    const fetchQuest = async () => {
      try {
        const docRef = doc(db, "quests", id!);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setQuest({ id: snap.id, ...snap.data() } as Quest);
        }
      } catch (err) {
        console.error("Error cargando quest:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuest();
  }, [id]);

  const handleComplete = async () => {
    if (!uid || !quest) return;
    try {
      const userQuestRef = doc(db, `users/${uid}/completedQuests/${quest.id}`);
      const existing = await getDoc(userQuestRef);
      if (existing.exists()) {
        setCompleted(true);
        alert("Already completed!");
        return;
      }

      await setDoc(userQuestRef, {
        completedAt: new Date(),
        reward: quest.reward,
      });

      await addUserXP(uid, quest.reward);
      setCompleted(true);
      alert(`Quest completed! You earned ${quest.reward} XP 🎉`);
    } catch (err) {
      console.error("Error completing quest:", err);
    }
  };

  if (loading) return <p className="text-gray-400">Loading quest...</p>;
  if (!quest) return <p className="text-red-400">Quest not found.</p>;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col items-center p-6">
      <div className="max-w-3xl w-full">
        {/* ✅ Botón de Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-[var(--primary)] mb-4 hover:underline"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-green-400 mb-4">{quest.title}</h1>
          <p className="text-gray-300 mb-6">{quest.description}</p>

          {quest.imageUrl && (
            <img
              src={quest.imageUrl}
              alt={quest.title}
              className="w-full rounded-lg mb-6"
            />
          )}

          {quest.contentUrl && (
            <a
              href={quest.contentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:underline mb-6 block"
            >
              View Content
            </a>
          )}

          <button
            onClick={handleComplete}
            disabled={completed}
            className={`w-full mt-4 p-3 rounded font-bold ${
              completed
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-black"
            }`}
          >
            {completed ? "Completed!" : `Complete Quest (+${quest.reward} XP)`}
          </button>
        </div>
      </div>
    </div>
  );
}
