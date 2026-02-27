import { useNavigate, useParams, Link } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import { useEffect, useState } from "react";
import axiosClient from "../api/axios";
import NavBar from "../components/NavBar";
import { MdArrowBack, MdEdit } from "react-icons/md";

type editDataType = {
  title: string;
  amount: string;
  category: string;
};

const EditExpense = () => {
  const { id: expenseId } = useParams();
  const [editExpense, setEditExpense] = useState<editDataType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get(`/expense/details/${expenseId}`)
      .then((res) => setEditExpense(res.data.expense));
  }, [expenseId]);

  const handleUpdate = async (data: editDataType): Promise<void> => {
    await axiosClient.patch(`/expense/edit/${expenseId}`, data);
    navigate("/dashboard");
  };

  // Loading state
  if (!editExpense) {
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
          <div
            className="absolute bottom-[-10%] right-[-5%] w-150 h-150 rounded-full bg-amber-500 opacity-10 blur-[140px] animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
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
            Loading transaction...
          </p>
          <p
            className="text-slate-500 text-xs"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Fetching expense details...
          </p>
        </div>
      </div>
    );
  }

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

      <main className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        {/* Back button */}
        <div
          className="mb-8"
          style={{
            animation: "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both",
          }}
        >
          <Link
            to={`/expensesDetails/${expenseId}`}
            className="inline-flex items-center gap-2 text-slate-400 text-sm font-medium hover:text-white transition-colors duration-200 group"
          >
            <MdArrowBack className="text-lg group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Details
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
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <MdEdit className="text-amber-400 text-lg" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                Edit Transaction
              </h1>
              <p className="text-slate-500 text-sm">
                Update the details of{" "}
                <span className="text-amber-400 font-semibold">
                  "{editExpense.title}"
                </span>
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
              expense-tracker / edit
            </span>
          </div>
        </div>

        {/* Info banner */}
        <div
          className="mb-6 px-4 py-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-3"
          style={{
            animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both",
          }}
        >
          <span className="text-amber-400 text-lg mt-0.5">✏️</span>
          <p className="text-slate-400 text-xs leading-relaxed">
            You are editing an existing transaction. All changes will be saved
            immediately after you click{" "}
            <span className="text-amber-400 font-semibold">
              Update Transaction
            </span>
            .
          </p>
        </div>

        {/* Current values snapshot */}
        <div
          className="mb-6 p-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm"
          style={{
            animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both",
          }}
        >
          <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-3">
            Current Values
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-slate-600 mb-1">Title</p>
              <p className="text-white text-sm font-semibold truncate">
                {editExpense.title}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-600 mb-1">Amount</p>
              <p className="text-white text-sm font-semibold">
                ₦{Number(editExpense.amount).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-600 mb-1">Category</p>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${
                  editExpense.category === "income"
                    ? "bg-green-500/15 border-green-500/30 text-green-400"
                    : "bg-red-500/15 border-red-500/30 text-red-400"
                }`}
              >
                {editExpense.category === "income" ? "↑ Income" : "↓ Expense"}
              </span>
            </div>
          </div>
        </div>

        {/* Expense Form */}
        <div
          style={{
            animation: "slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both",
          }}
        >
          <ExpenseForm initialData={editExpense} onSubmit={handleUpdate} />
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
    </div>
  );
};

export default EditExpense;
