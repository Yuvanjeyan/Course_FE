import { Link } from "react-router-dom";

function Sidebar() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const NavLink = ({ to, children, icon }) => (
    <Link
      to={to}
      className="flex items-center gap-3 px-5 py-3 rounded-xl text-slate-200 hover:bg-slate-700 hover:text-white transition-all duration-200 font-medium group"
    >
      <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
      <span>{children}</span>
    </Link>
  );

  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white p-6 shadow-2xl border-r border-slate-700 flex flex-col">
      <div className="mb-8 pb-6 border-b border-slate-700">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Learning Suite</h2>
        <p className="text-xs text-slate-400 mt-2 tracking-widest">NAVIGATION HUB</p>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        <div className="mb-4">
          <p className="text-xs uppercase text-slate-500 font-bold px-5 mb-3 tracking-widest">General</p>
          <NavLink to="/profile" icon="👤">
            My Profile
          </NavLink>
        </div>

        {userInfo?.role === "admin" && (
          <div className="mb-4">
            <p className="text-xs uppercase text-red-400 font-bold px-5 mb-3 tracking-widest">Admin</p>
            <NavLink to="/admin" icon="⚙️">
              Admin Dashboard
            </NavLink>
          </div>
        )}

        {(userInfo?.role === "teacher" || userInfo?.role === "admin") && (
          <div className="mb-4">
            <p className="text-xs uppercase text-blue-400 font-bold px-5 mb-3 tracking-widest">Teaching</p>
            <NavLink to="/teacher" icon="🎓">
              Create Courses
            </NavLink>
            <NavLink to="/attendance" icon="📋">
              Attendance
            </NavLink>
          </div>
        )}

        {userInfo?.role === "student" && (
          <div className="mb-4">
            <p className="text-xs uppercase text-green-400 font-bold px-5 mb-3 tracking-widest">Learning</p>
            <NavLink to="/student" icon="📚">
              Browse Courses
            </NavLink>
            <NavLink to="/student/enrolled" icon="✅">
              My Courses
            </NavLink>
            <NavLink to="/certificate" icon="🏆">
              Certificates
            </NavLink>
          </div>
        )}

        {(userInfo?.role === "student" || userInfo?.role === "teacher") && (
          <div className="mb-4">
            <p className="text-xs uppercase text-purple-400 font-bold px-5 mb-3 tracking-widest">Assessment</p>
            <NavLink to="/quiz" icon="❓">
              Quiz Center
            </NavLink>
          </div>
        )}
      </nav>

      <div className="border-t border-slate-700 pt-4 mt-4">
        <div className="bg-slate-700/50 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-2">Logged in as:</p>
          <p className="font-semibold text-sm text-slate-100">{userInfo?.name}</p>
          <p className="text-xs text-slate-400 mt-1">Role: {userInfo?.role}</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
