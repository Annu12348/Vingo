import React, { useEffect, useRef, useState } from 'react'
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
  const [LiveLocation, setLiveLocation] = useState({})
  console.log(LiveLocation)
  console.log(user)

  LiveLocation()
  LiveUpdateLocation()

  useEffect(() => {
    const socketInstance = io(instance.defaults.baseURL, { withCredentials: true });

    window.socketInstance = socketInstance;

    socketInstance.on('connect', (socket) => {
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

  {/*useEffect(() => {
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

    socket.on('newAssignment', (data) => {
      if (data.sentTo == user.id) {
        dispatch(addDeliveryAssignment(data))
      }
    })

    socket.on('newOrder', handler);
    return () => {
      socket.off('newOrder', handler);
      socket.off('update-status')
      socket.off('newAssignment')
    }
  }, [user, dispatch]);*/}

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
      const ownerId = data?.shopOrders?.owner?._id || data?.shopOrders?.owner;
      if (ownerId === user.id) {
        dispatch(addOwnerOrder(data));
      }
    };

    //orderLocation
    if (!socket || user.id !== "deliveryBoy") return
    let watchId;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        socket.emit('updateLocation', {
          latitude,
          longitude,
          userId: user.id
        })
      }),
        (error) => {
          console.log(error)
        },
      {
        enableHighAccuracy: true,
      }
    }

    if (watchId) navigator.geolocation.clearWatch(watchId)

    const UpdateDeliveryOrderLocationHandler = (data) => {
      socket.on('UpdateDeliveryOrderLocation', ({ deliveryBoyId, latitude, longitude }) => {
        setLiveLocation(prev => ({
          ...prev,
          [deliveryBoyId]: { lat: latitude, lon: longitude }
        }))
      })
    }



    socket.on('update-status', statusHandler);
    socket.on('newAssignment', assignmentHandler);
    socket.on('newOrder', newOrderHandler);

    return () => {
      socket.off('update-status', statusHandler);
      socket.off('newAssignment', assignmentHandler);
      socket.off('newOrder', newOrderHandler);
      //deliveryLocation
      if (watchId) navigator.geolocation.clearWatch(watchId)
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
