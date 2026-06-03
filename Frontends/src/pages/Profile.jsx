import React from 'react'
import UserProfile from '../user/UserProfile'
import { useSelector } from 'react-redux';
import DeliveryBoyProfile from '../deliveryBoy/DeliveryBoyProfile';
import OwnerProfile from '../owner/OwnerProfile';

const Profile = () => {
  const user = useSelector((state) => state.Auth?.user);
  return (
    <div className='w-full h-screen'>
      {user?.role === "user" && <UserProfile />}
      {user?.role === "owner" && <OwnerProfile />}
      {user?.role === "deliveryBoy" && <DeliveryBoyProfile />}
    </div>
  )
}

export default Profile
