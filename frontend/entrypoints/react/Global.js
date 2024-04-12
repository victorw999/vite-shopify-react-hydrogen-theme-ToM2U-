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
export function isImageFile(str){
  let validExtensions = /\.(jpg|jpeg|svg|png)$/i;  
  return validExtensions.test(str); 
}

/** */
export function removeFileExtension(filename) {
  return filename.split('.').slice(0, -1)[0];
}