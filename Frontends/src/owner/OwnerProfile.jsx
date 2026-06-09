import React from 'react'
import { FaCamera, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { IoRestaurantOutline } from 'react-icons/io5';
import { CiEdit } from "react-icons/ci";
import { FaBagShopping } from "react-icons/fa6";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";

const OwnerProfile = () => {
  const user = useSelector((state) => state.Auth?.user);
  const city = useSelector((state) => state.Auth?.city);
  const dataanalytics = [
    {
      icon: <FaBagShopping />,
      number: 1248,
      text: "total orders"
    },
    {
      icon: <MdOutlineCurrencyRupee />,
      number: 124560,
      text: "total revenue"
    },
    {
      icon: <IoFastFoodOutline />,
      number: 56,
      text: "menu items"
    },
    {
      icon: <FaRegStar />,
      number: 4.6,
      text: "avg. rating"
    },
  ]

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  return (
    <div className='p-4 w-full min-h-screen bg-zinc-200 font-inter'>
      <div className='w-full flex items-center justify-between'>
        <div>
          <h1 className="text-3xl font-bold tracking-tight leading-none text-zinc-900 mb-1">
            Owner Profile
          </h1>
          <p className="text-base tracking-tight font-medium text-zinc-500 mb-4">
            Manage your restaurant and personal details
          </p>
        </div>
        <button className='border-3 font-semibold flex items-center justify-center gap-4 capitalize tracking-tight px-5 py-2 border-red-600 rounded-lg text-red-600'>
          <span className='text-2xl text-red-600'><CiEdit /></span>
          edit profile
        </button>
      </div>

      <div className='rounded flex gap-3 flex-wrap'>
        <div className='w-[64%] rounded-lg'>
          <div className='w-full bg-white p-4 flex gap-6 rounded-lg mt-2'>
            <div className='w-[25vh] rounded-lg shadow-lg relative flex items-center justify-center h-[24vh] bg-zinc-900 p-3'>
              <img
                className='bg-zinc-500 object-cover w-[90%] h-[90%] text-white font-semibold text-center rounded-full'
                src='https://images.unsplash.com/photo-1780228655268-947c2fc7d057?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D'
                alt='images'
              />
              <span
                className='text-zinc-500 absolute bottom-2 right-3'
              >
                <FaCamera />
              </span>
            </div>
            <div>
              <div className="flex items-center mb-2 min-h-[40px]">
                <h2
                  className="font-bold text-2xl md:text-3xl capitalize text-zinc-900 break-words mr-4"
                >
                  {user?.FullName}
                </h2>
                <span
                  className="text-xs md:text-sm bg-orange-100 text-orange-900 px-2.5 py-1 rounded-lg font-semibold ml-2 select-none border border-orange-300"
                  data-testid="owner-verified"
                  aria-label="Verified Owner"
                >
                  <span className="inline-block align-middle animate-pulse mr-1">✔</span>Verified
                </span>
              </div>
              <div className="flex items-center gap-3  text-base font-medium text-zinc-700 break-all">
                <span className="text-xl text-blue-500" aria-hidden>
                  <IoRestaurantOutline />
                </span>
                <span>Restaurant Owner</span>
              </div>
              <div className="flex items-center gap-3 mt-2 text-base font-medium text-zinc-700 break-all">
                <span className="text-xl text-blue-500" aria-hidden>
                  <MdOutlineMailOutline />
                </span>
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 mt-2 text-base font-medium text-zinc-700">
                <span className="text-xl text-green-500" aria-hidden>
                  <FaPhoneAlt />
                </span>
                <span>{user?.contact}</span>
              </div>
              <div className="flex items-center gap-3 mt-2 text-base font-medium text-zinc-700 break-all">
                <span className="text-xl text-red-500" aria-hidden>
                  <FaMapMarkerAlt />
                </span>
                <span>
                  {city && city.city ? city.city : ""}{city && city.city && city.state ? ', ' : ''}
                  {city && city.state ? city.state : ""}{city && (city.state && city.country) ? ', ' : ''}
                  {city && city.country ? city.country : ""}
                </span>
              </div>
            </div>
            <div className='ml-17 mt-9 '>
              <div className='flex items-start gap-10'>
                <h1 className='capitalize font-semibold'>restaurant status</h1>
                <span className='flex items-center gap-1 bg-zinc-400  px-2 rounded-full capitalize font-semibold text-gray-300'>
                  <span className='w-2 h-2 bg-gray-500 rounded-full inline-block'></span>
                  open
                </span>
              </div>
              <div>
                <h1 className='text-xl capitalize mt-3 font-semibold'>member since</h1>
                <h3 className='text-sm uppercase '>
                  {user?.updatedAt
                    ? new Date(user.updatedAt).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })
                    : ""}
                </h3>
              </div>
              <div>
                <h1 className="text-xl capitalize mt-3 font-semibold">Restaurant ID</h1>
                <h3 className="text-sm uppercase">
                  {user?.id ? `#${user?.id}` : ""}
                </h3>
              </div>


            </div>
          </div>
          <div className='w-full flex items-center justify-between rounded-lg mt-2'>
            <div className='bg-white p-3 rounded-lg w-[48%]'>
              <h1 className='text-xl capitalize font-bold tracking-tight leading-none'>restaurant details</h1>
              <div className='text-md flex items-center justify-between border-b pb-2 border-zinc-200 mt-4 '>
                <h1 className='text-md  w-[40%] font-semibold capitalize tracking-tight  '>restaurant name</h1>
                <h1 className='text-md  capitalize  w-[60%] tracking-tight '>spicy bites cafe</h1>
              </div>
              <div className='text-md flex items-center justify-between border-b pb-2 border-zinc-200 mt-4 '>
                <h1 className='text-md  w-[40%] font-semibold capitalize tracking-tight  '>restaurant type</h1>
                <h1 className='text-md  capitalize tracking-tight  w-[60%] '>cafe</h1>
              </div>
              <div className='text-md flex items-center justify-between border-b pb-2 border-zinc-200 mt-4 '>
                <h1 className='text-md  w-[40%] font-semibold capitalize tracking-tight  '>cuisine type</h1>
                <h1 className='text-md  capitalize tracking-tight  w-[60%] '>fast food, italian, chinese</h1>
              </div>
              <div className='text-md  flex items-center justify-between  mt-4 '>
                <h1 className='text-md  w-[40%] font-semibold capitalize tracking-tight  '>opening time</h1>
                <h1 className='text-md  capitalize tracking-tight  w-[60%] '>08:00 AM</h1>
              </div>
              <div className='text-md flex items-center justify-between border-b pb-2 border-zinc-200 mt-2 '>
                <h1 className='text-md font-semibold  w-[40%] capitalize tracking-tight  '>closing time</h1>
                <h1 className='text-md  capitalize tracking-tight  w-[60%] '>11:00 PM</h1>
              </div>
              <div className='text-md flex items-center justify-between border-b pb-2 border-zinc-200 mt-4 '>
                <h1 className='text-md font-semibold capitalize tracking-tight  w-[40%]  '>address</h1>
                <h1 className='text-md  capitalize tracking-tight  w-[60%] '>123, food street, bhopal, Madhya pradesh - 462001</h1>
              </div>
              <div className='text-md flex items-center justify-between pb-3 mt-4 '>
                <h1 className='text-md font-semibold capitalize tracking-tight  w-[40%]  '>description</h1>
                <h1 className='text-md  capitalize tracking-tight  w-[60%] '>spicy bites cafe offers a variety of delicious meals made with fresh ingredients and love. We server the best pizzas, burgers, pastas and much more.</h1>
              </div>
            </div>
            <div className='bg-white p-3 rounded-lg w-[48%]'>
              <h1 className='text-xl capitalize font-bold tracking-tight leading-none'>owner details</h1>
              <div className='text-md flex items-center justify-between border-b pb-2 border-zinc-200 mt-4 '>
                <h1 className='text-md  w-[46%] font-semibold capitalize tracking-tight  '>owner name</h1>
                <h1 className='text-md  capitalize  w-[54%] tracking-tight '>annu singh</h1>
              </div>
              <div className='text-md flex items-center justify-between border-b pb-2 border-zinc-200 mt-4 '>
                <h1 className='text-md  w-[46%] font-semibold capitalize tracking-tight  '>email</h1>
                <h1 className='text-md tracking-tight  w-[54%] '>annu37752@gmail.com</h1>
              </div>
              <div className='text-md flex items-center justify-between border-b pb-2 border-zinc-200 mt-4 '>
                <h1 className='text-md  w-[46%] font-semibold capitalize tracking-tight  '>phone number</h1>
                <h1 className='text-md  capitalize tracking-tight  w-[54%] '>8959732124</h1>
              </div>
              <div className='text-md flex items-center justify-between border-b pb-2 border-zinc-200 mt-4 '>
                <h1 className='text-md  w-[46%] font-semibold capitalize tracking-tight  '>alternate number</h1>
                <h1 className='text-md  capitalize  w-[54%] tracking-tight '>9111627385</h1>
              </div>
              <div className='text-md flex items-center justify-between border-b pb-2 border-zinc-200 mt-4 '>
                <h1 className='text-md  w-[46%] font-semibold capitalize tracking-tight  '>date of birth</h1>
                <h1 className='text-md tracking-tight  w-[54%] '>18 may 2002</h1>
              </div>
              <div className='text-md flex items-center justify-between border-b pb-2 border-zinc-200 mt-4 '>
                <h1 className='text-md  w-[46%] font-semibold capitalize tracking-tight  '>gender</h1>
                <h1 className='text-md  capitalize tracking-tight  w-[54%] '>male</h1>
              </div>
              <div className='text-md flex items-center justify-between border-b pb-2 border-zinc-200 mt-4 '>
                <h1 className='text-md  w-[46%] font-semibold capitalize tracking-tight  '>address</h1>
                <h1 className='text-md  capitalize  w-[54%] tracking-tight '>bhopal, madhya pradesh, india</h1>
              </div>
              <div className='text-md flex items-center justify-between border-b pb-2 border-zinc-200 mt-4 '>
                <h1 className='text-md  w-[46%] font-semibold capitalize tracking-tight  '>pAN number</h1>
                <h1 className='text-md tracking-tight  w-[54%] '>NRXPS1945H</h1>
              </div>
              <div className='text-md flex items-center justify-between border-b pb-2 border-zinc-200 mt-4 '>
                <h1 className='text-md  w-[46%] font-semibold capitalize tracking-tight  '>Adhar number</h1>
                <h1 className='text-md  capitalize tracking-tight  w-[54%] '>8114, 6381, 4083</h1>
              </div>
            </div>
          </div>
          <div className='w-full bg-white flex p-5 rounded-lg mt-2'>
            <div className='w-[50%] border-r pr-5 border-zinc-300   '>
              <h1 className='text-xl capitalize font-bold tracking-tight leading-none'>timings & delivery</h1>
              <div className='text-md flex items-center justify-between  mt-4 '>
                <h1 className='text-md  w-[46%] font-semibold capitalize tracking-tight  '>prep time</h1>
                <h1 className='text-md  capitalize  w-[54%] tracking-tight '>20 - 30 mins</h1>
              </div>
              <div className='text-md flex items-center justify-between border-b pb-3 border-zinc-200 mt-2 '>
                <h1 className='text-md  w-[46%] font-semibold capitalize tracking-tight  '>delivery time</h1>
                <h1 className='text-md tracking-tight  w-[54%] '>30 - 45 mins</h1>
              </div>
              <div className='text-md flex items-center justify-between  mt-3 '>
                <h1 className='text-md  w-[46%] font-semibold capitalize tracking-tight  '>delivery redius</h1>
                <h1 className='text-md  capitalize  w-[54%] tracking-tight '>5 KM</h1>
              </div>
              <div className='text-md flex items-center justify-between border-b pb-3 border-zinc-200 mt-2 '>
                <h1 className='text-md  w-[46%] font-semibold capitalize tracking-tight  '>minimum order</h1>
                <h1 className='text-md tracking-tight  w-[54%] '>₹ 150</h1>
              </div>

              <div className='text-md flex items-center justify-between border-b pb-2 border-zinc-200 mt-4 '>
                <h1 className='text-md  w-[46%] font-semibold capitalize tracking-tight  '>delivery charge</h1>
                <h1 className='text-md  capitalize tracking-tight  w-[54%] '>₹ 25</h1>
              </div>
            </div>
            <div className='w-[50%] ml-7 border-r pr-5 border-zinc-300 flex flex-col items-start justify-end  '>
              <h1 className='text-xl capitalize font-bold tracking-tight leading-none'>operatings & days</h1>
              <div className="flex gap-5 my-3 flex-wrap" aria-label="Operating Days">
                {days.map((day) => (
                  <span
                    key={day}
                    className="py-3 px-4 tracking-tight  rounded-lg bg-zinc-100  text-md font-medium capitalize text-gray-800 border border-zinc-200 shadow-sm"
                    aria-label={`Operating day: ${day}`}
                  >
                    {day}
                  </span>
                ))}
              </div>
              <h1 className='text-xl capitalize font-bold tracking-tight leading-none'>opening & days</h1>
              <div className="w-full mt-3 rounded-lg bg-zinc-100 p-3 flex flex-col shadow-sm border border-zinc-200">
                <span
                  id="operating-hours"
                  className="text-lg text-zinc-900 font-medium tracking-wider select-none"
                  aria-label="Operating Hours"
                >
                  08:00 AM - 11:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='w-[35%] rounded-lg'>
          <div className='w-full bg-white py-2 px-5 rounded-lg mt-2'>
            <div className='flex items-center justify-between'>
              <h1 className='font-semibold capitalize text-md '>business overview</h1>
              <h1 className='font-semibold hover:underline cursor-pointer text-blue-500'>view analytics</h1>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
              {Array.isArray(dataanalytics) && dataanalytics.length > 0 ? (
                dataanalytics.map((data, idx) => (
                  <div
                    key={data?.id || idx}
                    className="py-2 w-[42%] bg-zinc-200 px-4 flex items-center gap-5 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <span className="text-xl bg-zinc-300 p-3 rounded-full flex items-center justify-center">
                        {data?.icon}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">
                        {typeof data?.number === 'number' || typeof data?.number === 'string'
                          ? data.number
                          : '--'}
                      </h2>
                      <h2 className="text-gray-600 text-sm">
                        {data?.text || ''}
                      </h2>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-md w-full text-center py-4">
                  No analytics data available.
                </div>
              )}
            </div>
          </div>
          <div className='w-full bg-white p-3  rounded-lg mt-2'>
            <div className='flex items-center border-b pb-2 border-zinc-300 justify-between'>
              <h1 className='text-xl tracking-tight leading-none capitalize font-bold'>document</h1>
              <h1 className='text-blue-500 capitalize tracking-tight leading-none '>view All</h1>
            </div>
            <div className='flex items-center justify-between py-3 border-b border-zinc-300'>
              <div className='flex items-center gap-4'>
                <h1 className='text-2xl'><IoDocumentTextOutline /></h1>
                <div>
                  <h1 className='text-md font-semibold tracking-tight leading-none'>FSSAI LIcense</h1>
                  <p className='text-md  tracking-tight'>fassai_license.pdf</p>
                </div>
              </div>
              <h1 className='text-2xl'><MdOutlineFileDownload /></h1>
            </div>
            <div className='flex items-center justify-between py-3 border-b border-zinc-300'>
              <div className='flex items-center gap-4'>
                <h1 className='text-2xl'><IoDocumentTextOutline /></h1>
                <div>
                  <h1 className='text-md font-semibold tracking-tight leading-none'>GST Certificate</h1>
                  <p className='text-md  tracking-tight'>gst_certificate.pdf</p>
                </div>
              </div>
              <h1 className='text-2xl'><MdOutlineFileDownload /></h1>
            </div>
            <div className='flex items-center justify-between py-3 border-b border-zinc-300'>
              <div className='flex items-center gap-4'>
                <h1 className='text-2xl'><IoDocumentTextOutline /></h1>
                <div>
                  <h1 className='text-md font-semibold tracking-tight leading-none'>Shop Registration</h1>
                  <p className='text-md  tracking-tight'>shop_Registration.pdf</p>
                </div>
              </div>
              <h1 className='text-2xl'><MdOutlineFileDownload /></h1>
            </div>
          </div>
          <div className='w-full bg-white p-2 rounded-lg mt-2'>
            <div className='flex items-center border-b pb-2 border-zinc-300 justify-between'>
              <h1 className='text-xl tracking-tight leading-none capitalize font-bold'>bank details</h1>
              <h1 className='text-blue-500 capitalize tracking-tight leading-none '>edit</h1>
            </div>
            <div className='flex items-center justify-between p-3 border-b border-zinc-300'>
              <h1 className='w-[40%] font-semibold capitalize'>account holder name</h1>
              <h1>Annu Singh</h1>
            </div>
            <div className='flex items-center justify-between p-3 border-b border-zinc-300'>
              <h1 className='w-[40%] font-semibold capitalize'>bank name</h1>
              <h1>HDFC bank</h1>
            </div>
            <div className='flex items-center justify-between p-3 border-b border-zinc-300'>
              <h1 className='w-[40%] font-semibold capitalize'>account Number</h1>
              <h1>XXXX XXXX 4567</h1>
            </div>
            <div className='flex items-center justify-between p-3 border-b border-zinc-300'>
              <h1 className='w-[40%] font-semibold capitalize'>IFSC Code</h1>
              <h1>HDFCC0001234</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OwnerProfile
