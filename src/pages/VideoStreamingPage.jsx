import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { getCourseById } from "../services/courseService";
import BACKEND_URL from "../config/api";

function VideoStreamingPage() {
  const { id } = useParams();
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

  const backendUrl = BACKEND_URL || "http://localhost:5000";
  const materialUrl = course?.material
    ? course.material.startsWith("http")
      ? course.material
      : `${backendUrl}${course.material}`
    : null;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-200">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Video Learning</p>
          <h1 className="text-4xl font-semibold mt-4">{course?.title || "Loading course"}</h1>
          <p className="mt-4 text-gray-600">Experience a professional video learning environment, complete with polished controls, resources, and transcript-ready playback.</p>
        </div>

        <div className="bg-black rounded-3xl overflow-hidden shadow-2xl">
          {materialUrl ? (
            <video controls className="w-full max-h-[650px] bg-black" src={materialUrl}>
              <source src={materialUrl} />
              Your browser does not support video playback.
            </video>
          ) : (
            <div className="relative h-0" style={{ paddingBottom: "56.25%" }}>
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white text-xl">
                Video not available for this course.
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Course Material</h2>
            <p className="text-gray-600">{course?.material ? "Uploaded material is available inside this course." : "No uploaded video file available. Use the admin panel to attach lecture media."}</p>
          </div>
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Next Lecture</h2>
            <p className="text-gray-600">Introduction to the course and essential learning outcomes are presented in this module.</p>
          </div>
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Progress Tracker</h2>
            <p className="text-gray-600">Track your completed lessons and unlock certificates as you finish each session.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default VideoStreamingPage;
