import React, { useState, useMemo, useCallback } from 'react';
import HomeNavbar from '../home/components/HomeNavbar';
import HomeFooter from "../home/components/HomeFooter";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Search from '../home/components/Search';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import useModal from '../../hook/useModal';

// INDUSTRIAL GRADE: Pure util for extracting unique categories, deduplication and normalization
const extractUniqueCategories = shops => {
  if (!Array.isArray(shops)) return [];
  const catSet = new Set();
  shops.forEach(s => {
    if (typeof s.category === "string" && s.category.trim())
      catSet.add(s.category.trim());
  });
  return Array.from(catSet).map(c => ({ label: c, value: c }));
};

const Resturants = () => {
  // State selectors
  const publicShop = useSelector(store => store.Shop.publicShop) || [];
  const { user } = useSelector(store => store.Auth);

  // Local state
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Hooks
  const navigate = useNavigate();
  const { showModal } = useModal();

  // Memoized category options for minimal recalculation
  const categoryOptions = useMemo(() => [
    { label: 'All', value: 'all' },
    ...extractUniqueCategories(publicShop)
  ], [publicShop]);

  // Memoize filtered shops for performance
  const filteredShop = useMemo(() => {
    if (selectedCategory === 'all') return publicShop;
    return publicShop.filter(
      item =>
        typeof item?.category === "string" &&
        item.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
    );
  }, [publicShop, selectedCategory]);

  // Performance: stable click handler
  const handleOrderNow = useCallback((id) => {
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
  }, [navigate, showModal, user]);

  return (
    <div className="w-full min-h-screen bg-white relative">
      <HomeNavbar />
      <main className="w-full relative" aria-label="Restaurants Listing">
        {/* Banner Section */}
        <section
          className="overflow-hidden w-full rounded-b-xl h-[70vh] md:h-[55vh] lg:h-[70vh] relative"
          aria-label="Restaurants Banner"
        >
          <img
            className="w-full h-full object-cover"
            src="https://static.vecteezy.com/system/resources/thumbnails/051/199/167/small_2x/rustic-kitchen-countertop-with-a-selection-of-ingredients-for-a-homemade-pizza-recipe-including-dough-tomato-sauce-fresh-mozzarella-basil-leaves-and-sliced-pepperoni-photo.jpg"
            alt="restaurants banner"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent" />
          <div className='w-full flex rounded-b-4xl items-center justify-center flex-col gap-6 absolute inset-0 opacity-100'>
            <div>
              <h1 className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-center">
                Restaurants
              </h1>
              <p className="text-white text-center font-semibold mt-2 text-base sm:text-lg">
                Discover the Best Place to Eat Near You
              </p>
            </div>
            <div className="max-w-xs w-full px-2 sm:max-w-md md:max-w-lg lg:max-w-2xl">
              <Search />
            </div>
          </div>
        </section>
        {/* Category Filter */}
        <section className="overflow-hidden pb-5 w-full" aria-label="Filter and List">
          <nav
            className="bg-zinc-50 p-2 sm:p-5 shadow-md mt-4 sm:mt-10 border-t border-b border-zinc-400 flex flex-wrap gap-y-2 items-center justify-center gap-3 sm:gap-6 md:gap-10"
            aria-label="Restaurant Categories"
          >
            <div className="flex flex-wrap gap-3 sm:gap-6 md:gap-10 capitalize font-semibold justify-center">
              {categoryOptions.map(option => (
                <button
                  key={option.value}
                  className={`px-3 py-2 sm:px-4 rounded-lg focus:outline-none transition text-sm sm:text-base
                  ${selectedCategory === option.value ? "bg-orange-200 text-orange-900" : "hover:bg-zinc-200"}`}
                  aria-pressed={selectedCategory === option.value}
                  onClick={() => setSelectedCategory(option.value)}
                  type="button"
                  tabIndex={0}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </nav>
          {/* Shop List */}
          <section className="py-8 sm:py-14 px-2 sm:px-4 md:px-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-6 rounded-lg w-full">
            {filteredShop.length > 0 ? (
              filteredShop.map(item => (
                <article
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
                  aria-label={item.shopName || 'Restaurant'}
                >
                  <img
                    className="w-full h-[32vw] min-h-[120px] max-h-[220px] md:h-[180px] lg:h-[30vh] object-cover object-center"
                    src={item?.image}
                    alt={item?.shopName || 'restaurant'}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="py-2 px-2 flex flex-col gap-1">
                    <header className="flex items-center border-b pb-2 border-zinc-300 justify-between">
                      <h2 className="text-md font-semibold tracking-tight leading-none truncate max-w-[55%]" title={item?.shopName}>
                        {item?.shopName}
                      </h2>
                      <span className="text-sm capitalize text-red-500 truncate max-w-[40%]" title={item?.category}>
                        {item?.category}
                      </span>
                    </header>
                    <div className="flex mt-2 items-center border-b pb-2 border-zinc-300 justify-between">
                      <span className="text-md flex items-center gap-1 tracking-tight leading-none">
                        {typeof item?.rating === 'number' && item?.rating > 0 ? (
                          <span className="flex items-center" aria-label={`Rating: ${item.rating}`}>
                            {Array(Math.min(4, Math.round(item.rating))).fill(0).map((_, i) => (
                              <span key={i} className="text-lime-600">
                                <MdOutlineStarPurple500 />
                              </span>
                            ))}
                            <span className="ml-2 text-black text-sm">{item.rating}</span>
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs sm:text-sm" aria-label="No rating available">No rating available</span>
                        )}
                      </span>
                      <span className="text-sm tracking-tight leading-none truncate max-w-[50%] text-right" title={item?.deliveryTime}>
                        {item?.deliveryTime}
                      </span>
                    </div>
                    <div className="flex mt-2 items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm text-zinc-600 tracking-tight flex gap-1 leading-none items-center">
                        <FaLocationCrosshairs className="hidden sm:inline-block" />
                        <span className="truncate" title={`${item?.city}, ${item?.state}`}>{item?.city}, {item?.state}</span>
                      </span>
                      <span className="text-xs sm:text-sm tracking-tight leading-none text-zinc-600 text-right">
                        Min Order: ₹ {item?.minOrderAmount}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOrderNow(item._id)}
                    className='text-sm capitalize absolute bottom-30 right-2 bg-green-500 p-3 rounded font-semibold tracking-tight leading-none text-white cursor-pointer focus:outline-none hover:bg-green-600 transition'
                    aria-label="View shop details"
                    tabIndex={0}
                  >
                    Shop details
                  </button>
                </article>
              ))
            ) : (
              <div className="w-full text-center text-gray-400 mt-20 text-lg sm:text-xl font-semibold" aria-live="polite">
                No restaurants found for this category.
              </div>
            )}
          </section>
        </section>
        {/* Decorative Banner Image */}
        <section className="w-full p-1 sm:p-2 overflow-hidden" aria-label="Restaurants Banner Bottom">
          <img
            className="w-full h-[23vh] sm:h-[32vh] md:h-[36vh] lg:h-[45vh] rounded-2xl object-cover"
            src="https://b.zmtcdn.com/data/o2_assets/e067a1cf0d3fe27b366402b98b994e9f1716296909.png"
            alt=""
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
        </section>
        <HomeFooter />
      </main>
    </div>
  );
};

export default Resturants;
