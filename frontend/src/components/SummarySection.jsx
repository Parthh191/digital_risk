import { useState } from "react";
import { getSummary } from "../api";

export default function SummarySection() {
  const [userId, setUserId] = useState("");
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummary = async () => {
    setError("");
    setSummary(null);
    setLoading(true);
    try {
      const res = await getSummary(userId);
      setSummary(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "User not found");
    }
    setLoading(false);
  };

  const cards = summary
    ? [
        { label: "Total Volume", value: `$${summary.total_volume}`, color: "text-blue-400" },
        { label: "Transactions", value: summary.transaction_count, color: "text-purple-400" },
        { label: "Unique Days", value: summary.unique_days, color: "text-yellow-400" },
        { label: "Credit Total", value: `$${summary.credit_total}`, color: "text-green-400" },
        { label: "Debit Total", value: `$${summary.debit_total}`, color: "text-red-400" },
        { label: "User ID", value: summary.user_id, color: "text-white" },
      ]
    : [];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">GET</span>
        <h2 className="text-xl font-semibold text-white">/summary/:userId</h2>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <input
          placeholder="Enter User ID e.g. user1"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-green-500"
        />
        <button
          onClick={handleSummary}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-lg transition-all cursor-pointer"
        >
          {loading ? "Loading..." : "Get Summary"}
        </button>
      </div>

      {summary && (
        <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div key={card.label} className="bg-gray-800 rounded-xl p-4 border border-gray-700 text-center">
              <p className="text-gray-400 text-xs mb-1">{card.label}</p>
              <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}