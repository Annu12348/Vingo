import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/Authentication/AuthenticationSlice";
import instance from "../utils/axios";
import { FcGoogle } from "react-icons/fc";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [val, setVal] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    contact: "",
  });

  const registerAoi = async () => {
    try {
      setLoading(true);
      const response = await instance.post("/auth/register", val, {
        withCredentials: true,
      });
      dispatch(setUser(response.data));
      toast.success(response.data.message || "successfully register");
      navigate("/");
      setVal({
        fullname: "",
        email: "",
        password: "",
        role: "",
        contact: "",
      });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Internal server error");
      }
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    registerAoi();
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
          <div>
            <label className="text-md text-zinc-900 capitalize font-semibold">
              full name
            </label>
            <input
              className="border px-3 py-2 capitalize rounded border-zinc-200 outline-none w-full"
              type="text"
              placeholder="enter your full name"
              required
              value={val.fullname}
              onChange={(e) => setVal({ ...val, fullname: e.target.value })}
            />
          </div>
          <div className="mt-3">
            <label className="text-md text-zinc-900 capitalize font-semibold">
              mobile
            </label>
            <input
              className="border px-3 py-2  capitalize rounded border-zinc-200 outline-none w-full"
              type="text"
              placeholder="enter your contact"
              required
              value={val.contact}
              onChange={(e) => setVal({ ...val, contact: e.target.value })}
            />
          </div>
          <div className="mt-3">
            <label className="text-md text-zinc-900 capitalize font-semibold">
              email
            </label>
            <input
              className="border px-3  py-2  rounded border-zinc-200 outline-none w-full"
              type="email"
              placeholder="enter your email"
              required
              value={val.email}
              onChange={(e) => setVal({ ...val, email: e.target.value })}
            />
          </div>
          <div className="mt-3">
            <label className="text-md text-zinc-900 capitalize font-semibold">
              password
            </label>
            <div className="relative">
              <input
                className="border px-3 py-2 capitalize rounded border-zinc-200 outline-none w-full"
                type={showPassword ? "text" : "password"}
                placeholder="enter your password"
                required
                value={val.password}
                onChange={(e) => setVal({ ...val, password: e.target.value })}
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
          <div className="mt-3 capitalize font-semibold ">
            <h1 className="font-semibold mb-1 tracking-tight text-xl leading-none  ">
              Role
            </h1>
            <label className="md:mr-15 mr-10 ">
              <input
                className=""
                type="radio"
                name="role"
                checked={val.role === "user"}
                value="user"
                onChange={(e) => setVal({ ...val, role: e.target.value })}
              />
              user
            </label>
            <label className="md:mr-15 mr-10">
              <input
                className=""
                type="radio"
                name="role"
                value="owner"
                checked={val.role === "owner"}
                onChange={(e) => setVal({ ...val, role: e.target.value })}
              />
              owner
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="deliveryBoy"
                onChange={(e) => setVal({ ...val, role: e.target.value })}
                checked={val.role === "deliveryBoy"}
              />
              deliveryBoy
            </label>
          </div>
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
        <button className="text-black hover:bg-zinc-200 capitalize font-semibold flex items-center w-full justify-center py-2 rounded-lg mt-3 border-zinc-300 gap-2  border-1">
          <span className="text-xl mt-0.5">
            <FcGoogle />
          </span>
          sign up with google
        </button>

        <h1 className="text-center mt-4 font-semibold text-md tracking-tight ">
          Already have an account?{" "}
          <Link className="text-blue-500" to="/login">
            Login
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Register;
