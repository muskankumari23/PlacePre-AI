import { useState } from "react";
import { Code2, CheckCircle2, Search, Filter, Play, ExternalLink, Flame } from "lucide-react";

function DSA() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const problemList = [
    { id: 1, title: "Two Sum", category: "Arrays & Hashing", difficulty: "Easy", solved: true, acceptance: "52%" },
    { id: 2, title: "Longest Substring Without Repeating Characters", category: "Sliding Window", difficulty: "Medium", solved: true, acceptance: "38%" },
    { id: 3, title: "Trapping Rain Water", category: "Two Pointers", difficulty: "Hard", solved: false, acceptance: "60%" },
    { id: 4, title: "Binary Tree Level Order Traversal", category: "Trees & BFS", difficulty: "Medium", solved: true, acceptance: "65%" },
    { id: 5, title: "Coin Change (Dynamic Programming)", category: "Dynamic Programming", difficulty: "Medium", solved: false, acceptance: "42%" },
    { id: 6, title: "Word Search II", category: "Backtracking & Trie", difficulty: "Hard", solved: false, acceptance: "36%" },
  ];

  const filteredProblems = selectedDifficulty === "All"
    ? problemList
    : problemList.filter((p) => p.difficulty === selectedDifficulty);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">DSA Practice & Problem Solving</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Master Data Structures & Algorithms curated for top tech companies (SDE 1 & SDE 2).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-700">
            <Flame className="w-4 h-4 fill-emerald-600" />
            142 Solved
          </span>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {["All", "Easy", "Medium", "Hard"].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedDifficulty === diff
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search problems or topics..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-blue-600"
          />
        </div>
      </div>

      {/* Problem Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-gray-700">
          <thead className="bg-gray-50 border-b border-gray-200 uppercase text-[11px] font-bold text-gray-500">
            <tr>
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6">Problem Title</th>
              <th className="py-3.5 px-6">Topic</th>
              <th className="py-3.5 px-6">Difficulty</th>
              <th className="py-3.5 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {filteredProblems.map((prob) => (
              <tr key={prob.id} className="hover:bg-gray-50 transition">
                <td className="py-4 px-6">
                  {prob.solved ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-gray-300 block" />
                  )}
                </td>

                <td className="py-4 px-6 font-bold text-gray-900">
                  {prob.title}
                </td>

                <td className="py-4 px-6 text-gray-500">
                  {prob.category}
                </td>

                <td className="py-4 px-6">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      prob.difficulty === "Easy"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : prob.difficulty === "Medium"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    {prob.difficulty}
                  </span>
                </td>

                <td className="py-4 px-6 text-right">
                  <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold transition cursor-pointer">
                    <Play className="w-3 h-3 fill-blue-700" />
                    <span>Solve Problem</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DSA;
