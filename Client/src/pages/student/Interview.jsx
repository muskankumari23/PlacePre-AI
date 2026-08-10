import { Bot, Play, Video, Mic, CheckCircle2, Award, Clock } from "lucide-react";

function Interview() {
  const interviewRounds = [
    {
      id: 1,
      role: "Frontend Engineer (React Core & Architecture)",
      type: "Technical AI Round",
      score: "84/100",
      date: "Aug 8, 2026",
      feedback: "Excellent understanding of Virtual DOM and React Hooks. Suggest improving State Management answers.",
    },
    {
      id: 2,
      role: "Data Structures & System Design Basics",
      type: "Coding & Problem Solving",
      score: "78/100",
      date: "Aug 5, 2026",
      feedback: "Strong algorithmic logic. Practice explaining time complexity tradeoffs out loud.",
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-purple-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">AI Mock Interview Simulator</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Simulate real technical and behavioral interview rounds with real-time AI speech & code analysis.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold transition shadow-xs cursor-pointer">
          <Video className="w-4 h-4" />
          <span>Start AI Interview Session</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-gray-500 uppercase">Total Completed</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">4 Rounds</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-gray-500 uppercase">Average Technical Score</p>
          <p className="text-2xl font-bold text-purple-600 mt-2">78 / 100</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-gray-500 uppercase">Communication Accuracy</p>
          <p className="text-2xl font-bold text-emerald-600 mt-2">85%</p>
        </div>
      </div>

      {/* Previous Session History */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-gray-900">Recent Interview Feedback</h2>

        <div className="space-y-3">
          {interviewRounds.map((round) => (
            <div key={round.id} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-md">
                    {round.type}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 mt-2">{round.role}</h3>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-purple-600">{round.score}</span>
                  <p className="text-[11px] text-gray-400">{round.date}</p>
                </div>
              </div>

              <div className="mt-3 p-3 bg-white border border-gray-200 rounded-lg text-xs text-gray-600">
                <span className="font-semibold text-gray-800">AI Feedback: </span>
                {round.feedback}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Interview;
