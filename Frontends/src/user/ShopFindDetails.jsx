import React, { useState, useEffect, useMemo } from 'react';
import HomeNavbar from '../pages/home/components/HomeNavbar';
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { FiAlignJustify, FiAlignRight } from "react-icons/fi";
import { Link, useParams } from 'react-router-dom';
import { useSingleShopAllItem } from '../hook/useItem';
import FoodCard from './FoodCard';
import HomeFooter from '../pages/home/components/HomeFooter';
import { RiShoppingCartFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

const FILTERS = Object.freeze([
    { label: "All", value: "all" },
    { label: "Veg", value: "veg" },
    { label: "Non-Veg", value: "non-veg" },
    { label: "Bestsellers", value: "bestseller" },
]);

const getFoodType = (item) => {
    if (!item || typeof item !== 'object') return null;
    if (typeof item.foodType === "string") return item.foodType.trim();
    if (typeof item.foodTYpe === "string") return item.foodTYpe.trim();
    if (item.veg !== undefined) return item.veg ? "Veg" : "Non-Veg";
    if (item.isVeg !== undefined) return item.isVeg ? "Veg" : "Non-Veg";
    if (item.category && typeof item.category === "string") {
        const lower = item.category.toLowerCase();
        if (lower.includes("veg") && !lower.includes("non-veg")) return "Veg";
        if (lower.includes("non-veg") || lower.includes("nonveg")) return "Non-Veg";
    }
    return null;
};

const filterFoodItems = (items, activeFilter) => {
    if (!Array.isArray(items)) return [];
    switch (activeFilter) {
        case "veg":
            return items.filter((item) => {
                const type = getFoodType(item);
                return typeof type === "string" && type.trim().toLowerCase() === "veg";
            });
        case "non-veg":
            return items.filter((item) => {
                const type = getFoodType(item);
                const normalized = typeof type === "string" ? type.trim().replace(/-/g, "").toLowerCase() : "";
                return normalized === "nonveg";
            });
        case "bestseller":
            return items.filter((item) => !!(item.isBestseller || item.bestseller));
        case "all":
        default:
            return items;
    }
};

const PLACEHOLDER_IMAGE = "https://media.istockphoto.com/id/1163284610/photo/very-stylish-indian-gourmet-restaurant.webp?a=1&b=1&s=612x612&w=0&k=20&c=XlqziPp1tIlKB8EANCp2ix616tPZcHgNdIGbQuRAPGE=";

const ShopFindDetails = React.memo(() => {
    const { detailsId } = useParams();
    const { shopData = {}, foodItem = [] } = useSingleShopAllItem(detailsId);

    const [activeFilter, setActiveFilter] = useState('all');
    const { cartItems } = useSelector(store => store.Item);

    useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [detailsId]);

    const filteredFoodItems = useMemo(
        () => filterFoodItems(foodItem, activeFilter),
        [foodItem, activeFilter]
    );

    const {
        image,
        isOpen = false,
        closeTime = "N/A",
        shopName,
        rating,
        totalReviews,
        deliveryTime = "N/A",
        city = "Unknown",
        state = "Unknown",
        description,
        minOrderAmount = "—"
    } = shopData || {};

    return (
        <main className="w-full min-h-screen relative bg-white">
            <HomeNavbar />

            <section className="w-full relative">
                <img
                    className={`
                        w-full
                        h-[40vh] sm:h-[45vh] md:h-[60vh] lg:h-[70vh]
                        object-cover object-center shadow-sm
                    `}
                    src={image || PLACEHOLDER_IMAGE}
                    alt="Shop Banner"
                    loading="lazy"
                    draggable={false}
                    style={{ maxHeight: 400, minHeight: 160, width: "100%", background: "#f5f5f5" }}
                    width="100%"
                    height="auto"
                />
                <div
                    className="
                        w-[96%] p-2 flex flex-col md:flex-row md:items-center gap-5 md:gap-7
                        absolute bottom-2 left-1/2 md:left-12 lg:left-14 -translate-x-1/2 md:translate-x-0
                    "
                >
                    <div
                        className="
                            w-full min-h-[160px] max-h-[220px] h-[22vh] sm:h-[24vh]
                            md:w-[19%] md:min-w-[180px] md:max-w-[230px]
                            border border-white overflow-hidden rounded-2xl group
                            shadow-md transition-shadow duration-300
                            hover:shadow-2xl hover:border-amber-400 cursor-pointer
                            mx-auto md:mx-0 mb-3 md:mb-0 relative
                        "
                        style={{ background: "#f2f2f2" }}
                    >
                        <img
                            className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-95 group-hover:contrast-110"
                            src={image || PLACEHOLDER_IMAGE}
                            alt="Shop"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-amber-300"></div>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <span
                                className={`inline-block text-white tracking-tight py-1.5 px-4 sm:py-2 sm:px-5 uppercase rounded-full ${isOpen ? "bg-green-800" : "bg-red-600"} text-xs sm:text-sm`}
                                aria-label={isOpen ? "Open" : "Closed"}
                            >
                                {isOpen ? "Open" : "Closed"}
                            </span>
                            <span className="text-zinc-200 bg-zinc-600 px-4 sm:px-5 tracking-tight py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
                                Close: {closeTime}
                            </span>
                        </div>
                        <h1 className="text-white tracking-tight mt-2 sm:mt-3 text-2xl sm:text-4xl md:text-5xl break-words" data-testid="shop-name">
                            {shopName || <span className="text-zinc-400">Shop Name Unavailable</span>}
                        </h1>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-zinc-300 mt-2 text-xs sm:text-sm">
                            {(typeof rating === 'number' && rating > 0) ? (
                                <>
                                    <span className="flex items-center text-[#ffbc6a]" aria-label={`Shop rating ${rating}`}>
                                        <IoStar />
                                    </span>
                                    <span className="mt-0.5 font-medium" data-testid="shop-rating-value">
                                        {Number(rating).toFixed(1)}
                                    </span>
                                    <span className="text-xs sm:text-sm mt-0.5">
                                        ({totalReviews || 0} reviews)
                                    </span>
                                </>
                            ) : (
                                <span className="text-gray-300 text-xs sm:text-base" aria-label="No rating yet">No rating</span>
                            )}
                            <span className="flex items-center gap-1 md:gap-2 ml-1 md:ml-3 mt-0.5 text-xs sm:text-sm">
                                <span className="text-base sm:text-xl text-zinc-500">
                                    <MdOutlineAccessTimeFilled />
                                </span>
                                {deliveryTime}
                            </span>
                            <span className="flex items-center gap-1 md:gap-2 ml-1 md:ml-3 mt-0.5 text-xs sm:text-sm">
                                <span className="text-base sm:text-xl text-zinc-500">
                                    <FaLocationDot />
                                </span>
                                {`${city}, ${state}`}
                            </span>
                        </div>
                        <p className="text-zinc-300 mt-2 whitespace-pre-line text-xs sm:text-sm md:text-base">
                            {description ? description : <span className="text-zinc-300">No description available.</span>}
                        </p>
                    </div>
                </div>
            </section>


            <section className="
                bg-white w-[96%] sm:w-[94%] md:w-[92%] shadow-md rounded-lg m-auto flex flex-wrap md:flex-nowrap items-stretch md:items-center justify-between border-t border-b border-gray-100 p-2 sm:p-4 mt-4 sm:mt-6 top-0 z-20
            ">
                <div className="w-1/2 md:w-[25%] p-2 sm:p-4 border-r border-l md:border-l border-zinc-300 flex flex-col items-center justify-center mb-2 md:mb-0">
                    <h1 className="text-2xl sm:text-3xl">
                        <IoStarOutline />
                    </h1>
                    <h1 className="font-semibold uppercase tracking-tight leading-none py-1 text-xs sm:text-sm">Rating</h1>
                    <h1 className="text-xs sm:text-sm">
                        {rating ? Number(rating).toFixed(1) : "-"} / {totalReviews || 0}
                    </h1>
                    <h1 className="text-xs sm:text-sm capitalize">
                        ({totalReviews || 0} reviews)
                    </h1>
                </div>
                <div className="w-1/2 md:w-[25%] p-2 sm:p-4 border-r flex flex-col border-zinc-300 items-center justify-center mb-2 md:mb-0">
                    <h1 className="text-2xl sm:text-3xl">
                        <MdOutlineAccessTimeFilled />
                    </h1>
                    <h1 className="font-semibold uppercase tracking-tight leading-none py-1 text-xs sm:text-sm">
                        Delivery Time
                    </h1>
                    <h1 className="text-xs sm:text-sm">
                        {deliveryTime}
                    </h1>
                    <h1 className="text-xs sm:text-sm capitalize">
                        fast reliable
                    </h1>
                </div>
                <div className="w-1/2 md:w-[25%] p-2 sm:p-4 border-r flex flex-col border-zinc-300 items-center justify-center mb-2 md:mb-0">
                    <h1 className="text-2xl sm:text-3xl">
                        ₹
                    </h1>
                    <h1 className="font-semibold tracking-tight uppercase leading-none py-1 text-xs sm:text-sm">Min Orders</h1>
                    <h1 className="text-xs sm:text-sm">
                        ₹ {minOrderAmount}
                    </h1>
                    <h1 className="text-xs sm:text-sm capitalize">
                        low minimum
                    </h1>
                </div>
                <div className="w-1/2 md:w-[25%] p-2 sm:p-4 border-r md:last:border-r-0 flex flex-col border-zinc-300 items-center justify-center">
                    <h1 className="text-2xl sm:text-3xl">
                        <FaLocationDot />
                    </h1>
                    <h1 className="font-semibold tracking-tight uppercase leading-none py-1 text-xs sm:text-sm">
                        Min Distance
                    </h1>
                    <h1 className="text-xs sm:text-sm">
                        5 k.m.
                    </h1>
                    <h1 className="text-xs sm:text-sm capitalize">
                        {city}, {state}
                    </h1>
                </div>
            </section>


            <section className="w-full pb-8">
                <div
                    className="
                        bg-white flex flex-wrap items-center justify-between border-t border-b border-gray-200
                        py-3 sm:py-4 px-2 sm:px-6 md:px-8 lg:px-14 mt-8 shadow-sm
                        sticky top-0 z-20
                    "
                >
                    <fieldset className="flex flex-wrap gap-2 w-full sm:w-auto justify-center sm:justify-start mb-3 sm:mb-0">
                        <legend className="sr-only">Food Filters</legend>
                        {FILTERS.map(({ label, value }, i) => (
                            <button
                                key={value}
                                type="button"
                                className={`
                                    px-3 sm:px-4 md:px-5 py-2 font-semibold
                                    text-xs sm:text-sm capitalize
                                    ${i === 0 ? "rounded-l-lg" : ""}
                                    ${i === FILTERS.length - 1 ? "rounded-r-lg" : ""}
                                    ${activeFilter === value
                                        ? (value === "all"
                                            ? "bg-green-600 text-white border border-green-600"
                                            : value === "veg"
                                                ? "bg-green-100 text-green-800 border border-green-600"
                                                : value === "non-veg"
                                                    ? "bg-red-100 text-red-700 border border-red-400"
                                                    : "bg-yellow-50 text-yellow-700 border border-yellow-400"
                                        )
                                        : "bg-gray-50 text-gray-700 border border-gray-300"
                                    }
                                    transition-colors duration-150
                                `}
                                tabIndex={0}
                                aria-pressed={activeFilter === value}
                                onClick={() => setActiveFilter(value)}
                                aria-label={`${label} filter`}
                            >
                                {label}
                            </button>
                        ))}
                    </fieldset>
                    <div className="md:flex gap-2 w-full hidden sm:w-auto justify-center sm:justify-end mt-3 sm:mt-0">
                        <button
                            type="button"
                            title="Grid View"
                            className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-l-lg text-lg sm:text-xl bg-white text-gray-600 cursor-not-allowed opacity-70"
                            tabIndex={-1}
                            disabled
                            aria-disabled="true"
                        >
                            <FiAlignJustify />
                        </button>
                        <button
                            type="button"
                            title="List View"
                            className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-r-lg text-lg sm:text-xl bg-white text-gray-600 cursor-not-allowed opacity-70"
                            tabIndex={-1}
                            disabled
                            aria-disabled="true"
                        >
                            <FiAlignRight />
                        </button>
                    </div>
                </div>
                <div className="pt-3 sm:pt-4 px-2 sm:px-6 md:px-8 lg:px-14">
                    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                        <h1 className="text-lg sm:text-xl capitalize font-semibold">
                            {activeFilter === "all"
                                ? "All"
                                : (FILTERS.find(f => f.value === activeFilter)?.label || "All")}
                        </h1>
                        
                            <Link to="/cart" className=" text-2xl md:block hidden relative text-[rgb(240,107,41)]">
                                <RiShoppingCartFill />
                                <span className="text-[12px] absolute -top-1.5 -right-1.5">
                                    {cartItems?.length}
                                </span>
                            </Link>
                    
                    </div>
                    <div
                        className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
                        aria-live="polite"
                    >
                        {filteredFoodItems && filteredFoodItems.length > 0 ? (
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
            </section>
            <HomeFooter />
        </main>
    );
});

export default ShopFindDetails;