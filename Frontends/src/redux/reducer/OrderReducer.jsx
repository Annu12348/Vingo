import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userOrders: [],
  ownerOrders: [],
  singleTrackOrder: null
};

export const OrderReducer = createSlice({
  name: "order",
  initialState,
  reducers: {
    setUserOrders: (state, action) => {
      state.userOrders = action.payload;
    },

    addUserOrders: (state, action) => {
      if (!action.payload || !action.payload._id) return;
      state.userOrders.push(action.payload);
    },

    setOwnerOrders: (state, action) => {
      state.ownerOrders = action.payload;
    },

    addOwnerOrder: (state, action) => {
      state.ownerOrders = [action.payload, ...state.ownerOrders]
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

    setSingleTrackOrder: (state, action) => {
      state.singleTrackOrder = action.payload;
    },

    updateUserRealTimeOrderStatus: (state, action) => {
      const { orderId, shopId, status } = action.payload;

      const orderIndex = state.userOrders.findIndex(
        so => so._id == orderId
      );

      if (orderIndex !== -1) {
        const shopOrderIndex = state.userOrders[orderIndex].shopOrders.findIndex(
          so => so.shop._id == shopId
        )

        if (shopOrderIndex !== -1) {
          state.userOrders[orderIndex].shopOrders = [
            ...state.userOrders[orderIndex].shopOrders.slice(0, shopOrderIndex),

            {
              ...state.userOrders[orderIndex].shopOrders[shopOrderIndex],
              status: status,
            },

            ...state.userOrders[orderIndex].shopOrders.slice(shopOrderIndex + 1),
          ]
        }
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserOrders,
  addUserOrders,
  setOwnerOrders,
  ownerUpdateOrderStatus,
  userUpdateOrderStatus,
  setSingleTrackOrder,
  addOwnerOrder,
  updateUserRealTimeOrderStatus,
} = OrderReducer.actions;
export default OrderReducer.reducer;
