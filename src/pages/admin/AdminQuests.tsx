// src/components/admin/AdminQuests.tsx
import { useState } from "react";
import { questsData, type Quest } from "../../data/questsData";
import LeftSidebar from "../../components/admin/LeftSidebar";
import QuestForm from "../../components/admin/quests/QuestForm";
import QuestList from "../../components/admin/quests/QuestList";
import Pagination from "../../components/admin/quests/Pagination";

const PAGE_SIZE = 5;

export default function AdminQuests() {
  const [quests, setQuests] = useState<Quest[]>(questsData);
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSaveQuest = (newQuest: Quest) => {
    setQuests(prev => {
      if (editingQuest) {
        // Editar
        return prev.map(q => (q.id === editingQuest.id ? newQuest : q));
      } else {
        // Agregar
        return [...prev, { ...newQuest, id: crypto.randomUUID() }];
      }
    });
    setEditingQuest(null);
  };

  const handleEdit = (quest: Quest) => setEditingQuest(quest);

  // Paginación
  const totalPages = Math.ceil(quests.length / PAGE_SIZE);
  const pagedQuests = quests.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="flex">
      <LeftSidebar />

      <main className="ml-60 p-6 flex-1 min-h-screen bg-[#0a0a0a] text-white mr-10">
        <h1 className="text-2xl font-bold mb-4">Panel de Quests</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <QuestForm quest={editingQuest} onSave={handleSaveQuest} />
          <div>
            <QuestList quests={pagedQuests} onEdit={handleEdit} />
            <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />
          </div>
        </div>
      </main>
    </div>
  );
}
