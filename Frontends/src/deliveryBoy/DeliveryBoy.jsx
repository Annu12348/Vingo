import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import instance from "../utils/axios";
import { setAcceptOrders, setDeliveryAssignment } from "../redux/reducer/AssignmentReducer";
import { toast } from "react-toastify";
import { Package } from 'lucide-react';
import DeliveryAcceptCreatingLiveTracking from "./DeliveryAcceptCreatingLiveTracking";
import { setLiveLocation } from "../redux/reducer/MapReducer";
import { setOrdertodayDeliveries } from "../redux/reducer/OrderReducer";
import Recharts from "./Recharts";

const DeliveryBoy = () => {
  const { user } = useSelector((store) => store.Auth);
  const dispatch = useDispatch();
  const { deliveryAssignment } = useSelector((store) => store.Assignment);
  const { acceptOrders } = useSelector((store) => store.Assignment);
  const [showOtpBox, setShowOtpBox] = useState(false)
  const [otp, setOtp] = useState("")
  const { socket } = useSelector(store => store.socket)
  const { liveLocation } = useSelector(store => store.Map)

  // Utility function to compare lat/lon with high precision (6 decimal places)
  function isLocationsEqual(locA, locB, precision = 6) {
    if (!locA || !locB) return false;
    // Allow for very slight floating point differences
    const toFixed = (num) => typeof num === "number" ? Number(num.toFixed(precision)) : null;
    return (
      toFixed(locA.lat) === toFixed(locB.lat) &&
      toFixed(locA.lon) === toFixed(locB.lon)
    );
  }

  // customerLocation and deliveryBoyLocation from acceptedOrder
  const customerLocation = acceptOrders?.customerLocation;
  const deliveryBoyLocation = acceptOrders?.deliveryBoyLocation;

  // Prefer the most recent live location if available for delivery boy
  const currentDeliveryBoyLocation = liveLocation?.latitude && liveLocation?.longitude
    ? { lat: Number(liveLocation.latitude), lon: Number(liveLocation.longitude) }
    : deliveryBoyLocation;

  const canMarkAsDelivered = !!acceptOrders && isLocationsEqual(currentDeliveryBoyLocation, customerLocation);

  useEffect(() => {
    if (!socket || user?.role !== "deliveryBoy") return;
    //console.log("wtch started")

    let watchId;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          dispatch(setLiveLocation({ latitude, longitude }));

          socket.emit('updateLocation', {
            latitude,
            longitude,
            userId: user.id,
          });
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true }
      );
    }
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [user, socket, dispatch]);

  const getdeliveryAssignment = async () => {
    try {
      const result = await instance.get("/deliveryBoy/assiments", {
        withCredentials: true,
      });
      dispatch(setDeliveryAssignment(result.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  const getdeliveryByIdAssignment = async (assignmentId) => {
    try {
      const result = await instance.post(
        `/deliveryBoy/${assignmentId}`,
        {},
        {
          withCredentials: true,
        }
      );
      // Also fetch new assignments and accepted orders if any
      getdeliveryAssignment();
      acceptOrder();
      toast.success(result.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const acceptOrder = async () => {
    try {
      const result = await instance.get("/deliveryBoy/assignment/accept", {
        withCredentials: true
      })
      dispatch(setAcceptOrders(result.data.data))
    } catch (error) {
      console.error(error)
    }
  }

  const sendotpApi = async () => {
    try {
      const result = await instance.post("/order/send-delivery-otp", {
        orderId: acceptOrders._id,
        shopOrderId: acceptOrders.shopOrder._id
      }, {
        withCredentials: true
      })
      setShowOtpBox(true)
      toast.success(result.data.message)
    } catch (error) {
      console.error(error)
    }
  }

  const verifyOtpApi = async () => {
    try {
      const result = await instance.post("/order/verify-delivery-otp", {
        orderId: acceptOrders._id,
        shopOrderId: acceptOrders.shopOrder._id,
        otp
      },
        { withCredentials: true }
      )
      toast.success(result.data.message)
    } catch (error) {
      console.error(error)
    }
  }

  const orderTodayDeliveries = async () => {
    try {
      const result = await instance.get("/order/order-today-deliveries", {
        withCredentials: true
      })
       dispatch(setOrdertodayDeliveries(result.data.data))
       console.log(result.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getdeliveryAssignment();
    acceptOrder()
    orderTodayDeliveries()
  }, [user]);

  const getLat = () => liveLocation?.latitude ?? user?.location?.coordinates?.[1] ?? "N/A";
  const getLng = () => liveLocation?.longitude ?? user?.location?.coordinates?.[0] ?? "N/A";

  return (
    <div className="w-full flex items-center justify-center flex-col gap-5">
      <div className="w-[50%] rounded-lg bg-white p-2 flex shadow items-center justify-center flex-col">
        <h1 className="text-xl text-red-500 font-bold tracking-tight leading-none mb-2 capitalize">
          Welcome, {user?.FullName}
        </h1>
        <h1 className="text-red-800 text-center font-semibold">
          <span className="font-bold">latitude:</span>{" "}
          {getLat()}
          <span className="font-bold ml-2">longitude:</span>{" "}
          {getLng()}
        </h1>
      </div>

      <Recharts />

      {!acceptOrders && (
        <div className="w-[50%] rounded-lg bg-white p-2 shadow">
          <h1 className="text-xl capitalize font-bold mb-3 tracking-tight">
            Available delivery Assignments
          </h1>
          {deliveryAssignment && deliveryAssignment.length > 0 ? (
            deliveryAssignment.map((item, idx) => (
              <div
                key={item.assignmentId || idx}
                className="border-3 border-zinc-400 hover:border-red-400 px-2 rounded mt-2 flex items-center justify-between"
              >
                <div>
                  <h1 className="text-md font-bold tracking-tight">
                    {item.shopName}
                  </h1>
                  <p className="text-sm text-zinc-600 font-semibold pb-0.5">
                    {item.deliveryAddress?.text}
                  </p>
                  <p className="text-sm text-zinc-600 font-semibold pb-1.5">
                    {item.items?.length ?? 0} item{(item.items?.length ?? 0) !== 1 ? "s" : ""} | ₹{item.subtotal}
                  </p>
                </div>
                <button
                  onClick={() => getdeliveryByIdAssignment(item.assignmentId)}
                  className="bg-amber-300 text-white px-6 capitalize font-semibold rounded cursor-pointer py-2"
                >
                  Accept
                </button>
              </div>
            ))
          ) : (
            <p className="text-xl font-semibold text-zinc-200 capitalize">
              No assignments available.....
            </p>
          )}
        </div>
      )}

      {acceptOrders && (
        <div className="bg-white p-2 w-[50%] rounded-lg shadow-sm">
          <h1 className="flex items-center gap-3 text-xl capitalize font-bold tracking-tight leading-none">
            <Package className="text-amber-500" />
            Current Order
          </h1>
          <div className="border border-zinc-400 p-2 rounded my-3">
            <p className="text-zinc-700 ml-2 font-semibold tracking-tight">
              {
                (() => {
                  const text = acceptOrders?.deliveryAddress?.text || "";
                  const parts = text.split(",").map(s => s.trim());
                  const filtered = parts.filter(Boolean);
                  const state = filtered.length >= 2 ? filtered[filtered.length - 2] : "";
                  const country = filtered.length >= 1 ? filtered[filtered.length - 1] : "";
                  return `${state}${state && country ? ', ' : ''}${country}`;
                })()
              }
            </p>
            <p className="ml-2 text-zinc-300 flex mt-1">
              {acceptOrders?.shopOrder?.shopOrderItem?.length ?? 0} | ₹{acceptOrders?.shopOrder?.subtotal ?? 0}
            </p>
          </div>
          <DeliveryAcceptCreatingLiveTracking data={acceptOrders} />
          {/* Mark as Delivered button should be present ONLY when locations are equal */}
          {!showOtpBox && canMarkAsDelivered && (
            <button
              onClick={sendotpApi}
              className="w-full cursor-pointer bg-green-500 rounded text-white mt-5 mb-2 p-4 font-bold capitalize tracking-tight leading-none"
            >
              Mark as Delivered
            </button>
          )}
          {/* If not equal, show disabled button with explanatory message */}
          {!showOtpBox && !canMarkAsDelivered && (
            <button
              className="w-full rounded cursor-not-allowed bg-gray-300 text-gray-500 mt-5 mb-2 p-4 font-bold capitalize tracking-tight leading-none opacity-60"
              disabled
              title="You must be at the customer's delivery location to mark this order as delivered"
            >
              Mark as Delivered
            </button>
          )}
          {showOtpBox && (
            <div className="mt-5 mb-2 border p-2 rounded border-zinc-300">
              <p className="font-semibold tracking-tight">
                Enter Otp sent to{" "}
                <span className="text-red-500">
                  {acceptOrders?.user?.fullname || "Customer"}
                </span>
              </p>
              <input
                className="w-full border p-2 rounded border-zinc-300 mt-2 mb-2 font-semibold outline-none"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                type="text"
                placeholder="Enter Otp"
              />
              <button
                className="bg-red-600 cursor-pointer p-2 w-full font-semibold tracking-tight rounded mt-1"
                onClick={verifyOtpApi}
              >
                Submit OTP
              </button>
            </div>
          )}
          {/* Show a helper message if unable to mark as delivered */}
          
        </div>
      )}
    </div>
  );
};

export default DeliveryBoy;
