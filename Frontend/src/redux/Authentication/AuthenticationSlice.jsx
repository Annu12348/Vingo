import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
}

export const AuthenticationSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
