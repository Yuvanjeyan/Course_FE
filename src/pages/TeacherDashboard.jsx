import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";

import {
  createCourse, 
  getMyCourses,
  updateCourse,
  deleteCourse,
} from "../services/courseService";

function TeacherDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState(null);
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await getMyCourses();
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("material", material);

    try {
      await createCourse(formData);
      alert("Course Created");
      setTitle("");
      setDescription("");
      setMaterial(null);
      loadCourses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      return;
    }

    try {
      await deleteCourse(id);
      alert("✓ Course deleted successfully!");
      loadCourses();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error("Delete error:", message);
      alert(`Failed to delete course:\n${message}`);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setTitle(course.title);
    setDescription(course.description);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingCourse) return;

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (material) {
        formData.append("material", material);
      }

      await updateCourse(editingCourse._id, formData);
      setEditingCourse(null);
      setTitle("");
      setDescription("");
      setMaterial(null);
      loadCourses();
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Teacher Workspace</p>
            <h1 className="text-4xl font-bold mt-3">Create and Manage Courses</h1>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="bg-white rounded-3xl border-2 border-indigo-100 shadow-xl p-8">
            <div className="mb-6 pb-4 border-b-2 border-indigo-100">
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Course Publisher</p>
              <h2 className="text-3xl font-bold mt-2 text-gray-900">{editingCourse ? "📝 Update Course" : "➕ New Course"}</h2>
            </div>
            <form onSubmit={editingCourse ? handleUpdate : handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                <input
                  type="text"
                  placeholder="e.g., Advanced React Development"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border-2 border-indigo-100 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Describe what students will learn..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border-2 border-indigo-100 rounded-2xl px-5 py-4 h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Material (Video)</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setMaterial(e.target.files[0])}
                    className="w-full border-2 border-dashed border-indigo-300 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-indigo-600 file:text-white file:cursor-pointer file:font-medium hover:file:bg-indigo-700"
                  />
                  {material && <p className="text-sm text-green-600 mt-2">✓ File selected: {material.name}</p>}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-lg"
              >
                {editingCourse ? (saving ? "💾 Saving..." : "💾 Save Changes") : "🚀 Create Course"}
              </button>
              {editingCourse && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingCourse(null);
                    setTitle("");
                    setDescription("");
                    setMaterial(null);
                  }}
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-2xl font-medium hover:bg-gray-50 transition-all"
                >
                  ✕ Cancel Edit
                </button>
              )}
            </form>
          </div>

          <div className="space-y-5">
            {courses.map((course) => (
              <div key={course._id} className="bg-white rounded-3xl border-2 border-indigo-100 shadow-lg hover:shadow-xl hover:border-indigo-300 transition-all duration-200 overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-6 text-white flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-indigo-100">Your Course</p>
                    <h3 className="text-3xl font-bold mt-2">{course.title}</h3>
                  </div>
                  <p className="text-sm text-indigo-100">{course.students.length} students enrolled</p>
                </div>
                <div className="p-6 border-t-2 border-indigo-50">
                  <p className="text-gray-700 mb-5 line-clamp-2 leading-relaxed">{course.description}</p>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    <button
                      onClick={() => handleEdit(course)}
                      className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-medium hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                    >
                      ✏️ Edit Course
                    </button>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="flex-1 sm:flex-none bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-2xl font-medium hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-200"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {courses.length === 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border-2 border-dashed border-blue-300 p-12 text-center">
                <p className="text-lg text-gray-600 mb-2">No courses created yet.</p>
                <p className="text-gray-500">Use the form on the left to publish your first professional course.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default TeacherDashboard;
