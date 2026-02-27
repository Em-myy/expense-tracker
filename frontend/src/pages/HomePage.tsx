import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white overflow-hidden font-sans">
      {/* Animated background grid */}
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
          className="absolute top-[40%] left-[50%] w-75 h-75 rounded-full bg-indigo-500 opacity-5 blur-[100px] animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Floating sparkles */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-amber-400 opacity-30"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + ((i * 17) % 60)}%`,
              animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20">
        <NavBar />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-32">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm mb-8"
          style={{
            animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span style={{ fontFamily: "'DM Mono', monospace" }}>
            Smart Financial Tracking
          </span>
        </div>

        <h1 className="hero-title text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6 max-w-4xl">
          Take Control of <span className="gold-text">Every Naira</span> You
          Spend
        </h1>

        <p className="hero-sub text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Track expenses effortlessly, visualize spending patterns, and make
          smarter financial decisions — all in one elegant dashboard.
        </p>

        <div className="hero-cta flex flex-wrap gap-4 mb-20">
          <Link
            to="/login"
            className="glow-btn px-8 py-3.5 rounded-xl bg-amber-500 text-slate-900 font-bold text-base tracking-wide"
          >
            Get Started
          </Link>
        </div>

        {/* Stat Cards */}
        <div className="hero-cards grid grid-cols-2 gap-4 mb-24">
          {[
            { label: "Avg. Monthly Savings", value: "₦45,000", delay: "0.2s" },
            { label: "Accuracy Rate", value: "99.9%", delay: "0.3s" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="stat-card p-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm"
              style={{ animationDelay: stat.delay }}
            >
              <div className="text-2xl md:text-3xl font-bold gold-text mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mock Dashboard Preview */}
        <div className="hero-cards relative rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-md p-6 md:p-8 mb-24 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-blue-900/10 via-transparent to-amber-900/10 pointer-events-none" />
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-amber-400 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-green-400 opacity-80" />
            <span
              className="ml-4 text-slate-600 text-sm"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              expense-tracker / dashboard
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Balance card */}
            <div className="md:col-span-2 p-5 rounded-2xl bg-linear-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/20">
              <p className="text-slate-400 text-sm mb-1">Total Balance</p>
              <p className="text-4xl font-extrabold text-white mb-3">
                ₦850,000
              </p>

              <div className="flex gap-6">
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Income</p>
                  <p className="text-green-400 font-bold">+₦320,000</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Expenses</p>
                  <p className="text-red-400 font-bold">-₦95,000</p>
                </div>
              </div>
            </div>
            {/* Recent expenses */}
            <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50">
              <p className="text-slate-400 text-sm mb-3">Recent</p>
              {[
                { name: "Groceries", amount: "-₦8,500", icon: "🛒" },
                { name: "Netflix", amount: "-₦4,600", icon: "📺" },
                { name: "Fuel", amount: "-₦15,000", icon: "⛽" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between py-2 border-b border-slate-700/40 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span className="text-slate-300 text-sm">{item.name}</span>
                  </div>
                  <span className="text-red-400 text-sm font-semibold">
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Chart bars */}
          <div className="mt-4 p-5 rounded-2xl bg-slate-800/30 border border-slate-700/30">
            <p className="text-slate-400 text-sm mb-4">
              Spending Overview — Feb 2025
            </p>
            <div className="flex items-end gap-3 h-20">
              {[60, 80, 45, 90, 55, 70, 40, 85, 60, 75, 50, 65].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-linear-to-t from-amber-600 to-amber-400 opacity-70"
                  style={{
                    height: `${h}%`,
                    animation: "countUp 0.5s ease both",
                    animationDelay: `${i * 0.07}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Everything you need to{" "}
            <span className="gold-text">spend smarter</span>
          </h2>
          <p className="text-slate-500 text-center mb-12">
            Built for clarity, speed, and financial confidence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: "📊",
                title: "Visual Analytics",
                desc: "Beautiful charts and breakdowns that make sense of your money at a glance.",
              },

              {
                icon: "🔒",
                title: "Bank-Grade Security",
                desc: "Your data is encrypted end-to-end. Your money story is yours alone.",
              },
              {
                icon: "📅",
                title: "Recurring Expenses",
                desc: "Automatically track subscriptions and monthly bills without lifting a finger.",
              },
            ].map((f, i) => (
              <div
                key={f.title}
                className="feature-card p-6 rounded-2xl border border-slate-800 bg-slate-900/40"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-white text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-20 p-10 rounded-3xl border border-amber-500/20 bg-linear-to-br from-amber-500/10 via-transparent to-blue-500/5 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)] pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Ready to track smarter?
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Register today and take your first step toward financial clarity.
          </p>
          <Link
            to="/register"
            className="glow-btn px-10 py-4 rounded-xl bg-amber-500 text-slate-900 font-bold text-lg tracking-wide"
          >
            Create Free Account
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 py-8 text-center text-slate-600 text-sm">
        <span style={{ fontFamily: "'DM Mono', monospace" }}>
          © 2025 ExpenseTracker. Built for clarity.
        </span>
      </footer>
    </div>
  );
};

export default HomePage;
