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
  items: CartItem[];                                                                                                          //Array of items currently in the cart
  isCartOpen: boolean; 
}

const initialState: CartState = {
  items: [],                                                                                                                  //No items in the cart currently.
  isCartOpen: false                                                                                                           // Initial state for cart visibility.
  ,
};

const cartSlice = createSlice({                                                                                               //creating a slice of the redux state for the cart.
  name: 'cart',
  initialState,
  reducers: {                                                                                                                 //Reducer functions to handle actions.
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;                                                                                           // Replace current items with the new list provided in the action payload.
      },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);                                                                                     //If item is not in the cart add the new item to the cart.
        
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
    },
    clearCart: (state) => {
      state.items = [];
    },
  }
});

export const { addItem, removeItem, updateItemQuantity, openCart, closeCart,setCartItems, clearCart } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;                                                       //Selector to get the items from the cart state.
export const selectCartItemQuantity = (state: RootState, id: number) =>                                                      // Selector to get the quantity of a specific item from the cart state.
  state.cart.items.find(item => item.id === id)?.quantity || 0;                                                              // Find the item with the given ID and return its quantity, defaulting to 0 if not found.
export default cartSlice.reducer;