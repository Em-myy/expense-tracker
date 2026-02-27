import { useEffect, useState } from "react";
import axiosClient from "../api/axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import {
  MdArrowBack,
  MdEdit,
  MdDelete,
  MdCalendarToday,
  MdCategory,
  MdTitle,
} from "react-icons/md";
import { BsArrowUpCircleFill, BsArrowDownCircleFill } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaNairaSign } from "react-icons/fa6";

type expenseType = {
  _id: string;
  userId: string;
  title: string;
  amount: string;
  category: string;
  date: string;
};

const ExpensesDetails = () => {
  const [expenseDetails, setExpenseDetails] = useState<expenseType | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const { id: expenseId } = useParams();
  const navigate = useNavigate();

  const isIncome = expenseDetails?.category === "income";

  const handleEditNavigate = (id: string) => {
    navigate(`/editExpense/${id}`);
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await axiosClient.delete(`/expense/delete/${expenseId}`);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get(`/expense/details/${expenseId}`);
        setExpenseDetails(res.data.expense);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (expenseId) fetchDetails();
  }, [expenseId]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex flex-col items-center justify-center gap-6">
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
          <div className="absolute bottom-[-10%] right-[-5%] w-150 h-150 rounded-full bg-amber-500 opacity-10 blur-[140px] animate-pulse" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-slate-800" />
            <div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-500 animate-spin"
              style={{ animationDuration: "0.8s" }}
            />
          </div>
          <p className="text-white font-semibold text-sm">
            Fetching details...
          </p>
          <p
            className="text-slate-500 text-xs"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Loading transaction...
          </p>
        </div>
      </div>
    );
  }

  if (!expenseDetails) return null;

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

      <main className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        {/* Back button */}
        <div
          className="mb-8"
          style={{
            animation: "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both",
          }}
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-slate-400 text-sm font-medium hover:text-white transition-colors duration-200 group"
          >
            <MdArrowBack className="text-lg group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Dashboard
          </Link>
        </div>

        {/* Page header */}
        <div
          className="mb-8"
          style={{
            animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both",
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                isIncome
                  ? "bg-green-500/15 border-green-500/30"
                  : "bg-amber-500/15 border-amber-500/30"
              }`}
            >
              {isIncome ? (
                <BsArrowUpCircleFill className="text-green-400 text-lg" />
              ) : (
                <BsArrowDownCircleFill className="text-amber-400 text-lg" />
              )}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                Transaction Details
              </h1>
              <p className="text-slate-500 text-sm">
                View, edit, or delete this transaction
              </p>
            </div>
          </div>

          {/* Decorative divider */}
          <div className="mt-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-linear-to-r from-amber-500/30 via-slate-700 to-transparent" />
            <span
              className="text-slate-600 text-xs"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              expense-tracker / details
            </span>
          </div>
        </div>

        {/* Main details card */}
        <div
          className="relative rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-md overflow-hidden mb-5"
          style={{
            animation: "slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both",
          }}
        >
          {/* Inner glow */}
          <div
            className={`absolute inset-0 pointer-events-none rounded-3xl transition-all duration-500 ${
              isIncome
                ? "bg-linear-to-br from-green-500/5 via-transparent to-blue-500/5"
                : "bg-linear-to-br from-amber-500/5 via-transparent to-red-500/5"
            }`}
          />

          {/* Amount hero banner */}
          <div
            className={`relative px-8 py-8 border-b border-slate-800 flex items-center justify-between`}
          >
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1 font-medium">
                {isIncome ? "Income" : "Expense"} Amount
              </p>
              <p
                className={`text-4xl md:text-5xl font-extrabold ${
                  isIncome ? "text-green-400" : "text-red-400"
                }`}
              >
                {isIncome ? "+" : "-"}₦
                {Number(expenseDetails.amount).toLocaleString()}
              </p>
            </div>
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${
                isIncome
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-red-500/10 border-red-500/30"
              }`}
            >
              {isIncome ? (
                <BsArrowUpCircleFill className="text-green-400 text-3xl" />
              ) : (
                <BsArrowDownCircleFill className="text-red-400 text-3xl" />
              )}
            </div>
          </div>

          {/* Detail rows */}
          <div className="px-8 py-6 space-y-5">
            {/* Title */}
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                <MdTitle className="text-slate-400 text-base" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5 font-medium">
                  Title
                </p>
                <p className="text-white font-semibold">
                  {expenseDetails.title}
                </p>
              </div>
            </div>

            <div className="h-px bg-slate-800" />

            {/* Amount */}
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                <FaNairaSign className="text-slate-400 text-base" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5 font-medium">
                  Amount
                </p>
                <p className="text-white font-semibold">
                  ₦{Number(expenseDetails.amount).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="h-px bg-slate-800" />

            {/* Category */}
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                <MdCategory className="text-slate-400 text-base" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5 font-medium">
                  Category
                </p>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                    isIncome
                      ? "bg-green-500/15 border-green-500/30 text-green-400"
                      : "bg-red-500/15 border-red-500/30 text-red-400"
                  }`}
                >
                  {isIncome ? (
                    <BsArrowUpCircleFill className="text-xs" />
                  ) : (
                    <BsArrowDownCircleFill className="text-xs" />
                  )}
                  {isIncome ? "Income" : "Expense"}
                </span>
              </div>
            </div>

            <div className="h-px bg-slate-800" />

            {/* Date */}
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                <MdCalendarToday className="text-slate-400 text-base" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5 font-medium">
                  Date
                </p>
                <p className="text-white font-semibold">
                  {new Date(expenseDetails.date).toLocaleDateString("en-NG", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p
                  className="text-slate-500 text-xs mt-0.5"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {new Date(expenseDetails.date).toLocaleTimeString("en-NG", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div
          className="grid grid-cols-2 gap-4 mb-5"
          style={{
            animation: "slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both",
          }}
        >
          {/* Edit button */}
          <button
            onClick={() => handleEditNavigate(expenseDetails._id)}
            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl cursor-pointer border border-slate-700 bg-slate-800/60 text-slate-300 font-semibold text-sm hover:border-amber-500/50 hover:text-amber-400 hover:bg-amber-500/5 transition-all duration-200"
          >
            <MdEdit className="text-lg" />
            Edit Transaction
          </button>

          {/* Delete button */}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl cursor-pointer border border-slate-700 bg-slate-800/60 text-slate-300 font-semibold text-sm hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
          >
            <MdDelete className="text-lg" />
            Delete
          </button>
        </div>

        {/* Bottom note */}
        <p
          className="text-center text-xs text-slate-600 mt-8"
          style={{
            fontFamily: "'DM Mono', monospace",
            animation: "fadeIn 1s ease 0.6s both",
          }}
        >
          🔒 All transactions are encrypted & saved securely
        </p>
      </main>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ animation: "fadeIn 0.2s ease both" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDeleteConfirm(false)}
          />

          {/* Modal */}
          <div
            className="relative w-full max-w-sm rounded-3xl border border-red-500/20 bg-slate-900/95 backdrop-blur-md p-8 text-center"
            style={{
              animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-br from-red-500/5 via-transparent to-transparent rounded-3xl pointer-events-none" />

            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-5">
              <MdDelete className="text-red-400 text-2xl" />
            </div>

            <h3 className="text-xl font-extrabold text-white mb-2">
              Delete Transaction?
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Are you sure you want to delete{" "}
              <span className="text-white font-semibold">
                "{expenseDetails.title}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-300 font-semibold text-sm hover:border-slate-500 hover:text-white transition-all duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold text-sm cursor-pointer hover:bg-red-400 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {deleteLoading ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin text-base" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <MdDelete className="text-base" />
                    Yes, Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesDetails;
