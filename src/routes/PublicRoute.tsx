import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/authProvider";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/home" />;
  }

  return children;
};
