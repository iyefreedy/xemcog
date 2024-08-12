import API from "@/API";
import { AuthContextProps, Credential, User } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

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
    await API.login(data);
    const res = await API.authenticate();
    if (res.status === 200) {
      setUser(res.data);
    } else {
      setUser(null);
    }
  };

  const handleLogout = async () => {};

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
