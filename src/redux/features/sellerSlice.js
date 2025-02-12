import { createSlice } from "@reduxjs/toolkit";


// Set initial value
const initialState = {
    isSellerAuth: false,
    sellerData: {}
}

// Create seller slice
export const sellerSlice =  createSlice({
    name: 'seller',
    initialState,
    reducers: {
        saveSellerData: (state, action) => {
            (state.isSellerAuth = true),
            (state.sellerData = action.payload)
        },
        clearSellerData: (state) => {
            (state.isSellerAuth = false),
            (state.sellerData = {})
        }
    }
})

export const {saveSellerData, clearSellerData} = sellerSlice.actions
export default sellerSlice.reducer