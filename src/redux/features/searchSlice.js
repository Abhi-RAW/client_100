import { createSlice } from "@reduxjs/toolkit";

// Set initial value
const initialState = {
  searchResult: "",
  
};

// Create search slice
const searchSlice = createSlice({
  name: "search",
  initialState,

  // Set search result
  reducers: {
    setSearchValue: (state, action) => {
      // Add search value
      state.searchResult = action.payload;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
