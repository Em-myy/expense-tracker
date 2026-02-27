import { useState } from "react";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdErrorOutline,
} from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError("Incorrect email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,179,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-[-10%] left-[-5%] w-125 h-125 rounded-full bg-blue-600 opacity-10 blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-150 h-150 rounded-full bg-amber-500 opacity-10 blur-[140px] animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Floating sparkles */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-400 opacity-20"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + ((i * 17) % 60)}%`,
              animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* NavBar */}
      <div className="relative z-20">
        <NavBar />
      </div>

      {/* Login Card */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-73px)] px-4 py-12">
        <div
          className="w-full max-w-md"
          style={{
            animation: "slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
          }}
        >
          {/* Card */}
          <div className="relative rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-md p-8 md:p-10 overflow-hidden">
            {/* Inner glow */}
            <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 via-transparent to-blue-500/5 pointer-events-none rounded-3xl" />

            {/* Header */}
            <div className="text-center mb-8">
              {/* Mini logo icon */}
              <div className="flex justify-center mb-4">
                <div className="relative w-14 h-14">
                  <svg
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <path
                      d="M18 2L32 10V26L18 34L4 26V10L18 2Z"
                      fill="url(#hexGradLogin)"
                      stroke="rgba(245,158,11,0.4)"
                      strokeWidth="0.5"
                    />
                    <rect
                      x="9"
                      y="20"
                      width="3"
                      height="7"
                      rx="1"
                      fill="rgba(15,23,42,0.9)"
                    />
                    <rect
                      x="14"
                      y="15"
                      width="3"
                      height="12"
                      rx="1"
                      fill="rgba(15,23,42,0.9)"
                    />
                    <rect
                      x="19"
                      y="11"
                      width="3"
                      height="16"
                      rx="1"
                      fill="rgba(15,23,42,0.9)"
                    />
                    <rect
                      x="24"
                      y="17"
                      width="3"
                      height="10"
                      rx="1"
                      fill="rgba(15,23,42,0.9)"
                    />
                    <polyline
                      points="10.5,19 15.5,14 20.5,10 25.5,16"
                      stroke="#fbbf24"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <circle cx="20.5" cy="10" r="1.5" fill="#fbbf24" />
                    <defs>
                      <linearGradient
                        id="hexGradLogin"
                        x1="0"
                        y1="0"
                        x2="36"
                        y2="36"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop
                          offset="0%"
                          stopColor="#f59e0b"
                          stopOpacity="0.25"
                        />
                        <stop
                          offset="100%"
                          stopColor="#d97706"
                          stopOpacity="0.1"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 rounded-full bg-amber-500 opacity-15 blur-lg" />
                </div>
              </div>

              <h1 className="text-3xl font-extrabold text-white mb-1">
                Welcome back
              </h1>
              <p className="text-slate-400 text-sm">
                Log in to your{" "}
                <span className="gold-text font-semibold">ExpenseTrack</span>{" "}
                account
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="mb-6 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm flex items-center gap-2"
                style={{ animation: "slideUp 0.3s ease both" }}
              >
                <MdErrorOutline className="w-4 h-4 shrink-0 text-lg" />
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-400">
                  Email Address
                </label>
                <div className="relative">
                  <MdEmail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="you@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-400">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <MdLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors duration-200 cursor-pointer"
                  >
                    {showPassword ? (
                      <MdVisibilityOff className="text-lg" />
                    ) : (
                      <MdVisibility className="text-lg" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="glow-btn w-full py-3.5 rounded-xl bg-amber-500 text-slate-900 font-bold text-sm tracking-wide mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <AiOutlineLoading3Quarters className="text-lg animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login to ExpenseTrack"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-slate-600 text-xs">or</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* Register Link */}
            <p className="text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-amber-500 font-semibold hover:text-amber-400 transition-colors duration-200"
              >
                Create one free →
              </Link>
            </p>
          </div>

          {/* Bottom note */}
          <p
            className="text-center text-xs text-slate-600 mt-6"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            🔒 Your data is encrypted & secure
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
