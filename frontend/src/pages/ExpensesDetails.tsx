import { useEffect, useState } from "react";
import axiosClient from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

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
    null
  );
  const { id: expenseId } = useParams();
  const navigate = useNavigate();

  const handleEditNavigate = (id: string) => {
    navigate(`/editExpense/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/expense/delete/${expenseId}`);
      console.log("Expense deleted successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axiosClient.get(`/expense/details/${expenseId}`);
        setExpenseDetails(res.data.expense);
      } catch (error) {
        console.log(error);
      }
    };
    if (expenseId) fetchDetails();
  }, [expenseId]);

  if (!expenseDetails) return <div>Loading...</div>;

  return (
    <div>
      <div>Expense Details</div>
      <div>Welcome</div>
      <div>
        <div>{expenseDetails.title}</div>
        <div>{expenseDetails.amount}</div>
        <div>{expenseDetails.category}</div>
        <div>{new Date(expenseDetails.date).toString()}</div>
      </div>

      <div>
        <div>Edit your Expense</div>
        <button onClick={() => handleEditNavigate(expenseDetails._id)}>
          Edit
        </button>
      </div>
      <div>
        <div>Delete this expense</div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ExpensesDetails;
