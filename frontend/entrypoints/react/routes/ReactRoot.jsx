import {
  Outlet, useOutlet,
  useNavigation, useNavigate,
  useSubmit,
  Form,
  useLoaderData,
  redirect
} from 'react-router-dom'
import { Button } from '@shadcn/components/ui/button.jsx'
import { Input } from '@shadcn/components/ui/input.jsx'
import { useState, useEffect, createContext, useRef } from 'react'
import { filterContactsByQuery, createContact } from '../features/contacts/contactsUtils'
import { motion, AnimatePresence } from 'framer-motion'
import { framerOutlet, framerSidebarBackground, framerSidebarPanel, framerText } from '../utils/framerAnimationOptions'
import { IconGoBack, IconPeople, IconHome, IconLoadCustomer, IconContactBook } from '../components/icons'
import { VscNewFile } from "react-icons/vsc";
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

// Tracks if the "outlet" section should be active on mobile
export const OutletContext = createContext()

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


  // update input element on DOM
  useEffect(() => {
    let searchbar = document.getElementById('react_searchbar_q')
    if (searchbar) {
      searchbar.value = q
    }
  }, [q])

  // Tracks if the "outlet" section should be active on mobile
  const [outletState, setOutletState] = useState(null)

  /**   
    ** setOutletStateHandler: 
    handles clicks evt on side bar list items, in mobile view;
   
    ** setTimeout's delay: 
    This "delay" will provide <Outlet /> time to render the new contact details. Otherwise there'll be flickering during transition. It's apparent in "mobile", not so much in desktop view. Framer animation has nothing to do with this mobile flickering.
   */
  const setOutletStateHandler = () => {
    // setOutletState('') // mk it inactive, so during mobile view transition, the prev img will be hidden
    reset_outlet_class() // use ref maybe better than toggle componenet state
    setTimeout(() => {
      setOutletState('active')
    }, 350)
  }

  const outletRef = useRef(null);

  const reset_outlet_class = () => {
    outletRef.current.classList.remove('outlet_active');
  };

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
    dispatch(fetchCustomers())
  }, [dispatch]);



  /**
   * activeTab, a string: 'contacts' | 'products' | 'customers' 
   * Based on "activeTab" show/hide "new" btn
   */
  const [activeTab, setActiveTab] = useState('contacts');

  return (

    <OutletContext.Provider value={{ outletState, setOutletState, setOutletStateHandler }}>

      <div id="react-app-icons-container" className="">
        <IconPeople className="" action={toggleSidebar} />
      </div>

      <AnimatePresence mode="sync" initial={false}>
        {
          isAppOpen && (
            <motion.div
              {...framerSidebarBackground}
              id="react-app-container"
              className="">
              <motion.div
                {...framerSidebarPanel}
                id="sidebar"
                className="container  
                scroll_bar_style
                "
              >
                <div className="sidebar_innerContainer py-5">

                  <div className="app_top_row">
                    <IconGoBack className="close_btn" action={toggleSidebar} />
                    <h1 className="text-2xl ">Custom React <span className="hidden md:inline-block"> Shopify</span> App</h1>
                  </div>

                  <div className="search-bar-wrapper">
                    <Form
                      id="search-form"
                      className="my-5 h-[theme('btnHeight.default')] bg-white grow"
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
                    <Form method="post" className={`add_new_contact_form ${activeTab !== 'contacts' ? 'hidden' : ""}`}
                      onSubmit={
                        /* for mobile: toggle <Outlet/> visibility */
                        setOutletStateHandler
                      }
                    >
                      <Button
                        type="submit"
                        variant="default"
                        size="xl"
                        className="add_new_contact_btn"
                      >
                        <span className="desktop_txt">New</span>
                        <span className="mobile_icon">
                          <VscNewFile />
                        </span>
                      </Button>
                    </Form>
                  </div>

                  <div className="app-display-list">

                    <TabSwitch
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      contactsState={contactsState}
                    />

                  </div>

                </div>
              </motion.div>

              <motion.div
                // {...framerOutlet}
                id="outlet_container"
                ref={outletRef}
                className={`scroll_bar_style ${navigation.state === 'loading' ? 'loading' : ''} 
                ${outletState === 'active' ? 'outlet_active' : ''}
                `}
              >
                <div className="app_top_row">
                  <IconGoBack className="close_btn" action={() => setOutletState('')} />
                </div>
                <Outlet />

              </motion.div>
            </motion.div>)
        }
      </AnimatePresence>
    </OutletContext.Provider>

  )
}
