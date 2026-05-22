import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getEnrolledCourses, getMyCourses } from "../services/courseService";

function ProfilePage() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const [enrolledCount, setEnrolledCount] = useState(0);
  const [createdCount, setCreatedCount] = useState(0);

  useEffect(() => {
    const loadStats = async () => {
      try {
        if (userInfo.role === "student") {
          const enrolled = await getEnrolledCourses();
          setEnrolledCount(enrolled.length);
        }

        if (userInfo.role === "teacher" || userInfo.role === "admin") {
          const courses = await getMyCourses();
          setCreatedCount(courses.length);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadStats();
  }, [userInfo.role]);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-3xl bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
              {userInfo.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h1 className="text-4xl font-semibold mb-2">{userInfo.name}</h1>
              <p className="text-gray-600 mb-1">{userInfo.email}</p>
              <p className="uppercase text-sm tracking-[0.2em] text-blue-600 font-semibold">{userInfo.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm text-gray-500">Courses Enrolled</p>
              <p className="text-3xl font-bold mt-3">{enrolledCount}</p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm text-gray-500">Courses Created</p>
              <p className="text-3xl font-bold mt-3">{createdCount}</p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="text-3xl font-bold mt-3">{new Date(userInfo?.createdAt || Date.now()).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Professional Profile</h2>
          <p className="text-gray-600 leading-7">
            Welcome to your profile dashboard. Here you can track progress, access learning modules, and manage your course involvement with polished tools for students, teachers and administrators.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ProfilePage;
