export default function Leaderboard() {
  const dummyData = [
    { rank: 1, user: "Alice", points: 1200 },
    { rank: 2, user: "Bob", points: 1150 },
    { rank: 3, user: "Charlie", points: 1100 },
    { rank: 4, user: "Diana", points: 950 },
    { rank: 5, user: "Eve", points: 900 },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Leaderboard
      </h1>

      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                User
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Points
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {dummyData.map((row) => (
              <tr
                key={row.rank}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200 font-medium">
                  #{row.rank}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {row.user}
                </td>
                <td className="px-6 py-4 text-primary font-semibold">
                  {row.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
