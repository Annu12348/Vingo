import React from 'react'
import { useSelector } from 'react-redux'
import useModal from '../hook/useModal';
import { Link } from 'react-router-dom';

const Modal = () => {
    const { isOpen, title, message } = useSelector(store => store.Modal);
    const { hideModal } = useModal()

    if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-colors duration-300">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-8 animate-fade-in">
        <button
          onClick={hideModal}
          className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414l4.95-4.95-4.95-4.95A1 1 0 015.05 3.636l4.95 4.95z"
              fill="currentColor"
            />
          </svg>
        </button>
        {title && (
          <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">{title}</h2>
        )}
        {message && (
          <p className="text-base text-gray-600 mb-6 text-center">{message}</p>
        )}

        <div className="flex flex-row-reverse justify-center gap-3 mt-2">
          <Link
            onClick={hideModal}
            to='/register'
            className="bg-orange-500 hover:bg-orange-600 capitalize text-white font-semibold rounded-xl px-6 py-2 shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-200"
          >
            create account
          </Link>
          <Link
            onClick={hideModal}
            to='/login'
            className="bg-gray-100 hover:bg-gray-200 capitalize text-gray-800 font-medium rounded-xl px-6 py-2 border border-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
          >
            login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Modal
