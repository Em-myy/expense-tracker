import { useState } from "react";
import axiosClient from "../api/axios";
import NavBar from "../components/NavBar";
import { useNavigate, Link } from "react-router-dom";
import {
  MdPerson,
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdErrorOutline,
  MdCheckCircle,
} from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type userRegister = {
  username: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const [form, setForm] = useState<userRegister>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axiosClient.post("/authentication/register", form);
      setForm({ username: "", email: "", password: "" });
      navigate("/login");
    } catch (error) {
      setError("Registration failed. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return null;
    if (password.length < 6)
      return {
        label: "Weak",
        color: "bg-red-500",
        width: "w-1/4",
        textColor: "text-red-400",
      };
    if (password.length < 10)
      return {
        label: "Fair",
        color: "bg-amber-500",
        width: "w-2/4",
        textColor: "text-amber-400",
      };
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password))
      return {
        label: "Good",
        color: "bg-yellow-400",
        width: "w-3/4",
        textColor: "text-yellow-400",
      };
    return {
      label: "Strong",
      color: "bg-green-500",
      width: "w-full",
      textColor: "text-green-400",
    };
  };

  const strength = getPasswordStrength(form.password);

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
        <div
          className="absolute top-[40%] left-[40%] w-75 h-75 rounded-full bg-indigo-500 opacity-5 blur-[100px] animate-pulse"
          style={{ animationDelay: "3s" }}
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

      {/* Register Card */}
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
                      fill="url(#hexGradRegister)"
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
                        id="hexGradRegister"
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
                Create an account
              </h1>
              <p className="text-slate-400 text-sm">
                Join{" "}
                <span className="gold-text font-semibold">ExpenseTrack</span>{" "}
                and take control of your finances
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="mb-6 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm flex items-center gap-2"
                style={{ animation: "slideUp 0.3s ease both" }}
              >
                <MdErrorOutline className="text-lg shrink-0" />
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username Field */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-400">
                  Username
                </label>
                <div className="relative">
                  <MdPerson className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    placeholder="john doe"
                    onChange={handleFormChange}
                    required
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-all duration-200"
                  />
                  {/* Checkmark when filled */}
                  {form.username.length > 2 && (
                    <MdCheckCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-400 text-lg" />
                  )}
                </div>
              </div>

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
                    value={form.email}
                    placeholder="you@example.com"
                    onChange={handleFormChange}
                    required
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-all duration-200"
                  />
                  {/* Checkmark when valid email */}
                  {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && (
                    <MdCheckCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-400 text-lg" />
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-400">
                  Password
                </label>
                <div className="relative">
                  <MdLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    placeholder="••••••••"
                    onChange={handleFormChange}
                    required
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <MdVisibilityOff className="text-lg" />
                    ) : (
                      <MdVisibility className="text-lg" />
                    )}
                  </button>
                </div>

                {/* Password strength bar */}
                {strength && (
                  <div
                    className="space-y-1.5 pt-1"
                    style={{ animation: "fadeIn 0.3s ease both" }}
                  >
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${strength.color} ${strength.width}`}
                      />
                    </div>
                    <p className={`text-xs font-medium ${strength.textColor}`}>
                      {strength.label} password
                    </p>
                  </div>
                )}
              </div>

              {/* Terms */}
              <p className="text-xs text-slate-500 leading-relaxed">
                By registering, you agree to our{" "}
                <span className="text-amber-500 hover:text-amber-400 cursor-pointer transition-colors duration-200">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-amber-500 hover:text-amber-400 cursor-pointer transition-colors duration-200">
                  Privacy Policy
                </span>
                .
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="glow-btn w-full py-3.5 rounded-xl bg-amber-500 text-slate-900 font-bold text-sm tracking-wide mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <AiOutlineLoading3Quarters className="text-lg animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Free Account"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-slate-600 text-xs">or</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-amber-500 font-semibold hover:text-amber-400 transition-colors duration-200"
              >
                Login instead →
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

export default RegisterPage;
