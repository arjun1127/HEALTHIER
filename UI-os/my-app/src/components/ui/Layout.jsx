import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Layout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-[#0B0C15] text-white app-noise">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <header className="flex flex-wrap justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-semibold">
              HealthyLife{" "}
              
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Welcome back, {user?.name || "User"} 👋
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <button
              onClick={() => navigate("/profile")}
              className="glass px-4 py-2 text-sm rounded-lg border border-white/10"
            >
              Profile
            </button>

            <div className="gradient-border p-1px rounded-lg">
              <button
                onClick={handleLogout}
                className="glass px-4 py-2 text-sm rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main>
          <Outlet />
        </main>

      </div>
    </div>
  );
}
