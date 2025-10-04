import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shops: [],
};

export const ShopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setShops: (state, action) => {
      state.shops = action.payload;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { setShops } = ShopSlice.actions;
export default ShopSlice.reducer;
