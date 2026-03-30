import React, { useState } from 'react'
import HomeNavbar from '../home/components/HomeNavbar';
import HomeFooter from "../home/components/HomeFooter"
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Search from '../home/components/Search';
import { FaLocationCrosshairs } from 'react-icons/fa6';

// Use unique values as per your prompt data example for categories:
const extractUniqueCategories = (shops) => {
  const categories = shops?.map(
    s => typeof s.category === "string" ? s.category.trim() : ""
  ).filter(Boolean);
  // Remove duplicates and lowercase for robustness
  return Array.from(new Set(categories.map(c => c.trim())))
    .map(c => ({
      label: c,
      value: c
    }));
};

const Resturants = () => {
  const { publicShop = [] } = useSelector(store => store.Shop);

  // Build dynamic category options from publicShop, plus 'all'
  const shopCategories = extractUniqueCategories(publicShop);
  const categoryOptions = [
    { label: 'All', value: 'all' },
    ...shopCategories
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter by category (case-insensitive)
  const filteredShop = selectedCategory === 'all'
    ? publicShop
    : publicShop.filter(
        item =>
          typeof item?.category === "string" &&
          item.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
      );

  return (
    <div className='w-full min-h-screen bg-white'>
      <HomeNavbar />
      <div className='w-full'>
        <div className='overflow-hidden w-full rounded-b-4xl h-[70vh]'>
          <img
            className='w-full h-full object-cover'
            src='https://static.vecteezy.com/system/resources/thumbnails/051/199/167/small_2x/rustic-kitchen-countertop-with-a-selection-of-ingredients-for-a-homemade-pizza-recipe-including-dough-tomato-sauce-fresh-mozzarella-basil-leaves-and-sliced-pepperoni-photo.jpg'
            alt="restaurants banner"
          />
        </div>
        <div className='w-full flex rounded-b-4xl items-center justify-center flex-col gap-6 absolute inset-0 opacity-80 bg-black h-[70vh] '>
          <div>
            <h1 className='text-white text-7xl font-bold '>
              Resturants
            </h1>
            <p className='text-white text-center font-semibold '>
              Discover the Best Place to Eat Near You
            </p>
          </div>
          <Search />
        </div>
        <div className='overflow-hidden pb-5 w-full'>
          <div className='bg-zinc-50 p-5 shadow-md mt-10 border-t border-b border-zinc-400 flex items-center justify-center gap-10'>
            <div className='flex gap-10 capitalize font-semibold'>
              {categoryOptions.map(option => (
                <button
                  key={option.value}
                  className={`px-4 py-2 rounded-lg focus:outline-none transition 
                    ${selectedCategory === option.value ? "bg-orange-200 text-orange-900" : "hover:bg-zinc-200"}`}
                  onClick={() => setSelectedCategory(option.value)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className='py-14 px-10 flex flex-wrap items-center justify-center gap-4 rounded-lg w-full'>
            {filteredShop.length > 0 ? (
              filteredShop.map(item => (
                <div key={item._id} className='w-[24.1%] cursor-pointer bg-zinc-100 shadow rounded-lg overflow-hidden'>
                  <Link to={`/details/${item._id}`}>
                    <img
                      className='w-full h-[30vh] object-cover object-center'
                      src={item?.image}
                      alt={item?.shopName || 'restaurant'}
                    />
                  </Link>
                  <div className='py-2 px-2'>
                    <div className='flex items-center border-b pb-2 border-zinc-300 justify-between'>
                      <h1 className='text-md font-semibold tracking-tight leading-none'>
                        {item?.shopName}
                      </h1>
                      <h1 className='text-sm capitalize text-red-500'>
                        {item?.category}
                      </h1>
                    </div>
                    <div className='flex mt-2 items-center border-b pb-2 border-zinc-300 justify-between'>
                      <h1 className='text-md flex items-center gap-1 tracking-tight leading-none'>
                        {typeof item?.rating === 'number' && item?.rating > 0 ? (
                          <>
                            <div className='flex items-center ml-1'>
                              {[...Array(4)].map((_, i) => (
                                <span key={i} className='text-lime-600'>
                                  <MdOutlineStarPurple500 />
                                </span>
                              ))}
                              <span className="ml-2 text-black">{item.rating}</span>
                            </div>
                          </>
                        ) : (
                          <span className="text-gray-400 text-sm">No rating available</span>
                        )}
                      </h1>
                      <h1 className='text-sm tracking-tight leading-none'>
                        {item?.deliveryTime}
                      </h1>
                    </div>
                    <div className='flex mt-2 items-center justify-between'>
                      <h1 className='text-sm text-zinc-600 tracking-tight flex gap-1 leading-none'>
                        <FaLocationCrosshairs />
                        {item?.city}, {item?.state}
                      </h1>
                      <h1 className='text-sm tracking-tight leading-none text-zinc-600'>
                        Min Order : ₹ {item?.minOrderAmount}
                      </h1>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center text-gray-400 mt-20 text-xl font-semibold">
                No restaurants found for this category.
              </div>
            )}
          </div>
        </div>
        <div className="w-full p-2 overflow-hidden">
          <img className='w-full h-[45vh] rounded-2xl object-cover ' src='https://b.zmtcdn.com/data/o2_assets/e067a1cf0d3fe27b366402b98b994e9f1716296909.png' />
        </div>
        <HomeFooter />
      </div>
    </div>
  )
}

export default Resturants
