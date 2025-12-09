import React from "react";

const UserOrderCard = ({ data }) => {
  const formDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
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

      <div className="w-full ">
        {data.shopOrders.map((shopOrder) => (
          <div key={shopOrder._id} className="mt-7">
            <h1 className="text-xl font-bold capitalize tracking-tight leading-none">
              {shopOrder.shop.shopName}
            </h1>

            <div className="flex gap-2 flex-wrap items-center my-2 mt-3">
              {shopOrder.shopOrderItem.map((orderItem) => (
                <div
                  key={orderItem._id}
                  className="p-1 border  w-[24%] rounded "
                >
                  <img
                    className=" w-full h-[14vh] object-cover rounded "
                    src={orderItem.item.image}
                    alt={orderItem.item.name || "Order Item"}
                  />
                  <h1 className="text-md capitalize mt-2 font-semibold tracking-tight leading-none">
                    {orderItem.item.foodName}
                  </h1>
                  <h1 className="text-md capitalize pb-2 text-zinc-500 mt-1.5 font-semibold tracking-tight leading-none">
                    Qty : {orderItem.quantity} x ₹{orderItem.price}
                  </h1>
                </div>
              ))}
            </div>
            <hr className="text-xl text-zinc-300 my-1 mt-7" />
            <div className="flex w-full items-center justify-between">
              <h1 className="text-md  capitalize font-semibold tracking-tight leading-none">
                subTotal : ₹{shopOrder.subtotal}
              </h1>
              <h1 className="text-md capitalize  font-semibold text-blue-600">
                {data.status}
              </h1>
            </div>
          </div>
        ))}
      </div>
      <hr className="text-xl text-zinc-300 my-1 mt-2" />
      <div className="flex w-full items-center justify-between mt-3">
        <h1 className="text-md  capitalize font-semibold tracking-tight leading-none">
          total : ₹{data.totalAmount}
        </h1>
        <button className="text-md capitalize cursor-pointer  font-semibold text-white bg-red-500 px-4 rounded-lg py-2">
          track order
        </button>
      </div>
    </div>
  );
};

export default UserOrderCard;
