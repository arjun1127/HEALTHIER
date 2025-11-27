import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const res = await login(form);

    if (!res.success) {
      setError(res.error || "Login failed");
      return;
    }

    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen w-full bg-[#0B0C15] text-white flex relative overflow-hidden">

      {/* LIGHTING / BACKGROUND AURORA */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-8%] left-[-10%] w-[350px] h-[350px] bg-purple-700/20 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-cyan-500/20 blur-[160px] rounded-full"></div>
      </div>

      {/* LEFT PANEL (LOGIN FORM) */}
      <motion.div
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45 }}
        className="
          w-full md:w-[480px] min-h-screen px-12 py-16 
          flex flex-col justify-center relative
          border-r border-white/10
          backdrop-blur-2xl
          bg-[rgba(255,255,255,0.02)]
          shadow-[inset_0_0_50px_rgba(255,255,255,0.03),0_4px_30px_rgba(0,0,0,0.6)]
        "
      >
        {/* Glow edge */}
        <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-purple-500/20 via-transparent to-cyan-500/20"></div>

        <h1
          className="text-4xl font-semibold mb-6 leading-tight bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent"
        >
          Welcome Back
        </h1>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="block mb-1 text-sm text-slate-300">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="
                w-full p-3 rounded-lg bg-white/5 
                border border-white/10 
                text-white placeholder:text-slate-500
                focus:outline-none focus:ring-2 focus:ring-purple-500/60
                transition-all
              "
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block mb-1 text-sm text-slate-300">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="
                w-full p-3 rounded-lg bg-white/5 
                border border-white/10 
                text-white placeholder:text-slate-500
                focus:outline-none focus:ring-2 focus:ring-purple-500/60
                transition-all
              "
            />
          </div>

          {/* LOGIN BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="
              w-full py-3 rounded-lg font-semibold 
              bg-gradient-to-r from-purple-600 to-purple-500
              shadow-lg shadow-purple-900/40
              hover:shadow-purple-700/40 transition-all
            "
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {/* GOOGLE LOGIN */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => console.log("Google Login (Auth0)")}
          className="
            flex items-center justify-center gap-3 
            w-full py-3 mt-6 rounded-lg 
            bg-white text-black font-medium 
            shadow-md hover:bg-gray-100 transition
          "
        >
          <FcGoogle className="text-2xl" />
          Login with Google
        </motion.button>

        {/* SIGNUP NAVIGATION */}
        <p className="mt-6 text-slate-400 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-400 hover:underline">
            Create Account
          </Link>
        </p>
      </motion.div>

      {/* RIGHT VISUAL PANEL */}
      <div className="hidden md:flex flex-1 relative overflow-hidden">

        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700/10 via-purple-900/5 to-cyan-500/10"></div>

        {/* Glow spots */}
        <div className="absolute top-10 right-10 w-80 h-80 bg-purple-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-400/20 blur-[140px] rounded-full"></div>

        <div className="flex items-center justify-center w-full p-10">
          <h2 className="text-5xl font-bold text-slate-300 opacity-80 select-none leading-tight">
            HealthyLife <br />
            <span className="text-slate-600">AI</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
