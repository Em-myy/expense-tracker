import { useNavigate, useParams } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import { useEffect, useState } from "react";
import axiosClient from "../api/axios";

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
    console.log("Expense updated successfully");
    navigate("/dashboard");
  };

  if (!editExpense) return <div>Loading...</div>;
  return (
    <div>
      <ExpenseForm initialData={editExpense} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditExpense;
