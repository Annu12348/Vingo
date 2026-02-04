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
        <div className="w-full min-h-screen px-2 py-1">
            <div className="w-full h-85 relative rounded-lg bg-amber-200 overflow-hidden">
                {shopByItem && shopByItem.shop && shopByItem.shop.image ? (
                    <img className='w-full h-full object-cover object-center' src={shopByItem.shop.image} alt="Shop" />
                ) : (
                    <div>Loading...</div>
                )}
                <div className='absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center'>
                    <span className='text-white  text-3xl'><FaShop /></span>
                    <h1 className='text-white text-4xl tracking-tight leading-none mt-2 capitalize font-bold '>{shopByItem?.shop?.shopName}</h1>
                    <h1 className='text-white text-sm tracking-tight leading-none mt-2 capitalize font-bold '>{shopByItem?.shop?.address}</h1>
                </div>
                <Link to='/' className=' absolute z-10 top-1 rounded leading-none tracking-tight text-white bg-black px-4 py-2 left-1'>Back</Link>
            </div>
            <div className='mt-1 flex items-center justify-center gap-2 p-2 relative'>
                <span className='text-3xl text-red-700'>
                    <BiSolidFoodMenu />
                </span>
                <h1 className='text-4xl tracking-tight leading-none capitalize font-semibold'>our menu</h1>
                <Link to='/cart' className='text-md absolute right-0  bg-amber-600 px-4 capitalize font-semibold text-white leading-none py-3 rounded '>
                    Order food
                </Link>
            </div>
            <div className='w-full flex items-center justify-center gap-4 mt-1'>
                {shopByItem && shopByItem.items && shopByItem.items.map(i => (
                    <FoodCard item={i} />
                ))}
            </div>
        </div>
    )
}

export default ShopFindDetails
