import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Cookies from "universal-cookie";

interface ChildrenInterface {
  children: JSX.Element;
}

const AuthContext = createContext<{
  token: string | null;
  setAuthToken: (newToken: string) => Promise<void>;
}>({
  token: null,
  setAuthToken: async () => {},
});

const AuthProvider = ({ children }: ChildrenInterface) => {
  const cookies = new Cookies();

  const [token, setToken] = useState<string | null>(cookies.get("token"));

  const setAuthToken = async (newToken: string) => {
    try {
      setToken(newToken);
    } catch (error) {
      console.error("Falha ao verificar token", error);
      setToken(null);
    }
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      cookies.set("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      cookies.remove("token");
    }
  }, [token, cookies]);

  const contextValue = useMemo(
    () => ({
      token,
      setAuthToken,
    }),
    [token]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
