import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

type protectedRoutesType = {
  children: ReactNode;
};
const ProtectedRoutes = ({ children }: protectedRoutesType) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
