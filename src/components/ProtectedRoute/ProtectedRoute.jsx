import React from "react";
import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "../../store/actions/utils";
export const ProtectedRoute = ({ children }) => {
  if (!isUserLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
