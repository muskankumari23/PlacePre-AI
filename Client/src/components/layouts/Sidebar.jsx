import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/student/dashboard" },
    { label: "Courses", path: "/student/courses" },
    { label: "DSA", path: "/student/dsa" },
    { label: "Quiz", path: "/student/quiz" },
    { label: "Resume", path: "/student/resume" },
    { label: "Interview", path: "/student/interview" },
    { label: "Jobs", path: "/student/jobs" },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-8">
          Student Panel
        </h2>

        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-4 py-2.5 rounded-lg text-sm transition duration-200 ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout button at the bottom */}
      <button
        onClick={logout}
        className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg text-sm font-medium transition duration-300 cursor-pointer"
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;