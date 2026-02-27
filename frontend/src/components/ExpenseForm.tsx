import { useState } from "react";
import { MdTitle, MdCategory } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsArrowUpCircleFill, BsArrowDownCircleFill } from "react-icons/bs";
import { FaNairaSign } from "react-icons/fa6";

type formType = {
  title: string;
  amount: string;
  category: string;
};

type Props = {
  initialData: formType;
  onSubmit: (data: formType) => Promise<void>;
};

const ExpenseForm: React.FC<Props> = ({ initialData, onSubmit }) => {
  const [form, setForm] = useState<formType>(initialData);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  };

  const isIncome = form.category === "income";

  return (
    <div className="relative rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-md p-8 overflow-hidden w-full max-w-md mx-auto">
      {/* Inner glow — changes color based on income/expense */}
      <div
        className={`absolute inset-0 pointer-events-none rounded-3xl transition-all duration-500 ${
          isIncome
            ? "bg-linear-to-br from-green-500/5 via-transparent to-blue-500/5"
            : "bg-linear-to-br from-amber-500/5 via-transparent to-red-500/5"
        }`}
      />

      {/* Header */}
      <div className="relative z-10 mb-7">
        <div className="flex items-center gap-3 mb-1">
          {/* Category indicator icon */}
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isIncome
                ? "bg-green-500/15 border border-green-500/30"
                : "bg-amber-500/15 border border-amber-500/30"
            }`}
          >
            {isIncome ? (
              <BsArrowUpCircleFill className="text-green-400 text-lg" />
            ) : (
              <BsArrowDownCircleFill className="text-amber-400 text-lg" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white leading-tight">
              {initialData.title ? "Edit Transaction" : "New Transaction"}
            </h2>
            <p className="text-slate-500 text-xs">
              {isIncome
                ? "Recording an income entry"
                : "Recording an expense entry"}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
        {/* Title Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-400">Title</label>
          <div className="relative">
            <MdTitle className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
            <input
              onChange={handleChange}
              type="text"
              placeholder="e.g. Grocery Shopping"
              name="title"
              value={form.title}
              required
              className="w-full bg-slate-800/60 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-all duration-200"
            />
          </div>
        </div>

        {/* Amount Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-400">
            Amount (₦)
          </label>
          <div className="relative">
            <FaNairaSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
            <input
              onChange={handleChange}
              type="number"
              placeholder="0.00"
              name="amount"
              value={form.amount}
              required
              min="0"
              step="0.01"
              className="w-full bg-slate-800/60 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-all duration-200"
            />
            {/* Live amount preview */}
            {form.amount && (
              <span
                className={`absolute right-10 top-1/2 -translate-y-1/2 text-xs font-bold transition-all duration-300 ${
                  isIncome ? "text-green-400" : "text-red-400"
                }`}
              >
                {isIncome ? "+" : "-"}₦{Number(form.amount).toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Category Toggle */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-400 flex items-center gap-1.5">
            <MdCategory className="text-base" />
            Category
          </label>
          {/* Custom toggle instead of plain select */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-800/60 border border-slate-700">
            <button
              type="button"
              onClick={() => setForm({ ...form, category: "income" })}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isIncome
                  ? "bg-green-500/20 border border-green-500/40 text-green-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <BsArrowUpCircleFill className="text-base" />
              Income
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, category: "expense" })}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                !isIncome
                  ? "bg-red-500/20 border border-red-500/40 text-red-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <BsArrowDownCircleFill className="text-base" />
              Expense
            </button>
          </div>
          {/* Hidden select to keep form value in sync */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="hidden"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Summary preview */}
        {form.title && form.amount && (
          <div
            className={`p-4 rounded-2xl border transition-all duration-300 ${
              isIncome
                ? "bg-green-500/5 border-green-500/20"
                : "bg-red-500/5 border-red-500/20"
            }`}
            style={{ animation: "slideUp 0.3s ease both" }}
          >
            <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-medium">
              Preview
            </p>
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-semibold">
                {form.title}
              </span>
              <span
                className={`text-sm font-bold ${
                  isIncome ? "text-green-400" : "text-red-400"
                }`}
              >
                {isIncome ? "+" : "-"}₦{Number(form.amount).toLocaleString()}
              </span>
            </div>
            <span
              className={`inline-flex items-center gap-1 mt-2 text-xs px-2 py-0.5 rounded-full font-medium ${
                isIncome
                  ? "bg-green-500/15 text-green-400"
                  : "bg-red-500/15 text-red-400"
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
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`glow-btn w-full py-3.5 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
            isIncome
              ? "bg-green-500 text-slate-900 hover:bg-green-400"
              : "bg-amber-500 text-slate-900 hover:bg-amber-400"
          }`}
        >
          {loading ? (
            <>
              <AiOutlineLoading3Quarters className="text-lg animate-spin" />
              Saving...
            </>
          ) : (
            <>
              {isIncome ? (
                <BsArrowUpCircleFill className="text-base" />
              ) : (
                <BsArrowDownCircleFill className="text-base" />
              )}
              {initialData.title
                ? "Update Transaction"
                : `Add ${isIncome ? "Income" : "Expense"}`}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
