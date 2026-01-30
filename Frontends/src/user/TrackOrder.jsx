import React, { useEffect } from 'react'
import instance from '../utils/axios'
import { Link, useParams } from 'react-router-dom'
import { IoArrowBackSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleTrackOrder } from '../redux/reducer/OrderReducer'
import DeliveryAcceptCreatingLiveTracking from "../deliveryBoy/DeliveryAcceptCreatingLiveTracking"

const TrackOrder = () => {
  const { orderId } = useParams()
  const dispatch = useDispatch()
  const { singleTrackOrder } = useSelector(store => store.Order)
  console.log(singleTrackOrder)

  const gettrackorderapi = async () => {
    try {
      const result = await instance.get(`/deliveryBoy/orderbyId/${orderId}`, {
        withCredentials: true
      })
      dispatch(setSingleTrackOrder(result.data.data))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    gettrackorderapi()
  }, [orderId])
  return (
    <div className="w-full min-h-screen p-2">
      <div className="w-full p-2 flex items-center  gap-2 ">
        <Link to="/my-order" className="mt-1 text-xl">
          <IoArrowBackSharp />
        </Link>
        <h1 className="text-md capitalize font-bold tracking-tight ">
          tracking order
        </h1>
      </div>
      <div className='w-full flex items-center justify-center '>
        <div className='w-[50%] bg-white p-2 rounded '>
          {singleTrackOrder && singleTrackOrder.shopOrders && singleTrackOrder.shopOrders.map(shopOrder => (
            <div key={shopOrder.shop._id} className="p-3 mb-4 bg-zinc-100 shadow rounded ">
              <h2 className="text-lg text-red-500 tracking-tight mb-2 leading-none font-semibold">{shopOrder.shop.shopName}</h2>
              <div>
                <div>
                  <span className="font-semibold tracking-tight capitalize leading-none">
                    Items: {shopOrder.shopOrderItem.map(item => item.name).join(", ")}
                  </span>
                  <p className='font-semibold leading-none tracking-tight capitalize mb-3.5'>subtotal: {" "}<span className='font-normal'>{shopOrder.subtotal}</span></p>
                  <p className='font-semibold mb-3 tracking-tight leading-none capitalize'>
                    delivery address: {" "}
                    <span className='font-normal '>
                      {
                        (() => {
                          const text = singleTrackOrder.deliveryAddress.text || "";
                          const parts = text.split(",").map(s => s.trim());
                          const filtered = parts.filter(Boolean);
                          const state = filtered.length >= 2 ? filtered[filtered.length - 2] : "";
                          const country = filtered.length >= 1 ? filtered[filtered.length - 1] : "";
                          return `${state}${state && country ? ', ' : ''}${country}`;
                        })()
                      }
                    </span>
                  </p>
                </div>
              </div>
              <div className='mb-7'>
                {shopOrder.status !== "delivered" ? (
                  <div>
                    {shopOrder.assignedDeliveryBoy ? (
                      <div>
                        <p className='tracking-tight leading-none capitalize'>
                          <span className='font-semibold capitalize'>delivery boy name : </span>
                          {shopOrder.assignedDeliveryBoy.fullname}
                        </p>
                        <p className='tracking-tight leading-none capitalize mt-1'>
                          <span className='font-semibold capitalize'>delivery boy contact no. : </span>
                          {shopOrder.assignedDeliveryBoy.fullname}
                        </p>
                      </div>
                    ) : (
                      <p className='text-sm tracking-tight leading-none mt-2 text-zinc-400'>Delivery boy is not assigned yet</p>
                    )}
                  </div>
                ) : (
                  <p className="text-green-600 font-semibold tracking-tight leading-none capitalize">Delivered</p>
                )}
              </div>
              {shopOrder.assignedDeliveryBoy && (
                <div>
                  <DeliveryAcceptCreatingLiveTracking data={{
                    deliveryBoyLocation: {
                      lat: shopOrder.assignedDeliveryBoy.location.coordinates[1],
                      lon: shopOrder.assignedDeliveryBoy.location.coordinates[0]
                    },
                    customerLocation: {
                      lat: singleTrackOrder.deliveryAddress.latitude,
                      lon: singleTrackOrder.deliveryAddress.longitude
                    }
                  }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrackOrder
