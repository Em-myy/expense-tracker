import ExpenseForm from "../components/ExpenseForm";
import axiosClient from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { MdArrowBack } from "react-icons/md";
import { BsLightningChargeFill } from "react-icons/bs";

type initialDataType = {
  title: string;
  amount: string;
  category: string;
};

const initialData: initialDataType = {
  title: "",
  amount: "",
  category: "income",
};

const CreateExpensesPage = () => {
  const navigate = useNavigate();

  const handleCreate = async (data: initialDataType): Promise<void> => {
    await axiosClient.post("/expense/create", data);
    navigate("/dashboard");
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
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <BsLightningChargeFill className="text-amber-400 text-lg" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                New Transaction
              </h1>
              <p className="text-slate-500 text-sm">
                Record a new income or expense entry
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
              expense-tracker / new
            </span>
          </div>
        </div>

        {/* Tips banner */}
        <div
          className="mb-6 px-4 py-3 rounded-2xl border border-blue-500/20 bg-blue-500/5 flex items-start gap-3"
          style={{
            animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both",
          }}
        >
          <span className="text-blue-400 text-lg mt-0.5">💡</span>
          <p className="text-slate-400 text-xs leading-relaxed">
            Toggle between{" "}
            <span className="text-green-400 font-semibold">Income</span> and{" "}
            <span className="text-red-400 font-semibold">Expense</span> to
            categorize your transaction correctly. A live preview will appear as
            you fill in the details.
          </p>
        </div>

        {/* Expense Form */}
        <div
          style={{
            animation: "slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both",
          }}
        >
          <ExpenseForm initialData={initialData} onSubmit={handleCreate} />
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

export default CreateExpensesPage;
