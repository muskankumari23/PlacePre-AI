import { FileCheck2, Clock, Award, Play, CheckCircle2 } from "lucide-react";

function Quiz() {
  const quizList = [
    {
      id: 1,
      title: "Operating Systems & Process Synchronization",
      questions: 20,
      duration: "30 mins",
      score: "95%",
      status: "Completed",
      badge: "Passed",
    },
    {
      id: 2,
      title: "DBMS, Indexing & SQL Query Tuning",
      questions: 25,
      duration: "40 mins",
      score: "90%",
      status: "Completed",
      badge: "Passed",
    },
    {
      id: 3,
      title: "Computer Networks & HTTP/2 Protocols",
      questions: 20,
      duration: "30 mins",
      score: "--",
      status: "Ready to Take",
      badge: "New",
    },
    {
      id: 4,
      title: "React Core Architecture & Hooks",
      questions: 15,
      duration: "25 mins",
      score: "--",
      status: "Ready to Take",
      badge: "Recommended",
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Quizzes & Skill Assessments</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Test your conceptual knowledge with timed technical assessments and instant feedback.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-right">
          <p className="text-[11px] font-semibold text-emerald-800 uppercase">Average Score</p>
          <p className="text-lg font-bold text-emerald-700">86% Accuracy</p>
        </div>
      </div>

      {/* Quiz Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizList.map((q) => (
          <div key={q.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-blue-200 transition">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                  {q.badge}
                </span>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{q.duration}</span>
                </div>
              </div>

              <h2 className="text-base font-bold text-gray-900 mt-3">{q.title}</h2>
              <p className="text-xs text-gray-500 mt-1">{q.questions} Multiple Choice Questions</p>

              {q.score !== "--" && (
                <div className="mt-4 p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-800">Your Last Score</span>
                  <span className="text-sm font-bold text-emerald-700">{q.score}</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">{q.status}</span>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer">
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{q.status === "Completed" ? "Retake Assessment" : "Start Test"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
