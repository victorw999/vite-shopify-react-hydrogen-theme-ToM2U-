
import { configureStore } from '@reduxjs/toolkit';
import contactReducer from '../features/contacts/contactSlice'
import customerReducer from '../features/customers/customerSlice'

// Create the Redux store
const store = configureStore({
  reducer: {
    contact: contactReducer,
    customers: customerReducer
  }
});

export default store