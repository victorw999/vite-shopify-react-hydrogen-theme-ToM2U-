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

      // fetch origin img
      const images = importAllImages(import.meta.glob('../../assets/contacts/**/*.{png,jpg,jpeg,svg}',
        {
          eager: true
        }));

      // fetch srcset with '@vite-imagetools'
      const images_srcset = importAllImages(import.meta.glob('../../assets/contacts/**/*.{png,jpg,jpeg,svg}',
        {

          /**
           ** ref: https://github.com/vitejs/vite/discussions/8695#discussioncomment-4473184
           ** doc: https://github.com/JonasKruckenberg/imagetools/blob/main/docs/directives.md#srcset
           *  this will generate this:     
              "ppl-1": http://localhost:5173/@imagetools/foo 200w, 
                       http://localhost:5173/@imagetools/bar 600w",
            */
          query: {
            format: 'jpg', w: '200;600', picture: '', as: "srcset"
          },
          eager: true
        }));

      // combine 2 obj
      let mergedObj = {}
      Object.keys(images).forEach(key => {

        mergedObj[key] = {
          'src': images[key] ?? '',
          'srcset': images_srcset[key] ?? ''
        }
      })

      // dispatch an action when we get the response back
      dispatch(loadImages(mergedObj))
    } catch (err) {
      // If something went wrong, handle it here
      dispatch(imageLoadingErr())
    }
  }
}

export const { loadImages, imageLoadingErr } = contactSlice.actions
export default contactSlice.reducer