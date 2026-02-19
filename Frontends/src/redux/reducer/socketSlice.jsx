import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    removeSocket: (state) => {
      state.socket = null;
    },
  },
});

export const { setSocket, removeSocket } = socketSlice.actions;
export default socketSlice.reducer;
