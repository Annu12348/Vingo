import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import instance from "../utils/axios";
import { setUser } from "../redux/Authentication/AuthenticationSlice";

const Navigation = () => {
  const { user } = useSelector((store) => store.Auth);
  const [values, setValues] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutApi = async () => {
    try {
      await instance.delete("/auth/logout", { withCredentials: true });
      dispatch(setUser(null));
      toast.success("Successfully logged out user");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const clickedHandlers = () => {
    logoutApi()
  }

  const clickHandler = () => {
    setValues((prev) => !prev);
    console.log(values);
  };
  return (
    <div className="w-full fixed py-4 flex items-center justify-between px-3 bg-zinc-800 text-white  ">
      <h1 className="font-semibold capitalize text-xl text-amber-200 ">
        annuSingh
      </h1>
      <div className="md:flex hidden items-center justify-center gap-10">
        <Link
          to="/"
          className="text-md font-semibold tracking-tight leading-none capitalize"
        >
          home
        </Link>

        <button
          onClick={clickedHandlers}
          className="text-md bg-red font-semibold tracking-tight leading-none px-6 py-3 rounded capitalize bg-red-500"
        >
          logout
        </button>

        {!user && (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="font-semibold text-md bg-zinc-600 px-7 py-2 rounded hover:bg-blue-700 capitalize "
            >
              login
            </Link>

            <Link
              to="/register"
              className="font-semibold text-md bg-blue-500 px-6 py-2 rounded hover:bg-blue-700 capitalize "
            >
              signup
            </Link>
          </div>
        )}
      </div>
      <button className="text-2xl md:hidden" onClick={clickHandler}>
        {values ? <IoMdClose /> : <FiAlignJustify />}
      </button>
    </div>
  );
};

export default Navigation;
