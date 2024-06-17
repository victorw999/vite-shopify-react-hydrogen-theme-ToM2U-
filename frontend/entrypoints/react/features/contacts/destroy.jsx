import { redirect } from 'react-router-dom'
import { deleteContact } from './contactsUtils'

export async function action({ params }) {
  // throw new Error('oh dang!')
  await deleteContact(params.contactId)
  return redirect('/')
}
