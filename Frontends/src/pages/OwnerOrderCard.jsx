import React, { useState } from "react";
import { MdOutlineLocalPhone } from "react-icons/md";
import instance from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { ownerUpdateOrderStatus, userUpdateOrderStatus } from "../redux/reducer/OrderReducer";

const OwnerOrderCard = ({ data }) => {
  const dispatch = useDispatch();
  const { ownerOrders } = useSelector((store) => store.Order);
  const [availableBoys, setAvailableBoys] = useState([]);

  const handlerUpdateStatus = async (orderId, shopId, status) => {
    try {
      if (!orderId || !shopId) {
        console.error("Missing IDs", { orderId, shopId });
        return;
      }

      const response = await instance.post(
        `/order/owner-order-fetch/${orderId}/${shopId}`,
        { status },
        { withCredentials: true }
      );
      console.log(response.data);
      dispatch(ownerUpdateOrderStatus({ orderId, shopId, status }));
      setAvailableBoys(response.data.availableBoy || []);
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="md:w-[55%] w-full bg-white rounded py-2 px-3 shadow pb-5">
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
        <h1 className="text-md mt-3.5 text-zinc-500  tracking-tight ">
          {data.deliveryAddress.text}
        </h1>
        <p className="text-md  text-zinc-500 capitalize  tracking-tight ">
          lat: {data.deliveryAddress.latitude} , long:{" "}
          {data.deliveryAddress.longitude}
        </p>
      </div>

      <div className="mt-6 flex gap-2 flex-wrap">
        {data.shopOrders.map((shop) =>
          shop.shopOrderItem.map((item) => (
            <div
              key={item._id}
              className="md:w-[24%] w-[48.8%] border border-zinc-300 shadow rounded p-1"
            >
              <img
                className=" w-full h-[14vh] object-cover rounded "
                src={item.item.image}
                alt="Order Item"
              />
              <h1 className="text-md capitalize mt-2 font-semibold tracking-tight leading-none">
                {item.name}
              </h1>
              <h1 className="text-md capitalize pb-2 text-zinc-500 mt-1.5 font-semibold tracking-tight leading-none">
                Qty : {item.quantity} x ₹{item.price}
              </h1>
            </div>
          ))
        )}
      </div>

      <hr className="mt-6 text-zinc-200" />

      <div className="mt-2 flex items-center justify-between ">
        <h1 className="text-md capitalize font-semibold ">
          status : <span className="text-[#de4f4fdd]">{data.shopOrders?.[0].status}</span>
        </h1>

        <select
        
          onChange={(e) => handlerUpdateStatus(data._id, data.shopOrders?.[0]?.shop?._id, e.target.value)}
          className="border-2 rounded px-2 capitalize font-semibold py-1 focus:border-red-900 outline-none border-zinc-500"
        >
          <option value="">change status</option>
          <option value="pending">pending</option>
          <option value="preparing">preparing</option>
          <option value="delivered">delivered</option>
          <option value="out of delivery">out of delivery</option>
        </select>
      </div>

      <div className="flex items-center justify-end mt-2">
        {data.shopOrders.map((total, index) => (
          <h1 key={index} className="text-md font-bold capitalize tracking-tight">
            total : {total.subtotal}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default OwnerOrderCard;
