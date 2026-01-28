import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deliveryAssignment: [],
  acceptOrders: null
};

export const AssignmentReducer = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    setDeliveryAssignment: (state, action) => {
      state.deliveryAssignment = action.payload;
    },
    setAcceptOrders: (state, action) => {
      state.acceptOrders = action.payload;
    },    
  },
});

// Action creators are generated for each case reducer function
export const {
  setDeliveryAssignment, setAcceptOrders
} = AssignmentReducer.actions;

export default AssignmentReducer.reducer;
