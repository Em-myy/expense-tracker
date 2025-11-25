import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axiosClient from "../api/axios";

type AuthContextType = {
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

type AuthProviderType = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axiosClient.get("/authentication/profile");
        setUser(res.data.user);
      } catch {
        try {
          const res2 = await axiosClient.post("/authentication/refresh");
          setUser(res2.data.user);
        } catch {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedOut) return;
    verifyUser();
  }, [isLoggedOut]);

  useEffect(() => {
    const handleLogout = () => {
      setUser(null);
      setIsLoggedOut(true);
    };

    window.addEventListener("logout", handleLogout);

    return () => {
      window.removeEventListener("logout", handleLogout);
    };
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    await axiosClient.post("/authentication/login", { email, password });

    const res = await axiosClient.get("/authentication/profile");
    setUser(res.data.user);
    setIsLoggedOut(false);
  };

  const logout = async () => {
    await axiosClient.post("/authentication/logout");

    setUser(null);
    setIsLoggedOut(true);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Error occured in useAuth..... Likely undefined");
  }
  return context;
};
