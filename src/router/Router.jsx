import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components";
import { Home, Login, Register } from "../pages";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* // those are public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            // this component check if user authenticated or not
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
