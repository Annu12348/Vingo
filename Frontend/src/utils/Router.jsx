import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ProtectedRoutes from "../components/ProtectedRoutes";
import CreatedShop from "../pages/CreatedShop";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/shop-create"
        element={
          <ProtectedRoutes>
            <CreatedShop />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default Router;
