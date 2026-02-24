import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axiosClient from "../api/axios";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type expenseType = {
  _id: string;
  userId: string;
  title: string;
  amount: string;
  category: string;
  date: string;
};

type summaryType = {
  _id: string;
  title: string;
  amount: number;
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
  const [monthFilter, setMonthFilter] = useState<boolean>(false);
  const [weekFilter, setWeekFilter] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<boolean>(false);
  const [monthFilterMsg, setMonthFilterMsg] = useState<string>("");
  const [weekFilterMsg, setWeekFilterMsg] = useState<string>("");
  const [categoryFilterMsg, setCategoryFilterMsg] = useState<string>("");
  const [summaryCategory, setSummaryCategory] = useState<string>("");
  const [summaryData, setSummaryData] = useState<summaryType[]>([]);
  const [getSummary, setGetSummary] = useState<boolean>(false);
  const [summaryMsg, setSummaryMsg] = useState<string>("");

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
        `/expense/filter/month?year=${year}&month=${month}`,
      );
      setMonthData(res.data.results);
      setMonthFilter(true);
    } catch (error: any) {
      if (error.response) {
        setMonthFilterMsg(error.response.data.msg);
      }
      setMonthFilter(true);
    }
  };

  const handleWeekFilter = async (): Promise<void> => {
    try {
      const res = await axiosClient.get(
        `/expense/filter/week?date=${weekDate}`,
      );
      setWeekData(res.data.results);
      setWeekFilter(true);
    } catch (error: any) {
      if (error.response) {
        setWeekFilterMsg(error.response.data.msg);
      }
      setWeekFilter(true);
    }
  };

  const handleCategoryFilter = async (): Promise<void> => {
    try {
      const res = await axiosClient.get(
        `/expense/filter/category?category=${isCategory}`,
      );
      setCategoryData(res.data.results);
      setCategoryFilter(true);
    } catch (error: any) {
      if (error.response) {
        setCategoryFilterMsg(error.response.data.msg);
      }
      setCategoryFilter(true);
    }
  };

  const handleSummaryCategory = async (): Promise<void> => {
    try {
      const res = await axiosClient.get(
        `/expense/summary?category=${summaryCategory}`,
      );
      setSummaryData(res.data.summary);
      setGetSummary(true);
    } catch (error: any) {
      if (error.response) {
        setSummaryMsg(error.response.data.msg);
      }
      setGetSummary(true);
    }
  };

  const handleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const formatDate = (dateString: any) => {
    if (!dateString) return ""; // Handle undefined or null safely

    const date = new Date(String(dateString));
    if (isNaN(date.getTime())) return String(dateString);

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatCurrency = (value: any) => {
    // If value is undefined or not a number, default to 0
    const safeValue = Number(value) || 0;

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    }).format(safeValue);
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
          {monthFilter ? (
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
          ) : null}
          <div>{monthFilterMsg}</div>
        </div>

        <div>
          {weekFilter ? (
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
          ) : null}
          <div>{weekFilterMsg}</div>
        </div>

        <div>
          {categoryFilter ? (
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
          ) : null}
          <div>{categoryFilterMsg}</div>
        </div>

        {/* Graph Part */}
        <div>
          <h2>Get Summary</h2>
          <div>
            <select
              value={summaryCategory}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                setSummaryCategory(event.target.value)
              }
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <button type="button" onClick={handleSummaryCategory}>
              Get Summary
            </button>
          </div>
        </div>

        <div>
          {getSummary ? (
            <div>
              {summaryData.length === 0 ? (
                <div>No summary available for the selected category</div>
              ) : (
                <div style={{ width: "99%", height: 400 }}>
                  <ResponsiveContainer
                    width="99%"
                    height="100%"
                    minHeight={400}
                    minWidth={1}
                  >
                    <LineChart
                      data={summaryData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={formatDate} />
                      <YAxis tickFormatter={formatCurrency} />
                      <Tooltip
                        formatter={(value: any) => [
                          formatCurrency(value),
                          "Spent",
                        ]}
                        labelFormatter={(label: any) => formatDate(label)}
                      />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          ) : null}
          <div>{summaryMsg}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
