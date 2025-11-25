import { useState } from "react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            placeholder="The title"
            name="title"
            value={form.title}
          />
          <input
            onChange={handleChange}
            type="number"
            placeholder="The amount"
            name="amount"
            value={form.amount}
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="The category"
            name="category"
            value={form.category}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
