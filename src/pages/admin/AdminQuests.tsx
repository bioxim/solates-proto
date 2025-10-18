// src/pages/admin/AdminQuests.tsx
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import LeftSidebar from "../../components/admin/LeftSidebar";
import QuestForm from "../../components/admin/quests/QuestForm";
import QuestList from "../../components/admin/quests/QuestList";
import Pagination from "../../components/admin/quests/Pagination";

import type { Quest } from "../../types/Quest";

const PAGE_SIZE = 5;

export default function AdminQuests() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // 🔹 Cargar quests desde Firestore ordenadas por "order"
  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const questsRef = collection(db, "quests");
        const q = query(questsRef, orderBy("order", "asc"));
        const snap = await getDocs(q);
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Quest[];
        setQuests(data);
      } catch (err) {
        console.error("Error cargando quests:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuests();
  }, []);

  // 🔹 Crear o editar quest
  const handleSaveQuest = async (newQuest: Quest) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...questData } = newQuest;

      if (editingQuest && editingQuest.id) {
        const questRef = doc(db, "quests", editingQuest.id);
        await updateDoc(questRef, questData);
        setQuests((prev) =>
          prev.map((q) =>
            q.id === editingQuest.id ? { ...questData, id: editingQuest.id } : q
          )
        );
      } else {
        const docRef = await addDoc(collection(db, "quests"), questData);
        setQuests((prev) => [...prev, { ...questData, id: docRef.id }]);
      }

      setEditingQuest(null);
    } catch (err) {
      console.error("Error guardando quest:", err);
    }
  };

  const handleEdit = (quest: Quest) => setEditingQuest(quest);

  // 🔹 Paginación
  const totalPages = Math.ceil(quests.length / PAGE_SIZE);
  const pagedQuests = quests.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="flex">
      <LeftSidebar />

      <main className="ml-60 mr-8 p-6 flex-1 min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
        <h1 className="text-2xl font-bold mb-6 text-[var(--primary)]">
          Panel de Quests
        </h1>

        {loading ? (
          <p className="text-gray-400">Cargando quests...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuestForm quest={editingQuest} onSave={handleSaveQuest} />
            <div className="overflow-hidden">
              <QuestList quests={pagedQuests} onEdit={handleEdit} />
              <Pagination
                current={currentPage}
                total={totalPages}
                onChange={setCurrentPage}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
