import React, { useEffect, useRef } from 'react'
import Router from './utils/Router'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import LiveLocation from './components/LiveLocation';
import LiveUpdateLocation from './components/LiveUpdateLocation';
import instance from './utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client'
import { addOwnerOrder, updateUserRealTimeOrderStatus } from './redux/reducer/OrderReducer';

const App = () => {
  const { user } = useSelector(store => store.Auth)
  const dispatch = useDispatch()
  console.log(user)

  LiveLocation()
  LiveUpdateLocation()

  useEffect(() => {
    const socketInstance = io(instance.defaults.baseURL, { withCredentials: true });

    window.socketInstance = socketInstance;

    socketInstance.on('connect', (socket) => {
      if (user?.id) {
        socketInstance.emit('identity', {userId: user?.id})
        console.log("IDENTITY SENT:", user.id);
      }
    })

    return () => {
      socketInstance.disconnect()
      window.socketInstance = null;
    }
  }, [user?.id]);

  useEffect(() => {
    const socket = window.socketInstance;
    if (!socket) return;

    const handler = (data) => {
      console.log(data);
      const ownerId = data?.shopOrders?.owner?._id || data?.shopOrders?.owner;

      if (ownerId === user?.id || ownerId === user?._id) {
        dispatch(addOwnerOrder(data));
      }
    }

    socket.on('update-status', ({ orderId, shopId, status, userId }) => {
      if (userId == user.id) {
        dispatch(updateUserRealTimeOrderStatus({ orderId, shopId, status }))
      }
    })

    socket.on('newOrder', handler);
    return () => {
      socket.off('newOrder', handler);
      socket.off('update-status')
    }
  }, [user, dispatch]);

  return (
    <div className='w-full min-h-screen bg-zinc-200 '>
      <Router />
      <ToastContainer
        position='top-right'
        autoClose={5000}
      />
    </div>
  )
}

export default App
