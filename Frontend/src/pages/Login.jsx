import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import instance from "../utils/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducer/AuthenticationSlice";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../FireBase/FireBase";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [users, setUsers] = useState({
    email: "",
    password: "",
  });

  const loginApi = async () => {
    try {
      setLoading(true);
      setErr("");
      const res = await instance.post("/auth/login", users, {
        withCredentials: true,
      });
      navigate("/");
      toast.success("successfully user login");
      dispatch(setUser(res.data.user));
      setUsers({
        email: "",
        password: "",
      });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErr(error.response.data.message);
      } else if (error.message) {
        setErr(error.message);
      } else {
        setErr("Internal server error");
      }
    } finally {
      setLoading(false);
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

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      const payload = {
        email: result.user.email,
      };
      const response = await instance.post("/auth/googlelogin", payload, {
        withCredentials: true,
      });
      dispatch(setUser(response.data.user));
      navigate("/");
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
    }
  };

  return (
    <div className="w-full  min-h-full h-[89.2vh] flex justify-center md:p-6 p-3 items-center bg-zinc-200   ">
      <div className="md:w-[30%] rounded p-5 bg-white ">
        <h1 className="text-3xl text-[rgb(240,107,41)] font-bold capitalize  tracking-tight leading-none ">
          vingo
        </h1>
        <p className="mt-2 leading-4 text-zinc-600 font-semibold text-sm tracking-tight">
          Welcome to vingo! please log in to access your dashboard and manage
          your orders efficiently.
        </p>
        <form className="mt-3" onSubmit={submitHandler}>
          <div className="mt-3">
            <label className="text-md text-zinc-900 capitalize font-semibold">
              email
            </label>
            <input
              className="border px-3 mt-1 font-semibold tracking-tight  py-2  rounded border-zinc-200 outline-none w-full"
              type="email"
              placeholder="Enter Your Email"
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
                className="border px-3 mt-1 py-2  rounded border-zinc-200 font-semibold tracking-tight outline-none w-full"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
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
              <div className="flex items-center gap-1.5">
                <h1>please wait...</h1>
                <div className="w-6 h-6 animate-spin border-b-2 border-t-2  rounded-full "></div>
              </div>
            ) : (
              "sign up"
            )}
          </button>
          {err && (
            <h1 className="text-[12px] mt-2 text-red-600 text-center font-semibold ">
              **{err}**
            </h1>
          )}
        </form>
        <button
          onClick={handleGoogleAuth}
          className="text-black hover:bg-zinc-200  capitalize font-semibold flex items-center w-full justify-center py-2 rounded-lg mt-5 border-zinc-300 gap-2  border-1"
        >
          <span className="text-xl mt-0.5">
            <FcGoogle />
          </span>
          sign up with google
        </button>

        <h1 className="text-center md:mt-5 mt-3.5 font-semibold text-md tracking-tight ">
          Don't have an account?{" "}
          <Link className="text-blue-500" to="/register">
            Sign up
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Login;
