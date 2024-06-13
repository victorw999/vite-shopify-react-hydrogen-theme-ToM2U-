import { getContacts, loadContacts } from "../features/contacts/utils/contacts";

export async function contactsLoader({ request, params }) {
  try {

    // get params to filter contacts data
    const url = new URL(request.url)
    const q = url.searchParams.get('q')

    // merge sample data w/ current contact frm cache
    await loadContacts();
    const contacts = await getContacts(q)

    return { contacts, q }

  } catch (error) {
    throw new Error('contactsLoader() issue: ', error);
  }
}