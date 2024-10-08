import { Form, useLoaderData, useFetcher, useOutletContext } from 'react-router-dom'
import { getContact, updateContact } from './contactsUtils'
import { Button } from '@shadcn/components/ui/button.jsx'
import { useEffect, useState, useCallback, useRef, useContext } from 'react'
import { stringHasNoSlashes, isImageFile, removeFileExtension } from '../../Global'
import { useDispatch, useSelector } from 'react-redux';
import { CgProfile } from "react-icons/cg";
import { motion, AnimatePresence, usePresence } from 'framer-motion'
import { framerDetailSection, framerOutlet } from '../../utils/framerAnimationOptions'
import { nanoid } from 'nanoid'
import { OutletContext } from '../../routes/ReactRoot'

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

export default function ContactDetail() {
  const { setOutletState } = useContext(OutletContext);

  const { contact } = useLoaderData()
  const [avatarURL, setAvatarRUL] = useState()

  const { placeholderImages, imageLoadingError } = useSelector((state) => state.contacts);

  useEffect(() => {
    if (!contact || !contact.avatar) {
      console.log('====> contact or contact.avatar undefined ')
      return
    }
    setAvatarRUL(contact.avatar.trim())
    // Reset on cleanup
    return () => {
      // setAvatarRUL(''); // Or any other default value
    };
  }, [contact.avatar, contact])


  /*
    import imgRUL from react/assets to get around VITE's cache busting file renaming
  */
  const getImgUrls = useCallback(() => {
    try {
      let str = avatarURL

      if (!str || str.trim() === "") {
        return placeholderImages['ppl-1'].src  // set default profile img
      }
      // if it's not a URL and it's an image file, retrieve the default images provided in react/assests folder
      if (stringHasNoSlashes(str) && isImageFile(str)) {
        let imgFileName = str
        imgFileName = removeFileExtension(imgFileName)
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

    <motion.div
      // {...framerDetailSection}
      id="contact" className="detail_section" key={`${contact.id}`}
    >
      <div className="detail_img_wrapper">

        {(avatarURL && avatarURL.trim() !== '') ?
          (<img
            className="detail_img_main"
            key={avatarURL}
            // src={contact.avatar || null} 
            // src={avatarImgUrl}
            src={getImgUrls().src || avatarURL}
            srcSet={getImgUrls().srcset}
            sizes="(max-width: 500px) 480px, 100vw"
            loading="lazy"
          />) : <CgProfile className=' text-slate-200 w-full h-full' />
        }
      </div>

      <div className="detail_info_wrapper">
        <h1 className='section_heading flex'>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} className='ml-4 test1' />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`} className='pl-0'>
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
              /* for mobile: toggle <Outlet/> visibility */
              setOutletState('')
            }}
          >
            <Button className="ml-4  text-contrast2 " type="submit" size="xl">
              Delete
            </Button>
          </Form>
        </div>
      </div>
    </motion.div>
  )
}

function Favorite({ contact, className }) {
  const fetcher = useFetcher()
  // yes, this is a `let` for later
  let favorite = contact.favorite
  if (fetcher.formData) {
    favorite = fetcher.formData.get('favorite') === 'true'
  }

  return (
    <fetcher.Form method="post" className={className}>
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
