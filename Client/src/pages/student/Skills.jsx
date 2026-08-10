import { TrendingUp, Award, Code2, BookOpen, FileCheck2, CheckCircle2 } from "lucide-react";

function Skills() {
  const skillCategories = [
    {
      category: "Data Structures & Algorithms",
      overall: 78,
      topics: [
        { name: "Arrays & Strings", score: 92, level: "Advanced" },
        { name: "Trees & Graph Algorithms", score: 75, level: "Intermediate" },
        { name: "Dynamic Programming", score: 55, level: "Developing" },
      ],
    },
    {
      category: "Web Development & Engineering",
      overall: 88,
      topics: [
        { name: "React.js & Frontend State", score: 95, level: "Expert" },
        { name: "Node.js REST APIs", score: 85, level: "Advanced" },
        { name: "Database Design (SQL & NoSQL)", score: 80, level: "Advanced" },
      ],
    },
    {
      category: "Core Computer Science Fundamentals",
      overall: 82,
      topics: [
        { name: "Operating Systems", score: 85, level: "Advanced" },
        { name: "Computer Networks", score: 80, level: "Advanced" },
        { name: "DBMS & Transactions", score: 82, level: "Advanced" },
      ],
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Skill Progress & Mastery</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Detailed breakdown of technical competencies, topic accuracy, and target proficiency.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-2 text-right">
          <p className="text-[11px] font-semibold text-blue-600 uppercase">Overall Skill Score</p>
          <p className="text-lg font-bold text-blue-700">83 / 100</p>
        </div>
      </div>

      {/* Skills Categories */}
      <div className="space-y-6">
        {skillCategories.map((cat, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900">{cat.category}</h2>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                {cat.overall}% Proficiency
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cat.topics.map((t, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">{t.name}</span>
                    <span className="text-[11px] font-semibold text-gray-500">{t.level}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs font-semibold text-blue-600">
                    <span>Score</span>
                    <span>{t.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${t.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
