import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shop: [],
  singleShop: null,
  shopByCity: [],
  publicShop: [],
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
    },

    setShopByCity: (state, action) => {
      state.shopByCity = action.payload
    },

    setPublicShop: (state, action) => {
      state.publicShop = action.payload
    }
  },
});


export const { setShop, setSingleShop, setShopByCity, setPublicShop } = ShopReducer.actions;

export default ShopReducer.reducer;
