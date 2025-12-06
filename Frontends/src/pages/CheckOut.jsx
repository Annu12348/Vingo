import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdMyLocation } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaMobile } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { setAddress, setLocation } from "../redux/reducer/MapReducer";
import axios from "axios";
import instance from "../utils/axios";

const RecenterMap = ({ location }) => {
  if (location.lat && location.lon) {
    const map = useMap();
    map.setView([location.lat, location.lon], 13, { animate: true });
  }
  return null;
};

const CheckOut = () => {
  const { location } = useSelector((store) => store.Map);
  const { address } = useSelector((store) => store.Map);
  const apiKey = import.meta.env.VITE_GEOAPIFY_APIKEY;
  const [addressInput, setAddressInput] = useState("");
  const [payMent, setPayMent] = useState("cod");
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.Item);
  const { totalAmount } = useSelector((store) => store.Item);
  const deliveryFees = totalAmount>500?0:40
  const totalAmountWithDeliveryFees = totalAmount+deliveryFees
  const navigate = useNavigate()

  const onDragend = (e) => {
    const { lat, lng } = e.target._latlng;
    dispatch(setLocation({ lat: lat, lon: lng }));
    getAddressByLatLng(lat, lng);
  };

  const getCurrentLocation = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        dispatch(setLocation({ lat: latitude, lon: longitude }));
        getAddressByLatLng(latitude, longitude);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getAddressByLatLng = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`
      );
      dispatch(setAddress(response.data.results[0].address_line2));
    } catch (error) {
      console.error(error);
    }
  };

  const getLatLonByAddress = async () => {
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          addressInput
        )}&format=json&apiKey=${apiKey}`
      );
      const { lat, lon } = response?.data?.results[0];
      dispatch(setLocation({ lat, lon }));
    } catch (error) {
      console.error(error);
    }
  };

  const handlerPlaceOrder = async () => {
    try {
      const response = await instance.post('/order/place-order', {
        totalAmount,
        paymentMethod: payMent,
        cartItems,
        deliveryAddress: {
          text: addressInput,
          latitude: location.lat,
          longitude: location.lon
        }
      }, {
        withCredentials: true
      })
      console.log(response.data.newOrder)
      navigate("/place-order")
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setAddressInput(address);
  }, [address]);

  return (
    <div className="min-h-full w-full  py-1 ">
      <Link to="/cart" className="text-2xl text-zinc-300 mt-2 ml-3 block ">
        <FaArrowLeftLong />
      </Link>

      <div className="w-full flex items-center justify-center  p-3   min-h-[75vh]">
        <div className="py-4 px-4 shadow-lg md:w-[40%] bg-white rounded-lg ">
          <h1 className="text-xl capitalize font-bold tracking-tight leading-none ">
            checkout
          </h1>
          <div className="mt-4.5 flex items-end w-full gap-2">
            <div className="w-[85%]">
              <label className="flex items-center gap-2 text-md capitalize font-semibold tracking-tight leading-none ">
                <span className="text-xl text-red-500">
                  <FaMapMarkerAlt />
                </span>
                delivery location
              </label>
              <input
                className="border w-full mt-1 py-1.5 px-2 capitalize outline-none rounded-md text-zinc-500 font-semibold tracking-tight leading-none"
                type="text"
                placeholder="enter your delivery address"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
              />
            </div>
            <span
              onClick={getLatLonByAddress}
              className=" bg-red-500 cursor-pointer p-2.5 rounded-lg text-white font-semibold"
            >
              <CiSearch />
            </span>
            <span
              onClick={getCurrentLocation}
              className=" bg-blue-500 cursor-pointer p-2.5 rounded-lg text-white font-semibold"
            >
              <MdMyLocation />
            </span>
          </div>

          <div className="w-full h-[26vh] overflow-hidden border mt-5 rounded-lg border-zinc-400 flex items-center justify-center ">
            <MapContainer
              className={"w-full h-full"}
              center={[location.lat, location.lon]}
              zoom={13}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <RecenterMap location={location} />
              <Marker
                position={[location.lat, location.lon]}
                draggable
                eventHandlers={{ dragend: onDragend }}
              ></Marker>
            </MapContainer>
          </div>

          <div className="w-full  mt-4  ">
            <h1 className="font-semibold capitalize leading-none tracking-tight">
              payment method
            </h1>
            <div className="w-full md:flex items-center justify-between">
              <div
                className={`p-2 flex gap-3 items-center  mt-1.5 border ${
                  payMent === "cod"
                    ? "border-red-700"
                    : "bg-zinc-100 border-none"
                } w-full  md:w-[49%] rounded `}
                onClick={() => setPayMent("cod")}
              >
                <span className="text-xl bg-zinc-200 block w-fit p-1.5 rounded-full ">
                  <RiSecurePaymentFill />
                </span>
                <div>
                  <h1 className="text-md tracking-tight leading-none font-semibold capitalize ">
                    cash on delivery
                  </h1>
                  <p className="text-sm text-zinc-400 font-semibold mt-1 ">
                    Pay when your food arrives
                  </p>
                </div>
              </div>
              <div
                onClick={() => setPayMent("online")}
                className={`p-2 flex gap-3  items-center md:mt-1.5 mt-3 shadow ${
                  payMent === "online" ? "border-red-700 border" : "bg-zinc-100"
                } mt-1.5 w-full md:w-[50%] rounded `}
              >
                <span className="text-xl bg-zinc-200 block text-blue-900 w-fit p-1.5 rounded-full ">
                  <FaMobile />
                </span>
                <span className="text-xl bg-zinc-200 block w-fit text-blue-900 p-1.5 rounded-full ">
                  <MdPayment />
                </span>
                <div>
                  <h1 className="text-md tracking-tight leading-none font-semibold capitalize ">
                    UPI / Credit / Debit Card
                  </h1>
                  <p className="text-sm text-zinc-400 font-semibold mt-1 ">
                    Pay securely online
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full  mt-5 ">
            <h1 className="text-md capitalize font-semibold tracking-tight leading-none">
              order summary
            </h1>
            <div className="py-1 px-3 border mt-1.5 pb-4 rounded-lg border-zinc-400">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex mt-2 font-normal  w-full items-center justify-between"
                >
                  <span className="text-sm font-semibold text-zinc-600 capitalize tracking-tight leading-none">
                    {item.foodName} x {item.quantity}
                  </span>
                  <span className="text-md capitalize text-zinc-600 tracking-tight leading-none">
                    ₹{item.quantity * item.price}
                  </span>
                </div>
              ))}
              <hr className="mt-3 text-zinc-300" />
              <div className="w-full  mt-2 flex items-center justify-between">
                <span className="tracking-tight font-semibold text-md capitalize leading-none">
                  subtotal
                </span>
                <span className="tracking-tight font-semibold text-md capitalize leading-none">
                  {totalAmount}
                </span>
              </div>

              <div className="w-full  mt-2 text-zinc-500 flex items-center justify-between">
                <span className="tracking-tight font-semibold text-md capitalize leading-none">
                  deliveryFees
                </span>
                <span className="tracking-tight font-semibold text-md capitalize leading-none">
                  {deliveryFees==0?"free" : 40}
                </span>
              </div>

              <div className="w-full  mt-2 text-red-600 flex items-center justify-between">
                <span className="tracking-tight font-semibold text-md capitalize leading-none">
                  total
                </span>
                <span className="tracking-tight font-semibold text-md capitalize leading-none">
                  {totalAmountWithDeliveryFees}
                </span>
              </div>
            </div>
          </div>

          <button className="mt-5 cursor-pointer flex items-center justify-center bg-red-500 py-3 w-full rounded text-white capitalize font-semibold  " onClick={handlerPlaceOrder}>
            {payMent=="cod" ? "place order" : "pay & place order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
