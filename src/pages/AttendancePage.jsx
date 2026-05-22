import DashboardLayout from "../components/DashboardLayout";

function AttendancePage() {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-200 p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Attendance Module</p>
        <h1 className="text-4xl font-semibold mt-4 mb-6">Attendance & Participation</h1>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-500">Attendance Rate</p>
            <p className="text-4xl font-bold mt-3">92%</p>
          </div>
          <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-500">Classes Attended</p>
            <p className="text-4xl font-bold mt-3">23</p>
          </div>
          <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-500">Participation Score</p>
            <p className="text-4xl font-bold mt-3">88%</p>
          </div>
        </div>
        <div className="mt-8 text-gray-600 leading-8">
          <p>This module helps learners and instructors track regular attendance, improve participation, and establish a strong record for certification.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AttendancePage;
