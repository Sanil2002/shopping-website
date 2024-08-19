import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage';
import cartReducer from '../features/cartSlice';

// const persistConfig={
//   key:'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig,cartReducer);

export const store = configureStore({
  reducer: {
    cart: cartReducer,             
  },
});

// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;         //Type for the state of the store
export type AppDispatch = typeof store.dispatch;                   //Type for the dispatch function of the store
