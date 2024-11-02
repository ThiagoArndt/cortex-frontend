import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import Cookies from "universal-cookie";

interface ChildrenInterface {
  children: JSX.Element;
}

const AuthContext = createContext<{
  token: string | null;
  setAuthToken: (newToken: string | null) => void;
  logOut: () => void;
}>({
  token: null,
  setAuthToken: () => {},
  logOut: () => {},
});

const AuthProvider = ({ children }: ChildrenInterface) => {
  const cookies = useMemo(() => new Cookies(), []);

  const [token, setToken] = useState<string | null>(cookies.get("token"));

  const setAuthToken = (newToken: string | null) => {
    try {
      setToken(newToken);
    } catch (error) {
      console.error("Falha ao verificar token", error);
      setToken(null);
    }
  };

  useEffect(() => {
    if (token != null) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      cookies.set("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      cookies.remove("token");
    }
  }, [token, cookies]);

  const logOut = () => {
    setToken(null);
    delete axios.defaults.headers.common["Authorization"];
    cookies.remove("token");
  };

  const contextValue = useMemo(
    () => ({
      token,
      setAuthToken,
      logOut,
    }),
    [token]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
