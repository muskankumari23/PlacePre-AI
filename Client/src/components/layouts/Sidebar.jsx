import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  FileCheck2,
  FileText,
  Bot,
  Compass,
  Briefcase,
  TrendingUp,
  Trophy,
  UserCog,
  LogOut,
  Sparkles,
  X,
} from "lucide-react";

function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
    { label: "My Courses", path: "/student/courses", icon: BookOpen },
    { label: "DSA Practice", path: "/student/dsa", icon: Code2 },
    { label: "Quizzes & Assessments", path: "/student/quiz", icon: FileCheck2 },
    { label: "Resume Builder", path: "/student/resume", icon: FileText },
    { label: "AI Mock Interview", path: "/student/interview", icon: Bot },
    { label: "Career Guidance", path: "/student/career", icon: Compass },
    { label: "Jobs & Internships", path: "/student/jobs", icon: Briefcase },
    { label: "Skill Progress", path: "/student/skills", icon: TrendingUp },
    { label: "Leaderboard", path: "/student/leaderboard", icon: Trophy },
    { label: "Profile & Settings", path: "/student/profile", icon: UserCog },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Section */}
        <div className="flex flex-col min-h-0 flex-1">
          <div className="h-16 px-5 border-b border-gray-100 flex items-center justify-between shrink-0">
            <Link to="/student/dashboard" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-base leading-tight">
                  PlacePrep AI
                </span>
                <span className="text-[11px] text-blue-600 font-semibold tracking-wide uppercase">
                  Student Portal
                </span>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden text-gray-400 hover:text-gray-600 p-1 rounded-md"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto flex-1 scrollbar-thin">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-600 pl-2"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? "text-blue-600" : "text-gray-400"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer User Profile & Logout */}
        <div className="p-3 border-t border-gray-100 space-y-2 bg-gray-50/50 shrink-0">
          <Link
            to="/student/profile"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white border border-transparent hover:border-gray-200 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() || "S"}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-semibold text-xs text-gray-800 truncate">
                {user?.name || "Student"}
              </span>
              <span className="text-[11px] text-gray-500 truncate">
                {user?.email || "student@placeprep.ai"}
              </span>
            </div>
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-500 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;