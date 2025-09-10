import React, { useState } from "react";
import Navigation from "../components/Navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
  const [val, setVal] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    contact: "",
  });

  const registerAoi = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/register", val, {
        withCredentials: true,
      });
      console.log(response.data);
      setVal(response.data);
      toast.success("successfully register");
      navigate("/")
      setVal({ 
        fullname: "",
        email: "",
        password: "",
        role: "",
        contact: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("please try again later");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    registerAoi();
  };
  return (
    <div className="w-full min-h-full p-[0.1px]   ">
      <Navigation />
      <div className="w-full mt-18 md:h-[89.7vh] h-[89.2vh] flex justify-center md:p-6 p-3 items-center bg-zinc-200   ">
        <div className="md:w-[35%] rounded p-4 bg-white ">
          <h1 className="text-xl font-semibold capitalize text-center tracking-tight leading-none ">
            register
          </h1>
          <form className="mt-6" onSubmit={submitHandler}>
            <input
              className="border px-3 py-2 capitalize rounded border-zinc-200 outline-none w-full"
              type="text"
              placeholder="full name"
              required
              value={val.fullname}
              onChange={(e) => setVal({ ...val, fullname: e.target.value })}
            />
            <input
              className="border px-3 py-2 mt-6 capitalize rounded border-zinc-200 outline-none w-full"
              type="text"
              placeholder="contact"
              required
              value={val.contact}
              onChange={(e) => setVal({ ...val, contact: e.target.value })}
            />
            <input
              className="border px-3  py-2 mt-6 rounded border-zinc-200 outline-none w-full"
              type="email"
              placeholder="email"
              required
              value={val.email}
              onChange={(e) => setVal({ ...val, email: e.target.value })}
            />
            <input
              className="border px-3 py-2 capitalize mt-6 rounded border-zinc-200 outline-none w-full"
              type="password"
              placeholder="password"
              required
              value={val.password}
              onChange={(e) => setVal({ ...val, password: e.target.value })}
            />
            <div className="mt-6 capitalize font-semibold ">
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
            <input
              className="bg-blue-900 mt-6 hover:bg-blue-700 w-full rounded p-3 text-white font-semibold capitalize tracking-tight leading-none"
              type="submit"
              value="register"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
