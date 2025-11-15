import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: [],
  singleItem: null,
  itemByCity: [],
  cartItems: [],
};

export const ItemReducer = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItem: (state, action) => {
      state.item = action.payload;
    },

    setSingleItem: (state, action) => {
      state.singleItem = action.payload;
    },

    setitemByCity: (state, action) => {
      state.itemByCity = action.payload;
    },

    addToCart: (state, action) => {
      const cartItem = action.payload;
      const existingItem = state.cartItems.find((i) => i.id == cartItem.id);
      if (existingItem) {
        existingItem.quantity += cartItem.quantity;
      } else {
        state.cartItems.push(cartItem);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setItem, setSingleItem, setitemByCity, addToCart } =
  ItemReducer.actions;

export default ItemReducer.reducer;
