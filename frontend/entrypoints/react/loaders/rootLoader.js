import { filterContactsByQuery, loadContacts } from "../features/contacts/contactsUtils";

export async function rootLoader({ request, params }) {

  try {


    /**
     * 
     rootLoader will capture 
     - capture user search term
     - load filtered "contacts" data
     
     - we can't access ReactRoot's internal state "activeTab"

     * since Loaders run independently from component, we need to do the filter logic inside the component. we can't filter it here.  
     *  
     *
     * Separation of concerns: 
     * Loaders focus on data fetching and preparation, while components handle UI logic and state management.
     *  
     * loader() execute before the component is even mounted, meaning we can't access, componenet internal state in loader(), there's no component instance with state yet.

      


     */

    // get params to filter contacts data
    const url = new URL(request.url)
    const q = url.searchParams.get('q')

    // load & merge sample_contacts.json w/ current contacts in cache
    await loadContacts();

    // Filter the list if there are URLSearchParams
    const contacts = await filterContactsByQuery(q)

    return { contacts, q }

  } catch (error) {
    throw new Error('contactsLoader() issue: ', error);
  }
}