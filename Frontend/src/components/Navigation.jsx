import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="w-full fixed py-4 flex items-center justify-between px-3 bg-zinc-800 text-white  ">
      <h1 className="font-semibold capitalize text-xl text-amber-200 ">
        annuSingh
      </h1>
      <div className="flex items-center justify-center gap-10">
      <Link to='/' className="text-md font-semibold tracking-tight leading-none capitalize">home</Link>
        <Link to='register' className="font-semibold text-md bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 capitalize ">
          signup
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
