// src/components/admin/QuestionsInput.tsx
import type { Question } from "../../../data/questsData";

interface QuestionsInputProps {
  questions: Question[];
  onChange: (questions: Question[]) => void;
}

export default function QuestionsInput({ questions, onChange }: QuestionsInputProps) {
  const handleQuestionChange = (idx: number, field: keyof Question, value: string | number | string[]) => {
    const newQuestions = [...questions];
    newQuestions[idx] = { ...newQuestions[idx], [field]: value };
    onChange(newQuestions);
  };

  return (
    <div className="space-y-4">
      {questions.map((q, idx) => (
        <div key={idx} className="bg-gray-900 p-3 rounded-md">
          <input
            type="text"
            placeholder="Enunciado"
            value={q.q}
            onChange={e => handleQuestionChange(idx, "q", e.target.value)}
            className="w-full mb-2 p-2 rounded bg-gray-800 text-gray-200 placeholder-gray-500"
          />
          {q.options.map((opt, optIdx) => (
            <input
              key={optIdx}
              type="text"
              placeholder={`Opción ${optIdx + 1}`}
              value={opt}
              onChange={e => {
                const newOptions = [...q.options];
                newOptions[optIdx] = e.target.value;
                handleQuestionChange(idx, "options", newOptions);
              }}
              className="w-full mb-1 p-2 rounded bg-gray-800 text-gray-200 placeholder-gray-500"
            />
          ))}
          <input
            type="number"
            placeholder="Índice de respuesta correcta"
            value={q.answer}
            onChange={e => handleQuestionChange(idx, "answer", Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-800 text-gray-200 placeholder-gray-500"
          />
        </div>
      ))}
    </div>
  );
}
