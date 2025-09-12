import { configureStore } from '@reduxjs/toolkit'
import AuthenticationReducer from "../redux/Authentication/AuthenticationSlice"

export default configureStore({
  reducer: {
    Auth: AuthenticationReducer
  },
})
