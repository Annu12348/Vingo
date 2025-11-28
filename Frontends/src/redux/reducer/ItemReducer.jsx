import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: [],
  singleItem: null,
  itemByCity: [],
  cartItems: [],
  totalAmount: 0,
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
      state.totalAmount=state.cartItems.reduce((sum, i) => sum+i.price*i.quantity, 0)
    },

    updateCartItem: (state, action) => {
      const { id, quantity } = action.payload;
      const cartItem = state.cartItems.find((i) => i.id == id);
      if (cartItem) {
        cartItem.quantity = quantity;
      }
      state.totalAmount=state.cartItems.reduce((sum, i) => sum+i.price*i.quantity, 0)
    },

    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      state.totalAmount=state.cartItems.reduce((sum, i) => sum+i.price*i.quantity, 0)
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setItem,
  setSingleItem,
  setitemByCity,
  addToCart,
  removeCartItem,
  updateCartItem,
} = ItemReducer.actions;

export default ItemReducer.reducer;
