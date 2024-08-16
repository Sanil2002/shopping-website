import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartState {
  items: CartItem[];
  isCartOpen: boolean; // Add this state
}

const initialState: CartState = {
  items: [],
  isCartOpen: false // Initial state for cart visibility
  ,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
        
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateItemQuantity: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity = action.payload.quantity;
      }
    },
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    }
  }
});

export const { addItem, removeItem, updateItemQuantity, openCart, closeCart,setCartItems } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartItemQuantity = (state: RootState, id: number) =>
  state.cart.items.find(item => item.id === id)?.quantity || 0;
export default cartSlice.reducer;
