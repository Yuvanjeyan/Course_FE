import { useEffect, useState } from "react";
import { getEnrolledCourses } from "../services/courseService";
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";

function EnrolledCoursesPage() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getEnrolledCourses();
        setCourses(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadCourses();
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Your Learning Library</p>
            <h1 className="text-4xl font-semibold mt-2">Enrolled Courses</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden">
              <div className="h-40 bg-gradient-to-r from-sky-500 to-indigo-600 flex items-end p-5 text-white">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em]">{course.instructor?.name}</p>
                  <h2 className="text-2xl font-semibold mt-2">{course.title}</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{course.description}</p>
                <button
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
                >
                  View Course
                </button>
              </div>
            </div>
          ))}
          {courses.length === 0 && (
            <div className="col-span-full bg-white p-10 rounded-3xl shadow border border-gray-200 text-center">
              <p className="text-gray-500">You are not enrolled in any courses yet. Explore the student dashboard to join new classes.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EnrolledCoursesPage;
