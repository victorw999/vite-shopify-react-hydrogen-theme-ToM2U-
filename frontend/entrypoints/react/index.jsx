import React, { useReducer } from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider, createHashRouter } from 'react-router-dom'
import { SHOPIFY_URL, SHOPIFY_REACT_ROOT } from './Global.js'

import ReactRoot, {
  loader as rootLoader,
  action as rootAction
} from './routes/ReactRoot.jsx'

import ErrorPage from './error-page.jsx'
import Contact, {
  loader as contactLoader,
  action as contactAction
} from './routes/contacts/contact.jsx'
import EditContact, { action as editAction } from './routes/contacts/edit.jsx'
import { action as destroyAction } from './routes/contacts/destroy.jsx'

import Index from './routes/index.jsx'

import { AppContext, AppDispatchContext } from './redux/AppContext.js' 

import { Provider } from 'react-redux';
import store from './redux/store.js'

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
          }
      
        ]
      }
    ]
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
