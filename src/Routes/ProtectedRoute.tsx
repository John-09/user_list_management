import React from "react";
import { Navigate } from "react-router-dom";
import type { ProtectedRouteProps } from "../Interface/ProtectedRouteInterface";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
