// src/Store/RootReducer.js
import OrderDetailsSlice from "@/Slices/OrderDetailsSlice";
import { combineReducers } from 'redux';
export const rootReducer = combineReducers({
  orderDetails: OrderDetailsSlice.reducer,
});
