import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axiosClient from "../api/axios";

type expenseType = {
  _id: string;
  userId: string;
  title: string;
  amount: string;
  category: string;
  date: string;
};

const Dashboard = () => {
  const [totalExpenses, setTotalExpenses] = useState<expenseType[]>([]);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [monthDate, setMonthDate] = useState<string>("");
  const [monthData, setMonthData] = useState<expenseType[]>([]);
  const [weekDate, setWeekDate] = useState<string>("");
  const [weekData, setWeekData] = useState<expenseType[]>([]);

  const handleDetails = (id: string) => {
    navigate(`/expensesDetails/${id}`);
  };

  const handleButtonClick = () => {
    navigate("/createExpenses");
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
    console.log("Logged out successfully");
    navigate("/login");
  };

  const handleMonthFilter = async (): Promise<void> => {
    const [year, month] = monthDate.split("-");
    try {
      const res = await axiosClient.get(
        `/expense/filter/month?year=${year}&month=${month}`
      );
      setMonthData(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWeekFilter = async (): Promise<void> => {
    try {
      const res = await axiosClient.get(
        `/expense/filter/week?date=${weekDate}`
      );
      setWeekData(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>Welcome to your dashboard</div>
      <div>
        <div onClick={handleButtonClick}>Create new expenses</div>
      </div>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {totalExpenses.map((index) => (
          <div key={index._id}>
            <div>{index.title}</div>
            <div>{index.amount}</div>
            <div>{index.category}</div>
            <button onClick={() => handleDetails(index._id)}>
              View Expenses Details
            </button>
          </div>
        ))}
      </div>
      <div>
        <h1>Filter your expenses</h1>
        <div>
          <h2>Filter by month</h2>
          <input
            type="month"
            value={monthDate}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setMonthDate(event.target.value)
            }
          />
          <button type="button" onClick={handleMonthFilter}>
            Filter by month
          </button>
        </div>

        <div>
          <h2>FIlter by date</h2>
          <input
            type="date"
            value={weekDate}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setWeekDate(event.target.value)
            }
          />
          <button type="button" onClick={handleWeekFilter}>
            Filter by week
          </button>
        </div>
      </div>

      <div>
        {monthData.map((index) => (
          <div key={index._id}>
            <div>{index.title}</div>
            <div>{index.amount}</div>
            <div>{index.category}</div>
          </div>
        ))}
      </div>

      <div>
        {weekData.map((index) => (
          <div key={index._id}>
            <div>{index.title}</div>
            <div>{index.amount}</div>
            <div>{index.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
