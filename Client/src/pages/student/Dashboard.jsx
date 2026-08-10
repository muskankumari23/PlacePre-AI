import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getDashboard } from "../../services/authService";
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Clock,
  Briefcase,
  TrendingUp,
  FileText,
  Bot,
  Target,
  Award,
  BookOpen,
  ChevronRight,
  Flame,
  AlertCircle,
  ExternalLink,
  Code2,
  FileCheck2,
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
        console.warn("Using fallback client state for dashboard:", err.message);
        // Fallback state if server has no mock endpoint active
        setDashboardData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, [token]);

  // Derived user details & stats from backend API or fallback state
  const user = dashboardData?.user || authUser || {
    name: "Muskan Kumari",
    email: "muskan@example.com",
    role: "student",
    skills: ["React.js", "Data Structures", "Node.js", "Java", "SQL"],
  };

  const profileCompletion = dashboardData?.profileCompletion ?? 85;

  const applications = dashboardData?.applications || {
    total: 8,
    pending: 4,
    reviewed: 2,
    accepted: 1,
    rejected: 1,
  };

  const interviews = dashboardData?.interviews || {
    total: 5,
    completed: 4,
    averageScore: 78,
    latestScore: 84,
  };

  const learning = dashboardData?.learning || {
    dsaSolved: 142,
    quizScore: 86,
    progress: 72,
  };

  const resume = dashboardData?.resume || {
    created: true,
    completed: true,
    hasProjects: true,
  };

  // Modern EdTech dashboard mock data sections
  const dsaStats = {
    totalTarget: 250,
    easy: { solved: 75, total: 100 },
    medium: { solved: 52, total: 100 },
    hard: { solved: 15, total: 50 },
    topics: [
      { name: "Arrays & Hashing", progress: 90 },
      { name: "Binary Search & Trees", progress: 75 },
      { name: "Dynamic Programming", progress: 45 },
      { name: "Graphs & BFS/DFS", progress: 60 },
    ],
  };

  const activeCourse = {
    title: "Mastering System Design & Distributed Systems",
    instructor: "Dr. Aris Vance",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    completedLessons: 18,
    totalLessons: 24,
    nextLesson: "Lesson 19: Microservices Architecture & API Gateways",
    timeRemaining: "45 mins left",
  };

  const quizStats = {
    totalAttempted: 14,
    avgScore: 86,
    passRate: 92,
    recentScore: "95% in OS & System Concepts",
  };

  const resumeStatus = {
    score: 88,
    completionPercent: 90,
    checklist: [
      { label: "Personal & Contact Info", done: true },
      { label: "Education & Degree", done: true },
      { label: "Technical Skills", done: true },
      { label: "Projects & GitHub Links", done: true },
      { label: "Work Experience", done: resume.hasProjects },
      { label: "Certifications", done: false },
    ],
  };

  const recommendedJobs = [
    {
      id: 1,
      title: "Frontend Software Engineer Intern",
      company: "Stripe",
      location: "Bengaluru, IN (Hybrid)",
      type: "Full-time Internship",
      stipend: "₹65,000 / month",
      matchScore: 94,
      tags: ["React", "TypeScript", "Tailwind CSS"],
    },
    {
      id: 2,
      title: "Associate Software Engineer - SDE 1",
      company: "Atlassian",
      location: "Remote / Bengaluru",
      type: "Full-time",
      stipend: "₹18 - 22 LPA",
      matchScore: 89,
      tags: ["Java", "Data Structures", "Node.js"],
    },
    {
      id: 3,
      title: "Graduate Backend Engineer",
      company: "Razorpay",
      location: "Gurugram, IN",
      type: "Full-time",
      stipend: "₹16 - 20 LPA",
      matchScore: 85,
      tags: ["Node.js", "SQL", "Redis"],
    },
  ];

  const careerRecommendations = [
    {
      title: "Full-Stack Web Development Path",
      match: "95% Match",
      desc: "Strong foundation in React & Node.js. Recommended next topic: Next.js Server Components.",
      actionText: "Explore Path",
      link: "/student/career",
    },
    {
      title: "System Design & Cloud Architecture",
      match: "88% Match",
      desc: "Boost your backend readiness. Recommended topic: Distributed Caching with Redis.",
      actionText: "Start Learning",
      link: "/student/courses",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "dsa",
      title: "Solved Medium DSA Problem: 'Lowest Common Ancestor in Binary Tree'",
      time: "2 hours ago",
      icon: Code2,
      badge: "+25 XP",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      id: 2,
      type: "quiz",
      title: "Completed Assessment: 'DBMS & SQL Query Optimization' - Scored 92%",
      time: "Yesterday",
      icon: FileCheck2,
      badge: "Passed",
      badgeColor: "bg-green-50 text-green-700 border-green-200",
    },
    {
      id: 3,
      type: "interview",
      title: "Completed AI Mock Interview: 'React & Frontend Core Architecture'",
      time: "2 days ago",
      icon: Bot,
      badge: "Score 84/100",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      id: 4,
      type: "resume",
      title: "Updated Resume Projects: Added 'PlacePrep AI Placement Platform'",
      time: "3 days ago",
      icon: FileText,
      badge: "Resume 88%",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-gray-500">Loading student dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1: Welcome Header Section
          ══════════════════════════════════════════════════════════════════ */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs relative overflow-hidden">
        {/* Subtle accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl shrink-0 shadow-xs">
              {user.name?.charAt(0)?.toUpperCase() || "S"}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  Welcome back, {user.name?.split(" ")[0]}!
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Flame className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                  12 Day Streak
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                You're on track for campus placements. Keep up your continuous practice!
              </p>
            </div>
          </div>

          {/* Quick Action Shortcuts & Profile Completion */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 border-t lg:border-t-0 border-gray-100 pt-4 lg:pt-0">
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex items-center gap-3">
              <div className="text-right">
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Placement Readiness
                </p>
                <p className="text-lg font-bold text-blue-600 leading-tight">
                  {learning.progress}%
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
                    strokeDashoffset={113 - (113 * learning.progress) / 100}
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
          SECTION 2: Key Overview Stat Cards
          ══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: DSA Problems */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:border-blue-200 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              DSA Solved
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-gray-900">{learning.dsaSolved}</p>
            <span className="text-xs text-gray-500 font-medium">Target: {dsaStats.totalTarget}</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full"
              style={{ width: `${(learning.dsaSolved / dsaStats.totalTarget) * 100}%` }}
            />
          </div>
        </div>

        {/* Card 2: Average Quiz Score */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:border-blue-200 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Quiz Average
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-gray-900">{learning.quizScore}%</p>
            <span className="text-xs text-emerald-600 font-semibold">{quizStats.totalAttempted} Tests Taken</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full"
              style={{ width: `${learning.quizScore}%` }}
            />
          </div>
        </div>

        {/* Card 3: AI Interview Score */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:border-blue-200 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              AI Interview Avg
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-gray-900">{interviews.averageScore}%</p>
            <span className="text-xs text-purple-600 font-semibold">Latest: {interviews.latestScore}%</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-purple-600 h-full rounded-full"
              style={{ width: `${interviews.averageScore}%` }}
            />
          </div>
        </div>

        {/* Card 4: Resume Status */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:border-blue-200 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Resume ATS Score
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-gray-900">{resumeStatus.score}/100</p>
            <span className="text-xs text-amber-700 font-semibold">ATS Optimized</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full"
              style={{ width: `${resumeStatus.score}%` }}
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3: Continue Learning & DSA Breakdown
          ══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Active Course Card (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold text-gray-900">Continue Learning</h2>
              </div>
              <Link
                to="/student/courses"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View all courses <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Course Card Details */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-full sm:w-36 h-24 rounded-lg bg-gray-200 overflow-hidden shrink-0 relative">
                <img
                  src={activeCourse.thumbnail}
                  alt={activeCourse.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/90 text-blue-600 flex items-center justify-center shadow-md">
                    <Play className="w-4 h-4 fill-blue-600 ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  In Progress
                </span>
                <h3 className="text-sm font-bold text-gray-900 mt-1 truncate">
                  {activeCourse.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{activeCourse.instructor}</p>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs font-medium text-gray-600 mb-1">
                    <span>{activeCourse.completedLessons} of {activeCourse.totalLessons} Lessons</span>
                    <span>{Math.round((activeCourse.completedLessons / activeCourse.totalLessons) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{
                        width: `${(activeCourse.completedLessons / activeCourse.totalLessons) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="truncate">{activeCourse.nextLesson}</span>
            </div>
            <Link
              to="/student/courses"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition"
            >
              <span>Resume Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* DSA Progress Card (1 col) */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold text-gray-900">DSA Mastery</h2>
              </div>
              <Link to="/student/dsa" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                Practice
              </Link>
            </div>

            {/* Difficulty Bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-emerald-700 font-semibold">Easy</span>
                  <span className="text-gray-600">{dsaStats.easy.solved} / {dsaStats.easy.total}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(dsaStats.easy.solved / dsaStats.easy.total) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-amber-700 font-semibold">Medium</span>
                  <span className="text-gray-600">{dsaStats.medium.solved} / {dsaStats.medium.total}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(dsaStats.medium.solved / dsaStats.medium.total) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-red-700 font-semibold">Hard</span>
                  <span className="text-gray-600">{dsaStats.hard.solved} / {dsaStats.hard.total}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full rounded-full" style={{ width: `${(dsaStats.hard.solved / dsaStats.hard.total) * 100}%` }} />
                </div>
              </div>
            </div>

            {/* Top Topics List */}
            <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Top Topics</p>
              {dsaStats.topics.map((t) => (
                <div key={t.name} className="flex items-center justify-between text-xs text-gray-700">
                  <span className="truncate">{t.name}</span>
                  <span className="font-semibold text-blue-600 ml-2">{t.progress}%</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/student/dsa"
            className="mt-4 w-full py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 text-center block transition"
          >
            Solve Today's Problem
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4: Quiz Stats, Resume Completion, & AI Interview Status
          ══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Quizzes & Assessments */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileCheck2 className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-gray-900">Quiz & Assessments</h2>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4 text-center mb-4">
              <p className="text-2xl font-bold text-emerald-700">{quizStats.avgScore}%</p>
              <p className="text-xs text-emerald-800 font-medium mt-0.5">Average Assessment Score</p>
            </div>

            <ul className="space-y-2.5 text-xs text-gray-600">
              <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span>Assessments Completed</span>
                <span className="font-semibold text-gray-900">{quizStats.totalAttempted}</span>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span>Pass Rate</span>
                <span className="font-semibold text-emerald-600">{quizStats.passRate}%</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Latest Activity</span>
                <span className="font-semibold text-gray-900 truncate max-w-[140px]">{quizStats.recentScore}</span>
              </li>
            </ul>
          </div>

          <Link
            to="/student/quiz"
            className="mt-4 w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold text-center block transition"
          >
            Take Assessment
          </Link>
        </div>

        {/* Resume Status */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold text-gray-900">Resume Builder</h2>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                {resumeStatus.completionPercent}% Complete
              </span>
            </div>

            <div className="space-y-2">
              {resumeStatus.checklist.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">{item.label}</span>
                  {item.done ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md">Pending</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/student/resume"
            className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold text-center block transition shadow-xs"
          >
            Edit Resume
          </Link>
        </div>

        {/* AI Mock Interview */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-gray-900">AI Mock Interview</h2>
            </div>

            <div className="bg-purple-50/60 border border-purple-100 rounded-xl p-4 text-center mb-4">
              <p className="text-2xl font-bold text-purple-700">{interviews.averageScore}/100</p>
              <p className="text-xs text-purple-800 font-medium mt-0.5">Average Performance Score</p>
            </div>

            <div className="space-y-2.5 text-xs text-gray-600">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span>Interviews Attempted</span>
                <span className="font-semibold text-gray-900">{interviews.total}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span>Completed Rounds</span>
                <span className="font-semibold text-purple-600">{interviews.completed}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Communication Score</span>
                <span className="font-semibold text-emerald-600">85%</span>
              </div>
            </div>
          </div>

          <Link
            to="/student/interview"
            className="mt-4 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold text-center block transition shadow-xs"
          >
            Start New AI Interview
          </Link>
        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 5: Recommended Jobs & Career Guidance
          ══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recommended Jobs (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-gray-900">Recommended Jobs & Internships</h2>
            </div>
            <Link to="/student/jobs" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              Browse all jobs <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recommendedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-gray-50 hover:bg-blue-50/40 border border-gray-200 hover:border-blue-200 rounded-xl p-4 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-gray-900">{job.title}</h3>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      {job.matchScore}% Match
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    <span className="font-semibold text-gray-800">{job.company}</span> • {job.location}
                  </p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-[11px] font-medium text-gray-600 bg-white border border-gray-200 px-2 py-0.5 rounded-md">
                      {job.stipend}
                    </span>
                    {job.tags.map((tag) => (
                      <span key={tag} className="text-[11px] text-gray-500 bg-gray-200/60 px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to="/student/jobs"
                  className="inline-flex items-center justify-center gap-1 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition shrink-0"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Career & Skill Recommendations (1 col) */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-gray-900">Career Guidance</h2>
            </div>

            <div className="space-y-3">
              {careerRecommendations.map((item, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                      {item.match}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-gray-900 mt-2">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 mt-2"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/student/career"
            className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-semibold text-center block transition"
          >
            View Full Career Roadmap
          </Link>
        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 6: Recent Activity Feed
          ══════════════════════════════════════════════════════════════════ */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-gray-900">Recent Activity</h2>
          </div>
          <span className="text-xs text-gray-400">Updated in real-time</span>
        </div>

        <div className="divide-y divide-gray-100">
          {recentActivities.map((act) => {
            const IconComponent = act.icon;
            return (
              <div key={act.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">{act.title}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{act.time}</p>
                  </div>
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border shrink-0 ${act.badgeColor}`}>
                  {act.badge}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;