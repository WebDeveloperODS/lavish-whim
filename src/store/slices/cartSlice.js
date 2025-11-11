import { createSlice } from "@reduxjs/toolkit";

const item={
  id: '',
  title: '',
  qty: 0,
  price: 0
}

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const exists = state.items.find(i => i.id === action.payload.id);
      if (exists) {
        exists.qty += action.payload.qty;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      console.log(action.payload.id);
      state.items = state.items.filter(i => i.id === action.payload.id && i.qty > 1 ? (i.qty -= 1) : i.id !== action.payload.id); ;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
