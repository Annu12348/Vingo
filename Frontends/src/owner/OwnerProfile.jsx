import React from 'react'

const OwnerProfile = () => {
  return (
    <div className='p-4 w-full min-h-full font-inter'>
      <div className='w-full flex items-center justify-between'>
        <div>
          <h1 className="text-3xl font-bold tracking-tight leading-none text-zinc-900 mb-1">
            Owner Profile
          </h1>
          <p className="text-base tracking-tight font-medium text-zinc-500 mb-4">
            Manage your restaurant and personal details
          </p>
        </div>
        <button className='border-3 font-semibold capitalize tracking-tight px-5 py-2 border-red-600  rounded-lg'>edit profile</button>
      </div>

      <div className='rounded flex gap-3 flex-wrap '>
        <div className='w-[64%] rounded-lg '>
          <div className='w-full bg-white p-2 rounded-lg mt-2 '>
            
          </div>
          <div className='w-full bg-white p-2 rounded-lg mt-2 '></div>
          <div className='w-full bg-white p-2 rounded-lg mt-2 '></div>
        </div>








        <div className='w-[35%] rounded-lg '>
          <div className='w-full bg-white p-2 rounded-lg mt-2 '></div>
          <div className='w-full bg-white p-2 rounded-lg mt-2 '></div>
          <div className='w-full bg-white p-2 rounded-lg mt-2 '></div>
        </div>
      </div>
    </div>
  )
}

export default OwnerProfile

