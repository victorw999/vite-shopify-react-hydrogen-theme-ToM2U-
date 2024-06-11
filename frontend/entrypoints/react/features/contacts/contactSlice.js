import { createSlice } from '@reduxjs/toolkit'
import { importAllImages } from '../../Global';

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    placeholderImages: {},
    imageLoadingError: null
  },
  reducers: {
    loadImages: (state, action) => {
      state.imageLoadingError = false
      state.placeholderImages = { ...state.placeholderImages, ...action.payload };
    },
    imageLoadingErr: (state) => {
      state.imageLoadingError = true
    }
  },
})


/**
 * this "thunk creator" only load placeholder images for contacts
 *    we haven't add "contacts" into store
 *    currently "contacts" is still stored at local storage, and loaded via loader()
 * 
 *  */

// the outside "thunk creator" function
export const fetchContactsPlaceholderImgs = () => {

  // the inside "thunk function"
  return async (dispatch, getState) => {
    try {

      // make an async call in the thunk
      const images = importAllImages(import.meta.glob('../../assets/contacts/**/*.{png,jpg,jpeg,svg}', { eager: true }));

      // dispatch an action when we get the response back
      dispatch(loadImages(images))
    } catch (err) {
      // If something went wrong, handle it here
      dispatch(imageLoadingErr())
    }
  }
}

export const { loadImages, imageLoadingErr } = contactSlice.actions
export default contactSlice.reducer