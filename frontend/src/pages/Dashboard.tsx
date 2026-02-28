import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axiosClient from "../api/axios";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  MdAdd,
  MdLogout,
  MdFilterList,
  MdCalendarToday,
  MdCategory,
  MdDateRange,
  MdBarChart,
} from "react-icons/md";
import { BsArrowUpCircleFill, BsArrowDownCircleFill } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type expenseType = {
  _id: string;
  userId: string;
  title: string;
  amount: string;
  category: string;
  date: string;
};

type summaryType = {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
};

const Dashboard = () => {
  const [totalExpenses, setTotalExpenses] = useState<expenseType[]>([]);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [monthDate, setMonthDate] = useState<string>("");
  const [monthData, setMonthData] = useState<expenseType[]>([]);
  const [dayDate, setDayDate] = useState<string>("");
  const [dayData, setDayData] = useState<expenseType[]>([]);
  const [isCategory, setIsCategory] = useState<string>("income");
  const [categoryData, setCategoryData] = useState<expenseType[]>([]);
  const [monthFilter, setMonthFilter] = useState<boolean>(false);
  const [dayFilter, setDayFilter] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<boolean>(false);
  const [monthFilterMsg, setMonthFilterMsg] = useState<string>("");
  const [dayFilterMsg, setDayFilterMsg] = useState<string>("");
  const [categoryFilterMsg, setCategoryFilterMsg] = useState<string>("");
  const [summaryCategory, setSummaryCategory] = useState<string>("income");
  const [summaryData, setSummaryData] = useState<summaryType[]>([]);
  const [getSummary, setGetSummary] = useState<boolean>(false);
  const [summaryMsg, setSummaryMsg] = useState<string>("");
  const [summaryLoading, setSummaryLoading] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleDetails = (id: string) => {
    navigate(`/expensesDetails/${id}`);
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axiosClient.get("/expense/getExpenses");
        setTotalExpenses(res.data.expenses);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExpenses();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleMonthFilter = async (): Promise<void> => {
    const [year, month] = monthDate.split("-");
    setMonthFilterMsg("");
    try {
      const res = await axiosClient.get(
        `/expense/filter/month?year=${year}&month=${month}`,
      );
      setMonthData(res.data.results);
      setMonthFilter(true);
      setActiveFilter("month");
    } catch (error: any) {
      if (error.response) setMonthFilterMsg(error.response.data.msg);
      setMonthFilter(true);
    }
  };

  const handleDayFilter = async (): Promise<void> => {
    setDayFilterMsg("");
    try {
      const res = await axiosClient.get(`/expense/filter/date?date=${dayDate}`);
      setDayData(res.data.results);
      setDayFilter(true);
      setActiveFilter("day");
    } catch (error: any) {
      if (error.response) setDayFilterMsg(error.response.data.msg);
      setDayFilter(true);
    }
  };

  const handleCategoryFilter = async (): Promise<void> => {
    setCategoryFilterMsg("");
    try {
      const res = await axiosClient.get(
        `/expense/filter/category?category=${isCategory}`,
      );
      setCategoryData(res.data.results);
      setCategoryFilter(true);
      setActiveFilter("category");
    } catch (error: any) {
      if (error.response) setCategoryFilterMsg(error.response.data.msg);
      setCategoryFilter(true);
    }
  };

  const handleSummaryCategory = async (): Promise<void> => {
    setSummaryMsg("");
    setSummaryLoading(true);
    try {
      const res = await axiosClient.get(
        `/expense/summary?category=${summaryCategory}`,
      );
      setSummaryData(res.data.summary);
      setGetSummary(true);
    } catch (error: any) {
      if (error.response) setSummaryMsg(error.response.data.msg);
      setGetSummary(true);
    } finally {
      setSummaryLoading(false);
    }
  };

  const formatDate = (dateString: any) => {
    if (!dateString) return "";
    const date = new Date(String(dateString));
    if (isNaN(date.getTime())) return String(dateString);
    return date.toLocaleDateString("en-NG", { month: "short", day: "numeric" });
  };

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(Number(value) || 0);
  };

  // Totals
  const totalIncome = totalExpenses
    .filter((e) => e.category === "income")
    .reduce((sum, e) => sum + Number(e.amount), 0);
  const totalExpense = totalExpenses
    .filter((e) => e.category === "expense")
    .reduce((sum, e) => sum + Number(e.amount), 0);
  const netBalance = totalIncome - totalExpense;

  // Active filter results
  const activeResults =
    activeFilter === "month"
      ? monthData
      : activeFilter === "day"
        ? dayData
        : activeFilter === "category"
          ? categoryData
          : [];

  const activeMsg =
    activeFilter === "month"
      ? monthFilterMsg
      : activeFilter === "day"
        ? dayFilterMsg
        : activeFilter === "category"
          ? categoryFilterMsg
          : "";

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white overflow-x-hidden">
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

      {/* Top Header Bar */}
      <div className="relative z-20 border-b border-slate-800/60 bg-[#0a0f1e]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8">
              <svg
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M18 2L32 10V26L18 34L4 26V10L18 2Z"
                  fill="url(#hexDash)"
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
                    id="hexDash"
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
            </div>
            <span className="font-extrabold text-lg tracking-tight">
              <span className="text-white">Expense</span>
              <span className="gold-text">Track</span>
            </span>
          </Link>

          {/* Header actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/createExpenses"
              className="glow-btn hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-900 font-bold text-sm"
            >
              <MdAdd className="text-lg" />
              New Transaction
            </Link>
            <Link
              to="/createExpenses"
              className="md:hidden w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-900"
            >
              <MdAdd className="text-xl" />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer border border-slate-700 text-slate-400 text-sm font-semibold hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
            >
              <MdLogout className="text-lg" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-10 space-y-10">
        {/* Page title */}
        <div
          style={{
            animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
          }}
        >
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-1">
            Your Dashboard
          </h1>
          <p className="text-slate-500 text-sm">
            Track, filter, and analyze all your transactions in one place.
          </p>
        </div>

        {/* Summary stat cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          style={{
            animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both",
          }}
        >
          {/* Net Balance */}
          <div className="relative rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-sm p-6 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 to-transparent pointer-events-none rounded-2xl" />
            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-2">
              Net Balance
            </p>
            <p
              className={`text-3xl font-extrabold ${netBalance >= 0 ? "text-white" : "text-red-400"}`}
            >
              {formatCurrency(Math.abs(netBalance))}
            </p>
            <p className="text-xs text-slate-600 mt-1">
              {netBalance >= 0 ? "▲ Positive balance" : "▼ Negative balance"}
            </p>
          </div>

          {/* Total Income */}
          <div className="relative rounded-2xl border border-green-500/20 bg-slate-900/70 backdrop-blur-sm p-6 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-green-500/5 to-transparent pointer-events-none rounded-2xl" />
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                Total Income
              </p>
              <BsArrowUpCircleFill className="text-green-400 text-lg" />
            </div>
            <p className="text-3xl font-extrabold text-green-400">
              {formatCurrency(totalIncome)}
            </p>
            <p className="text-xs text-slate-600 mt-1">
              {totalExpenses.filter((e) => e.category === "income").length}{" "}
              transactions
            </p>
          </div>

          {/* Total Expenses */}
          <div className="relative rounded-2xl border border-red-500/20 bg-slate-900/70 backdrop-blur-sm p-6 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-red-500/5 to-transparent pointer-events-none rounded-2xl" />
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                Total Expenses
              </p>
              <BsArrowDownCircleFill className="text-red-400 text-lg" />
            </div>
            <p className="text-3xl font-extrabold text-red-400">
              {formatCurrency(totalExpense)}
            </p>
            <p className="text-xs text-slate-600 mt-1">
              {totalExpenses.filter((e) => e.category === "expense").length}{" "}
              transactions
            </p>
          </div>
        </div>

        {/* All Transactions */}
        <div
          style={{
            animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">All Transactions</h2>
            <span
              className="text-xs text-slate-500 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/60"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {totalExpenses.length} total
            </span>
          </div>

          {totalExpenses.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-white font-semibold mb-1">
                No transactions yet
              </p>
              <p className="text-slate-500 text-sm mb-5">
                Start by adding your first income or expense
              </p>
              <Link
                to="/createExpenses"
                className="glow-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-slate-900 font-bold text-sm cursor-pointer"
              >
                <MdAdd className="text-lg" />
                Add Transaction
              </Link>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm overflow-hidden">
              {totalExpenses.map((expense, i) => (
                <div
                  key={expense._id}
                  className="flex items-center justify-between px-5 py-4 border-b border-slate-800/60 last:border-0 hover:bg-slate-800/40 transition-colors duration-150 group"
                  style={{ animation: `slideUp 0.4s ease ${i * 0.04}s both` }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${
                        expense.category === "income"
                          ? "bg-green-500/10 border-green-500/30"
                          : "bg-red-500/10 border-red-500/30"
                      }`}
                    >
                      {expense.category === "income" ? (
                        <BsArrowUpCircleFill className="text-green-400 text-sm" />
                      ) : (
                        <BsArrowDownCircleFill className="text-red-400 text-sm" />
                      )}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">
                        {expense.title}
                      </p>
                      <p className="text-slate-500 text-xs">
                        {new Date(expense.date).toLocaleDateString("en-NG", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-sm font-bold ${
                        expense.category === "income"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {expense.category === "income" ? "+" : "-"}
                      {formatCurrency(expense.amount)}
                    </span>
                    <button
                      onClick={() => handleDetails(expense._id)}
                      className="text-xs text-slate-500 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-amber-500/50 hover:text-amber-400 transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
                    >
                      View →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filters Section */}
        <div
          style={{
            animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both",
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <MdFilterList className="text-amber-400 text-xl" />
            <h2 className="text-lg font-bold text-white">
              Filter Transactions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Filter by Month */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="flex items-center gap-2 mb-4">
                <MdCalendarToday className="text-amber-400" />
                <p className="text-sm font-semibold text-white">By Month</p>
              </div>
              <input
                type="month"
                value={monthDate}
                onChange={(e) => setMonthDate(e.target.value)}
                className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-all duration-200 mb-3"
              />
              <button
                onClick={handleMonthFilter}
                className="w-full py-2.5 rounded-xl cursor-pointer bg-amber-500/15 border border-amber-500/30 text-amber-400 font-semibold text-sm hover:bg-amber-500/25 transition-all duration-200"
              >
                Apply Filter
              </button>
            </div>

            {/* Filter by Week/Date */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="flex items-center gap-2 mb-4">
                <MdDateRange className="text-amber-400" />
                <p className="text-sm font-semibold text-white">By Date</p>
              </div>
              <input
                type="date"
                value={dayDate}
                onChange={(e) => setDayDate(e.target.value)}
                className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-all duration-200 mb-3"
              />
              <button
                onClick={handleDayFilter}
                className="w-full py-2.5 rounded-xl cursor-pointer bg-amber-500/15 border border-amber-500/30 text-amber-400 font-semibold text-sm hover:bg-amber-500/25 transition-all duration-200"
              >
                Apply Filter
              </button>
            </div>

            {/* Filter by Category */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="flex items-center gap-2 mb-4">
                <MdCategory className="text-amber-400" />
                <p className="text-sm font-semibold text-white">By Category</p>
              </div>
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-800/60 border border-slate-700 mb-3">
                <button
                  type="button"
                  onClick={() => setIsCategory("income")}
                  className={`flex items-center justify-center cursor-pointer gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isCategory === "income"
                      ? "bg-green-500/20 border border-green-500/40 text-green-400"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <BsArrowUpCircleFill />
                  Income
                </button>
                <button
                  type="button"
                  onClick={() => setIsCategory("expense")}
                  className={`flex items-center justify-center cursor-pointer gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isCategory === "expense"
                      ? "bg-red-500/20 border border-red-500/40 text-red-400"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <BsArrowDownCircleFill />
                  Expense
                </button>
              </div>
              <button
                onClick={handleCategoryFilter}
                className="w-full py-2.5 rounded-xl cursor-pointer bg-amber-500/15 border border-amber-500/30 text-amber-400 font-semibold text-sm hover:bg-amber-500/25 transition-all duration-200"
              >
                Apply Filter
              </button>
            </div>
          </div>

          {/* Filter Results */}
          {(monthFilter || dayFilter || categoryFilter) && activeFilter && (
            <div
              className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden"
              style={{ animation: "slideUp 0.4s ease both" }}
            >
              <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">
                  Filter Results
                  <span
                    className="ml-2 text-xs text-slate-500"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    ({activeResults.length} found)
                  </span>
                </p>
                <button
                  onClick={() => setActiveFilter(null)}
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  Clear ✕
                </button>
              </div>

              {activeMsg ? (
                <div className="px-5 py-6 text-center text-slate-500 text-sm">
                  {activeMsg}
                </div>
              ) : activeResults.length === 0 ? (
                <div className="px-5 py-6 text-center text-slate-500 text-sm">
                  No transactions found for this filter.
                </div>
              ) : (
                activeResults.map((expense) => (
                  <div
                    key={expense._id}
                    className="flex items-center justify-between px-5 py-4 border-b border-slate-800/60 last:border-0 hover:bg-slate-800/40 transition-colors duration-150 group"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 ${
                          expense.category === "income"
                            ? "bg-green-500/10 border-green-500/30"
                            : "bg-red-500/10 border-red-500/30"
                        }`}
                      >
                        {expense.category === "income" ? (
                          <BsArrowUpCircleFill className="text-green-400 text-xs" />
                        ) : (
                          <BsArrowDownCircleFill className="text-red-400 text-xs" />
                        )}
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">
                          {expense.title}
                        </p>
                        <p className="text-slate-500 text-xs">
                          {new Date(expense.date).toLocaleDateString("en-NG", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        expense.category === "income"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {expense.category === "income" ? "+" : "-"}
                      {formatCurrency(expense.amount)}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Summary Chart */}
        <div
          style={{
            animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both",
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <MdBarChart className="text-amber-400 text-xl" />
            <h2 className="text-lg font-bold text-white">Spending Summary</h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-800/60 border border-slate-700">
                <button
                  type="button"
                  onClick={() => setSummaryCategory("income")}
                  className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    summaryCategory === "income"
                      ? "bg-green-500/20 border border-green-500/40 text-green-400"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <BsArrowUpCircleFill />
                  Income
                </button>
                <button
                  type="button"
                  onClick={() => setSummaryCategory("expense")}
                  className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    summaryCategory === "expense"
                      ? "bg-red-500/20 border border-red-500/40 text-red-400"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <BsArrowDownCircleFill />
                  Expense
                </button>
              </div>

              <button
                onClick={handleSummaryCategory}
                disabled={summaryLoading}
                className="glow-btn flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-slate-900 font-bold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {summaryLoading ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin text-base" />
                    Loading...
                  </>
                ) : (
                  <>
                    <MdBarChart className="text-base" />
                    Generate Chart
                  </>
                )}
              </button>
            </div>

            {/* Chart */}
            {getSummary && (
              <div style={{ animation: "fadeIn 0.5s ease both" }}>
                {summaryMsg ? (
                  <div className="text-center py-10 text-slate-500 text-sm">
                    {summaryMsg}
                  </div>
                ) : summaryData.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 text-sm">
                    No summary data available for this category.
                  </div>
                ) : (
                  <div style={{ width: "100%", height: 320 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={summaryData}
                        margin={{ top: 10, right: 20, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(255,255,255,0.05)"
                        />
                        <XAxis
                          dataKey="date"
                          tickFormatter={formatDate}
                          tick={{ fill: "#64748b", fontSize: 11 }}
                          axisLine={{ stroke: "#1e293b" }}
                          tickLine={false}
                        />
                        <YAxis
                          tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`}
                          tick={{ fill: "#64748b", fontSize: 11 }}
                          axisLine={{ stroke: "#1e293b" }}
                          tickLine={false}
                          width={55}
                        />
                        <Tooltip
                          formatter={(value: any) => [
                            formatCurrency(value),
                            summaryCategory === "income" ? "Income" : "Expense",
                          ]}
                          labelFormatter={(label: any) => formatDate(label)}
                          contentStyle={{
                            backgroundColor: "#0f172a",
                            border: "1px solid #1e293b",
                            borderRadius: "12px",
                            color: "#fff",
                            fontSize: "12px",
                          }}
                          cursor={{
                            stroke: "rgba(245,158,11,0.2)",
                            strokeWidth: 1,
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="amount"
                          stroke={
                            summaryCategory === "income" ? "#4ade80" : "#f87171"
                          }
                          strokeWidth={2.5}
                          dot={{
                            fill:
                              summaryCategory === "income"
                                ? "#4ade80"
                                : "#f87171",
                            r: 4,
                            strokeWidth: 0,
                          }}
                          activeDot={{ r: 7, strokeWidth: 0 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )}

            {!getSummary && (
              <div className="text-center py-10 text-slate-600 text-sm border border-dashed border-slate-800 rounded-2xl">
                Select a category and click{" "}
                <span className="text-amber-500 font-semibold">
                  Generate Chart
                </span>{" "}
                to see your spending summary
              </div>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p
          className="text-center text-xs text-slate-600 pb-4"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          🔒 All transactions are encrypted & saved securely
        </p>
      </main>
    </div>
  );
};

export default Dashboard;
