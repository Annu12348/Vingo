/*import React, { useEffect } from "react";
import OwnerOrderCard from "./OwnerOrderCard";
import { useSelector } from "react-redux";
import UserOrderCard from "./UserOrderCard";
import instance from "../utils/axios";

const MyOrder = () => {
  const { user } = useSelector((store) => store.Auth);
  

  const getUserOrderApi = async () => {
    try {
      const response = await instance.get("/order/user-order-fetch", {
        withCredentials: true,
      });
      console.log(response.data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  const getOwnerOrderApi = async () => {
    try {
      const response = await instance.get("/order/owner-order-fetch", {
        withCredentials: true,
      });
      console.log(response.data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user.role === "user") {
      getUserOrderApi();
    } else if (user.role === "owner") {
      getOwnerOrderApi();
    }
  }, [user.role]);
  return (
    <div>
      {user.role === "user" && <UserOrderCard />}
      {user.role === "owner" && <OwnerOrderCard />}
    </div>
  );
};

export default MyOrder;
*/



import React, { useEffect, useState } from "react";
import OwnerOrderCard from "./OwnerOrderCard";
import UserOrderCard from "./UserOrderCard";
import { useSelector } from "react-redux";
import instance from "../utils/axios";

const MyOrder = () => {
  const { user } = useSelector((store) => store.Auth);

  const [orders, setOrders] = useState([]);

  const getUserOrderApi = async () => {
    try {
      const response = await instance.get("/order/user-order-fetch", {
        withCredentials: true,
      });
      setOrders(response.data.orders);
      console.log(response.data.orders)
    } catch (error) {
      console.error(error);
    }
  };

  const getOwnerOrderApi = async () => {
    try {
      const response = await instance.get("/order/owner-order-fetch", {
        withCredentials: true,
      });

      setOrders(response.data.orders); 
      console.log(response.data.orders)// ✅ store owner orders
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user.role === "user") {
      getUserOrderApi();
    } else if (user.role === "owner") {
      getOwnerOrderApi();
    }
  }, [user.role]);

  return (
    <div>
      {user.role === "user" && <UserOrderCard orders={orders} />}
      {user.role === "owner" && <OwnerOrderCard orders={orders} />}
    </div>
  );
};

export default MyOrder;
