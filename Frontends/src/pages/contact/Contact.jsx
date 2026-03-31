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
    <div className="relative w-full min-h-screen bg-black">
      <div className="absolute inset-0 w-full h-full">
        <img
          className="w-full h-full object-cover object-center"
          src="https://images.unsplash.com/photo-1481833761820-0509d3217039?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"
          alt=""
        />
        <div className="absolute inset-0 opacity-70 w-full h-full bg-black" />
      </div>
      <div className="relative z-10 flex flex-col  min-h-screen">
        <HomeNavbar />
        <div className="flex-1 flex flex-col justify-center px-3 sm:px-6 lg:px-16 py-10">
          <div className="text-white w-full flex flex-col items-center justify-center mt-10">
            <h1 className='font-["Kaushan"] mb-1 tracking-tight leading-none text-2xl sm:text-3xl capitalize font-normal'>
              get in touch
            </h1>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-[2px] w-10 bg-red-400"></div>
              <div className="w-1 h-1 rounded-full bg-white"></div>
              <div className="h-[2px] w-10 bg-red-400"></div>
            </div>
            <h1 className="font-display tracking-tight font-semibold leading-tight text-4xl sm:text-5xl md:text-6xl mb-3 text-center">
              Contact Us
            </h1>
            <p className="text-xs sm:text-sm leading-none mt-1 tracking-tight text-center">
              we'd love to hear from you!
            </p>
          </div>
          <div className="w-full mt-8 md:mt-16 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5">
            <div className="w-full md:w-[20%] opacity-50 bg-zinc-900 flex items-center gap-4 md:gap-5 justify-center rounded-lg border-black border p-3 mb-3 md:mb-0">
              <h1 className="text-2xl md:text-3xl text-white">
                <FaPhone />
              </h1>
              <div className="text-white capitalize">
                <h1 className="text-sm md:text-base">call us</h1>
                <h1 className="text-sm md:text-base font-semibold tracking-tight">+91 89597 32124</h1>
              </div>
            </div>
            <div className="w-full md:w-[20%] bg-zinc-900 opacity-50 flex items-center gap-4 md:gap-5 justify-center rounded-lg border-black border p-3 mb-3 md:mb-0">
              <h1 className="text-3xl md:text-4xl text-white">
                <MdOutlineMail />
              </h1>
              <div className="text-white">
                <h1 className="capitalize text-sm md:text-base">email us</h1>
                <h1 className="text-sm md:text-base font-semibold tracking-tight">annu37752@gmail.com</h1>
              </div>
            </div>
            <div className="w-full md:w-[20%] opacity-50 bg-zinc-900 flex items-center gap-4 md:gap-5 justify-center rounded-lg border-black border p-3">
              <h1 className="text-2xl md:text-3xl text-white">
                <FaMapMarkerAlt />
              </h1>
              <div className="text-white capitalize">
                <h1 className="text-sm md:text-base">visit us</h1>
                <h1 className="text-sm md:text-base font-semibold tracking-tight">jawa rewa (m.p)</h1>
              </div>
            </div>
          </div>
          <div className="w-full max-w-xl lg:max-w-2xl mx-auto mt-10">
            <div className="w-full p-5 sm:p-7 bg-white/90 rounded-lg flex flex-col items-center shadow-lg">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-[1px] bg-red-950"></div>
                <h1 className='font-["Kaushan"] tracking-tight text-red-950 leading-none text-2xl sm:text-3xl capitalize font-normal mb-1'>get in touch</h1>
                <div className="w-10 h-[1px] bg-red-950"></div>
              </div>
              <form
                className="w-full mt-7 flex flex-col gap-5"
                onSubmit={submitHandler}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <input
                    className="w-full sm:w-1/2 border outline-none border-zinc-300 p-2 capitalize rounded-lg transition-all focus:ring-2 focus:ring-red-200 text-sm"
                    type="text"
                    placeholder="your name..."
                    value={inputValue.name}
                    onChange={(e) => setInputValue({ ...inputValue, name: e.target.value })}
                    required
                  />
                  <input
                    className="w-full sm:w-1/2 border outline-none border-zinc-300 p-2 rounded-lg transition-all focus:ring-2 focus:ring-red-200 text-sm mt-3 sm:mt-0"
                    type="email"
                    placeholder="your email..."
                    value={inputValue.email}
                    onChange={(e) => setInputValue({ ...inputValue, email: e.target.value })}
                    required
                  />
                </div>
                <input
                  className="w-full border outline-none border-zinc-300 p-2 capitalize rounded-lg transition-all focus:ring-2 focus:ring-red-200 text-sm"
                  type="text"
                  placeholder="sub title..."
                  value={inputValue.title}
                  onChange={(e) => setInputValue({ ...inputValue, title: e.target.value })}
                  required
                />
                <textarea
                  className="w-full resize-none border outline-none border-zinc-300 p-2 capitalize rounded-lg transition-all focus:ring-2 focus:ring-red-200 text-sm"
                  placeholder="your phone..."
                  rows={4}
                  value={inputValue.description}
                  onChange={(e) => setInputValue({ ...inputValue, description: e.target.value })}
                  required
                />
                <button
                  type="submit"
                  className="bg-red-950 w-fit self-center mt-2 px-8 py-2.5 rounded-lg text-white capitalize font-semibold tracking-wide transition-all duration-200 hover:bg-red-800 focus:outline-none focus:ring focus:ring-red-200"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-6 h-6 animate-spin border-t-2 rounded-full border-b-2 border-white mx-auto"></div>
                  ) : "send message"}
                </button>
              </form>
            </div>
          </div>
          <div className="w-full mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5">
            <div className="w-full opacity-60 sm:w-[420px] p-2 flex items-center justify-center rounded-lg border-zinc-800 border-2 mb-3 sm:mb-0 bg-black/60">
              <div className="flex items-center justify-center flex-col w-full">
                <h1 className="text-white font-[Kaushan] text-xl sm:text-2xl capitalize">opening hours</h1>
                <div className="flex items-center mt-1">
                  <div className="w-14 sm:w-20 h-[1px] bg-red-900"></div>
                  <div className="w-1 h-1 bg-white rounded-full mx-2"></div>
                  <div className="w-14 sm:w-20 h-[1px] bg-red-900"></div>
                </div>
                <div className="mt-4 pb-8 text-center">
                  <h1 className="text-white font-display font-semibold capitalize text-base sm:text-lg">monday - sunday</h1>
                  <h1 className="text-white font-display mt-1 capitalize text-base sm:text-lg">10:00 AM - 10:00 PM</h1>
                </div>
              </div>
            </div>
            <div className="w-full opacity-60 sm:w-[420px] p-2 flex items-center justify-center rounded-lg border-zinc-800 border-2 bg-black/60">
              <div className="flex items-center justify-center flex-col w-full">
                <h1 className="text-white font-[Kaushan] text-xl sm:text-2xl capitalize">follow us</h1>
                <div className="flex items-center -mt-0.5 mb-3">
                  <div className="w-8 sm:w-11 h-[1px] bg-red-900"></div>
                  <div className="w-1 h-1 bg-white rounded-full mx-2"></div>
                  <div className="w-8 sm:w-11 h-[1px] bg-red-900"></div>
                </div>
                <div className="flex items-center pb-6 justify-center gap-3 text-base sm:text-xl">
                  <a href="#" className="text-white bg-blue-800 p-2 rounded-full hover:bg-blue-700 transition-colors"><FaFacebookF /></a>
                  <a href="#" className="text-white bg-red-500 p-2 rounded-full hover:bg-red-600 transition-colors"><FaInstagram /></a>
                  <a href="#" className="text-white bg-blue-400 p-2 rounded-full hover:bg-blue-500 transition-colors"><FaTwitter /></a>
                  <a href="#" className="text-white bg-red-400 p-2 rounded-full hover:bg-red-500 transition-colors"><FaYoutube /></a>
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
