import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CreateExpensesPage from "./pages/CreateExpensesPage";
import ExpensesDetails from "./pages/ExpensesDetails";
import EditExpense from "./pages/EditExpense";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/createExpenses"
          element={
            <ProtectedRoutes>
              <CreateExpensesPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/expensesDetails/:id"
          element={
            <ProtectedRoutes>
              <ExpensesDetails />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/editExpense/:id"
          element={
            <ProtectedRoutes>
              <EditExpense />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
