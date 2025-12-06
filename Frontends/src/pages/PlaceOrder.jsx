import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PlaceOrder = () => {
  return (
    <div className="flex w-full min-h-screen items-center justify-center px-4">
      <div className="flex flex-col items-center ">
        <span className="text-green-500 text-4xl ">
          <FaCircleCheck />
        </span>
        <h1 className="text-xl tracking-tight leading-none capitalize font-bold mt-2.5">
          order placed!
        </h1>
        <p className="text-[17px] md:block hidden   font-semibold my-2 text-center text-zinc-500">
          Thank you for your purchase. Your order is being prepared You <br /> can
          track your order status in the "My Orders" section.
        </p>
        <p className="text-[17px] md:hidden  font-semibold my-2 text-center text-zinc-500">
          Thank you for your purchase. Your order is being prepared You  can
          track your order status in the "My Orders" section.
        </p>
        <Link to='/my-order' className="text-md mt-2 font-semibold text-white bg-amber-700 py-2 px-5 rounded">Back to my orders</Link>
      </div>
    </div>
  );
};

export default PlaceOrder;
