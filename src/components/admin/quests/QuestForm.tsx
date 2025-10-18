// src/components/admin/QuestForm.tsx
import { useState, useEffect } from "react";
import QuestionsInput from "./QuestionsInput";
import type { Quest, Question } from "../../../types/Quest";

interface Props {
  quest: Quest | null;
  onSave: (q: Quest) => void;
}

export default function QuestForm({ quest, onSave }: Props) {
  const [form, setForm] = useState<Quest>({
    id: "",
    title: "",
    description: "",
    stage: "initial",
    type: "text",
    reward: 10,
    order: 0,
    contentUrl: "",
    imageUrl: "",
    questions: [],
  });

  useEffect(() => {
    if (quest) {
      setForm({
        id: quest.id ?? "",
        title: quest.title ?? "",
        description: quest.description ?? "",
        stage: quest.stage ?? "initial",
        type: quest.type ?? "text",
        reward: quest.reward ?? 10,
        order: quest.order ?? 0,
        contentUrl: quest.contentUrl ?? "",
        imageUrl: quest.imageUrl ?? "",
        questions: Array.isArray(quest.questions) ? quest.questions : [], // ✅ siempre array
      });
    } else {
      setForm({
        id: "",
        title: "",
        description: "",
        stage: "initial",
        type: "text",
        reward: 10,
        order: 0,
        contentUrl: "",
        imageUrl: "",
        questions: [],
      });
    }
  }, [quest]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "type") {
      setForm(prev => ({
        ...prev,
        type: value as Quest["type"],
        questions:
          value === "quiz" || value === "mixed"
            ? prev.questions?.length
              ? prev.questions
              : [{ q: "", options: ["", "", "", ""], answer: 0 }]
            : [],
      }));
    } else if (name === "reward") {
      setForm(prev => ({ ...prev, reward: parseInt(value) || 0 }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-green-400 mb-4">
        {quest ? "Editar Quest" : "Nueva Quest"}
      </h2>

      <div className="flex flex-col gap-3">
        <label className="text-gray-400 text-sm">Título</label>
        <input
          className="p-2 rounded bg-gray-700 text-white"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <label className="text-gray-400 text-sm">Descripción</label>
        <textarea
          className="p-2 rounded bg-gray-700 text-white"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <label className="text-gray-400 text-sm">Stage</label>
        <select
          className="p-2 rounded bg-gray-700 text-white"
          name="stage"
          value={form.stage}
          onChange={handleChange}
        >
          <option value="initial">Initial</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="bonus">Bonus</option>
        </select>

        <label className="text-gray-400 text-sm">Tipo</label>
        <select
          className="p-2 rounded bg-gray-700 text-white"
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option value="text">Text</option>
          <option value="video">Video</option>
          <option value="quiz">Quiz</option>
          <option value="mixed">Mixed</option>
        </select>

        <label className="text-gray-400 text-sm">Recompensa (XP)</label>
        <input
          className="p-2 rounded bg-gray-700 text-white"
          name="reward"
          value={form.reward}
          type="number"
          onChange={handleChange}
        />

        {/* 👇 Nuevo campo de orden */}
        <label className="text-gray-400 text-sm">Orden</label>
        <input
          className="p-2 rounded bg-gray-700 text-white"
          name="order"
          type="number"
          value={form.order}
          onChange={handleChange}
        />

        {/* Campos Content URL / Image URL */}
        <label className="text-gray-400 text-sm">Content URL</label>
        <input
          className="p-2 rounded bg-gray-700 text-white"
          name="contentUrl"
          value={form.contentUrl}
          onChange={e => setForm(prev => ({ ...prev, contentUrl: e.target.value }))}
        />

        <label className="text-gray-400 text-sm">Image URL</label>
        <input
          className="p-2 rounded bg-gray-700 text-white"
          name="imageUrl"
          value={form.imageUrl}
          onChange={e => setForm(prev => ({ ...prev, imageUrl: e.target.value }))}
        />

        {/* Preguntas solo si es quiz o mixed */}
        {(form.type === "quiz" || form.type === "mixed") && (
          <QuestionsInput
            questions={form.questions ?? []} // ✅ aseguramos array
            onChange={(q: Question[]) =>
              setForm(prev => ({ ...prev, questions: q }))
            }
          />
        )}

        <button
          className="mt-3 bg-green-500 hover:bg-green-600 text-black font-bold p-2 rounded"
          onClick={() => onSave(form)}
        >
          {quest ? "Guardar Cambios" : "Agregar Quest"}
        </button>
      </div>
    </div>
  );
}
