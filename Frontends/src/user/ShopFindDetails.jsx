import React, { useState } from 'react'
import HomeNavbar from '../pages/home/components/HomeNavbar'
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { FiAlignJustify } from "react-icons/fi";
import { FiAlignRight } from "react-icons/fi";
import { useParams } from 'react-router-dom';
import { useSingleShopAllItem } from '../hook/useItem';
import { GoArrowRight } from "react-icons/go";
import FoodCard from './FoodCard';
import HomeFooter from '../pages/home/components/HomeFooter';

// Filtering constants
const FILTERS = [
    { label: "All", value: "all" },
    { label: "Veg", value: "veg" },
    { label: "Non-Veg", value: "non-veg" },
    { label: "Bestsellers", value: "bestseller" },
];

const ShopFindDetails = () => {
    const { detailsId } = useParams();
    const { shopData, foodItem } = useSingleShopAllItem(detailsId);

    // Filter state
    const [activeFilter, setActiveFilter] = useState('all');

    // Helper to determine food type with different key names
    function getFoodType(item) {
        // Normalize possible property names across data
        if (typeof item.foodType === "string") return item.foodType;
        if (typeof item.foodTYpe === "string") return item.foodTYpe;
        if (item.veg !== undefined) return item.veg ? "Veg" : "Non-Veg";
        if (item.isVeg !== undefined) return item.isVeg ? "Veg" : "Non-Veg";
        if (item.category) {
            // Some systems use lowercase, some capitalized
            if (typeof item.category === "string") {
                if (item.category.toLowerCase().includes("veg")) return "Veg";
                if (item.category.toLowerCase().includes("non-veg")) return "Non-Veg";
            }
        }
        return null;
    }

    // Filter logic for foodItem based on foodType (**only** foodTYpe / foodType, as requested)
    function filterItems(items) {
        if (!Array.isArray(items)) return [];
        switch (activeFilter) {
            case "veg":
                return items.filter(item => {
                    const type = getFoodType(item);
                    return typeof type === "string" && type.toLowerCase() === "veg";
                });
            case "non-veg":
                return items.filter(item => {
                    const type = getFoodType(item);
                    return typeof type === "string" && (type.toLowerCase() === "non-veg" || type.toLowerCase() === "nonveg");
                });
            case "bestseller":
                // Still keep special filter for bestseller if needed
                return items.filter(item => item.isBestseller === true || item.bestseller === true);
            case "all":
            default:
                return items;
        }
    }
    const filteredFoodItems = filterItems(foodItem);

    return (
        <div className='w-full min-h-screen relative bg-white '>
            <HomeNavbar />
            <div className='w-full relative'>
                <img
                    className="w-full h-[70vh] object-cover object-center shadow-sm"
                    src="https://media.istockphoto.com/id/1163284610/photo/very-stylish-indian-gourmet-restaurant.webp?a=1&b=1&s=612x612&w=0&k=20&c=XlqziPp1tIlKB8EANCp2ix616tPZcHgNdIGbQuRAPGE="
                    alt="Shop Banner"
                    loading="lazy"
                    draggable={false}
                    style={{ maxHeight: 400, minHeight: 200, width: "100%", background: "#f5f5f5" }}
                />
                <div className='w-[92%] p-2 flex items-center gap-7 absolute bottom-4 left-14  '>
                    <div
                        className="w-[19%] border border-white h-[26vh] overflow-hidden rounded-2xl group shadow-md transition-shadow duration-300 hover:shadow-2xl hover:border-amber-400 cursor-pointer"
                        style={{ background: "#f2f2f2" }}
                    >
                        <img
                            className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-95 group-hover:contrast-110"
                            src={shopData.image}
                            alt="Shop"
                        />
                        <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-amber-300"></div>
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <span
                                className={`inline-block text-white tracking-tight py-2 px-5 uppercase rounded-full ${shopData.isOpen ? "bg-green-800" : "bg-red-600"
                                    }`}
                                aria-label={shopData.isOpen ? "Open" : "Closed"}
                            >
                                {shopData.isOpen ? "Open" : "Closed"}
                            </span>
                            <span className="text-zinc-200 bg-zinc-600 px-5 tracking-tight py-2 rounded-full">
                                Close: {shopData.closeTime ? shopData.closeTime : "N/A"}
                            </span>
                        </div>
                        <h1 className="text-white tracking-tight mt-3 text-5xl break-words" data-testid="shop-name">
                            {shopData.shopName || <span className="text-zinc-400">Shop Name Unavailable</span>}
                        </h1>
                        <div className="flex flex-wrap items-center gap-2 text-zinc-300 mt-2">
                            {typeof shopData.rating === 'number' && shopData.rating > 0 ? (
                                <>
                                    <span className="flex items-center text-[#ffbc6a]" aria-label={`Shop rating ${shopData.rating}`}>
                                        <IoStar />
                                    </span>
                                    <span className="mt-1 font-medium" data-testid="shop-rating-value">
                                        {shopData.rating.toFixed(1)}
                                    </span>
                                    <span className="text-sm mt-1">
                                        ({shopData.totalReviews || 0} reviews)
                                    </span>
                                </>
                            ) : (
                                <span className="text-gray-300 text-base" aria-label="No rating yet">No rating</span>
                            )}
                            <span className="flex items-center gap-2 ml-3 mt-1 text-sm">
                                <span className="text-xl text-zinc-500">
                                    <MdOutlineAccessTimeFilled />
                                </span>
                                {shopData.deliveryTime || "N/A"}
                            </span>
                            <span className="flex items-center gap-2 ml-3 mt-1 text-sm">
                                <span className="text-xl text-zinc-500">
                                    <FaLocationDot />
                                </span>
                                {`${shopData.city || "Unknown"}, ${shopData.state || "Unknown"}`}
                            </span>
                        </div>
                        <p className="text-zinc-300 mt-2 whitespace-pre-line">
                            {shopData.description || <span className="text-zinc-300">No description available.</span>}
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-white w-[92%] shadow-md rounded-lg m-auto  flex flex-wrap items-center justify-between border-t border-b border-gray-100 p-4 mt-6 shadow  top-0 z-20">
                <div className='w-[25%] p-4 border-r border-l flex-col border-zinc-300 flex items-center justify-center'>
                    <h1 className='text-3xl'>
                        <IoStarOutline />
                    </h1>
                    <h1 className='font-semibold uppercase tracking-tight  leading-none py-1'>Rating</h1>
                    <h1 className='text-sm'>
                        {shopData.rating}/{shopData.totalReviews}
                    </h1>
                    <h1 className='text-sm capitalize'>
                        ({shopData.totalReviews} reviews)
                    </h1>
                </div>
                <div className='w-[25%] p-4 border-r flex-col border-zinc-300 flex items-center justify-center'>
                    <h1 className='text-3xl'>
                        <MdOutlineAccessTimeFilled />
                    </h1>
                    <h1 className='font-semibold uppercase tracking-tight  leading-none py-1'>
                        Delivery Time
                    </h1>
                    <h1 className='text-sm'>
                        {shopData.deliveryTime}
                    </h1>
                    <h1 className='text-sm capitalize'>
                        fast reliable
                    </h1>
                </div>
                <div className='w-[25%] p-4 border-r flex-col border-zinc-300 flex items-center justify-center'>
                    <h1 className='text-3xl'>
                        ₹
                    </h1>
                    <h1 className='font-semibold tracking-tight uppercase  leading-none py-1'>min orders</h1>
                    <h1 className='text-sm'>
                        ₹ {shopData.minOrderAmount} 
                    </h1>
                    <h1 className='text-sm capitalize'>
                        low minimum
                    </h1>
                </div>
                <div className='w-[25%] p-4 border-r flex-col border-zinc-300 flex items-center justify-center'>
                    <h1 className='text-3xl'>
                        <FaLocationDot />
                    </h1>
                    <h1 className='font-semibold tracking-tight uppercase leading-none py-1'>
                        min distance
                    </h1>
                    <h1 className='text-sm'>
                        5 k.m.
                    </h1>
                    <h1 className='text-sm capitalize'>
                        {shopData.city}, {shopData.state}
                    </h1>
                </div>

            </div>
            <div className='w-full pb-8  '>
                <div className="bg-white flex flex-wrap items-center justify-between border-t border-b border-gray-200 py-4 px-14 mt-8 shadow-sm sticky top-0 z-20">
                    <fieldset className="flex gap-2">
                        <legend className="sr-only">Food Filters</legend>
                        {FILTERS.map(({ label, value }, i) => (
                            <button
                                key={value}
                                type="button"
                                className={`px-5 py-2 font-semibold text-sm capitalize
                                    ${i === 0 ? "rounded-l-lg" : ""}
                                    ${i === FILTERS.length - 1 ? "rounded-r-lg" : ""}
                                    ${activeFilter === value
                                        ? (value === "all"
                                            ? "bg-green-600 text-white border border-green-600"
                                            : value === "veg"
                                                ? "bg-green-100 text-green-800 border border-green-600"
                                                : value === "non-veg"
                                                    ? "bg-red-100 text-red-700 border border-red-400"
                                                    : "bg-yellow-50 text-yellow-700 border border-yellow-400")
                                        : "bg-gray-50 text-gray-700 border border-gray-300"}
                                    `}
                                tabIndex={0}
                                aria-pressed={activeFilter === value}
                                onClick={() => setActiveFilter(value)}
                            >
                                {label}
                            </button>
                        ))}
                    </fieldset>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            title="Grid View"
                            className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-l-lg text-xl bg-white text-gray-600 cursor-not-allowed opacity-70"
                            tabIndex={-1}
                            disabled
                        >
                            <FiAlignJustify />
                        </button>
                        <button
                            type="button"
                            title="List View"
                            className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-r-lg text-xl bg-white text-gray-600 cursor-not-allowed opacity-70"
                            tabIndex={-1}
                            disabled
                        >
                            <FiAlignRight />
                        </button>
                    </div>
                </div>

                <div className='pt-4 px-14'>
                    <div className='w-full flex items-center justify-between '>
                        <h1 className='text-xl capitalize font-semibold '>
                            {activeFilter === "all"
                                ? "All"
                                : FILTERS.find(f => f.value === activeFilter)?.label || "All"}
                        </h1>
                        <h1 className='text-sm capitalize flex items-center gap-2'>
                            view all
                            <span className=''>
                                <GoArrowRight />
                            </span>
                        </h1>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
                        {Array.isArray(filteredFoodItems) && filteredFoodItems.length > 0 ? (
                            filteredFoodItems.map(item => (
                                <FoodCard item={item} key={item._id || item.id} />
                            ))
                        ) : (
                            <div className="text-gray-500 text-center w-full py-6">
                                No food items available.
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <HomeFooter />
        </div>
    )
}

export default ShopFindDetails