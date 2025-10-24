import React from "react";
import Navigation from "../components/Navigation";
import Shop from "./Shop";
import Item from "./Item";
import { useSelector } from "react-redux";

const Home = () => {
  const { shop } = useSelector(store => store.Shop);
  return (
    <div className="w-full md:px-2    md:py-2 py-0.5  bg-zinc-100 min-h-full">
      <Navigation />
      <Shop />
      {shop.length > 0 && (
        <Item />
      )}
    </div>
  );
};

export default Home;
