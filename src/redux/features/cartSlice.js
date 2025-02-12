import { createSlice } from "@reduxjs/toolkit";

// Set initial value
const initialState = {
  cartData: [],
};

// Create cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartData: (state, action) => {
      state.cartData = action.payload;
    },
  },
});

export const { setCartData } = cartSlice.actions;
export default cartSlice.reducer;
