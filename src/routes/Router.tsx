import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import RegisterPage from "../pages/RegisterPage";

function RouterComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
        </Route>

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default RouterComponent;
