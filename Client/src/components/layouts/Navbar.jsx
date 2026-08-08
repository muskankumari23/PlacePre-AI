import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        PlacePrep AI
      </Link>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span className="text-gray-600 text-sm">
              Hi, <span className="font-semibold">{user?.name}</span>
            </span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition duration-300 cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;