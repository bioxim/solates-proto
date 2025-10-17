interface Props {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export default function Pagination({ current, total, onChange }: Props) {
  if (total <= 1) return null;
  return (
    <div className="flex gap-2 mt-2">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          className={`px-2 py-1 rounded ${current === i + 1 ? "bg-green-500 text-black" : "bg-gray-700 text-white"}`}
          onClick={() => onChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
