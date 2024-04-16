export const SHOPIFY_URL = Shopify.shop
export const SHOPIFY_REACT_ROOT = 'shopify-react-root'

/* helper: check if url input has forward or backward slashes */
export function stringHasNoSlashes(str) {
  // Regular expression to match forward slash, backward slash, or escaped backslash
  const forbiddenPattern = /[\/\\]|\\/;
  // Return the negated result of the test 
  // (true if no match is found, false otherwise)
  return !forbiddenPattern.test(str);
}

/** */
export function isImageFile(str) {
  let validExtensions = /\.(jpg|jpeg|svg|png)$/i;
  return validExtensions.test(str);
}

/** */
export function removeFileExtension(filename) {
  return filename.split('.').slice(0, -1)[0];
}


/**  Importing image *****************************************************************/
/*
 
  During the build process:
  Vite will include the image that you imported in your asset bundle.
  Vite will handle the hashing of the filename.
*/

/* get all image urls from react/assets/ */
export function importAllImages(modules) {
  let imageUrls = {};
  Object.entries(modules).forEach(([item, module]) => {
    // Extract filename (assumes filenames like 'image-name.jpg')
    const filename = item.split('/').pop().split('.')[0];
    imageUrls[filename] = module.default;
  });
  return imageUrls;
}

/* 
  get specific image urls from react/assets/   

  4/12/2024 Fri 2:02 PM 
  import.meta.glob() does not work with variables, so have to import all images instead of any specific one
  https://github.com/vitejs/vite/discussions/15397#discussioncomment-8419078
  let globStr = `../../assets/contacts/${imgFileName}` <----error, can't use a variable
  const imagePath = import.meta.glob(globStr, { eager: true }); <----error

*/
/*
  const imagePath = import.meta.glob('../../assets/contacts/ppl-1.jpg', { eager: true });
  // Assuming you have only one match
  const imageModule = Object.values(imagePath)[0];
  // Access the image URL
const imageUrl = imageModule.default;
*/

/**  Importing image *****************************************************************/




/*
  Purpose: if avatar url has the 'shoify-assets-folder-path' pattern, then modify the url pointing to assets folder img
  
  Problem:
    this approach is problematic
    When Vite builds your project, it adds unique hashes to your asset filenames (like from ppl-1.jpg to ppl-1.DNYQ4w4w.min.jpg).
*/

/*
const getImgFrmShopifyAssets = useCallback(() => {
  try {
    let str = avatarURL
    if (!str) return
    let pattern = 'shoify-assets-folder-path'
    if (str && str.includes(pattern)) {
      if (!window.shop_assets || !window.shop_assets.assetsFolderPath) {
        throw new Error("window.shop_assets, or assetsFolderPath is not defined");
      }
      let shopify_assets_url = window.shop_assets.assetsFolderPath.trim();
      shopify_assets_url = removeTrailingSlash(shopify_assets_url) // remove the slash at the end
      return str.replace(pattern, shopify_assets_url)
    } else {
      return str;
    }
  } catch (error) {
    console.error("Error generating profile image URL:", error);
    return "";
  }
}, [avatarURL])
*/

function removeTrailingSlash(str) {
  if (str.length > 0) { // Ensure the string is not empty
    const lastChar = str.slice(-1);
    if (lastChar === '/' || lastChar === '\\') {
      return str.slice(0, -1); // Remove the last character
    }
  }
  return str; // If no trailing slash was found
}