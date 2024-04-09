import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SHOPIFY_URL, SHOPIFY_REACT_ROOT } from './Global.js';

import ReactRoot, { loader as rootLoader, action as rootAction } from './routes/ReactRoot.jsx';
import fetchProducts from './routes/fetchProducts.js';

import ErrorPage from './error-page.jsx';
import Contact, { loader as contactLoader, action as contactAction, } from './routes/contact.jsx';
import EditContact, { action as editAction } from './routes/edit.jsx';
import { action as destroyAction } from './routes/destroy.jsx';
import Index from './routes/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ReactRoot />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children:[
          // {
          //   path: `${SHOPIFY_URL}/products/:productId`,
          //   element: <h1>Hello HOoah!</h1>,
          // },
          { index: true, element: <Index /> },
          {
            // path: `${SHOPIFY_URL}/contacts/:contactId`,
            path: `contacts/:contactId`,
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: `contacts/:contactId/edit`,
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: 'contacts/:contactId/destroy',
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ]
      }      
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById(SHOPIFY_REACT_ROOT));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
