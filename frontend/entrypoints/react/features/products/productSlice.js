import { createSlice } from '@reduxjs/toolkit'
import productsLoader from '../../loaders/productsLoader'

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loadingError: null
  },
  reducers: {
    loadProducts: (state, action) => {
      state.loadingError = false

      // Extract IDs
      const existingProductIds = new Set(state.products.map(product => product.id));

      // Filter new products
      const newProducts = action.payload.filter(product => !existingProductIds.has(product.id));

      // only update when current store doesn't have it. prevent duplicates
      if (newProducts.length > 0) {
        state.products = [...state.products, ...action.payload];
      }

    },
    loadingError: (state) => {
      state.loadingError = true
    }
  },
})


// the outside "thunk creator" function
export const fetchProducts = () => {

  // the inside "thunk function"
  return async (dispatch, getState) => {
    try {

      // make an async call in the thunk
      const products = await productsLoader()

      // dispatch an action when we get the response back
      dispatch(loadProducts(products))
    } catch (err) {
      // If something went wrong, handle it here
      dispatch(loadingError())
    }
  }
}

export const { loadProducts, loadingError } = productSlice.actions

export default productSlice.reducer