import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Menu,
  Bell,
  Search,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
} from "lucide-react";

function Navbar({ onToggleSidebar }) {
  const { isAuthenticated, user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-16 px-4 lg:px-8 flex items-center justify-between shadow-xs">
      {/* Left section: Mobile Toggle & Brand/Search */}
      <div className="flex items-center gap-3 lg:gap-6 flex-1 max-w-xl">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative flex-1 hidden sm:block max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search courses, DSA topics, assessments, jobs..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white text-gray-800 placeholder-gray-400 transition-all"
          />
        </div>
      </div>

      {/* Right section: Notifications & User Profile */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            {/* Target Status Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-xs font-semibold text-blue-700">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Target: SDE-1</span>
            </div>

            {/* Notification Bell */}
            <button
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-semibold text-gray-800 leading-tight">
                    {user?.name || "Student"}
                  </span>
                  <span className="text-[10px] text-gray-500 capitalize">
                    {user?.role || "Student"}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-20">
                    <div className="px-4 py-2 border-b border-gray-100 md:hidden">
                      <p className="text-xs font-semibold text-gray-800">{user?.name}</p>
                      <p className="text-[11px] text-gray-500">{user?.email}</p>
                    </div>

                    <Link
                      to="/student/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <User className="w-4 h-4 text-gray-400" />
                      <span>Profile & Settings</span>
                    </Link>

                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition duration-200"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;