import React from "react";
import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "../../store/actions/utils";
// if the user is authenticated I let him pass otherwise I route him to login
export const ProtectedRoute = ({ children }) => {
  if (!isUserLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
