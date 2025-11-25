import ExpenseForm from "../components/ExpenseForm";
import axiosClient from "../api/axios";
import { useNavigate } from "react-router-dom";

type initialDataType = {
  title: string;
  amount: string;
  category: string;
};

const initialData: initialDataType = {
  title: "",
  amount: "",
  category: "",
};

const CreateExpensesPage = () => {
  const navigate = useNavigate();

  const handleCreate = async (data: initialDataType): Promise<void> => {
    await axiosClient.post("/expense/create", data);
    console.log("Expense created successfully");
    navigate("/dashboard");
  };

  return (
    <div>
      <div>Create a new Expenses</div>
      <div>
        <ExpenseForm initialData={initialData} onSubmit={handleCreate} />
      </div>
    </div>
  );
};

export default CreateExpensesPage;
