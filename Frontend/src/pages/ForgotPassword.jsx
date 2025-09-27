import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { toast } from "react-toastify";
import instance from "../utils/axios";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otps, setOtps] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  console.log(err);

  //1
  const resetApi = async () => {
    try {
      setLoading(true);
      setErr("");
      const response = await instance.post(
        "/auth/reset",
        { email },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      toast.success(response.data.message);
      setStep(2);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErr(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Internal server error");
      }
    } finally {
      setLoading(false);
    }
  };

  const submitHandler1 = (e) => {
    e.preventDefault();
    resetApi();
  };

  //2
  const verifyApi = async () => {
    try {
      setLoading(true);
      const response = await instance.post(
        "/auth/verify",
        { email, otp: otps.trim() },
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setStep(3);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErr(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Internal server error");
      }
    } finally {
      setLoading(false);
    }
  };

  const submitHandler2 = (e) => {
    e.preventDefault();
    verifyApi();
  };

  //3
  const resetPasswordApi = async () => {
    if (newPassword != comfirmPassword) {
      toast.error("Passwords do not match");
      setComfirmPassword("");
      setNewPassword("");
      return;
    }

    try {
      setLoading(true);
      const response = await instance.post(
        "/auth/newpassword",
        { email, newPassword },
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      navigate("/login");
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

  const submitHandler3 = (e) => {
    e.preventDefault();
    resetPasswordApi();
  };
  return (
    <div className="w-full h-screen bg-zinc-200 flex items-center justify-center p-3 md:p-5 ">
      <div className="bg-white p-3 shadow-lg md:w-[23%] w-full rounded  ">
        <div className="flex items-center  gap-4">
          <Link to="/login" className="text-2xl">
            <GoArrowLeft />
          </Link>
          <h1 className="font-bold text-xl text-[rgb(240,107,41)] ">
            Forgot Password
          </h1>
        </div>
        {step == 1 && (
          <form className="mt-5" onSubmit={submitHandler1}>
            <div className="flex flex-col">
              <label className="text-md capitalize font-semibold tracking-tight leading-none">
                email
              </label>
              <input
                className="border px-1 font-semibold tracking-tight leading-none py-2  rounded-md mt-1 border-zinc-300 "
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="text-md capitalize font-semibold flex items-center justify-center text-white tracking-tight leading-none bg-[rgb(240,107,41)] w-full mt-5 px-1 py-3.5 rounded"
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <div className="flex items-center gap-1">
                  <h1>please wait...</h1>
                  <div className="w-6 h-6 animate-spin border-b-3  rounded-full "></div>
                </div>
              ) : (
                "sent OTP"
              )}
            </button>
            {err && (
              <h1 className="text-[11px] mt-2 text-center text-red-600 font-semibold ">
                **{err}**
              </h1>
            )}
          </form>
        )}

        {step == 2 && (
          <form className="mt-5" onSubmit={submitHandler2}>
            <div className="flex flex-col">
              <label className="text-md capitalize font-semibold tracking-tight leading-none">
                OTP
              </label>
              <input
                className="border px-1 font-semibold tracking-tight leading-none py-2  rounded-md mt-1 border-zinc-300 "
                type="text"
                placeholder="Enter Your OTP"
                value={otps}
                onChange={(e) => setOtps(e.target.value)}
              />
            </div>
            <button
              className="text-md capitalize font-semibold flex items-center justify-center text-white tracking-tight leading-none bg-[rgb(240,107,41)] w-full mt-5 px-1 py-3.5 rounded"
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <div className="flex items-center gap-1">
                  <h1>please wait...</h1>
                  <div className="w-6 h-6 animate-spin border-b-3  rounded-full "></div>
                </div>
              ) : (
                "verify OTP"
              )}
            </button>
            {err && (
              <h1 className="text-[11px] mt-2 text-center text-red-600 font-semibold ">
                **{err}**
              </h1>
            )}
          </form>
        )}

        {step == 3 && (
          <form className="mt-5" onSubmit={submitHandler3}>
            <div className="flex flex-col">
              <label className="text-md capitalize font-semibold tracking-tight leading-none">
                new password
              </label>
              <input
                className="border px-1 font-semibold tracking-tight leading-none py-2  rounded-md mt-1 border-zinc-300 "
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-5">
              <label className="text-md capitalize font-semibold tracking-tight leading-none">
                comfirm password
              </label>
              <input
                className="border px-1 font-semibold tracking-tight leading-none py-2  rounded-md mt-1 border-zinc-300 "
                type="password"
                placeholder="Comfirm Password"
                value={comfirmPassword}
                onChange={(e) => setComfirmPassword(e.target.value)}
              />
            </div>
            <button
              className="text-md capitalize font-semibold flex items-center justify-center text-white tracking-tight leading-none bg-[rgb(240,107,41)] w-full mt-5 px-1 py-3.5 rounded"
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <div className="flex items-center gap-1">
                  <h1>please wait...</h1>
                  <div className="w-6 h-6 animate-spin border-b-3  rounded-full "></div>
                </div>
              ) : (
                "reset password"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
