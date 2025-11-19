import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, addUserXP } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ArrowLeft, CheckCircle, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Quest {
  id: string;
  title: string;
  description: string;
  content?: string;
  reward: number;
  imageUrl?: string;
  question?: string;
  options?: string[];
  correctOptionIndex?: number;
  cooldownHours?: number;
}

export default function QuestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quest, setQuest] = useState<Quest | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [cooldownTime, setCooldownTime] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // --- Detect user ---
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) =>
      setUid(user ? user.uid : null)
    );
    return () => unsub();
  }, []);

  // --- Load quest ---
  useEffect(() => {
    const fetchQuest = async () => {
      try {
        const snap = await getDoc(doc(db, "quests", id!));
        if (snap.exists()) setQuest({ id: snap.id, ...snap.data() } as Quest);
      } catch (err) {
        console.error("Error loading quest:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuest();
  }, [id]);

  // --- Check user quest progress ---
  useEffect(() => {
    if (!uid || !id) return;
    const checkProgress = async () => {
      const questRef = doc(db, `users/${uid}/completedQuests/${id}`);
      const snap = await getDoc(questRef);

      if (snap.exists()) {
        const data = snap.data();
        setCompleted(!!data.completed);
        if (data.lastAttempt) {
          const lastAttempt = data.lastAttempt.toDate
            ? data.lastAttempt.toDate()
            : data.lastAttempt;
          const now = new Date();
          const diffHours =
            (now.getTime() - new Date(lastAttempt).getTime()) / 1000 / 3600;
          const cooldown = quest?.cooldownHours || 24;
          if (diffHours < cooldown) {
            setCooldownActive(true);
            setCooldownTime(Math.ceil(cooldown - diffHours));
          }
        }
      }
    };
    checkProgress();
  }, [uid, id, quest?.cooldownHours]);

  // --- Handle Answer ---
  const handleAnswer = async () => {
    if (!uid || !quest) return alert("You must be logged in!");
    if (completed) return alert("You already completed this quest!");
    if (cooldownActive) return alert("You must wait before trying again!");

    try {
      const correct = selectedOption === quest.correctOptionIndex;
      const questRef = doc(db, `users/${uid}/completedQuests/${quest.id}`);

      if (correct) {
        await setDoc(questRef, {
          completed: true,
          completedAt: serverTimestamp(),
          reward: quest.reward,
        });
        await addUserXP(uid, quest.reward);
        setCompleted(true);
        alert(`✅ Correct! You earned ${quest.reward} XP 🎉`);
      } else {
        await setDoc(questRef, {
          completed: false,
          lastAttempt: serverTimestamp(),
        });
        setCooldownActive(true);
        setCooldownTime(quest.cooldownHours || 24);
        alert(
          `❌ Wrong answer! Try again in ${quest.cooldownHours || 24} hours.`
        );
      }
    } catch (err) {
      console.error("Error saving quest progress:", err);
    }
  };

  if (loading) return <p className="text-gray-400">Loading quest...</p>;
  if (!quest) return <p className="text-red-400">Quest not found.</p>;

  return (
    <div className="main-content min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col items-center p-6">
      <div className="max-w-3xl w-full">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-[var(--primary)] mb-4 hover:underline"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-green-400">
              {quest.title}
            </h1>
            {completed ? (
              <CheckCircle className="text-green-400" size={28} />
            ) : cooldownActive ? (
              <Clock className="text-yellow-400" size={28} />
            ) : null}
          </div>

          <p className="text-gray-300 mb-4">{quest.description}</p>

          {quest.imageUrl && (
            <img
              src={quest.imageUrl}
              alt={quest.title}
              className="w-full rounded-lg mb-6"
            />
          )}

          {quest.content && (
            <div className="prose prose-invert prose-headings:text-green-400 prose-p:text-gray-200 prose-strong:text-white max-w-none mb-6">
              <ReactMarkdown>{quest.content}</ReactMarkdown>
            </div>
          )}

          {quest.question && (
            <div className="mt-4 space-y-3">
              <h2 className="text-lg font-semibold text-[var(--primary)] mb-2">
                {quest.question}
              </h2>
              {quest.options?.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full p-3 text-left rounded-lg border transition-all ${
                    selectedOption === idx
                      ? "bg-green-500/20 border-green-500"
                      : "bg-gray-800 border-gray-700 hover:border-green-400"
                  }`}
                  disabled={completed || cooldownActive}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Estado visual debajo */}
          {completed && (
            <p className="mt-4 text-green-400 text-center font-semibold">
              ✅ Quest completed successfully!
            </p>
          )}
          {cooldownActive && (
            <p className="mt-4 text-yellow-400 text-center font-semibold">
              ⏳ Try again in {cooldownTime} hour
              {cooldownTime && cooldownTime > 1 ? "s" : ""}.
            </p>
          )}

          <button
            onClick={handleAnswer}
            disabled={completed || cooldownActive || selectedOption === null}
            className={`w-full mt-6 p-3 rounded font-bold transition-all ${
              completed
                ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                : cooldownActive
                ? "bg-yellow-500 text-black cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-black"
            }`}
          >
            {completed
              ? "✅ Quest Completed"
              : cooldownActive
              ? "⏳ Cooldown Active"
              : selectedOption === null
              ? "Select an Answer"
              : `Complete Quest (+${quest.reward} XP)`}
          </button>
        </div>
      </div>
    </div>
  );
}
