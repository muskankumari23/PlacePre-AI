import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ─────────────────────────────────────────────
// ProtectedRoute — Route guard component
//
// If loading → show a centered spinner
// If not authenticated → redirect to /login
// If authenticated → render children
// ─────────────────────────────────────────────

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  // Still checking stored token on mount
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Not logged in — redirect
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated — render page
  return children;
}

export default ProtectedRoute;
