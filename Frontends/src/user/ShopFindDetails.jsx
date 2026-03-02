import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import instance from '../utils/axios'
import { FaShop } from 'react-icons/fa6'
import { BiSolidFoodMenu } from "react-icons/bi";
import FoodCard from './FoodCard';

const ShopFindDetails = () => {
    const { detailsId } = useParams();
    const [shopByItem, setShopByItem] = useState(null);

    useEffect(() => {
        const fetchShopDetails = async () => {
            try {
                const result = await instance.get(`/item/shop/${detailsId}`, {
                    withCredentials: true
                })
                setShopByItem(result.data.data)
            } catch (error) {
                console.error(error)
            }
        }

        if (detailsId) {
            fetchShopDetails()
        }
    }, [detailsId])



    return (
        <div className="w-full min-h-screen px-2 py-2 sm:px-4 md:px-8 bg-zinc-100">
            <div className="w-full min-h-[200px] max-h-[300px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[420px] relative rounded-lg bg-amber-200 overflow-hidden shadow-sm transition-all duration-300">
                {shopByItem && shopByItem.shop && shopByItem.shop.image ? (
                    <img 
                        className="w-full h-full object-cover object-center" 
                        src={shopByItem.shop.image} 
                        alt={shopByItem?.shop?.shopName || "Shop Image"} 
                        loading="lazy"
                        draggable={false}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full min-h-[200px] text-lg text-gray-600 font-medium">Loading...</div>
                )}
                <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center bg-black/20 rounded-lg px-6 py-6 w-full max-w-[90%] max-sm:px-1 max-sm:py-3">
                    <span className="text-white text-3xl md:text-4xl drop-shadow"><FaShop /></span>
                    <h1 className="text-white text-2xl sm:text-4xl md:text-5xl tracking-tight leading-none mt-2 capitalize font-extrabold drop-shadow-md text-center break-words line-clamp-2">
                        {shopByItem?.shop?.shopName || ""}
                    </h1>
                    <h2 className="text-white font-semibold text-xs sm:text-base tracking-tight leading-tight mt-2 capitalize text-center break-words">
                        {shopByItem?.shop?.address || ""}
                    </h2>
                </div>
                <Link
                    to="/"
                    className="absolute z-30 top-2 left-2 rounded leading-none tracking-tight text-white bg-black/75 hover:bg-black transition px-4 py-2 font-semibold text-sm sm:text-base shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-300"
                    aria-label="Back to homepage"
                >
                    Back
                </Link>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-center gap-3 sm:gap-5 p-2 relative">
                <span className="text-3xl sm:text-4xl text-red-700 flex-none">
                    <BiSolidFoodMenu />
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl tracking-tight leading-none capitalize font-semibold text-center">
                    Our Menu
                </h1>
                <Link 
                    to="/cart"
                    className="absolute right-2 sm:static sm:ml-auto text-sm sm:text-base bg-amber-600 px-4 capitalize font-semibold text-white leading-none py-2 rounded transition hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-300"
                >
                    Order Food
                </Link>
            </div>
            <div className="w-full flex flex-wrap items-stretch justify-center gap-4 mt-3">
                {shopByItem && Array.isArray(shopByItem.items) && shopByItem.items.length > 0 ? (
                    shopByItem.items.map(item => (
                        <div 
                            key={item._id}
                            className="flex-grow-0 basis-[90vw] max-w-xs sm:basis-[260px] md:basis-[300px] flex items-stretch"
                        >
                            <FoodCard item={item} />
                        </div>
                    ))
                ) : (
                    <div className="w-full py-12 flex items-center justify-center">
                        <span className="text-lg text-gray-400 font-semibold">
                            No food items found for this shop.
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ShopFindDetails
