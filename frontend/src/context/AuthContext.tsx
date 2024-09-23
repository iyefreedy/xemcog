import API from "@/API";
import { AuthContextProps, Credential, User } from "@/types";
import { AxiosError } from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | undefined>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await API.authenticate();
      if (res.status === 200) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user]);

  const handleLogin = async (data: Credential) => {
    try {
      setLoading(true);
      await API.login(data);
      const res = await API.authenticate();

      setUser(res.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await API.logout();

      setUser(null);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
