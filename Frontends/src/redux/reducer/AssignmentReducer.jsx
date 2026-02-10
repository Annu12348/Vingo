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

    addDeliveryAssignment: (state, action) => {
      state.deliveryAssignment = [action.payload, ...state.deliveryAssignment]
    },

    setAcceptOrders: (state, action) => {
      state.acceptOrders = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setDeliveryAssignment, setAcceptOrders, addDeliveryAssignment
} = AssignmentReducer.actions;

export default AssignmentReducer.reducer;
