import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/axios";

type Props = {
  expenseTitle: string;
  onClose: () => void;
  type: "one" | "all";
  onDeleteAll?: () => void;
};

const DeleteModal: React.FC<Props> = ({
  expenseTitle,
  onClose,
  type,
  onDeleteAll,
}) => {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [removeMsg, setRemoveMsg] = useState<string>("");

  const { id: expenseId } = useParams();
  const navigate = useNavigate();

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

  const handleDeleteAll = async () => {
    setDeleteLoading(true);
    setRemoveMsg("");
    try {
      const res = await axiosClient.delete("/expense/removeImported");
      setRemoveMsg(`✓ ${res.data.removed} imported transactions removed`);

      onDeleteAll?.();
      setTimeout(() => onClose(), 2000);
    } catch (error: any) {
      setRemoveMsg(
        error.response?.data?.error || "Failed to remove transactions",
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ animation: "fadeIn 0.2s ease both" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
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
          {type === "all"
            ? "Remove Imported Transactions?"
            : "Delete Transaction?"}
        </h3>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          Are you sure you want to delete{" "}
          <span className="text-white font-semibold">"{expenseTitle}"</span>?
          This action cannot be undone.
        </p>

        {removeMsg && (
          <p
            className={`text-xs mb-4 ${removeMsg.startsWith("✓") ? "text-green-400" : "text-red-400"}`}
          >
            {removeMsg}
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-300 font-semibold text-sm hover:border-slate-500 hover:text-white transition-all duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={type === "one" ? handleDelete : handleDeleteAll}
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
  );
};

export default DeleteModal;
