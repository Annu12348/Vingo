import React from "react";
import HeroSection from "./components/HeroSection";
import TrendingDishes from "./components/TrendingDishes";
import PopularRestaurants from "./components/PopularRestaurants";
import BrowseByCategory from "./components/BrowseByCategory";
import SpecialOffers from "./components/SpecialOffers";
import Testimonials from "./components/Testimonials";
import HomeFooter from "./components/HomeFooter";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-white text-[#1A1A1A] antialiased">
      <HeroSection />
      <TrendingDishes />
      <PopularRestaurants />
      <BrowseByCategory />
      <SpecialOffers />
      <Testimonials />
      <HomeFooter />
    </div>
  );
};

export default Home;
