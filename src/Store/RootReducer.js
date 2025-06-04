// src/Store/RootReducer.js
import OrderDetailsSlice from "@/Slices/OrderDetailsSlice";
export const reducer = {
    orderDetails: OrderDetailsSlice.reducer,
};
