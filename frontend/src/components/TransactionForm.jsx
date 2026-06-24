import { useState } from "react";
import { postTransaction } from "../api";

export default function TransactionForm() {
  const [form, setForm] = useState({
    user_id: "",
    amount: "",
    type: "credit",
    idempotency_key: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await postTransaction({ ...form, amount: parseFloat(form.amount) });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">POST</span>
        <h2 className="text-xl font-semibold text-white">/transaction</h2>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-400 text-sm mb-1 block">User ID</label>
          <input
            placeholder="e.g. user1"
            value={form.user_id}
            onChange={(e) => setForm({ ...form, user_id: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-1 block">Amount</label>
          <input
            placeholder="e.g. 500"
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-1 block">Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
          >
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-1 block">Idempotency Key</label>
          <input
            placeholder="e.g. key-001"
            value={form.idempotency_key}
            onChange={(e) => setForm({ ...form, idempotency_key: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-lg transition-all cursor-pointer"
      >
        {loading ? "Submitting..." : "Submit Transaction"}
      </button>

      {result && (
        <div className="mt-5 bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-green-400 text-sm font-semibold mb-3">Response</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="text-gray-400">ID</span>
            <span className="text-white truncate">{result.id}</span>
            <span className="text-gray-400">User ID</span>
            <span className="text-white">{result.user_id}</span>
            <span className="text-gray-400">Amount</span>
            <span className="text-white">${result.amount}</span>
            <span className="text-gray-400">Type</span>
            <span className={`font-semibold ${result.type === "credit" ? "text-green-400" : "text-red-400"}`}>
              {result.type}
            </span>
            <span className="text-gray-400">Message</span>
            <span className="text-yellow-400">{result.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}