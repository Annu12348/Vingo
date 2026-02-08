import React, { useEffect } from 'react'
import Router from './utils/Router'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import LiveLocation from './components/LiveLocation';
import LiveUpdateLocation from './components/LiveUpdateLocation';
import instance from './utils/axios';
import { useSelector } from 'react-redux';
import { disconnectSocket, initSocket } from './socket/socket';

const App = () => {
  const { user } = useSelector(store => store.Auth)

  LiveLocation()
  LiveUpdateLocation()

  useEffect(() => {
    if (!user?.id) return;

    const socket = initSocket(instance.defaults.baseURL);

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id)
      socket.emit("identity", { userId: user.id })
    })

    return () => {
      disconnectSocket();
    }
  }, [user?.id])

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
