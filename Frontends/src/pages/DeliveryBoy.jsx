import React from "react";
import { useSelector } from "react-redux";

const DeliveryBoy = () => {
  const { user } = useSelector((store) => store.Auth);
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[50%] rounded-lg bg-white p-2 flex shadow items-center justify-center flex-col">
        <h1 className="text-xl text-red-500 font-bold tracking-tight leading-none mb-2 capitalize">
          welcome, {user.FullName}
        </h1>
        <h1 className="text-red-800 capitalize text-center leading-none tracking-tight mt-1 mb-2">
          <span className="font-bold text-red-900">latitude</span>:{" "}
          {user.location.coordinates?.[1]},{" "}
          <span className="font-bold text-red-900">longitude</span>:{" "}
          {user.location.coordinates?.[0]}
        </h1>
      </div>
    </div>
  );
};

export default DeliveryBoy;
