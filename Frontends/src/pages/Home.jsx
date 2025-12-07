import React from "react";
import Navigation from "../components/Navigation";
import Shop from "./Shop";
import Item from "./Item";
import { useSelector } from "react-redux";
import UserDetails from "./UserDetails";
import UserShopCity from "./UserShopCity";
import UserShopFoodCity from "./UserShopFoodCity";

const Home = () => {
  const { shop } = useSelector((store) => store.Shop);
  const { user } = useSelector((store) => store.Auth);
  return (
    <div className="w-full md:px-2 md:py-2 py-0.5 min-h-full">
      <Navigation />
      <div className="w-full min-h-[40vh]  px-25 mt-20 ">
        {user?.role === "user" && (
          <div className="w-full">
            <UserDetails />
            <UserShopCity />
            <UserShopFoodCity />
          </div>
        )}
        {user?.role === "owner" && (
          <div>
            <Shop />
            {shop.length > 0 && <Item />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
