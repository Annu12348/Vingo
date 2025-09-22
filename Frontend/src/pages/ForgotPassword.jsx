import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

const ForgotPassword = () => {
  const [step, setStep] = useState(3);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [comfirmPassword, setComfirmPassword] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(email)
    console.log(otp)
    console.log(newPassword)
    console.log(comfirmPassword)
  }
  return (
    <div className="w-full h-screen bg-zinc-200 flex items-center justify-center p-5 ">
      <div className="bg-white p-3 shadow-lg w-[23%] rounded  ">
        <div className="flex items-center  gap-4">
          <Link to="/login" className="text-2xl">
            <GoArrowLeft />
          </Link>
          <h1 className="font-bold text-xl text-[rgb(240,107,41)] ">
            Forgot Password
          </h1>
        </div>
        {step == 1 && (
          <form className="mt-5" onSubmit={submitHandler}>
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
                <div className="w-6 h-6 animate-spin border-b-3 border-t-2 rounded-full "></div>
              ) : "sent OTP"}
            </button>
          </form>
        )}


        {step == 2 && (
          <form className="mt-5" onSubmit={submitHandler}>
            <div className="flex flex-col">
              <label className="text-md capitalize font-semibold tracking-tight leading-none">
                OTP
              </label>
              <input
                className="border px-1 font-semibold tracking-tight leading-none py-2  rounded-md mt-1 border-zinc-300 "
                type="text"
                placeholder="Enter Your OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              className="text-md capitalize font-semibold flex items-center justify-center text-white tracking-tight leading-none bg-[rgb(240,107,41)] w-full mt-5 px-1 py-3.5 rounded"
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <div className="w-6 h-6 animate-spin border-b-3 border-t-2 rounded-full "></div>
              ) : "verify OTP"}
            </button>
          </form>
        )}


        {step == 3 && (
          <form className="mt-5" onSubmit={submitHandler}>
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
                <div className="w-6 h-6 animate-spin border-b-3 border-t-2 rounded-full "></div>
              ) : "reset password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
