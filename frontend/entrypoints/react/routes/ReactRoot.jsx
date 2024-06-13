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

import { IconGoBack, IconPeople, IconHome, IconLoadCustomer } from '../components/icons'

import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsPlaceholderImgs } from '../features/contacts/contactSlice'
import { fetchProducts } from '../features/products/productSlice'

import { fetchCustomers } from '../features/customers/customerSlice'
import TabSwitch from '../features/sidebar/TabSwitch'

// ReactRoot.jsx
export async function action() {
  const contact = await createContact()
  return redirect(`/contacts/${contact.id}/edit`)
}

export default function ReactRoot() {

  // retrieving contact's data from local storage
  // retrieve products from loader
  const { contacts, q } = useLoaderData()

  // "contactsState" is necessary becuz 
  // Besides loading data from local storage, we also manually load data from samples. 
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
   * * load data to redux store
   *    - load placeholder imgs into store
   *    - load products into redux store   
   */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContactsPlaceholderImgs());
    dispatch(fetchProducts())
  }, [dispatch]);



  return (
    <>
      <div id="react-app-icons-container" className="fixed bg-zinc-800 border-r-2 border-2 border-zinc-100 p-3">
        <IconPeople className="" action={toggleSidebar} />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {
          isAppOpen && (
            <motion.div
              {...framerSidebarBackground}
              id="react-contact-app"
              className="fixed bottom-0 left-0 right-0 top-0 backdrop-blur-sm flex">
              <motion.div
                {...framerSidebarPanel}
                id="sidebar"
                className="container z-10 flex h-screen 
                
                w-[300px] min-w-[300px] 
                md:w-[30rem] md:min-w-[30rem]
                flex-col overflow-y-auto py-5 px-0"
              >
                <div className="sidebar_innerContainer py-5">

                  <div className="sidebar_row_1 mb-4 flex relative px-[theme('sidebarMargin.default')]">
                    <IconGoBack className="" action={toggleSidebar} />
                    <h1 className="text-2xl ">React Router Contacts</h1>
                  </div>

                  <div className="contactFormWrapper px-[theme('sidebarMargin.default')] flex flex-row space-x-4 text-3xl   justify-between">
                    <Form
                      id="search-form"
                      className="my-5 h-[theme('btnHeight.default')] bg-white  grow  "
                      role="search"
                    >
                      <Input
                        size="xl"
                        id="react_searchbar_q"
                        className={` ${searching ? 'loading' : ''} text-contrast`}
                        aria-label="Search contacts"
                        placeholder="Search"
                        type="search"
                        name="q"
                        defaultValue={q}
                        onChange={(evt) => {
                          const isFirstSearch = q === null
                          submit(evt.currentTarget.form, {
                            replace: !isFirstSearch
                          })
                        }}
                      />
                      <div
                        id="search-spinner"
                        aria-hidden
                        data-searching={searching}
                        data-hidden={searching ? false : true}
                        className=" roundanimate-spin block"
                      />
                      <div className="sr-only" aria-live="polite"></div>
                    </Form>
                    <Form method="post" className="my-5 ml-3">
                      <Button
                        type="submit"
                        variant="default"
                        size="xl"
                        className="w-full text-contrast2 "
                      >
                        New
                      </Button>
                    </Form>
                  </div>
                  <nav>
                    <div className="app-display-list">
                      <li className='app-tool-bar'>
                        <Link to={`/`}>
                          <IconHome />
                          <IconLoadCustomer action={() => dispatch(fetchCustomers())} />
                        </Link>
                      </li>


                      <TabSwitch initialActiveTab='contacts'
                        contactsState={contactsState}
                        customersState

                      />


                      {/* <li>
                        <a href={`/collections/all`}>All Collection Anchor</a>
                      </li>
                      <li>
                        <Link to={`/collections/all`}>All Collection Link</Link>
                      </li> 

                      <ContactList contactsState={contactsState} framerText={framerText} />
                      */}

                      {/*  */}
                      <hr />


                    </div>
                  </nav>
                </div>
              </motion.div>
              <div
                id="outlet_container"
                className={navigation.state === 'loading' ? 'loading' : ''}
              >
                <Outlet />
              </div>
            </motion.div>)
        }
      </AnimatePresence>
    </>
  )
}
