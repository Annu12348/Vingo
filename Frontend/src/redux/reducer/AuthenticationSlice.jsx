import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  city: null,
}

export const AuthenticationSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setCity } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
