import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userOrders: [],
  ownerOrders: [],
};

export const OrderReducer = createSlice({
  name: "order",
  initialState,
  reducers: {
    setUserOrders: (state, action) => {
      state.userOrders = action.payload;
    },

    setOwnerOrders: (state, action) => {
      state.ownerOrders = action.payload;
    },

    ownerUpdateOrderStatus: (state, action) => {
      const { orderId, shopId, status } = action.payload;
      const order = state.ownerOrders.find((o) => o._id === orderId);

      if (!order) return;
      if (order) {
        const shopOrder = order.shopOrders.find((s) => s.shop._id === shopId);
        if (shopOrder) {
          shopOrder.status = status;
        }
      }

      const userOrder = state.userOrders.find((u) => u._id == orderId);
      if (!userOrder) return;
      if (userOrder) {
        const shopOrde = userOrder.shopOrders.find(
          (s) => s.shop._id === shopId
        );
        if (shopOrde) {
          shopOrde.status = status;
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserOrders,
  setOwnerOrders,
  ownerUpdateOrderStatus,
  userUpdateOrderStatus,
} = OrderReducer.actions;
export default OrderReducer.reducer;
