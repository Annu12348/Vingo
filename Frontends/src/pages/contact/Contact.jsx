import React, { useState } from 'react'
import HomeNavbar from '../home/components/HomeNavbar'
import { MdOutlineMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { sendMessage } from '../../api/Contact';
import { toast } from 'react-toastify';

const Contact = () => {
  const [ loading, setLoading ] = useState(false)
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
  })

  const sendMessageApi = async () => {
    try {
      setLoading(true)
      const result = await sendMessage(inputValue)
      toast.success(result.data.message)
      setInputValue({
        name: "",
        email: "",
        title: "",
        description: "",
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    sendMessageApi()
  }
  return (
    <div className='w-full h-[calc(100vh+66vh)] relative  '>
      <img className='w-full h-full object-cover object-center' src='https://images.unsplash.com/photo-1481833761820-0509d3217039?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D' />
      <div className='w-full h-[calc(100vh+66vh)]  bg-black opacity-60 absolute inset-0 '>
        <HomeNavbar />
        <div className=' mt-37 w-full px-13 '>
          <div className='text-white w-full flex flex-col items-center justify-center'>
            <h1 className='font-["Kaushan"] mb-0.5 tracking-tight leading-none text-3xl capitalize font-normal'>get in touch</h1>
            <div className='flex items-center justify-center gap-2'>
              <div className='h-[1.5px] w-10 bg-red-400 '></div>
              <div className='w-1 h-1 rounded-full bg-white'></div>
              <div className='h-[1.5px] w-10 bg-red-400 '></div>
            </div>
            <h1 className='font-display tracking-tight leading-none font-semibold text-6xl mb-2'>Contact Us</h1>
            <p className='text-sm leading-none mt-1 tracking-tight'>we'd love to hear from you!</p>
          </div>
          <div className='w-full mt-40 flex items-center justify-between'>
            <div className='w-[18%] bg-zinc-900 flex  items-center gap-5 justify-center rounded-lg  border-black border  p-2 '>
              <h1 className='text-2xl  text-white'>
                <FaPhone />
              </h1>
              <div className='text-white capitalize '>
                <h1>call us</h1>
                <h1>+91 89597 32124</h1>
              </div>
            </div>
            <div className='w-[20%] bg-zinc-900 flex  items-center gap-5 justify-center rounded-lg  border-black border  p-2 '>
              <h1 className='text-4xl  text-white'>
                <MdOutlineMail />
              </h1>
              <div className='text-white  '>
                <h1 className='capitalize'>email us</h1>
                <h1>annu37752@gmail.com</h1>
              </div>
            </div>
            <div className='w-[18%] bg-zinc-900 flex  items-center gap-5 justify-center rounded-lg  border-black border  p-2 '>
              <h1 className='text-2xl  text-white'>
                <FaMapMarkerAlt />
              </h1>
              <div className='text-white capitalize '>
                <h1>visit us</h1>
                <h1>jawa rewa (m.p)</h1>
              </div>
            </div>
          </div>
          <div className='w-full mt-10 '>
            <div className='w-full p-5 bg-white rounded-lg flex flex-col items-center'>
              <div className='flex items-center justify-center gap-3'>
                <div className='w-10 h-[0.1px]  bg-red-950'></div>
                <h1 className='font-["Kaushan"] mb-0.5 tracking-tight text-red-950 leading-none text-3xl capitalize font-normal'>get in touch</h1>
                <div className='w-10 h-[0.1px] bg-red-950'></div>
              </div>
              <form
                className='w-full mt-7 flex flex-col '
                onSubmit={submitHandler}
              >
                <div className='flex items-center justify-between'>
                  <input
                    className='w-[48%] border outline-none border-zinc-300 p-2 capitalize  rounded-lg '
                    type='text'
                    placeholder='your name...'
                    value={inputValue.name}
                    onChange={(e) => setInputValue({ ...inputValue, name: e.target.value })}
                    required
                  />
                  <input
                    className='w-[48%] border outline-none border-zinc-300 p-2  rounded-lg '
                    type='email'
                    placeholder='your email...'
                    value={inputValue.email}
                    onChange={(e) => setInputValue({ ...inputValue, email: e.target.value })}
                    required
                  />
                </div>
                <input
                  className='w-full mt-7 border outline-none border-zinc-300 p-2 capitalize  rounded-lg '
                  type='text'
                  placeholder='sub title...'
                  value={inputValue.title}
                  onChange={(e) => setInputValue({ ...inputValue, title: e.target.value })}
                  required
                />
                <textarea
                  className='w-full resize-none mt-7 border outline-none border-zinc-300 p-2 capitalize  rounded-lg '
                  type='number'
                  placeholder='your phone...'
                  rows="4"
                  value={inputValue.description}
                  onChange={(e) => setInputValue({ ...inputValue, description: e.target.value })}
                  required
                />
                <button
                  className='bg-red-950 w-fit text-center m-auto mt-5 p-3 rounded-lg text-white capitalize'
                >
                  {loading ? (
                    <div className='w-6 h-6 animate-spin  border-t-2 rounded-full border-b-2  '></div>
                  ) : "send message"}
                </button>
              </form>
            </div>
          </div>

          <div className='w-full mt-10 flex items-center justify-between'>
            <div className='w-[20%] p-2 flex items-center justify-center  rounded-lg border-zinc-800  border-2'>
              <div className='flex items-center justify-center flex-col'>
                <h1 className='text-white font-[Kaushan] text-2xl capitalize  '>opening hours</h1>
                <div className='flex items-center mt-1'>
                  <div className='w-17 h-[1px] bg-red-900 '></div>
                  <div className='w-1 h-1 bg-white rounded-full'></div>
                  <div className='w-17 h-[1px] bg-red-900 '></div>
                </div>
                <div className='mt-4 pb-8'>
                  <h1 className='text-white font-display font-semibold capitalize '>monday - sunday</h1>
                  <h1 className='text-white font-display mt-1 capitalize '>10:00 AM - 10:00 PM</h1>
                </div>
              </div>
            </div>

            <div className='w-[20%] p-2 flex items-center justify-center  rounded-lg border-zinc-800  border-2'>
              <div className='flex items-center justify-center flex-col'>
                <h1 className='text-white font-[Kaushan] text-2xl capitalize  '>follow us</h1>
                <div className='flex items-center -mt-0.5'>
                  <div className='w-11 h-[1px] bg-red-900 '></div>
                  <div className='w-1 h-1 bg-white rounded-full'></div>
                  <div className='w-11 h-[1px] bg-red-900 '></div>
                </div>
                <div className='mt-4 pb-2 flex items-center pb-8 justify-center gap-3'>
                  <h1 className='text-white font-display mt-1 capitalize bg-blue-800 p-2 rounded-full '><FaFacebookF /></h1>
                  <h1 className='text-white font-display font-semibold capitalize bg-red-500 p-2 rounded-full '><FaInstagram /></h1>
                  <h1 className='text-white font-display font-semibold capitalize bg-blue-400 p-2 rounded-full '><FaTwitter /></h1>
                  <h1 className='text-white font-display font-semibold capitalize bg-red-400 p-2 rounded-full '><FaYoutube /></h1>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Contact
