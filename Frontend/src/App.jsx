import React from 'react'
import Router from './utils/Router'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className='w-full h-screen'>
      <Router />
      <ToastContainer
      position='bottom-right'
      autoClose={2000}
       /> 
    </div>
  )
}

export default App
//toast.success
//toast.error
//toast.info
