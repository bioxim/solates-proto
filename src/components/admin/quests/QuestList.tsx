// src/components/admin/QuestList.tsx
import { type Quest } from "../../../types/Quest";

interface Props {
  quests: Quest[];
  onEdit: (q: Quest) => void;
}

export default function QuestList({ quests, onEdit }: Props) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md space-y-2">
      {quests.length === 0 ? (
        <p className="text-gray-400">No hay quests.</p>
      ) : (
        quests.map(q => (
          <div key={q.id} className="p-2 bg-gray-700 rounded flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-green-400">{q.title}</h4>
              <p className="text-gray-300 text-sm">{q.description}</p>
              <p className="text-gray-400 text-xs">Recompensa: {q.reward} XP</p>
              <p className="text-gray-400 text-xs">Stage: {q.stage}</p>
            </div>
            <button
              className="text-blue-400 text-sm"
              onClick={() => onEdit(q)}
            >
              Editar
            </button>
          </div>
        ))
      )}
    </div>
  );
}
