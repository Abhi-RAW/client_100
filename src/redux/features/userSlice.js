import { createSlice } from "@reduxjs/toolkit";

// Set initial value
const initialState = {
    isUserAuth: true,
    userData: {}
}

// Create user slice
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUserData: (state, action) => {
            (state.isUserAuth = true),
            (state.userData = action.payload)
        },
        clearUserData: (state) => {
            (state.isUserAuth = false), (state.userData = {})
        }
    }
})

export const {saveUserData, clearUserData} = userSlice.actions

export default userSlice.reducer