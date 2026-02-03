import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import instance from '../utils/axios'
import { FaShop } from 'react-icons/fa6'
import { BiSolidFoodMenu } from "react-icons/bi";

const ShopFindDetails = () => {
    const { detailsId } = useParams()
    const [shopByItem, setShopByItem] = useState(null)
    console.log(shopByItem)

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
                </div>
            </div>
            <div className='mt-1 flex items-center justify-center gap-2 p-2'>
                <span className='text-3xl text-red-700'>
                    <BiSolidFoodMenu />
                </span>
                <h1 className='text-4xl tracking-tight leading-none capitalize font-semibold'>our menu</h1>
            </div>
            <div className='w-full flex items-center justify-center gap-2 mt-4'>
            {shopByItem.items.map(i => (
                <div className='p-2 w-70 rounded bg-white '>
                    <div className='w-full h-30 '></div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default ShopFindDetails
