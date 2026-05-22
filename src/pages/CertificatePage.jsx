import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function CertificatePage() {
  const [generated, setGenerated] = useState(false);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-200 p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Certificate Generator</p>
        <h1 className="text-4xl font-semibold mt-4 mb-6">Earn your course certificate</h1>
        <p className="text-gray-600 mb-8">Generate a polished completion certificate after finishing course activities and assessments.</p>
        <button
          onClick={() => setGenerated(true)}
          className="bg-blue-600 text-white py-4 px-8 rounded-3xl hover:bg-blue-700"
        >
          Generate Certificate
        </button>

        {generated && (
          <div className="mt-10 rounded-3xl border border-green-200 bg-green-50 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-green-800">Certificate Ready</h2>
            <p className="mt-3 text-gray-700">Your certificate has been generated successfully. Download it to share your achievement.</p>
            <div className="mt-6 rounded-3xl border border-white bg-white p-6 shadow-inner">
              <p className="text-gray-500 uppercase tracking-[0.3em] text-sm">Learning Platform</p>
              <h3 className="text-3xl font-bold mt-4">Professional Course Completion</h3>
              <p className="mt-3 text-gray-600">Awarded to the dedicated learner for successfully completing the course experience.</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default CertificatePage;
