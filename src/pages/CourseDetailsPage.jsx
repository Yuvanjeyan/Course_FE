import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { getCourseById } from "../services/courseService";
import BACKEND_URL from "../config/api";

function CourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadCourse();
  }, [id]);

  if (!course) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-gray-500">Loading course details...</div>
      </DashboardLayout>
    );
  }

  const backendUrl = BACKEND_URL || "http://localhost:5000";
  const materialUrl = course.material
    ? course.material.startsWith("http")
      ? course.material
      : `${backendUrl}${course.material}`
    : null;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-sky-500 p-10 text-white">
          <h1 className="text-5xl font-bold">{course.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-100">{course.description}</p>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-slate-200">Instructor: {course.instructor?.name}</p>
        </div>

        {materialUrl && (
          <div className="p-10">
            <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
              <video controls className="w-full h-[420px] bg-black" src={materialUrl}>
                <source src={materialUrl} />
                Your browser does not support video playback.
              </video>
            </div>
          </div>
        )}

        <div className="p-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="bg-slate-950 text-white p-8">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Course Overview</p>
                <h2 className="text-3xl font-semibold mt-4">Professional skill development for every learner</h2>
              </div>
              <div className="p-8">
                <p className="text-gray-600 leading-8">This course is ready to deliver interactive lessons, downloadable materials and multimedia presentations. Use the course workspace to access the lecture viewer, quizzes, attendance tracking and certificate tools.</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-gray-200 p-5">
                    <p className="text-sm text-gray-500">Students enrolled</p>
                    <p className="text-3xl font-semibold mt-2">{course.students.length}</p>
                  </div>
                  <div className="rounded-3xl border border-gray-200 p-5">
                    <p className="text-sm text-gray-500">Course ID</p>
                    <p className="text-3xl font-semibold mt-2">{course._id.slice(0, 8)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-gray-200 p-8 shadow-sm bg-slate-50">
            <h3 className="text-xl font-semibold mb-4">Course Actions</h3>
            <button
              onClick={() => navigate(`/watch/${course._id}`)}
              className="w-full bg-blue-600 text-white py-3 rounded-xl mb-4 hover:bg-blue-700"
            >
              Open Video Player
            </button>
            <button
              onClick={() => navigate("/quiz")}
              className="w-full border border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CourseDetailsPage;
