import { Link } from "react-router-dom";
import { Compass, CheckCircle2, ArrowRight, Sparkles, BookOpen, Target, Zap } from "lucide-react";

function Career() {
  const careerRoadmaps = [
    {
      id: 1,
      title: "Frontend & Full Stack Software Engineer (SDE 1)",
      targetRole: "Full Stack Engineer",
      matchPercent: 95,
      skillsMastered: ["React.js", "JavaScript (ES6+)", "HTML5 & Tailwind CSS", "Git & REST APIs"],
      recommendedNext: ["Next.js Server Components", "TypeScript Deep Dive", "System Design Patterns"],
      salaryRange: "₹12 - 24 LPA",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Backend & Systems Architect",
      targetRole: "Backend SDE",
      matchPercent: 88,
      skillsMastered: ["Node.js & Express", "Relational Databases (PostgreSQL/SQL)", "Data Structures & Algorithms"],
      recommendedNext: ["Distributed Caching with Redis", "Message Queues (Kafka/RabbitMQ)", "Microservices Design"],
      salaryRange: "₹14 - 28 LPA",
      status: "Recommended",
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Career Guidance & Roadmaps</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Personalized career pathways, skill gap analysis, and industry benchmark readiness.
          </p>
        </div>

        <Link
          to="/student/interview"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition shadow-xs"
        >
          <Sparkles className="w-4 h-4" />
          <span>Get AI Career Assessment</span>
        </Link>
      </div>

      {/* Career Paths Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {careerRoadmaps.map((path) => (
          <div key={path.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                  {path.matchPercent}% Profile Match
                </span>
                <span className="text-xs font-semibold text-gray-600">{path.salaryRange}</span>
              </div>

              <h2 className="text-base font-bold text-gray-900 mt-3">{path.title}</h2>
              <p className="text-xs text-gray-500 mt-0.5">Target: {path.targetRole}</p>

              {/* Skills Mastered */}
              <div className="mt-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">Mastered Competencies</p>
                <div className="flex flex-wrap gap-1.5">
                  {path.skillsMastered.map((sk) => (
                    <span key={sk} className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Next Steps */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-700 mb-2">Recommended Next Topics</p>
                <ul className="space-y-1.5">
                  {path.recommendedNext.map((topic) => (
                    <li key={topic} className="flex items-center gap-2 text-xs text-gray-600">
                      <Zap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">Curated by Placement Experts</span>
              <Link
                to="/student/courses"
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                <span>View Learning Modules</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Career;
