import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getDashboard } from "../../services/authService";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Briefcase,
  FileText,
  Bot,
  BookOpen,
  ChevronRight,
  AlertCircle,
  Code2,
  FileCheck2,
  Lock,
  TrendingUp,
  XCircle,
} from "lucide-react";

function Dashboard() {
  const { token, user: authUser } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        if (token) {
          const data = await getDashboard(token);
          setDashboardData(data.dashboard);
        }
      } catch (err) {
        console.warn("Dashboard API error:", err.message);
        setError("Could not load dashboard data. Showing basic profile info.");
        setDashboardData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, [token]);

  // ── Real data from backend with honest fallbacks ──
  const user = dashboardData?.user || authUser || {
    name: "Student",
    email: "",
    role: "student",
    skills: [],
    education: [],
    experience: [],
    careerPreferences: {
      preferredRoles: [],
      preferredLocations: [],
      expectedSalary: "",
    },
  };

  const profileCompletion = dashboardData?.profileCompletion ?? 0;

  const applications = dashboardData?.applications || {
    total: 0,
    pending: 0,
    reviewed: 0,
    accepted: 0,
    rejected: 0,
  };

  const interviews = dashboardData?.interviews || {
    total: 0,
    completed: 0,
    averageScore: 0,
    latestScore: 0,
  };

  const learning = dashboardData?.learning || {
    dsaSolved: 0,
    quizScore: 0,
    progress: 0,
  };

  const resume = dashboardData?.resume || {
    created: false,
    completed: false,
    hasProjects: false,
    title: "",
  };

  // ── Coming Soon sections config ──
  const comingSoonSections = [
    {
      title: "DSA Practice",
      description:
        "Track your Data Structures & Algorithms progress with difficulty-wise breakdown.",
      icon: Code2,
      link: "/student/dsa",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Quiz & Assessments",
      description:
        "Take topic-wise assessments and track your scores over time.",
      icon: FileCheck2,
      link: "/student/quiz",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Courses & Learning",
      description:
        "Enroll in placement preparation courses and track your learning.",
      icon: BookOpen,
      link: "/student/courses",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Job Recommendations",
      description:
        "Get personalized job & internship recommendations based on your skills.",
      icon: Briefcase,
      link: "/student/jobs",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-gray-500">
          Loading student dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ══════════════════════════════════════════════════════════════════
          ERROR BANNER (shown only when API fails)
          ══════════════════════════════════════════════════════════════════ */}
      {error && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <p className="text-sm text-amber-800">{error}</p>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1: Welcome Header (Real user name + profile completion)
          ══════════════════════════════════════════════════════════════════ */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs relative overflow-hidden">
        {/* Accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl shrink-0 shadow-xs">
              {user.name?.charAt(0)?.toUpperCase() || "S"}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Welcome back, {user.name?.split(" ")[0] || "Student"}!
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {profileCompletion < 50
                  ? "Complete your profile to get started with placement preparation."
                  : profileCompletion < 80
                    ? "Good progress! Keep building your profile for better opportunities."
                    : "Great profile! You're well-prepared for campus placements."}
              </p>
            </div>
          </div>

          {/* Profile Completion Ring + Quick Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 border-t lg:border-t-0 border-gray-100 pt-4 lg:pt-0">
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex items-center gap-3">
              <div className="text-right">
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Profile Completion
                </p>
                <p className="text-lg font-bold text-blue-600 leading-tight">
                  {profileCompletion}%
                </p>
              </div>
              <div className="w-12 h-12 relative flex items-center justify-center">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="18"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-gray-200"
                    fill="transparent"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="18"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray={113}
                    strokeDashoffset={
                      113 - (113 * profileCompletion) / 100
                    }
                    className="text-blue-600"
                    fill="transparent"
                  />
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/student/interview"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition shadow-xs"
              >
                <Bot className="w-4 h-4" />
                <span>Mock Interview</span>
              </Link>
              <Link
                to="/student/dsa"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-semibold transition"
              >
                <Code2 className="w-4 h-4" />
                <span>Practice DSA</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2: Key Stat Cards (All from real backend data)
          ══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Profile Completion */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:border-blue-200 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Profile
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-gray-900">
              {profileCompletion}%
            </p>
            <span className="text-xs text-gray-500 font-medium">
              Completed
            </span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${profileCompletion}%` }}
            />
          </div>
        </div>

        {/* Card 2: Applications */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:border-blue-200 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Applications
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-gray-900">
              {applications.total}
            </p>
            <span className="text-xs text-emerald-600 font-semibold">
              {applications.accepted} Accepted
            </span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{
                width:
                  applications.total > 0
                    ? `${(applications.accepted / applications.total) * 100}%`
                    : "0%",
              }}
            />
          </div>
        </div>

        {/* Card 3: AI Interviews */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:border-blue-200 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              AI Interviews
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-gray-900">
              {interviews.completed}
            </p>
            <span className="text-xs text-purple-600 font-semibold">
              {interviews.averageScore > 0
                ? `Avg: ${interviews.averageScore}%`
                : "No scores yet"}
            </span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${interviews.averageScore}%` }}
            />
          </div>
        </div>

        {/* Card 4: Resume Status */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:border-blue-200 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Resume
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-gray-900">
              {resume.created
                ? resume.completed
                  ? "Ready"
                  : "Draft"
                : "None"}
            </p>
            <span className="text-xs text-amber-700 font-semibold">
              {resume.created
                ? resume.hasProjects
                  ? "Has Projects"
                  : "No Projects"
                : "Not Started"}
            </span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{
                width: resume.completed
                  ? "100%"
                  : resume.created
                    ? "50%"
                    : "0%",
              }}
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3: Profile & Skills + Resume Status (Real data)
          ══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile & Skills Card (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-gray-900">
                Your Profile
              </h2>
            </div>
            <Link
              to="/student/profile"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Edit Profile <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Skills
            </p>
            {user.skills && user.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">
                No skills added yet.{" "}
                <Link
                  to="/student/profile"
                  className="text-blue-600 underline"
                >
                  Add skills
                </Link>
              </p>
            )}
          </div>

          {/* Education */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Education
            </p>
            {user.education && user.education.length > 0 ? (
              <div className="space-y-2">
                {user.education.map((edu, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm"
                  >
                    <p className="font-semibold text-gray-900">
                      {edu.degree || "Degree not specified"}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {edu.institution || "Institution not specified"}
                      {edu.year ? ` • ${edu.year}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">
                No education added yet.{" "}
                <Link
                  to="/student/profile"
                  className="text-blue-600 underline"
                >
                  Add education
                </Link>
              </p>
            )}
          </div>

          {/* Career Preferences */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Career Preferences
            </p>
            {user.careerPreferences &&
            (user.careerPreferences.preferredRoles?.length > 0 ||
              user.careerPreferences.preferredLocations?.length > 0 ||
              user.careerPreferences.expectedSalary) ? (
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 space-y-2 text-xs">
                {user.careerPreferences.preferredRoles?.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500 shrink-0">Roles:</span>
                    <span className="font-medium text-gray-800">
                      {user.careerPreferences.preferredRoles.join(", ")}
                    </span>
                  </div>
                )}
                {user.careerPreferences.preferredLocations?.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500 shrink-0">Locations:</span>
                    <span className="font-medium text-gray-800">
                      {user.careerPreferences.preferredLocations.join(", ")}
                    </span>
                  </div>
                )}
                {user.careerPreferences.expectedSalary && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500 shrink-0">Expected:</span>
                    <span className="font-medium text-gray-800">
                      {user.careerPreferences.expectedSalary}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">
                No career preferences set.{" "}
                <Link
                  to="/student/profile"
                  className="text-blue-600 underline"
                >
                  Set preferences
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* Resume Status Card (1 col) */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold text-gray-900">
                  Resume Status
                </h2>
              </div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                  resume.completed
                    ? "text-emerald-600 bg-emerald-50 border-emerald-200"
                    : resume.created
                      ? "text-amber-600 bg-amber-50 border-amber-200"
                      : "text-gray-500 bg-gray-50 border-gray-200"
                }`}
              >
                {resume.completed
                  ? "Complete"
                  : resume.created
                    ? "In Progress"
                    : "Not Started"}
              </span>
            </div>

            <div className="space-y-2.5">
              {/* Resume Created */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Resume Created</span>
                {resume.created ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-300 shrink-0" />
                )}
              </div>

              {/* Summary & Skills */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Summary & Skills Added</span>
                {resume.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-300 shrink-0" />
                )}
              </div>

              {/* Projects */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Projects Added</span>
                {resume.hasProjects ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-300 shrink-0" />
                )}
              </div>
            </div>

            {!resume.created && (
              <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3">
                <p className="text-xs text-blue-700">
                  Create your resume to improve your profile completion and
                  apply to jobs.
                </p>
              </div>
            )}
          </div>

          <Link
            to="/student/resume"
            className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold text-center block transition shadow-xs"
          >
            {resume.created ? "Edit Resume" : "Create Resume"}
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4: Application Breakdown + Interview Stats (Real data)
          ══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Applications Breakdown */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-gray-900">
              Applications
            </h2>
          </div>

          {applications.total > 0 ? (
            <div className="space-y-3">
              <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 text-center mb-4">
                <p className="text-2xl font-bold text-blue-700">
                  {applications.total}
                </p>
                <p className="text-xs text-blue-800 font-medium mt-0.5">
                  Total Applications
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-gray-600">
                <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span>Pending</span>
                  <span className="font-semibold text-amber-600">
                    {applications.pending}
                  </span>
                </li>
                <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span>Reviewed</span>
                  <span className="font-semibold text-blue-600">
                    {applications.reviewed}
                  </span>
                </li>
                <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span>Accepted</span>
                  <span className="font-semibold text-emerald-600">
                    {applications.accepted}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Rejected</span>
                  <span className="font-semibold text-red-600">
                    {applications.rejected}
                  </span>
                </li>
              </ul>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-500">
                No applications yet
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Start applying to jobs to track your progress here.
              </p>
            </div>
          )}
        </div>

        {/* Interview Stats */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-gray-900">
              AI Mock Interviews
            </h2>
          </div>

          {interviews.total > 0 ? (
            <div className="space-y-3">
              <div className="bg-purple-50/60 border border-purple-100 rounded-xl p-4 text-center mb-4">
                <p className="text-2xl font-bold text-purple-700">
                  {interviews.averageScore}/100
                </p>
                <p className="text-xs text-purple-800 font-medium mt-0.5">
                  Average Performance Score
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-gray-600">
                <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span>Total Interviews</span>
                  <span className="font-semibold text-gray-900">
                    {interviews.total}
                  </span>
                </li>
                <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span>Completed</span>
                  <span className="font-semibold text-purple-600">
                    {interviews.completed}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Latest Score</span>
                  <span className="font-semibold text-emerald-600">
                    {interviews.latestScore > 0
                      ? `${interviews.latestScore}/100`
                      : "N/A"}
                  </span>
                </li>
              </ul>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <Bot className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-500">
                No interviews yet
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Take your first AI mock interview to see your scores here.
              </p>
            </div>
          )}

          <Link
            to="/student/interview"
            className="mt-4 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold text-center block transition shadow-xs"
          >
            {interviews.total > 0
              ? "Start New Interview"
              : "Take First Interview"}
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 5: Coming Soon — Features Not Yet Built
          ══════════════════════════════════════════════════════════════════ */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-gray-400" />
          <h2 className="text-base font-bold text-gray-600">Coming Soon</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {comingSoonSections.map((section) => {
            const IconComponent = section.icon;
            return (
              <div
                key={section.title}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs flex flex-col items-center text-center hover:border-gray-300 transition"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${section.bgColor} flex items-center justify-center mb-3`}
                >
                  <IconComponent
                    className={`w-5 h-5 ${section.iconColor}`}
                  />
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-500 mb-2">
                  <Lock className="w-2.5 h-2.5" />
                  Coming Soon
                </span>
                <h3 className="text-sm font-bold text-gray-900">
                  {section.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {section.description}
                </p>
                <Link
                  to={section.link}
                  className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  Preview <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 6: Quick Links
          ══════════════════════════════════════════════════════════════════ */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <ArrowRight className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-gray-900">Quick Links</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            {
              label: "Profile",
              link: "/student/profile",
              icon: TrendingUp,
            },
            { label: "Resume", link: "/student/resume", icon: FileText },
            {
              label: "Mock Interview",
              link: "/student/interview",
              icon: Bot,
            },
            { label: "DSA Practice", link: "/student/dsa", icon: Code2 },
            {
              label: "Career",
              link: "/student/career",
              icon: Briefcase,
            },
          ].map((item) => {
            const IconComp = item.icon;
            return (
              <Link
                key={item.label}
                to={item.link}
                className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 rounded-lg transition text-xs font-semibold text-gray-700 hover:text-blue-700"
              >
                <IconComp className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;