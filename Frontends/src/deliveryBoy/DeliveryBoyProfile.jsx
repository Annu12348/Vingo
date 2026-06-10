import React from 'react'
import { CiEdit } from "react-icons/ci";
import { MdOutlineCameraAlt } from "react-icons/md";
import { useSelector } from 'react-redux';
import { CgMail } from "react-icons/cg";
import { CiForkAndKnife } from "react-icons/ci";
import { FcBusinessContact } from "react-icons/fc";
import { FaMapMarkerAlt } from "react-icons/fa";

const DeliveryBoyProfile = () => {
  const { user } = useSelector(store => store.Auth)
  const { city } = useSelector(store => store.Auth)
  console.log(city)
  return (
    <div className='w-full p-4 min-h-full '>
      <div className='flex items-center justify-between '>
        <div>
          <h1 className='font-bold capitalize tracking-tight leading-none '>Delivery Partner Profile </h1>
          <p className='text-sm tracking-tight '>Manage your personal and delivery information</p>
        </div>
        <button className='flex items-center gap-3 py-2 px-4 capitalize font-semibold text-red-900 border-3 rounded-lg border-red-900 text-xl ' >
          <span><CiEdit /></span>
          edit
        </button>
      </div>
      <div className='w-full flex justify-between items-center mt-2 rounded '>
        <div className='w-[59%]  p-3 bg-white rounded-lg flex gap-8 items-center justify-start  '>
          <div className='w-40 relative  h-40 rounded-full bg-zinc-200 border-3  '>
            <img className='w-full h-full rounded-full object-cover object-center ' src='https://images.unsplash.com/photo-1780715022507-bf17d780aa7a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D' alt='tt' />
            <h1 className='text-xl z-10 absolute bottom-9 p-2 -right-3 bg-zinc-400 rounded-full '><MdOutlineCameraAlt /></h1>
          </div>
          <div className='ml-9'>
            <h1 className='text-xl capitalize font-bold tracking-tight leading-none flex items-center justify-start '>
              {user.FullName}
              <span className='ml-4 p-1.5 bg-[#e5bcbc] text-[#9f6060] text-[10px] rounded-full '>
                verified Partner
              </span>
            </h1>
            <div className='flex items-center mt-3 gap-3 '>
              <span className='text-2xl mt-1 inline-block '><CiForkAndKnife /></span>
              <h1 className='text-md tracking-tight '>{user.email}</h1>
            </div>
            <div className='flex items-center gap-3 '>
              <span className='text-2xl mt-1 inline-block '><CgMail /></span>
              <h1 className='text-md tracking-tight '>{user.email}</h1>
            </div>
            <div className='flex items-center gap-3 '>
              <span className='text-2xl mt-1 inline-block '><FcBusinessContact /></span>
              <h1 className='text-md tracking-tight '>{user.contact}</h1>
            </div>
            <div className='flex items-center gap-3  '>
              <span className='text-2xl mt-1 inline-block '><FaMapMarkerAlt /></span>
              <h1 className='text-md tracking-tight '>{city?.city}, {city?.state}, {city?.country}</h1>
            </div>
          </div>
          <div className='ml-9'>
            <h1 className='text-md capitalize font-semibold leading-none tracking-tight  '>joined on</h1>
            <p className='text-sm tracking-tight leading-none mt-1 '>12 jan 2024</p>
            <h1 className='text-md mt-3 capitalize font-semibold leading-none tracking-tight  '>rating</h1>
            <p className='text-sm tracking-tight leading-none mt-1 '>4.8 (152)</p>
            <h1 className='text-md capitalize font-semibold leading-none tracking-tight mt-3 '>status</h1>
            <p className='text-sm tracking-tight leading-none mt-1 '>Active</p>
          </div>
        </div>
        <div className='w-[39%] p-2 bg-white rounded-lg flex items-center justify-between '>
          <div className='p-2 bg-zinc-200  rounded '></div>
          <div className='p-2 bg-zinc-200  rounded'></div>
          <div className='p-2 bg-zinc-200  rounded'></div>
          <div className='p-2 bg-zinc-200  rounded'></div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryBoyProfile
