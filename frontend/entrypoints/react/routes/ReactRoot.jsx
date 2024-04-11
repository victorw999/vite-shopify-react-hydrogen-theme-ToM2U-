import { SHOPIFY_URL } from '../Global'
import {
  Outlet,
  NavLink,
  Link,
  useNavigation,
  useSubmit,
  Form,
  useLoaderData,
  redirect
} from 'react-router-dom'

import { Button } from '@shadcn/components/ui/button.jsx'
import { Input } from '@shadcn/components/ui/input.jsx'
import { useState, useEffect } from 'react'
import fetchProducts from './fetchProducts.js'
import { getContacts, createContact } from '../contacts'
import { motion, AnimatePresence } from 'framer-motion'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BsPeople } from "react-icons/bs";
import { AiOutlineRollback } from 'react-icons/ai'

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
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts()
      setProducts(fetchedProducts)
    }
    getProducts()
  }, [])

  // method #2 of retrieving data
  const { contacts, q } = useLoaderData()
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


  /* Frame motion animations */
  const [isAppOpen, setAppOpen] = useState(false)
  const framerSidebarBackground = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { delay: 0.2 } },
    transition: { duration: 0.3 },
  }
  const framerSidebarPanel = {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
    transition: { duration: 0.3 },
  }
  const framerText = delay => {
    return {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      transition: {
        delay: 0.5 + delay / 10,
      },
    }
  }
  const bsi = 2 // btn shake intensity
  const framerBtnHover = {
    scale: 1.1,
    x: [-bsi, bsi, -bsi, bsi, -bsi, 0], // Creates a shaking motion
    transition: { duration: 0.4, ease: "easeInOut", times: [0, 0.2, 0.4, 0.6, 0.8, 1] }
  }
  const toggleSidebar = () => setAppOpen(prev => !prev)


  return (
    <>
      <div id="react-app-icons-container" className="fixed bg-zinc-800 border-r-2 border-2 border-zinc-100 p-3">
        <motion.button
          whileHover={framerBtnHover}
          onClick={toggleSidebar}
          className="p-3 border-2 border-white-800 rounded-xl"
          aria-label="toggle sidebar"
        >
          <BsPeople />
        </motion.button>
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
                className="container z-10 flex h-screen w-[30rem] min-w-[30rem] flex-col overflow-y-auto py-5 px-0"
              >
                <div className="sidebar_innerContainer py-5">

                  <div className="sidebar_row_1 mb-4 flex relative px-[theme('sidebarMargin.default')]">
                    <motion.button
                      whileHover={framerBtnHover}
                      onClick={toggleSidebar}
                      className="p-3 border-2 border-zinc-100 rounded-xl   absolute right-[theme('sidebarMargin.default')] "
                      aria-label="close sidebar"
                    >
                      <AiOutlineRollback />
                    </motion.button>

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
                    <Form method="post" className=" my-5 ml-3">
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
                    <ul className="contact-list">
                      <li>
                        <Link to={`/`}>Home</Link>
                      </li>
                      <li>
                        <a href={`/collections/all`}>All Collection Anchor</a>
                      </li>
                      <li>
                        <Link to={`/collections/all`}>All Collection Link</Link>
                      </li>

                      {contacts.length ? (
                        contacts.map((contact, idx) => (
                          <motion.li key={contact.id}
                            {...framerText(idx)}
                          >
                            < NavLink
                              as="NavLink"

                              to={`contacts/${contact.id}`}
                              className={({ isActive, isPending }) =>
                                isActive ? 'active' : isPending ? 'pending' : ''
                              }
                            >
                              {contact.first || contact.last ? (
                                <>
                                  {contact.first} {contact.last}
                                </>
                              ) : (
                                <i>No Name</i>
                              )}{' '}
                              {contact.favorite && <span>★</span>}
                            </ NavLink>
                          </motion.li>
                        ))
                      ) : (
                        <li>
                          <a href="#" disabled>
                            <i>No contacts</i>
                          </a>
                        </li>
                      )}
                      {/*  */}
                      <hr />
                      {products ? (
                        products.map((product) => (
                          <li key={product.node.id} data-prod-id={product.node.id}>
                            <Link to={`/products/${product.node.handle}`}>
                              {product.node.title}
                            </Link>
                          </li>
                        ))
                      ) : (
                        <p>
                          <i>No Products</i>
                        </p>
                      )}
                    </ul>
                  </nav>
                </div>
              </motion.div>
              <div
                id="detail"
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
