import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/axios";
import axios from "axios";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const ProtectedRoutesApi = async () => {
    try {
      const response = await instance.get("http://localhost:3000/auth/me", {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    ProtectedRoutesApi();
  }, []);
  return children;
};

export default ProtectedRoutes;
