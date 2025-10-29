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
import { setShop } from "../redux/reducer/ShopReducer";
import { setItem } from "../redux/reducer/ItemReducer";

const Navigation = () => {
  const { user } = useSelector((store) => store.Auth);
  const [values, setValues] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { city } = useSelector((store) => store.Auth);
  const { shop } = useSelector((store) => store.Shop);

  const logoutApi = async () => {
    try {
      await instance.delete("/auth/logout", { withCredentials: true });
      dispatch(setUser(null));
      dispatch(setShop([]));
      dispatch(setItem([]));
      persistor.purge();
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
  };
  return (
    <div className="w-full fixed z-10   flex    items-center justify-center     ">
      <div className="md:w-[59%] w-full bg-zinc-100 shadow rounded      py-2 px-3 flex items-center  justify-between  gap-4 ">
        <Link
          to="/"
          className="text-[rgb(240,107,41)] text-xl tracking-tight leading-none capitalize font-bold "
        >
          vingo
        </Link>
        <div className="flex w-[100%] items-center justify-end ">
          {user && user.role == "user" && (
            <div className="shadow bg-zinc-100 rounded md:mr-13 p-1.5 flex items-center justify-between w-[100%]   md:w-[59.5%]">
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
            {user?.role === "user" && (
              <span className=" text-2xl md:block hidden relative text-[rgb(240,107,41)]">
                <CiShoppingCart />
                <span className="text-[12px] absolute -top-1.5 -right-1.5">
                  0
                </span>
              </span>
            )}

            {user?.role === "owner" && shop.length > 0 && (
              <div>
                <Link
                  to="/add-food"
                  className="text-[13px] hidden md:flex items-center gap-2 rounded capitalize font-semibold bg-zinc-200 text-[rgb(240,107,41)] px-3 py-1.5"
                >
                  <span className="text-xl">
                    <IoMdAdd />
                  </span>
                  add food item
                </Link>
                <Link
                  to="/add-food"
                  className="text-md p-1 md:hidden  bg-zinc-300 rounded-full text-red-950 text-2xl  block"
                >
                  <IoMdAdd />
                </Link>
              </div>
            )}

            <Link className="text-[11px] relative hidden md:flex items-center gap-2  rounded  capitalize font-semibold bg-zinc-200 text-[rgb(240,107,41)] px-3 py-1.5">
              <span className="text-xl">
                <FaFileInvoiceDollar />
              </span>
              my oders
            </Link>
            <Link className="bg-[rgb(240,107,41)] md:block hidden uppercase py-0.5 px-2.5 text-white rounded-full ">
              {user?.FullName.slice(0, 1)}
            </Link>
            <button
              onClick={clickedHandlers}
              className="px-3 py-2.5 bg-red-500 md:block cursor-pointer hidden rounded-lg text-white font-semibold tracking-tight leading-none"
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
