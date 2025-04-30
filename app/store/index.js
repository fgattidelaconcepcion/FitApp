const { configureStore } = require("@reduxjs/toolkit");
import { setupListeners } from "@reduxjs/toolkit/query";
import counterReducer from "../features/counter/counterSlice"
import shopReducer from "../features/shop/shopSlice"
import cartReducer from "../features/cart/cartSlice"
import authReducer from "../features/user/userSlice"
import { shopApi } from "../services/shopServices";
import { authApi } from "../services/authService";
const store = configureStore({
  reducer: {
    counter: counterReducer,
    shop: shopReducer,
    cart: cartReducer,
    auth: authReducer,
    [shopApi.reducerPath]: shopApi.reducer, 
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(shopApi.middleware)
      .concat(authApi.middleware)
});

setupListeners(store.dispatch);

export default store;