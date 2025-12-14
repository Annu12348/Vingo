import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducer/AuthenticationSlice";
import instance from "../utils/axios";
import { FcGoogle } from "react-icons/fc";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../FireBase/FireBase";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState({});
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
      setErr({});
      const response = await instance.post("/auth/register", val, {
        withCredentials: true,
      });
      dispatch(setUser(response.data.user));
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
      if (error.response && error.response.data && error.response.data.errors) {
        const fieldsError = {};
        const err = error.response.data.errors;
        err.forEach((e) => {
          fieldsError[e.path] = e.msg;
        });
        setErr(fieldsError);
      } else if (
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

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      const payload = {
        fullname: result.user.displayName,
        email: result.user.email,
        contact: val.contact || "1231234789",
        role: "user",
      };
      const response = await instance.post("/auth/google", payload, {
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
    <div className="w-full  min-h-screen flex justify-center md:p-6 p-3 items-center bg-zinc-200   ">
      <div className="md:w-[30%] rounded p-5 bg-white ">
        <h1 className="text-3xl text-[rgb(240,107,41)] font-bold capitalize  tracking-tight leading-none ">
          vingo
        </h1>
        <p className="mt-4 leading-4 font-semibold text-sm text-zinc-600 tracking-tight">
          Register for Vingo’s industrial-grade platform and streamline your
          food delivery experience.
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
            {err.fullname && (
              <p className="text-red-600 text-[9px]  font-semibold ">
                *{err.fullname}*
              </p>
            )}
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
            {err.contact && (
              <p className="text-red-600 text-[9px]  font-semibold ">
                *{err.contact}*
              </p>
            )}
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
            {err.email && (
              <p className="text-red-600 text-[9px]  font-semibold ">
                *{err.email}*
              </p>
            )}
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
              {err.password && (
                <p className="text-red-600 text-[9px]  font-semibold ">
                  *{err.password}*
                </p>
              )}
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
          {err.role && (
            <p className="text-red-600 text-[9px]  font-semibold ">
              *{err.role}*
            </p>
          )}
          <button
            className={`bg-[rgb(240,107,41)] mt-3 cursor-pointer hover:bg-[rgb(222,140,99)] w-full rounded p-3 text-white font-semibold capitalize tracking-tight leading-none flex items-center justify-center `}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              
                <div className="w-6 h-6 animate-spin border-b-3 border-t-3  rounded-full "></div>
              
            ) : (
              "sign up"
            )}
          </button>
        </form>
        <button
          onClick={handleGoogleAuth}
          className="text-black hover:bg-zinc-200 capitalize font-semibold flex items-center w-full justify-center py-2 rounded-lg mt-3 border-zinc-300 gap-2  border-1"
        >
          <span className="text-xl mt-0.5">
            <FcGoogle />
          </span>
          sign up with google
        </button>

        <h1 className="text-center mt-4  text-md tracking-tight ">
          Already have an account?{" "}
          <Link className="text-blue-500" to="/login">
            login
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Register;
