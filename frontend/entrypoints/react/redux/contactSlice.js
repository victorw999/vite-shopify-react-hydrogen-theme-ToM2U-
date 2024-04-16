import { createSlice } from '@reduxjs/toolkit'
import { importAllImages } from '../Global';

export const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    placeholderImages: {},
    imageLoadingError: null
  },
  reducers: {
    loadImages: (state, action) => {
      state.imageLoadingError = false
      state.placeholderImages={ ...state.placeholderImages, ...action.payload };
    },
    imageLoadingErr: (state) => {
      state.imageLoadingError = true
    }
  },
})


// the outside "thunk creator" function
export const loadPlaceholderImages = () => {
  // the inside "thunk function"
  return async (dispatch, getState) => {
    try {
      // make an async call in the thunk
      const images = importAllImages(import.meta.glob('../assets/contacts/**/*.{png,jpg,jpeg,svg}', { eager: true }));

      // dispatch an action when we get the response back
      dispatch(loadImages(images))  
    } catch (err) {
      // If something went wrong, handle it here
      dispatch(imageLoadingErr())
      console.error('===>err loadPlaceholderImages() ', err)
    }
  }
}

export const { loadImages, imageLoadingErr } = contactSlice.actions
export default contactSlice.reducer