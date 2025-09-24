import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import instance from "../utils/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/Authentication/AuthenticationSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState({
    email: "",
    password: "",
  });

  const loginApi = async () => {
    try {
      setLoading(true)
      const res = await instance.post("/auth/login", users, {
        withCredentials: true,
      });
      console.log(res.data.user);
      navigate("/");
      toast.success("successfully user login");
      dispatch(setUser(res.data.user));
      setUsers({
        email: "",
        password: "",
      });
    } catch (error) {
      if(error.res && error.res.data && error.res.data.message){
        toast.error(error.res.data.message)
      } else if (error.message){
        toast.error(error.message)
      } else {
        toast.error("Internal server error")
      }
    } finally {
      setLoading(false)
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    loginApi();
  };

  const clickedHandler = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="w-full  min-h-full h-[89.2vh] flex justify-center md:p-6 p-3 items-center bg-zinc-200   ">
      <div className="md:w-[30%] rounded p-5 bg-white ">
        <h1 className="text-3xl text-[rgb(240,107,41)] font-bold capitalize  tracking-tight leading-none ">
          vingo
        </h1>
        <p className="mt-2 leading-5 text-zinc-600 tracking-tight">
          Create your account to get started with delicious food deliveries
        </p>
        <form className="mt-3" onSubmit={submitHandler}>
          <div className="mt-3">
            <label className="text-md text-zinc-900 capitalize font-semibold">
              email
            </label>
            <input
              className="border px-3 mt-1 font-semibold  py-2  rounded border-zinc-200 outline-none w-full"
              type="email"
              placeholder="enter your email"
              required
              value={users.email}
              onChange={(e) => setUsers({ ...users, email: e.target.value })}
            />
          </div>
          <div className="mt-5">
            <label className="text-md text-zinc-900 capitalize font-semibold">
              password
            </label>
            <div className="relative">
              <input
                className="border px-3 mt-1 py-2 capitalize rounded border-zinc-200 outline-none w-full"
                type={showPassword ? "text" : "password"}
                placeholder="enter your password"
                required
                value={users.password}
                onChange={(e) =>
                  setUsers({ ...users, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={clickedHandler}
                className="text-md absolute top-[33%] right-[3%]"
                tabIndex={-1}
              >
                <span>{showPassword ? <IoEyeOff /> : <IoEye />}</span>
              </button>
            </div>
          </div>

          <Link
            to="/forgot-password"
            className="mt-5 block text-md text-[#ff4d2d] text-right font-semibold capitalize "
          >
            forgot password
          </Link>

          <button
            className={`bg-[rgb(240,107,41)] mt-3 hover:bg-[rgb(222,140,99)] w-full rounded p-3 text-white font-semibold capitalize tracking-tight leading-none flex items-center justify-center `}
            type="submit"
            disabled={loading}
          >
            {loading ? (
                <div className="w-5 h-5 rounded-full border-b-3 border-t-3 animate-spin inline-block"></div>
               
            ) : (
              "sign up"
            )}
          </button>
        </form>
        <button className="text-black hover:bg-zinc-200  capitalize font-semibold flex items-center w-full justify-center py-2 rounded-lg mt-5 border-zinc-300 gap-2  border-1">
          <span className="text-xl mt-0.5">
            <FcGoogle />
          </span>
          sign up with google
        </button>

        <h1 className="text-center mt-5 font-semibold text-md tracking-tight ">
          Already have an account?{" "}
          <Link className="text-blue-500" to="/register">
            Login
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Login;
