import React, { useEffect } from 'react'
import Router from './utils/Router'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import LiveLocation from './components/LiveLocation';
import LiveUpdateLocation from './components/LiveUpdateLocation';
import instance from './utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client'
import { addOwnerOrder, updateUserRealTimeOrderStatus } from './redux/reducer/OrderReducer';
import { addDeliveryAssignment } from './redux/reducer/AssignmentReducer';

const App = () => {
  const { user } = useSelector(store => store.Auth)
  const dispatch = useDispatch();
  console.log(user)

  LiveLocation()
  LiveUpdateLocation()

  useEffect(() => {
    const socketInstance = io(instance.defaults.baseURL, { withCredentials: true });

    window.socketInstance = socketInstance;

    socketInstance.on('connect', () => {
      if (user?.id) {
        socketInstance.emit('identity', { userId: user?.id })
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
    if (!socket || !user?.id) return;

    const statusHandler = ({ orderId, shopId, status, userId }) => {
      if (userId == user.id) {
        dispatch(updateUserRealTimeOrderStatus({ orderId, shopId, status }));
      }
    };

    const assignmentHandler = (data) => {
      if (data.sentTo == user.id) {
        dispatch(addDeliveryAssignment(data));
      }
    };

    const newOrderHandler = (data) => {
      const ownerId = data?.shopOrders?.[0]?.owner?._id || data?.shopOrders?.[0]?.owner;
      
      if (ownerId === user.id) {
        dispatch(addOwnerOrder(data));
      }
    };

    socket.on('update-status', statusHandler);
    socket.on('newAssignment', assignmentHandler);
    socket.on('newOrder', newOrderHandler);

    return () => {
      socket.off('update-status', statusHandler);
      socket.off('newAssignment', assignmentHandler);
      socket.off('newOrder', newOrderHandler);
    };
  }, [user?.id, dispatch]);


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
