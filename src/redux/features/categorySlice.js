import { createSlice } from "@reduxjs/toolkit";

// Set initial vlaue
const initialState = {
  category: "",
}

// Create categorySlice
const categorySlice = createSlice({
  name: "category",
  initialState,

  // Set category
  reducers: {
    setCategory: (state, action) => {
      //Add data to category state
      state.category = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
