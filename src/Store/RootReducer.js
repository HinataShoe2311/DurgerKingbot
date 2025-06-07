// src/Store/RootReducer.js
import OrderDetailsSlice from "@/Slices/OrderDetailsSlice";
import PaymentRequestSlice from "@/Slices/PaymentRequestSlice";
import userDetailsSlice from "@/Slices/userDetailsSlice";
import { combineReducers } from 'redux';
export const rootReducer = combineReducers({
  orderDetails: OrderDetailsSlice.reducer,
  paymentRequest:PaymentRequestSlice.reducer,
  userDetails:userDetailsSlice.reducer
});
