
import { SHOPIFY_URL } from '../Global';
import { Outlet, NavLink, Link, useNavigation, useSubmit, Form, useLoaderData, redirect } from 'react-router-dom';

import { Button } from '@shadcn/components/ui/button.jsx';
import { Input } from '@shadcn/components/ui/input.jsx';
import { useState, useEffect } from 'react';
import fetchProducts from './fetchProducts.js';
import { getContacts, createContact } from '../contacts';

export async function loader({ request }) {
  const url = new URL(request.url)
  const q = url.searchParams.get("q")
  const contacts = await getContacts(q);
  return { contacts, q };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function ReactRoot() {
  // method 1 of retrieving data
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };
    getProducts();
  }, []);

  // method #2 of retrieving data
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q")

  useEffect(() => {
    document.getElementById("react_searchbar_q").value = q;
  }, [q]);

  return (
    <>
      <div
        id="sidebar"
        className="tw-container tw-z-10 tw-flex tw-h-screen tw-w-[35rem]   tw-min-w-[30rem] tw-flex-col tw-overflow-y-auto tw-p-5
         
         "
      >
        <div className="sidebar_innerContainer tw-p-5">
          <h1 className="tw-text-4xl">React Router Contacts</h1>
          <div className="contactFormWrapper tw-flex tw-flex-row tw-space-x-4 tw-text-3xl">
            <Form id="search-form" className="tw-my-5 tw-bg-white tw-border-2 " role="search">
              <Input
                size="xl"
                id="react_searchbar_q"
                className={searching ? "loading" : ""}
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
                defaultValue={q}
                onChange={(evt) => {
                  const isFirstSearch = q === null
                  submit(evt.currentTarget.form, {
                    replace: !isFirstSearch,
                  })
                }}
              />
              <div id="search-spinner" aria-hidden data-searching={searching} data-hidden={searching ? true : false} className=' tw-animate-spin tw-block test1' />
              <div className="sr-only" aria-live="polite"></div>
            </Form>
            <Form method="post" className=" tw-my-5 tw-ml-3 ">
              <Button type="submit" variant="default" size="xl" className="tw-w-full">
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
                contacts.map((contact) => (
                  <li key={contact.id}>
                    <NavLink
                      to={`contacts/${contact.id}`}
                      className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}
                    >
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{' '}
                      {contact.favorite && <span>★</span>}
                    </NavLink>
                  </li>
                ))
              ) : (
                <li>
                  <a href="#" disabled ><i>No contacts</i></a>

                </li>
              )}
              {/*  */}
              <hr />
              {products ? (
                products.map((product) => (
                  <li key={product.node.id} data-prod-id={product.node.id}>
                    <Link to={`/products/${product.node.handle}`}>{product.node.title}</Link>
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
      </div>
      <div id="detail" className={navigation.state === 'loading' ? 'loading' : ''}>
        <Outlet />
      </div>
    </>
  );
}
