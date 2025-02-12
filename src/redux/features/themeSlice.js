import { createSlice } from "@reduxjs/toolkit";

// Set inital value
const initialState = {
  theme: false,
};

// Create theme slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer
