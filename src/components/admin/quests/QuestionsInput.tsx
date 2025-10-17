// src/components/admin/QuestionsInput.tsx
import type { Question } from "../../../types/Quest";

interface QuestionsInputProps {
  questions?: Question[];
  onChange: (questions: Question[]) => void;
}

export default function QuestionsInput({
  questions = [], // ✅ siempre array
  onChange,
}: QuestionsInputProps) {
  const handleQuestionChange = (idx: number, field: keyof Question, value: string | number | string[]) => {
    const newQuestions = [...questions];
    newQuestions[idx] = { ...newQuestions[idx], [field]: value };
    onChange(newQuestions);
  };

  const addQuestion = () => {
    onChange([
      ...questions,
      { q: "", options: ["", "", "", ""], answer: 0 },
    ]);
  };

  const removeQuestion = (idx: number) => {
    onChange(questions.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      {(questions ?? []).map((q, idx) => (
        <div key={idx} className="bg-gray-900 p-3 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-gray-400 font-medium">Pregunta {idx + 1}</h4>
            <button
              type="button"
              onClick={() => removeQuestion(idx)}
              className="text-red-400 hover:text-red-500 text-sm"
            >
              Eliminar
            </button>
          </div>

          <input
            type="text"
            placeholder="Enunciado de la pregunta"
            value={q.q ?? ""}
            onChange={e => handleQuestionChange(idx, "q", e.target.value)}
            className="w-full mb-2 p-2 rounded bg-gray-800 text-gray-200 placeholder-gray-500"
          />

          {(q.options ?? []).map((opt, optIdx) => (
            <input
              key={optIdx}
              type="text"
              placeholder={`Opción ${optIdx + 1}`}
              value={opt ?? ""}
              onChange={e => {
                const newOptions = [...(q.options ?? [])];
                newOptions[optIdx] = e.target.value;
                handleQuestionChange(idx, "options", newOptions);
              }}
              className="w-full mb-1 p-2 rounded bg-gray-800 text-gray-200 placeholder-gray-500"
            />
          ))}

          <input
            type="number"
            min={0}
            max={(q.options?.length ?? 1) - 1}
            placeholder="Índice de la respuesta correcta (0-3)"
            value={q.answer ?? 0}
            onChange={e => handleQuestionChange(idx, "answer", Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-800 text-gray-200 placeholder-gray-500"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addQuestion}
        className="w-full py-2 rounded bg-green-700 hover:bg-green-800 text-gray-100 font-medium"
      >
        + Agregar Pregunta
      </button>
    </div>
  );
}
