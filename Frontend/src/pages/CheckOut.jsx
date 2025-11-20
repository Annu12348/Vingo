import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdMyLocation } from "react-icons/md";

const CheckOut = () => {
  return (
    <div className="min-h-screen w-full py-[1px] ">
      <Link to="/cart" className="text-2xl text-zinc-600 mt-2 ml-3 block ">
        <FaArrowLeftLong />
      </Link>
      <div className="w-full flex items-center justify-center p-3 h-[95vh]">
        <div className="py-4 px-4 shadow-lg w-[40%] bg-white rounded-lg ">
          <h1 className="text-xl capitalize font-bold tracking-tight leading-none ">
            checkout
          </h1>
          <div className="mt-4.5 flex items-end w-full gap-2">
            <div className="w-[85%]">
              <label className="flex items-center gap-2 text-md capitalize font-semibold tracking-tight leading-none ">
                <span className="text-xl text-red-500">
                  <FaMapMarkerAlt />
                </span>
                delivery location
              </label>
              <input
                className="border-1 w-full mt-1 py-1.5 px-2 capitalize outline-none rounded-md text-zinc-500 font-semibold tracking-tight leading-none"
                type="text"
                placeholder="enter your delivery address"
              />
            </div>
            <span className=" bg-red-500 cursor-pointer p-2.5 rounded-lg text-white font-semibold">
              <CiSearch />
            </span>
            <span className=" bg-blue-500 cursor-pointer p-2.5 rounded-lg text-white font-semibold">
              <MdMyLocation />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
