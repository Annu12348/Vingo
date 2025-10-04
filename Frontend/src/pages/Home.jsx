import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import instance from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setShops } from "../redux/reducer/ShopSlice";
import { IoRestaurant } from "react-icons/io5";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { shops } = useSelector((store) => store.Shops);
  const { user } = useSelector((store) => store.Auth);
  console.log(user)

  const shopFetchApi = async () => {
    try {
      const response = await instance.get("/shop/fetch", {
        withCredentials: true,
      });
      dispatch(setShops(response.data.shops));
    } catch (error) {
      dispatch(setShops([]));
      console.error(error);
    }
  };

  useEffect(() => {
    shopFetchApi();
    console.log(shops.length);
  }, []);

  const handleClicked = () => {
    alert("hello world");
  };

  return (
    <div className="w-full px-2   md:py-2 py-0.5  bg-white min-h-full">
      <Navigation />
      <div className="w-full p-1 mt-21.5 min-h-[85.5vh] flex items-start justify-center ">
        {shops.length == 0 && (
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
      </div>
    </div>
  );
};

export default Home;
