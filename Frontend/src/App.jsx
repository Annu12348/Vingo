import React from 'react'
import Router from './utils/Router'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import LiveLocation from './components/LiveLocation';

const App = () => {
  LiveLocation()
  return (
    <div className='w-full h-screen'>
      <Router />
      <ToastContainer
        position='top-center'
        autoClose={5000}
      /> 
    </div>
  )
}

export default App
