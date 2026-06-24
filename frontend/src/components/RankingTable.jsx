import { useState } from "react";
import { getRankings } from "../api";

const medalColor = (rank) => {
  if (rank === 1) return "text-yellow-400";
  if (rank === 2) return "text-gray-300";
  if (rank === 3) return "text-orange-400";
  return "text-gray-400";
};

export default function RankingTable() {
  const [rankings, setRankings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRankings = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await getRankings();
      setRankings(res.data.rankings);
    } catch (err) {
      setError("Failed to fetch rankings");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">GET</span>
          <h2 className="text-xl font-semibold text-white">/ranking</h2>
        </div>
        <button
          onClick={handleRankings}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-lg transition-all cursor-pointer"
        >
          {loading ? "Loading..." : "Get Rankings"}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      {rankings.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-800 text-gray-400">
                <th className="px-4 py-3 text-left rounded-tl-lg">Rank</th>
                <th className="px-4 py-3 text-left">User ID</th>
                <th className="px-4 py-3 text-left">Score</th>
                <th className="px-4 py-3 text-left">Volume</th>
                <th className="px-4 py-3 text-left">Transactions</th>
                <th className="px-4 py-3 text-left rounded-tr-lg">Unique Days</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((r, i) => (
                <tr
                  key={r.user_id}
                  className={`border-t border-gray-800 hover:bg-gray-800 transition-all ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-800/50"}`}
                >
                  <td className="px-4 py-3">
                    <span className={`font-bold text-lg ${medalColor(r.rank)}`}>#{r.rank}</span>
                  </td>
                  <td className="px-4 py-3 text-white font-medium">{r.user_id}</td>
                  <td className="px-4 py-3">
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-lg font-semibold">
                      {r.score}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-green-400">${r.total_volume}</td>
                  <td className="px-4 py-3 text-purple-400">{r.transaction_count}</td>
                  <td className="px-4 py-3 text-yellow-400">{r.unique_days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}