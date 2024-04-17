
import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contactSlice'
import customerReducer from './customerSlice'

// Create the Redux store
const store = configureStore({
  reducer: {
    contact: contactReducer,
    customers: customerReducer
  }
});

export default store