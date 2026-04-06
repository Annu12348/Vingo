import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    title: "",
    message: "",
    type: "confirm",
};

const modalReducer = createSlice({
    name: "modal",
    initialState,
    reducers: {
       openModal: (state, actions) => {
        state.isOpen = true;
        state.title = actions.payload.title;
        state.message = actions.payload.message;
        state.type = actions.payload.type;
       },

       closeModal: (state) => {
        state.isOpen = false
       }
    },
});

export const { openModal, closeModal } = modalReducer.actions;
export default modalReducer.reducer;