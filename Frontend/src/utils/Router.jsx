import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ProtectedRoutes from "../components/ProtectedRoutes";
import CreatedShop from "../pages/CreatedShop";
import EditShop from "../pages/EditShop";
import ItemAdd from "../pages/ItemAdd";
import ItemUpdate from "../pages/ItemUpdate";

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
      <Route
        path="/shop-edit/:id"
        element={
          <ProtectedRoutes>
            <EditShop />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/add-food"
        element={
          <ProtectedRoutes>
             <ItemAdd />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/add-food-update/:itemId"
        element={
          <ProtectedRoutes>
             <ItemUpdate />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default Router;
