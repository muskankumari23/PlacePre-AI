import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/student/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />

        <Route
          path="/student/courses"
          element={
            <MainLayout>
              <Courses />
            </MainLayout>
          }
        />

        <Route
          path="/student/dsa"
          element={
            <MainLayout>
              <DSA />
            </MainLayout>
          }
        />

        <Route
          path="/student/quiz"
          element={
            <MainLayout>
              <Quiz />
            </MainLayout>
          }
        />

        <Route
          path="/student/resume"
          element={
            <MainLayout>
              <Resume />
            </MainLayout>
          }
        />

        <Route
          path="/student/interview"
          element={
            <MainLayout>
              <Interview />
            </MainLayout>
          }
        />

        <Route
          path="/student/jobs"
          element={
            <MainLayout>
              <Jobs />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
