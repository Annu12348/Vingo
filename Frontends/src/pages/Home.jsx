import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Shop from "./Shop";
import Item from "./Item";
import { useSelector } from "react-redux";
import UserDetails from "../user/UserDetails";
import UserShopCity from "../user/UserShopCity";
import UserShopFoodCity from "../user/UserShopFoodCity";
import DeliveryBoy from "../deliveryBoy/DeliveryBoy";

const Home = () => {
  const { shop } = useSelector((store) => store.Shop);
  const { user } = useSelector((store) => store.Auth);
  const { itemByCity } = useSelector((store) => store.Item);
  const [updatedItemsList, setUpdatedItemLinst] = useState([])

  const handleFilterByCategory = (category) => {
    if (category == "All Food") {
      setUpdatedItemLinst(itemByCity)
    } else {
      const filteredList = itemByCity.filter(i => i.category === category)
      setUpdatedItemLinst(filteredList)
    }
  }

  useEffect(() => {
    setUpdatedItemLinst(itemByCity)
  }, [itemByCity])


  return (
    <div className="w-full md:px-2  md:py-2 py-0.5 min-h-full">
      <Navigation />
      <div className="w-full min-h-[40vh]   md:px-25 md:mt-20 mt-12 ">
        {user?.role === "user" && (
          <div className="w-full ">
            <UserDetails
              onclicked={handleFilterByCategory}
            />
            <UserShopCity />
            <UserShopFoodCity
              data={itemByCity}
              updatedItemsList={updatedItemsList}
            />
          </div>
        )}
        {user?.role === "owner" && (
          <div className="w-full ">
            <Shop />
            {shop.length > 0 && <Item />}
          </div>
        )}
        {user?.role === "deliveryBoy" && <DeliveryBoy />}
      </div>
    </div>
  );
};

export default Home;
