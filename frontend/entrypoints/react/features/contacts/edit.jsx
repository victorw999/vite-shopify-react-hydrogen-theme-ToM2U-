import { Form, useLoaderData, useNavigate, redirect } from 'react-router-dom'
import { Button } from '@shadcn/components/ui/button.jsx'
import { Input } from '@shadcn/components/ui/input.jsx'

import { updateContact } from './contactsUtils'

export async function action({ request, params }) {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  await updateContact(params.contactId, updates)
  return redirect(`/contacts/${params.contactId}`)
}

export default function EditContact() {
  const { contact } = useLoaderData()
  const navigate = useNavigate()

  return (
    <div className="detail_section contact-edit">
      <div className="detail_info_wrapper">
        <Form method="post" id="contact-form">
          <p className="form-row">
            <div className="form-row-wrapper">
              <span className="form-label">Name</span>
              <Input
                size="xl"
                placeholder="First"
                aria-label="First name"
                type="text"
                name="first"
                defaultValue={contact.first}
              />
              <Input
                className=" ml-4"
                size="xl"
                placeholder="Last"
                aria-label="Last name"
                type="text"
                name="last"
                defaultValue={contact.last}
              />
            </div>
          </p>
          <p className="form-row">
            <label className="form-row-wrapper">
              <span className="form-label">Twitter</span>
              <Input
                size="xl"
                type="text"
                name="twitter"
                placeholder="@Twitter"
                defaultValue={contact.twitter}
              />
            </label>
          </p>
          <p className="form-row">
            <label className="form-row-wrapper">
              <span className="form-label">Avatar URL</span>
              <Input
                size="xl"
                placeholder="Avatar URL"
                aria-label="Avatar URL"
                type="text"
                name="avatar"
                defaultValue={contact.avatar}
              />
            </label>
          </p>
          <p className="form-row">
            <label className="form-row-wrapper">
              <span className="form-label">Notes</span>
              <textarea
                className=" w-full  text-contrast2"
                name="notes"
                defaultValue={contact.notes}
                placeholder='Notes'
                rows={6}
              />
            </label>
          </p>
          <p className="form-row btn-row">
            <div className="form-row-wrapper">
              <span className="form-label"></span>
              <Button type="submit" size="xl" className="text-contrast2">
                Save
              </Button>
              <Button
                type="button"
                size="xl"
                className="ml-4 text-contrast2"
                onClick={() => {
                  navigate(-1)
                }}
              >
                Cancel
              </Button>
            </div>
          </p>
        </Form>
      </div>
    </div>
  )
}
