import React from "react";
import Navigation from "../components/Navigation";

const Login = () => {
  

  

  
  return (
    <div className="w-full min-h-full p-[0.1px]   ">
      <Navigation />
      <div className="w-full mt-18 md:h-[89.7vh] h-[89.2vh] flex justify-center md:p-6 p-3 items-center bg-zinc-200   ">
        <div className="md:w-[35%] rounded p-4 bg-white ">
          <h1 className="text-xl font-semibold capitalize text-center tracking-tight leading-none ">
            register
          </h1>
          <form className="mt-6" >
            
            
            <input
              className="border px-3  py-2 mt-6 rounded border-zinc-200 outline-none w-full"
              type="email"
              placeholder="email"
              required
              
            />
            <input
              className="border px-3 py-2 capitalize mt-6 rounded border-zinc-200 outline-none w-full"
              type="password"
              placeholder="password"
              required
              
            />
            
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

export default Login;
