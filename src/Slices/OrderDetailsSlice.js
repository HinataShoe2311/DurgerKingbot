import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [], // Each item will be { id, name, price, quantity }
  total_price: 0
};

const OrderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    addItemToOrder: (state, action) => {
      const { id, name, price } = action.payload;
      const item = state.orders.find(item => item.id === id);
      if (item) {
        item.quantity += 1;
      } else {
        state.orders.push({ id, name, price, quantity: 1 });
      }
      state.total_price += price;
    },

    removeItemFromOrder: (state, action) => {
      const id = action.payload;
      const itemIndex = state.orders.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        const item = state.orders[itemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.orders.splice(itemIndex, 1);
        }
        state.total_price -= item.price;
      }
    }
  }
});

export const { addItemToOrder, removeItemFromOrder } = OrderDetailsSlice.actions;
export default OrderDetailsSlice;
