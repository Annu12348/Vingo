import React from 'react'
import OwnerOrderCard from './OwnerOrderCard'
import { useSelector } from 'react-redux'
import UserOrderCard from './UserOrderCard'

const MyOrder = () => {
  const { user } = useSelector(store => store.Auth)
  console.log(user)
  return (
    <div>
      {user.role === "user" && <UserOrderCard />}
      {user.role === "owner" && <OwnerOrderCard />}
    </div>
  )
}

export default MyOrder
