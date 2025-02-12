import { createSlice } from "@reduxjs/toolkit";

// Set initial value
const initialState = {
  isAdminAuth: false,
  adminData: {},
};

// Create admin slice
export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    saveAdminData: (state, action) => {
      (state.isAdminAuth = true); 
      (state.adminData = action.payload);
    },
    clearAdminData: (state) => {
      (state.isAdminAuth = false);
      (state.adminData = {});
    },
  },
});

export const { saveAdminData, clearAdminData } = adminSlice.actions;
export default adminSlice.reducer;
