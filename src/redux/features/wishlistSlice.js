import { createSlice } from "@reduxjs/toolkit";

// Set initial value
const initialState = {
  wishlistData: [],
};

// Create wishlist slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistData: (state, action) => {
      state.wishlistData = action.payload;
    },
  },
});

export const { setWishlistData } = wishlistSlice.actions;
export default wishlistSlice.reducer;
