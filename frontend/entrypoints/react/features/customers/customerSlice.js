import { createSlice, createSelector, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import customersLoader from '../../loaders/customersLoader'
import { calcCustomerTotalSpending } from './customerUtils';
import sortBy from 'sort-by'


export const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: [],
    loadingError: null
  },
  reducers: {
    loadCustomers: (state, action) => {
      state.loadingError = false

      // Extract IDs
      const existingCustomerIds = new Set(state.customers.map(customer => customer.id));

      // Filter new customers
      const newCustomers = action.payload.filter(customer => !existingCustomerIds.has(customer.id));

      // only update when current store doesn't have it. prevent duplicates
      if (newCustomers.length > 0) {

        // add "totalSpending" property to each customer, to sum up customer's total spending 
        const mod_customers = action.payload.map((customer) => {
          return { ...customer, totalSpending: calcCustomerTotalSpending(customer) }
        })

        let arr = [...state.customers, ...mod_customers];
        state.customers = arr.sort(sortBy('firstName', 'lastName'))
      }

    },
    loadingError: (state) => {
      state.loadingError = true
    }
  },

})


// the outside "thunk creator" function
export const fetchCustomers = () => {

  // the inside "thunk function"
  return async (dispatch, getState) => {
    try {
      // make an async call in the thunk
      const customers = await customersLoader()

      // dispatch an action when we get the response back
      dispatch(loadCustomers(customers))
    } catch (err) {
      // If something went wrong, handle it here
      dispatch(loadingError())
    }
  }
}


export const { loadCustomers, loadingError } = customerSlice.actions
export default customerSlice.reducer