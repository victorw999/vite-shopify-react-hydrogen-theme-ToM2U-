import { getContacts, loadContacts } from "../features/contacts/contactsUtils";

export async function contactsLoader({ request, params }) {
  try {

    // get params to filter contacts data
    const url = new URL(request.url)
    const q = url.searchParams.get('q')

    // load & merge sample_contacts.json w/ current contacts in cache
    await loadContacts();

    // Filter the list if there are URLSearchParams
    const contacts = await getContacts(q)

    return { contacts, q }

  } catch (error) {
    throw new Error('contactsLoader() issue: ', error);
  }
}