import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ProfilePage from "./pages/ProfilePage";
import EnrolledCoursesPage from "./pages/EnrolledCoursesPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import VideoStreamingPage from "./pages/VideoStreamingPage";
import QuizPage from "./pages/QuizPage";
import AttendancePage from "./pages/AttendancePage";
import CertificatePage from "./pages/CertificatePage";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={["teacher", "admin"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher", "student"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/enrolled"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <EnrolledCoursesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/course/:id"
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher", "student"]}>
              <CourseDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/watch/:id"
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher", "student"]}>
              <VideoStreamingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz"
          element={
            <ProtectedRoute allowedRoles={["teacher", "student"]}>
              <QuizPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute allowedRoles={["teacher", "admin"]}>
              <AttendancePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/certificate"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CertificatePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
