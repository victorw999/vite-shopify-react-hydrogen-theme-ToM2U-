import { Form, useLoaderData, useFetcher } from 'react-router-dom'
import { getContact, updateContact } from '../../utils/contacts/contacts'
import { Button } from '@shadcn/components/ui/button.jsx'

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

  return (
    <div
      id="contact"
      className=" my-10 flex border-[0.5px] border-solid border-border"
    >
      <div className="contact-img-wrapper  flex  min-w-[18rem] flex-shrink  flex-grow-0 justify-center bg-lightgray p-8 align-middle">
        <img
          className="h-[250px] w-[250px] border-[0.5px] border-solid border-lightgray5 bg-lightgray  object-cover"
          key={contact.avatar}
          src={contact.avatar || null}
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
