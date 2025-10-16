import React from "react";
import Navigation from "../components/Navigation";
import Shop from "./Shop";

const Home = () => {

  return (
    <div className="w-full px-2   md:py-2 py-0.5  bg-white min-h-full">
      <Navigation />
      <Shop />
    </div>
  );
};

export default Home;
