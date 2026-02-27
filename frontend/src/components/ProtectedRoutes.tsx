import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

type protectedRoutesType = {
  children: ReactNode;
};

const ProtectedRoutes = ({ children }: protectedRoutesType) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex flex-col items-center justify-center gap-6">
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

        {/* Loader content */}
        <div className="relative z-10 flex flex-col items-center gap-5">
          {/* Logo icon */}
          <div className="relative w-16 h-16">
            <svg
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M18 2L32 10V26L18 34L4 26V10L18 2Z"
                fill="url(#hexGradLoader)"
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
                  id="hexGradLoader"
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
            {/* Pulsing glow behind logo */}
            <div className="absolute inset-0 rounded-full bg-amber-500 opacity-20 blur-xl animate-pulse" />
          </div>

          {/* Spinning ring */}
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-slate-800" />
            <div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-500 animate-spin"
              style={{ animationDuration: "0.8s" }}
            />
          </div>

          {/* Text */}
          <div className="text-center space-y-1">
            <p className="text-white font-semibold text-sm tracking-wide">
              Loading your dashboard
            </p>
            <p
              className="text-slate-500 text-xs"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Verifying session...
            </p>
          </div>

          {/* Animated dots */}
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-60"
                style={{
                  animation: "pulse 1.2s ease-in-out infinite",
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
