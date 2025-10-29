import React from "react";
import Navigation from "../components/Navigation";
import Shop from "./Shop";
import Item from "./Item";
import { useSelector } from "react-redux";

const Home = () => {
  const { shop } = useSelector(store => store.Shop);
  const { user } = useSelector(store => store.Auth);
  return (
    <div className="w-full md:px-2    md:py-2 py-0.5   min-h-full">
      <Navigation />
      {user.role === "owner" && (
        <>
          <Shop />
          {shop.length > 0 && <Item />}
        </>
      )}
    </div>
  );
};

export default Home;
