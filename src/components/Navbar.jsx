import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const getRoleBadgeColor = () => {
    switch (userInfo?.role) {
      case "admin":
        return "bg-red-500/20 text-red-200";
      case "teacher":
        return "bg-blue-500/20 text-blue-200";
      case "student":
        return "bg-green-500/20 text-green-200";
      default:
        return "bg-gray-500/20 text-gray-200";
    }
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-8 py-5 flex justify-between items-center shadow-2xl border-b border-slate-700">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-bold">📚</div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Learning Platform</h1>
          <p className="text-xs text-slate-400 tracking-widest mt-1">Professional Training & Development</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right border-r border-slate-600 pr-6">
          <p className="font-semibold text-lg text-white">{userInfo?.name}</p>
          <p className={`text-xs uppercase tracking-[0.2em] font-medium mt-1 px-3 py-1 rounded-full w-fit ${getRoleBadgeColor()}`}>
            {userInfo?.role}
          </p>
        </div>

        <button
          onClick={logoutHandler}
          className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:from-red-700 hover:to-red-800 transition-all duration-200"
        >
          🚪 Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
