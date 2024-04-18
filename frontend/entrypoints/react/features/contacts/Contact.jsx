import { Form, useLoaderData, useFetcher, useOutletContext } from 'react-router-dom'
import { getContact, updateContact } from './utils/contacts'
import { Button } from '@shadcn/components/ui/button.jsx'
import { useEffect, useState, useCallback, useRef } from 'react'
import { stringHasNoSlashes, isImageFile, removeFileExtension } from '../../Global'
import { useDispatch, useSelector } from 'react-redux';
import { CgProfile } from "react-icons/cg";
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

export default function Contact() {
  const { contact } = useLoaderData()
  const [avatarURL, setAvatarRUL] = useState()

  const { placeholderImages, imageLoadingError } = useSelector((state) => state.contact);

  useEffect(() => {
    if (!contact || !contact.avatar) {
      console.log('====> contact or contact.avatar undefined ')
      return
    }
    setAvatarRUL(contact.avatar.trim())
    // Reset on cleanup
    return () => {
      setAvatarRUL(''); // Or any other default value
    };
  }, [contact.avatar])


  /*
    import imgRUL from react/assets to get around VITE's cache busting file renaming
  */
  const getImgUrls = useCallback(() => {
    try {

      console.log('====>  getImgUrls() avatarURL', avatarURL)
      let str = avatarURL
      if (!str)
        return ""
      if (!str || str.trim() === "") {
        return `https://xsgames.co/randomusers/avatar.php?g=male`
      }
      // if it's not a URL and it's an image file, retrieve the default images provided in react/assests folder
      if (stringHasNoSlashes(str) && isImageFile(str)) {
        let imgFileName = str
        imgFileName = removeFileExtension(imgFileName)
        console.log('====>   ', " ", contact.first, " imgFileName == ", imgFileName)

        return placeholderImages[imgFileName]
      } else {
        return avatarURL
      }
    } catch (error) {
      console.error("Error getting placeholder imgs:", error);
      return "";
    }
  }, [avatarURL])


  // Handle loading state or error as needed
  if (imageLoadingError) {
    return <div>Error loading images: {imageLoadingError.message}</div>;
  }

  return (

    <div
      id="contact"
      className="my-10 flex border-[0.5px] border-solid border-border"
    >
      <div className="contact-img-wrapper  flex min-w-[300px] max-w-[300px] flex-shrink  flex-grow-0 justify-center bg-lightgray p-8 align-middle">

        {(avatarURL && avatarURL.trim() !== '') ?
          (<img
            className="h-full w-full border bg-lightgray  object-cover w"
            key={avatarURL}
            // src={contact.avatar || null} 
            // src={avatarImgUrl}
            src={getImgUrls()}
          />) : <CgProfile className=' text-slate-200 w-full h-full'/>
        }
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
