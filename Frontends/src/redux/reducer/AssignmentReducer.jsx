import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deliveryAssignment: [],
  
};

export const AssignmentReducer = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    setDeliveryAssignment: (state, action) => {
      state.deliveryAssignment = action.payload;
    },

    
  },
});

// Action creators are generated for each case reducer function
export const {
  setDeliveryAssignment
} = AssignmentReducer.actions;

export default AssignmentReducer.reducer;
