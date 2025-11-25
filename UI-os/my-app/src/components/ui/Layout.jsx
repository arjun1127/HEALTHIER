// src/components/ui/Layout.jsx
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function Layout() {
  const [open, setOpen] = useState(true);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside
        className={`bg-white shadow-lg h-screen p-5 transition-all duration-300
        ${open ? "w-64" : "w-20"}`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className={`font-bold text-xl transition-all ${open ? "opacity-100" : "opacity-0"}`}>
            HealthyLife AI
          </h2>

          <button
            onClick={() => setOpen(!open)}
            className="text-gray-500 hover:text-black"
          >
            {open ? "<<" : ">>"}
          </button>
        </div>

        <nav className="space-y-3">
          <MenuItem to="/dashboard" label="Dashboard" open={open} />
          <MenuItem to="/food" label="Food" open={open} />
          <MenuItem to="/expense" label="Expenses" open={open} />
          <MenuItem to="/sleep" label="Sleep" open={open} />
          <MenuItem to="/activity" label="Activity" open={open} />
          <MenuItem to="/preferences" label="Preferences" open={open} />
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col">

        {/* NAVBAR */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">

          <p className="font-medium text-gray-600">
            Welcome, {user?.name || "User"} 👋
          </p>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* Sidebar item component */
function MenuItem({ to, label, open }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 rounded-lg font-medium transition 
        ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"}
      `
      }
    >
      <span className={`${open ? "inline-block" : "hidden"} ml-2`}>
        {label}
      </span>
    </NavLink>
  );
}
