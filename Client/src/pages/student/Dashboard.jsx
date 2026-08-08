import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getDashboard } from "../../services/authService";

// ─────────────────────────────────────────────
// Dashboard — Personalized student dashboard
//
// Sections:
//   1. Welcome + Profile Completion
//   2. Stat Cards (Applications, Interviews, DSA, Quiz)
//   3. Skills
//   4. Resume Status
//   5. Application Overview
//   6. Interview Performance
//   7. Learning Progress
//   8. AI Features (placeholder for future integration)
// ─────────────────────────────────────────────

function Dashboard() {
  const { token } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard(token);
        setDashboard(data.dashboard);
      } catch (err) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchDashboard();
    }
  }, [token]);

  // ─── Loading State ───
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // ─── Error State ───
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-8 py-6 text-center max-w-md">
          <p className="text-lg font-semibold mb-1">Something went wrong</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // ─── Empty State ───
  if (!dashboard) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500">No dashboard data available.</p>
      </div>
    );
  }

  const { user, profileCompletion, resume, applications, interviews, learning } = dashboard;

  // ─── Stat Cards Data ───
  const statCards = [
    {
      title: "Applications",
      value: applications.total,
      subtitle: `${applications.pending} pending`,
      icon: "📄",
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700",
    },
    {
      title: "Interviews",
      value: interviews.total,
      subtitle: `${interviews.completed} completed`,
      icon: "🎯",
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-700",
    },
    {
      title: "DSA Solved",
      value: learning.dsaSolved,
      subtitle: "Problems solved",
      icon: "💻",
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
    },
    {
      title: "Quiz Score",
      value: `${learning.quizScore}%`,
      subtitle: "Average score",
      icon: "📝",
      color: "bg-orange-50 border-orange-200",
      textColor: "text-orange-700",
    },
  ];

  return (
    <div className="space-y-6">

      {/* ════════════════════════════════════════════
          SECTION 1: Welcome + Profile Completion
          ════════════════════════════════════════════ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Welcome */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome back, {user.name?.split(" ")[0]} 👋
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                {user.role === "student"
                  ? "Track your placement preparation progress"
                  : "Manage your company dashboard"}
              </p>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="md:text-right">
            <p className="text-sm text-gray-500 mb-1">Profile Completion</p>
            <div className="flex items-center gap-3">
              <div className="w-40 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    profileCompletion >= 80
                      ? "bg-green-500"
                      : profileCompletion >= 50
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
              <span className="text-lg font-bold text-gray-700">
                {profileCompletion}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          SECTION 2: Stat Cards
          ════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className={`${card.color} border rounded-xl p-5 transition hover:shadow-md`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{card.icon}</span>
              <span className={`text-2xl font-bold ${card.textColor}`}>
                {card.value}
              </span>
            </div>
            <p className="text-sm font-semibold text-gray-700">{card.title}</p>
            <p className="text-xs text-gray-500 mt-0.5">{card.subtitle}</p>
          </div>
        ))}
      </div>

      {/* ════════════════════════════════════════════
          SECTION 3: Skills + Resume Status (side by side)
          ════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Skills */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">🛠 Skills</h2>
          {user.skills && user.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">
              No skills added yet. Update your profile to add skills.
            </p>
          )}
        </div>

        {/* Resume Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📄 Resume Status</h2>
          <div className="space-y-3">
            <StatusRow
              label="Resume Created"
              done={resume.created}
            />
            <StatusRow
              label="Resume Completed"
              done={resume.completed}
            />
            <StatusRow
              label="Has Projects"
              done={resume.hasProjects}
            />
          </div>
          {!resume.created && (
            <p className="text-gray-400 text-xs mt-3">
              Go to the Resume section to create your resume.
            </p>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          SECTION 4: Applications + Interview Performance
          ════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Application Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📋 Application Overview</h2>
          {applications.total > 0 ? (
            <div className="space-y-3">
              <ProgressRow label="Pending" value={applications.pending} total={applications.total} color="bg-yellow-500" />
              <ProgressRow label="Reviewed" value={applications.reviewed} total={applications.total} color="bg-blue-500" />
              <ProgressRow label="Accepted" value={applications.accepted} total={applications.total} color="bg-green-500" />
              <ProgressRow label="Rejected" value={applications.rejected} total={applications.total} color="bg-red-500" />
            </div>
          ) : (
            <p className="text-gray-400 text-sm">
              No applications yet. Browse jobs to start applying.
            </p>
          )}
        </div>

        {/* Interview Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">🎯 Interview Performance</h2>
          {interviews.total > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Interviews</span>
                <span className="font-bold text-gray-800">{interviews.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="font-bold text-green-600">{interviews.completed}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Score</span>
                <span className={`font-bold text-lg ${
                  interviews.averageScore >= 70 ? "text-green-600" :
                  interviews.averageScore >= 40 ? "text-yellow-600" : "text-red-600"
                }`}>
                  {interviews.averageScore}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Latest Score</span>
                <span className="font-bold text-blue-600">{interviews.latestScore}%</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">
              No interviews yet. Practice mock interviews to get started.
            </p>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          SECTION 5: Learning Progress
          ════════════════════════════════════════════ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">📚 Learning Progress</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <LearningCard
            title="DSA Problems"
            value={learning.dsaSolved}
            unit="solved"
            icon="💻"
          />
          <LearningCard
            title="Quiz Score"
            value={`${learning.quizScore}%`}
            unit="average"
            icon="📝"
          />
          <LearningCard
            title="Overall Progress"
            value={`${learning.progress}%`}
            unit="complete"
            icon="📈"
          />
        </div>
        {learning.dsaSolved === 0 && learning.quizScore === 0 && (
          <p className="text-gray-400 text-xs mt-4">
            Start solving DSA problems and taking quizzes to track your progress here.
          </p>
        )}
      </div>

      {/* ════════════════════════════════════════════
          SECTION 6: AI Features (Coming Soon Placeholders)
          Future integration: Skill Gap Analysis, Career Recommendations,
          Resume Analysis, Job Recommendations, AI Mock Interview,
          Personalized Learning Roadmap
          ════════════════════════════════════════════ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">🤖 AI-Powered Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { title: "Skill Gap Analysis", icon: "🔍", desc: "Identify missing skills for your dream role" },
            { title: "Career Recommendations", icon: "🧭", desc: "AI-powered career path suggestions" },
            { title: "Resume Analysis", icon: "📑", desc: "Get AI feedback on your resume" },
            { title: "Job Recommendations", icon: "💼", desc: "Personalized job matches" },
            { title: "AI Mock Interview", icon: "🎙", desc: "Practice with AI interviewer" },
            { title: "Learning Roadmap", icon: "🗺", desc: "Custom learning path for your goals" },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-4 text-center opacity-60"
            >
              <span className="text-2xl">{feature.icon}</span>
              <p className="text-sm font-semibold text-gray-700 mt-2">{feature.title}</p>
              <p className="text-xs text-gray-400 mt-1">{feature.desc}</p>
              <span className="inline-block mt-2 text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          SECTION 7: Profile Summary
          ════════════════════════════════════════════ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">👤 Profile Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <InfoRow label="Name" value={user.name} />
          <InfoRow label="Email" value={user.email} />
          <InfoRow label="Role" value={user.role} />
          <InfoRow
            label="Member Since"
            value={new Date(user.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          />
        </div>

        {/* Education */}
        {user.education && user.education.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-700 mb-2">🎓 Education</p>
            <div className="space-y-2">
              {user.education.map((edu, i) => (
                <div key={i} className="text-sm text-gray-600">
                  <span className="font-medium">{edu.degree}</span>
                  {edu.institution && ` — ${edu.institution}`}
                  {edu.year && ` (${edu.year})`}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {user.experience && user.experience.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-700 mb-2">💼 Experience</p>
            <div className="space-y-2">
              {user.experience.map((exp, i) => (
                <div key={i} className="text-sm text-gray-600">
                  <span className="font-medium">{exp.title}</span>
                  {exp.company && ` at ${exp.company}`}
                  {exp.duration && ` · ${exp.duration}`}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Reusable Sub-Components ───

function StatusRow({ label, done }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`text-sm font-semibold ${done ? "text-green-600" : "text-gray-400"}`}>
        {done ? "✅ Yes" : "❌ No"}
      </span>
    </div>
  );
}

function ProgressRow({ label, value, total, color }) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-700">{value}</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function LearningCard({ title, value, unit, icon }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 text-center">
      <span className="text-2xl">{icon}</span>
      <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
      <p className="text-xs text-gray-500">{unit}</p>
      <p className="text-sm font-medium text-gray-700 mt-1">{title}</p>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <span className="text-gray-500">{label}: </span>
      <span className="font-medium text-gray-700 capitalize">{value || "—"}</span>
    </div>
  );
}

export default Dashboard;