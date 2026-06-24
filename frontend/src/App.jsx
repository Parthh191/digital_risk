import Header from "./components/Header";
import TransactionForm from "./components/TransactionForm";
import SummarySection from "./components/SummarySection";
import RankingTable from "./components/RankingTable";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <TransactionForm />
        <SummarySection />
        <RankingTable />
      </div>
    </div>
  );
}