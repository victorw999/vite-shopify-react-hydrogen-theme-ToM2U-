import { Form, useLoaderData, useFetcher} from 'react-router-dom';
import { getContact, updateContact } from '../contacts';
import { Button } from '@shadcn/components/ui/button.jsx';

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Contact Not Found",
    });
  }
  return { contact };
}

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function Contact() {
  const { contact } = useLoaderData();

  return (
    <div id="contact" className="tw-mx-[10rem] tw-my-10 tw-flex tw-border-[0.5px] tw-border-solid tw-border-border">
      <div className="contact-img-wrapper   tw-flex tw-flex-shrink  tw-flex-grow-0 tw-justify-center tw-bg-lightgray tw-p-10 tw-align-middle">
        <img
          className="tw-h-[250px] tw-w-[250px] tw-border-[0.5px] tw-border-solid tw-border-lightgray5 tw-bg-lightgray  tw-object-cover"
          key={contact.avatar}
          src={contact.avatar || null}
        />
      </div>

      <div className="contact-info-wrapper tw-flex-shrink tw-flex-grow  tw-basis-auto tw-px-10">
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

        <div className="contact-btn-wrapper tw-flex">
          <Form action="edit">
            <Button className="" type="submit" size="xl">
              Edit
            </Button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm('Please confirm you want to delete this record.')) {
                event.preventDefault();
              }
            }}
          >
            <Button className="tw-ml-4" type="submit" size="xl">
              Delete
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  const fetcher = useFetcher();
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
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
  );
}
