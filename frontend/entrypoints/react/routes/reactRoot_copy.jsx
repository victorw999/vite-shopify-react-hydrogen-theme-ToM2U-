import { SHOPIFY_URL, importAllImages } from '../Global'
import {
  Outlet,
  NavLink,
  Link,
  useNavigation, useNavigate,
  useSubmit,
  Form,
  useLoaderData,
  redirect
} from 'react-router-dom'

import { Button } from '@shadcn/components/ui/button.jsx'
import { Input } from '@shadcn/components/ui/input.jsx'
import { useState, useEffect } from 'react'

import { loadContacts } from '../features/contacts/utils/contacts'
import { getContacts, createContact } from '../features/contacts/utils/contacts'
import { motion, AnimatePresence } from 'framer-motion'
import { framerSidebarBackground, framerSidebarPanel, framerText } from '../utils/framerAnimationOptions'

import { IconGoBack, IconPeople, IconHome, IconLoadSample, IconLoadCustomer } from '../components/icons'

import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsPlaceholderImgs } from '../features/contacts/contactSlice'

import { fetchCustomers } from '../features/customers/customerSlice'
import ContactList from '../features/contacts/ContactList'
import TabSwitch from '../features/sidebar/TabSwitch'

export async function loader({ request }) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  const contacts = await getContacts(q)
  return { contacts, q }
}

export async function action() {
  const contact = await createContact()
  return redirect(`/contacts/${contact.id}/edit`)
}

export default function ReactRoot() {

  // method 1 of retrieving data


  // method #2 of retrieving contact's data from local storage
  const { contacts, q } = useLoaderData()
  const [contactsState, setContactsState] = useState([])

  useEffect(() => {
    setContactsState(contacts)
  }, [contacts])

  const navigation = useNavigation()
  const submit = useSubmit()
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q')


  useEffect(() => {
    let searchbar = document.getElementById('react_searchbar_q')
    if (searchbar) {
      searchbar.value = q
    }
  }, [q])


  async function loadContactsFrmSample() {
    await loadContacts(); // merge sample data w/ current contact frm cache
    let contacts = await getContacts('')  // refresh contact
    setContactsState(contacts)
  }


  /* another method to trigger a rout action (in this case: loader())
    * 0, specifies the relative offset within the history stack. 0 indicates navigating to the current route  
    * Using navigate with replace: true on the current route indirectly refetches data by forcing React Router to re-execute the route's associated loader function (if one exists).
     
      const navigate = useNavigate();
      const loadContactsFrmSample_bk = () => {
        loadContacts()
        navigate(0, { replace: true }); // Trigger refetch
      }

  */


  /**
   ** animations 
   */
  const [isAppOpen, setAppOpen] = useState(false)
  const toggleSidebar = () => setAppOpen(prev => !prev)


  /**
   * * load placeholder img
   *   use redux to load placeholder imgs into redux store   
   */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContactsPlaceholderImgs());
  }, [dispatch]);



  return (
    <> 
        
          <div id="react-contact-app">
            <div id="sidebar">
              <div className="sidebar_innerContainer">
                <div className="contactFormWrapper ">
                  <Form id="search-form">
                    <Input id="react_searchbar_q" />
                  </Form>
                  <Form method="post">
                    <Button type="submit">New</Button>
                  </Form>
                </div>
                <nav>
                  <div className="app-display-list">
                    <li className="app-tool-bar">
                      <Link to={`/`}>
                        <IconHome />
                        <IconLoadSample action={loadContactsFrmSample} />
                        <IconLoadCustomer
                          action={() => dispatch(fetchCustomers())}
                        />
                      </Link>
                    </li>
  
                    <TabSwitch
                      initialActiveTab="contacts"
                      contactsState={contactsState}
                      customersState
                    />
                  </div>
                </nav>
              </div>
            </div>
            <div id="detail">
              <Outlet />
            </div>
          </div>
       
    </>
  );
  
}
