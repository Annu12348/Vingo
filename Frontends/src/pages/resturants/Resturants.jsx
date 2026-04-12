import React, { useState } from 'react'
import HomeNavbar from '../home/components/HomeNavbar';
import HomeFooter from "../home/components/HomeFooter"
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Search from '../home/components/Search';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import useModal from '../../hook/useModal';

// Fixed: extractUniqueCategories should NOT be a hook/useNavigate/useModal; it should be pure.
const extractUniqueCategories = (shops) => {
  const categories = shops?.map(
    s => typeof s.category === "string" ? s.category.trim() : ""
  ).filter(Boolean);
  return Array.from(new Set(categories.map(c => c.trim())))
    .map(c => ({
      label: c,
      value: c
    }));
};

const Resturants = () => {
  const { publicShop = [] } = useSelector(store => store.Shop);

  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fix: get hooks inside the component
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { user } = useSelector(store => store.Auth);

  const shopCategories = extractUniqueCategories(publicShop);
  const categoryOptions = [
    { label: 'All', value: 'all' },
    ...shopCategories
  ];

  const filteredShop = selectedCategory === 'all'
    ? publicShop
    : publicShop.filter(
      item =>
        typeof item?.category === "string" &&
        item.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
    );

  const handleOrderNow = (id) => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role === "user") {
      navigate(`/details/${id}`);
    } else {
      showModal({
        title: "Order Restricted",
        message:
          "Only 'user' accounts can place orders. Please log in with a user account.",
        type: "confirm",
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-white relative">
      <HomeNavbar />
      <div className="w-full relative">
        <div className="overflow-hidden w-full rounded-b-xl h-[70vh] md:h-[55vh] lg:h-[70vh] relative">
          <img
            className="w-full h-full object-cover"
            src="https://static.vecteezy.com/system/resources/thumbnails/051/199/167/small_2x/rustic-kitchen-countertop-with-a-selection-of-ingredients-for-a-homemade-pizza-recipe-including-dough-tomato-sauce-fresh-mozzarella-basil-leaves-and-sliced-pepperoni-photo.jpg"
            alt="restaurants banner"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent"></div>
          <div className='w-full flex rounded-b-4xl items-center justify-center flex-col gap-6 absolute inset-0 opacity-100'>
            <div>
              <h1 className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-center">
                Resturants
              </h1>
              <p className="text-white text-center font-semibold mt-2 text-base sm:text-lg">
                Discover the Best Place to Eat Near You
              </p>
            </div>
            <div className="max-w-xs w-full px-2 sm:max-w-md md:max-w-lg lg:max-w-2xl">
              <Search />
            </div>
          </div>
        </div>
        <div className="overflow-hidden pb-5 w-full">
          <div className="bg-zinc-50 p-2 sm:p-5 shadow-md mt-4 sm:mt-10 border-t border-b border-zinc-400 flex flex-wrap gap-y-2 items-center justify-center gap-3 sm:gap-6 md:gap-10">
            <div className="flex flex-wrap gap-3 sm:gap-6 md:gap-10 capitalize font-semibold justify-center">
              {categoryOptions.map(option => (
                <button
                  key={option.value}
                  className={`px-3 py-2 sm:px-4 rounded-lg focus:outline-none transition text-sm sm:text-base
                    ${selectedCategory === option.value ? "bg-orange-200 text-orange-900" : "hover:bg-zinc-200"}`}
                  onClick={() => setSelectedCategory(option.value)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="py-8 sm:py-14 px-2  sm:px-4 md:px-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-6  rounded-lg w-full">
            {filteredShop.length > 0 ? (
              filteredShop.map(item => (
                <div
                  key={item._id}
                  className="
                    w-full 
                    sm:w-[47%]
                    md:w-[31%]
                    lg:w-[23.7%] 
                    relative
                    cursor-pointer bg-zinc-100 shadow rounded-lg overflow-hidden
                    flex flex-col
                    min-w-[260px] max-w-[420px]
                  "
                >
                  <img
                    className="w-full h-[32vw] min-h-[120px] max-h-[220px] md:h-[180px] lg:h-[30vh] object-cover object-center"
                    src={item?.image}
                    alt={item?.shopName || 'restaurant'}
                  />
                  <div className="py-2 px-2 flex flex-col gap-1">
                    <div className="flex items-center border-b pb-2 border-zinc-300 justify-between">
                      <h1 className="text-md font-semibold tracking-tight leading-none truncate max-w-[55%]">
                        {item?.shopName}
                      </h1>
                      <span className="text-sm capitalize text-red-500 truncate max-w-[40%]">
                        {item?.category}
                      </span>
                    </div>
                    <div className="flex mt-2 items-center border-b pb-2 border-zinc-300 justify-between">
                      <span className="text-md flex items-center gap-1 tracking-tight leading-none">
                        {typeof item?.rating === 'number' && item?.rating > 0 ? (
                          <span className="flex items-center">
                            {[...Array(4)].map((_, i) => (
                              <span key={i} className="text-lime-600">
                                <MdOutlineStarPurple500 />
                              </span>
                            ))}
                            <span className="ml-2 text-black text-sm">{item.rating}</span>
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs sm:text-sm">No rating available</span>
                        )}
                      </span>
                      <span className="text-sm tracking-tight leading-none truncate max-w-[50%] text-right">
                        {item?.deliveryTime}
                      </span>
                    </div>
                    <div className="flex mt-2 items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm text-zinc-600 tracking-tight flex gap-1 leading-none items-center">
                        <FaLocationCrosshairs className="hidden sm:inline-block" />
                        <span className="truncate">{item?.city}, {item?.state}</span>
                      </span>
                      <span className="text-xs sm:text-sm tracking-tight leading-none text-zinc-600 text-right">
                        Min Order: ₹ {item?.minOrderAmount}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOrderNow(item._id)}
                    className='text-sm capitalize absolute bottom-30 bg-green-500 p-3 rounded font-semibold tracking-tight leading-none text-white right-2 cursor-pointer'
                  >
                    Shop details
                  </button>
                </div>
              ))
            ) : (
              <div className="w-full text-center text-gray-400 mt-20 text-lg sm:text-xl font-semibold">
                No restaurants found for this category.
              </div>
            )}
          </div>
        </div>
        <div className="w-full p-1 sm:p-2 overflow-hidden">
          <img className="w-full h-[23vh] sm:h-[32vh] md:h-[36vh] lg:h-[45vh] rounded-2xl object-cover" src="https://b.zmtcdn.com/data/o2_assets/e067a1cf0d3fe27b366402b98b994e9f1716296909.png" alt="" />
        </div>
        <HomeFooter />
      </div>
    </div>
  )
}

export default Resturants
