import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider, createHashRouter } from 'react-router-dom'

import { SHOPIFY_URL, SHOPIFY_REACT_ROOT } from './Global.js'

import ReactRoot, {
  loader as rootLoader,
  action as rootAction
} from './routes/ReactRoot.jsx'
import fetchProducts from './utils/fetchProducts.js'

import ErrorPage from './error-page.jsx'
import Contact, {
  loader as contactLoader,
  action as contactAction
} from './routes/contacts/contact.jsx'
import EditContact, { action as editAction } from './routes/contacts/edit.jsx'
import { action as destroyAction } from './routes/contacts/destroy.jsx'
import { action as loadContactsAction} from './routes/contacts/loadContactsFrmSample.jsx'
import Index from './routes/index.jsx'
 

const router = createHashRouter([
  {
    path: '/',
    element: <ReactRoot />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [ 
          { index: true, element: <Index /> },
          {
            path: `contacts/:contactId`,
            element: <Contact />,
            loader: contactLoader,
            action: contactAction
          },
          {
            path: `contacts/:contactId/edit`,
            element: <EditContact />,
            loader: contactLoader,
            action: editAction
          },
          {
            path: 'contacts/:contactId/destroy',
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>
          },
          {
            path: 'contacts/loadContacts',
            action: loadContactsAction,
            errorElement: <div>Oops! There was an error loading contacts.</div>
          }
        ]
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById(SHOPIFY_REACT_ROOT))

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />

    {/* use this method 
     without change broswer url

    https://g.co/gemini/share/f5aac48678e6
    https://g.co/gemini/share/f5aac48678e6
    
    */}
    {/* <App></App> */}
  </React.StrictMode>
)
