import { Form, useLoaderData, useFetcher } from 'react-router-dom'
import { getContact, updateContact } from '../../utils/contacts/contacts'
import { Button } from '@shadcn/components/ui/button.jsx'
import { useEffect, useState, useCallback } from 'react'
import { stringHasNoSlashes, isImageFile, removeFileExtension } from '../../Global'

export async function loader({ params }) {
  const contact = await getContact(params.contactId)
  if (!contact) {
    throw new Response('', {
      status: 404,
      statusText: 'Contact Not Found'
    })
  }
  return { contact }
}

export async function action({ request, params }) {
  let formData = await request.formData()
  return updateContact(params.contactId, {
    favorite: formData.get('favorite') === 'true'
  })
}

// Get a random image from Shopify assets. The random profile images I uploaded are ppl-1.jpg to ppl-7.jpg.
function getProfileImg() {
  try {
    if (!window.shop_assets || !window.shop_assets.assetsFolderPath) {
      throw new Error("window.shop_assets, or assetsFolderPath is not defined");
    }

    let max = 7, min = 1;
    let rand = Math.floor(Math.random() * (max - min + 1)) + min;
    let shopify_assets_url = window.shop_assets.assetsFolderPath.trim();
    return shopify_assets_url + `ppl-${rand}.jpg`;

  } catch (error) {
    console.error("Error generating profile image URL:", error);
    return "";
  }

}


// function getImgFrmShopifyAssets(str) {

//   try {
//     let pattern = 'shoify-assets-folder-path'
//     console.log('===> getImgFrmShopifyAssets', " str:",str, " pattern:", pattern)
//     if (str && str.includes(pattern)){
//       if (!window.shop_assets || !window.shop_assets.assetsFolderPath) {
//         throw new Error("window.shop_assets, or assetsFolderPath is not defined");
//       }
//       let shopify_assets_url = window.shop_assets.assetsFolderPath.trim();
//       console.log('===> getImgFrmShopifyAssets 111 ',  str.replace(pattern, shopify_assets_url)  )
//       return str.replace(pattern, shopify_assets_url)  
//     }else {
//       return str;
//     }
//   } catch (error) {
//     console.error("Error generating profile image URL:", error);
//     return "";
//   }
// }
function removeTrailingSlash(str) {
  if (str.length > 0) { // Ensure the string is not empty
    const lastChar = str.slice(-1);
    if (lastChar === '/' || lastChar === '\\') {
      return str.slice(0, -1); // Remove the last character
    }
  }
  return str; // If no trailing slash was found
}

/*
  Importing image
  During the build process:
  Vite will include the image that you imported in your asset bundle.
  Vite will handle the hashing of the filename.
*/

/* get all image urls from react/assets/ */
function importAllImages(modules) {
  let imageUrls = {};
  Object.entries(modules).forEach(([item, module]) => {
    // Extract filename (assumes filenames like 'image-name.jpg')
    const filename = item.split('/').pop().split('.')[0];
    imageUrls[filename] = module.default;
  });
  return imageUrls;
}
const allImageUrls = importAllImages(import.meta.glob('../../assets/contacts/**/*.{png,jpg,jpeg,svg}', { eager: true }));
// console.log("===> allImageUrls: ", allImageUrls); 


/* 
  get specific image urls from react/assets/   

  4/12/2024 Fri 2:02 PM 
  import.meta.glob() does not work with variables, so have to import all images instead of any specific one
  https://github.com/vitejs/vite/discussions/15397#discussioncomment-8419078
  let globStr = `../../assets/contacts/${imgFileName}` <----error, can't use a variable
  const imagePath = import.meta.glob(globStr, { eager: true }); <----error

*/
const imagePath = import.meta.glob('../../assets/contacts/ppl-1.jpg', { eager: true });
// Assuming you have only one match
const imageModule = Object.values(imagePath)[0];
// Access the image URL
const imageUrl = imageModule.default;
console.log('====> imgurl ---> ', imageUrl)



export default function Contact() {
  const { contact } = useLoaderData()
  const [profileImg, setProfileImg] = useState()
  const [avatarURL, setAvatarRUL] = useState()

  useEffect(() => {
    setAvatarRUL(contact.avatar.trim())
  })



  /*
    Purpose: if avatar url has the 'shoify-assets-folder-path' pattern, then modify the url pointing to assets folder img
    
    Problem:
      this approach is problematic
      When Vite builds your project, it adds unique hashes to your asset filenames (like from ppl-1.jpg to ppl-1.DNYQ4w4w.min.jpg).
  */
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

  /*
    import imgRUL from react/assets to get around VITE's cache busting file renaming
  */
  const getImgUrls = useCallback(() => {
    console.log('====> avatarURL ', contact.first, " == ", avatarURL)
    try {
      let str = avatarURL
      if (!str) return

      // if it's not a URL and it's an image file, retrieve the default images provided in react/assests folder
      if (stringHasNoSlashes(str) && isImageFile(str)) {
        let imgFileName = str
        imgFileName = removeFileExtension(imgFileName)

        console.log('====> imgurl ', contact.first, " == ", allImageUrls[imgFileName])
        return imageUrl
      } else {
        return avatarURL
      }


    } catch (error) {
      console.error("Error getImgUrls:", error);
      return "";
    }
  }, [avatarURL])

  return (
    <div
      id="contact"
      className="my-10 flex border-[0.5px] border-solid border-border"
    >
      <div className="contact-img-wrapper  flex min-w-[300px] max-w-[300px] flex-shrink  flex-grow-0 justify-center bg-lightgray p-8 align-middle">
        <img
          className="h-full w-full border-[0.5px] border-solid border-lightgray5 bg-lightgray  object-cover w"
          key={avatarURL}
          // src={contact.avatar || null}
          // src={profileImg}
          src={getImgUrls()}
        />
      </div>

      <div className="contact-info-wrapper flex-shrink flex-grow  basis-auto p-8">
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div className="contact-btn-wrapper my-4 flex">
          <Form action="edit">
            <Button className=" text-contrast2 " type="submit" size="xl">
              Edit
            </Button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm('Please confirm you want to delete this record.')) {
                event.preventDefault()
              }
            }}
          >
            <Button className="ml-4  text-contrast2 " type="submit" size="xl">
              Delete
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

function Favorite({ contact }) {
  const fetcher = useFetcher()
  // yes, this is a `let` for later
  let favorite = contact.favorite
  if (fetcher.formData) {
    favorite = fetcher.formData.get('favorite') === 'true'
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  )
}
