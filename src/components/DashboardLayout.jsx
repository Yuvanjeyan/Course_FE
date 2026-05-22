import Navbar from "./Navbar";

import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;