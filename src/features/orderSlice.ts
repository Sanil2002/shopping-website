import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface OrderItem {
 
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  email:string | undefined;
  orderid: string;
}


export interface OrderState {
  orders: {
    orderitems: OrderItem[];
    orderId: string;
  }[];  
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<{ orderId: string; orderitems: OrderItem[]}>) {
      state.orders.push({
        orderId: action.payload.orderId,
        orderitems: action.payload.orderitems,
      })
    },
    removeOrder(state, action: PayloadAction<{ orderId: string }>) {
      // Remove the order from the Redux state
      state.orders = state.orders.filter(order => order.orderId !== action.payload.orderId);

      // Update local storage
      try {
        const existingOrdersJson = localStorage.getItem('orders');
        const existingOrders: { orderId: string; orderitems: OrderItem[] }[] = existingOrdersJson ? JSON.parse(existingOrdersJson) : [];

        // Filter out the order to be removed
        const updatedOrders = existingOrders.filter(order => order.orderId !== action.payload.orderId);

        // Save the updated orders to local storage
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
      } catch (error) {
        console.error('Error updating local storage:', error);
      }
    },
  },
  },
);

export const { addOrder, removeOrder } = orderSlice.actions;
export const selectOrders = (state: RootState) => state.order.orders;
export default orderSlice.reducer;
