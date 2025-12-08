import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userOrders: [],
  ownerOrders: [],
}

export const OrderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
   setUserOrders: (state, action) => {
        state.userOrders = action.payload
    },

    setOwnerOrders: (state, action) => {
        state.ownerOrders = action.payload
    } 
  },
})

// Action creators are generated for each case reducer function
export const { setUserOrders, setOwnerOrders } = OrderReducer.actions
export default OrderReducer.reducer