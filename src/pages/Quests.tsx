/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import QuestCard from "../components/QuestCard";
import { questsData } from "../data/questsData";

export default function Quests() {
  const [progress, setProgress] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("solates_quests_progress");
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  const handleCompleteQuest = (id: string) => {
    const updated = [...progress, id];
    setProgress(updated);
    localStorage.setItem("solates_quests_progress", JSON.stringify(updated));
  };

  const stages = ["initial", "intermediate", "advanced"];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6 flex flex-col items-center">
      <div className="max-w-5xl w-full space-y-10">
        {stages.map((stage) => {
          const stageQuests = questsData.filter((q) => q.stage === stage);
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
                  const completed = progress.includes(quest.id);
                  const previousQuest = stageQuests[index - 1];
                  const unlocked =
                    index === 0 ||
                    (previousQuest && progress.includes(previousQuest.id));

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
