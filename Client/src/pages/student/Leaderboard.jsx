import { Trophy, Award, Flame, Star, Search } from "lucide-react";

function Leaderboard() {
  const leaderData = [
    { rank: 1, name: "Aarav Sharma", score: 2840, dsaSolved: 245, streak: 28, badge: "🏆 Master" },
    { rank: 2, name: "Priya Patel", score: 2710, dsaSolved: 230, streak: 24, badge: "🥇 Diamond" },
    { rank: 3, name: "Muskan Kumari", score: 2580, dsaSolved: 215, streak: 12, isCurrent: true, badge: "🥈 Platinum" },
    { rank: 4, name: "Rohan Verma", score: 2420, dsaSolved: 198, streak: 18, badge: "🥉 Gold" },
    { rank: 5, name: "Ananya Gupta", score: 2350, dsaSolved: 185, streak: 15, badge: "⭐ Silver" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Placement Preparation Leaderboard</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Top performing students ranked by DSA problems solved, quiz scores, and AI interview performance.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-right">
          <p className="text-[11px] font-semibold text-amber-800 uppercase">Your Current Rank</p>
          <p className="text-lg font-bold text-amber-700">#3 (Top 2%)</p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 border-b border-gray-200 font-bold uppercase text-[11px] text-gray-500">
              <tr>
                <th className="py-3.5 px-6">Rank</th>
                <th className="py-3.5 px-6">Student</th>
                <th className="py-3.5 px-6 text-center">DSA Solved</th>
                <th className="py-3.5 px-6 text-center">Active Streak</th>
                <th className="py-3.5 px-6 text-right">Total Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {leaderData.map((student) => (
                <tr
                  key={student.rank}
                  className={`transition ${
                    student.isCurrent ? "bg-blue-50/60 font-semibold" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                        student.rank === 1
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : student.rank === 2
                          ? "bg-slate-200 text-slate-800"
                          : student.rank === 3
                          ? "bg-amber-200/60 text-amber-900"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      #{student.rank}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <span className="text-gray-900 font-bold text-xs flex items-center gap-1.5">
                          {student.name}
                          {student.isCurrent && (
                            <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded-md">You</span>
                          )}
                        </span>
                        <span className="text-[11px] text-gray-500">{student.badge}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-center font-bold text-gray-900">
                    {student.dsaSolved}
                  </td>

                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Flame className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                      {student.streak} days
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right font-bold text-blue-600 text-sm">
                    {student.score} pts
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
