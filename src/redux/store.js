import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./features/categorySlice";
import searchReducer from "./features/searchSlice";
import themeReducer from "./features/themeSlice";
import userReducer from "./features/userSlice";
import sellerReducer from "./features/sellerSlice";
import cartReducer from "./features/cartSlice";
import adminReducer from "./features/adminSlice";
import bannerReducer from "./features/bannerSlice";
import wishlistReducer from './features/wishlistSlice'

// Config store
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    search: searchReducer,
    theme: themeReducer,
    user: userReducer,
    seller: sellerReducer,
    admin: adminReducer,
    cart: cartReducer,
    banner: bannerReducer,
    wishlist: wishlistReducer
  },
});
