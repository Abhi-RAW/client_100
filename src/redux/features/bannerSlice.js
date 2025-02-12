import { createSlice } from "@reduxjs/toolkit";

// Set initial value
const initialState = {
  banner: true,
};

// Create banner slice
const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    setBanner: (state, action) => {
      state.banner = action.payload;
    },
  },
});

export const { setBanner } = bannerSlice.actions;
export default bannerSlice.reducer;
