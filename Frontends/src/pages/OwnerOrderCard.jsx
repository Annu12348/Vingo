import React from "react";
import { MdOutlineLocalPhone } from "react-icons/md";

const OwnerOrderCard = ({ data }) => {
  
  return (
    <div className="md:w-[48%] w-full bg-white rounded py-2 px-3 shadow">
      <div className="w-full mt-1">
        <h1 className="text-xl capitalize font-bold tracking-tight leading-none ">
          {data.user.fullname}
        </h1>
        <p className="text-md mt-1 text-zinc-500 tracking-tight leading-none">
          {data.user.email}
        </p>
        <p className="flex items-center gap-2 mt-1  text-md text-zinc-500 ">
          <span className="text-md">
            <MdOutlineLocalPhone />
          </span>{" "}
          : {data.user.contact}
        </p>
      </div>

      <div className=" ">
      <p>{data.user.role}</p>
      </div>
    </div>
  );
};

export default OwnerOrderCard;