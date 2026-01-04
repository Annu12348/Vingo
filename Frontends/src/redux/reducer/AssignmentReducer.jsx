import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignment: [],
};

export const AssignmentReducer = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    setAssignment: (state, action) => {
      state.assignment = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAssignment
} = AssignmentReducer.actions;

export default AssignmentReducer.reducer;
