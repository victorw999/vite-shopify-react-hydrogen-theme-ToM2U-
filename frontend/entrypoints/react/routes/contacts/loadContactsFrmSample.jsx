import { redirect } from 'react-router-dom'
import { loadContacts } from '../../utils/contacts/contacts'

export async function action() {
  // throw new Error('oh dang!')
  console.log('====> loadContactsFrmSampe.jsx')
  await loadContacts()
  return redirect('/')
}
