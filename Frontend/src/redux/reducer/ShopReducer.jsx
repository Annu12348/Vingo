import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shop: [],
  singleShop: null,
}

export const ShopReducer = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setShop: (state, action) => {
      state.shop = action.payload;
    },

    setSingleShop: (state, action) => {
      state.singleShop = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { setShop, setSingleShop } = ShopReducer.actions;

export default ShopReducer.reducer;
