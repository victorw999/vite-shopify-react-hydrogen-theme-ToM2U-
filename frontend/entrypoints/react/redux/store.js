
import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contactSlice'
// Create the Redux store
const store = configureStore({
  // reducer: appReducer,
  // preloadedState: initialState, // Include initial state
  reducer:{
    contact: contactReducer
  }
});

export default store