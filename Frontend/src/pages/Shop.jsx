import React, { useEffect } from "react";
import instance from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { IoRestaurant } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdRestaurant } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { setShop } from "../redux/reducer/ShopReducer";
import { toast } from "react-toastify";

const Shop = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.Auth);
  const { shop } = useSelector((store) => store.Shop);

  const shopFetchApi = async () => {
    try {
      const response = await instance.get("/shop/fetch", {
        withCredentials: true,
      });
      dispatch(setShop(response.data.shop));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Internal server error");
      }
    }
  };

  useEffect(() => {
    shopFetchApi();
    {/*let interval;
    if (shop && shop.length > 0) {
      interval = setInterval(() => {
        shopFetchApi();
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
    // eslint-disable-next-line*/}
  }, []);

  
  return (
    <div className="w-full  px-5 pb-6 mt-21.5 min-h-[30vh] flex items-start justify-center ">
      {shop.length <= 0 && (
        <div className="w-[24%] shadow bg-zinc-100 p-3 flex-col flex items-center justify-center rounded ">
          <h1 className="text-8xl font-semibold  text-[rgb(240,107,41)]">
            <IoRestaurant />
          </h1>
          <h1 className="text-xl font-bold  mt-4 capitalize tracking-tight leading-none">
            add your restaurant
          </h1>
          <p className="text-sm font-sans leading-5 mt-3.5 text-center  ">
            join our food delivery platform and reach at thousands of hungry
            customers every day.
          </p>
          <Link
            to={user && user.role === "owner" ? "/shop-create" : "/login"}
            className="bg-[rgb(240,107,41)] px-5 cursor-pointer rounded-full font-semibold text-white capitalize mt-3 py-2 "
          >
            add shops
          </Link>
        </div>
      )}
      {shop.length > 0 && (
        <div className="w-full   ">
          <div className=" flex items-center justify-center gap-3 text-3xl">
            <span className="text-[rgb(240,107,41)] leading-none">
              <MdRestaurant />{" "}
            </span>
            <h1 className="text-xl leading-none tracking-tight font-semibold capitaliz">
              welcome to shops
            </h1>
          </div>
          <div className="w-full  mt-4 flex gap-4 flex-wrap items-center justify-center">
            {shop.map((shop) => (
              <div
                key={shop._id}
                className="pb-5  hover:shadow-lg w-[28%] bg-white  rounded-lg"
              >
                <div className="w-full  relative h-[31vh] rounded-t-lg bg-amber-100 group overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                    src={shop.image}
                    alt="shop images"
                  />
                  <Link
                    to={`/shop-edit/${shop._id}`}
                    className="text-xl absolute top-[4%] right-[2%] text-[rgb(240,107,41)] bg-white hover:bg-zinc-500 p-2 rounded-full "
                  >
                    <FaPen />
                  </Link>
                </div>
                <h1 className="text-md capitalize  mt-4 ml-2 leading-none  font-bold ">
                  {shop.shopName}
                </h1>
                <h1 className="text-sm  ml-2 leading-none mt-3 font-semibold   text-zinc-600">
                  {shop.city}, {shop.state}
                </h1>
                <h1 className="text-sm  ml-2 leading-none mt-3 font-semibold   text-zinc-600">
                  {shop.address}
                </h1>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
