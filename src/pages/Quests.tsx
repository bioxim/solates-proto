/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import QuestCard from "../components/QuestCard";
import { db, auth, addUserXP } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
  orderBy,
} from "firebase/firestore";

interface Quest {
  id: string;
  title: string;
  description: string;
  reward: number;
  stage: string;
  order?: number;
}

export default function Quests() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const stages = ["initial", "intermediate", "advanced"];

  // 🔹 Obtener usuario actual
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) setUserId(user.uid);
      else setUserId(null);
    });
    return () => unsub();
  }, []);

  // 🔹 Cargar quests desde Firestore (ordenadas)
  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const q = query(collection(db, "quests"), orderBy("order", "asc"));
        const snap = await getDocs(q);
        const data = snap.docs.map(
          (d) => ({ id: d.id, ...d.data() } as Quest)
        );
        setQuests(data);
      } catch (err) {
        console.error("Error loading quests:", err);
      }
    };
    fetchQuests();
  }, []);

  // 🔹 Cargar quests completadas del usuario
  useEffect(() => {
    if (!userId) return;
    const fetchCompleted = async () => {
      try {
        const q = collection(db, `users/${userId}/completedQuests`);
        const snap = await getDocs(q);
        const completedIds = snap.docs.map((d) => d.id);
        setCompletedQuests(completedIds);
      } catch (err) {
        console.error("Error loading completed quests:", err);
      }
    };
    fetchCompleted();
  }, [userId]);

  // 🔹 Completar una quest
  const handleCompleteQuest = async (questId: string) => {
    if (!userId) return alert("You must be logged in to complete quests!");
    const quest = quests.find((q) => q.id === questId);
    if (!quest) return;

    try {
      // Guardar como completada
      const questRef = doc(db, `users/${userId}/completedQuests`, questId);
      await setDoc(questRef, {
        completedAt: new Date(),
      });

      // Sumar XP al usuario
      await addUserXP(userId, quest.reward);

      // Actualizar estado local
      setCompletedQuests((prev) => [...prev, questId]);
    } catch (err) {
      console.error("Error completing quest:", err);
    }
  };

  return (
    <div className="main-content min-h-screen bg-[var(--bg)] text-[var(--text)] p-6 flex flex-col items-center">
      <div className="max-w-5xl w-full space-y-10">
        {stages.map((stage) => {
          // Filtrar por stage válido (sin bonus) y convertir en lista segura
          const stageQuests = quests
            .filter((q) => typeof q.stage === "string" && q.stage === stage && q.stage !== "bonus")
            // ordenar usando un fallback numérico cuando order es undefined
            .sort((a, b) => ((a.order ?? 99999) - (b.order ?? 99999)))

          if (stageQuests.length === 0) return null;

          return (
            <div key={stage}>
              <h2 className="text-2xl font-bold mb-4 capitalize">
                {stage === "initial"
                  ? "Beginner Quests"
                  : stage === "intermediate"
                  ? "Intermediate Quests"
                  : "Advanced Quests"}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {stageQuests.map((quest, index) => {
                  const completed = completedQuests.includes(quest.id);
                  const previousQuest = stageQuests[index - 1];

                  // Primer quest siempre desbloqueado, o si ya fue completada
                  const unlocked =
                    index === 0 ||
                    completed ||
                    (previousQuest && completedQuests.includes(previousQuest.id));

                  return (
                    <QuestCard
                      key={quest.id}
                      id={quest.id}
                      title={quest.title}
                      description={quest.description}
                      reward={quest.reward}
                      index={index}
                      unlocked={unlocked}
                      completed={completed}
                      onComplete={() => handleCompleteQuest(quest.id)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
