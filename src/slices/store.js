import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chat.js';

const store = configureStore({
  reducer: chatReducer,
});

export default store;
