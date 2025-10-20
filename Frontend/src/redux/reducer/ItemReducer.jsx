import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: [],
}

export const ItemReducer = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItem: (state, action) => {
      state.item = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setItem } = ItemReducer.actions;

export default ItemReducer.reducer;