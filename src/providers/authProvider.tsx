import axios from "axios";
import { createContext, useContext, useEffect, useCallback, useState } from "react";
import Cookies from "universal-cookie";

interface ChildrenInterface {
  children: JSX.Element;
}

const AuthContext = createContext<{
  token: string | null;
  setAuthToken: (newToken: string | null) => void;
  logOut: () => void;
}>( {
  token: null,
  setAuthToken: () => {},
  logOut: () => {},
});

const cookies = new Cookies();  

const AuthProvider = ({ children }: ChildrenInterface) => {
  // Recupera o token do cookie no estado inicial
  const [token, setToken] = useState<string | null>(cookies.get("token"));

  // Função para definir o token com tratamento de erro
  const setAuthToken = useCallback((newToken: string | null) => {
    try {
      setToken(newToken);
      if (newToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        cookies.set("token", newToken, { path: '/' }); 
      } else {
        delete axios.defaults.headers.common["Authorization"];
        cookies.remove("token", { path: '/' });
      }
    } catch (error) {
      console.error("Erro ao definir o token:", error);
      setToken(null);
    }
  }, []);

  // Função para fazer logout
  const logOut = useCallback(() => {
    setToken(null);
    delete axios.defaults.headers.common["Authorization"];
    cookies.remove("token", { path: '/' });
  }, []);

  const contextValue = useMemo(() => ({
    token,
    setAuthToken,
    logOut,
  }), [token, setAuthToken, logOut]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Hook para acessar o contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
