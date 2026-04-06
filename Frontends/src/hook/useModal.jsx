import React from 'react'
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '../redux/reducer/ModelReducer';

const useModal = () => {
  const dispatch = useDispatch()

  const showModal = (data) => {
    dispatch(openModal(data))
  } 

  const hideModal = () => {
    dispatch(closeModal())
  }
  return {
    showModal,
    hideModal
  }
}

export default useModal
