import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdMyLocation } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaMobile } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { useSelector } from "react-redux";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const CheckOut = () => {
  const { location } = useSelector((store) => store.Map);
  const { address } = useSelector((store) => store.Map);
  return (
    <div className="min-h-screen w-full bg-fuchsia-500 py-1 ">
      <Link to="/cart" className="text-2xl text-zinc-600 mt-2 ml-3 block ">
        <FaArrowLeftLong />
      </Link>
      <div className="w-full flex items-center justify-center pb-10  p-3 h-[95vh]">
        <div className="py-4 px-4 shadow-lg w-[40%] bg-white rounded-lg ">
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
                value={address}
              />
            </div>
            <span className=" bg-red-500 cursor-pointer p-2.5 rounded-lg text-white font-semibold">
              <CiSearch />
            </span>
            <span className=" bg-blue-500 cursor-pointer p-2.5 rounded-lg text-white font-semibold">
              <MdMyLocation />
            </span>
          </div>

          <div className="w-full h-[26vh] border mt-5 rounded-lg border-zinc-400 flex items-center justify-center ">
            <MapContainer
              className={"w-full h-full"}
              center={[location.lat, location.lon]}
              zoom={13}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[location.lat, location.lon]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          <div className="w-full flex items-center justify-between mt-2.5  ">
            <div className="p-2 flex gap-3 items-center mt-3  border border-red-700  w-[49%] rounded ">
              <span className="text-xl bg-zinc-400 block w-fit p-1.5 rounded-full ">
                <RiSecurePaymentFill />
              </span>
              <div>
                <h1 className="text-md tracking-tight leading-none font-semibold capitalize ">
                  payment method
                </h1>
                <p className="text-sm text-zinc-400 font-semibold mt-1 ">
                  Pay when your food arrives
                </p>
              </div>
            </div>
            <div className="p-2 flex gap-3  items-center shadow bg-zinc-200 mt-3 w-[50%] rounded ">
              <span className="text-xl bg-zinc-400 block w-fit p-1.5 rounded-full ">
                <FaMobile />
              </span>
              <span className="text-xl bg-zinc-400 block w-fit p-1.5 rounded-full ">
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

          <div className="w-full  mt-5 ">
            <h1 className="text-md capitalize font-semibold tracking-tight leading-none">
              order summary
            </h1>
            <div className="py-2 px-3 border mt-2.5 rounded border-zinc-400">
              <div className="flex items-center justify-between">
                <h1 className="text-zinc-500 font-semibold capitalize tracking-tight ">
                  corn pizza X 1
                </h1>
                <h1 className="font-semibold text-zinc-600">₹199.00</h1>
              </div>
              <div className="flex items-center justify-between mt-3.5">
                <h1 className=" font-semibold capitalize tracking-tight ">
                  subtotal
                </h1>
                <h1 className="font-semibold">₹199.00</h1>
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <h1 className=" font-semibold  text-zinc-500 capitalize tracking-tight ">
                  delivery
                </h1>
                <h1 className="font-semibold text-zinc-500">₹40.00</h1>
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <h1 className=" font-semibold  text-red-500 capitalize tracking-tight ">
                  total
                </h1>
                <h1 className="font-semibold text-red-500">₹239.00</h1>
              </div>
            </div>
          </div>

          <button className="mt-5 bg-red-500 py-3 w-full rounded text-white capitalize font-semibold  ">
            place order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
