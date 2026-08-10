import { Routes, Route } from "react-router-dom";

// Public pages
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

// Student pages
import Dashboard from "../pages/student/Dashboard";
import Courses from "../pages/student/Courses";
import DSA from "../pages/student/DSA";
import Quiz from "../pages/student/Quiz";
import Resume from "../pages/student/Resume";
import Interview from "../pages/student/Interview";
import Career from "../pages/student/Career";
import Jobs from "../pages/student/Jobs";
import Skills from "../pages/student/Skills";
import Leaderboard from "../pages/student/Leaderboard";
import Profile from "../pages/student/Profile";

// Layout & Protected Route
import MainLayout from "../components/layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Student Routes */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/courses"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Courses />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/dsa"
        element={
          <ProtectedRoute>
            <MainLayout>
              <DSA />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/quiz"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Quiz />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/resume"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Resume />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/interview"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Interview />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/career"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Career />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/jobs"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Jobs />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/skills"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Skills />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/leaderboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Leaderboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;