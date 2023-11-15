import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productList/productListSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/CartSlice";
import orderReducer from "../features/orders/orderSlice";
import userReducer from "../features/user/userSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    user: authReducer,
    cart: cartReducer,
    order: orderReducer,
    users: userReducer,
  },
});
