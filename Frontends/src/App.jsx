import React from 'react'
import Router from './utils/Router'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import LiveLocation from './components/LiveLocation';
import LiveUpdateLocation from './components/LiveUpdateLocation';

const App = () => {
  LiveLocation()
  LiveUpdateLocation()
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
