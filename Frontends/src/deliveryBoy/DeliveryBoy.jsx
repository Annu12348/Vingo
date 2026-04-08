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
{/*
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
import AllDelivery from "./AllDelivery";

/**
 * 100% production & industrial standard UI for DeliveryBoy Page. Maintains
 * separation of concerns, clear feedback, strong accessibility, and strict BEM-style structure.
 
const DeliveryBoy = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.Auth);
  const { deliveryAssignment, acceptOrders } = useSelector((store) => store.Assignment);
  const { socket } = useSelector((store) => store.socket);
  const { liveLocation } = useSelector((store) => store.Map);

  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState("");

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
  const currentDeliveryBoyLocation = (liveLocation?.latitude && liveLocation?.longitude)
    ? { lat: Number(liveLocation.latitude), lon: Number(liveLocation.longitude) }
    : deliveryBoyLocation;

  const canMarkAsDelivered = !!acceptOrders && isLocationsEqual(currentDeliveryBoyLocation, customerLocation);

  // Side Effects: Location ↔️ Socket updates
  useEffect(() => {
    if (!socket || user?.role !== "deliveryBoy") return;
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          dispatch(setLiveLocation({ latitude, longitude }));
          socket.emit('updateLocation', { latitude, longitude, userId: user.id });
        },
        (error) => {
          toast.error("Unable to get location for live tracking.");
          console.error(error);
        },
        { enableHighAccuracy: true }
      );
    }
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [user, socket, dispatch]);

  // Data loaders
  const getdeliveryAssignment = async () => {
    try {
      const result = await instance.get("/deliveryBoy/assiments", { withCredentials: true });
      dispatch(setDeliveryAssignment(result.data.data));
    } catch (error) {
      toast.error("Failed to fetch assignments.");
      console.error(error);
    }
  };

  const getdeliveryByIdAssignment = async (assignmentId) => {
    try {
      const result = await instance.post(
        `/deliveryBoy/${assignmentId}`,
        {},
        { withCredentials: true }
      );
      await getdeliveryAssignment();
      await acceptOrder();
      toast.success(result.data.message);
    } catch (error) {
      toast.error("Failed to accept assignment.");
      console.error(error);
    }
  };

  const acceptOrder = async () => {
    try {
      const result = await instance.get("/deliveryBoy/assignment/accept", { withCredentials: true });
      dispatch(setAcceptOrders(result.data.data));
    } catch (error) {
      toast.error("Accept order failed.");
      console.error(error);
    }
  };
  
  const sendotpApi = async () => {
    try {
      const result = await instance.post(
        "/order/send-delivery-otp",
        {
          orderId: acceptOrders._id,
          shopOrderId: acceptOrders.shopOrder._id,
        },
        { withCredentials: true }
      );
      setShowOtpBox(true);
      toast.success(result.data.message);
    } catch (error) {
      toast.error("Failed to send OTP.");
      console.error(error);
    }
  };
  const verifyOtpApi = async () => {
    try {
      const result = await instance.post(
        "/order/verify-delivery-otp",
        {
          orderId: acceptOrders._id,
          shopOrderId: acceptOrders.shopOrder._id,
          otp,
        },
        { withCredentials: true }
      );
      toast.success(result.data.message);
      window.location.reload();
    } catch (error) {
      toast.error("OTP verification failed.");
      console.error(error);
    }
  };

  const orderTodayDeliveries = async () => {
    try {
      const result = await instance.get("/order/order-today-deliveries", { withCredentials: true });
      dispatch(setOrdertodayDeliveries(result.data.data));
    } catch (error) {
      toast.error("Failed to fetch today's deliveries.");
      console.error(error);
    }
  };

  const allDeliveredOrders = async () => {
    try {
      const result = await instance.get("/order/order-All-deliveries", { withCredentials: true });
      dispatch(setOrderAllDeliveries(result.data.data));
    } catch (error) {
      toast.error("Failed to fetch delivered orders.");
      console.error(error);
    }
  };

  useEffect(() => {
    getdeliveryAssignment();
    acceptOrder();
    orderTodayDeliveries();
    allDeliveredOrders();
    // eslint-disable-next-line
  }, [user]);

  const getLat = () => liveLocation?.latitude ?? user?.location?.coordinates?.[1] ?? "N/A";
  const getLng = () => liveLocation?.longitude ?? user?.location?.coordinates?.[0] ?? "N/A";

  // --- UI Components ---
  // Assignment Card
  const AssignmentCard = ({ item, onAccept }) => {
    const { shopName, deliveryAddress, deliveryType, zone, items = [], subtotal, assignmentId } = item;
    return (
      <div className="assignment-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-neutral-200 hover:border-indigo-400 transition px-3 md:px-6 py-3 rounded-lg bg-[#f8fafc] shadow-sm">
        <div className="flex flex-col flex-1 min-w-0 md:pr-3">
          <h2 className="assignment-card__shop text-base md:text-lg font-semibold text-neutral-800 truncate">{shopName}</h2>
          <div className="flex flex-col gap-1 w-full">
            <p className="text-xs sm:text-sm md:text-base text-neutral-700 font-medium">{deliveryAddress?.text}</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {deliveryType && (
                <span className={
                  deliveryType === "industrial"
                    ? "bg-blue-600 text-white text-2xs px-2 py-0.5 rounded font-semibold uppercase tracking-widest"
                    : "bg-green-600 text-white text-2xs px-2 py-0.5 rounded font-semibold uppercase tracking-widest"
                }>
                  {deliveryType === "industrial" ? "Industrial" : "Production"}
                </span>
              )}
              {zone && (
                <span className="bg-yellow-100 text-yellow-700 text-2xs px-2 py-0.5 rounded font-semibold uppercase tracking-wider border border-yellow-300">
                  {zone}
                </span>
              )}
            </div>
          </div>
          <p className="text-xs md:text-sm text-neutral-500 font-semibold">
            {items.length} item{items.length !== 1 ? "s" : ""} | <span className="text-green-700 font-bold">₹{subtotal}</span>
          </p>
        </div>
        <button
          onClick={() => onAccept(assignmentId)}
          className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-2 capitalize font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow text-sm md:text-base"
          aria-label="Accept this assignment"
        >
          Accept
        </button>
      </div>
    );
  };

  // Current Order Card
  const CurrentOrderCard = () => {
    return (
      <div className="order-active bg-white rounded-lg shadow-md p-6 w-full max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto mb-8 border border-indigo-100 flex flex-col">
        <h1 className="flex items-center gap-3 text-xl capitalize font-bold tracking-tight">
          <Package className="text-indigo-500" />
          Current Delivery
        </h1>
        <div className="border border-neutral-300 p-3 rounded my-3 bg-neutral-50">
          <p className="text-neutral-800 font-semibold">
            {(() => {
              const text = acceptOrders?.deliveryAddress?.text || "";
              const parts = text.split(",").map(s => s.trim());
              const filtered = parts.filter(Boolean);
              const state = filtered.length >= 2 ? filtered[filtered.length - 2] : "";
              const country = filtered.length >= 1 ? filtered[filtered.length - 1] : "";
              return `${state}${state && country ? ', ' : ''}${country}`;
            })()}
          </p>
          <p className="flex gap-2 items-center text-neutral-400 text-sm mt-1">
            {acceptOrders?.shopOrder?.shopOrderItem?.length ?? 0} items | <span className="text-green-700 font-semibold">₹{acceptOrders?.shopOrder?.subtotal ?? 0}</span>
          </p>
        </div>
        <DeliveryAcceptCreatingLiveTracking data={acceptOrders} />
        {!showOtpBox && canMarkAsDelivered && (
          <button
            onClick={sendotpApi}
            className="w-full cursor-pointer bg-green-600 hover:bg-green-700 rounded-lg text-white mt-6 mb-2 p-4 font-bold capitalize transition focus:outline-none focus:ring-2 focus:ring-green-300"
            aria-label="Mark as Delivered"
          >
            Mark as Delivered
          </button>
        )}
        {!showOtpBox && !canMarkAsDelivered && (
          <button
            className="w-full rounded-lg cursor-not-allowed bg-neutral-200 text-neutral-500 mt-6 mb-2 p-4 font-bold capitalize opacity-70"
            disabled
            title="Arrive at customer location to enable delivery"
            aria-label="Mark as Delivered unavailable"
          >
            Mark as Delivered
          </button>
        )}
        {showOtpBox && (
          <div className="mt-6 mb-2 border p-4 rounded-lg border-neutral-300 bg-neutral-50">
            <label className="font-semibold" htmlFor="otp-input">
              Enter OTP sent to{" "}
              <span className="text-indigo-600">
                {acceptOrders?.user?.fullname || "Customer"}
              </span>
            </label>
            <input
              autoFocus
              className="w-full border p-2 rounded-lg border-neutral-300 mt-2 mb-3 font-semibold focus:outline-indigo-500 transition"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              id="otp-input"
              placeholder="Enter OTP"
            />
            <button
              className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer p-2 w-full font-semibold rounded-lg text-white transition"
              onClick={verifyOtpApi}
            >
              Submit OTP
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="deliveryboy-app w-full min-h-screen bg-gradient-to-br from-slate-50 to-white flex flex-col items-center py-0 px-2 sm:px-5 md:px-12">
      {/* Welcome Banner 
      <section className="w-full max-w-3xl flex flex-col items-center rounded-xl bg-white/95 p-6 md:p-10 mt-8 shadow-xl border-b-2 border-indigo-100 mb-2">
        <h1 className="text-center text-slate-800 font-extrabold text-2xl md:text-3xl tracking-tight mb-3">
          Hello, <span className="text-indigo-600">{user?.FullName}</span>
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center items-center mt-1">
          <span className="text-base md:text-lg font-semibold text-indigo-700 flex gap-1">
            <span className="font-semibold">Latitude:</span> {getLat()}
          </span>
          <span className="text-base md:text-lg font-semibold text-indigo-700 flex gap-1">
            <span className="font-semibold">Longitude:</span> {getLng()}
          </span>
        </div>
      </section>

      {/* Charts 
      <section className="w-full max-w-3xl my-4">
        <Recharts />
      </section>

      {/* All Deliveries (History) 
      <section className="w-full max-w-3xl my-2">
        <AllDelivery />
      </section>

      {/* Assignment selection or Current Order 
      <section className="w-full max-w-3xl mt-2 mb-12">
        {!acceptOrders ? (
          <div className="bg-white rounded-2xl shadow-lg p-7 border border-neutral-100">
            <h2 className="text-2xl font-bold capitalize mb-5 tracking-tight text-center text-indigo-700">
              Available Delivery Assignments
            </h2>
            {deliveryAssignment && deliveryAssignment.length > 0 ? (
              <div className="flex flex-col gap-5">
                {deliveryAssignment.map((item, idx) => (
                  <AssignmentCard key={item.assignmentId || idx} item={item} onAccept={getdeliveryByIdAssignment} />
                ))}
              </div>
            ) : (
              <p className="text-center text-lg font-semibold text-neutral-400 py-10">
                No assignments available at this time.
              </p>
            )}
          </div>
        ) : (
          <CurrentOrderCard />
        )}
      </section>
    </main>
  );
};

export default DeliveryBoy;
*/}