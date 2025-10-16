import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shop: [],
}

export const ShopReducer = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setShop: (state, action) => {
      state.shop = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShop } = ShopReducer.actions;

export default ShopReducer.reducer;
