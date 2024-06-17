import React, { useReducer } from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider, createHashRouter, Navigate } from 'react-router-dom'
import { SHOPIFY_URL, SHOPIFY_REACT_ROOT } from './Global.js'

import { AppContext, AppDispatchContext } from './redux/AppContext.js'
import { Provider } from 'react-redux';
import store from './redux/store.js'
import ErrorPage from './error-page.jsx'

import ReactRoot, {
  action as rootAction
} from './routes/ReactRoot.jsx'

import { rootLoader } from './loaders/rootLoader.js'

import { contactsLoader } from './loaders/contactsLoader.js'
import ContactDetail, {
  loader as contactLoader,
  action as contactAction
} from './features/contacts/ContactDetail.jsx'
import EditContact, { action as editAction } from './features/contacts/edit'
import { action as destroyAction } from './features/contacts/destroy.jsx'
import ContactIndex from './features/contacts/ContactIndex.jsx'

import ProductIndex from './features/products/ProductIndex.jsx'
import ProductList from './features/products/ProductList.jsx'
import ProductDetail from './features/products/ProductDetail.jsx'

import CustomerIndex from './features/customers/CustomerIndex.jsx'
import CustomerDetail from './features/customers/CustomerDetail.jsx'

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
          {
            index: true,
            path: `contacts`,
            element: <ContactIndex />,
            loader: contactsLoader
          },
          {
            path: `contacts/:contactId`,
            element: <ContactDetail />,
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
            path: 'products',
            element: <ProductIndex />,
          },
          {
            path: `products/:handle`,
            element: <ProductDetail />
          },
          {
            path: 'customers',
            element: <CustomerIndex />,
          },
          {
            path: `customers/:customerId`,
            element: <CustomerDetail />
          },

        ]
      }
    ]
  },
  {
    path: '*', // page not found,  Redirect to a default path
    element: <Navigate to="/" replace />
  }
])

const App = () => {
  // const [appContextData, dispatch] = useReducer(appReducer, initialState);
  return (
    <React.StrictMode>
      <Provider store={store}>
        {/* <AppContext.Provider value={appContextData}> */}
        {/* <AppDispatchContext value={dispatch}> */}
        <RouterProvider router={router} />
        {/* </AppDispatchContext> */}
        {/* </AppContext.Provider> */}
      </Provider>
    </React.StrictMode>
  )
}

const root = ReactDOM.createRoot(document.getElementById(SHOPIFY_REACT_ROOT))
root.render(<App />)
