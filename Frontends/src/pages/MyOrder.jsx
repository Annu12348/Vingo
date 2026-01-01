import React, { useEffect } from "react";
import OwnerOrderCard from "./OwnerOrderCard";
import UserOrderCard from "./UserOrderCard";
import { useDispatch, useSelector } from "react-redux";
import instance from "../utils/axios";
import { setOwnerOrders, setUserOrders } from "../redux/reducer/OrderReducer";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const MyOrder = () => {
  const { user } = useSelector((store) => store.Auth);
  const { userOrders } = useSelector((store) => store.Order);
  const { ownerOrders } = useSelector((store) => store.Order);
  const dispatch = useDispatch();

  const getUserOrderApi = async () => {
    try {
      const response = await instance.get("/order/user-order-fetch", {
        withCredentials: true,
      });
      dispatch(setUserOrders(response.data.orders));
    } catch (error) {
      console.error(error);
    }
  };

  const getOwnerOrderApi = async () => {
    try {
      const response = await instance.get("/order/owner-order-fetch", {
        withCredentials: true,
      });
      dispatch(setOwnerOrders(response.data.filteredOrders));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user?.role) return;
    if (user.role === "user") {
      getUserOrderApi();
    } else if (user.role === "owner") {
      getOwnerOrderApi();
    }
    // eslint-disable-next-line
  }, [user?.role]);

  return (
    <div className="w-full min-h-screen p-2">
      <div className="w-full p-2 flex items-center gap-2 ">
        <Link to="/" className="mt-1 text-xl">
          <IoArrowBackSharp />
        </Link>
        <h1 className="text-md capitalize font-bold tracking-tight ">
          my orders
        </h1>
      </div>
      <div className=" w-full  flex flex-col gap-2 items-center  justify-center  ">
        {user.role == "user"
          ? userOrders?.map((order) => (
              <UserOrderCard data={order} key={order._id} />
            ))
          : user.role == "owner"
          ? ownerOrders?.map((ownerOrder, idx) => (
              <OwnerOrderCard data={ownerOrder} key={idx} />
            ))
          : null}
      </div>
    </div>
  );
};

export default MyOrder;
