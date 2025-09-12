import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { user } = useSelector((store) => store.Auth);
  console.log(user);
  return (
    <div className="w-full fixed py-4 flex items-center justify-between px-3 bg-zinc-800 text-white  ">
      <h1 className="font-semibold capitalize text-xl text-amber-200 ">
        annuSingh
      </h1>
      <div className="flex items-center justify-center gap-10">
        <Link
          to="/"
          className="text-md font-semibold tracking-tight leading-none capitalize"
        >
          home
        </Link>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="font-semibold text-md bg-zinc-600 px-7 py-2 rounded hover:bg-blue-700 capitalize "
          >
            login
          </Link>

          <Link
            to="/register"
            className="font-semibold text-md bg-blue-500 px-6 py-2 rounded hover:bg-blue-700 capitalize "
          >
            signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
