import React from "react";
import { Navigate } from "react-router-dom";
import auth from "../services/authService";

function ProtectedRoute({ children }) {
  return auth.getCurrentUser() ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
