import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../utils/axios";
import { setUser } from "../redux/reducer/AuthenticationSlice";
import { FaLocationDot } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { persistor } from "../redux/store";

const Navigation = () => {
  const { user } = useSelector((store) => store.Auth);
  const { shops } = useSelector(store => store.Shops)
  const [values, setValues] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { city } = useSelector((store) => store.Auth);
  

  const logoutApi = async () => {
    try {
      await instance.delete("/auth/logout", { withCredentials: true });
      dispatch(setUser(null));
      persistor.purge(); // पुराना data clear
      toast.success("Successfully logged out user");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const clickedHandlers = () => {
    logoutApi();
  };

  const clickHandler = () => {
    setValues((prev) => !prev);
    console.log(values);
  };
  return (
    <div className="w-full fixed   flex    items-center justify-center     ">
      <div className="md:w-[55%] w-full bg-zinc-100 shadow rounded      py-2 px-3 flex items-center  justify-between  gap-4 ">
        <Link
          to="/"
          className="text-[rgb(240,107,41)] text-xl tracking-tight leading-none capitalize font-bold "
        >
          vingo
        </Link>
        <div className="flex w-[100%]  items-center justify-end ">
          {user && user.role == "user" && (
            <div className="shadow bg-zinc-100 rounded mr-13 p-1.5 flex items-center justify-between w-[70%]   md:w-[59.5%]">
              <div className="flex items-center  gap-1">
                <span className="text-xl text-[rgb(240,107,41)] ">
                  <FaLocationDot />
                </span>
                <h1 className="text-zinc-500 truncate tracking-tight text-[12px]">
                  {city && city.city ? city.city.slice(0, 8) : ""}
                </h1>
              </div>
              <div className="flex w-[72%] items-center border-zinc-300 border-l-3 px-3 gap-2">
                <label className="text-xl">
                  <CiSearch />
                </label>
                <input
                  className=" outline-none md:py-1.5 py-1 px-1 font-semibold text-zinc-500 w-full text-sm tracking-tight"
                  type="search"
                  placeholder="Search food..."
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 justify-center">
            {user.role === "user" && (
              <span className=" text-2xl md:block hidden relative text-[rgb(240,107,41)]">
                <CiShoppingCart />
                <span className="text-[12px] absolute -top-1.5 -right-1.5">
                  0
                </span>
              </span>
            )}
            {shops.length > 0 && user.role === "owner" && (
              <Link
                to="/add-food"
                className="text-[13px] hidden md:flex items-center gap-2 rounded capitalize font-semibold bg-zinc-200 text-[rgb(240,107,41)] px-3 py-1.5"
              >
                <span className="text-xl">
                  <IoMdAdd />
                </span>
                add food item
              </Link>
            )}
            <Link className="text-[13px] relative hidden md:flex items-center gap-2  rounded  capitalize font-semibold bg-zinc-200 text-[rgb(240,107,41)] px-3 py-1.5">
              <span className="text-xl">
                <FaFileInvoiceDollar />
              </span>
              my oders
              <span className="text-[12px] absolute -top-3 -right-1.5">0</span>
            </Link>
            <Link className="bg-[rgb(240,107,41)] md:block hidden uppercase py-0.5 px-2.5 text-white rounded-full ">
              {user.FullName.slice(0, 1)}
            </Link>
            <button
              onClick={clickedHandlers}
              className="px-3 py-2.5 bg-red-500 md:block hidden rounded-lg text-white font-semibold tracking-tight leading-none"
            >
              Logout
            </button>
          </div>
        </div>
        <button className="text-xl md:hidden text-zinc-400">
          <FiMenu />
        </button>
      </div>
    </div>
  );
};

export default Navigation;
