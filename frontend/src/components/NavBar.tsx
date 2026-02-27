import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 w-full border-b border-slate-800/60 bg-[#0a0f1e]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          {/* SVG Icon */}
          <div className="relative w-9 h-9">
            <svg
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Outer hexagon */}
              <path
                d="M18 2L32 10V26L18 34L4 26V10L18 2Z"
                fill="url(#hexGrad)"
                stroke="rgba(245,158,11,0.4)"
                strokeWidth="0.5"
              />
              {/* Chart bars inside */}
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
              {/* Trend line */}
              <polyline
                points="10.5,19 15.5,14 20.5,10 25.5,16"
                stroke="#fbbf24"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Dot on trend line peak */}
              <circle cx="20.5" cy="10" r="1.5" fill="#fbbf24" />
              <defs>
                <linearGradient
                  id="hexGrad"
                  x1="0"
                  y1="0"
                  x2="36"
                  y2="36"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
            {/* Glow behind icon */}
            <div className="absolute inset-0 rounded-full bg-amber-500 opacity-10 blur-md group-hover:opacity-25 transition-opacity duration-300" />
          </div>

          {/* Wordmark */}
          <div className="flex items-baseline gap-0.5 text-lg font-extrabold tracking-tight">
            <span className="text-white">Expense</span>
            <span className="gold-text">Track</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-slate-400 text-sm font-medium hover:text-white transition-colors duration-200"
          >
            Home
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg text-sm font-semibold text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white transition-all duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="glow-btn px-5 py-2 rounded-lg text-sm font-bold bg-amber-500 text-slate-900 tracking-wide"
          >
            Register
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-slate-400 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-slate-400 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-slate-400 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 pb-6 flex flex-col gap-4 border-t border-slate-800/60 pt-4">
          <Link
            to="/"
            className="text-slate-400 text-sm font-medium hover:text-white transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <div className="flex gap-3 pt-2">
            <Link
              to="/login"
              className="flex-1 text-center px-5 py-2 rounded-lg text-sm font-semibold text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white transition-all duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="glow-btn flex-1 text-center px-5 py-2 rounded-lg text-sm font-bold bg-amber-500 text-slate-900 tracking-wide"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
