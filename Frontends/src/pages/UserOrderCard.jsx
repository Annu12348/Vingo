import React from "react";

const UserOrderCard = ({ data }) => {
  
  const formDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }
  return (
    <div className="md:w-[48%] w-full bg-white rounded py-2 px-3 shadow">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-md font-semibold capitalize ">
          order <span>#{data._id.slice(-6)}</span>
        </h1>
        <h1 className="text-md uppercase font-semibold text-zinc-400">
          {data.paymentMethod}
        </h1>
      </div>
      <div className="w-full flex items-center justify-between ">
        <h1 className="text-md text-zinc-400 capitalize ">
          Date : <span>{formDate(data.createdAt)}</span>
        </h1>
        <h1 className="text-md capitalize font-semibold text-blue-600">
          {data.status}
        </h1>
      </div>
      <hr className="text-xl text-zinc-300 my-1 mt-2" />

      {data.shopOrders.map((shopOrder, idx) => (
        <h1 key={idx}>hello</h1>
      ))}
    </div>
  );
};

export default UserOrderCard;
