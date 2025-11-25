import { Link, useNavigate } from "react-router-dom";
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
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isCategory, setIsCategory] = useState<string>("income");
  const [categoryData, setCategoryData] = useState<expenseType[]>([]);
  const [filterReady, setFilterReady] = useState<boolean>(false);

  const handleDetails = (id: string) => {
    navigate(`/expensesDetails/${id}`);
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

  const handleCategoryFilter = async (): Promise<void> => {
    try {
      const res = await axiosClient.get(
        `/expense/filter/category?category=${isCategory}`
      );
      setCategoryData(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const handleFilterChange = () => {
    setFilterReady((prev) => !prev);
  };

  return (
    <div>
      <div>Welcome to your dashboard</div>
      <div>
        <div>
          <div onClick={handleVisibility}>Show Hidden buttons</div>
          {isVisible ? (
            <div>
              <Link to="/createExpenses">Create New Expenses</Link>
            </div>
          ) : (
            <div></div>
          )}
        </div>
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

        <div>
          <h2>Filter by category</h2>
          <select
            value={isCategory}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setIsCategory(event.target.value)
            }
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button type="button" onClick={handleCategoryFilter}>
            Filter by category
          </button>
        </div>
      </div>

      <div>
        <div>
          {monthData.length === 0 ? (
            <div>No data available for the selected month</div>
          ) : (
            <div>
              {monthData.map((index) => (
                <div key={index._id}>
                  <div>{index.title}</div>
                  <div>{index.amount}</div>
                  <div>{index.category}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {weekData.length === 0 ? (
            <div>No data available for the selected week</div>
          ) : (
            <div>
              {weekData.map((index) => (
                <div key={index._id}>
                  <div>{index.title}</div>
                  <div>{index.amount}</div>
                  <div>{index.category}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {categoryData.length === 0 ? (
            <div>No data available for the selected category</div>
          ) : (
            <div>
              {categoryData.map((index) => (
                <div key={index._id}>
                  <div>{index.title}</div>
                  <div>{index.amount}</div>
                  <div>{index.category}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
