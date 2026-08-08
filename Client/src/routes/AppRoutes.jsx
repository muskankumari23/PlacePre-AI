import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

import Dashboard from "../pages/student/Dashboard";
import Courses from "../pages/student/Courses";
import DSA from "../pages/student/DSA";
import Quiz from "../pages/student/Quiz";
import Resume from "../pages/student/Resume";
import Interview from "../pages/student/Interview";
import Jobs from "../pages/student/Jobs";

import MainLayout from "../components/layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* ── Public Routes ── */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* ── Protected Student Routes ── */}
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
        path="/student/jobs"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Jobs />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
