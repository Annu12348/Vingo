import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: [],
  singleItem: null,
  itemByCity: [],
}

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
      state.itemByCity = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { setItem, setSingleItem, setitemByCity } = ItemReducer.actions;

export default ItemReducer.reducer;