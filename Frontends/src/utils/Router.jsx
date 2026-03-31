import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import ForgotPassword from "../Auth/ForgotPassword";
import ProtectedRoutes from "../components/ProtectedRoutes";
import CreatedShop from "../owner/CreatedShop";
import EditShop from "../owner/EditShop";
import ItemAdd from "../owner/ItemAdd";
import ItemUpdate from "../owner/ItemUpdate";
import CartItem from "../user/CartItem";
import CheckOut from "../user/CheckOut";
import ProtectedItemRoutes from "../components/ProtectedItemRoutes";
import PlaceOrder from "../user/PlaceOrder";
import MyOrder from "../user/MyOrder";
import Profile from "../Auth/Profile";
import TrackOrder from "../user/TrackOrder";
import ShopFindDetails from "../user/ShopFindDetails";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/home/Home";
import Resturants from "../pages/resturants/Resturants"
import Contact from "../pages/contact/Contact";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home />
        }
      />

      <Route
        path='/restaurants'
        element={
          <Resturants />
        }
      />

      <Route
        path='/Contact'
        element={
          <Contact />
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/shop-create"
        element={
          <ProtectedRoutes>
            <CreatedShop />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoutes>
            <Profile />
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
        path="/food-update/:itemId"
        element={
          <ProtectedRoutes>
            <ItemUpdate />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoutes>
            <CartItem />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/check-out"
        element={
          <ProtectedRoutes>
            <ProtectedItemRoutes>
              <CheckOut />
            </ProtectedItemRoutes>
          </ProtectedRoutes>
        }
      />

      <Route
        path="/place-order"
        element={
          <ProtectedRoutes>
            <ProtectedItemRoutes>
              <PlaceOrder />
            </ProtectedItemRoutes>
          </ProtectedRoutes>
        }
      />

      <Route
        path="/my-order"
        element={
          <ProtectedRoutes>
            <MyOrder />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/track-order/:orderId"
        element={
          <ProtectedRoutes>
            <TrackOrder />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/details/:detailsId"
        element={
          <ProtectedRoutes>
            <ShopFindDetails />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default Router;
//jio json format
