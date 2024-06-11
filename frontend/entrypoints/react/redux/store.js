
import { configureStore } from '@reduxjs/toolkit';
import contactReducer from '../features/contacts/contactSlice'
import customerReducer from '../features/customers/customerSlice'
import productReducer from '../features/products/productSlice'

// Create the Redux store
const store = configureStore({
  reducer: {
    contacts: contactReducer,
    customers: customerReducer,
    products: productReducer
  }
});

export default store