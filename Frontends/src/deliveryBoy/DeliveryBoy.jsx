import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import instance from "../utils/axios";
import { setAcceptOrders, setDeliveryAssignment } from "../redux/reducer/AssignmentReducer";
import { toast } from "react-toastify";
import { Package } from 'lucide-react';
import DeliveryAcceptCreatingLiveTracking from "./DeliveryAcceptCreatingLiveTracking";
import { setLiveLocation } from "../redux/reducer/MapReducer";
import { setOrderAllDeliveries, setOrdertodayDeliveries } from "../redux/reducer/OrderReducer";
import Recharts from "./Recharts";
import { useNavigate } from "react-router-dom";
import AllDelivery from "./AllDelivery";

const DeliveryBoy = () => {
  const { user } = useSelector((store) => store.Auth);
  const dispatch = useDispatch();
  const { deliveryAssignment } = useSelector((store) => store.Assignment);
  const { acceptOrders } = useSelector((store) => store.Assignment);
  const [showOtpBox, setShowOtpBox] = useState(false)
  const [otp, setOtp] = useState("")
  const { socket } = useSelector(store => store.socket)
  const { liveLocation } = useSelector(store => store.Map)

  function isLocationsEqual(locA, locB, precision = 6) {
    if (!locA || !locB) return false;
    const toFixed = (num) => typeof num === "number" ? Number(num.toFixed(precision)) : null;
    return (
      toFixed(locA.lat) === toFixed(locB.lat) &&
      toFixed(locA.lon) === toFixed(locB.lon)
    );
  }

  const customerLocation = acceptOrders?.customerLocation;
  const deliveryBoyLocation = acceptOrders?.deliveryBoyLocation;

  const currentDeliveryBoyLocation = liveLocation?.latitude && liveLocation?.longitude
    ? { lat: Number(liveLocation.latitude), lon: Number(liveLocation.longitude) }
    : deliveryBoyLocation;

  const canMarkAsDelivered = !!acceptOrders && isLocationsEqual(currentDeliveryBoyLocation, customerLocation);

  useEffect(() => {
    if (!socket || user?.role !== "deliveryBoy") return;

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
      window.location.reload();
      toast.success(result.data.message);
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
    } catch (error) {
      console.error(error)
    }
  }

  const allDeliveredOrders = async () => {
    try {
      const result = await instance.get("/order/order-All-deliveries", {
        withCredentials: true
      })
      dispatch(setOrderAllDeliveries(result.data.data))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getdeliveryAssignment();
    acceptOrder()
    orderTodayDeliveries()
    allDeliveredOrders()
  }, [user]);

  const getLat = () => liveLocation?.latitude ?? user?.location?.coordinates?.[1] ?? "N/A";
  const getLng = () => liveLocation?.longitude ?? user?.location?.coordinates?.[0] ?? "N/A";

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5 px-2 sm:px-4 md:px-8">
      <div className="w-full max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl rounded-lg bg-white p-4 sm:p-6 md:p-8 shadow flex flex-col items-center justify-center mx-auto">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-red-500 font-bold tracking-tight leading-tight mb-2 capitalize text-center">
          Welcome, {user?.FullName}
        </h1>
        <div className="text-red-800 text-center font-semibold break-all text-sm sm:text-base md:text-lg w-full flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4">
          <span className="font-bold">Latitude:</span>
          <span>{getLat()}</span>
          <span className="font-bold">Longitude:</span>
          <span>{getLng()}</span>
        </div>
      </div>
      <Recharts />
      <AllDelivery />
      {!acceptOrders && (
        <div className="bg-white rounded-lg shadow-md p-5 w-full max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto mb-6 border border-orange-100 flex flex-col">
          <h1 className="text-xl md:text-2xl font-bold capitalize mb-2 md:mb-4 tracking-tight text-center text-orange-600">
            Available Delivery Assignments
          </h1>
          {deliveryAssignment && deliveryAssignment.length > 0 ? (
            <div className="flex flex-col gap-3 md:gap-4">
              {deliveryAssignment.map((item, idx) => (
                <div
                  key={item.assignmentId || idx}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border border-zinc-200 hover:border-orange-400 transition-colors px-3 md:px-5 py-3 rounded-lg bg-gray-50 shadow-sm"
                >
                  <div className="flex flex-col flex-1 min-w-0 md:pr-3">
                    <h2 className="text-base md:text-lg font-semibold tracking-tight text-gray-800 truncate">
                      {item.shopName}
                    </h2>
                    <div className="flex flex-col gap-1 w-full">
                      <p className="text-xs sm:text-sm md:text-base text-gray-700 font-medium break-words whitespace-pre-line w-full">
                        {item.deliveryAddress?.text}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {item.deliveryType &&
                          <span className="bg-blue-100 text-blue-700 text-[10px] sm:text-xs px-2 py-0.5 rounded font-semibold uppercase tracking-wide">
                            {item.deliveryType === "industrial" ? "Industrial" : "Production"}
                          </span>
                        }
                        {item.zone &&
                          <span className="bg-orange-100 text-orange-700 text-[10px] sm:text-xs px-2 py-0.5 rounded font-semibold uppercase tracking-wide">
                            {item.zone}
                          </span>
                        }
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 font-semibold">
                      {item.items?.length ?? 0} item{(item.items?.length ?? 0) !== 1 ? "s" : ""} | <span className="text-green-600 font-bold">₹{item.subtotal}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => getdeliveryByIdAssignment(item.assignmentId)}
                    className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 transition text-white px-4 py-2 capitalize font-semibold rounded focus:outline-none focus:ring-2 focus:ring-orange-400 shadow text-sm md:text-base"
                  >
                    Accept
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-base md:text-lg font-semibold text-gray-400 capitalize py-6">
              No assignments available...
            </p>
          )}
        </div>
      )}
      {acceptOrders && (
        <div className="bg-white rounded-lg shadow-md p-5 w-full max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto mb-6 border border-orange-100 flex flex-col">
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
          {!showOtpBox && canMarkAsDelivered && (
            <button
              onClick={sendotpApi}
              className="w-full cursor-pointer bg-green-500 rounded text-white mt-5 mb-2 p-4 font-bold capitalize tracking-tight leading-none"
            >
              Mark as Delivered
            </button>
          )}
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
        </div>
      )}
    </div>
  );
};

export default DeliveryBoy;
