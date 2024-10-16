import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Cookies from "universal-cookie";
interface ChildrenInterface {
  children: JSX.Element;
}

const AuthContext = createContext<{
  token: string | null;
  setAuthToken: (newToken: string) => void;
}>({
  token: null,
  setAuthToken: () => {},
});

const AuthProvider = ({ children }: ChildrenInterface) => {
  const cookies = new Cookies(null, { path: "/" });
  const [token, setToken] = useState(cookies.get("token"));

  const setAuthToken = (newToken: string) => {
    setToken(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      cookies.set("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      cookies.remove("token");
    }
  }, [token]);

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
