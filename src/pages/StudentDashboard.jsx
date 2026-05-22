import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";

import { getCourses, enrollCourse } from "../services/courseService";

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEnroll = async (id) => {
    try {
      await enrollCourse(id);
      alert("Enrolled Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Student Hub</p>
            <h1 className="text-4xl font-bold mt-3">Explore Professional Courses</h1>
          </div>
          <div className="w-full md:w-96">
            <input
              type="text"
              placeholder="Search Courses"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-3xl px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {courses
            .filter((course) =>
              course.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
              >
                <div className="h-44 bg-gradient-to-r from-slate-900 via-blue-700 to-sky-500 p-6 text-white flex flex-col justify-end">
                  <p className="text-sm uppercase tracking-[0.2em] mb-2">{course.instructor?.name}</p>
                  <h2 className="text-2xl font-semibold">{course.title}</h2>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <button
                      onClick={() => handleEnroll(course._id)}
                      className="w-full md:w-auto bg-blue-600 text-white px-5 py-3 rounded-3xl hover:bg-blue-700"
                    >
                      Enroll Now
                    </button>
                    <button
                      onClick={() => navigate(`/course/${course._id}`)}
                      className="w-full md:w-auto border border-blue-600 text-blue-600 px-5 py-3 rounded-3xl hover:bg-blue-50"
                    >
                      Course Details
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {courses.filter((course) =>
            course.title.toLowerCase().includes(search.toLowerCase())
          ).length === 0 && (
            <div className="col-span-full bg-white rounded-3xl p-10 shadow border border-gray-200 text-center">
              <p className="text-gray-500">No courses match your search. Try a different keyword or explore later.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;
