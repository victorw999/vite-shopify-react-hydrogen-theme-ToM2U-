import { createSlice, createSelector, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import fetchCustomersByAdminAPI from './fetchCustomersByAdminAPI'

const customerAdapter = createEntityAdapter()

const initialState = customerAdapter.getInitialState({
  status: 'idle',
})


export const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(fetchCustomers.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        customerAdapter.setAll(state, action.payload)
        state.status = 'idle'
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';

        // Accessing error information
        if (action.payload) {
          // Likely a direct error object if the API set it
          state.error = action.payload;
        } else if (action.error.message) {
          // Redux Toolkit wraps errors 
          state.error = action.error.message;
        } else {
          // Unknown error format
          state.error = "An unknown error occurred."
        }
      })

  }
})

// THUNK
export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
  const response = await fetchCustomersByAdminAPI()
  return response
})

// SELECTORS
export const {
  selectAll: selectCustomers, // you can use it like const customers = useSelector(selectCustomers).
  selectById: selectCustomerById, // you can use it like const customer = useSelector(selectCustomerById).
} = customerAdapter.getSelectors((state) => state.customers)


// export const { loadCustomers } = customerSlice.actions
export default customerSlice.reducer